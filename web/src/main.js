import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Cards from './components/cards.vue'

const app = createApp(App)
app.component('Cards', Cards)
app.use(router)
app.use(ElementPlus)
app.mount('#app')