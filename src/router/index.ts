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
    {
        path: '/ex-props',
        name: 'ex-props',
        component:()=>import('../views/exercices/ex-props.vue'),
    },
    {
        path: '/ex-firebase-article-management',
        name: 'ex-firebase-article-management',
        component:()=>import('../views/exercices/ex-firebase-article-management.vue'),
    },
    {
        path: '/ex-emit',
        name: 'ex-emit',
        component:()=>import('../views/exercices/ex-emit.vue'),
    },
    {
        path: '/ex-firebase-file-rouge',
        name: 'ex-firebase-file-rouge',
        component:()=>import('../views/exercices/ex-firebase-file-rouge.vue'),
    },
    {
        path: '/ex-pinia',
        name: 'ex-pinia',
        component:()=>import('../views/exercices/ex-pinia.vue'),
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

    // auth
    {
        path:'/login',
        name: 'login',
        component:()=> import('../views/auth/login.vue'),
    },
    {
        path:'/register',
        name: 'register',
        component:()=> import('../views/auth/register.vue'),
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