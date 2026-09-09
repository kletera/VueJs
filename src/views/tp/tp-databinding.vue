<template>
    <div class="container mx-auto p-4 md:p-8">
        <div class="card bg-base-100 shadow-xl rounded-box">
            <div class="card-body">
                <h5 class="card-title text-2xl font-bold">TP-Databinding : Profil utilisateur (interpolation + v-bind)</h5>
                <div class="text-center flex items-center flex-col">
                    <img v-bind:src="imgSrc" class="" style="border-radius: 100%;" >
                    <h6 class="card-title text-1xl font-bold">{{name}}</h6>
                    <input type="text" v-bind:value='name' class="input">
                    <p>Age : <span class="badge badge-primary">{{ ageUser }}</span></p>
                    <p>Age +10 : <span class="badge badge-secondary">{{ age(ageUser) }}</span></p>
                    <p>NB Fétiche : <span class="badge badge-accent">{{ nbFetiche() }}</span></p>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang='ts'>
import { ref } from "vue";
    const imgSrc : string='https://picsum.photos/100/100';
    const ageUser=ref<number>(10);
    const name=ref<string>('Tom Jédusor');
    function age(nb:number) {
        return nb+10;
    }
    function nbFetiche() {
        return Math.random();
    }
</script>

<style scoped lang="css">
</style>