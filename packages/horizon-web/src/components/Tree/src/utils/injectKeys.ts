import type { HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ComputedRef, InjectionKey, Ref, UnwrapNestedRefs, VNode } from 'vue';
import type { TreeItemProps, TreeProps } from '../composables/useProps';
import type { TreeEmits } from '../composables/useEmits';
import type { TreeSlots } from '../composables/useSlots';
import type { HTreeExtendsData, HTreeData, HTreeHighlightMethod, HTreeUuidType } from './types';
import type Tree from '~/utils/useTree/index';

export const HTreePropsInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'props'),
) as InjectionKey<TreeProps>;

export const HTreeEmitsInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'emits'),
) as InjectionKey<HorizonWebSetupContext<TreeEmits>['emit']>;

export const HTreeSlotsInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'slots'),
) as InjectionKey<HorizonWebSetupContext<{}, TreeSlots>['slots']>;

export const HTreeFilterInputValueInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'filter-input-value'),
) as InjectionKey<ComputedRef<string | undefined>>;

export const HTreeSizeInjectKey = Symbol.for(
  generatorInjectedKeyName('tree', 'size'),
) as InjectionKey<ComputedRef<Exclude<TreeProps['size'], undefined>>>;

export const HTreeExpandedNodesUuidInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'expanded-nodes-uuid'),
) as InjectionKey<UnwrapNestedRefs<Set<string | number>>>;

export const HTreeSwitchNodeExpandStatusInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'switch-node-expand-status'),
) as InjectionKey<(node: HTreeExtendsData, evt: Event, vNode?: VNode) => void>;

export const HTreeSelectedNodesUuidInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'selected-nodes-uuid'),
) as InjectionKey<UnwrapNestedRefs<Set<string | number>>>;

export const HTreeSwitchNodeSelectedStatusInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'selected-node-expand-status'),
) as InjectionKey<(nodeUuid: string | number, check: boolean, evt: Event, vNode?: VNode) => void>;

export const HTreeHelperInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'helper'),
) as InjectionKey<Tree<HTreeData, HTreeExtendsData>>;

export const HTreeHighlightMethodInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'highlight-method'),
) as InjectionKey<ComputedRef<HTreeHighlightMethod | undefined>>;

export const HTreeLoadingNodesInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'loading-nodes'),
) as InjectionKey<Ref<HTreeExtendsData[]>>;

export const HTreeVNodeCollectionInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'v-node-collection'),
) as InjectionKey<(uuid: string | number, vNode?: VNode) => void>;

export const HTreeFullCheckedValuesInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'full-checked-values'),
) as InjectionKey<ComputedRef<Array<string | number>>>;

export const HTreeHalfCheckedValuesInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'half-checked-values'),
) as InjectionKey<ComputedRef<Array<string | number>>>;

export const HTreeOnDragStartInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'on-drag-start'),
) as InjectionKey<
  (domRef: Ref<HTMLElement | null>, node: HTreeExtendsData, evt: MouseEvent) => void
>;

export const HTreeDragFromNodeInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'drag-from-node-uuid'),
) as InjectionKey<Ref<HTreeExtendsData | undefined>>;

export const HTreeIsDraggingInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'is-dragging'),
) as InjectionKey<Ref<boolean>>;

export const HTreeDragToNodeUuidInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'drag-to-node-uuid'),
) as InjectionKey<Ref<HTreeUuidType | undefined>>;

export const HTreeIsCheckComponentVisibleInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'is-check-component-visible'),
) as InjectionKey<Ref<boolean>>;

export const HTreeHighlightRangesInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'highlight-ranges'),
) as InjectionKey<Ref<Map<TreeItemProps['value'], Range>>>;

export const HTreeFocusedNodeUuidInjectKey = Symbol(
  generatorInjectedKeyName('tree', 'focused-node-uuid'),
) as InjectionKey<Ref<HTreeUuidType | undefined>>;
