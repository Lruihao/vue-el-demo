<template>
  <div
    class="aside-toggler-container"
    :data-position="position"
    @mousedown="dragEvent"
  >
    <div v-if="!isCollapse && dragElement !== null" class="resize-bar" />
    <el-tooltip
      v-if="tooltipVisible"
      effect="dark"
      :content="tooltipContent"
      :placement="position === 'right' ? 'left' : 'right'"
    >
      <div class="aside-toggler" @click="toggle">
        <i :class="iconClass" />
      </div>
    </el-tooltip>
  </div>
</template>

<script>
/**
 * 侧栏折叠按钮，用法参考功能用例、产品版本管理等页面
 * dragEvent 拖动事件使用说明：
 * 设置 dragElementClass 为【父组件】中可拖动的元素的 class，然后在【父组件】引入该组件即可
 * @example
 * <el-aside v-show="!isCollapse" class="drag-element"> ... </el-aside>
 * <aside-toggler :is-collapse="isCollapse" drag-element-class="drag-element" />
 */
export default {
  name: 'AsideToggler',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: String,
      default: ''
    },
    activeTooltip: {
      type: String,
      default: ''
    },
    inactiveTooltip: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'left'
    },
    minWidth: {
      type: Number,
      default: 200
    },
    maxWidth: {
      type: Number,
      default: 600
    },
    dragElementClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tooltipVisible: true,
      dragElement: null
    }
  },
  computed: {
    tooltipContent() {
      const activeTooltip = this.activeTooltip || `收起${this.tooltip}`
      const inactiveTooltip = this.inactiveTooltip || `展开${this.tooltip}`
      return this.isCollapse ? inactiveTooltip : activeTooltip
    },
    iconClass() {
      return {
        'aside-toggler-icon': true,
        'el-icon-caret-left': !this.isCollapse,
        'el-icon-caret-right': this.isCollapse,
      }
    },
  },
  watch: {
    /**
     * It's a dirty hack to fix the tooltip position issue.
     */
    position(val) {
      this.tooltipVisible = false
      this.$nextTick(() => {
        this.tooltipVisible = true
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.dragElementClass) {
        this.dragElement = this.$parent.$el.getElementsByClassName(this.dragElementClass)[0]
      }
    })
  },
  methods: {
    toggle(e) {
      e.stopPropagation()
      this.$emit('update:isCollapse', !this.isCollapse)
      this.$emit('toggle', !this.isCollapse)
    },
    dragEvent(e) {
      // 阻止事件冒泡
      e.stopPropagation()
      // 如果隐藏或者没有侧栏不能拖动
      if (this.isCollapse || !this.dragElement) {
        return
      }
      const oldPointX = e.clientX
      const oldOffsetWidth = this.dragElement.offsetWidth
      document.onmousemove = (event) => {
        // 算出新的宽度
        const newOffsetWidth = this.position === 'left'
          ? (oldOffsetWidth + (event.clientX - oldPointX))
          : (oldOffsetWidth - (event.clientX - oldPointX))
        // 限定在宽度最小宽度到最大宽度之间
        this.dragElement.style.width = `clamp(${this.minWidth}px, ${newOffsetWidth}px, ${this.maxWidth}px)`
        // 设置鼠标样式
        let cursor = 'col-resize'
        if (newOffsetWidth <= this.minWidth) {
          cursor = this.position === 'left' ? 'e-resize' : 'w-resize'
        } else if (newOffsetWidth >= this.maxWidth) {
          cursor = this.position === 'left' ? 'w-resize' : 'e-resize'
        }
        document.body.style.cursor = cursor
      }
      document.onmouseup = (event) => {
        document.onmousemove = null
        document.onmouseup = null
        // 移除鼠标样式
        document.body.style.cursor = ''
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.aside-toggler-container {
  height: 100%;
  position: relative;
  z-index: 100;
}
.resize-bar {
  position: absolute;
  width: 4px;
  height: 100%;
  flex-shrink: 0;
  z-index: 100;
  background: none;
  user-select: none;
  transform: translateX(-50%);
}
.resize-bar:active,
.resize-bar:focus,
.resize-bar:hover {
  cursor: col-resize;
  --active-color: #65aff5;
  [data-position='left'] & {
    background: linear-gradient(to left, transparent 50%, var(--active-color) 50%);
  }
  [data-position='right'] & {
    background: linear-gradient(to right, transparent 50%, var(--active-color) 50%);
  }
}
.aside-toggler {
  background-image: url('holder.svg');
  position: absolute;
  width: 12px;
  height: 56px;
  top: 50%;
  z-index: 10;
  cursor: pointer;
  opacity: 0.7;

  .aside-toggler-icon {
    height: 100%;
    display: inline-flex;
    align-items: center;
    margin-left: -3px;
    color: #909399;
  }
  &:hover {
    opacity: 1;
  }
  [data-position='left'] & {
    transform: translateY(-50%);
    left: 50%;
  }
  [data-position='right'] & {
    transform: translateY(-50%) rotate(180deg);
    right: 50%;
  }
}
</style>
