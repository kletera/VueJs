<template>
    <div class="flex justify-center my-8">
        <div class="card w-full max-w-xl bg-base-200 shadow-xl p-6">
            <h1 class="text-3xl font-bold text-primary mb-6 text-center">
                Une simple requête HTTP GET
            </h1>

            <!-- Pokémons -->
            <h2 class="text-xl font-semibold text-secondary mb-4">Les Pokémon :</h2>
            <div class="space-y-2">
                <p v-for="(onePokemon, index) in pokeArray" :key="index" class="badge badge-primary badge-lg mx-1">
                    {{ onePokemon.name }}
                </p>
            </div>

            <div class="divider my-6"></div>

            <!-- Météo -->
            <h2 class="text-xl font-semibold text-secondary mb-4">Météo Toulouse :</h2>
            <div class="grid gap-2">
                <p class="p-2 rounded bg-base-100 shadow-sm">
                    🌡️ Température max : <span class="font-bold">{{ tmax ?? '--' }}°C</span>
                </p>
                <p class="p-2 rounded bg-base-100 shadow-sm">
                    🌡️ Température min : <span class="font-bold">{{ tmin ?? '--' }}°C</span>
                </p>
                <p class="p-2 rounded bg-base-100 shadow-sm">
                    <!--  || Plus général remplace aussi 0, '', 0 -->
                    🌡️ Température actuelle : <span class="font-bold">{{ tcurrent || '--' }}°C</span>
                </p>
                <p class="p-2 rounded bg-base-100 shadow-sm">
                    <!-- ?? plus précis ne remplace que null / undefined -->
                    ☁️ Condition météo : <span class="font-bold">{{ condition ?? '--' }}</span>
                </p>
            </div>

            <div class="divider my-6"></div>

            <!-- Digimons -->
            <h2 class="text-xl font-semibold text-secondary mb-4">Digimons :</h2>
            <div v-for="oneDigimon in digimonArray" :key="oneDigimon.id" class="card bg-base-100 w-96 shadow-sm my-1">
                <figure>
                    <img :src="oneDigimon.image" :alt="oneDigimon.name" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ oneDigimon.name }}</h2>
                    <!-- <p>{{ oneDigimon.href }}</p> -->
                </div>
            </div>

            <div class="divider my-6"></div>

            <!-- Pokemon Gen 9 -->
            <h2 class="text-xl font-semibold text-secondary mb-4">Pokemon Gen 9</h2>
            <div v-if="pokeArrayGen9.length > 0">
                <div v-for="item in pokeArrayGen9" :key="item.pokedex_id" class="card bg-base-100 w-96 shadow-sm my-1">
                    <figure>
                        <img :src="item.sprites.regular" :alt="item.name.fr" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">{{ item.name.fr }}</h2>
                        <p>{{ item.category }}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>Aucun Pokémon trouvé</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// --- Interfaces pour typer les réponses API ---

// PokéAPI
interface PokemonSimple {
    name: string;
    url: string;
}

interface PokeApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonSimple[];
}

// Tyradex API (Gen 9)
interface PokemonGen9 {
    pokedex_id: number;
    category: string;
    name: {
        fr: string;
        en: string;
        jp: string;
    };
    sprites: {
        regular: string;
        shiny: string | null;
        gmax: string | null;
    };
}

// Digimon API
interface Digimon {
    id: number;
    name: string;
    href: string;
    image: string;
}

interface DigimonApiResponse {
    content: Digimon[];
    pageable: Record<string, unknown>;
}

// Prévision Météo API
interface MeteoApiResponse {
    current_condition: {
        tmp: number;
        condition: string;
    };
    fcst_day_0: {
        tmax: number;
        tmin: number;
    };
}

// --- Modèle d'état réactif typé ---

const pokeArray = ref<PokemonSimple[]>([]);
const pokeArrayGen9 = ref<PokemonGen9[]>([]);
const digimonArray = ref<Digimon[]>([]);

const tmax = ref<number | null>(null);
const tmin = ref<number | null>(null);
const tcurrent = ref<number | null>(null);
const condition = ref<string | null>(null);

// --- Fonctions de Fetch avec Cast de Réponse ---

const fetchPokemon = async (): Promise<void> => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data: PokeApiResponse = await response.json();
        pokeArray.value = data.results;
    } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon :', error);
    }
};

const fetchMeteo = async (): Promise<void> => {
    try {
        const response = await fetch('https://prevision-meteo.ch/services/json/toulouse');
        const data: MeteoApiResponse = await response.json();
        tmax.value = data.fcst_day_0.tmax;
        tmin.value = data.fcst_day_0.tmin;
        tcurrent.value = data.current_condition.tmp;
        condition.value = data.current_condition.condition;
    } catch (error) {
        console.error('Erreur lors de la récupération de la météo :', error);
    }
};

const fetchPokemonGen9 = async (): Promise<void> => {
    try {
        const response = await fetch('https://tyradex.vercel.app/api/v1/gen/9');
        const data: PokemonGen9[] = await response.json();
        pokeArrayGen9.value = data;
    } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon Gen 9 :', error);
    }
};

const fetchDigimon = async (): Promise<void> => {
    try {
        const response = await fetch('https://digi-api.com/api/v1/digimon');
        const data: DigimonApiResponse = await response.json();
        digimonArray.value = data.content;
    } catch (error) {
        console.error('Erreur lors de la récupération des Digimons :', error);
    }
};

onMounted(() => {
    fetchPokemonGen9();
    fetchDigimon();
    fetchMeteo();
    fetchPokemon();
});

onBeforeUnmount(() => {
    console.log("Le composant va être démonté (changement de page ?)");
});
</script>