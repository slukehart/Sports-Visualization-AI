
const axios = require(axios);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import Vue from 'vue'

Vue.prototype.$http = axios;

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'



// // Import Bootstrap and BootstrapVue CSS files (order is important)



import '@fortawesome/fontawesome-free/js/all'


import Home from '../src/views/Home.vue'
import Dashboard from '../src/views/Dashboard.vue'
import About from '../src/views/About.vue'



 const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})


// // Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue)
// // Optionally install the BootstrapVue icon components plugin

const app = createApp(App);


app.use(Vue, router, axios);
app.mount('#app');
