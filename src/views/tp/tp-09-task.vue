<template>
    <div class="min-h-screen bg-base-200 flex flex-col items-center pt-24 px-4">
    <div class="w-full max-w-3xl">
      <h1 class="text-4xl font-bold text-center mb-8">Gestionnaire de Tâches</h1>
      <TaskForm 
        @add-task="addTask"
      />
      <div v-if="tasks.length === 0" class="alert alert-info">
          <span>🎉 Aucune tâche pour le moment !</span>
      </div>
      <div v-else class="flex flex-col gap-3" >  
          <TaskItem 
            v-for="tache in tasks" :key="tache.id"
            :task="tache"
            @toggle-complete="toggleTask"
            @delete-task="deleteTask"
          />
      </div>
    </div>
</div>
    
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import type { Task } from '../../types/task';
import TaskForm from '../../components/TaskForm.vue';
import TaskItem from '../../components/TaskItem.vue';

const tasks = ref<Task[]>([
    { id: 1, title: 'Préparer le cours Vue 3', category: 'Travail', isCompleted: true },
    { id: 2, title: 'Acheter du café', category: 'Personnel', isCompleted: false },
]);
let nb=ref<number>(2)

function addTask(newTitle:string, newCategory:string){
    nb.value++;
    tasks.value.push({ id: nb.value, title: newTitle, category: newCategory, isCompleted: false },)
}

function toggleTask(id: number):void{
    const task = tasks.value.find(t => t.id === id);
    if(task){
        task.isCompleted = !task.isCompleted
    };
}

function deleteTask(id: number):void{
    tasks.value = tasks.value.filter(t => t.id !== id);
}

</script>

<style scoped lang="css">
</style>