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
  // 鼠标移动时，动态修改浮沉的位置属性
  el.onmousemove = function(e) {
    if (!isEllipsis) { return }
    const vcTooltipDom = document.getElementById('vc-tooltip')
    vcTooltipDom.style.top = e.clientY + 15 + 'px'
    vcTooltipDom.style.left = e.clientX + 15 + 'px'
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
