import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Fastclick from 'fastclick'
import vueWaves from './directive/waves/waves'
import { maybe } from './utils/utils'
import ElementUI from 'element-ui'

import '@/scss/utils.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(vueWaves)

// 加载第三方【快速点击】插件
Fastclick.attach(document.body)


Vue.mixin({
  methods: {
	maybe,
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')