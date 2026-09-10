<template>
    <div class="grid grid-cols-2 gap-4">
        <Route
          v-for="link in links"
          :key="link.path"
          :path="link.path"
          :title="link.title"
        />
    </div>
</template>

<script setup lang='ts'>
    import Route from '../../components/Route.vue';

    class Link {
        path: string;
        title: string;
        constructor(path: string, title: string) {
            this.path = path;
            this.title = title;
        }
    }

    const links = [
        new Link('/tp-databinding', 'TP 1 : TP-Databinding : Profil utilisateur (interpolation + v-bind)'),
        new Link('/tp-watch','Tp Reactivité : le Numéro Gagnant'),
        
    ];
</script>

<style scoped lang="css">
</style>