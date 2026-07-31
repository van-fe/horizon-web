import { App } from 'vue'
import AIcon from './components/AIcon'
import { registerIcon, registerIcons, getIcon, getIconSync, getRegisteredIconNames } from './icons'

// 导出组件
export { AIcon }
export { registerIcon, registerIcons, getIcon, getIconSync, getRegisteredIconNames }

// 导出类型
export type { default as AIconProps } from './components/AIcon'
export type { IconInfo } from './icons'

// 导出所有图标组件
export * from './components/icons'

// 安装插件
export default {
  install(app: App) {
    app.component('AIcon', AIcon)
  }
}

// 单独导出组件，方便按需引入
export { AIcon as Icon }
