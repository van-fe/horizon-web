import type { ComponentOptions, VNode } from 'vue';
import { defineComponent, ref, provide } from 'vue';
import { useImageListProps } from './composables/useProps';
import NViewer from '~/components/Viewer/src/Viewer';
import type { NViewerSource } from '~/components/Viewer/src/composables/useProps';
import type { LegoSetupContext } from '@aurora/shared';
import {
  ComponentClassBlock,
  slotVNodes,
  flattenVNodes,
  getUnitString,
  useNamespace,
} from '@aurora/shared';
import type { ImageListSlots } from './composables/useSlots';
import { useImageListSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}ImageList`,
  components: {
    NViewer,
  },
  props: useImageListProps,
  slots: useImageListSlots,
  setup(props, { slots }: LegoSetupContext<{}, ImageListSlots>) {
    const classHelper = new ComponentClassBlock('image-list');
    provide('nImageList', {});

    let images: VNode[] = [];
    let overflowNum = 0;
    const viewerShown = ref(false);
    let viewerSources: NViewerSource[] = [];
    const getImages = () => {
      const vnodes = slotVNodes(slots.default);
      const allImgs = flattenVNodes(vnodes).filter(
        t => (t.type as ComponentOptions).name === 'NImage',
      );
      viewerSources = allImgs.map(({ props }) => {
        return {
          type: 'image',
          cover: props?.viewerSrc || props?.src || '',
          thumbnail: props?.src,
          title: props?.title || props?.alt || '',
        };
      });
      overflowNum = allImgs.length <= props.limit ? 0 : allImgs.length - props.limit;
      images = allImgs.length <= props.limit ? allImgs : allImgs.slice(0, props.limit);
    };
    const viewerIndex = ref(0);
    const onClick = (imgProps: any) => {
      if (!imgProps.showViewer && !imgProps['show-viewer']) {
        return;
      }
      const idx = viewerSources.findIndex(t => t.thumbnail === imgProps.src);
      if (idx >= 0) {
        viewerIndex.value = idx;
      } else {
        viewerIndex.value = 0;
      }
      viewerShown.value = true;
    };

    return () => {
      getImages();
      return (
        images.length > 0 && (
          <div class={classHelper.block}>
            <ul class={classHelper.e('items')}>
              {images.map((img, index) => (
                <li
                  class={classHelper.e('item')}
                  style={{
                    marginRight: index === images.length - 1 ? 0 : getUnitString(props.margin),
                  }}
                  onClick={() => onClick(img.props)}
                >
                  {img}
                  {overflowNum && index === images.length - 1 ? (
                    <div
                      class={classHelper.e('overflow')}
                      style={{
                        borderRadius: getUnitString(img.props?.rounded),
                        fontSize: getUnitString(props.limitTextSize),
                      }}
                    >
                      {slots.limit ? slots.limit() : `+${overflowNum}`}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
            {viewerSources.length > 0 && (
              <NViewer
                v-model={viewerShown.value}
                sources={viewerSources}
                initIndex={viewerIndex.value}
              />
            )}
          </div>
        )
      );
    };
  },
});
