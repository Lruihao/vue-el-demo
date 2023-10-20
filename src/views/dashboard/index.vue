<!-- 拖拽式仪表盘-->
<!-- 文档：https://lruihao.cn/posts/draggable-dashboard/ -->
<script>
import Dashboard, { registerComponents } from '@/components/Dashboard'

// 加载 widgets 目录下所有组件
const requireComponentsCharts = require.context('./widgets/charts', true, /\.vue$/)
const componentsCharts = registerComponents(requireComponentsCharts)
const requireComponentsDaily = require.context('./widgets/daily', true, /\.vue$/)
const componentsDaily = registerComponents(requireComponentsDaily)

export default {
  name: 'HomeDashboard',
  extends: Dashboard,
  data() {
    return {
      // 设置默认布局
      defaultLayout: [
        { i: 1, component: 'HitokotoWidget', x: 0, y: 6, params: { c: ['d', 'h', 'i', 'j', 'k'], min: 0, max: 30 }, w: 24, h: 1, minW: 8, maxW: 24, maxH: 1, isResizable: true },
      ],
    }
  },
  created() {
    this.addComponents('图表', componentsCharts)
    this.addComponents('日常', componentsDaily)
  },
}
</script>
