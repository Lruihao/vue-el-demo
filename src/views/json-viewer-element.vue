<!-- <json-viewer> element Vue2 demo -->
<template>
  <div>
    <p>Web Components 和 Vue 擦出的火花～</p>
    <p>
      在 Vue2 中用原生自定义元素
      <el-link href="https://github.com/Lruihao/json-viewer-element">&lt;json-viewer&gt;</el-link>
      来展示 JSON 格式化数据。
      <el-button type="primary" @click="switchTheme" size="mini">切换主题</el-button>
    </p>
    <json-viewer :value="JSON.stringify(jsonData)" boxed :copyable="JSON.stringify(copyOptions)" :theme="theme" />
  </div>
</template>

<script>
import 'json-viewer-element';

export default {
  name: 'JsonViewerElementView',
  data() {
    return {
      jsonData: {
        name: 'json-viewer-element',
        description: 'A web component for viewing JSON data in a pretty, interactive way.',
        version: '1.0.0',
        repository: {
          type: 'git',
          url: 'https://github.com/Lruihao/json-viewer-element',
        },
        author: 'Lruihao',
        license: 'MIT',
      },
      theme: 'dark',
      copyOptions: {
        copyText: '复制',
        copiedText: '复制成功',
        timeout: 2000,
        align: 'right',
      },
    }
  },
  methods: {
    switchTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
    },
  },
}
</script>

<style>

</style>
