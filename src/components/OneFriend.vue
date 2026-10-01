<template>
    <div class="card w-full max-w-md bg-blue-400 shadow-xl my-4 text-white mx-auto">
        <div class="card-body">
            <h2 class="card-title text-xl font-bold justify-between">
                👤 {{ friend.name }}
                <span class="badge" :class="friend.premium ? 'badge-warning' : 'badge-ghost'">
                    {{ friend.premium ? 'Premium' : 'Standard' }}
                </span>
            </h2>

            <div v-if="isAfficherInfo" class="space-y-2 mt-2">
                <p class="flex items-center gap-2">
                    <span class="badge badge-outline">ID</span>
                    {{ friend.id }}
                </p>

                <p class="flex items-center gap-2">
                    <span class="badge badge-outline">📞</span>
                    {{ friend.phone }}
                </p>

                <p class="flex items-center gap-2">
                    <span class="badge badge-outline">📧</span>
                    {{ friend.email }}
                </p>
            </div>
            <button @click="btAfficherInfo" class="btn">{{isAfficherInfo ?"Afficher les détail de l'utilisateur" : "Cacher les information de l'utilisateur"}}</button>
            <button @click="btUpdateStatus" class="btn">Update Premium</button>
            <button @click="deleteFriend" class="btn">Suprimer</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 1. Exportation de l'interface pour pouvoir la réutiliser dans le parent
export interface Friend {
    id: string;
    name: string;
    phone: string;
    email: string;
    premium: boolean;
}

// 2. Déclaration des props typées avec l'interface Friend
const props=defineProps<{
    friend: Friend;
}>();

let isAfficherInfo=ref<boolean>(false);

function btAfficherInfo(){
    isAfficherInfo.value=!isAfficherInfo.value;
}

const emit = defineEmits(["mon-event-premium-update","delete"]);

// const premiumData=ref(props.friend.premium);

function btUpdateStatus():void{
    // premiumData.value= !premiumData.value;
    emit("mon-event-premium-update",props.friend.id);
}

function deleteFriend():void{
    emit("delete",props.friend.id);
}

</script>