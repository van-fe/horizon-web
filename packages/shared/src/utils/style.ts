/*
 * @Date: 2022-01-12 12:12:32
 * @LastEditTime: 2022-01-12 13:42:21
 * @Description: file content
 */
export function colorRgb(colorStr: String, opacity: Number) {
  let sColor = colorStr.toLowerCase();
  //十六进制颜色值的正则表达式
  const reg = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    // 8位的颜色值
    if (sColor.length === 9 && opacity !== 0) {
      opacity = +(parseInt('0x' + sColor.substring(sColor.length - 2)) / 255).toFixed(1);
    }
    // 三位
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }
    return 'rgb(' + sColorChange.join(',') + ', ' + opacity + ')';
  }
  return sColor;
}

export function sizeUnitTransform<T extends string | number | undefined | null>(
  size: T,
  unit = 'px',
): string | undefined {
  return typeof size === 'number'
    ? `${size}${unit}`
    : typeof size === 'string'
      ? [
          'fit-content',
          'max-content',
          'min-content',
          'auto',
          'inherit',
          '-webkit-fill-available',
        ].includes(size)
        ? size
        : /(%|vh|vm|em|rem|ex|ch|vmin|vmax|cap|ic|lh|rlh|vi|vb|svh|svw|lvh|lvw|dvh|dvw|svb|svw|lvb|lvw|dvb|dvw)$/.test(
              size,
            )
          ? size
          : size.startsWith('var(')
            ? size
            : size.startsWith('calc(')
              ? size
              : parseFloat(size) + unit
      : undefined;
}
