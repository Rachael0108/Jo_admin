import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from './router/index'
import { Dialog } from 'vant';
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component)
}
app.use(Dialog);

app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router)

app.mount('#app')
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。

