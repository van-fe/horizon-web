import { defineComponent, computed, watch, ref, onMounted, h, PropType } from 'vue'
import { getIcon } from '../icons'

export default defineComponent({
  name: 'AIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: '1em'
    },
    color: {
      type: [String, Array] as PropType<(string | string[])| undefined>,
      default: undefined
    },
    spin: {
      type: String as PropType<'cw' | 'ccw'>,
      default: undefined,
    },
    rotate: {
      type: Number,
      default: undefined,
    }
  },
  emits: {
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
  },
  setup(props, { emit }) {
    const svgContent = ref<string>('')
    const viewBox = ref<string>('0 0 24 24')
    const fill = ref<string>('currentColor')

    const sizeValue = computed(() => {
      if (typeof props.size === 'number') {
        return `${props.size}px`
      }
      return props.size
    })

    const processMultiColor = (content: string, colors: string[]): string => {
      if (!content || colors.length === 0) return content
      
      // 查找所有可填充的图形元素（path, circle, rect, polygon, ellipse, g）
      const elementRegex = /<(path|circle|rect|polygon|ellipse|g)([^>]*)>/gi
      const elements: Array<{ tag: string; attrs: string; index: number; fullMatch: string }> = []
      let match: RegExpExecArray | null
      
      while ((match = elementRegex.exec(content)) !== null) {
        elements.push({
          tag: match[1],
          attrs: match[2],
          index: match.index,
          fullMatch: match[0]
        })
      }
      
      if (elements.length === 0) return content
      
      // 从后往前替换，避免索引偏移问题
      let processedContent = content
      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i]
        const colorIndex = i < colors.length ? i : colors.length - 1
        const color = colors[colorIndex] || 'currentColor'
        
        // 检查是否已有 fill 属性
        const fillMatch = element.attrs.match(/fill="([^"]*)"/)
        
        if (fillMatch) {
          // 替换现有的 fill 属性
          const oldFill = fillMatch[1]
          // 跳过 'none' 填充
          if (oldFill !== 'none') {
            const fillIndex = element.attrs.indexOf('fill=')
            if (fillIndex !== -1) {
              const startPos = element.index + element.attrs.substring(0, fillIndex).length + element.tag.length + 1
              const endPos = startPos + fillMatch[0].length
              processedContent = processedContent.substring(0, startPos) +
                `fill="${color}"` +
                processedContent.substring(endPos)
            }
          }
        } else {
          // 添加 fill 属性
          const insertPos = element.index + `<${element.tag}`.length
          processedContent = processedContent.substring(0, insertPos) +
            ` fill="${color}"` +
            processedContent.substring(insertPos)
        }
      }
      
      return processedContent
    }

    const loadIcon = async () => {
      try {
        const icon = await getIcon(props.name)
        if (icon) {
          let content = icon.content
          viewBox.value = icon.viewBox || '0 0 24 24'
          
          // 处理颜色
          if (props.color) {
            if (Array.isArray(props.color)) {
              // 多色处理
              content = processMultiColor(content, props.color)
              fill.value = 'none' // 多色时使用 none，让子元素控制颜色
            } else {
              // 单色处理
              fill.value = props.color
              // 替换所有 fill 属性为指定颜色（除了 none）
              content = content.replace(/fill="(?!none)[^"]*"/g, `fill="${props.color}"`)
              // 如果没有 fill 属性，为根元素添加
              if (!content.match(/fill=/)) {
                const firstElementMatch = content.match(/<(path|circle|rect|polygon|ellipse|g)/)
                if (firstElementMatch) {
                  const insertPos = firstElementMatch.index! + firstElementMatch[0].length
                  content = content.substring(0, insertPos) +
                    ` fill="${props.color}"` +
                    content.substring(insertPos)
                }
              }
            }
          } else {
            fill.value = icon.fill || 'currentColor'
          }
          
          svgContent.value = content
        }
      } catch (error) {
        console.error(`Failed to load icon: ${props.name}`, error)
      }
    }

    watch(() => props.name, loadIcon, { immediate: true })
    watch(() => props.color, loadIcon)

    onMounted(() => {
      loadIcon()
    })

    return () => {
      return h('svg', {
        width: sizeValue.value,
        height: sizeValue.value,
        viewBox: viewBox.value,
        fill: fill.value,
        style: {
          display: 'inline-block',
          verticalAlign: 'middle',
          transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined,
        },
        innerHTML: svgContent.value
      }, {
        on: {
          click: (evt: MouseEvent) => emit('click', evt)
        }
      })
    }
  }
})

