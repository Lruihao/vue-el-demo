<template>
  <div class="aside-toggler-container">
    <el-tooltip
      v-if="tooltipVisible"
      effect="dark"
      :content="tooltipContent"
      :placement="position === 'right' ? 'left' : 'right'"
    >
      <div class="aside-toggler" :data-position="position" @click="toggle">
        <i :class="iconClass" />
      </div>
    </el-tooltip>
  </div>
</template>

<script>
/**
 * 侧栏折叠按钮，用法参考功能用例、产品版本管理等页面
 * @example <aside-toggler :is-collapse="isCollapse" />
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
    }
  },
  data() {
    return {
      tooltipVisible: true
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
    }
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
  methods: {
    toggle() {
      this.$emit('update:isCollapse', !this.isCollapse)
      this.$emit('toggle', !this.isCollapse)
    }
  }
}
</script>

<style lang="scss" scoped>
.aside-toggler-container {
  height: 100%;
  position: relative;
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
  &[data-position='left'] {
    transform: translateY(-50%);
    left: 0;
  }
  &[data-position='right'] {
    transform: translateY(-50%) rotate(180deg);
    right: 0;
  }
}
</style>
