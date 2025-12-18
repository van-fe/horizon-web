import type { CSSProperties } from 'vue';
import { computed, defineComponent } from 'vue';
import type { LoadingProps } from '../composables/useProps';
import { useLoadingProps } from '../composables/useProps';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/shared';
import NTransition from '~/components/Transition/src/Transition';

export default defineComponent({
  name: `${useNamespace()}Loading`,
  components: {
    NTransition,
  },
  props: useLoadingProps,
  setup(props: LoadingProps) {
    const classHelper = new ComponentClassBlock('loading');

    const styles = computed<CSSProperties>(() => {
      return {
        backgroundColor: `${props.bgc}`,
        zIndex: props.zIndex,
      };
    });

    return () => (
      <NTransition name="fade-in">
        <div class={cls(classHelper.block)} style={styles.value}>
          <section
            class={cls(
              {
                [classHelper.e('container-row')]: props.textOrient === 'row',
                [classHelper.e('container-column')]: props.textOrient === 'column',
              },
              [classHelper.e('container')],
            )}
          >
            {props.loadingType === 'circle' ? (
              <div class={`${classHelper.em('container', `animation-circle--${props.size}`)}`}>
                <svg class="circular" viewBox="25 25 50 50">
                  <circle
                    class="path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke-width="4.8"
                  ></circle>
                </svg>
              </div>
            ) : (
              <div class={`${classHelper.em('container', `animation-dots--${props.size}`)}`}>
                <div class="loading-wrap">
                  <div class="dot dot-left"></div>
                  <div class="dot dot-right"></div>
                </div>
              </div>
            )}
            <div
              class={cls({
                [classHelper.em('container-row', `dots-text-row--${props.size}`)]:
                  props.textOrient === 'row' && props.loadingType === 'dots',
                [classHelper.em('container-column', `dots-text-column--${props.size}`)]:
                  props.textOrient === 'column' && props.loadingType === 'dots',
                [classHelper.em('container-row', `circle-text-row--${props.size}`)]:
                  props.textOrient === 'row' && props.loadingType === 'circle',
                [classHelper.em('container-column', `circle-text-column--${props.size}`)]:
                  props.textOrient === 'column' && props.loadingType === 'circle',
              })}
            >
              {props.text}
            </div>
          </section>
        </div>
      </NTransition>
    );
  },
});
