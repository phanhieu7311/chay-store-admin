import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Bus from './bus/EventBus'

Vue.use(Bus)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
