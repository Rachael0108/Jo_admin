import type { RouteRecordRaw } from "vue-router";
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from "vue-router";
import { basicRoutes } from './routes';

//白名单应该包含静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
    array.forEach((item)=>{
        WHITE_NAME_LIST.push(item.name)
        getRouteNames(item.children || [])
    })
getRouteNames(basicRoutes)

// 路由实例
export const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
})
