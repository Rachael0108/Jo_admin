import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/login/index.vue'),
        meta: {
            title: '登录',
        },
        hidden: true,
    },
    {
        path: '/',
        component: () => import('../views/layout/Home.vue')
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
