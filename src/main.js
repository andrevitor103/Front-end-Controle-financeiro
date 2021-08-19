import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'

import VueMaterial from 'vue-material'
import PrimeVue from 'primevue/config'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import animated from 'animate.css'

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import  'primevue/resources/primevue.min.css'                 //core css
import  'primeicons/primeicons.css'                           //icons
import 'primeflex/primeflex.css'                              //Flex grid



Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(animated)
Vue.use(PrimeVue)
Vue.use(Vuelidate)
export const bus = new Vue();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

