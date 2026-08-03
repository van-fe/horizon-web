export type IconSize = string | number | Array<string | number>
export type IconColor = string | string[]
export type IconSpin = 'cw' | 'ccw'

export interface ProcessedIcon {
  content: string
  fill: string
}

const SHAPE_ELEMENT_PATTERN = /<(path|circle|rect|polygon|ellipse|g)\b([^>]*)>/gi
const FILL_ATTRIBUTE_PATTERN = /\bfill=(["'])([^"']*)\1/i

function toCssSize(size: string | number): string {
  return typeof size === 'number' ? `${size}px` : size
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function processMultiColor(content: string, colors: string[]): string {
  if (!content || colors.length === 0) {
    return content
  }

  let index = 0
  return content.replace(SHAPE_ELEMENT_PATTERN, (element) => {
    const color = escapeAttribute(colors[Math.min(index, colors.length - 1)] || 'currentColor')
    index += 1

    const fillMatch = element.match(FILL_ATTRIBUTE_PATTERN)
    if (fillMatch) {
      if (fillMatch[2].toLowerCase() === 'none') {
        return element
      }
      return element.replace(FILL_ATTRIBUTE_PATTERN, `fill="${color}"`)
    }

    return element.replace(/\/?>$/, (ending) => ` fill="${color}"${ending}`)
  })
}

export function normalizeIconSize(size: IconSize): [string, string] {
  if (Array.isArray(size)) {
    const width = toCssSize(size[0] ?? '1em')
    return [width, toCssSize(size[1] ?? size[0] ?? '1em')]
  }

  const value = toCssSize(size)
  return [value, value]
}

export function applyIconColor(
  content: string,
  color: IconColor | undefined,
  defaultFill = 'currentColor'
): ProcessedIcon {
  if (!color) {
    return { content, fill: defaultFill }
  }

  if (Array.isArray(color)) {
    return {
      content: processMultiColor(content, color),
      fill: 'none'
    }
  }

  const escapedColor = escapeAttribute(color)
  let processedContent = content.replace(
    new RegExp(FILL_ATTRIBUTE_PATTERN.source, 'gi'),
    (attribute, quote: string, value: string) => {
      return value.toLowerCase() === 'none' ? attribute : `fill=${quote}${escapedColor}${quote}`
    }
  )

  if (!FILL_ATTRIBUTE_PATTERN.test(processedContent)) {
    processedContent = processedContent.replace(
      SHAPE_ELEMENT_PATTERN,
      (element) => element.replace(/\/?>$/, (ending) => ` fill="${escapedColor}"${ending}`)
    )
  }

  return {
    content: processedContent,
    fill: color
  }
}

export function applyIconSpin(content: string, viewBox: string, spin: IconSpin | undefined): string {
  if (!content || (spin !== 'cw' && spin !== 'ccw')) {
    return content
  }

  const values = viewBox.trim().split(/\s+/).map(Number)
  const hasValidViewBox = values.length === 4 && values.every(Number.isFinite)
  const [minX, minY, width, height] = hasValidViewBox ? values : [0, 0, 24, 24]
  const centerX = minX + width / 2
  const centerY = minY + height / 2
  const angle = spin === 'cw' ? 360 : -360

  return `<g><animateTransform attributeName="transform" type="rotate" from="0 ${centerX} ${centerY}" to="${angle} ${centerX} ${centerY}" dur="1s" repeatCount="indefinite"/>${content}</g>`
}

export function getIconClassNames(name: string): string[] {
  return ['a-icon', `h-icon_${name}`, `h-icon__${name}`]
}
