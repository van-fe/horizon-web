import type { HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ComputedRef, InjectionKey, Ref, VNode } from 'vue';
import type { CascaderProps } from '../composables/useProps';
import type { CascaderEmits } from '../composables/useEmits';
import type { CascaderSlots } from '../composables/useSlots';
import type { HCascaderExtendOption, HCascaderUuidType, HCascaderOption } from './types';
import type Tree from '~/utils/useTree/index';

export const HCascaderModelValueInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'model-value'),
) as InjectionKey<Ref<Set<HCascaderUuidType>>>;

export const HCascaderPresetModelValueInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'preset-model-value'),
) as InjectionKey<Ref<Set<HCascaderUuidType>>>;

export const HCascaderPropsInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'props'),
) as InjectionKey<CascaderProps>;

export const HCascaderEmitsInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'emits'),
) as InjectionKey<HorizonWebSetupContext<CascaderEmits>['emit']>;

export const HCascaderSlotsInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'slots'),
) as InjectionKey<HorizonWebSetupContext<{}, CascaderSlots>['slots']>;

export const HCascaderPopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const HCascaderOptionListInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'option-list'),
) as InjectionKey<Ref<HCascaderExtendOption[]>>;

export const HCascaderOptionListMapInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'option-list-map'),
) as InjectionKey<Ref<Map<HCascaderUuidType, HCascaderExtendOption>>>;

export const HCascaderModifyOptionChildrenListInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'modify-option-children-list'),
) as InjectionKey<(node: HCascaderExtendOption, children: HCascaderOption[]) => void>;

export const HCascaderChosenOptionListInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'chosen-option-list'),
) as InjectionKey<ComputedRef<HCascaderExtendOption[]>>;

export const HCascaderPickOptionInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'picker-option'),
) as InjectionKey<
  (
    value: HCascaderUuidType,
    singleChooseHide?: boolean,
    forcePick?: boolean,
    emitChange?: boolean,
  ) => void
>;

export const HCascaderVisibleOptionsInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'visible-options'),
) as InjectionKey<ComputedRef<HCascaderExtendOption[]>>;

export const HCascaderFocusedOptionInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'focused-option'),
) as InjectionKey<ComputedRef<HCascaderExtendOption | undefined>>;

export const HCascaderFocusedOptionsStackInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'focused-options-stack'),
) as InjectionKey<Ref<HCascaderExtendOption[]>>;

export const HCascaderOnClickNodeInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'on-click-node'),
) as InjectionKey<(option: HCascaderExtendOption, clickOnCheckbox?: boolean) => void>;

export const HCascaderExpandNodeInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'expand-node'),
) as InjectionKey<
  (
    currentNode: HCascaderExtendOption,
    onRadioOrCheckbox: boolean,
    forceExpandChildren: boolean,
  ) => void
>;

export const HCascaderActivatedChildNodeInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'activated-child-node'),
) as InjectionKey<Ref<HCascaderExtendOption | undefined>>;

export const HCascaderLoadingNodesInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'loading-nodes'),
) as InjectionKey<Ref<Set<HCascaderExtendOption>>>;

export const HCascaderInputStringInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'input-string'),
) as InjectionKey<ComputedRef<string>>;

export const HCascaderRegisterVNodeGetterInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'register-v-node-getter'),
) as InjectionKey<(uuid: HCascaderUuidType, getter: () => VNode | undefined) => void>;

export const HCascaderMouseOverOptionInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'mouse-over-option'),
) as InjectionKey<(uuid: HCascaderUuidType) => void>;

export const HCascaderActiveOptionInPanelInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'active-option-in-panel'),
) as InjectionKey<Ref<HCascaderExtendOption | undefined>>;

export const HCascaderTreeHelperInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'tree-instance'),
) as InjectionKey<Tree<HCascaderOption, HCascaderExtendOption>>;

export const HCascaderIsOutOfLimitInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'is-out-of-limit'),
) as InjectionKey<ComputedRef<boolean>>;

export const HCascaderHighlightRangesInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'highlight-ranges'),
) as InjectionKey<Ref<Map<HCascaderUuidType, Range>>>;
