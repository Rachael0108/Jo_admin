import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import router from './router/index'
import { Dialog } from 'vant';

const app = createApp(App)
app.use(Dialog);

app.config.globalProperties.$http = axios

app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')
app.use(router)

