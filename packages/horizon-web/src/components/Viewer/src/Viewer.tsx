import {
  computed,
  defineComponent,
  nextTick,
  reactive,
  ref,
  Teleport,
  toRefs,
  watch,
  inject,
  withModifiers,
} from 'vue';
import { useResizeObserver, onKeyStroke } from '@vueuse/core';
import { useViewerProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace, useZIndex } from '@aurora/utils';
import { AIcon, IconLoadingLine, IconPlayFilled } from '@aurora/icon';
import tooltip from '~/directives/v-tooltip';
import draggable from '~/directives/v-draggable';
import useZoom from './composables/useZoom';
import useNavigation from './composables/useNavigation';
import useHideTools from './composables/useHideTools';
import NVideoPlayer from '../../VideoPlayer';
import type { ViewerEmits } from './composables/useEmits';
import { useViewerEmits } from './composables/useEmits';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import NTransition from '~/components/Transition/src/Transition';

export default defineComponent({
  name: `${useNamespace()}Viewer`,
  desc: '图片视频查看器',
  components: {
    AIcon,
    IconLoadingLine,
    IconPlayFilled,
    NVideoPlayer,
    NTransition,
  },
  directives: {
    tooltip,
    draggable,
  },
  inheritAttrs: false,
  props: useViewerProps,
  emits: useViewerEmits,
  setup(props, { attrs, emit }: HorizonWebSetupContext<ViewerEmits>) {
    const locale = inject(localeInjectKey, defaultLocale);
    const {
      modelValue: modelValueRef,
      sources: sourcesRef,
      initIndex: initIndexRef,
      loop: loopRef,
      tools: toolsRef,
      autoHideTools: autoHideToolsRef,
      downloadFn: downloadFnRef,
      hideOnClickModal: hideOnClickModalProp,
    } = toRefs(props);

    const zIndexHandler = useZIndex(props.zIndex);
    const zIndex = ref(zIndexHandler.current);

    const viewportInfo = reactive({
      width: 0,
      height: 0,
    });

    const toolBtnList = computed(() => {
      if (toolsRef.value) {
        return toolsRef.value;
      }
      if (sourcesRef.value.length === 1) {
        if (currentSource.value.type === 'video') {
          return ['rotate', 'split', 'download'];
        }
        return [
          'zoomOut',
          'ratio',
          'zoomIn',
          '1:1',
          'split',
          'rotate',
          'split',
          'legend',
          'download',
        ];
      }
      if (currentSource.value.type === 'video') {
        return [
          'thumbnail',
          'split',
          'previous',
          'current',
          'next',
          'split',
          'rotate',
          'split',
          'download',
        ];
      }
      return [
        'thumbnail',
        'split',
        'previous',
        'current',
        'next',
        'split',
        'zoomOut',
        'ratio',
        'zoomIn',
        '1:1',
        'split',
        'rotate',
        'split',
        'legend',
        'download',
      ];
    });

    const {
      currentIndexRef,
      loadingPreviewRef,
      goToImg,
      goToPrevious,
      goToNext,
      previewDisabledRef,
      nextDisabledRef,
    } = useNavigation(sourcesRef, loopRef);

    const currentSource = computed(() => {
      return sourcesRef.value[currentIndexRef.value];
    });

    const navTranslateRef = computed(() => {
      return currentIndexRef.value * -84;
    });

    const previewBottomRef = ref(108);
    const previewElWrap = ref<HTMLElement | null>(null);

    // 设置 preview 的初始宽高
    watch(modelValueRef, val => {
      if (val) {
        previewBottomRef.value = sourcesRef.value.length > 1 ? 208 : 108;
        showThumbnailRef.value = sourcesRef.value.length > 1;
        currentIndexRef.value = initIndexRef.value;
        zIndex.value = zIndexHandler.next();
        nextTick(() => {
          if (previewElWrap.value) {
            viewportInfo.width = previewElWrap.value.clientWidth;
            viewportInfo.height = previewElWrap.value.clientHeight;
            // 当检测到 preview 容器大小改变后，去修正大图的尺寸
            useResizeObserver(previewElWrap, entries => {
              const entry = entries[0];
              const { width, height } = entry.contentRect;
              viewportInfo.width = width;
              viewportInfo.height = height;
              zoomToAdjust();
              moveCenter();
            });
          }
        });
      }
    });
    const videoSizeRef = computed(() => {
      const height = Math.min(viewportInfo.height, 507);
      const width = height * (900 / 507);
      return {
        width: `${width}px`,
        height: `${height}px`,
      };
    });
    const showThumbnailRef = ref(false);
    const toggleThumbnail = () => {
      showThumbnailRef.value = !showThumbnailRef.value;
      previewBottomRef.value = showThumbnailRef.value ? 208 : 108;
    };
    watch(sourcesRef, () => {
      previewBottomRef.value = sourcesRef.value.length > 1 ? 208 : 108;
      showThumbnailRef.value = sourcesRef.value.length > 1;
    });

    const currentImgObj = reactive({
      naturalWidth: 0,
      naturalHeight: 0,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      ratio: 1,
      rotate: 0,
      transition: 'all .3s ease',
    });
    const displayRatioRef = computed(() => {
      if (isNaN(currentImgObj.ratio)) {
        return '';
      }
      return `${(currentImgObj.ratio * 100).toFixed()}%`;
    });

    // 将图片居中展示
    const moveCenter = () => {
      const viewerWidth = viewportInfo.width;
      const viewerHeight = viewportInfo.height;
      const left = (viewerWidth - currentImgObj.width) / 2;
      const top = (viewerHeight - currentImgObj.height) / 2;
      currentImgObj.left = left;
      currentImgObj.top = top;
    };

    const { zoomToAdjust, zoomToRatio, zoomIn, zoomOut } = useZoom(viewportInfo, currentImgObj);

    const originIconRef = ref(true);
    const adaptClick = () => {
      if (originIconRef.value) {
        // 原始尺寸
        zoomToRatio(1);
      } else {
        zoomToAdjust();
      }
      moveCenter();
      originIconRef.value = !originIconRef.value;
    };

    const closeModal = () => {
      emit('update:modelValue', false);
    };
    const onImgLoad = (event: Event, currentIndex: number) => {
      if (currentIndexRef.value !== currentIndex) {
        return;
      }
      const el = event.target as HTMLImageElement;
      currentImgObj.naturalHeight = el.naturalHeight;
      currentImgObj.naturalWidth = el.naturalWidth;
      currentImgObj.rotate = 0;
      zoomToAdjust();
      moveCenter();
      loadingPreviewRef.value = false;
    };

    const onMoveStart = () => {
      // 拖动之前必须将过渡效果去掉，否则会卡顿
      currentImgObj.transition = 'none';
    };

    const onMoveEnd = (top: number, left: number) => {
      currentImgObj.top = top;
      currentImgObj.left = left;
      currentImgObj.transition = 'all .3s ease';
    };

    const videoDegree = ref<0 | 90 | 180 | 270>(0);
    const rotate = () => {
      if (currentSource.value.type === 'video') {
        switch (videoDegree.value) {
          case 0:
            videoDegree.value = 90;
            return;
          case 90:
            videoDegree.value = 180;
            return;
          case 180:
            videoDegree.value = 270;
            return;
          case 270:
            videoDegree.value = 0;
            return;
        }
      } else {
        const currentRotate = currentImgObj.rotate;
        const newRotate = currentRotate - 90;
        currentImgObj.rotate = newRotate;
      }
    };

    const download = async () => {
      let sourceUrl;
      if (currentSource.value.type === 'video') {
        if (
          currentSource.value.videoSources &&
          currentSource.value.videoSources.length &&
          currentSource.value.videoSources[0].src
        ) {
          sourceUrl = currentSource.value.videoSources[0].src;
        } else {
          // eslint-disable-next-line no-console
          console.warn('[HORIZONWEB] Viewer Error: videoSources[0].src is required!');
          return;
        }
      } else {
        sourceUrl = currentSource.value.cover;
      }
      if (downloadFnRef.value) {
        downloadFnRef.value(sourceUrl);
        return;
      }
      let downloadUrl = '';
      try {
        // 不能直接将资源地址赋给 link.href，因为跨域导致 Chrome 不会执行下载，而是打开新标签
        const source = await fetch(sourceUrl);
        const sourceBlog = await source.blob();
        downloadUrl = URL.createObjectURL(sourceBlog);
      } catch (err) {
        console.error(err);
        console.warn('download fetch error, fallback to download directly, url:', sourceUrl);
        downloadUrl = sourceUrl;
      }
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.download = currentSource.value.title || String(Date.now());
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const showLegendRef = ref(true);
    const toggleLegend = () => {
      showLegendRef.value = !showLegendRef.value;
    };

    const legendClick = (e: Event, handler?: (cover: string) => void) => {
      if (!handler) {
        return;
      }
      const cover = currentSource.value.cover;
      handler(cover);
    };

    onKeyStroke('Escape', (e: KeyboardEvent) => {
      if (modelValueRef.value) {
        e.preventDefault();
        closeModal();
      }
    });

    onKeyStroke('ArrowRight', (e: KeyboardEvent) => {
      if (modelValueRef.value) {
        e.preventDefault();
        goToNext();
      }
    });

    onKeyStroke('ArrowLeft', (e: KeyboardEvent) => {
      if (modelValueRef.value) {
        e.preventDefault();
        goToPrevious();
      }
    });

    onKeyStroke('ArrowUp', (e: KeyboardEvent) => {
      if (modelValueRef.value) {
        e.preventDefault();
        zoomIn();
      }
    });

    onKeyStroke('ArrowDown', (e: KeyboardEvent) => {
      if (modelValueRef.value) {
        e.preventDefault();
        zoomOut();
      }
    });

    const wheeling = ref(false);
    // 鼠标滚动或手指缩放
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      // 做一点限制，防止速度太快
      if (wheeling.value) {
        return;
      }
      wheeling.value = true;
      setTimeout(() => {
        wheeling.value = false;
      }, 50);

      if (e.deltaY < 0) {
        // 放大
        zoomIn();
      } else {
        zoomOut();
      }
    };

    const { showToolsRef } = useHideTools(modelValueRef, autoHideToolsRef);

    const classHelper = new ComponentClassBlock('viewer');
    return () => (
      <Teleport to="body">
        <NTransition name="fade-in">
          {modelValueRef.value && (
            <div
              {...attrs}
              class={[`${classHelper.block}`]}
              style={{ zIndex: zIndex.value }}
              onWheel={e => onWheel(e)}
              onClick={hideOnClickModalProp.value ? closeModal : undefined}
            >
              <div
                ref={previewElWrap}
                class={`${classHelper.e('preview')}`}
                style={{
                  bottom: `${previewBottomRef.value}px`,
                }}
              >
                <IconLoadingLine
                  v-show={loadingPreviewRef.value}
                  color={['#14798F']}
                  size={28}
                  class={`${classHelper.e('loading')}`}
                />
                <NTransition name="fade-in">
                  <div v-show={!loadingPreviewRef.value} onClick={e => e.stopPropagation()}>
                    {currentSource.value.type === 'image' ? (
                      <div
                        v-draggable={{
                          onMoveStart,
                          onMoveEnd,
                        }}
                        class={`${classHelper.e('wrap')}`}
                        onDblclick={adaptClick}
                        style={{
                          width: `${currentImgObj.width}px`,
                          height: `${currentImgObj.height}px`,
                          top: `${currentImgObj.top}px`,
                          left: `${currentImgObj.left}px`,
                          transition: `${currentImgObj.transition}`,
                          transform: `rotate(${currentImgObj.rotate}deg)`,
                        }}
                      >
                        <img
                          src={currentSource.value.cover}
                          onLoad={e => onImgLoad(e, currentIndexRef.value)}
                        />
                        {(currentSource.value.legends || []).map(legend => {
                          return (
                            <div
                              v-show={showLegendRef.value}
                              class={[
                                `${classHelper.e('legend')}`,
                                legend.handler && `${classHelper.em('legend', 'hoverable')}`,
                              ]}
                              style={{
                                left: `${legend.x * currentImgObj.ratio}px`,
                                top: `${legend.y * currentImgObj.ratio}px`,
                              }}
                            >
                              <div class={`${classHelper.e('legend-dot')}`}></div>
                              <div class={`${classHelper.e('legend-line')}`}></div>
                              <div
                                class={`${classHelper.e('legend-body')}`}
                                onClick={e => legendClick(e, legend.handler)}
                                onDblclick={e => {
                                  e.stopPropagation();
                                }}
                              >
                                {legend.label}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div
                        class={`${classHelper.e('wrap-video')}`}
                        style={{
                          width: videoSizeRef.value.width,
                          height: videoSizeRef.value.height,
                        }}
                      >
                        <NVideoPlayer
                          poster={currentSource.value.cover}
                          sources={currentSource.value.videoSources!}
                          rotate={videoDegree.value}
                          options={{
                            hotkeys: false,
                            fluid: false,
                            ...currentSource.value.videoOptions,
                          }}
                          onReady={() => (loadingPreviewRef.value = false)}
                        />
                      </div>
                    )}
                  </div>
                </NTransition>
              </div>
              <NTransition name="fade-in">
                <div
                  v-show={showThumbnailRef.value}
                  class={`${classHelper.e('navbar')}`}
                  onClick={e => e.stopPropagation()}
                >
                  <ul
                    style={{
                      transform: `translateX(${navTranslateRef.value}px)`,
                    }}
                  >
                    {sourcesRef.value.map((imgObj, index) => (
                      <li
                        class={[currentIndexRef.value === index && `${classHelper.m('active')}`]}
                        onClick={() => goToImg(index)}
                      >
                        <img src={imgObj.thumbnail || imgObj.cover} alt="" />
                        {imgObj.type === 'video' && (
                          <div class={classHelper.e('play-icon')}>
                            <IconPlayFilled size={18} color={['#fff']} />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </NTransition>
              <NTransition name="fade-in">
                <div
                  v-show={showToolsRef.value}
                  class={`${classHelper.e('toolbar')}`}
                  onClick={e => e.stopPropagation()}
                >
                  {toolBtnList.value &&
                    toolBtnList.value.length &&
                    toolBtnList.value.map(tool => {
                      switch (tool) {
                        case 'thumbnail':
                          return (
                            <button
                              v-tooltip={
                                showThumbnailRef.value
                                  ? locale.value?.langService.td().horizonWeb.viewer.closeThumbnail
                                  : locale.value?.langService.td().horizonWeb.viewer.thumbnail
                              }
                              type="button"
                              onClick={toggleThumbnail}
                            >
                              <AIcon
                                name={`${showThumbnailRef.value ? 'thumbnail_close' : 'thumbnail'}`}
                                size="24"
                              />
                            </button>
                          );
                        case 'split':
                          return <i class={`${classHelper.e('split')}`} />;
                        case 'previous':
                          return (
                            <button
                              v-tooltip={locale.value?.langService.td().horizonWeb.viewer.previous}
                              type="button"
                              onClick={goToPrevious}
                              disabled={previewDisabledRef.value}
                            >
                              <AIcon name="arrow_left" size="24" />
                            </button>
                          );
                        case 'next':
                          return (
                            <button
                              v-tooltip={locale.value?.langService.td().horizonWeb.viewer.next}
                              type="button"
                              onClick={goToNext}
                              disabled={nextDisabledRef.value}
                            >
                              <AIcon name="arrow_right" size="24" />
                            </button>
                          );
                        case 'current':
                          return (
                            <div>
                              {currentIndexRef.value + 1}/{sourcesRef.value.length}
                            </div>
                          );
                        case 'zoomOut':
                          return (
                            <button
                              v-tooltip={locale.value?.langService.td().horizonWeb.viewer.zoomOut}
                              type="button"
                              onClick={zoomOut}
                            >
                              <AIcon name="scale_small" size="24" />
                            </button>
                          );
                        case 'zoomIn':
                          return (
                            <button
                              v-tooltip={locale.value?.langService.td().horizonWeb.viewer.zoomIn}
                              type="button"
                              onClick={zoomIn}
                            >
                              <AIcon name="scale_big" size="24" />
                            </button>
                          );
                        case 'ratio':
                          return <div style="width: 58px">{displayRatioRef.value}</div>;
                        case '1:1':
                          return (
                            <button
                              v-tooltip={
                                originIconRef.value
                                  ? locale.value?.langService.td().horizonWeb.viewer.fitContent
                                  : '1:1'
                              }
                              type="button"
                              onClick={adaptClick}
                            >
                              <AIcon
                                name={`${originIconRef.value ? 'scaling' : 'adapt'}`}
                                size="24"
                              />
                            </button>
                          );
                        case 'rotate':
                          return (
                            <button
                              v-tooltip={locale.value?.langService.td().horizonWeb.viewer.spin}
                              type="button"
                              onClick={rotate}
                            >
                              <AIcon name="spin" size="24" />
                            </button>
                          );
                        case 'legend':
                          if (currentSource.value.type === 'image' && currentSource.value.legends) {
                            return (
                              <button
                                v-tooltip={
                                  showLegendRef.value
                                    ? locale.value?.langService.td().horizonWeb.viewer.hideLabel
                                    : locale.value?.langService.td().horizonWeb.viewer.displayLabel
                                }
                                type="button"
                                onClick={toggleLegend}
                              >
                                <AIcon
                                  name={`${showLegendRef.value ? 'label_close' : 'label'}`}
                                  size="24"
                                />
                              </button>
                            );
                          }
                          return null;
                        case 'download':
                          return (
                            <button
                              v-tooltip={locale.value?.langService.td().horizonWeb.viewer.download}
                              type="button"
                              onClick={download}
                            >
                              <AIcon name="download" size="24" />
                            </button>
                          );
                        default:
                          if (typeof tool === 'object') {
                            return (
                              <button
                                v-tooltip={{
                                  content: tool.title,
                                  disabled: !tool.title,
                                }}
                                type="button"
                                onClick={() => tool.handler(currentSource.value.cover)}
                              >
                                <AIcon
                                  name={tool.iconName}
                                  size={tool.iconSize}
                                  color={tool.iconColor}
                                />
                              </button>
                            );
                          } else {
                            return null;
                          }
                      }
                    })}
                </div>
              </NTransition>
              <div class={`${classHelper.e('header')}`} onClick={e => e.stopPropagation()}>
                <span>{currentSource.value.title}</span>
                <button
                  class={`${classHelper.e('close')}`}
                  type="button"
                  onClick={withModifiers(closeModal, ['stop'])}
                >
                  <AIcon name="close" size="20" />
                </button>
              </div>
            </div>
          )}
        </NTransition>
      </Teleport>
    );
  },
});
