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
  name: 'TrackingDashboard',
  extends: Dashboard,
  data() {
    return {
      // 设置默认布局
      defaultLayout: [],
    }
  },
  created() {
    this.addComponents('图表组件', componentsCharts)
    this.addComponents('日常组件', componentsDaily)
  },
}
</script>
