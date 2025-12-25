import { defineComponent, inject, ref, withKeys } from 'vue';
import { cls, ComponentClassBlock, isNumber, useNamespace } from '@aurora/utils';
import { defaultLocale, localeInjectKey } from '~/provides';
import { HPaginationPropsInjectKey } from '../utils/injectKeys';
import HPopover from '~/components/Popover/src/Popover';
import HPopContent from '~/components/Popover/src/PopContent';
import { IconArrowDown } from '@aurora/icon';

export default defineComponent({
  name: `${useNamespace()}PaginationSizes`,
  props: {
    pageSize: {
      type: Number,
    },
  },
  emits: {
    'update:pageSize': (pageSize: number) => isNumber(pageSize),
  },
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('pagination');
    const locale = inject(localeInjectKey, defaultLocale);
    const parentProps = inject(HPaginationPropsInjectKey)!;

    const popoverRef = ref<typeof HPopover | null>(null);
    const popoverVisible = ref(false);

    function onSwitchSizeItem(amount: number) {
      emit('update:pageSize', amount);
      popoverRef.value?.switchVisible(false);
    }

    return () => (
      <HPopover
        ref={popoverRef}
        arrow={false}
        distance={4}
        placement="bottom"
        trigger="click-remain"
        toBody={parentProps.pageSizesToBody}
        disabled={parentProps.disabled}
        onShow={() => (popoverVisible.value = true)}
        onHide={() => (popoverVisible.value = false)}
      >
        {{
          reference: () => (
            <div
              class={cls(
                classHelper.e('sizes'),
                classHelper.is('active', popoverVisible.value),
                classHelper.is('disabled', parentProps.disabled),
              )}
              tabindex={0}
              onKeyup={withKeys(() => popoverRef.value?.switchVisible(true), ['enter'])}
            >
              {props.pageSize}
              {parentProps.label?.sizeText ??
                parentProps.label?.size_text ??
                locale.value?.langService.td().horizonWeb.pagination.pageSize}
              <IconArrowDown size={10} rotate={popoverVisible.value ? 180 : 0} />
            </div>
          ),
          popper: () => (
            <HPopContent class={classHelper.e('sizes-popper')}>
              {parentProps.pageSizes.map(size => (
                <div
                  class={cls(
                    classHelper.e('sizes-item'),
                    classHelper.is('active', props.pageSize === size),
                  )}
                  onClick={() => onSwitchSizeItem(size)}
                >
                  {size}
                  {parentProps.label?.sizeItemText ??
                    parentProps.label?.size_item_text ??
                    locale.value?.langService.td().horizonWeb.pagination.pageSize}
                </div>
              ))}
            </HPopContent>
          ),
        }}
      </HPopover>
    );
  },
});
