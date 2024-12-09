<!-- 测试在 Vue 中使用 translate.js -->
<template>
  <div class="content">
    <div>本地语言： <span class="ignore">{{ localLanguage }}</span></div>
    <div>当前语言： <span class="ignore">{{ currentLanguage }}</span></div>
    <hr>
    <div class="content">
      博客（英语：Blog）是一种在线日记型式的个人网站，借由张帖子章、图片或视频来记录生活、抒发情感或分享信息。博客上的文章通常根据张贴时间，以倒序方式由新到旧排列。
    </div>
    <hr>
    按钮切换语言：
    <el-button
      v-for="lang in languages"
      :key="lang.value"
      :type="lang.value === currentLanguage ? 'primary' : ''"
      size="mini"
      class="ignore"
      @click="changeLanguage(lang.value)"
    >
      {{ lang.label }}
    </el-button>
    <el-button
      size="mini"
      type="info"
      icon="el-icon-refresh"
      @click="clearCacheLanguage"
    >
      重置
    </el-button>
    <div id="translate" style="margin-top: 0.5rem;">
      select 选择框切换语言：
    </div>
  </div>
</template>

<script>
import translate from 'i18n-jsautotranslate'

export default {
  name: 'TranslateJsView',
  data() {
    return {
      languages: [
        { label: 'English', value: 'english' },
        { label: '简体中文', value: 'chinese_simplified' },
        { label: '繁體中文', value: 'chinese_traditional' }
      ],
      localLanguage: translate.language.getLocal(),
      currentLanguage: ''
    }
  },
  mounted() {
    translate.language.setLocal('chinese_simplified')
    translate.service.use('client.edge')
    translate.language.setUrlParamControl()
    translate.listener.start()
    translate.execute()
    this.currentLanguage = translate.language.getCurrent()
  },
  methods: {
    changeLanguage(lang) {
      console.log(lang)
      translate.changeLanguage(lang)
      this.currentLanguage = translate.language.getCurrent()
    },
    clearCacheLanguage() {
      translate.language.clearCacheLanguage()
      this.$message.success('重置成功！')
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
