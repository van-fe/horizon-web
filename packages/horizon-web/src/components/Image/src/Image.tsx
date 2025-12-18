import { defineComponent, ref, watch, onMounted, nextTick, inject } from 'vue';
import { useImageProps } from './composables/useProps';
import type { LegoSetupContext } from '@aurora/utils';
import { ComponentClassBlock, getUnitString, useNamespace } from '@aurora/utils';
import { IconLogo, IconPictureError, NIcon } from '@aurora/icon';
import NViewer from '~/components/Viewer/src/Viewer';
import NDropdown from '~/components/Dropdown/src/Dropdown';
import NDropdownMenu from '~/components/Dropdown/src/DropdownMenu';
import NDropdownItem from '~/components/Dropdown/src/DropdownItem';
import tooltip from '~/directives/v-tooltip';
import { useResizeObserver } from '@vueuse/core';
import type { ImageEmits } from './composables/useEmits';
import { useImageEmits } from './composables/useEmits';
import type { ImageSlots } from './composables/useSlots';
import { useImageSlots } from './composables/useSlots';
import NTransition from '~/components/Transition/src/Transition';

export default defineComponent({
  name: `${useNamespace()}Image`,
  desc: '功能强大的图片组件，应该能满足你对图片的一切需求',
  components: {
    IconLogo,
    IconPictureError,
    NIcon,
  },
  directives: {
    tooltip,
  },
  props: useImageProps,
  emits: useImageEmits,
  slots: useImageSlots,
  setup(props, { slots, emit }: LegoSetupContext<ImageEmits, ImageSlots>) {
    const nImageList = inject('nImageList', undefined);
    const classHelper = new ComponentClassBlock('image');
    const loading = ref(true);
    const error = ref(false);
    const viewerShown = ref(false);
    const onLoad = () => {
      loading.value = false;
      error.value = false;
      emit('load', props.src);
    };
    const onError = () => {
      loading.value = false;
      error.value = true;
      emit('error', props.src);
    };
    const onClick = () => {
      if (props.showViewer && !nImageList) {
        viewerShown.value = true;
      }
    };
    const imgRef = ref<HTMLElement | null>(null);
    const realSrc = ref(props.lazyload ? undefined : props.src);
    const lazyLoad = () => {
      if (!imgRef.value) {
        return;
      }
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entrie => {
          if (entrie.isIntersecting) {
            // 进入可见范围内
            realSrc.value = props.src;
            if (imgRef.value) {
              observer.unobserve(imgRef.value);
            }
          }
        });
      }, {});
      observer.observe(imgRef.value);
    };
    watch(
      () => props.src,
      src => {
        loading.value = true;
        error.value = false;
        realSrc.value = src;
      },
    );
    const autoIconSize = ref(0);
    const adjustIconSize = () => {
      if (imgRef.value) {
        const wrapSize = Math.min(imgRef.value.clientWidth, imgRef.value.clientHeight);
        if (wrapSize > 120) {
          autoIconSize.value = 40;
        } else if (wrapSize > 72) {
          autoIconSize.value = 32;
        } else {
          autoIconSize.value = 20;
        }
      } else {
        autoIconSize.value = 0;
      }
    };
    const adjustActionsPosition = ref('center');
    const adjustActionsType = ref('icon');
    const adjustActions = () => {
      if (props.showActions && props.actionsList && props.actionsList.length > 0) {
        // 操作按钮位置
        if (props.actionsPosition === 'auto') {
          if (imgRef.value) {
            const wrapSize = Math.min(imgRef.value.clientWidth, imgRef.value.clientHeight);
            if (wrapSize > 80) {
              adjustActionsPosition.value = 'bottom-right';
            } else {
              adjustActionsPosition.value = 'center';
            }
          } else {
            adjustActionsPosition.value = 'center';
          }
        } else {
          adjustActionsPosition.value = props.actionsPosition;
        }

        // 操作按钮类型
        if (props.actionsType === 'auto') {
          if (imgRef.value) {
            const wrapSize = Math.min(imgRef.value.clientWidth, imgRef.value.clientHeight);
            if (wrapSize > 40) {
              adjustActionsType.value = 'icon';
            } else {
              adjustActionsType.value = 'dropdown';
            }
          } else {
            adjustActionsType.value = 'icon';
          }
        } else {
          adjustActionsType.value = props.actionsType;
        }
      }
    };
    watch(
      () => props.showActions,
      val => {
        if (val) {
          adjustActions();
        }
      },
    );
    watch(
      () => props.actionsList,
      () => {
        adjustActions();
      },
    );
    onMounted(() => {
      if (props.lazyload) {
        lazyLoad();
      }
      nextTick(() => {
        if (imgRef.value) {
          adjustIconSize();
          adjustActions();
          useResizeObserver(imgRef.value, () => {
            adjustIconSize();
            adjustActions();
          });
        }
      });
    });
    return () => (
      <div
        ref={imgRef}
        class={`${classHelper.block}`}
        style={{
          width: getUnitString(props.width),
          maxWidth: getUnitString(props.maxWidth),
          height: getUnitString(props.height),
          maxHeight: getUnitString(props.maxHeight),
          aspectRatio: props.aspectRatio,
          borderRadius: getUnitString(props.rounded),
          cursor: props.showViewer ? 'zoom-in' : 'inherit',
        }}
        onClick={onClick}
      >
        <NTransition name="fade-in" css={props.animated}>
          {realSrc.value ? (
            <img
              v-show={!loading.value && !error.value}
              v-tooltip={{
                disabled: !props.showTooltip || !props.title,
                content: props.title,
              }}
              src={realSrc.value}
              alt={props.alt}
              class={classHelper.e('img')}
              style={{
                objectFit: props.objectFit,
              }}
              onLoad={onLoad}
              onError={onError}
            />
          ) : null}
        </NTransition>
        {loading.value &&
          props.showPlaceholder &&
          (slots.placeholder ? (
            slots.placeholder()
          ) : (
            <div class={classHelper.e('placeholder')}>
              <IconLogo size={autoIconSize.value} />
            </div>
          ))}
        {error.value &&
          props.showError &&
          (slots.error ? (
            slots.error()
          ) : (
            <div class={classHelper.e('placeholder')}>
              <IconPictureError
                size={autoIconSize.value}
                color={['#CED0D6', '#CED0D6', '#CED0D6']}
              />
            </div>
          ))}
        {slots.default && <div class={classHelper.e('content')}>{slots.default()}</div>}
        {slots.hover && <div class={classHelper.e('hover-content')}>{slots.hover()}</div>}
        {props.showActions && props.actionsList && props.actionsList.length > 0 && (
          <div class={[classHelper.e('actions-container'), adjustActionsPosition.value]}>
            {adjustActionsType.value === 'dropdown' ? (
              <div class={classHelper.e('actions-dropdown')}>
                <NDropdown>
                  <div class="ref">
                    <div class={classHelper.e('actions-dropdown-btn')}>
                      <NIcon name="ellipsis" size={16} color="#fff" />
                    </div>
                  </div>
                  <NDropdownMenu>
                    {props.actionsList.map(action => (
                      <NDropdownItem>
                        <div
                          class={classHelper.e('actions-dropdown-item')}
                          onClick={() => action.handler(props.src || '')}
                        >
                          <NIcon name={action.icon} size={14} />
                          <span>{action.title}</span>
                        </div>
                      </NDropdownItem>
                    ))}
                  </NDropdownMenu>
                </NDropdown>
              </div>
            ) : (
              <div class={classHelper.e('actions-icon')}>
                {props.actionsList.map(action => (
                  <NIcon
                    v-tooltip={action.title}
                    name={action.icon}
                    size={16}
                    color="#fff"
                    onClick={() => action.handler(props.src || '')}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {props.showViewer && !nImageList && (
          <NViewer
            v-model={viewerShown.value}
            sources={[
              {
                type: 'image',
                cover: props.viewerSrc || props.src || '',
                thumbnail: props.src,
                title: props.title || props.alt || '',
              },
            ]}
          />
        )}
      </div>
    );
  },
});
