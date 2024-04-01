<!-- dom-to-image vs dom-to-image-more -->
<template>
  <div>
    <h2>dom-to-image vs dom-to-image-more</h2>
    <p>
      Select a PNG image 👇
      <el-link type="primary" :href="srcUrl" style="margin-left: 13rem;">view source</el-link>
    </p>
    <input type="file" @change="handleChange">
    <button type="button" @click="handleDownload1">Download</button>
    &nbsp;&nbsp;
    <button type="button" @click="handleDownload2">Download More</button>

    <div>
      <img
        v-show="customImg"
        :src="customImg"
        class="preview"
        alt="preview"
      >
    </div>
  </div>
</template>

<script>
import domtoimage from 'dom-to-image'
import domtoimagemore from 'dom-to-image-more'

export default {
  name: 'DomToImageView',
  data() {
    return {
      customImg: '',
      srcUrl: 'https://github.com/Lruihao/vue-el-demo/blob/main/src/views/dom-to-image.vue',
    }
  },
  methods: {
    handleChange(e) {
      this.customImg = URL.createObjectURL(e.target.files[0])
    },
    handleDownload1() {
      domtoimage.toPng(document.querySelector('img.preview'))
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'preview.png'
          link.href = dataUrl
          link.click()
        })
    },
    handleDownload2() {
      domtoimagemore.toPng(document.querySelector('img.preview'), {
        cacheBust: true
      }).then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'preview-more.png'
        link.href = dataUrl
        link.click()
      })
    }
  },
}
</script>
