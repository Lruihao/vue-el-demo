<!-- 一言组件 -->
<template>
  <div
    v-loading="loading"
    class="bg-transparent hitokoto-container"
    shadow="never"
    :data-is-collapse="$dashboard.isCollapse"
  >
    <div class="hitokoto-body">
      <div class="hitokoto-operation">
        <i class="el-icon-document-copy" title="复制" @click="copy" />
        <i class="el-icon-refresh" title="切换" @click="getSentence" />
        <i class="el-icon-search" title="搜索" @click="search" />
      </div>
      <span
        title="点击左键复制，右键切换"
        class="hitokoto-text"
        @mousedown="sentenceMousedown"
      >{{ sentence.hitokoto }}</span>
      <span
        class="hitokoto-origin"
        @mousedown="sentenceMousedown"
      >
        <span class="hitokoto-from">{{ sentence.from }}</span>
        <span class="hitokoto-from_who">{{ sentence.from_who }}</span>
      </span>
    </div>

    <el-dialog
      custom-class="dialog-setting"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      width="400px"
    >
      <div slot="title">
        <div class="el-dialog__title">配置组件</div>
        <small class="text-info">{{ title }}</small>
      </div>
      <el-form ref="form">
        <!-- 句子类型 -->
        <el-form-item label="句子类型">
          <el-select
            v-model="query.c"
            multiple
            collapse-tags
            placeholder="请选择句子类型"
          >
            <el-option
              v-for="(value, key) in sentenceType"
              :key="key"
              :label="value"
              :value="key"
            />
          </el-select>
        </el-form-item>
        <!-- 返回句子的最小长度 -->
        <el-form-item label="最小长度">
          <el-input-number v-model="query.min" :min="0" :max="query.max" />
        </el-form-item>
        <!-- 返回句子的最大长度 -->
        <el-form-item label="最大长度">
          <el-input-number v-model="query.max" :min="query.min" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button icon="el-icon-close" size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HitokotoWidget',
  widget: {
    name: '一言',
    icon: 'note',
    params: {
      c: ['d', 'h', 'i', 'j', 'k'], // 句子类型
      min: 0, // 返回句子的最小长度（包含）
      max: 30, // 返回句子的最大长度（包含）
    },
    w: 24,
    h: 1,
    minW: 8,
    maxW: 24,
    maxH: 1,
    isResizable: true,
  },
  inject: ['$dashboard'],
  props: {
    /**
     * 组件参数，用于接收用户已配置的参数
     */
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      title: '一言',
      loading: false,
      dialogVisible: false,
      sentenceType: {
        a: '动画',
        b: '漫画',
        c: '游戏',
        d: '文学',
        e: '原创',
        f: '来自网络',
        g: '其他',
        h: '影视',
        i: '诗词',
        j: '网易云',
        k: '哲学',
        l: '抖机灵',
      },
      sentence: {},
      query: {
        c: [],
        min: 0,
        max: 30,
      },
    }
  },
  watch: {
    params: {
      handler(val) {
        this.query = { ...val }
        this.getSentence()
      },
      deep: true,
    },
  },
  created() {
    // 初始化组件参数
    this.query = { ...this.params }
  },
  mounted() {
    this.getSentence()
    this.$el.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  },
  refresh() {
    this.getSentence()
  },
  setting() {
    this.dialogVisible = true
  },
  methods: {
    getSentence() {
      // 参考 https://developer.hitokoto.cn/sentence/
      this.loading = true
      fetch(`https://v1.hitokoto.cn/?c=${this.query.c.join('&c=')}&min_length=${this.query.min}&max_length=${this.query.max}`)
        .then((res) => res.json())
        .then((res) => {
          this.loading = false
          this.sentence = res
        })
    },
    copy() {
      const sentence = `${this.sentence.hitokoto} —— ${this.sentence.from} - ${this.sentence.from_who}`
      navigator.clipboard.writeText(sentence).then(() => {
        this.$dashboard.notify('已复制到剪切板！')
      }, () => {
        console.error('Clipboard write failed!', 'Your browser does not support clipboard API!')
      })
    },
    search() {
      window.open(`https://www.baidu.com/s?wd=${this.sentence.hitokoto}`)
    },
    sentenceMousedown(e) {
      if (!this.$dashboard.isCollapse) {
        return
      }
      if (e.button === 0) {
        this.copy()
      } else if (e.button === 2) {
        this.getSentence()
      }
    },
    save() {
      if (!this.$dashboard.isCollapse) {
        this.$emit('update:params', { ...this.query })
      }
      this.dialogVisible = false
    },
  }
}
</script>

<style lang="scss" scoped>
.hitokoto-container {
  &[data-is-collapse='true'] {
    // 隐藏组件原本操作按钮
    + ::v-deep.item-operation {
      display: none !important;
    }

    .hitokoto-text,
    .hitokoto-origin {
      cursor: pointer;
    }
  }

  &:not([data-is-collapse='true']) {
    // 隐藏组件自带操作按钮
    .hitokoto-operation {
      display: none !important;
    }
  }

  .hitokoto-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 20px;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    width: min-content;
    white-space: nowrap;
    margin: 0 auto;
    position: relative;

    &:hover {
      .hitokoto-operation {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .hitokoto-origin {
        opacity: 1;
        transition: opacity 0.3s ease;
      }
    }

    .hitokoto-operation {
      display: none;
      position: absolute;
      left: 100%;
      top: 0;
      padding: 2px 4px;
      width: 70px;
      -webkit-backdrop-filter: blur(12px);
      backdrop-filter: blur(12px);
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 6px;
      height: 24px;
      color: #fff;

      i {
        font-size: 14px;
        padding: 3px;
        cursor: pointer;
        border-radius: 4px;

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);

        }
      }
    }

    .hitokoto-text {
      &:not(:empty) {
        &::before {
          content: '「';
          margin-right: 0.25em;
        }
        &::after {
          content: '」';
          margin-left: 0.25em;
        }
      }
    }

    .hitokoto-origin {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .hitokoto-from {
      &:not(:empty)::before {
        content: '——';
        margin-right: 0.25em;
      }
    }

    .hitokoto-from_who {
      &:not(:empty)::before {
        content: '-';
        margin-inline: 0.25em;
      }
    }
  }
}
::v-deep .dialog-setting {
  .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>
