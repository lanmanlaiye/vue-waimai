// @ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible'
// import { Button, Icon, Toast } from 'vant'
import router from './router'
import store from './store'
// import 'vant/lib/index.css'
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import './assets/css/common.less'
import './api/mock'
const app = createApp(App)
// app.use(Button).use(Icon).use(Toast)
app.use(router).use(store)
app.mount('#app')

