// import type { AppRouteRecordRaw, AppRouteModule } from "@/router/types";
// import {PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE} from '@/router/routes/basic';
//
// // import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
// const modules = import.meta.globEager('./modules/**/*.ts');
// const routeModuleList: AppRouteModule[] = [];
//
// Object.keys(modules).forEach((key) => {
//     const mod = modules[key].default || {}
//     const modList = Array.isArray(mod) ? [...mod] : [mod]
//     routeModuleList.push(...modList)
// })
// // 路由集合
// export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]
// //跟路由
// export const RootRoute: AppRouteRecordRaw = {
//     path: '/',
//     name: 'Root',
//     redirect: PageEnum.BASE_HOME
// }
