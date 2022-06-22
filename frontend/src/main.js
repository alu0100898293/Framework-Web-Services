import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'

import '@/assets/css/header.css'
import '@fortawesome/fontawesome-free/js/all'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.config.globalProperties.$URL = 'http://localhost:3000'

app.use(PrimeVue)
app.use(router)
app.mount('#app')
