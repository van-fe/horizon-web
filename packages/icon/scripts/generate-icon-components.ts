import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs'
import { resolve, join, basename, extname, dirname } from 'path'
import { fileURLToPath } from 'url'
import { camelCase, upperFirst } from '@aurora/utils';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// SVG 文件目录
const SVG_DIR = resolve(__dirname, '../src/assets/icons')
// 生成的组件目录
const COMPONENTS_DIR = resolve(__dirname, '../src/components/icons')
// 生成的入口文件
const INDEX_FILE = resolve(__dirname, '../src/components/icons/index.ts')

function removeExtName(filename: string) {
  return basename(filename, extname(filename));
}

/**
 * 将文件名转换为组件名
 * 例如: underline.svg -> IconUnderline
 *      edit_contract.svg -> IconEditContract
 */
function toComponentName(filename: string): string {
  // 添加 Icon 前缀
  return `Icon${upperFirst(camelCase(removeExtName(filename)))}`
}

/**
 * 解析 SVG 内容，提取 viewBox 和内部内容
 */
function parseSVG(svgContent: string): { viewBox: string; content: string } {
  // 提取 viewBox
  const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'
  
  // 移除 SVG 标签，只保留内部内容
  const content = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim()
  
  return { viewBox, content }
}

/**
 * 生成 Vue 组件代码
 */
function generateComponent(componentName: string, viewBox: string, content: string): string {
  // 将 SVG 内容转义为 JavaScript 字符串字面量
  const escapedContent = JSON.stringify(content)
  
  return `import { defineComponent, h, PropType } from 'vue'

export default defineComponent({
  name: '${componentName}',
  props: {
    size: {
      type: [String, Number] as PropType<string | number>,
      default: '1em'
    },
    color: {
      type: [String, Array] as PropType<string | string[] | undefined>,
      default: undefined
    }
  },
  setup(props) {
    const sizeValue = typeof props.size === 'number' ? \`\${props.size}px\` : props.size
    
    const processMultiColor = (content: string, colors: string[]): string => {
      if (!content || colors.length === 0) return content
      
      const elementRegex = /<(path|circle|rect|polygon|ellipse|g)([^>]*)>/gi
      const elements: Array<{ tag: string; attrs: string; index: number }> = []
      let match: RegExpExecArray | null
      
      while ((match = elementRegex.exec(content)) !== null) {
        elements.push({
          tag: match[1],
          attrs: match[2],
          index: match.index
        })
      }
      
      if (elements.length === 0) return content
      
      let processedContent = content
      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i]
        const colorIndex = i < colors.length ? i : colors.length - 1
        const color = colors[colorIndex] || 'currentColor'
        
        const fillMatch = element.attrs.match(/fill="([^"]*)"/)
        
        if (fillMatch) {
          const oldFill = fillMatch[1]
          if (oldFill !== 'none') {
            const fillIndex = element.attrs.indexOf('fill=')
            if (fillIndex !== -1) {
              const startPos = element.index + element.attrs.substring(0, fillIndex).length + element.tag.length + 1
              const endPos = startPos + fillMatch[0].length
              processedContent = processedContent.substring(0, startPos) +
                \`fill="\${color}"\` +
                processedContent.substring(endPos)
            }
          }
        } else {
          const insertPos = element.index + \`<\${element.tag}\`.length
          processedContent = processedContent.substring(0, insertPos) +
            \` fill="\${color}"\` +
            processedContent.substring(insertPos)
        }
      }
      
      return processedContent
    }
    
    return () => {
      let svgContent = ${escapedContent}
      let fill = 'currentColor'
      
      if (props.color) {
        if (Array.isArray(props.color)) {
          svgContent = processMultiColor(svgContent, props.color)
          fill = 'none'
        } else {
          fill = props.color
          svgContent = svgContent.replace(/fill="(?!none)[^"]*"/g, \`fill="\${props.color}"\`)
          if (!svgContent.match(/fill=/)) {
            const firstElementMatch = svgContent.match(/<(path|circle|rect|polygon|ellipse|g)/)
            if (firstElementMatch) {
              const insertPos = firstElementMatch.index! + firstElementMatch[0].length
              svgContent = svgContent.substring(0, insertPos) +
                \` fill="\${props.color}"\` +
                svgContent.substring(insertPos)
            }
          }
        }
      }
      
      return h('svg', {
        width: sizeValue,
        height: sizeValue,
        viewBox: '${viewBox}',
        fill: fill,
        style: {
          display: 'inline-block',
          verticalAlign: 'middle'
        },
        innerHTML: svgContent
      })
    }
  }
})
`
}

/**
 * 生成入口文件
 */
function generateIndexFile(components: Array<{ name: string; componentName: string }>): string {
  const imports = components
    .map(({ componentName }) => {
      return `export { default as ${componentName} } from './${componentName}.tsx'`
    })
    .join('\n')
  
  return imports;
}

/**
 * 主函数
 */
function main() {
  console.info('开始生成图标组件...')
  
  // 确保组件目录存在
  if (!existsSync(COMPONENTS_DIR)) {
    mkdirSync(COMPONENTS_DIR, { recursive: true })
  }
  
  // 读取所有 SVG 文件
  const svgFiles = readdirSync(SVG_DIR)
    .filter((file: string) => file.endsWith('.svg'))
    .sort()
  
  console.info(`找到 ${svgFiles.length} 个 SVG 文件`)
  
  const components: Array<{ name: string; componentName: string }> = []
  
  // 处理每个 SVG 文件
  for (const svgFile of svgFiles) {
    const svgPath = join(SVG_DIR, svgFile)
    const componentName = toComponentName(svgFile)
    
    try {
      // 读取 SVG 内容
      const svgContent = readFileSync(svgPath, 'utf-8')
      const { viewBox, content } = parseSVG(svgContent)
      
      // 生成组件代码
      const componentCode = generateComponent(componentName, viewBox, content)
      
      // 写入组件文件
      const componentPath = join(COMPONENTS_DIR, `${componentName}.tsx`)
      writeFileSync(componentPath, componentCode, 'utf-8')
      
      components.push({
        name: svgFile,
        componentName
      })
      
      console.info(`✓ 生成组件: ${componentName} (${svgFile})`)
    } catch (error) {
      console.error(`✗ 处理文件失败: ${svgFile}`, error)
    }
  }
  
  // 生成入口文件
  const indexContent = generateIndexFile(components)
  writeFileSync(INDEX_FILE, indexContent, 'utf-8')
  
  console.info(`\n完成！共生成 ${components.length} 个组件`)
  console.info(`入口文件: ${INDEX_FILE}`)
}

main()

