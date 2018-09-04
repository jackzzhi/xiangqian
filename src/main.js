// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import config from './assets/js/config'
import './assets/js/swiper.min'
import 'swiper/dist/css/swiper.css'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.myAjax=axios
Vue.prototype.config=config

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
