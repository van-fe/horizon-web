import { computed, defineComponent, h, type PropType } from 'vue'
import { getIconSync } from '../icons'
import {
  applyIconColor,
  applyIconSpin,
  getIconClassNames,
  normalizeIconSize,
  type IconColor,
  type IconSize,
  type IconSpin
} from '../utils/icon'

export default defineComponent({
  name: 'AIcon',
  props: {
    name: {
      type: String,
      required: true
    },
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
    const icon = computed(() => getIconSync(props.name))
    const renderedIcon = computed(() => {
      const iconInfo = icon.value
      if (!iconInfo) {
        return {
          content: '',
          fill: 'currentColor',
          viewBox: '0 0 24 24'
        }
      }

      const viewBox = iconInfo.viewBox || '0 0 24 24'
      const coloredIcon = applyIconColor(iconInfo.content, props.color, iconInfo.fill)
      return {
        content: applyIconSpin(coloredIcon.content, viewBox, props.spin),
        fill: coloredIcon.fill,
        viewBox
      }
    })

    return () =>
      h('svg', {
        class: getIconClassNames(props.name),
        viewBox: renderedIcon.value.viewBox,
        fill: renderedIcon.value.fill,
        style: {
          width: sizeValue.value[0],
          height: sizeValue.value[1],
          fontSize: sizeValue.value[0],
          display: 'inline-block',
          verticalAlign: 'inherit',
          transform: props.rotate === undefined ? undefined : `rotate(${props.rotate}deg)`
        },
        innerHTML: renderedIcon.value.content,
        onClick: (evt: MouseEvent) => emit('click', evt)
      })
  }
})
