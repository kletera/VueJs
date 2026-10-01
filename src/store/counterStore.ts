import { defineStore } from 'pinia';

// 1. Interface pour typer l'état du store
interface CounterState {
    count: number;
}

export const useCounterStore = defineStore('counter', {
    // Dans state, on type le retour de la fonction
    state: (): CounterState => ({
        count: 0,
    }),
    //Getters pluto lecture seule propriété calculée 
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    // Actions pour modifier l'état du store
    actions: {
        increment(): void {
            this.count++;
        },
        decrement(): void {
            this.count--;
        },
        reset(): void {
            this.count = 0;
        },
    },
    
    persist: true,
});