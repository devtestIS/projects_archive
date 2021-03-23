import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './helpers/globals'
import VueParticles from 'vue-particles'
import VueApexCharts from 'vue-apexcharts'
import moment from 'moment'
import './scss/main.scss'

import http from '@/store/helpers/http'

const token = localStorage.getItem('user-token')

if (token) {
  http.defaults.headers['Authorization'] = token
}

moment.locale('de')

Vue.use(VueParticles)
Vue.use(VueApexCharts)
Vue.component('Apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
