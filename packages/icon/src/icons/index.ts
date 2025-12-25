// 图标注册表
interface IconInfo {
  content: string
  viewBox?: string
  fill?: string
}

// 图标存储
const iconRegistry: Map<string, IconInfo> = new Map<string, IconInfo>()

// 动态导入所有 SVG 图标
// 使用 eager: false 以便按需加载，但在打包后路径会被 vite 处理
// as: 'raw' 时，返回的是字符串，不是对象
const iconModules = import.meta.glob<string>('../assets/icons/*.svg', {
  eager: false,
  as: 'raw'
})

// 创建文件名到路径的映射，用于在打包后也能正确匹配
// import.meta.glob 的键是相对于当前文件的路径，如 '../assets/icons/home.svg'
// 我们需要提取文件名（不含路径和扩展名）来匹配
const iconPathMap = new Map<string, string>()
for (const path in iconModules) {
  // 从路径中提取文件名，例如 '../assets/icons/home.svg' -> 'home'
  const match = path.match(/\/([^/]+)\.svg$/)
  if (match) {
    const iconName = match[1]
    iconPathMap.set(iconName, path)
  }
}

/**
 * 注册图标
 */
export function registerIcon(name: string, content: string, viewBox?: string, fill?: string) {
  iconRegistry.set(name, { content, viewBox, fill })
}

/**
 * 批量注册图标
 */
export function registerIcons(icons: Record<string, IconInfo>) {
  const entries = Object.keys(icons).map(key => [key, icons[key]] as [string, IconInfo])
  entries.forEach(([name, info]) => {
    iconRegistry.set(name, info)
  })
}

/**
 * 获取图标
 */
export async function getIcon(name: string): Promise<IconInfo | null> {
  // 先从注册表中查找
  if (iconRegistry.has(name)) {
    return iconRegistry.get(name)!
  }
  
  // 尝试从文件系统加载
  // 使用预构建的路径映射，而不是动态拼接路径
  // 这样在 vite 打包后也能正常工作
  const iconPath = iconPathMap.get(name)
  if (iconPath && iconModules[iconPath]) {
    try {
      const content = await iconModules[iconPath]()
      // 解析 SVG 内容，提取 viewBox
      const viewBoxMatch = content.match(/viewBox="([^"]*)"/)
      const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'
      
      // 移除 SVG 标签，只保留内容
      const svgContent = content
        .replace(/<svg[^>]*>/, '')
        .replace(/<\/svg>/, '')
        .trim()
      
      const iconInfo: IconInfo = {
        content: svgContent,
        viewBox
      }
      
      iconRegistry.set(name, iconInfo)
      return iconInfo
    } catch (error) {
      console.error(`Failed to load icon file: ${name}`, error)
      return null
    }
  }
  
  return null
}

/**
 * 获取所有已注册的图标名称
 */
export function getRegisteredIconNames(): string[] {
  return Array.from(iconRegistry.keys())
}

