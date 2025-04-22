import type { LegoSetupContext } from '@nio-fe/shared';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { ComputedRef, InjectionKey, Ref, VNode } from 'vue';
import type { CascaderProps } from '../composables/useProps';
import type { CascaderEmits } from '../composables/useEmits';
import type { CascaderSlots } from '../composables/useSlots';
import type { NCascaderExtendOption, NCascaderUuidType, NCascaderOption } from './types';
import type Tree from '~/utils/useTree/index';

export const NCascaderModelValueInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'model-value'),
) as InjectionKey<Ref<Set<NCascaderUuidType>>>;

export const NCascaderPresetModelValueInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'preset-model-value'),
) as InjectionKey<Ref<Set<NCascaderUuidType>>>;

export const NCascaderPropsInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'props'),
) as InjectionKey<CascaderProps>;

export const NCascaderEmitsInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'emits'),
) as InjectionKey<LegoSetupContext<CascaderEmits>['emit']>;

export const NCascaderSlotsInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'slots'),
) as InjectionKey<LegoSetupContext<{}, CascaderSlots>['slots']>;

export const NCascaderPopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const NCascaderOptionListInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'option-list'),
) as InjectionKey<Ref<NCascaderExtendOption[]>>;

export const NCascaderOptionListMapInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'option-list-map'),
) as InjectionKey<Ref<Map<NCascaderUuidType, NCascaderExtendOption>>>;

export const NCascaderModifyOptionChildrenListInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'modify-option-children-list'),
) as InjectionKey<(node: NCascaderExtendOption, children: NCascaderOption[]) => void>;

export const NCascaderChosenOptionListInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'chosen-option-list'),
) as InjectionKey<ComputedRef<NCascaderExtendOption[]>>;

export const NCascaderPickOptionInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'picker-option'),
) as InjectionKey<
  (
    value: NCascaderUuidType,
    singleChooseHide?: boolean,
    forcePick?: boolean,
    emitChange?: boolean,
  ) => void
>;

export const NCascaderVisibleOptionsInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'visible-options'),
) as InjectionKey<ComputedRef<NCascaderExtendOption[]>>;

export const NCascaderFocusedOptionInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'focused-option'),
) as InjectionKey<ComputedRef<NCascaderExtendOption | undefined>>;

export const NCascaderFocusedOptionsStackInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'focused-options-stack'),
) as InjectionKey<Ref<NCascaderExtendOption[]>>;

export const NCascaderOnClickNodeInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'on-click-node'),
) as InjectionKey<(option: NCascaderExtendOption, clickOnCheckbox?: boolean) => void>;

export const NCascaderExpandNodeInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'expand-node'),
) as InjectionKey<
  (
    currentNode: NCascaderExtendOption,
    onRadioOrCheckbox: boolean,
    forceExpandChildren: boolean,
  ) => void
>;

export const NCascaderActivatedChildNodeInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'activated-child-node'),
) as InjectionKey<Ref<NCascaderExtendOption | undefined>>;

export const NCascaderLoadingNodesInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'loading-nodes'),
) as InjectionKey<Ref<Set<NCascaderExtendOption>>>;

export const NCascaderInputStringInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'input-string'),
) as InjectionKey<ComputedRef<string>>;

export const NCascaderRegisterVNodeGetterInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'register-v-node-getter'),
) as InjectionKey<(uuid: NCascaderUuidType, getter: () => VNode | undefined) => void>;

export const NCascaderMouseOverOptionInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'mouse-over-option'),
) as InjectionKey<(uuid: NCascaderUuidType) => void>;

export const NCascaderActiveOptionInPanelInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'active-option-in-panel'),
) as InjectionKey<Ref<NCascaderExtendOption | undefined>>;

export const NCascaderTreeHelperInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'tree-instance'),
) as InjectionKey<Tree<NCascaderOption, NCascaderExtendOption>>;

export const NCascaderIsOutOfLimitInjectKey = Symbol(
  generatorInjectedKeyName('cascader', 'is-out-of-limit'),
) as InjectionKey<ComputedRef<boolean>>;
