import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, isVNodeEmpty, useNamespace } from '@aurora/utils';
import type { VNode } from 'vue';
import { Fragment, cloneVNode, defineComponent, onBeforeUnmount, ref, useId, watch } from 'vue';
import type { SplitterEmits } from './composables/useEmits';
import { useSplitterEmits } from './composables/useEmits';
import type { SplitterExposes } from './composables/useExposes';
import { useSplitterExposes } from './composables/useExposes';
import { useSplitterProps } from './composables/useProps';
import type { SplitterSlots } from './composables/useSlots';
import { useSplitterSlots } from './composables/useSlots';
import SplitterPanel from './SplitterPanel';

type PanelConfig = { min: number; max: number; collapsible: boolean; size?: number };
type DragState = {
  index: number;
  start: number;
  total: number;
  sizes: number[];
};

const roundSizes = (sizes: number[]) => sizes.map(value => Math.round(value * 10000) / 10000);

export default defineComponent({
  name: `${useNamespace()}Splitter`,
  desc: '通过拖拽或键盘调整相邻内容面板尺寸',
  descLocales: { en: 'Resizes adjacent content panels with pointer or keyboard input.' },
  props: useSplitterProps,
  emits: useSplitterEmits,
  slots: useSplitterSlots,
  exposes: useSplitterExposes,
  setup(
    props,
    { slots, emit, expose }: HorizonWebSetupContext<SplitterEmits, SplitterSlots, SplitterExposes>,
  ) {
    const classHelper = new ComponentClassBlock('splitter');
    const rootRef = ref<HTMLElement>();
    const sizes = ref<number[]>([]);
    const initialSizes = ref<number[]>([]);
    const restoredSizes = new Map<number, number>();
    const rootId = useId();
    let dragState: DragState | undefined;

    const normalize = (values: number[], count: number) => {
      if (count <= 0) return [];
      if (values.length !== count || values.some(value => !Number.isFinite(value) || value < 0)) {
        return Array.from({ length: count }, () => 100 / count);
      }
      const total = values.reduce((sum, value) => sum + value, 0);
      if (total <= 0) return Array.from({ length: count }, () => 100 / count);
      return roundSizes(values.map(value => (value / total) * 100));
    };

    const constrain = (values: number[], configs: PanelConfig[]) => {
      const next = values.map((value, index) =>
        Math.min(configs[index].max, Math.max(configs[index].min, value)),
      );
      let remaining = 100 - next.reduce((sum, value) => sum + value, 0);

      for (let pass = 0; pass < configs.length * 2 && Math.abs(remaining) > 0.0001; pass += 1) {
        const candidates = next
          .map((value, index) => ({ value, index }))
          .filter(({ value, index }) =>
            remaining > 0 ? value < configs[index].max : value > configs[index].min,
          );
        if (!candidates.length) break;
        const share = remaining / candidates.length;
        candidates.forEach(({ index }) => {
          const previous = next[index];
          next[index] = Math.min(
            configs[index].max,
            Math.max(configs[index].min, previous + share),
          );
          remaining -= next[index] - previous;
        });
      }

      return roundSizes(next);
    };

    const flattenPanels = () =>
      (slots.default?.() ?? [])
        .filter(node => !isVNodeEmpty([node]))
        .flatMap(node =>
          node.type === Fragment
            ? ((node.children as VNode[]) ?? []).filter(child => !isVNodeEmpty([child]))
            : [node],
        )
        .filter(node => node.type === SplitterPanel);

    const getConfigs = (panels: VNode[]): PanelConfig[] =>
      panels.map(panel => ({
        size: typeof panel.props?.size === 'number' ? panel.props.size : undefined,
        min: typeof panel.props?.min === 'number' ? panel.props.min : 0,
        max: Math.max(
          typeof panel.props?.min === 'number' ? panel.props.min : 0,
          typeof panel.props?.max === 'number' ? panel.props.max : 100,
        ),
        collapsible: panel.props?.collapsible === '' || panel.props?.collapsible === true,
      }));

    const getInitial = (configs: PanelConfig[]) => {
      if (props.modelValue) return constrain(normalize(props.modelValue, configs.length), configs);
      const specified = configs.reduce((sum, config) => sum + (config.size ?? 0), 0);
      const unspecified = configs.filter(config => config.size === undefined).length;
      const remainder = Math.max(0, 100 - specified);
      const fallback = unspecified ? remainder / unspecified : 0;
      return constrain(
        normalize(
          configs.map(config => config.size ?? fallback),
          configs.length,
        ),
        configs,
      );
    };

    const ensureSizes = (configs: PanelConfig[]) => {
      if (sizes.value.length === configs.length) return;
      sizes.value = getInitial(configs);
      initialSizes.value = [...sizes.value];
    };

    watch(
      () => props.modelValue,
      value => {
        if (!value || !sizes.value.length) return;
        const configs = getConfigs(flattenPanels());
        sizes.value = constrain(normalize(value, sizes.value.length), configs);
      },
      { deep: true },
    );

    const publish = (next: number[]) => {
      sizes.value = roundSizes(next);
      emit('update:modelValue', [...sizes.value]);
      emit('resize', [...sizes.value]);
    };

    const resizePair = (index: number, delta: number, configs: PanelConfig[]) => {
      if (props.disabled || index < 0 || index >= sizes.value.length - 1) return;
      const next = [...sizes.value];
      const pairTotal = next[index] + next[index + 1];
      const leftMin = Math.min(configs[index].min, pairTotal);
      const leftMax = Math.min(configs[index].max, pairTotal - configs[index + 1].min);
      const rightMaxBound = pairTotal - configs[index + 1].max;
      const lower = Math.max(leftMin, rightMaxBound);
      const upper = Math.max(lower, leftMax);
      next[index] = Math.min(upper, Math.max(lower, next[index] + delta));
      next[index + 1] = pairTotal - next[index];
      publish(next);
    };

    const pointerCoordinate = (event: PointerEvent) =>
      props.direction === 'horizontal' ? event.clientX : event.clientY;

    const onPointerMove = (event: PointerEvent) => {
      if (!dragState) return;
      const deltaPixels = pointerCoordinate(event) - dragState.start;
      const delta = (deltaPixels / dragState.total) * 100;
      sizes.value = [...dragState.sizes];
      const configs = getConfigs(flattenPanels());
      resizePair(dragState.index, delta, configs);
    };

    const endPointerResize = () => {
      if (!dragState) return;
      dragState = undefined;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endPointerResize);
      window.removeEventListener('pointercancel', endPointerResize);
      emit('resizeEnd', [...sizes.value]);
    };

    const startPointerResize = (event: PointerEvent, index: number) => {
      if (props.disabled || event.button !== 0) return;
      const rect = rootRef.value?.getBoundingClientRect();
      const total = props.direction === 'horizontal' ? rect?.width : rect?.height;
      if (!total) return;
      event.preventDefault();
      dragState = { index, start: pointerCoordinate(event), total, sizes: [...sizes.value] };
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', endPointerResize);
      window.addEventListener('pointercancel', endPointerResize);
      emit('resizeStart', index);
    };

    const collapse = (handleIndex: number, configs: PanelConfig[]) => {
      if (props.disabled) return;
      const panelIndex = configs[handleIndex].collapsible
        ? handleIndex
        : configs[handleIndex + 1]?.collapsible
          ? handleIndex + 1
          : -1;
      if (panelIndex < 0) return;
      const neighborIndex = panelIndex === handleIndex ? panelIndex + 1 : panelIndex - 1;
      const next = [...sizes.value];
      const isCollapsed = next[panelIndex] === 0;
      if (isCollapsed) {
        const restored = Math.min(
          restoredSizes.get(panelIndex) ?? initialSizes.value[panelIndex] ?? 20,
          next[neighborIndex] - configs[neighborIndex].min,
        );
        next[panelIndex] = Math.max(configs[panelIndex].min, restored);
        next[neighborIndex] -= next[panelIndex];
      } else {
        restoredSizes.set(panelIndex, next[panelIndex]);
        next[neighborIndex] += next[panelIndex];
        next[panelIndex] = 0;
      }
      publish(next);
      emit('collapse', panelIndex, !isCollapsed);
    };

    const resizeTo = (index: number, size: number) => {
      const panels = flattenPanels();
      const configs = getConfigs(panels);
      ensureSizes(configs);
      if (index < 0 || index >= sizes.value.length || !Number.isFinite(size)) return;
      if (index === sizes.value.length - 1) {
        resizePair(index - 1, sizes.value[index] - size, configs);
      } else {
        resizePair(index, size - sizes.value[index], configs);
      }
    };

    const reset = () => publish([...initialSizes.value]);

    expose({ resizeTo, reset });
    onBeforeUnmount(endPointerResize);

    return () => {
      const panels = flattenPanels();
      const configs = getConfigs(panels);
      ensureSizes(configs);

      const children: VNode[] = [];
      panels.forEach((panel, index) => {
        const panelId = `${rootId}-panel-${index}`;
        children.push(
          cloneVNode(panel, {
            id: panelId,
            key: panel.key ?? `panel-${index}`,
            style: {
              flex: `0 0 ${sizes.value[index]}%`,
              minWidth: 0,
              minHeight: 0,
            },
            'aria-hidden': sizes.value[index] === 0 ? 'true' : undefined,
          }),
        );

        if (index >= panels.length - 1) return;
        const horizontal = props.direction === 'horizontal';
        const decreaseKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
        const increaseKey = horizontal ? 'ArrowRight' : 'ArrowDown';
        children.push(
          <div
            key={`separator-${index}`}
            class={classHelper.e('separator')}
            role="separator"
            tabindex={props.disabled ? -1 : 0}
            aria-orientation={props.direction}
            aria-controls={`${panelId} ${rootId}-panel-${index + 1}`}
            aria-valuemin={configs[index].min}
            aria-valuemax={configs[index].max}
            aria-valuenow={Math.round(sizes.value[index] * 100) / 100}
            aria-disabled={props.disabled ? 'true' : undefined}
            onPointerdown={(event: PointerEvent) => startPointerResize(event, index)}
            onDblclick={() => collapse(index, configs)}
            onKeydown={(event: KeyboardEvent) => {
              if (event.key === decreaseKey || event.key === increaseKey) {
                event.preventDefault();
                resizePair(
                  index,
                  (event.key === increaseKey ? 1 : -1) *
                    props.keyboardStep *
                    (event.shiftKey ? 5 : 1),
                  configs,
                );
              }
              if (event.key === 'Enter') collapse(index, configs);
              if (event.key === 'Home') {
                event.preventDefault();
                resizePair(index, configs[index].min - sizes.value[index], configs);
              }
              if (event.key === 'End') {
                event.preventDefault();
                resizePair(index, configs[index].max - sizes.value[index], configs);
              }
            }}
          >
            <span class={classHelper.e('handle')} aria-hidden="true" />
          </div>,
        );
      });

      return (
        <div
          ref={rootRef}
          class={[
            classHelper.block,
            classHelper.m(props.direction),
            classHelper.is('disabled', props.disabled),
          ]}
        >
          {children}
        </div>
      );
    };
  },
});
