<template>

    <div  class="card bg-base-100 shadow-md">
        <div class="card-body flex-row items-center justify-between p-4">
            <div class="flex items-center gap-3">
                <input type="checkbox" class="checkbox checkbox-primary":checked="task.isCompleted" @change="emit('toggle-complete', task.id)"/>

                <span :class="{ 'line-through text-base-content/50': task.isCompleted }">
                {{ task.title }}
                </span>

                <span class="badge badge-outline">{{ task.category }}</span>
            </div>

            <button class="btn btn-error btn-sm text-white" @click="emit('delete-task', task.id)">
                Supprimer
            </button>
        </div>
    </div>
</template>

<script setup lang='ts'>
// import { ref } from 'vue';
import type { Task } from '../types/task';

const emit=defineEmits(['toggle-complete', 'delete-task']);

const props=defineProps<{
    task:Task,
}>();


</script>

<style scoped lang="css">
</style>