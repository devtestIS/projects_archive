/* eslint-disable */
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import ShardsVue from 'shards-vue'
import VueAnalytics from 'vue-analytics'
import Vuelidate from 'vuelidate'

// Styles
import 'material-design-icons/iconfont/material-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free/js/all'
import '@/scss/custom.scss'
import '@/assets/shards-dashboard-pro/shards-dashboards.scss'
import '@/assets/scss/date-range.scss'

// Core
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import http from "@/store/helpers/http";

// Layouts
import Default from '@/layouts/Default.vue'
import HeaderNavigation from '@/layouts/HeaderNavigation.vue'
import IconSidebar from '@/layouts/IconSidebar.vue'
import {
	ServerTable,
	ClientTable,
	Event
} from 'vue-tables-2';
import preloaderPlugin from '@/plugins/preloaderPlugin'

const token = localStorage.getItem('user-token')

if (token) {
	http.defaults.headers["Authorization"] = token;
}

const isProd = process.env.NODE_ENV === 'production'

ShardsVue.install(Vue)

const requireComponent = require.context(
	'./components',
	false,
	/Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
	const componentConfig = requireComponent(fileName)
	const componentName = upperFirst(
		camelCase(
			fileName
			.split('/')
			.pop()
			.replace(/\.\w+$/, '')
		)
	)

	Vue.component(
		componentName,
		componentConfig.default || componentConfig
	)
})

Vue.component('default-layout', Default)
Vue.component('header-navigation-layout', HeaderNavigation)
Vue.component('icon-sidebar-layout', IconSidebar)

Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue()

// Analytics
Vue.use(VueAnalytics, {
	id: isProd ? 'UA-115105611-1' : 'UA-115105611-2',
	router
})

Vue.use(Vuelidate)

Vue.use(Event)
Vue.use(ServerTable, {}, true)
Vue.use(ClientTable, {}, false)
Vue.use(preloaderPlugin)

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
