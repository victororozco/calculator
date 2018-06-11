import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

// css styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
