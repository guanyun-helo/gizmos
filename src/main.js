import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import { createRouter,createWebHashHistory} from 'vue-router'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import Home from "./pages/Home.vue";
import VueGtag from "vue-gtag";

const routes = [
  { path: '/:coin?', component: Home, meta:{
    title: 'Gizmos'
  }},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

const app = createApp(App)
app.use(router)
app.use(VueGtag, {
  config: { id: "G-PDL744ZCZS" }
})
app.use(naive)
app.mount('#app')