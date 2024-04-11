
//const axios = require(axios);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'



// // Import Bootstrap and BootstrapVue CSS files (order is important)



import '@fortawesome/fontawesome-free/js/all'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)





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
const firebaseConfig = {
    apiKey: "AIzaSyB51vIpfkQ_okDp_CsENRBdV3wUi6uECp8",
    authDomain: "sportsanalyticsvueapplication.firebaseapp.com",
    projectId: "sportsanalyticsvueapplication",
    storageBucket: "sportsanalyticsvueapplication.appspot.com",
    messagingSenderId: "922235647138",
    appId: "1:922235647138:web:96e654e60c5e8663f393fb",
    measurementId: "G-CGM8FE6ZK7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = createApp(App);


app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router);
app.mount('#app');
