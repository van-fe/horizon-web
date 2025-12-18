import type { LegoSetupContext } from '@nio-fe/shared';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { ComputedRef, InjectionKey, Ref, UnwrapNestedRefs, VNode } from 'vue';
import type { TreeItemProps, TreeProps } from '../composables/useProps';
import type { TreeEmits } from '../composables/useEmits';
import type { TreeSlots } from '../composables/useSlots';
import type { NTreeExtendsData, NTreeData, NTreeHighlightMethod, NTreeUuidType } from './types';
import type Tree from '~/utils/useTree/index';

export const NTreePropsInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'props'),
) as InjectionKey<TreeProps>;

export const NTreeEmitsInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'emits'),
) as InjectionKey<LegoSetupContext<TreeEmits>['emit']>;

export const NTreeSlotsInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'slots'),
) as InjectionKey<LegoSetupContext<{}, TreeSlots>['slots']>;

export const NTreeFilterInputValueInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'filter-input-value'),
) as InjectionKey<ComputedRef<string | undefined>>;

export const NTreeSizeInjectKey = Symbol.for(
  generatorInjectedKeyName('tree', 'size'),
) as InjectionKey<ComputedRef<Exclude<TreeProps['size'], undefined>>>;

export const NTreeExpandedNodesUuidInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'expanded-nodes-uuid'),
) as InjectionKey<UnwrapNestedRefs<Set<string | number>>>;

export const NTreeSwitchNodeExpandStatusInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'switch-node-expand-status'),
) as InjectionKey<(node: NTreeExtendsData, evt: Event, vNode?: VNode) => void>;

export const NTreeSelectedNodesUuidInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'selected-nodes-uuid'),
) as InjectionKey<UnwrapNestedRefs<Set<string | number>>>;

export const NTreeSwitchNodeSelectedStatusInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'selected-node-expand-status'),
) as InjectionKey<(nodeUuid: string | number, check: boolean, evt: Event, vNode?: VNode) => void>;

export const NTreeHelperInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'helper'),
) as InjectionKey<Tree<NTreeData, NTreeExtendsData>>;

export const NTreeHighlightMethodInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'highlight-method'),
) as InjectionKey<ComputedRef<NTreeHighlightMethod | undefined>>;

export const NTreeLoadingNodesInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'loading-nodes'),
) as InjectionKey<Ref<NTreeExtendsData[]>>;

export const NTreeVNodeCollectionInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'v-node-collection'),
) as InjectionKey<(uuid: string | number, vNode?: VNode) => void>;

export const NTreeFullCheckedValuesInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'full-checked-values'),
) as InjectionKey<ComputedRef<Array<string | number>>>;

export const NTreeHalfCheckedValuesInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'half-checked-values'),
) as InjectionKey<ComputedRef<Array<string | number>>>;

export const NTreeOnDragStartInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'on-drag-start'),
) as InjectionKey<
  (domRef: Ref<HTMLElement | null>, node: NTreeExtendsData, evt: MouseEvent) => void
>;

export const NTreeDragFromNodeInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'drag-from-node-uuid'),
) as InjectionKey<Ref<NTreeExtendsData | undefined>>;

export const NTreeIsDraggingInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'is-dragging'),
) as InjectionKey<Ref<boolean>>;

export const NTreeDragToNodeUuidInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'drag-to-node-uuid'),
) as InjectionKey<Ref<NTreeUuidType | undefined>>;

export const NTreeIsCheckComponentVisibleInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'is-check-component-visible'),
) as InjectionKey<Ref<boolean>>;

export const NTreeHighlightRangesInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'highlight-ranges'),
) as InjectionKey<Ref<Map<TreeItemProps['value'], Range>>>;
