<template>
    <div class="container mx-auto p-4 md:p-8">
        <div class="card bg-base-100 shadow-xl rounded-box">
            <div class="card-body gap-10 text-center">
                <h5 class="card-title text-2xl font-bold p-4 " style="background-color: blue;">Exercice Event Binding (directive v-on)</h5>
                <div>
                    <p>le nombre :</p>
                    <p class="text-5xl font-bold" style="color: blue;">{{ nombre }}</p>
                </div>
                <h6 class="text-2xl font-bold" style="color:deeppink;">ESSAIE ENCORE !</h6>
                <div class="flex text-center justify-center gap-1">
                    <button v-on:click="incrementer(1)" class="btn btn-error">+1</button>
                    <button v-on:click="incrementer(5)" class="btn btn-success">+5</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";
    let nombre= ref(0);
    function incrementer(nb:number){
        return nombre.value+=nb;
    }
    
</script>

<style scoped lang="css">
</style>