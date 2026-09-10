<template>
    <div class="container mx-auto p-4 md:p-8">
        <div class="card bg-base-100 shadow-xl rounded-box">
            <div class="card-body">
                <h5 class="card-title text-2xl font-bold gap-4">WatchList (Film à voir)</h5>
                <div class="flex text-center justify-center gap-4 flex-col">
                    <fieldset class="fieldset">
                        <label class="label" for="name" >Nom du film :</label>
                        <input type="text" id="name" class="input" placeholder="Enter un nom de film" v-model="inputFilm"/>
                    </fieldset>
                    <button class="btn btn-primary" @click="addFilm()">Ajouter à votre Liste</button>
                    <p v-if="mesFilms.length===0 "> Pas encore de fils dans votre liste ? Veuillez en ajouter un</p>
                    <li v-else v-for="(film, index) in mesFilms" :key="index" class="badge badge-outline cursor-pointer hover:bg-primary hover:text-white transition-colors" @click="supFilm(index)">{{ index+1 }}-{{film}}</li>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import { ref } from "vue";
    let mesFilms=ref<string[]>([])
    let inputFilm=ref('');
    function addFilm():void{
        mesFilms.value.push(inputFilm.value as string);
        inputFilm===ref('');
    }
    function supFilm(key:number):void{
        mesFilms.value.splice(key,1);
    }
    


</script>

<style scoped lang="css">
</style>