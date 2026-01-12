import { defineConfig } from 'vitepress'
import version from './version.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  description: "Vue3 现代组件库",
  lang: 'zh',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/why-choose-horizon-web', activeMatch: '/guide/' },
      { text: 'API 及示例', link: '/demos/index', activeMatch: '/demos/' },
      { text: version.version, items: [
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
                text: 'Affix 固钉',
                link: 'components/Affix'
              },
              {
                text: 'Application 应用',
                link: 'components/Application'
              },
              {
                text: 'Backtop 回到顶部',
                link: 'components/Backtop'
              },
              {
                text: 'Button 按钮',
                link: 'components/Button'
              },
              {
                text: 'Count 数字动画',
                link: 'components/Count'
              },
              {
                text: 'FloatButton 悬浮按钮',
                link: 'components/FloatButton'
              },
              {
                text: 'Hover 悬浮',
                link: 'components/Hover'
              },
              {
                text: 'Link 链接',
                link: 'components/Link'
              },
              {
                text: 'Mask 遮罩',
                link: 'components/Mask'
              },
              {
                text: 'Transition 过渡',
                link: 'components/Transition'
              },
              {
                text: 'Watermark 水印',
                link: 'components/Watermark'
              }
            ]
          },
          {
            text: '状态反馈',
            collapsed: false,
            items: [
              {
                text: 'Alert 警告',
                link: 'components/Alert'
              },
              {
                text: 'Empty 空状态',
                link: 'components/Empty'
              },
              {
                text: 'Result 结果',
                link: 'components/Result'
              },
              {
                text: 'Skeleton 骨架屏',
                link: 'components/Skeleton'
              }
            ]
          },
          {
            text: '图标/头像',
            collapsed: false,
            items: [
              {
                text: 'Avatar 头像',
                link: 'components/Avatar'
              },
              {
                text: 'Badge 徽标',
                link: 'components/Badge'
              },
              {
                text: 'Image 图片',
                link: 'components/Image'
              }
            ]
          },
          {
            text: '布局组件',
            collapsed: false,
            items: [
              {
                text: 'Container 容器',
                link: 'components/Container'
              },
              {
                text: 'Divider 分割线',
                link: 'components/Divider'
              },
              {
                text: 'Layout 布局',
                link: 'components/Layout'
              },
              {
                text: 'Space 间距',
                link: 'components/Space'
              }
            ]
          },
          {
            text: '表单组件',
            collapsed: false,
            items: [
              {
                text: 'AutoComplete 自动完成',
                link: 'components/AutoComplete'
              },
              {
                text: 'Cascader 级联选择器',
                link: 'components/Cascader'
              },
              {
                text: 'Checkbox 复选框',
                link: 'components/Checkbox'
              },
              {
                text: 'ColorPicker 颜色选择器',
                link: 'components/ColorPicker'
              },
              {
                text: 'DatePicker 日期选择器',
                link: 'components/DatePicker'
              },
              {
                text: 'Form 表单',
                link: 'components/Form'
              },
              {
                text: 'Input 输入框',
                link: 'components/Input'
              },
              {
                text: 'InputNumber 数字输入框',
                link: 'components/InputNumber'
              },
              {
                text: 'Picker 选择器',
                link: 'components/Picker'
              },
              {
                text: 'Progress 进度条',
                link: 'components/Progress'
              },
              {
                text: 'Radio 单选框',
                link: 'components/Radio'
              },
              {
                text: 'Rate 评分',
                link: 'components/Rate'
              },
              {
                text: 'Select 选择器',
                link: 'components/Select'
              },
              {
                text: 'Slider 滑块',
                link: 'components/Slider'
              },
              {
                text: 'Switch 开关',
                link: 'components/Switch'
              },
              {
                text: 'TimePicker 时间选择器',
                link: 'components/TimePicker'
              },
              {
                text: 'Timeline 时间轴',
                link: 'components/Timeline'
              },
              {
                text: 'TreeSelect 树形选择器',
                link: 'components/TreeSelect'
              },
              {
                text: 'Upload 上传',
                link: 'components/Upload'
              }
            ]
          },
          {
            text: '反馈组件',
            collapsed: false,
            items: [
              {
                text: 'Dialog 对话框',
                link: 'components/Dialog'
              },
              {
                text: 'Drawer 抽屉',
                link: 'components/Drawer'
              },
              {
                text: 'Guide 引导',
                link: 'components/Guide'
              },
              {
                text: 'Popover 气泡卡片',
                link: 'components/Popover'
              },
              {
                text: 'Tooltip 文字提示',
                link: 'components/Tooltip'
              }
            ]
          },
          {
            text: '数据展示',
            collapsed: false,
            items: [
              {
                text: 'Calendar 日历',
                link: 'components/Calendar'
              },
              {
                text: 'Card 卡片',
                link: 'components/Card'
              },
              {
                text: 'Collapse 折叠面板',
                link: 'components/Collapse'
              },
              {
                text: 'Descriptions 描述列表',
                link: 'components/Descriptions'
              },
              {
                text: 'List 列表',
                link: 'components/List'
              },
              {
                text: 'Panels 面板',
                link: 'components/Panels'
              },
              {
                text: 'Tag 标签',
                link: 'components/Tag'
              },
              {
                text: 'Time 时间',
                link: 'components/Time'
              },
              {
                text: 'Transfer 穿梭框',
                link: 'components/Transfer'
              },
              {
                text: 'Tree 树形控件',
                link: 'components/Tree'
              },
              {
                text: 'VirtualScroller 虚拟滚动',
                link: 'components/VirtualScroller'
              }
            ]
          },
          {
            text: '媒体组件',
            collapsed: false,
            items: [
              {
                text: 'VideoPlayer 视频播放器',
                link: 'components/VideoPlayer'
              },
              {
                text: 'Viewer 查看器',
                link: 'components/Viewer'
              }
            ]
          },
          {
            text: '导航组件',
            collapsed: false,
            items: [
              {
                text: 'Anchor 锚点',
                link: 'components/Anchor'
              },
              {
                text: 'Breadcrumb 面包屑',
                link: 'components/Breadcrumb'
              },
              {
                text: 'Controls 控制器',
                link: 'components/Controls'
              },
              {
                text: 'Dropdown 下拉菜单',
                link: 'components/Dropdown'
              },
              {
                text: 'Menu 菜单',
                link: 'components/Menu'
              },
              {
                text: 'PageHeader 页头',
                link: 'components/PageHeader'
              },
              {
                text: 'Pagination 分页',
                link: 'components/Pagination'
              },
              {
                text: 'Scrollbar 滚动条',
                link: 'components/Scrollbar'
              },
              {
                text: 'Segmented 分段控制器',
                link: 'components/Segmented'
              },
              {
                text: 'Steps 步骤条',
                link: 'components/Steps'
              },
              {
                text: 'Tabs 标签页',
                link: 'components/Tabs'
              }
            ]
          },
          {
            text: '指令',
            collapsed: false,
            items: [
              {
                text: 'v-click-outside 点击外部',
                link: 'directives/v-click-outside'
              },
              {
                text: 'v-draggable 拖拽',
                link: 'directives/v-draggable'
              },
              {
                text: 'v-infinite-scroll 无限滚动',
                link: 'directives/v-infinite-scroll'
              },
              {
                text: 'v-loading 加载',
                link: 'directives/v-loading'
              },
              {
                text: 'v-popconfirm 气泡确认',
                link: 'directives/v-popconfirm'
              },
              {
                text: 'v-safe-html 安全HTML',
                link: 'directives/v-safe-html'
              },
              {
                text: 'v-tooltip 文字提示',
                link: 'directives/v-tooltip'
              },
              {
                text: 'v-watermark 水印',
                link: 'directives/v-watermark'
              }
            ]
          },
          {
            text: '方法',
            collapsed: false,
            items: [
              {
                text: 'LoadingBar 加载进度条',
                link: 'methods/LoadingBar'
              },
              {
                text: 'Message 消息提示',
                link: 'methods/Message'
              },
              {
                text: 'MessageBox 消息框',
                link: 'methods/MessageBox'
              },
              {
                text: 'Notification 通知',
                link: 'methods/Notification'
              }
            ]
          }
        ]
      }
    }
  }
})
