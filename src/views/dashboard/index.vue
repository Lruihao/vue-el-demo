<!-- 拖拽式仪表盘 -->
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
        { i: 1, component: 'ExampleWidget', x: 0, y: 0, name: '便利贴', icon: 'el-icon-postcard', params: { content: '李绅《悯农二首》\n\n春种一粒粟，秋收万颗子。\n四海无闲田，农夫犹饿死。\n\n锄禾日当午，汗滴禾下土。\n谁知盘中餐，粒粒皆辛苦？' }, disabled: false, hidden: false, w: 12, h: 6, minW: 8, minH: 3, maxW: 24, maxH: 6, isResizable: true },
        { i: 2, component: 'HitokotoWidget', x: 12, y: 3, name: '一言', icon: 'note', params: { c: ['d', 'h', 'i', 'j', 'k'], min: 0, max: 30 }, w: 12, h: 1, minW: 8, maxW: 24, maxH: 1, isResizable: true },
        { i: 3, component: 'AppTestTypesBarWidget', x: 0, y: 6, name: 'App 稳定性测试类型分布', icon: 'h-bar', params: { dateRange: ['', ''], selected: 'all' }, w: 12, h: 8, minW: 6, minH: 6, maxW: 12, maxH: 8, isResizable: true },
        { i: 4, component: 'AppActivityRateLiquidWidget', x: 12, y: 6, name: 'App 稳定性测试 Activity 覆盖率', icon: 'liquid', params: { appIds: [], dateRange: ['', ''], selected: 'all' }, w: 12, h: 8, minW: 6, minH: 6, maxW: 12, maxH: 8, isResizable: true },
      ],
    }
  },
  created() {
    this.addComponents('图表', componentsCharts)
    this.addComponents('日常', componentsDaily)
  },
}
</script>
