<template>
    <div class="container mx-auto p-4 md:p-8">
        <div class="card bg-base-100 shadow-xl rounded-box">
            <div class="card-body gap-10 text-center">
                <h5 class="card-title text-2xl font-bold p-4 " style="background-color: blue;">Exercice Event Binding (directive v-on)</h5>
                <div>
                    <p>le nombre :</p>
                    <p class="text-5xl font-bold" style="color: blue;">{{ leNombre }}</p>
                </div>
                <h6 class="text-2xl font-bold" :style="mgClass">{{message}}</h6>
                <p v-if="LimiteVal" style="color: red;">{{ mgs }}</p>
                <div class="flex text-center justify-center gap-1">
                    <button v-on:click="incrementer(1)" class="btn btn-error">+1</button>
                    <button v-on:click="incrementer(5)" class="btn btn-success">+5</button>
                </div>
                <button class="btn btn-primary" @click="reset()">Reset</button>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref, watch } from "vue";
    // Initilaisiation des variable leNombre, LimiteVal, mgClass
    let leNombre= ref<number>(0);
    let LimiteVal=ref<boolean>(false);
    let mgClass=ref<string>("");

    // function d'incrémentation de la varile leNombre ou on y ajoute un nombre dans les paramètre
    function incrementer(nb:number):number{
        return leNombre.value+=nb;
    };

    // 
    let message=computed(()=>{
        if(leNombre.value<7){
            mgClass.value="color:deeppink";
            return "ESSAIE ENCORE !"
        }else if(leNombre.value===7){
            mgClass.value="color:green";
            return "7... BINGO"
        }else{
            mgClass.value="color:red";
            return "Tu as dépassé le nombre !"
        }
    });
    
    // Survéhiance de la variable leNombre. Si le variable dépasse 30 elle affiche un message d'erreur et reset le nombre et le message.
    let mgs=ref('');
    watch(leNombre,(newVal)=>{
        if(newVal>30){
            LimiteVal.value = leNombre.value > 30;
            mgs.value = LimiteVal.value ? "BCP BCP mais alors bcp TROP" : "";
            setTimeout(() => {
                leNombre.value=0;
                LimiteVal.value=false;
            }, 3000);
        }
    });

    // function lier au bouton de reset pour pouvoir reste le numéro et le message d'erreur a tout moment
    function reset():void{
        leNombre.value=0;
        LimiteVal.value=false;
    }
</script>

<style scoped lang="css">
</style>