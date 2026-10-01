<template>
    <div class="container mx-auto p-4 md:p-8">
        <h1 class="text-3xl font-extrabold text-primary mb-6">Catalogue Produits</h1>

        <!-- Zone des Filtres -->
        <div class="card bg-base-100 shadow-lg p-6 mb-8 border border-base-200">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

                <!-- 1. Recherche par mot-clé -->
                <div class="form-control">
                    <label class="label font-semibold text-sm" for="search">Recherche</label>
                    <input id="search" v-model.trim="searchQuery" type="text" placeholder="Rechercher un produit..."
                        class="input input-bordered w-full" />
                </div>

                <!-- 2. Filtre par Catégorie -->
                <div class="form-control">
                    <label class="label font-semibold text-sm" for="category">Catégorie</label>
                    <select id="category" v-model="selectedCategory" class="select select-bordered w-full">
                        <option value="all">Toutes les catégories</option>
                        <option v-for="cat in categories" :key="cat" :value="cat">
                            {{ cat }}
                        </option>
                    </select>
                </div>

                <!-- 3. Filtre En Stock uniquement -->
                <div class="form-control md:pt-6">
                    <label class="label cursor-pointer justify-start gap-3">
                        <input v-model="onlyInStock" type="checkbox" class="checkbox checkbox-primary" />
                        <span class="label-text font-semibold">En stock uniquement</span>
                    </label>
                </div>

            </div>

            <!-- Compteur de résultats -->
            <div class="mt-4 pt-4 border-t border-base-200 flex justify-between items-center text-sm">
                <span class="opacity-75">
                    Résultats : <strong>{{ filteredProducts.length }}</strong> / {{ products.length }} produits
                </span>
                <button v-if="hasActiveFilters" @click="resetFilters" class="btn btn-ghost btn-xs text-error">
                    Réinitialiser les filtres
                </button>
            </div>
        </div>

        <!-- Grille de Produits -->
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="product in filteredProducts" :key="product.id"
                class="card bg-base-100 shadow-md border border-base-200 flex flex-col justify-between">
                <figure class="px-4 pt-4">
                    <img :src="product.image" :alt="product.title" class="rounded-xl h-48 w-full object-cover" />
                </figure>
                <div class="card-body">
                    <div class="flex justify-between items-start">
                        <h2 class="card-title text-base font-bold">{{ product.title }}</h2>
                        <div class="badge badge-outline text-xs">{{ product.category }}</div>
                    </div>
                    <p class="text-2xl font-extrabold text-primary mt-2">{{ product.price }} €</p>

                    <div class="card-actions justify-between items-center mt-4">
                        <span v-if="product.inStock" class="badge badge-success text-white">En stock</span>
                        <span v-else class="badge badge-error text-white">Rupture</span>

                        <button class="btn btn-primary btn-sm" :disabled="!product.inStock">
                            Ajouter
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- État vide (Aucun résultat) -->
        <div v-else class="alert alert-warning shadow-md mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Aucun produit ne correspond à vos critères de recherche.</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    inStock: boolean;
    image: string;
}

// Données initiales
const products = ref<Product[]>([
    { id: 1, title: 'Casque Sans Fil Pro', category: 'Électronique', price: 199, inStock: true, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
    { id: 2, title: 'Clavier Mécanique RGB', category: 'Électronique', price: 129, inStock: false, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500' },
    { id: 3, title: 'Veste en Jean Vintage', category: 'Vêtements', price: 89, inStock: true, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500' },
    { id: 4, title: 'Chaussures de Running', category: 'Vêtements', price: 110, inStock: true, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
    { id: 5, title: 'Gourde Isotherme 1L', category: 'Accessoires', price: 25, inStock: true, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500' },
    { id: 6, title: 'Montre Connectée Sport', category: 'Électronique', price: 249, inStock: false, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' }
]);

// États réactifs pour les filtres
const searchQuery = ref<string>('');
const selectedCategory = ref<string>('all');
const onlyInStock = ref<boolean>(false);

// Liste unique des catégories calculée dynamiquement
const categories = computed<string[]>(() => {
    const allCats = products.value.map(p => p.category);
    // Utilisation de Set pour obtenir des catégories uniques (plus propre que filter + indexOf) 
    //[...new Set(allCats)] cela crée un tableau avec des valeurs uniques à partir d'un Set
    // ( un Set est une structure de données qui ne peut contenir que des valeurs uniques)
    // les ... trois points (...) sont l'opérateur de déstructuration (spread operator) qui permet de transformer un Set en tableau.
    // Donc, [...new Set(allCats)] crée un tableau contenant uniquement les catégories uniques.
    // autre exemple de spread operator : const arr1 = [1, 2, 3]; const arr2 = [...arr1, 4, 5]; // arr2 = [1, 2, 3, 4, 5]
    // Donc, [...new Set(allCats)] crée un tableau contenant uniquement les catégories uniques.
    //c'est une manière plus concise et efficace d'obtenir des valeurs uniques par rapport à l'utilisation de filter + indexOf.
    return [...new Set(allCats)];
});

// Alternative avec filter + indexOf (moins efficace) :
// const categories = computed<string[]>(() => {
//   const allCats = products.value.map(p => p.category);
//   return allCats.filter((cat, index) => allCats.indexOf(cat) === index);
// });

// Alternative avec reduce (moins efficace) :
// const categories = computed<string[]>(() => {
//   return products.value.map(p => p.category).reduce((acc, cat) => {
//     if (!acc.includes(cat)) {
//       acc.push(cat);
//     }
//     return acc;
//   }, [] as string[]);
// });

// Alternative avec forEach très classique mais moins efficace :
// const categories = computed<string[]>(() => {
//   const uniqueCats: string[] = [];
//   products.value.forEach(p => {
//     if (!uniqueCats.includes(p.category)) {
//       uniqueCats.push(p.category);
//     }
//   });
//   return uniqueCats;
// });

// Propriété calculée principale : Filtrage multi-critères
const filteredProducts = computed<Product[]>(() => {
    return products.value.filter(product => {
        // 1. Filtre recherche textuelle (titre)
        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());

        // 2. Filtre catégorie
        const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value;

        // 3. Filtre disponibilité en stock
        const matchesStock = !onlyInStock.value || product.inStock;

        // Le produit doit valider les 3 conditions
        return matchesSearch && matchesCategory && matchesStock;
    });
});

// Indicateur pour afficher le bouton de réinitialisation
const hasActiveFilters = computed<boolean>(() => {
    return searchQuery.value !== '' || selectedCategory.value !== 'all' || onlyInStock.value;
});

// Action de réinitialisation
function resetFilters(): void {
    searchQuery.value = '';
    selectedCategory.value = 'all';
    onlyInStock.value = false;
}
</script>