import {
  ref,
  watch,
  computed,
  defineComponent,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
} from 'vue';
import { ComponentClassBlock, useNamespace, isNil } from '@nio-fe/shared';
import type { LegoSetupContext } from '@nio-fe/shared';
import { useWatermarkProps } from './composables/useProps';
import { useWatermarkEmits } from './composables/useEmits';
import { useWatermarkSlots } from './composables/useSlots';
import type { WatermarkEmits } from './composables/useEmits';
import type { WatermarkSlots } from './composables/useSlots';
import { getDpr, rotateCanvas, setWaterMarkStyle } from './utils/base';
import throttle from 'lodash/throttle';

const defaultContentStyle = {
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  fontSize: 16,
  fontFamily: 'sans-serif',
  color: 'rgba(115, 117, 122, 1)',
};
const dpr = getDpr();

export default defineComponent({
  name: `${useNamespace()}Watermark`,
  desc: '水印组件',
  props: useWatermarkProps,
  emits: useWatermarkEmits,
  slots: useWatermarkSlots,
  setup(props, { emit, slots }: LegoSetupContext<WatermarkEmits, WatermarkSlots>) {
    const classHelper = new ComponentClassBlock('watermark');
    const wrapRef = ref<HTMLElement | null>(null);
    const watermarkRef = ref<HTMLElement | null>(null);
    const stopObservation = ref(false);

    const containerRef = computed(() =>
      props.global ? document.body : (props.container ?? wrapRef.value),
    );
    const imgWidth = computed(() => props.width * dpr);
    const imgHeight = computed(() => props.height * dpr);
    const gapX = computed(() => props.gap[0] * dpr);
    const gapY = computed(() => props.gap[1] * dpr);

    const contentCalc = computed(() =>
      Array.isArray(props.content) ? props.content : [props.content],
    );
    const contentStyleCalc = computed(() => {
      const res = { ...defaultContentStyle, ...props.contentStyle };
      res.fontSize *= dpr;
      return res;
    });

    /** 获取水印内容的尺寸（文本内容的宽高自适应，图片内容的宽高采用“width”和“height”属性值） */
    function getContentSize(ctx: CanvasRenderingContext2D, onlyContent = false) {
      if (props.image && !onlyContent) {
        return [imgWidth.value, imgHeight.value];
      }
      const { fontStyle, fontVariant, fontWeight, fontSize, fontFamily } = contentStyleCalc.value;
      ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`;
      const widthList = contentCalc.value.map(text => {
        const metrics = ctx.measureText(text);
        return Math.max(
          metrics.width,
          Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight),
        );
      });
      const actualWidth = Math.ceil(Math.max(...widthList));
      const actualHeight = fontSize * widthList.length + props.lineGap * (widthList.length - 1);

      return [actualWidth, actualHeight];
    }

    /** 绘制文本内容 */
    function drawTextContent(
      ctx: CanvasRenderingContext2D,
      contentWidth: number,
      contentHeight: number,
      singleWidth: number,
      singleHeight: number,
      rows: number,
      columns: number,
      cb: () => void,
    ) {
      const { fontStyle, fontVariant, fontWeight, fontSize, fontFamily, color } =
        contentStyleCalc.value;
      ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns + row; column++) {
          contentCalc.value.forEach((text, index) => {
            ctx.fillText(
              text,
              // 单个矩形的宽度（包括水平方向上两侧的gap）+ 当前矩形左侧的gap + 文本内容宽度的一半（因为文本是居中绘制的） - 第row行应该向左错位的宽度
              singleWidth * column + gapX.value + contentWidth / 2 - (singleWidth / 2) * row,
              // 单个矩形的高度（包括垂直方向上两侧的gap）+ 当前矩形顶部的gap + 水印内容为多行文本时，各行在垂直方向上的偏移量
              singleHeight * row + gapY.value + (fontSize + props.lineGap) * index,
              contentWidth,
            );
          });
        }
      }
      cb();
    }

    /** 绘制图片内容 */
    function drawImageContent(
      ctx: CanvasRenderingContext2D,
      contentWidth: number,
      contentHeight: number,
      singleWidth: number,
      singleHeight: number,
      rows: number,
      columns: number,
      cb: () => void,
    ) {
      if (!props.image) {
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = props.image;
      img.onload = () => {
        for (let row = 0; row < rows; row++) {
          for (let column = 0; column < columns + row; column++) {
            ctx.drawImage(
              img,
              // 单个矩形的宽度（包括水平方向上两侧的gap）+ 当前矩形左侧的gap - 第row行应该向左错位的宽度
              singleWidth * column + gapX.value - (singleWidth / 2) * row,
              // 单个矩形的高度（包括垂直方向上两侧的gap）+ 当前矩形顶部的gap
              singleHeight * row + gapY.value,
              contentWidth,
              contentHeight,
            );
          }
        }
        cb();
      };
      img.onerror = () => {
        reRender(true);
      };
    }

    /** 渲染水印 */
    function renderRemark(onlyContent = false) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx || !containerRef.value) {
        return;
      }
      stopObservation.value = true;

      if (!watermarkRef.value) {
        watermarkRef.value = document.createElement('div');
      }

      const [contentWidth, contentHeight] = getContentSize(ctx, onlyContent);

      const canvasWidth = (props.global ? window.innerWidth : containerRef.value.clientWidth) * dpr;
      const canvasHeight =
        (props.global ? window.innerHeight : containerRef.value.clientHeight) * dpr;
      canvas.setAttribute('width', `${canvasWidth}px`);
      canvas.setAttribute('height', `${canvasHeight}px`);

      ctx.restore();
      rotateCanvas(ctx, canvasWidth / 2, canvasHeight / 2, props.rotate);

      const singleWidth = contentWidth + gapX.value * 2;
      const singleHeight = contentHeight + gapY.value * 2;
      const diagonalLength = Math.sqrt(canvasWidth ** 2 + canvasHeight ** 2);
      const rows = Math.ceil(diagonalLength / singleHeight);
      const columns = rows;

      const transY = -Math.ceil((diagonalLength - canvasHeight) / 2 / singleHeight) * singleHeight;
      ctx.translate(0, transY);

      if (props.image && !onlyContent) {
        drawImageContent(
          ctx,
          contentWidth,
          contentHeight,
          singleWidth,
          singleHeight,
          rows,
          columns,
          initWatermarkDom,
        );
      } else {
        drawTextContent(
          ctx,
          contentWidth,
          contentHeight,
          singleWidth,
          singleHeight,
          rows,
          columns,
          initWatermarkDom,
        );
      }

      /** 设置水印DOM的样式并进行挂载 */
      function initWatermarkDom() {
        if (!watermarkRef.value) {
          return;
        }
        setWaterMarkStyle(
          watermarkRef.value,
          canvas.toDataURL(),
          props.zIndex,
          props.opacity,
          props.offset,
          props.global,
        );
        containerRef.value?.appendChild(watermarkRef.value);
        setTimeout(() => {
          stopObservation.value = false;
        }, 0);
      }
    }
    /** 清除水印 */
    function clearRemark() {
      watermarkRef.value?.remove();
      watermarkRef.value = null;
    }

    /** 重新渲染水印 */
    function reRender(onlyContent = false) {
      cancelObservers();
      clearRemark();
      renderRemark(onlyContent);
      initObservers();
    }

    const observer = new MutationObserver(mutations => {
      if (stopObservation.value) {
        return;
      }
      mutations.forEach(mutation => {
        const { type, target, removedNodes } = mutation;
        const markRemoved = Array.from(removedNodes).some(it => it === watermarkRef.value);
        const markEdited = type === 'attributes' && target === watermarkRef.value;
        if (markRemoved || markEdited) {
          emit('tampered');
          reRender();
        }
      });
    });
    let ongoingAnimation: number | null = null;
    const resizeObserver = new ResizeObserver(
      throttle(() => {
        const invalid = !isNil(ongoingAnimation) || stopObservation.value;
        if (invalid) return;
        ongoingAnimation = window.requestAnimationFrame(() => {
          reRender();
          setTimeout(() => (ongoingAnimation = null), 0);
        });
      }, 1000 / 60),
    );
    function initObservers() {
      containerRef.value &&
        observer.observe(containerRef.value, { subtree: true, childList: true, attributes: true });
      containerRef.value && resizeObserver.observe(containerRef.value);
    }
    function cancelObservers() {
      observer.takeRecords();
      observer.disconnect();
      resizeObserver.disconnect();
    }

    onMounted(() => {
      renderRemark();
      initObservers();
    });
    onActivated(() => {
      !watermarkRef.value && reRender();
    });
    onDeactivated(() => {
      cancelObservers();
      clearRemark();
    });
    onUnmounted(() => {
      cancelObservers();
      clearRemark();
    });

    watch(props, () => reRender(), { deep: true });

    return () => (
      <div class={`${classHelper.block}`} ref={wrapRef}>
        {slots.default?.()}
      </div>
    );
  },
});
