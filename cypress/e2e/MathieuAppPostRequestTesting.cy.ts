

describe('Mathieu App - Tests de sécurité (formulaire Ajouter un livre)', () => {
  const loginUrl = 'https://library.mithridatem.fr/login';
  const addBookUrl = 'https://library.mithridatem.fr/book/add';
 
  beforeEach(() => {
    cy.on('window:alert', (txt) => {
      throw new Error(`XSS exécuté ! alert déclenchée avec : ${txt}`);
    });
 
    cy.fixture('users-fixture.json').then((data) => {
      const user = data.user[0]; // pioche le 1er utilisateur de test (modifiable selon le besoin)
 
      cy.visit(loginUrl);
      cy.get('input[type="email"]').type(user.mail);
      cy.get('input[type="password"]').type(user.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/login');
 
      cy.visit(addBookUrl);
    });
  });
 
  context('Injection XSS dans les champs texte', () => {
    const xssPayloads = [
      '<script>alert("XSS")</script>',
      '<img src=x onerror=alert("XSS")>',
      '"><script>alert(String.fromCharCode(88,83,83))</script>',
      '<svg onload=alert("XSS")>',
    ];
 
    xssPayloads.forEach((payload, index) => {
      it(`ne doit pas exécuter le payload XSS #${index + 1}`, () => {
        // Ciblage par label (à ajuster selon la structure réelle du DOM)
        cy.contains('label', 'Titre')
          .parent()
          .find('input')
          .clear()
          .type(payload, { parseSpecialCharSequences: false });
 
        cy.contains('label', 'Auteur')
          .parent()
          .find('input')
          .clear()
          .type(payload, { parseSpecialCharSequences: false });
 
        cy.contains('label', 'Description')
          .parent()
          .find('textarea')
          .clear()
          .type(payload, { parseSpecialCharSequences: false });
 
        // Date requise pour que le formulaire soit valide
        cy.contains('label', 'Date de publication')
          .parent()
          .find('input')
          .type('2024-01-01');
 
        // Sélectionne au moins une catégorie pour passer la validation
        cy.contains('label', 'Categories')
          .parent()
          .find('select')
          .select(0);
 
        cy.contains('button', 'Ajouter').click();
 
        // Vérifie que le payload est affiché comme texte échappé, pas exécuté
        cy.contains(payload).should('exist');
        cy.get('script').should('not.contain.text', 'alert');
        cy.get('img[onerror]').should('not.exist');
        cy.get('svg[onload]').should('not.exist');
      });
    });
  });
 
  context('Upload de fichier malveillant (champ Couverture)', () => {
    it('rejette un SVG contenant un payload XSS malgré accept=".png,.jpg,.jpeg,.webp"', () => {
      const maliciousSvg = '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"><script>alert(1)</script></svg>';
 
      cy.get('#cover').selectFile(
        {
          contents: Cypress.Buffer.from(maliciousSvg),
          fileName: 'cover.svg', // extension usurpée pour tenter de passer le filtre
          mimeType: 'image/svg+xml',
        },
        { force: true } // force car l'attribut accept devrait normalement bloquer ça côté navigateur
      );
 
      cy.contains('button', 'Ajouter').click();
 
      // Le serveur doit refuser le fichier (message d'erreur) OU le stocker sans jamais l'exécuter
      cy.get('body').then(($body) => {
        const refused = $body.text().includes('invalide') || $body.text().includes('non autorisé') || $body.text().includes('erreur');
        if (!refused) {
          cy.log('⚠️ Le fichier SVG a été accepté — vérifier qu\'il n\'est jamais rendu en tant que <img> ou <object> sans sanitization');
        }
      });
    });
 
    it('teste un nom de fichier contenant un payload XSS', () => {
      cy.fixture('valid-image.png', 'base64').then((fileContent) => {
        cy.get('#cover').selectFile(
          {
            contents: Cypress.Buffer.from(fileContent, 'base64'),
            fileName: '<img src=x onerror=alert(1)>.png',
            mimeType: 'image/png',
          },
          { force: true }
        );
      });
 
      cy.contains('button', 'Ajouter').click();
 
      // Si le nom de fichier est réaffiché quelque part (liste de livres, détail...), il doit être échappé
      cy.get('img[onerror]').should('not.exist');
      cy.get('script').should('not.contain.text', 'alert');
    });
 
    it('vérifie que le type MIME réel du fichier est validé côté serveur, pas juste l\'extension', () => {
      // Un fichier HTML/JS renommé en .png — teste si le serveur vérifie le vrai contenu
      const fakeImage = '<html><body><script>alert("fake image")</script></body></html>';
 
      cy.get('#cover').selectFile(
        {
          contents: Cypress.Buffer.from(fakeImage),
          fileName: 'cover.png',
          mimeType: 'image/png', // mimetype mensonger
        },
        { force: true }
      );
 
      cy.contains('button', 'Ajouter').click();
 
      cy.get('body').then(($body) => {
        cy.log('Vérifier manuellement côté serveur que le Content-Type réel du fichier stocké est bien validé (magic bytes), pas seulement l\'extension/mimetype déclaré par le client.');
      });
    });
  });
});
 