import { createContext } from 'react';
import type { TagCommonProps, TagId } from '@aurora/core';

export interface TagGroupContextValue {
  size?: TagCommonProps['size'];
  editable?: boolean;
  disabled?: boolean;
  pending: boolean;
  calculate(): void;
  edit(content: string, oldValue: string, id: TagId | undefined, create: boolean): Promise<boolean>;
  close(id?: TagId): Promise<boolean>;
}

export const TagGroupContext = createContext<TagGroupContextValue | undefined>(undefined);
