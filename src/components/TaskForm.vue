<template>
  <div class="card bg-base-100 shadow-md mb-6">
    <div class="card-body">
        <h2 class="card-title">Nouvelle Tâche</h2>
        <form class="flex gap-3" @submit.prevent="add">
            <input type="text" placeholder="Titre de la tâche..." class="input input-bordered flex-1" v-model="titre"/>

            <select class="select select-bordered flex-[2]" v-model="categorie">
            <option value="Personnel">Personnel</option>
            <option value="Travail">Travail</option>
            <option value="Urgent">Urgent</option>
            </select>

            <button class="btn btn-primary" :disabled="!titre.trim()">
            Ajouter
            </button>
      </form>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const emit=defineEmits(['add-task'])
let titre= ref<string>("");
let categorie= ref<string>("");

function add():void{
    emit('add-task',titre.value,categorie.value);
    titre.value = ""
    categorie.value = ""
}

</script>

<style scoped lang="css">
</style>