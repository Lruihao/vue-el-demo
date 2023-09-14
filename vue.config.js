const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-el-demo/' : '/',
  transpileDependencies: true,
  chainWebpack: (config) => {
    // set svg-sprite-loader
    const svgPath = resolve('src/assets/icons')
    config.module
      .rule('svg')
      .exclude.add(svgPath)
      .end()
    config.module
      .rule('svg-icon')
      .test(/.svg$/)
      .include.add(svgPath)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
    // remove origin svg fill attr
      .use('svgo-loader')
      .loader('svgo-loader')
      .tap((options) => ({
        ...options,
        // 删除 svg 中 fill 和 fill-rule
        plugins: [{ name: 'removeAttrs', params: { attrs: 'fill|fill-rule' } }],
      }))
      .end()
  },
})
