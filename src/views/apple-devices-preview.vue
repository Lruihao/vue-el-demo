<!-- 网站预览图生成 -->
<template>
  <div :style="{ backgroundColor: pageBackgroundColor }">
    <div v-if="!isPreview" class="page-header">
      <el-input v-model="desktopLink" placeholder="输入桌面端链接" />
      <el-input v-model="mobileLink" placeholder="输入移动端链接" />
      <el-color-picker v-model="pageBackgroundColor" :predefine="predefineColors" />
      <el-switch v-model="showBangs" active-text="显示刘海" />
      <el-button-group style="margin-left: 1rem;">
        <el-button type="primary" size="medium" @click="preview">预览</el-button>
        <el-button type="primary" size="medium" :loading="loading" @click="generatePreview">下载</el-button>
      </el-button-group>
    </div>
    <div class="apple-devices-preview">
      <div class="desktop">
        <iframe :src="desktopLink" scrolling="no" />
        <div class="image-preview d-none" />
      </div>
      <div class="tablet">
        <iframe :src="tabletLink" scrolling="no" />
        <div class="image-preview d-none" />
      </div>
      <div class="mobile">
        <iframe :src="mobileLink || desktopLink" scrolling="no" />
        <div class="image-preview d-none" />
      </div>
      <div v-show="showBangs" class="mobile-mask" />
    </div>
  </div>
</template>

<script>
import domtoimagemore from 'dom-to-image-more'
export default {
  name: 'AppleDevicesPreview',
  data() {
    return {
      desktopLink: 'https://fixit.lruihao.cn/',
      mobileLink: 'https://lruihao.cn/',
      loading: false,
      showBangs: false,
      isPreview: false,
      pageBackgroundColor: '#fff',
      predefineColors: [
        '#fff',
        '#000',
        '#ffe9e3',
        '#dcd6f7',
        '#B1B3E4',
        '#81d795',
        '#7ac5cd',
        '#f6e58d',
        '#ffbe76',
        '#ff8e8e',
      ],
    }
  },
  computed: {
    tabletLink() {
      return this.desktopLink
    },
  },
  watch: {
    isPreview(val) {
      const headerContainer = document.querySelector('.header-container')
      headerContainer.style.display = val ? 'none' : 'flex'
    },
  },
  mounted() {
    // 监听键盘事件 Esc 退出预览
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.isPreview = false
      }
    })
  },
  methods: {
    getIframeImage() {
      const iframeHtml = document.querySelector('iframe')
      const iframeBody = iframeHtml.document.getElementsByTagName('body')[0]
      domtoimagemore.toPng(iframeBody, {
        width: iframeBody.scrollWidth,
        height: iframeBody.scrollHeight,
      }).then((dataUrl) => {
        const image = new Image()
        image.src = dataUrl
        image.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(image, 0, 0)
          const imageData = ctx.getImageData(0, 0, image.width, image.height)
          const data = imageData.data
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]
            const a = data[i + 3]
            if (r === 255 && g === 255 && b === 255 && a === 255) {
              data[i + 3] = 0
            }
          }
          ctx.putImageData(imageData, 0, 0)
          const dataUrl = canvas.toDataURL('image/png')
          this.$refs.iframe.classList.add('d-none')
          this.$refs.iframe.nextElementSibling.classList.remove('d-none')
          this.$refs.iframe.nextElementSibling.style.backgroundImage = `url(${dataUrl})`
          this.$refs.iframe.nextElementSibling.style.backgroundColor = '#fff'
        }
      })

    },
    preview() {
      this.isPreview = true
      this.$message({
        message: '预览 15 秒后自动退出或按 ESC 键退出，你可以使用截图工具保存图片！',
        type: 'info',
        showClose: true,
        duration: 2000,
      })
      setTimeout(() => {
        this.isPreview = false
      }, 15000)
    },
    generatePreview() {
      // this.loading = true
      // this.preview()
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
        message: '骚瑞，暂不支持生成图片，请点击预览后手动截图！',
        type: 'warning',
        showClose: true,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.page-header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-block: 1rem;
  .el-input {
    width: 300px;
  }
}
.d-none {
  display: none !important;
}
.apple-devices-preview {
  width: max-content;
  margin: auto;
  position: relative;
  overflow: hidden;

  iframe,
  .image-preview {
    border: none;
    position: absolute;
    overflow-y: hidden;
    transform-origin: top left;
    background-color: #fff;
    margin: 0;
    padding: 0;
  }
  .image-preview {
    background: none;
    outline: none;
    overflow: hidden;
  }
  .desktop {
    width: 1000px;
    height: 575px;
    background: url(@/assets/images/apple-devices/mbp16.png);
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1;
    .image-preview,
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
    .image-preview,
    iframe {
      top: 17px;
      left: 16px;
      border-radius: 16px;
      width: calc(296.73591% - 96.82285px);
      height: calc(296.73591% - 96.82285px);
      transform: scale(.337);
    }
  }
  .mobile,
  .mobile-mask {
    background-image: url(@/assets/images/apple-devices/iphone15pro.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    width: 199.5px;
    height: 400px;
    position: absolute;
    bottom: 0;
    right: 220px;
    outline: none;
    overflow: hidden;
  }
  .mobile {
    z-index: 3;
    .image-preview,
    iframe {
      top: 8.6px;
      left: 11.74px;
      width: calc(143.85% - 34.72857px);
      height: calc(143.85% - 29.11429px);
      border-radius: 32px;
      transform: scale(0.7);
    }
  }
  .mobile-mask {
    z-index: 4;
  }
}
</style>
