import Vue from 'vue'

import Vuex from 'vuex'
import store from './store/store.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import App from './App.vue'
import router from './router'

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
