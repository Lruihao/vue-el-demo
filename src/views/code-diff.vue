<!-- code diff 测试 -->
<template>
  <div>
    <div class="code-input-container">
      <el-input
        v-model="oldString"
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 15 }"
      />
      <el-input
        v-model="newString"
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 15 }"
      />
    </div>
    <code-diff
      :old-string="oldString"
      :new-string="newString"
      language="json"
      output-format="side-by-side"
    />
  </div>
</template>

<script>
import { CodeDiff } from 'v-code-diff'

export default {
  name: 'CodeDiffView',
  components: {
    CodeDiff,
  },
  data() {
    return {
      oldString: '{\n  "code": "200",\n  "msg": "请求成功",\n  "data": {\n    "hitokoto": "往者不可谏，来者犹可追。",\n    "from": "论语·微子篇"\n  }\n  "time": "2024-01-12 17:27:03"\n}',
      newString: '{\n  "code": "200",\n  "msg": "请求成功",\n  "data": {\n    "hitokoto": "成熟的人眼里满是前途，稚嫩的人眼里满是爱恨情仇。",\n    "from": "网易云热评"\n  }\n  "time": "2024-01-12 17:27:06"\n}',
    }
  },
}
</script>

<style lang="scss" scoped>
.code-input-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
