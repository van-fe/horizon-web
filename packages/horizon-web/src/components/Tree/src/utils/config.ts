import type { TreeProps } from '../composables/useProps';
import type { HTreeExtendsData, HTreeData } from './types';
import { isNumber, isString } from '@aurora/utils';
import type Tree from '~/utils/useTree/index';

export const sizeMapping: Record<Exclude<TreeProps['size'], undefined>, number> = {
  small: 24,
  medium: 32,
  large: 40,
  huge: 48,
};

export const iconSizeMapping: Record<Exclude<TreeProps['size'], undefined>, number> = {
  small: 16,
  medium: 16,
  large: 16,
  huge: 20,
};

export const transformUuid = (
  option: HTreeExtendsData,
  instance: Tree<HTreeData, HTreeExtendsData>,
) => {
  return instance.getOptionValue(option, 'value');
};

export const isTreeModelValue = (value: unknown) => isString(value) || isNumber(value);
