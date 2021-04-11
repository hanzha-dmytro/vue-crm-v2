import Vue from 'vue'
import Vuelidate from 'vuelidate/src'
import VueMeta from 'vue-meta'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import dataFilter from "./filters/data.filter"
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import tooltipDirective from './directives/tooltip.directive'
import Loader from "./components/app/Loader"

import 'materialize-css/dist/js/materialize'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.filter('date', dataFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyDPPPJbzeAABrRYZuplJqUSGil3a-VJO5w",
  authDomain: "vue-crm-v2.firebaseapp.com",
  projectId: "vue-crm-v2",
  storageBucket: "vue-crm-v2.appspot.com",
  messagingSenderId: "670930879684",
  appId: "1:670930879684:web:f09551bb109c7c540bf591",
  measurementId: "G-NRZ9T8VDSQ"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})