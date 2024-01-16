<template>
  <div class="el-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div
      v-if="$slots.header || header"
      class="el-card__header"
      :class="isCollapseSelf ? 'collapse-icon-right' : 'collapse-icon-down'"
      @click="isCollapseSelf = !isCollapseSelf"
    >
      <slot name="header">{{ header }}</slot>
    </div>
    <div
      class="el-card__body"
      :style="bodyStyle"
      :class="{'is-collapse': isCollapseSelf}"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { Card } from 'element-ui'
export default {
  name: 'ElCardCollapse',
  extends: Card,
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isCollapseSelf: this.isCollapse,
    }
  },
}
</script>
<style lang="scss" scoped>
.el-card__header {
  cursor: pointer;
  position: relative;

  &::after {
    font-family: element-icons !important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  &.collapse-icon-right::after {
    content: '\e6e0';
  }
  &.collapse-icon-down::after {
    content: '\e6df';
  }
}
.is-collapse {
  display: none;
}
</style>
