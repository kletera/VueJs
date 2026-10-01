<template>
    <div class="card w-100 bg-base-100 card-md shadow-sm">
        <div class="card-body text-center">
            <h2 class="card-title">Géocalisation Navigateur API + VueUse</h2>
            <div class="flex flex-between">
                <p class="flex flex-col">LATTITUDE <span>{{ coords.latitude.toFixed(5) }}</span></p>
                <p class="flex flex-col">LONGITUDE <span>{{ coords.longitude.toFixed(5) }}</span></p>
            </div>
        
            <div class="card-actions">
                <button class="btn btn-primary" style="width: stretch;" ><a :href="googleMapsUrl">Voir sur Google Maps</a></button>
                
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useGeolocation } from '@vueuse/core';
import { computed } from 'vue';


const {coords} = useGeolocation({enableHighAccuracy:true});
console.log(coords.value);

const googleMapsUrl=computed(()=>{
    return `https://www.google.com/maps?q=${coords.value.latitude},${coords.value.longitude}`
});


</script>

<style scoped lang="css">
</style>