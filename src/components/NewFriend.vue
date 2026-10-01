<template>
    <div class="flex flex-col my-4 gap-5">
        <form @submit.prevent="submitData" class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 bg-blue-400">
            <h5>Ajouter un nouvel ami</h5>
            <label class="label">Nom</label>
            <input type="text" class="input" placeholder="Nom" v-model="inpNom"/>
    
            <label class="label">Téléphone</label>
            <input type="text" class="input" placeholder="Téléphone" v-model="inpTel"/>
    
            <label class="label">Email</label>
            <input type="email" class="input" placeholder="email@h.com" v-model="inpEm"/>
    
            <button type="submit" class="btn btn-primary mt-4" @click="addAmi" :disabled="isDisable">Ajouter un ami</button>
        </form>
        <div class="bg-green-400">
            <h5>Données du tableau lesAmis dans le parent Exercice Emit:</h5>
            <ul>
                <li v-for="amAm in lesAmis">{{ amAm }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import { ref } from "vue";

    const inpNom=ref("");
    const inpTel=ref("");
    const inpEm=ref("");
    const isDisable=ref(false);

    export interface Friend {
        id: string;
        name: string;
        phone: string;
        email: string;
        premium: boolean;
    }

    // 2. Déclaration des props typées avec l'interface Friend
    const props=defineProps<{
        lesAmis: Friend[];
    }>();

    const emit=defineEmits(['create-friend']);
    if (inpNom.value=="" || inpTel.value=="" || inpEm.value==""){
        isDisable.value=!isDisable;
    }
    function addAmi(){
        emit('create-friend', {
            id: crypto.randomUUID(),
            name: inpNom.value,
            phone: inpTel.value,
            email: inpEm.value,
            premium: false
        });
        
    }
</script>

<style scoped lang="css">
</style>