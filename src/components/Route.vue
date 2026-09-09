<template>
    <div class="card shadow-xl rounded-box">
        <div class="card-body">
            <h5 class="card-title text-2xl font-bold">{{ title }}</h5>
            <div class="card-actions">
                <router-link :to="path">
                <button class="btn btn-primary">Go</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
    defineProps<{
        path: string;
        title: string;
    }>();
</script>

<style scoped lang="css">
</style>