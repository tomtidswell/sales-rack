
import Vue from 'vue'
import App from './src/components/App.vue'
import router from './src/router'

//remove these to remove buefy 
import Buefy from 'buefy'
Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')