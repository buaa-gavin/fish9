import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue({
  vuetify,
  router,
  render: h => h(App),
})

Vue.prototype.$bus.$mount('#app')
