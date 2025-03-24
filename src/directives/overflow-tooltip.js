const setTooltip = (el, binding) => {
  // 设置内容
  el.innerText = binding.value

  const elComputed = document.defaultView.getComputedStyle(el, '')
  const padding = parseInt(elComputed.paddingLeft.replace('px', '')) + parseInt(elComputed.paddingRight.replace('px', ''))
  const range = document.createRange()
  range.setStart(el, 0)
  range.setEnd(el, el.childNodes.length)
  const rangeWidth = range.getBoundingClientRect().width
  const isEllipsis = rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth

  // 鼠标移入时，将浮层元素插入到 body 中
  el.onmouseenter = function(e) {
    if (!isEllipsis) { return }
    // 创建浮层元素并设置样式
    const vcTooltipDom = document.createElement('div')
    Object.assign(vcTooltipDom.style, {
      position: 'absolute',
      background: '#303133',
      color: '#fff',
      fontSize: '12px',
      zIndex: '6000',
      padding: '10px',
      borderRadius: '4px',
      lineHeight: 1.2,
      minHeight: '10px',
      wordWrap: 'break-word',
    })
    // 设置 id 方便寻找
    vcTooltipDom.setAttribute('id', 'vc-tooltip')
    // 将浮层插入到 body 中
    document.body.appendChild(vcTooltipDom)
    // 浮层中的文字 通过属性值传递动态的显示文案
    document.getElementById('vc-tooltip').innerHTML = binding.value
  }
  // 鼠标移动时，动态修改浮层的位置属性
  el.onmousemove = function(e) {
    if (!isEllipsis) { return }
    const vcTooltipDom = document.getElementById('vc-tooltip')
    if (!vcTooltipDom) { return }
    const padding = 5
    let offsetX = e.clientX + 15
    let offsetY = e.clientY + 15
    // 判断是否超出视窗边界（横向）
    if (offsetX + vcTooltipDom.offsetWidth > document.documentElement.clientWidth) {
      offsetX = document.documentElement.clientWidth - vcTooltipDom.offsetWidth - padding
    }
    if (offsetX <= 0) {
      offsetX = padding
      vcTooltipDom.style.width = document.documentElement.clientWidth - padding * 2 + 'px'
    }
    // 判断是否超出视窗边界（纵向）
    if (offsetY + vcTooltipDom.offsetHeight > document.documentElement.clientHeight) {
      offsetY = document.documentElement.clientHeight - vcTooltipDom.offsetHeight - padding
    }
    if (offsetY <= 0) {
      offsetY = padding
      vcTooltipDom.style.height = document.documentElement.clientHeight - padding * 2 + 'px'
    }
    vcTooltipDom.style.left = offsetX + 'px'
    vcTooltipDom.style.top = offsetY + 'px'
    // 注：当浮层元素和窗口大小差不多时，浮层会覆盖原本的内容，导致浮层闪一下就不见了
  }
  // 鼠标移出时将浮层元素销毁
  el.onmouseleave = function() {
    if (!isEllipsis) { return }
    // 找到浮层元素并移出
    const vcTooltipDom = document.getElementById('vc-tooltip')
    vcTooltipDom && document.body.removeChild(vcTooltipDom)
  }
}

const plugin = {
  install(Vue) {
    Vue.directive('overflow-tooltip', {
      inserted: (el, binding) => {
        // 设置元素样式
        Object.assign(el.style, {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        })
        // 监控元素可见性变化
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setTooltip(el, binding)
          }
        })
        observer.observe(el)
        // 监控元素宽度变化
        const resizeObserver = new ResizeObserver(() => {
          setTooltip(el, binding)
        })
        resizeObserver.observe(el)
        // 设置浮层内容
        setTooltip(el, binding)
      },
      update: (el, binding) => {
        // 更新浮层内容
        setTooltip(el, binding)
      },
      unbind: (el) => {
        el.onmouseenter = null
        el.onmousemove = null
        el.onmouseleave = null
      },
    })
  }
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default plugin
