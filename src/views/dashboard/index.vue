<!-- 拖拽式仪表盘-->
<!-- 文档：https://lruihao.cn/posts/draggable-dashboard/ -->
<script>
import Dashboard, { registerComponents } from '@/components/Dashboard'

// 加载 widgets 目录下所有组件
// const requireComponents = require.context('./widgets', true, /\.vue$/)
// const components = registerComponents(requireComponents)

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
    // this.addComponents('分类1', components, true)
  },
}
</script>
