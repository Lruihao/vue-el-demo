<!-- 可折叠的 el-card -->
<template>
  <div>
    <ElCardCollapse class="box-card" :is-collapse="isCollapse">
      <template #header>
        <div class="flex-between">
          <span>卡片名称</span>
          <el-button style="padding: 3px 0; margin-right: 10px;" type="text">操作按钮</el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </ElCardCollapse>
  </div>
</template>

<script>
export default {
  name: 'CardCollapseView',
  data() {
    return {
      isCollapse: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 480px;
}
</style>
