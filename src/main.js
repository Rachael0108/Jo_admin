import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import { Dialog } from 'vant';

const app = createApp(App)
app.use(Dialog);

app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router)

app.mount('#app')
