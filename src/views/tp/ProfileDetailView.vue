<template>
    <div class="container mx-auto p-4 md:p-8 max-w-xl">
        <!-- Fiche du profil si l'utilisateur existe -->
        <div v-if="user" class="card bg-base-100 shadow-xl p-6 border border-base-200 text-center">
            <figure class="mb-4">
                <img :src="user.avatar" :alt="user.name" class="rounded-full w-32 h-32 object-cover mx-auto" />
            </figure>

            <h1 class="text-3xl font-bold">{{ user.name }}</h1>
            <p class="text-primary font-semibold mt-1">{{ user.role }}</p>

            <div class="divider"></div>

            <div class="text-left space-y-2 text-sm opacity-80">
                <p><strong>Email :</strong> {{ user.email }}</p>
                <p><strong>Bio :</strong> {{ user.bio }}</p>
            </div>

            <div class="mt-6">
                <button @click="goBack" class="btn btn-outline btn-sm">
                    ← Retour à la liste
                </button>
            </div>
        </div>

        <!-- Message si aucun profil ne correspond à l'ID de l'URL -->
        <div v-else class="text-center py-12 bg-base-100 rounded-xl shadow-md border border-base-200 p-6">
            <h2 class="text-2xl font-bold text-error">Profil introuvable !</h2>
            <p class="opacity-75 mt-2">Aucun utilisateur ne correspond à l'identifiant <strong>{{ currentId }}</strong>.
            </p>
            <RouterLink to="/profiles" class="btn btn-primary mt-4 btn-sm">
                Retour à l'annuaire
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Interfaces pour le typage
interface UserDetail {
    id: number;
    name: string;
    role: string;
    email: string;
    bio: string;
    avatar: string;
}

// Composables de Vue Router
const route = useRoute();
const router = useRouter();



// Récupération de l'ID depuis l'URL (route.params.id)
const currentId = route.params.id;

// Données fictives
const mockUsers: UserDetail[] = [
    { id: 1, name: 'Alice Martin', role: 'Développeuse Frontend', email: 'alice@example.com', bio: 'Passionnée de Vue.js et de design system.', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bob Dupont', role: 'UX Designer', email: 'bob@example.com', bio: 'Créateur d’expériences utilisateurs fluides et accessibles.', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 3, name: 'Charlie Cassagne', role: 'DevOps', email: 'charlie@example.com', bio: 'Spécialiste CI/CD, Docker et Kubernetes.', avatar: 'https://i.pravatar.cc/150?img=8' }
];

const user = ref<UserDetail | null>(null);

onMounted(() => {
    // Conversion du paramètre de l'URL (string) en nombre pour la recherche
    const numericId = Number(currentId);
    user.value = mockUsers.find(u => u.id === numericId) || null;
});

// Navigation programmatique pour le bouton retour
function goBack(): void {
    router.push({ name: 'profiles' });
}
</script>