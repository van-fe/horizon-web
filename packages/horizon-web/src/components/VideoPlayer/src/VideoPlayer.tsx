import { defineComponent, ref, onMounted, onUnmounted, watch, nextTick, inject } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { useVideoPlayerProps } from './composables/useProps';
import type { LegoSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { IconVideoError } from '@aurora/icon';
import videojs from 'video.js';
import './qualityLevels/plugin.js';
import './qualitySelector/plugin.js';
import NButton from '~/components/Button/src/Button';
import type { VideoPlayerEmits } from './composables/useEmits';
import { useVideoPlayerEmits } from './composables/useEmits';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import type { VideoPlayerSlots } from './composables/useSlots';
import { useVideoPlayerSlots } from './composables/useSlots';
import type { VideoPlayerExposes } from './composables/useExposes';
import { useVideoPlayerExposes } from './composables/useExposes';

export default defineComponent({
  name: `${useNamespace()}VideoPlayer`,
  desc: '视频播放器组件，封装了 [videoJs](https://videojs.com/)',
  props: useVideoPlayerProps,
  emits: useVideoPlayerEmits,
  slots: useVideoPlayerSlots,
  exposes: useVideoPlayerExposes,
  setup(props, { emit }: LegoSetupContext<VideoPlayerEmits, VideoPlayerSlots, VideoPlayerExposes>) {
    const classHelper = new ComponentClassBlock('video-player');
    const playerIns = ref();
    const wrapRef = ref<HTMLElement | null>(null);
    const videoPlayerRef = ref<HTMLVideoElement | null>(null);
    const showError = ref(false);
    const initialize = () => {
      if (videoPlayerRef.value) {
        playerIns.value = videojs(
          videoPlayerRef.value,
          {
            autoplay: false,
            controls: true,
            fluid: true,
            controlBar: {
              volumePanel: {
                inline: false,
              },
              fullscreenToggle: true,
              currentTimeDisplay: true,
              durationDisplay: true,
              remainingTimeDisplay: false,
              pictureInPictureToggle: false,
            },
            // inactivityTimeout: 0,
            userActions: {
              hotkeys: true,
            },
            ...props.options,
            sources: props.sources,
            poster: props.poster,
          },
          () => {
            if (videoPlayerRef.value) {
              videoPlayerRef.value.style.transform = `rotate(0deg)`;
              videoPlayerRef.value.style.width = '100%';
            }
            if (playerIns.value.hlsQualitySelector) {
              playerIns.value.hlsQualitySelector({
                displayCurrentQuality: true,
              });
            }
            emit('ready', playerIns.value);
          },
        );
        playerIns.value.on('error', () => {
          showError.value = true;
        });
      }
    };
    const reseted = ref(true);
    const dispose = (callback?: () => void) => {
      if (playerIns.value && playerIns.value.dispose) {
        if (playerIns.value.techName_ !== 'Flash') {
          playerIns.value.pause && playerIns.value.pause();
        }
        playerIns.value.dispose();
        playerIns.value = null;
        nextTick(() => {
          reseted.value = false;
          nextTick(() => {
            reseted.value = true;
            nextTick(() => {
              callback && callback();
            });
          });
        });
      }
    };
    const reload = () => {
      showError.value = false;
      dispose(() => {
        initialize();
      });
    };
    watch(
      () => props.sources,
      (current, prev) => {
        if (JSON.stringify(current) !== JSON.stringify(prev)) {
          reload();
        }
      },
    );
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
    watch(
      () => props.rotate,
      current => {
        const videoEl = videoPlayerRef.value;
        if (!videoEl) {
          return;
        }
        videoEl.style.transform = `rotate(${current}deg)`;
        videoEl.style.width = getVideoWidth();
      },
    );

    const locale = inject(localeInjectKey, defaultLocale);

    onMounted(() => {
      if (!playerIns.value) {
        initialize();
        useResizeObserver(wrapRef, () => {
          const videoEl = videoPlayerRef.value;
          if (!videoEl) {
            return;
          }
          videoEl.style.width = getVideoWidth();
        });
      }
    });
    onUnmounted(() => {
      if (playerIns.value) {
        dispose();
      }
    });
    return () =>
      reseted.value && (
        <div class={classHelper.block} ref={wrapRef}>
          <video ref={videoPlayerRef} class="video-js"></video>
          {showError.value && (
            <div class={classHelper.e('error')}>
              <div class={classHelper.e('error-content')}>
                <IconVideoError size={40} color={['#8B8E94', '#8B8E94', '#8B8E94']} />
                <p>{locale.value?.langService.td().horizon-web.videoPlayer.error}</p>
                <NButton forceNewestSize={true} onClick={reload}>
                  {locale.value?.langService.td().horizon-web.global.refresh}
                </NButton>
              </div>
            </div>
          )}
        </div>
      );
  },
});
