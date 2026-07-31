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
function parseSVG(svgContent: string): { viewBox: string; content: string; fill: string } {
  const svgTagMatch = svgContent.match(/<svg\b([^>]*)>/i)
  const svgAttributes = svgTagMatch?.[1] || ''

  // 提取 viewBox
  const viewBoxMatch = svgAttributes.match(/\bviewBox=(["'])([^"']*)\1/i)
  const viewBox = viewBoxMatch ? viewBoxMatch[2] : '0 0 24 24'
  const fillMatch = svgAttributes.match(/\bfill=(["'])([^"']*)\1/i)
  const fill = fillMatch ? fillMatch[2] : 'currentColor'
  
  // 移除 SVG 标签，只保留内部内容
  const content = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim()
  
  return { viewBox, content, fill }
}

/**
 * 生成 Vue 组件代码
 */
function generateComponent(
  componentName: string,
  iconName: string,
  viewBox: string,
  content: string,
  defaultFill: string
): string {
  // 将 SVG 内容转义为 JavaScript 字符串字面量
  const escapedContent = JSON.stringify(content)
  const escapedViewBox = JSON.stringify(viewBox)
  const escapedDefaultFill = JSON.stringify(defaultFill)
  const escapedIconName = JSON.stringify(iconName)
  
  return `import { computed, defineComponent, h, type PropType } from 'vue'
import {
  applyIconColor,
  applyIconSpin,
  getIconClassNames,
  normalizeIconSize,
  type IconColor,
  type IconSize,
  type IconSpin
} from '../../utils/icon'

export default defineComponent({
  name: '${componentName}',
  props: {
    size: {
      type: [String, Number, Array] as PropType<IconSize>,
      default: '1em'
    },
    color: {
      type: [String, Array] as PropType<IconColor | undefined>,
      default: undefined
    },
    spin: {
      type: String as PropType<IconSpin>,
      default: undefined
    },
    rotate: {
      type: Number,
      default: undefined
    }
  },
  emits: {
    click: (evt: MouseEvent) => evt instanceof MouseEvent
  },
  setup(props, { emit }) {
    const sizeValue = computed(() => normalizeIconSize(props.size))
    
    return () => {
      const coloredIcon = applyIconColor(${escapedContent}, props.color, ${escapedDefaultFill})
      const svgContent = applyIconSpin(coloredIcon.content, ${escapedViewBox}, props.spin)
      
      return h('svg', {
        class: getIconClassNames(${escapedIconName}),
        viewBox: ${escapedViewBox},
        fill: coloredIcon.fill,
        style: {
          width: sizeValue.value[0],
          height: sizeValue.value[1],
          fontSize: sizeValue.value[0],
          display: 'inline-block',
          verticalAlign: 'inherit',
          transform: props.rotate === undefined ? undefined : \`rotate(\${props.rotate}deg)\`
        },
        innerHTML: svgContent,
        onClick: (evt: MouseEvent) => emit('click', evt)
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
      return `export { default as ${componentName} } from './${componentName}'`
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
      const { viewBox, content, fill } = parseSVG(svgContent)
      
      // 生成组件代码
      const componentCode = generateComponent(
        componentName,
        removeExtName(svgFile),
        viewBox,
        content,
        fill
      )
      
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
