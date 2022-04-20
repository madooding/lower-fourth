import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import '@/assets/scss/styles.scss'
import '@/plugins/firebase'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
