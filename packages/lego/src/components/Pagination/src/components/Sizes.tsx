import { defineComponent, inject, ref, withKeys } from 'vue';
import { cls, ComponentClassBlock, isNumber, useNamespace } from '@nio-fe/shared';
import { defaultLocale, localeInjectKey } from '~/provides';
import { NPaginationPropsInjectKey } from '../utils/injectKeys';
import NPopover from '~/components/Popover/src/Popover';
import NPopContent from '~/components/Popover/src/PopContent';
import { IconArrowDown } from '@nio-fe/icon';

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
    const parentProps = inject(NPaginationPropsInjectKey)!;

    const popoverRef = ref<typeof NPopover | null>(null);
    const popoverVisible = ref(false);

    function onSwitchSizeItem(amount: number) {
      emit('update:pageSize', amount);
      popoverRef.value?.switchVisible(false);
    }

    return () => (
      <NPopover
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
                locale.value?.langService.td().lego.pagination.pageSize}
              <IconArrowDown size={10} rotate={popoverVisible.value ? 180 : 0} />
            </div>
          ),
          popper: () => (
            <NPopContent class={classHelper.e('sizes-popper')}>
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
                    locale.value?.langService.td().lego.pagination.pageSize}
                </div>
              ))}
            </NPopContent>
          ),
        }}
      </NPopover>
    );
  },
});
