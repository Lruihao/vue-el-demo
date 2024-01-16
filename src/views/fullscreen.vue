<!-- 全屏切换方案 -->
<template>
  <div>
    <div class="page-header">
      <b>FullScreenToggler 组件切换全屏 👉 </b>
      <FullScreenToggler target=".page-container" />
    </div>
    <div>
      <div class="fullscreen-toolbar">
        <el-switch v-model="bodyAgent" active-text="bodyAgent" />
        <el-switch v-model="pageOnly" active-text="pageOnly" :disabled="bodyAgent" />
        <el-switch v-model="teleport" active-text="teleport" :disabled="bodyAgent" />
      </div>
      <div class="fullscreen-wrapper">
        <FullScreenToggler
          target=".fullscreen-wrapper"
          fullscreen-class="is-fullscreen-wrapper"
          :body-agent="bodyAgent"
          :page-only="pageOnly"
          :teleport="teleport"
          @change="handleFullscreenChange"
        />
        <el-image v-show="!isFullscreen" class="fullscreen-image" src="//picsum.photos/640/360?random=1" />
        <el-image v-show="isFullscreen" class="fullscreen-image" src="//picsum.photos/1280/720?random=1" />
      </div>
    </div>
  </div>
</template>

<script>
import FullScreenToggler from '@/components/FullScreenToggler'

export default {
  name: 'FullscreenView',
  components: {
    FullScreenToggler,
  },
  data() {
    return {
      isFullscreen: false,
      bodyAgent: true,
      pageOnly: false,
      teleport: false,
    }
  },
  methods: {
    handleFullscreenChange(isFullscreen) {
      this.isFullscreen = isFullscreen
    },
  },
}
</script>

<style lang="scss" scoped>
.page-header {
  text-align: right;
}
.fullscreen-toolbar {
  margin-block: 1rem;
  display: flex;
  gap: 1rem;
}
.fullscreen-wrapper {
  width: 100%;
  height: 500px;
  background: #888;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  position: relative;

  .full-screen-toggler {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    transform: scale(1.5) translateX(-0.125rem);
  }

  .fullscreen-image {
    margin: auto;
    object-fit: cover;
  }
}
.is-fullscreen-wrapper {
  z-index: 2000;
}
</style>
