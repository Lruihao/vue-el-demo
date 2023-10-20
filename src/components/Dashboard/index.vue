<!-- dashboard 页面布局，具体页面继承该组件 -->
<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div>
    <header class="page-header">
      <div class="dashboard-operations">
        <!-- 仪表盘列表 -->
        <el-dropdown
          trigger="click"
          placement="bottom-start"
          @command="switchDashboard"
        >
          <span class="el-dropdown-link">
            {{ dashboard.name }}<i class="dashboard-operation-icon el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in dashboardList"
              :key="item.id"
              icon="el-icon-odometer"
              :command="item.id"
            >
              {{ item.name }}
            </el-dropdown-item>
            <el-dropdown-item
              :disabled="loading"
              icon="el-icon-circle-plus-outline"
              command="new"
              divided
            >
              新建仪表盘
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-divider direction="vertical" />
        <el-dropdown
          trigger="click"
          placement="bottom"
          @command="handleCommand"
        >
          <i class="dashboard-operation-icon el-icon-s-operation" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :disabled="loading"
              icon="el-icon-copy-document"
              command="copy"
            >
              复制
            </el-dropdown-item>
            <el-dropdown-item
              :disabled="!hasEditPermission || loading"
              icon="el-icon-edit"
              command="edit"
            >
              编辑
            </el-dropdown-item>
            <el-dropdown-item
              :disabled="dashboard.isDefault || dashboardList.length === 1 || loading"
              icon="el-icon-delete"
              command="delete"
            >
              删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-divider direction="vertical" />
        <el-tag type="primary" size="small">{{ dashboard.isDefault ? '全员可见' : '组织可见' }}</el-tag>
      </div>
      <div class="dashboard-operations">
        <el-dropdown
          v-if="hasEditPermission"
          :disabled="loading"
          split-button
          type="primary"
          placement="bottom"
          trigger="hover"
          size="small"
          @click="isCollapse = !isCollapse"
        >
          <i class="el-icon-postcard" /> 管理组件
          <el-dropdown-menu slot="dropdown" class="dashboard-operation-menu">
            <li v-show="!isCollapse" class="el-dropdown-menu__item" tabindex="-1">
              <el-switch v-model="dashboard.compact" active-text="紧凑布局" :disabled="loading" @change="saveDashboard" />
            </li>
            <li class="el-dropdown-menu__item" tabindex="-1">
              <el-button
                type="success"
                icon="el-icon-refresh"
                class="dashboard-operation-btn"
                :disabled="loading || dashboard.layout.length === 0"
                size="mini"
                @click="refreshAllItems"
              >
                刷新
              </el-button>
              <el-button
                v-show="!isCollapse"
                type="danger"
                icon="el-icon-delete"
                class="dashboard-operation-btn"
                plain
                :disabled="loading || dashboard.layout.length === 0"
                size="mini"
                @click="clearLayout"
              >
                清空
              </el-button>
            </li>
            <li class="el-dropdown-menu__item el-dropdown-menu__item--divided" tabindex="-1">
              <el-button type="text" icon="el-icon-guide" @click="guide">新手引导</el-button>
            </li>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          v-else
          type="success"
          icon="el-icon-refresh"
          class="dashboard-operation-btn"
          :disabled="loading || dashboard.layout.length === 0"
          size="small"
          @click="refreshAllItems"
        >
          刷新
        </el-button>
        <el-divider direction="vertical" />
        <full-screen-toggler target=".page-container" />
      </div>
    </header>
    <el-container
      v-loading="loading"
      class="dashboard-container"
      data-target=".dashboard-main"
      :data-direction="dashboard.aside"
      :data-is-expand="!isCollapse"
    >
      <el-aside
        v-show="!isCollapse"
        ref="dashboardAside"
        class="dashboard-aside"
        width="auto"
        data-from="dashboard-aside"
        :draggable="!loading"
        @dragstart.native="dragStart"
        @dragend.native="dragEnd"
      >
        <header class="dashboard-aside-header">
          <span>组件列表</span>
          <button class="dashboard-close-btn el-icon-close" aria-label="Close" title="关闭" @click="isCollapse = true" />
        </header>
        <main class="dashboard-aside-main">
          <!-- 组件分类菜单（每个模板自带“通用”分类，分类超过 2 个才显示菜单） -->
          <el-menu
            v-if="componentsList.length > 2"
            v-show="!menuCollapse"
            class="dashboard-categories"
            default-active="全部"
            @select="selectCategory"
          >
            <el-menu-item
              v-for="item in componentsListAvailable"
              :key="item.category"
              :index="item.category"
            >
              <span>{{ item.category }} ({{ item.components.length }})</span>
            </el-menu-item>
          </el-menu>
          <aside-toggler v-if="componentsList.length > 2" :is-collapse.sync="menuCollapse" tooltip="分类" />
          <!-- 组件列表 -->
          <ul class="dashboard-widgets">
            <li v-if="!componentsByCategory.length" class="dashboard-widget-empty">
              <span class="widget-info">
                <i class="widget-icon el-icon-postcard" />
                <span class="widget-name">暂无组件</span>
              </span>
              <el-button icon="el-icon-plus" circle size="mini" disabled />
            </li>
            <li
              v-for="component in componentsByCategory"
              v-else
              :key="component.name"
              :title="component.widget.name"
              class="dashboard-widget"
              :draggable="!loading"
              unselectable="on"
              data-from="dashboard-widget"
              @dragstart.stop="dragStart"
              @dragend.stop="dragEnd"
              @drag.stop="drag(component.name, component.widget, $event)"
            >
              <span class="widget-info">
                <i
                  v-if="!component.widget.icon || component.widget.icon.includes('el-icon-') || component.widget.icon.includes('iconfont')"
                  :class="component.widget.icon || 'el-icon-postcard'"
                  class="widget-icon"
                />
                <svg-icon v-else :icon-class="component.widget.icon" class="widget-icon" />
                <span class="widget-name">{{ component.widget.name }}</span>
              </span>
              <el-button icon="el-icon-plus" circle size="mini" @click="addItem(component.name, component.widget)" />
              <span v-if="component.category && componentsList.length > 2" class="widget-category">{{ component.category }}</span>
            </li>
          </ul>
        </main>
      </el-aside>
      <el-main class="dashboard-main">
        <grid-layout
          ref="gridLayout"
          :layout.sync="dashboard.layout"
          :col-num="colNum"
          :row-height="rowHeight"
          :is-draggable="!isCollapse && !loading"
          :is-resizable="!isCollapse && !loading"
          :is-mirrored="false"
          :vertical-compact="dashboard.compact"
          :margin="gaps"
          :responsive="responsive"
          :use-css-transforms="true"
        >
          <!-- 注：vue-grid-layout is-resizable 默认为 true，这里转化为默认 false -->
          <grid-item
            v-for="item in dashboard.layout"
            v-show="item.i !== 'dropping'"
            :key="`${dashboard.id}-${item.i}`"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :min-w="item.minW"
            :min-h="item.minH"
            :max-w="item.maxW"
            :max-h="item.maxH"
            :is-resizable="Boolean(item.isResizable) && !isCollapse"
            @move="triggerHook(item, 'move', arguments)"
            @moved="triggerHook(item, 'moved', arguments, true)"
            @resize="triggerHook(item, 'resize', arguments)"
            @resized="triggerHook(item, 'resized', arguments, true)"
            @container-resized="triggerHook(item, 'containerResized', arguments)"
          >
            <!-- 根据 item.component 的值动态渲染组件 -->
            <template v-if="item.i !== 'dropping'">
              <component
                :is="item.component"
                ref="dashboardItem"
                class="dashboard-item"
                :aria-label="item.name"
                :data-id="item.i"
                :item="item"
                :params.sync="item.params"
                @update:params="saveDashboard"
              />
            </template>
            <!-- 操作按钮 -->
            <div
              v-if="!isCollapse || hasHook(item.component, 'refresh')"
              :class="{
                'item-operation': true,
                'el-button-group': (hasHook(item.component, 'refresh') || hasHook(item.component, 'setting')) && !isCollapse,
              }"
            >
              <el-button
                v-if="hasHook(item.component, 'refresh')"
                title="刷新组件"
                type="success"
                icon="el-icon-refresh"
                @click="triggerHook(item, 'refresh')"
              />
              <el-button
                v-if="hasHook(item.component, 'setting') && !isCollapse"
                title="配置组件"
                type="primary"
                icon="el-icon-setting"
                @click="triggerHook(item, 'setting')"
              />
              <el-button
                v-if="!isCollapse"
                title="删除组件"
                type="danger"
                icon="el-icon-close"
                @click="confirmRemoveItem(item.i)"
              />
            </div>
          </grid-item>
        </grid-layout>
        <el-empty
          v-show="!loading && dashboard.layout.length === 0"
          class="dashboard-layout-empty"
          :description="isCollapse ? '请展开组件列表添加组件' : '点击添加或拖动组件'"
        >
          <el-button type="text" icon="el-icon-guide" @click="guide">新手引导</el-button>
        </el-empty>
      </el-main>
    </el-container>
    <dialog-edit ref="dialogEdit" @refresh="getDashboard" />
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
import DialogEdit from './dialog-edit'
import AsideToggler from '@/components/AsideToggler'
import FullScreenToggler from '@/components/FullScreenToggler'
// 本项目纯前端未配置 API，API 设计参考 src/api/dashboard.js
// import dashboardAPI from '@/api/dashboard'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import steps from './steps'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import './css/driverjs-theme.scss'
import './css/dashboard.scss'

/**
 * 注册组件
 * widget.disabled 为 true 的组件不注册
 * @param {Function} requireComponents require.context 函数
 * @returns {Array} 已注册的组件列表
 */
export function registerComponents(requireComponents) {
  const components = []
  // 遍历目录下所有符合条件的文件
  requireComponents.keys().forEach(fileName => {
    // 获取组件的配置对象
    let componentConfig = requireComponents(fileName)
    componentConfig = componentConfig.default || componentConfig
    // 将 widget.disabled 不为 true 的组件注册为全局组件
    if (componentConfig.name && componentConfig.widget?.disabled !== true) {
      Vue.component(componentConfig.name, componentConfig)
      components.push(componentConfig)
    }
  })
  return components
}

// 加载 widgets 目录下所有组件
const requireComponents = require.context('./widgets', true, /\.vue$/)
const components = registerComponents(requireComponents)

export default {
  name: 'DashboardTemplate',
  components: {
    GridLayout,
    GridItem,
    DialogEdit,
    AsideToggler,
    FullScreenToggler,
  },
  /**
   * 提供当前 dashboard 实例给后代组件注入，用于后代组件访问容器内的属性或方法
   * @example inject: ['$dashboard'] 后代组件中通过 this.$dashboard 访问容器中的属性或方法
   */
  provide() {
    return {
      $dashboard: this,
    }
  },
  data() {
    /**
     * @var {Array} componentsList 组件列表 e.g. [{ category: '分类名称', components: [组件列表] }]
     * @var {Boolean} isCollapse 是否折叠侧边栏
     * @var {Number} colNum 栅格列数
     * @var {Number} rowHeight 栅格行高
     * @var {Array} gaps 栅格间隙 [水平间隙，垂直间隙] e.g. [8, 8]
     * @var {Element} dashboardGrid 可接收拖放的栅格容器
     * @var {Object} dashboard 仪表盘数据
     * @var {Number} dashboard.id 仪表盘 ID
     * @var {String} dashboard.route 路由名称
     * @var {String} dashboard.name 仪表盘名称
     * @var {Array} dashboard.layout 组件布局数据
     * @var {String} dashboard.aside 侧边栏位置（left 或 right）
     * @var {Boolean} dashboard.compact 是否垂直压缩布局
     * @var {Boolean} responsive 是否响应式布局
     * @var {Boolean} loading 是否正在加载/保存布局数据
     * @var {Array} defaultLayout 默认布局组件数据
     * @var {Boolean} hasEditPermission 是否有编辑权限
     * @var {String} selectedCategory 已选中的组件分类
     * @var {Boolean} menuCollapse 是否折叠组件分类菜单
     */
    return {
      componentsList: [
        { category: '通用', components: components },
      ],
      isCollapse: true,
      colNum: 24,
      rowHeight: 40,
      gaps: [8, 8],
      dashboardGrid: null,
      dashboardList: [],
      dashboard: {
        id: 0,
        route: this.$route.name,
        name: '默认仪表盘',
        layout: [],
        aside: 'right',
        compact: false,
        isDefault: true,
      },
      responsive: false,
      loading: false,
      defaultLayout: [],
      hasEditPermission: true, // this.checkPermission(['admin'])
      selectedCategory: '全部',
      menuCollapse: false,
    }
  },
  computed: {
    ...mapGetters('dashboard', ['getSelectedDashboardId']),
    /**
     * 已选中的仪表盘 ID
     */
    selectedDashboardId() {
      return this.getSelectedDashboardId(this.$route.name)
    },
    /**
     * 所有已注册组件，用于 dashboard 布局中的组件渲染，包含 hidden 为 true 的组件
     */
    components() {
      return this.componentsList.reduce((components, item) => {
        return components.concat(item.components)
      }, [])
    },
    /**
     * 过滤组件列表用于组件列表显示
     * @filter 过滤 widget.hidden 为 true 的组件
     * @filter 过滤组件列表为空的分类
     * @returns {Array} 过滤后的组件列表
     */
    componentsListAvailable() {
      const componentsList = JSON.parse(JSON.stringify(this.componentsList))
      componentsList.forEach(item => {
        item.components = item.components.filter(component => !component.widget.hidden)
      })
      // 新增一个全部分类放在第一位（全部分类里的组件额外加上一个 category 属性）
      componentsList.unshift({
        category: '全部',
        components: componentsList.reduce((components, item) => {
          return components.concat(item.components.map(component => {
            return { ...component, category: item.category }
          }))
        }, []),
      })
      return componentsList.filter(item => item.components.length)
    },
    /**
     * 根据 selectedCategory 获取对应的组件列表
     */
    componentsByCategory() {
      return this.componentsListAvailable.find(item => item.category === this.selectedCategory)?.components || []
    },
  },
  watch: {
    /**
     * 监听 dashboard 是否为默认布局，设置权限
     * default: admin
     * other: all
     */
    'dashboard.isDefault'(val) {
      // this.hasEditPermission = this.checkPermission(['admin']) || !val
      this.hasEditPermission = !val
    },
  },
  mounted() {
    // 获取布局数据
    this.getDashboard()

    this.dashboardGrid = document.querySelector('.dashboard-main .vue-grid-layout')
    this.dashboardGrid.addEventListener('dragover', this.onDragoverDashboard)
    this.dashboardGrid.addEventListener('drop', this.onDropDashboard)
    // 初始化导航栏操作（左侧操作默认不显示，继承组件自行导入）
    // this.$bus.$emit('set-breadcrumb-left')
    // this.$bus.$emit('set-breadcrumb-right')
  },
  beforeDestroy() {
    this.dashboardGrid.removeEventListener('dragover', this.onDragoverDashboard)
    this.dashboardGrid.removeEventListener('drop', this.onDropDashboard)
  },
  errorCaptured(err) {
    this.loading = false
    this.notify(err.message, 'error')
  },
  methods: {
    /**
     * dashboard 显示通知
     * @param {String} message 通知内容
     * @param {String} [type='success'] 通知类型，可选值：['success', 'warning', 'info', 'error']
     */
    notify(message, type = 'success') {
      this.$notify.closeAll()
      this.$notify({
        title: message,
        position: `bottom-${this.dashboard.aside}`,
        type,
        duration: 2000,
      })
    },
    /**
     * 添加组件列表及分类
     * @param {String} category 组件分类
     * @param {Array} components 组件列表
     * @param {Boolean} [isPrepend=false] 是否追加到组件列表开头
     */
    addComponents(category, components, isPrepend = false) {
      if (isPrepend) {
        this.componentsList.unshift({ category, components })
        return
      }
      this.componentsList.push({ category, components })
    },
    /**
     * 选中组件分类时，显示对应的组件列表
     * @param {String} category 组件分类
     */
    selectCategory(category) {
      this.selectedCategory = category
      // 组件列表滚动到顶部
      document.querySelector('.dashboard-container .dashboard-widgets').scrollTop = 0
    },
    /**
     * 切换仪表盘
     * @param {Number|String} id 仪表盘 ID 或者 'new’
     */
    switchDashboard(id) {
      switch (id) {
        case 'new':
          this.$refs.dialogEdit.show('new')
          break
        case this.dashboard.id:
          break
        default:
          this.loading = true
          this.dashboard = this.dashboardList.find(item => item.id === id)
          this.$store.dispatch('dashboard/setSelected', this.dashboard)
          this.loading = false
          break
      }
    },
    /**
     * 处理仪表盘操作
     * @param {String} type 操作类型，可选值：'copy'、'edit'、'delete'
     */
    handleCommand(type) {
      switch (type) {
        case 'copy':
        case 'edit':
          this.removeItem('dropping', false)
          this.$refs.dialogEdit.show(type, this.dashboard)
          break
        case 'delete':
          this.deleteDashboard()
          break
      }
    },
    /**
     * 打开新手引导
     */
    guide() {
      const driverObj = driver({
        popoverClass: 'driverjs-theme',
        showProgress: false,
        prevBtnText: '上一步',
        nextBtnText: '下一步',
        doneBtnText: '我知道了',
        onNextClick: (element, step, options) => {
          switch (options.state.activeIndex) {
            // 第一步，展开侧边栏
            case 0:
              this.isCollapse = false
              break
            // 第二步，添加示例组件到容器
            case 1:
              if (this.dashboard.layout.length === 0) {
                this.addItem('ExampleWidget', {
                  params: { content: 'Hello World!' },
                  w: 8,
                  h: 3,
                  minW: 8,
                  minH: 3,
                  maxW: 24,
                  maxH: 6,
                  isResizable: true,
                })
              }
              break
          }
          setTimeout(() => driverObj.moveNext(), 0)
        },
        onDestroyed: () => {
          // 引导结束后，收起侧边栏并保存
          this.isCollapse = true
          this.saveDashboard()
        },
        steps,
      })
      driverObj.drive()
    },
    /**
     * 刷新容器内所有组件的数据
     */
    refreshAllItems() {
      this.notify('正在刷新组件数据 ...', 'info')
      this.$refs.dashboardItem.forEach(item => {
        item.$options?.refresh?.call(item)
      })
    },
    /**
     * 清空布局
     */
    clearLayout() {
      if (this.dashboard.layout.length) {
        this.$confirm('确定要清空布局吗？', '请确定', {
          dangerouslyUseHTMLString: true,
          cancelButtonClass: 'el-icon-close',
          confirmButtonClass: 'el-icon-check',
          type: 'danger',
        }).then(() => {
          this.dashboard.layout = []
          this.saveDashboard()
        }).catch(() => {})
      }
    },
    /**
     * 生成一个自增的 id，用于组件的唯一标识 i
     * @returns {Number} id
     */
    idIncrement() {
      if (this.dashboard.layout.length === 0) {
        return 0
      }
      // 找到 layout 数据中 item.i 的最大值
      const maxId = this.dashboard.layout.reduce((max, item) => {
        return item.i > max ? item.i : max
      }, 0)
      return maxId + 1
    },
    /**
     * 对 layout 数据进行排序，按照 y 坐标从小到大，x 坐标从小到大的顺序
     */
    sortItems() {
      this.dashboard.layout.sort((a, b) => {
        return a.y - b.y || a.x - b.x
      })
    },
    /**
     * 添加组件到 layout 中
     * @param {String} component 组件名称，对应组件的 name 属性
     * @param {Object} widget 组件配置对象，对应组件的 widget 属性
     */
    addItem(component, widget) {
      if (this.dashboard.layout.length === 0) {
        this.dashboard.layout.push({ i: 0, x: 0, y: 0, component, ...widget })
        return
      }
      this.sortItems()
      const lastItem = this.dashboard.layout[this.dashboard.layout.length - 1]
      const isWrap = lastItem.x + lastItem.w + widget.w > this.colNum
      this.dashboard.layout.push({
        i: this.idIncrement(),
        x: isWrap ? 0 : lastItem.x + lastItem.w,
        y: isWrap ? lastItem.y + lastItem.h : lastItem.y,
        component,
        ...widget,
      })
      this.saveDashboard()
    },
    /**
     * 从 layout 中移除组件
     * @param {Number} i 组件的唯一标识
     * @param {Boolean} [save=true] 是否立即保存布局数据
     */
    removeItem(i, save = true) {
      this.dashboard.layout = this.dashboard.layout.filter(item => item.i !== i)
      if (i !== 'dropping' && save) {
        this.saveDashboard()
      }
    },
    /**
     * 用户删除组件双重确认
     * @param {Number} i 组件的唯一标识
     */
    confirmRemoveItem(i) {
      this.$confirm('确定要删除该组件吗？', '删除组件', {
        cancelButtonClass: 'el-icon-close',
        confirmButtonClass: 'el-icon-check',
        type: 'warning',
      }).then(() => {
        this.removeItem(i)
      }).catch(() => {})
    },
    /**
     * 判断组件是否有配置对应的 hook
     * @param {Number} component 组件名称，对应组件的 name 属性
     * @param {String} hook 需要判断的 hook 名称
     */
    hasHook(component, hook) {
      const componentConfig = this.components.find(item => item.name === component)
      return componentConfig?.[hook] && typeof componentConfig[hook] === 'function'
    },
    /**
     * 容器内的组件触发对应的 hook
     * @param {Object} item 组件实例数据
     * @param {String} hook 需要触发的 hook 名称
     * @param {Array} [args=[]] args 传递给 hook 的其他参数
     * @param {Boolean} [save=false] 触发 hook 后是否立即保存布局数据
     */
    triggerHook(item, hook, args = [], save = false) {
      if (item.i === 'dropping') { return }
      const itemRef = this.$refs.dashboardItem.find(ref => ref.$attrs['data-id'] === item.i)
      itemRef && itemRef.$options?.[hook]?.call(itemRef, item, ...args)
      save && this.saveDashboard()
    },
    /**
     * 判断鼠标是否在容器内
     * @param {Number} x 鼠标的 x 坐标
     * @param {Number} y 鼠标的 y 坐标
     */
    mouseInGrid(x, y) {
      const gridRect = this.dashboardGrid.getBoundingClientRect()
      // 鼠标相对于容器的 y 坐标
      const yRelative = y - this.dashboardGrid.parentNode.scrollTop
      return x >= gridRect.left && x <= gridRect.right && yRelative >= gridRect.top && yRelative <= gridRect.bottom
    },
    /**
     * 移除 layout 中不存在于所有已注册组件的组件
     * @param {Array} fromLayout layout 数据
     * @returns {Array} 移除不存在组件后的 layout
     */
    removeUnExistItems(fromLayout) {
      const componentsInLayout = fromLayout.map(item => item.component)
      const componentsExist = this.components.map(item => item.name)
      // 取 componentInLayout 和 componentsExist 的差集
      const diff = componentsInLayout.filter(item => !componentsExist.includes(item))
      // 移除 layout 中不存在于组件列表的组件
      return fromLayout.filter(item => !diff.includes(item.component))
    },
    /**
     * 开始拖动 组件/侧栏 时，设置拖动来源
     * @param {Event} e event
     */
    dragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.dataset.from)
      if (e.target.dataset.from === 'dashboard-aside') {
        e.dataTransfer.effectAllowed = 'link'
      }
      this.dashboardGrid.classList.add('dragging')
    },
    /**
     * 结束拖动 组件/侧栏 时
     * @param {Event} e event
     */
    dragEnd(e) {
      this.dashboardGrid.classList.remove('dragging')
    },
    /**
     * 拖动组件时，记录拖动的组件信息和显示拖动轨迹
     * dragEvent(eventType, i, x, y, h, w)
     * @param {String} component 组件名称，对应组件的 name 属性
     * @param {Object} widget 组件配置对象，对应组件的 widget 属性
     * @param {Event} e event
     */
    drag(component, widget, e) {
      // 如果鼠标悬停静止不动，不触发 drag 事件
      if (this.mousePosition && this.mousePosition.x === e.x && this.mousePosition.y === e.y) {
        return
      }
      const gridRect = this.dashboardGrid.getBoundingClientRect()
      this.mousePosition = { x: e.x, y: e.y }
      const mouseInGrid = this.mouseInGrid(this.mousePosition.x, this.mousePosition.y)
      // 使组件向左上偏移宽高的一半，以便拖动时鼠标在组件中心
      const XY = this.$refs.gridLayout.$children[0].calcXY(
        this.mousePosition.y - gridRect.y - (this.rowHeight * widget.h / 2),
        this.mousePosition.x - gridRect.x - (this.$refs.gridLayout.$children[0].calcColWidth() * widget.w / 2),
      )

      if (mouseInGrid && (this.dashboard.layout.findIndex(item => item.i === 'dropping')) === -1) {
        // 新增一个临时的 dropping 组件，记录拖动的组件信息和显示拖动轨迹
        this.dashboard.layout.push({
          i: 'dropping',
          component,
          ...XY,
          ...widget,
        })
      }
      if (this.dashboard.layout.findIndex(item => item.i === 'dropping') !== -1) {
        if (mouseInGrid) {
          // 显示拖动轨迹
          this.$refs.gridLayout.dragEvent('dragstart', 'dropping', XY.x, XY.y, widget.h, widget.w)
          return
        }
        // 隐藏拖动轨迹，并从 layout 中移除临时 dropping 组件
        this.$refs.gridLayout.dragEvent('dragend', 'dropping')
        this.removeItem('dropping', false)
      }
    },
    /**
     * 拖动组件经过容器时，阻止默认事件
     * @param {Event} e
     */
    onDragoverDashboard(e) {
      e.preventDefault()
    },
    /**
     * 拖动 组件/侧栏 放置到容器内时的拖放事件
     * @param {Event} e
     */
    onDropDashboard(e) {
      const from = e.dataTransfer.getData('text/plain')
      // 接收来自组件的拖放事件
      if (from === 'dashboard-widget') {
        // 隐藏拖动轨迹，并将 dropping 组件的 i 值改为新的值
        this.$refs.gridLayout.dragEvent('dragend', 'dropping')
        const droppingItem = this.dashboard.layout.find(item => item.i === 'dropping')
        droppingItem && (droppingItem.i = this.idIncrement())
        this.saveDashboard()
        return
      }
      // 接收来自侧栏的拖放事件
      if (from === 'dashboard-aside') {
        // 改变侧栏的位置，左侧或右侧
        const containerRect = document.querySelector('.dashboard-container').getBoundingClientRect()
        const aside = (e.x - containerRect.x < containerRect.width / 2) ? 'left' : 'right'
        if (aside !== this.dashboard.aside) {
          this.dashboard.aside = aside
          this.saveDashboard()
          this.notify(`组件列表已移动到${aside === 'left' ? '左' : '右'}侧`)
        }
      }
    },
    /**
     * 通过 route 获取 dashboard 数组（后端自动获取组织ID）
     */
    getDashboard() {
      this.loading = true
      // 演示数据
      this.dashboard.layout = this.removeUnExistItems(this.defaultLayout)
      this.dashboardList.push(this.dashboard)
      this.loading = false

      // dashboardAPI.get({ route: this.$route.name }).then(res => {
      //   this.loading = false
      //   if (res.code === 200) {
      //     if (res.data.length > 0) {
      //       // 第一个 dashboard 布局视为默认布局
      //       res.data[0].isDefault = true
      //       res.data.forEach(item => {
      //         // layout 为空时，使用默认布局填充
      //         item.layout = this.removeUnExistItems(item.layout || this.defaultLayout)
      //       })
      //       // 显示选中/默认的 dashboard
      //       this.dashboard = res.data.find(item => item.id === this.selectedDashboardId) || res.data[0]
      //       this.dashboardList = res.data
      //     } else {
      //       // 默认布局组件数据
      //       this.dashboard.layout = this.removeUnExistItems(this.defaultLayout)
      //       this.dashboardList.push(this.dashboard)
      //     }
      //   }
      // })
    },
    /**
     * 保存 dashboard
     */
    saveDashboard() {
      this.removeItem('dropping', false)
      this.dashboard.id ? this.updateDashboard() : this.addDashboard()
    },
    /**
     * 新增 dashboard
     */
    addDashboard() {
      // this.loading = true
      // dashboardAPI.add(this.dashboard).then(res => {
      //   this.loading = false
      //   if (res.code === 200) {
      //     this.dashboard.id = res.data
      //   }
      // })
    },
    /**
     * 更新 dashboard
     */
    updateDashboard() {
      // this.loading = true
      // dashboardAPI.update(this.dashboard).then(res => {
      //   this.loading = false
      // })
    },
    /**
     * 删除 dashboard
     */
    deleteDashboard() {
      this.$confirm(`确定要删除仪表盘 <code>${this.dashboard.name}</code> 吗？`, '删除仪表盘', {
        dangerouslyUseHTMLString: true,
        cancelButtonClass: 'el-icon-close',
        confirmButtonClass: 'el-icon-check',
        type: 'warning',
      }).then(() => {
        // this.loading = true
        // dashboardAPI.delete(this.dashboard.id).then(res => {
        //   this.loading = false
        //   if (res.code === 200) {
        //     this.dashboardList = this.dashboardList.filter(item => item.id !== this.dashboard.id)
        //     this.dashboard = this.dashboardList[0]
        //     this.$store.dispatch('dashboard/setSelected', this.dashboard)
        //     this.notify('仪表盘已删除!', 'warning')
        //   }
        // })
      }).catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
// 临时样式
.page-container {
  height: 100%;
  padding: 0!important;
  display: flex;
  flex-direction: column;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    padding: 0.5rem;
    box-shadow: 0 1px 12px 0 rgba(0,0,0,.1);
    border-bottom: 1px solid #e6e6e6;
    background-color: #fafbfc;
    z-index: 11;
  }
  .dashboard-container {
    flex: auto;
    overflow: hidden;
  }
}
</style>
