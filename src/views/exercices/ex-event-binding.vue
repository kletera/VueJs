<template>
    <div class="container mx-auto p-4 md:p-8">
        <div class="card bg-base-100 shadow-xl rounded-box">
            <div class="card-body gap-10">
                <h5 class="card-title text-2xl font-bold gap-4">Exercice Event Binding (directive v-on)</h5>
                <div class="flex text-center justify-center gap-4">
                    <button v-on:click="incrementer(100)" class="btn btn-error">+</button>
                    <span>le nombre : {{ nombre }}</span>
                    <button v-on:click.right="décrémenter(50)" class="btn btn-success">-</button>
                </div>
                <p class="text-center">Résultat de la fonction afficherNameUser() : {{ afficherNameUser() }}</p>
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

    function décrémenter(nb:number){
        return nombre.value-=nb;
    }

    const username =ref('');
    function afficherNameUser(){
        console.log("On est dans la fonction");
        if(username.value == ''){
            return "test";
        }else{
            return "autre test";
        }
    }
</script>

<style scoped lang="css">
</style>