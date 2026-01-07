import { defineComponent, ref, onMounted, onUnmounted, watch, computed, inject } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { useVideoPlayerProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { IconVideoError } from '@aurora/icon';
import HButton from '~/components/Button/src/Button';
import type { VideoPlayerEmits } from './composables/useEmits';
import { useVideoPlayerEmits } from './composables/useEmits';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import type { VideoPlayerSlots } from './composables/useSlots';
import { useVideoPlayerSlots } from './composables/useSlots';
import type { VideoPlayerExposes } from './composables/useExposes';
import { useVideoPlayerExposes } from './composables/useExposes';

export default defineComponent({
  name: `${useNamespace()}VideoPlayer`,
  desc: '视频播放器组件',
  props: useVideoPlayerProps,
  emits: useVideoPlayerEmits,
  slots: useVideoPlayerSlots,
  exposes: useVideoPlayerExposes,
  setup(props, { emit }: HorizonWebSetupContext<VideoPlayerEmits, VideoPlayerSlots, VideoPlayerExposes>) {
    const classHelper = new ComponentClassBlock('video-player');
    const wrapRef = ref<HTMLElement | null>(null);
    const videoPlayerRef = ref<HTMLVideoElement | null>(null);
    const showError = ref(false);
    const isReady = ref(false);

    // 选择第一个可用的视频源
    const currentSource = computed(() => {
      if (props.sources && props.sources.length > 0) {
        return props.sources[0];
      }
      return null;
    });

    const getVideoWidth = () => {
      if (!videoPlayerRef.value) {
        return '100%';
      }
      const wrapHeight = videoPlayerRef.value.clientHeight;
      if (props.rotate === 90 || props.rotate === 270) {
        return `${wrapHeight}px`;
      }
      return '100%';
    };

    const updateVideoStyle = () => {
      const videoEl = videoPlayerRef.value;
      if (!videoEl) {
        return;
      }
      videoEl.style.transform = `rotate(${props.rotate}deg)`;
      videoEl.style.width = getVideoWidth();
    };

    const handleLoadedMetadata = () => {
      if (videoPlayerRef.value && !isReady.value) {
        isReady.value = true;
        updateVideoStyle();
        emit('ready', videoPlayerRef.value);
      }
    };

    const handleError = () => {
      showError.value = true;
    };

    const reload = () => {
      showError.value = false;
      if (videoPlayerRef.value) {
        videoPlayerRef.value.load();
      }
    };

    // 监听 sources 变化
    watch(
      () => currentSource.value,
      (newSource) => {
        if (videoPlayerRef.value && newSource) {
          showError.value = false;
          isReady.value = false;
          const sourceElement = videoPlayerRef.value.querySelector('source');
          if (sourceElement) {
            sourceElement.src = newSource.src;
            sourceElement.type = newSource.type || 'video/mp4';
          }
          videoPlayerRef.value.load();
        }
      },
    );

    // 监听 rotate 变化
    watch(
      () => props.rotate,
      () => {
        updateVideoStyle();
      },
    );

    const locale = inject(localeInjectKey, defaultLocale);

    onMounted(() => {
      if (videoPlayerRef.value) {
        videoPlayerRef.value.addEventListener('loadedmetadata', handleLoadedMetadata);
        videoPlayerRef.value.addEventListener('error', handleError);
        updateVideoStyle();

        useResizeObserver(wrapRef, () => {
          updateVideoStyle();
        });
      }
    });

    onUnmounted(() => {
      if (videoPlayerRef.value) {
        videoPlayerRef.value.removeEventListener('loadedmetadata', handleLoadedMetadata);
        videoPlayerRef.value.removeEventListener('error', handleError);
      }
    });

    return () => (
      <div class={classHelper.block} ref={wrapRef}>
        {currentSource.value && (
          <video
            ref={videoPlayerRef}
            class={classHelper.e('video')}
            controls
            poster={props.poster || undefined}
            preload="metadata"
          >
            <source src={currentSource.value.src} type={currentSource.value.type || 'video/mp4'} />
            您的浏览器不支持 video 标签。
          </video>
        )}
        {showError.value && (
          <div class={classHelper.e('error')}>
            <div class={classHelper.e('error-content')}>
              <IconVideoError size={40} color={['#8B8E94', '#8B8E94', '#8B8E94']} />
              <p>{locale.value?.langService.td().horizonWeb.videoPlayer.error}</p>
              <HButton forceNewestSize={true} onClick={reload}>
                {locale.value?.langService.td().horizonWeb.global.refresh}
              </HButton>
            </div>
          </div>
        )}
      </div>
    );
  },
});
