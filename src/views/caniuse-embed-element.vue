<!-- <caniuse-embed> element Vue2 demo -->
<template>
  <div>
    <p>Web Components 和 Vue 擦出的火花～</p>
    <p>
      在 Vue2 中用原生自定义元素
      <el-link href="https://github.com/Lruihao/caniuse-embed-element">&lt;caniuse-embed&gt;</el-link>
      来展示 Can I Use 的数据。
    </p>
    <caniuse-embed feature="custom-elementsv1" />

    <caniuse-embed feature="css-grid" baseline style="margin-top: 1em;" />
  </div>
</template>

<script>
import '@cell-x/caniuse-embed-element'

export default {
  name: 'CaniuseEmbedElementView',
}
</script>

<style>

</style>
