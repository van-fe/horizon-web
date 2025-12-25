import { computed, defineComponent, h, inject } from 'vue';
import type { NColumnResponsiveSetting } from './composables/useProps';
import { useColProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, isDefined, isNumber, useNamespace } from '@aurora/utils';

import { ROW_KEY } from './Row';
import type { ColumnSlots } from './composables/useSlots';
import { useColumnSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Col`,
  props: useColProps,
  slots: useColumnSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, ColumnSlots>) {
    const classHelper = new ComponentClassBlock('col');
    const { hspace } = inject(ROW_KEY, {
      hspace: computed(() => undefined),
      vspace: computed(() => undefined),
    });

    const style = computed(() => {
      if (hspace.value !== undefined) {
        return {
          paddingLeft: `${hspace.value / 2}px`,
          paddingRight: `${hspace.value / 2}px`,
        };
      }
      return {};
    });

    const responsiveClasses = computed(() => {
      function method(size: string, propValue: number | NColumnResponsiveSetting | undefined) {
        if (isDefined(propValue)) {
          if (isNumber(propValue)) {
            return classHelper.m(`${size}-${propValue}`);
          } else {
            const res: string[] = [];

            if (isDefined(propValue.span)) {
              res.push(classHelper.m(`${size}-${propValue.span}`));
            }

            if (isDefined(propValue.offset)) {
              res.push(classHelper.m(`offset-${size}-${propValue.offset}`));
            }

            if (isDefined(propValue.push)) {
              res.push(classHelper.m(`push-${size}-${propValue.push}`));
            }

            if (isDefined(propValue.pull)) {
              res.push(classHelper.m(`pull-${size}-${propValue.pull}`));
            }

            return res;
          }
        } else {
          return undefined;
        }
      }

      return [
        method('xs', props.xs),
        method('sm', props.sm),
        method('md', props.md),
        method('lg', props.lg),
        method('xl', props.xl),
        method('xxl', props.xxl),
      ].filter(curr => !!curr);
    });

    return () =>
      h(
        props.tag,
        {
          class: cls(
            classHelper.block,
            classHelper.m(`span-${props.span}`, !!props.span),
            classHelper.m(`offset-${props.offset}`, !!props.offset),
            classHelper.m(`push-${props.push}`, !!props.push),
            classHelper.m(`pull-${props.pull}`, !!props.pull),
            ...responsiveClasses.value,
          ),
          style: style.value,
        },
        slots?.default?.(),
      );
  },
});
