import Vue from 'vue'
import AppComponent from './components/App/app.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(Vuetify)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    app: AppComponent
  },
  render: h => h('app')
})
