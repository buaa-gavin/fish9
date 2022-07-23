import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import {saveAs} from 'file-saver';
import JSZipUtils from 'jszip-utils'
import JSZip from 'pizzip'
import Docxtemplater from 'docxtemplater'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue({
  vuetify,
  router,
  render: h => h(App),
})

Vue.prototype.$bus.$mount('#app')
