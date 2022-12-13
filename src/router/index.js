import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // {
    //     path: '/',
    //     redirect: '/login',
    //     name: 'Login',
    //     component: () => import('../components/login/index.vue'),
    //     meta: {
    //         title: '登录',
    //     },
    //     hidden: true,
    // },
    {
        path: '/',
        component: () => import('../views/layout/Home.vue'),
        name: 'Home',
        children: [
            {
                path: '/baseComponent',
                name: 'baseComponent',
                component: () => import('@/views/baseComponent.vue'),
                meta: {
                    title: '组件',
                },
            },
            {
                path: '/typeScriptLearn',
                name: 'typeScriptLearn',
                component: () => import('@/views/typeScriptLearn.vue'),
                meta: {
                    title: 'ts学习',
                },
            },
            {
                path: '/editRowTable',
                name: 'editRowTable',
                component: () => import('@/views/editRowTable.vue'),
                meta: {
                    title: '可编辑列',
                },
            },
            {
                path: '/mapPage',
                name: 'mapPage',
                component: () => import('@/views/mapPage.vue'),
                meta: {
                    title: '高德地图',
                },
            },
            {
                path: '/threeEarth',
                name: 'threeEarth',
                component: () => import('@/views/earth.vue'),
                meta: {
                    title: '3D地球',
                },
            },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to,from,next) => {
    let token = localStorage.getItem('token')
    const tokenStartTime = localStorage.getItem('tokenStartTime')
    //设置token 6 天过期
    const convertTime = 6 * 24 * 3600 * 1000
    let data = (new Date()).getTime()
    if( data - tokenStartTime > convertTime){
        token = null
    }
    if(!token) {
        //如果token过期，重定向到登录页面
        // if(to.path === '/login') return next()
        next()
    }else {
        next()
    }
})

export default router;
