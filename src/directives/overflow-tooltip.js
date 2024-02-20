const plugin = {
  install(Vue) {
    Vue.directive('overflow-tooltip', {
      inserted: (el, binding, vnode) => {
        // 设置内容
        if (el.innerText === '') {
          el.innerText = binding.value
        }
        // 设置元素样式
        Object.assign(el.style, {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        })

        const elComputed = document.defaultView.getComputedStyle(el, '')
        const padding = parseInt(elComputed.paddingLeft.replace('px', '')) + parseInt(elComputed.paddingRight.replace('px', ''))
        const range = document.createRange()
        range.setStart(el, 0)
        range.setEnd(el, el.childNodes.length)
        const rangeWidth = range.getBoundingClientRect().width

        console.log('vnode', vnode)

        if (rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth) {
          // 鼠标移入时，将浮沉元素插入到 body 中
          el.onmouseenter = function (e) {
            // 创建浮层元素并设置样式
            const vcTooltipDom = document.createElement('div')
            Object.assign(vcTooltipDom.style, {
              position: 'absolute',
              background: '#303133',
              color: '#fff',
              fontSize: '12px',
              zIndex: '2000',
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
          el.onmousemove = function (e) {
            const vcTooltipDom = document.getElementById('vc-tooltip')
            vcTooltipDom.style.top = e.clientY + 15 + 'px'
            vcTooltipDom.style.left = e.clientX + 15 + 'px'
          }
          // 鼠标移出时将浮层元素销毁
          el.onmouseleave = function () {
            // 找到浮层元素并移出
            const vcTooltipDom = document.getElementById('vc-tooltip')
            vcTooltipDom && document.body.removeChild(vcTooltipDom)
          }
        }
      }
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
