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
import Clickoutside from 'element-ui/src/utils/clickoutside'
import overflowTooltip from '@/directives/overflow-tooltip'

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
// v-clickoutside 指令，用于点击元素外部触发事件
Vue.directive('clickoutside', Clickoutside)
// v-focus 指令，用于元素聚焦
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
// v-overflow-tooltip 指令，用于元素内容溢出时显示 tooltip
Vue.use(overflowTooltip)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
