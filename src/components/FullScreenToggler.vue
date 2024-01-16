<!-- 全屏/退出全屏切换组件，浏览器不支持时，打开网页内全屏 -->
<script>
import { directive as fullscreen } from 'vue-fullscreen'

export default {
  name: 'FullScreenToggler',
  directives: {
    fullscreen,
  },
  props: {
    target: {
      type: String,
      default: 'document.body',
    },
    /**
     * 是否使用 document.body 代理全屏元素，目标元素则改为网页全屏
     * 避免弹窗等元素在全屏模式下不可见的问题（推荐）
     */
    bodyAgent: {
      type: Boolean,
      default: true,
    },
    fullscreenClass: {
      type: String,
      default: 'is-fullscreen',
    },
    /**
     * 不调用全屏 API，而是将当前元素撑满网页
     */
    pageOnly: {
      type: Boolean,
      default: false,
    },
    /**
     * v-fullscreen 指令修饰符 teleport 进入全屏时目标元素会被移动到 document.body 下
     * vue-fullscreen 插件处理弹窗等元素在全屏模式下不可见问题的方案（不推荐）
     */
    teleport: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFullscreen: false,
    }
  },
  computed: {
    options() {
      return {
        target: this.bodyAgent ? 'document.body' : this.target,
        callback: (isFullscreen) => {
          this.isFullscreen = isFullscreen
          // 网页全屏
          if (this.bodyAgent && this.target !== 'document.body') {
            document.querySelector(this.target).classList.toggle('is-fullscreen-fullpage', isFullscreen)
          }
          // 触发事件传递给父组件
          this.$emit('change', isFullscreen)
        },
        fullscreenClass: this.fullscreenClass,
      }
    },
  },
  render(h) {
    return h('span', {
      class: 'full-screen-toggler',
      attrs: {
        title: this.isFullscreen ? '退出全屏' : '全屏',
      },
      directives: [
        {
          name: 'fullscreen',
          value: this.options,
          modifiers: {
            pageOnly: this.pageOnly,
            teleport: this.teleport,
          },
        },
      ],
    },
    [
      h('SvgIcon', {
        props: {
          iconClass: this.isFullscreen ? 'exit-fullscreen' : 'fullscreen',
        }
      }),
    ])
  },
}
</script>

<style lang="scss" scoped>
.full-screen-toggler {
  cursor: pointer;
}
</style>

<style>
.is-fullscreen-fullpage {
  position: fixed !important;
  top: 0px;
  left: 0px;
  width: 100% !important;
  height: 100% !important;
  background: white;
  z-index: 2000;
  box-sizing: border-box;
}
</style>
