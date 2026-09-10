<template>
    <div class="grid grid-cols-3 gap-4">
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
        new Link('/ex-text-interpolation', 'Exercice 1 : Text Interpolation'),
        new Link('/ex-event-binding','Exercice 2 Event Binding Mode : Composition'),
        new Link("/ex-dynamic-styling",'Dynamic Styling (class)'),
        new Link('ex-v-if','Exercice 4 : V-if'),
    ];
</script>

<style scoped lang="css">
</style>