/// <reference types="vite/client" />

export interface IconInfo {
  content: string
  viewBox?: string
  fill?: string
}

const iconRegistry: Map<string, IconInfo> = new Map<string, IconInfo>()

// AIcon 必须在首次渲染和 SSR 时就拿到 SVG 内容，因此内置图标使用同步原始文本。
const iconModules = import.meta.glob('../assets/icons/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

const builtInIcons = new Map<string, string>()
for (const [path, content] of Object.entries(iconModules)) {
  const match = path.match(/\/([^/]+)\.svg$/)
  if (match) {
    builtInIcons.set(match[1], content)
  }
}

function parseIcon(content: string): IconInfo {
  const svgTagMatch = content.match(/<svg\b([^>]*)>/i)
  const svgAttributes = svgTagMatch?.[1] || ''
  const viewBoxMatch = svgAttributes.match(/\bviewBox=(["'])([^"']*)\1/i)
  const fillMatch = svgAttributes.match(/\bfill=(["'])([^"']*)\1/i)

  return {
    content: content
      .replace(/<svg\b[^>]*>/i, '')
      .replace(/<\/svg>\s*$/i, '')
      .trim(),
    viewBox: viewBoxMatch?.[2] || '0 0 24 24',
    fill: fillMatch?.[2] || 'currentColor'
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
 * 同步获取图标，确保首次渲染和 SSR 不会产生空 SVG。
 */
export function getIconSync(name: string): IconInfo | null {
  const registeredIcon = iconRegistry.get(name)
  if (registeredIcon) {
    return registeredIcon
  }

  const content = builtInIcons.get(name)
  if (!content) {
    return null
  }

  const iconInfo = parseIcon(content)
  iconRegistry.set(name, iconInfo)
  return iconInfo
}

/**
 * 保留原有异步 API，现由同步实现直接返回结果。
 */
export async function getIcon(name: string): Promise<IconInfo | null> {
  return getIconSync(name)
}

/**
 * 获取所有已注册的图标名称
 */
export function getRegisteredIconNames(): string[] {
  return Array.from(iconRegistry.keys())
}
