<!-- 自定义指令测试 -->
<template>
  <div>
    <el-button
      v-clickoutside="clickoutside"
      v-focus
      type="primary"
      @focus.native="focus"
      @click="click"
    >
      点我
    </el-button>
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'CustomDirectiveView',
  data() {
    return {
      message: '',
      firstFocus: true
    }
  },
  methods: {
    clickoutside() {
      this.message = '你为什么不点我！😠'
    },
    click() {
      this.message = '你点了我！😄'
    },
    focus() {
      if (this.firstFocus) {
        this.message = '刚进来就聚焦在我身上！😎'
        this.firstFocus = false
      }
    }
  }
}
</script>

<style>

</style>
