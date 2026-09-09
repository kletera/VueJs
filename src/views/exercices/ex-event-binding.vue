<template>
    <div class="container mx-auto p-4 md:p-8">
        <div class="card bg-base-100 shadow-xl rounded-box">
            <div class="card-body">
                <h5 class="card-title text-2xl font-bold">Exercice Event Binding (directive v-on)</h5>
                <div>
                    <button v-on:click="incrementer" class="btn btn-error">+</button>
                    <p>le nombre : {{ nombre }}</p>
                    <button v-on:click.right="décrémenter" class="btn btn-success">-</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import { ref } from "vue";
    let nombre= ref(0);
    function incrementer(){
        return nombre.value+=100;
    }

    function décrémenter(){
        return nombre.value-=55;
    }
</script>

<style scoped lang="css">
</style>