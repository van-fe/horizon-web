import { defineConfig } from 'vitepress'
import version from '../../../../versions.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  description: "Vue3 现代组件库",
  lang: 'zh',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/why-choose-horizon-web', activeMatch: '/guide/' },
      { text: 'API 及示例', link: '/demos/index', activeMatch: '/demos/' },
      { text: version['horizon-web'], items: [
          {
            text: '更新日志',
            link: 'https://github.com/van-fe/horizon-web/releases',
          }, {
            text: '反馈问题',
            link: 'https://github.com/van-fe/horizon-web/issues'
          }
        ]
      },
    ],
    sidebar: {
      '/guide/': {
        base: '/guide/',
        items: [
          {
            text: '指引',
            collapsed: false,
            items: [
              {
                text: '为什么选用 Horizon Web ?', link: 'why-choose-horizon-web'
              },{
                text: '快速开始', link: 'start'
              },{
                text: '按需引入', link: 'on-demand-import'
              },{
                text: '命名空间', link: 'namespace'
              },{
                text: 'FAQ', link: 'FAQ'
              },
            ]
          },
          {
            text: '基础配置',
            collapsed: false,
            items: [
              {
                text: 'HorizonWeb', link: 'config-horizon-web'
              },{
                text: 'UnpluginResolver', link: 'config-unplugin-resolver'
              },
            ]
          }
        ]
      },
      '/demos/': {
        base: '/demos/',
        items: [
          {
            text: '基础组件',
            collapsed: false,
            items: [
              {
                text: 'Button 按钮',
                link: 'components/Button'
              }
            ]
          }
        ]
      }
    }
  }
})
