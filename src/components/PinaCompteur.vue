<template>
    <div class="card w-100 bg-base-100 card-md shadow-sm">
        <div class="card-body text-center">
            <h2 class="card-title text-primary">Compteur avec Pinia</h2>
            <p>Gérez un compteur avec l'état global fourni par Pinia.</p>
            <p class="text-success">{{ store.$state.count }}</p>
            <div class="justify-end card-actions">
                <button class="btn btn-primary" @click="store.increment">Incrémenter</button>
                <button class="btn" style="background-color: white;" @click="store.decrement">Décrémenter</button>
                <button class="btn btn-secondary" @click="store.reset">Rénitialiser</button>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import {useCounterStore} from "../store/counterStore"
console.log(useCounterStore);

const store=useCounterStore();

</script>

<style scoped lang="css">
</style>