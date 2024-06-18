  <!-- CSS 实现 Postman loading 效果 -->
<template>
  <div style="height: 100%;">
    <LoadingIndicator />
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'
export default {
  name: 'LoadingIndicatorView',
  components: {
    LoadingIndicator,
  }
}
</script>

