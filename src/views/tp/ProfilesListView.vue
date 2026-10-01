<template>
    <div class="container mx-auto p-4 md:p-8">
        <h1 class="text-3xl font-bold text-center mb-8">Annuaire de l'équipe</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="user in users" :key="user.id" class="card bg-base-100 shadow-xl border border-base-200">
                <figure class="px-6 pt-6">
                    <img :src="user.avatar" :alt="user.name" class="rounded-full w-24 h-24 object-cover" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">{{ user.name }}</h2>
                    <p class="badge badge-secondary">{{ user.role }}</p>

                    <div class="card-actions mt-4">
                        <!-- RouterLink avec route nommée et paramètre -->
                        <RouterLink :to="{ name: 'profile-detail', params: { id: user.id } }"
                            class="btn btn-primary btn-sm">
                            Voir la fiche
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface User {
    id: number;
    name: string;
    role: string;
    avatar: string;
}

const users = ref<User[]>([
    { id: 1, name: 'Alice Martin', role: 'Développeuse Frontend', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bob Dupont', role: 'UX Designer', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 3, name: 'Charlie Cassagne', role: 'DevOps', avatar: 'https://i.pravatar.cc/150?img=8' }
]);
</script>