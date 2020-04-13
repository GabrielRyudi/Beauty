import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import Home from './pages/Home.vue'
import About from './pages/about.vue'
import Login from './pages/Login.vue'
import Client from './pages/Client.vue'
import Product from './pages/Product.vue'
import Employee from './pages/Employee.vue'
import Supplier from './pages/Supplier.vue'
import Transaction from './pages/Transaction.vue'
import History from './pages/History.vue'
import Schedule from './pages/Schedule.vue'
import Buy from './pages/Buy.vue'
import axios from 'axios'

const http = axios.create({
	baseURL: 'https://beautify.ottersystem.com:3000',
})

Vue.prototype.$http = http

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

library.add(fas)

Vue.component('v-awt', FontAwesomeIcon)

const router = new VueRouter({
	mode: 'history',
	routes:[
		{
			path: '/home',
			component:Home,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/',
			component:Login
		},
		{
			path: '/cliente',
			component:Client,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/funcionario',
			component:Employee,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/fornecedor',
			component:Supplier,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/produto',
			component:Product,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/compra',
			component:Buy,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/transacao',
			component:Transaction,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/historico',
			component:History,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/agenda',
			component: Schedule,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/about',
			component: About,
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
	  	if (localStorage.getItem("jwt") == null) {
			next({
		  		path: "/"
			});
	  	} else {
			next();
	  	}
	} else {
	  	next();
	}
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
