import { defineConfig } from 'vitepress'
import version from '../../../../versions.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  description: "Vue3 现代组件库",
  lang: 'zh',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/why-choose-lego', activeMatch: '/guide/' },
      { text: 'API 及示例', link: '/demos/index', activeMatch: '/demos/' },
      { text: version.lego, items: [
          {
            text: '更新日志',
            link: 'https://nio.feishu.cn/docs/doccnmqUM4iuP2kN5AGxAMM0Rkc',
          }, {
            text: '反馈问题',
            link: 'https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=320le63a-d4d6-4561-947a-f85716e5f345'
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
                text: '为什么选用 LEGO ?', link: 'why-choose-lego'
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
                text: 'Lego', link: 'config-lego'
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
