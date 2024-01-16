import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/index.scss'
import App from './App.vue'
import router from '@/router'
import SvgIcon from '@/components/SvgIcon.vue'
import elTableSticky from '@cell-x/el-table-sticky'
import vueMinderEditor from 'vue-minder-editor-extended'
import ElCardCollapse from '@/components/ElCardCollapse.vue'

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
Vue.use(elTableSticky)
Vue.use(vueMinderEditor)
Vue.component('ElCardCollapse', ElCardCollapse)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
