<template>
    <div class="grid grid-cols-3 gap-4">
        <CardRoute
          v-for="link in links"
          :key="link.path"
          :path="link.path"
          :title="link.title"
        />
    </div>
</template>

<script setup lang='ts'>
    import CardRoute from '../../components/CardRoute.vue';

    class Link {
        path: string;
        title: string;
        constructor(path: string, title: string) {
            this.path = path;
            this.title = title;
        }
    }

    const links = [
        new Link('/ex-text-interpolation', 'Exercice 1 : Text Interpolation'),
        new Link('/ex-event-binding','Exercice 2 Event Binding Mode : Composition'),
        new Link("/ex-dynamic-styling",'Dynamic Styling (class)'),
        new Link('/ex-v-if','Exercice 4 : V-if'),
        new Link('/ex-life-api', 'Exercice 5 : Api+Life'),
        new Link('/ex-props', 'Exercice 6 : Props'),
        new Link('/ex-emit', 'Exercice 7 Emit'),
        new Link('/ex-firebase-article-management','Ex 8 : 1er test Firebase, Article Management'),
        new Link('/ex-firebase-file-rouge','Exercice 9 : Accès à des données Firebase'),
        new Link('/ex-pinia', 'Exercice 10 : Compteur avec pinia'),
    ];
</script>

<style scoped lang="css">
</style>