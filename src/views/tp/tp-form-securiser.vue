<template>
    <div class="container mx-auto p-4 md:p-8">
        <h5 class="card-title text-2xl font-bold">TP : Formulaire d'Inscription Sécurisé</h5>
        <div class="card bg-base-100 shadow-xl rounded-box w-fit">
            <div class="card-body">
                <h6 class="text-2xl font-bold"  style="color: blue;">Créer un compte</h6>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Nom d'utilisateur</legend>
                    <input type="text" class="input" placeholder="Type here" v-model='username'/>
                    <p class="label redError" v-if="errUser.length>0">{{ errUser }}</p>
                    
                    <legend class="fieldset-legend">Adresse Email</legend>
                    <input type="email" class="input" placeholder="Type here" v-model="email"/>
                    <p class="label redError" v-if="errEmail.length>0">{{ errEmail }}</p>

                    <legend class="fieldset-legend">Mot de passe</legend>
                    <input type="password" class="input" placeholder="Type here" v-model='pwd'/>
                    <legend class="fieldset-legend">Force du mot se passe</legend>
                    <progress class="progress w-56" :class="proressColor" :value="proressBar" max="5"></progress>
                    <ul class="list ">
                        <li class="label" :class="mgpwd.valid ? 'greenError' : 'redError'" v-if="pwd.length>0" v-for="mgpwd in errPwd">{{ mgpwd.message }}</li>
                    </ul>

                    <legend class="fieldset-legend">Confirmer le mot de passe</legend>
                    <input type="password" class="input" placeholder="Type here" v-model='verifPwd'/>
                    <p class="label redError" v-if="errVerifPwd.length>0" >{{ errVerifPwd }}</p>

                    <div class="flex gap-3">
                        <input type="checkbox" class="checkbox" v-model="acceptTerms">
                        <p class="fieldset-legend">J'accepte les conditions générales</p>
                    </div>

                    <button type="submit" class="btn btn-primary" :disabled="!isFormValid">S'inscrire</button>
                </fieldset>
                
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { watch, ref, computed } from 'vue';

    const username=ref<string>('');
    const email=ref<string>('');
    const pwd=ref<string>('');
    const verifPwd=ref<string>('');


    const regex = {
        // 1. Username : au moins 3 caractères
        username: /^.{3,}$/,

        // détecte les caractères HTML dangereux à échapper/nettoyer
        xssChars: /[<>&"']/g,

        // format standard email
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

        minLength: /^.{12,}$/,               // au moins 12 caractères
        hasUpperCase: /[A-Z]/,               // au moins une majuscule
        hasLowerCase: /[a-z]/,               // au moins une minuscule
        hasNumber: /[0-9]/,                  // au moins un chiffre
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, // caractère spécial
    };

    // Sanitize 
    function sanitize(str: string): string {
        return str.replace(regex.xssChars, '');
    }
    // watch(username, (newVal) => {

        
    // });

    // Verification Nom de l'utilisateur
    let errUser=computed<string>(() => {
        if (username.value.length === 0){
            return "";
        };
        return username.value.match(regex.username) ? '' : "3 caractère minimum";
    });

    // Verification email
    const errEmail = computed<string>(() => {
        if (email.value.length === 0){
            return "";
        };
        return email.value.match(regex.email) ? '' : "Veuiller entrer une email valide";
    });

    // Verification mot de passe
    const errPwd = computed<{ message: string; valid: boolean }[]>(() => {
        if (pwd.value.length === 0){
            return [];
        };
        const errors: { message: string; valid: boolean }[] = [];
        errors.push({
            message: 'Au moins 12 caractères',
            valid: !!pwd.value.match(regex.minLength)
        });
        errors.push({
            message: 'Au moins une majuscule',
            valid: !!pwd.value.match(regex.hasUpperCase)
        });
        errors.push({
            message: 'Au moins une minuscule',
            valid: !!pwd.value.match(regex.hasLowerCase)
        });
        errors.push({
            message: 'Au moins un nombre',
            valid: !!pwd.value.match(regex.hasNumber)
        });
        errors.push({
            message: 'Au moins un caractère spéciale (!@#$%...)',
            valid: !!pwd.value.match(regex.hasSpecialChar)
        });
        return errors;
    });

    // Bare de progression
    const proressBar = computed<number>(() => {
        if (errPwd.value.length === 0) {
            return 0;
        }
        return errPwd.value.filter(err => err.valid).length;
    });

    // Couleur de la bare de progression
    const proressColor=computed<string>(()=>{
        if(proressBar.value<= 2){
            return "progress-error";
        }
        if(proressBar.value<= 4){
            return "progress-warning";
        }
        return "progress-success";
    });

    // Verification de la confirmation du mot de passe
    const errVerifPwd = computed<string>(() => {
        if (verifPwd.value.length === 0){
            return "";
        };
        return verifPwd.value===pwd.value ? '' : "Les mot de passe ne corespond pas";
    });

    // Vérification admin
    watch([username,email], ([newus,newEm]) => {
        if(newus.includes("admin") || newEm.includes("admin")){
            alert("Tentative de connexion Admin")
        }
    });

    // Validation
    const isPasswordValid = computed<boolean>(() => proressBar.value === 5);
    const isPasswordMatch = computed<boolean>(() => verifPwd.value.length > 0 && verifPwd.value === pwd.value);
    const acceptTerms=ref<boolean>();

    // Disable button
    const isFormValid = computed<boolean>(() => {
        if(username.value.length >= 3 && email.value.length > 0 && isPasswordValid.value && isPasswordMatch.value && acceptTerms.value){   
            
            return true;              
        }
        return false;
    });

</script>

<style scoped lang="css">
.redError{
    color: red;
}
.greenError{
    color: green;
}
</style>