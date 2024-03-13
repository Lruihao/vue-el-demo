<!-- v-overflow-tooltip 指令 -->
<template>
  <div>
    <el-input v-model="content" placeholder="修改显示内容" />
    <h2>v-overflow-tooltip</h2>
    <div>
      <div>文本溢出（100px）：</div>
      <span
        v-overflow-tooltip="content"
        style="display: inline-block; width: 100px;"
      />
    </div>
    <br>
    <div>
      <div>未溢出（1000px）：</div>
      <span
        v-overflow-tooltip="content"
        style="display: inline-block; width: 1000px;"
      />
    </div>
    <el-divider />
    <h2>el-tooltip</h2>
    <el-tooltip
      :content="content"
    >
      <span>{{ content }}</span>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'OverflowTooltipView',
  data() {
    return {
      content: '这是一个超长的文本，用于测试 tooltip 的显示效果。',
    }
  },
}
</script>
