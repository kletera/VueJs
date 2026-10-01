<template>
    <div class="card w-full max-w-xl bg-base-200 shadow-xl p-6 gap-6 mx-auto">
        <h1 class="text-3xl font-bold text-primary">Exercice firebase</h1>
        <div class="card w-full max-w-xl bg-base-200 shadow-xl p-6 ">
            <div class="flex flex-col gap-1">
                <label for="">Utilisateur</label>
                <input type="text" class="input" :value="user">
            </div>
            <div class="flex flex-col gap-1">
                <label for="">Image</label>
                <input type="text" class="input" :value="img">
            </div>
            <div class="flex flex-col gap-1">
                <label for="">Text</label>
                <input type="text" class="input" :value="text">
            </div>
        </div>
        <div class="card w-full max-w-xl bg-base-200 shadow-xl p-6 ">
            
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";
// import { auth } from "../../firebase"; // Assurez-vous que le chemin est correct

const user=ref('');
const img=ref('');
const text=ref('');



</script>

<style scoped lang="css">

</style>