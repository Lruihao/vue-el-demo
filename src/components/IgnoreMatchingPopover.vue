<template>
  <el-popover
    placement="left-start"
    width="300"
    trigger="click"
  >
    <template #reference>
      <el-button
      
        type="text"
        size="small"
      >
        <SvgIcon icon-class="filter" />
      </el-button>
    </template>
    <el-form class="ignore-keywords-form" :model="form" label-position="top" size="mini">
      <el-form-item label="启用忽略" class="form-item-inline">
        <el-switch v-model="form.ignoreEnabled" />
      </el-form-item>
      <el-form-item v-if="form.ignoreEnabled" label="忽略关键词">
        <el-tag
          v-for="(keyword, index) in form.ignoreKeywords"
          :key="index"
          :disable-transitions="false"
          closable
          size="small"
          @close="removeKeyword(keyword)"
        >{{ keyword }}</el-tag> <!-- eslint-disable-line vue/multiline-html-element-content-newline -->
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="mini"
          @keyup.enter.native.prevent="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag"
          size="mini"
          icon="el-icon-plus"
          @click="showInput"
        />
      </el-form-item>
    </el-form>
  </el-popover>
</template>

<script>
export default {
  name: 'IgnoreMatchingPopover',
  props: {
    ignoreEnabled: {
      type: Boolean,
      default: false,
    },
    ignoreKeywords: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: {
        ignoreEnabled: this.ignoreEnabled,
        ignoreKeywords: this.ignoreKeywords,
      },
      inputVisible: false,
      inputValue: '',
    }
  },
  computed: {
    ignoreMatchingLines() {
      return this.form.ignoreKeywords.length ? `(${this.form.ignoreKeywords.join('|')})` : ''
    },
  },
  watch: {
    ignoreKeywords(val) {
      this.form.ignoreKeywords = val
    },
    'form.ignoreEnabled'(val) {
      this.$emit('change', !val ? '' : this.ignoreMatchingLines)
    },
    'form.ignoreKeywords'(val) {
      this.$emit('change', this.ignoreMatchingLines)
      this.$emit('update:ignoreKeywords', val)
    },
  },
  methods: {
    removeKeyword(tag) {
      this.form.ignoreKeywords.splice(this.form.ignoreKeywords.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue && !this.form.ignoreKeywords.includes(inputValue)) {
        this.form.ignoreKeywords.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.ignore-keywords-form {
  ::v-deep .el-form-item {
    margin-bottom: 0.25rem;
  }

  .el-tag + .el-tag,
  .el-tag + .button-new-tag,
  .el-tag + .input-new-tag {
    margin-left: 0.5rem;
  }

  .button-new-tag {
    height: 28.5px;
    line-height: 28.5px;
    padding: 0 10px;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
    ::v-deep .el-input__inner {
      padding-inline: 0.5rem;
    }
  }
}

.el-form--label-top::v-deep {
  .el-form-item__label {
    padding-bottom: 0 !important;
    line-height: 30px !important;
  }
  // 当 form label-position 为 top 时
  // 使用该样式的 el-form-item 可以使得 label 和 input 并行显示
  .form-item-inline {
    .el-form-item__label {
      padding-right: 12px !important;
      padding-bottom: 0 !important;
    }
    .el-form-item__content {
      display: inline-block;
    }
  }
}
</style>
