import path from 'node:path'
import process from 'node:process'
import { defineConfig } from '@rsbuild/core'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVue2 } from '@rsbuild/plugin-vue2'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginVue2Jsx } from '@rsbuild/plugin-vue2-jsx'


export default defineConfig({
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSass(),
    pluginVue2(),
    pluginVue2Jsx(),
  ],

  html: {
    favicon: './public/favicon.ico',
    mountId: 'app',
    title: 'Vue2 + Esbuild + Element UI Demo',
  },

  source: {
    entry: {
      index: './src/main.js',
    },
  },

  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },

  output: {
    distPath: {
      root: 'dist',
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? '/vue-el-demo/' : '/',
  },

  server: {
    port: 8080,
    open: true,
  },

  tools: {
    rspack: (config) => {
      // 找到现有的 SVG 规则并排除 icons 目录
      for (let i = 0; i < config.module.rules.length; i++) {
        const rule = config.module.rules[i]
        if (rule.test && rule.test.toString().includes('svg')) {
          if (!rule.exclude) {
            rule.exclude = []
          } else if (typeof rule.exclude === 'string' || rule.exclude instanceof RegExp) {
            rule.exclude = [rule.exclude]
          }
          rule.exclude.push(path.resolve('./src/assets/icons'))
          break
        }
      }

      // 为 icons 目录添加专门的 SVG 处理规则
      config.module.rules.push({
        test: /\.svg$/,
        include: path.resolve('./src/assets/icons'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  name: 'removeAttrs',
                  params: {
                    attrs: 'fill|fill-rule',
                  },
                },
              ],
            },
          },
        ],
      })

      return config
    },
  },

  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
    },
  },
})
