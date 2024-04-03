<!-- 网站预览图生成 -->
<template>
  <div>
    <div class="page-header">
      <el-input v-model="desktopLink" placeholder="输入桌面端链接" />
      <el-input v-model="mobileLink" placeholder="输入移动端链接" />
      <el-button type="primary" :loading="loading" @click="gerenatePreview">生成预览图</el-button>
    </div>
    <div class="apple-devices-preview">
      <div class="desktop">
        <iframe :src="desktopLink" scrolling="no" />
      </div>
      <div class="tablet">
        <iframe :src="tabletLink" scrolling="no" />
      </div>
      <div class="mobile">
        <iframe :src="mobileLink" scrolling="no" />
      </div>
    </div>
  </div>
</template>

<script>
import domtoimagemore from 'dom-to-image-more'
export default {
  name: 'AppleDevicesPreview',
  data() {
    return {
      desktopLink: 'https://pre.fixit.lruihao.cn/',
      mobileLink: 'https://pre.fixit.lruihao.cn/',
      loading: false,
    }
  },
  computed: {
    tabletLink() {
      return this.desktopLink
    },
  },
  methods: {
    gerenatePreview() {
      // this.loading = true
      // domtoimagemore.toPng(document.querySelector('.apple-devices-preview'), {
      //   copyDefaultStyles: false,
      //   style: {
      //     margin: 0,
      //   },
      // }).then((dataUrl) => {
      //   const link = document.createElement('a')
      //   link.download = 'apple-devices-preview.png'
      //   link.href = dataUrl
      //   link.click()
      //   this.loading = false
      // })
      this.$message({
        message: '骚瑞，暂不支持生成图片，请手动截图！',
        type: 'warning',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.page-header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-block: 1rem;
  .el-input {
    width: 350px;
  }
}
.apple-devices-preview {
  width: max-content;
  margin: auto;
  position: relative;
  overflow: hidden;

  iframe {
    border: none;
    position: absolute;
    overflow-y: hidden;
    transform-origin: top left;
    background-color: #fff;
    margin: 0;
    padding: 0;
  }
  .desktop {
    width: 1000px;
    height: 575px;
    background: url(@/assets/images/apple-devices/mbp16.png);
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1;

    iframe {
      top: 4%;
      left: 11%;
      width: calc(2001px - 43%);
      height: calc(1150px - 29%);
      transform: scale(0.5) translate(-6px, 4px);
      transform-origin: top left;
    }
  }
  .tablet {
    background-image: url(@/assets/images/apple-devices/ipadpro13.png);
    background-size: contain;
    background-repeat: no-repeat;
    height: 486.33px;
    width: 373.66px;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
    iframe {
      top: 16px;
      left: 16px;
      border-radius: 20px;
      width: calc((100% - 33px) / 0.337);
      height: calc((100% - 33px) / 0.337);
      transform: scale(0.337);
    }
  }
  .mobile {
    background-image: url(@/assets/images/apple-devices/iphone14pro.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    width: 199.5px;
    height: 400px;
    position: absolute;
    bottom: 0;
    right: 220px;
    z-index: 3;
    iframe {
      top: 9px;
      left: 10px;
      width: calc(142.85% - 20px / 0.7);
      height: calc(142.85% - 20px / 0.7);
      border-radius: 30px;
      transform: scale(0.7);
    }
  }
}
</style>
