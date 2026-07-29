import type { CSSProperties } from 'vue';

/** 设置水印DOM元素的样式 */
export function setWaterMarkStyle(
  watermarkDom: HTMLElement,
  imgUrl: string,
  zIndex: number,
  opacity: number,
  offset: [number, number],
  global: boolean,
) {
  const resStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    position: global ? 'fixed' : 'absolute',
    left: '0',
    top: '0',
    pointerEvents: 'none',
    backgroundImage: `url(${imgUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundPosition: `${offset[0]}px ${offset[1]}px`,
    zIndex,
    opacity,
    transition: 'all .3s',
  };
  const resVal = Object.entries(resStyle).reduce((prev, cur) => {
    const [key, val] = cur;
    const resKey = key.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);
    return `${prev}${resKey}: ${val}; `;
  }, '');
  watermarkDom.setAttribute('style', resVal);
}

/** 旋转canvas画布 */
export function rotateCanvas(
  ctx: CanvasRenderingContext2D,
  originX: number,
  originY: number,
  deg: number,
) {
  ctx.translate(originX, originY);
  ctx.rotate(deg * (Math.PI / 180));
  ctx.translate(-originX, -originY);
}

/** 获取当前设备dpr值（最小值默认为“2”，用以提高水印的清晰度） */
export function getDpr() {
  if (typeof window === 'undefined') return 2;
  return window.devicePixelRatio > 2 ? window.devicePixelRatio : 2;
}
