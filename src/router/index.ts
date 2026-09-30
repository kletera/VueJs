import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// Definition typée du tableau de routes
const routes: RouteRecordRaw[] = [
    // Nouvelle manière avec lazy loading
    {
        path: '/',
        alias: '/home',
        component: () => import('../views/home.vue'),
    },
    {
        path: '/about',
        meta: {
            title: 'About',
        },
        component: () => import('../views/about.vue'),
    },
    {
        path: '/cookies',
        name: 'cookies',
        component: () => import('../views/cookies.vue'),
    },
    {
        path: '/contact',
        component: () => import('../views/contact.vue'),
    },

    // Exercice
    {
        path:'/exercices',
        name: 'exercices',
        component:()=> import('../views/exercices/all-exercices.vue'),
    },
    {
        path:'/ex-text-interpolation',
        name: 'ex-text-interpolation',
        component:()=> import('../views/exercices/ex-text-interpolation.vue'),
    },
    {
        path:'/ex-event-binding',
        name: 'ex-event-binding',
        component:()=> import('../views/exercices/ex-event-binding.vue'),
    },
    {
        path: "/ex-dynamic-styling",
        name: 'ex-dynamic-styling',
        component:()=>import('../views/exercices/ex-dynamic-styling.vue'),
    },
    {
        path: "/ex-v-if",
        name: "ex-v-if",
        component:()=>import('../views/exercices/ex-v-if.vue'),
    },
    {
        path: '/ex-life-api',
        name: 'ex-life-api',
        component:()=>import('../views/exercices/ex-life-api.vue'),
    },

    // TP
    {
        path:'/tp',
        name: 'tp',
        component:()=> import('../views/tp/all-tp.vue'),
    },
    {
        path:'/tp-databinding',
        name: 'tp-databinding',
        component:()=> import('../views/tp/tp-databinding.vue'),
    },
    {
        path:'/tp-watch',
        name: 'tp-watch',
        component:()=> import('../views/tp/tp-watch.vue'),
    },
    {
        path:'/tp-form-securiser',
        name: 'tp-form-securiser',
        component:()=> import('../views/tp/tp-form-securiser.vue'),
    },

    // Lecon
    {
        path:'/lecon',
        name: 'lecon',
        component:()=> import('../views/lecon/all-lecon.vue'),
    },
    {
        path:'/lesson-attribute-binding',
        name: 'lesson-attribute-binding',
        component:()=> import('../views/lecon/lesson-attribute-binding.vue'),
    },
    {
        path:'/lesson-computed-properties',
        name: 'lesson-computed-properties',
        component:()=> import('../views/lecon/lesson-computed-properties.vue'),
    },
    {
        path:'/lesson-conditional-rendering',
        name: 'lesson-conditional-rendering',
        component:()=> import('../views/lecon/lesson-conditional-rendering.vue'),
    },
    {
        path:'/lesson-dynamic-styling',
        name: 'lesson-dynamic-styling',
        component:()=> import('../views/lecon/lesson-dynamic-styling.vue'),
    },
    {
        path:'/lesson-emit',
        name: 'lesson-emit',
        component:()=> import('../views/lecon/lesson-emit.vue'),
    },
    {
        path:'/lesson-event-binding',
        name: 'lesson-event-binding',
        component:()=> import('../views/lecon/lesson-event-binding.vue'),
    },
    {
        path:'/lesson-introduction',
        name: 'lesson-introduction',
        component:()=> import('../views/lecon/lesson-introduction.vue'),
    },
    {
        path:'/lesson-lifecycle',
        name: 'lesson-lifecycle',
        component:()=> import('../views/lecon/lesson-lifecycle.vue'),
    },
    {
        path:'/lesson-list-rendering',
        name: 'lesson-list-rendering',
        component:()=> import('../views/lecon/lesson-list-rendering.vue'),
    },
    {
        path:'/lesson-props',
        name: 'lesson-props',
        component:()=> import('../views/lecon/lesson-props.vue'),
    },
    {
        path:'/lesson-setup',
        name: 'lesson-setup',
        component:()=> import('../views/lecon/lesson-setup.vue'),
    },
    {
        path:'/lesson-syntax',
        name: 'lesson-syntax',
        component:()=> import('../views/lecon/lesson-syntax.vue'),
    },
    {
        path:'/lesson-text-interpolation',
        name: 'lesson-text-interpolation',
        component:()=> import('../views/lecon/lesson-text-interpolation.vue'),
    },
    {
        path:'/lesson-two-way-binding',
        name: 'lesson-two-way-binding',
        component:()=> import('../views/lecon/lesson-two-way-binding.vue'),
    },
    {
        path:'/lesson-watchers',
        name: 'lesson-watchers',
        component:()=> import('../views/lecon/lesson-watchers.vue'),
    },

    

    // Page Error
    {
        path: '/:pathMatch(.*)*',
        component:()=> import('../views/not-found.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;