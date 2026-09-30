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
        new Link('/lesson-introduction', 'lesson-introduction'),
        new Link('/lesson-dynamic-styling', 'lesson-dynamic-styling'),
        new Link('/lesson-attribute-binding', 'lesson-attribute-binding'),
        new Link('/lesson-computed-properties','lesson-computed-properties'),
        new Link('/lesson-conditional-rendering',"lesson-conditional-rendering"),
        new Link('/lesson-emit', 'lesson-emit'),
        new Link('/lesson-event-binding', 'lesson-event-binding'),
        new Link('/lesson-lifecycle', 'lesson-lifecycle'),
        new Link('/lesson-list-rendering', 'lesson-list-rendering'),
        new Link('/lesson-props', 'lesson-props'),
        new Link('/lesson-setup', 'lesson-setup'),
        new Link('/lesson-syntax', 'lesson-syntax'),
        new Link('/lesson-text-interpolation', 'lesson-text-interpolation'),
        new Link('/lesson-two-way-binding', 'lesson-two-way-binding'),
        new Link('/lesson-watchers', 'lesson-watchers'),
    ];
</script>
    
<style scoped lang="css">
</style>