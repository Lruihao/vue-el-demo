import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.scss'
import App from './App.vue'
import router from '@/router'
import SvgIcon from '@/components/SvgIcon'

// register svg component globally
Vue.component('SvgIcon', SvgIcon)
// require all svg
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('@/assets/icons', false, /\.svg$/)
requireAll(req)

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$fullRouter = router
Vue.prototype.$homeRoute = router.options.routes.find(route => route.name === 'home')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
