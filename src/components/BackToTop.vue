<template>
    <div>
        <!-- Indicateur fixe en haut de l'écran avec la progression du scroll -->
       <div
           class=" bg-base-100/80 backdrop-blur-md border border-base-300 shadow-md px-3 py-1.5 rounded-full text-xs font-mono z-50">
           Scroll Y : <span class="text-primary font-bold">{{ Math.round(y) }}px</span>
       </div>
       <Transition name="fade">
           <button class="btn btn-info fixed bottom-5 right-5" v-if="y>=300" @click="backTop">↑</button>
       </Transition>
    </div>
</template>

<script setup lang='ts'>

import { useWindowScroll } from '@vueuse/core';
import { Transition } from 'vue';

const {y} = useWindowScroll({ behavior: 'smooth' });
// console.log(y);

function backTop(){
    y.value=0
}
</script>

<style scoped lang="css">

</style>