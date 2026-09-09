<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

</script>

<template>
  <AppHeader />
  <!-- router-view est le composant qui va afficher la page correspondante à la route -->
  <router-view />
  <AppFooter />
</template>
