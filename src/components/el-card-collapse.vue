<template>
  <div class="el-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div
      v-if="$slots.header || header"
      class="el-card__header"
      @click="toggleBody"
    >
      <slot name="header">{{ header }}</slot>
    </div>
    <div
      ref="body"
      class="el-card__body"
      :style="bodyStyle"
      :class="{'is-collapse': isCollapse}"
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
  methods: {
    toggleBody() {
      this.$refs.body.classList.toggle('is-collapse')
    },
  },
}
</script>
<style scoped>
.el-card__header {
  cursor: pointer;
}
.is-collapse {
  display: none;
}
</style>
