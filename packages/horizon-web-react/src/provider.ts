import type { PropsWithChildren, ReactElement } from 'react';
import { createContext, createElement, useContext, useMemo } from 'react';
import type { PaginationLabels } from '@aurora/core';
import { PAGINATION_DEFAULT_LABELS } from '@aurora/core';
import { DEFAULT_NAMESPACE } from '@aurora/theme';

export interface HorizonWebConfig {
  namespace: string;
  navigate?: (to: unknown, options: { replace: boolean }) => void | Promise<void>;
  resolveHref?: (to: unknown) => string | undefined;
  switchLabels: {
    on: string;
    off: string;
  };
  selectLabels: {
    placeholder: string;
    empty: string;
    clear: string;
  };
  linkLabels: {
    loading: string;
  };
  breadcrumbLabels: {
    collapsed: string;
  };
  timelineLabels: {
    toggle: string;
  };
  stepsLabels: {
    progress: string;
  };
  paginationLabels: PaginationLabels;
  popconfirmLabels: {
    confirm: string;
    cancel: string;
  };
  dialogLabels: {
    ok: string;
    cancel: string;
    close: string;
    dialog: string;
  };
}

export type HorizonWebProviderProps = PropsWithChildren<
  Omit<
    Partial<HorizonWebConfig>,
    | 'breadcrumbLabels'
    | 'dialogLabels'
    | 'linkLabels'
    | 'paginationLabels'
    | 'popconfirmLabels'
    | 'selectLabels'
    | 'stepsLabels'
    | 'switchLabels'
    | 'timelineLabels'
  > & {
    switchLabels?: Partial<HorizonWebConfig['switchLabels']>;
    selectLabels?: Partial<HorizonWebConfig['selectLabels']>;
    linkLabels?: Partial<HorizonWebConfig['linkLabels']>;
    breadcrumbLabels?: Partial<HorizonWebConfig['breadcrumbLabels']>;
    timelineLabels?: Partial<HorizonWebConfig['timelineLabels']>;
    stepsLabels?: Partial<HorizonWebConfig['stepsLabels']>;
    paginationLabels?: Partial<HorizonWebConfig['paginationLabels']>;
    popconfirmLabels?: Partial<HorizonWebConfig['popconfirmLabels']>;
    dialogLabels?: Partial<HorizonWebConfig['dialogLabels']>;
  }
>;

const defaultConfig: HorizonWebConfig = Object.freeze({
  namespace: DEFAULT_NAMESPACE,
  switchLabels: { on: 'On', off: 'Off' },
  selectLabels: { placeholder: 'Please select', empty: 'No options', clear: 'Clear selection' },
  linkLabels: { loading: 'Loading' },
  breadcrumbLabels: { collapsed: 'Show collapsed breadcrumb items' },
  timelineLabels: { toggle: 'Toggle hidden timeline items' },
  stepsLabels: { progress: 'Progress steps' },
  paginationLabels: PAGINATION_DEFAULT_LABELS,
  popconfirmLabels: { confirm: 'Confirm', cancel: 'Cancel' },
  dialogLabels: { ok: 'OK', cancel: 'Cancel', close: 'Close dialog', dialog: 'Dialog' },
});

export const HorizonWebContext = createContext<HorizonWebConfig>(defaultConfig);

export function HorizonWebProvider({
  namespace,
  navigate,
  resolveHref,
  switchLabels,
  selectLabels,
  linkLabels,
  breadcrumbLabels,
  timelineLabels,
  stepsLabels,
  paginationLabels,
  popconfirmLabels,
  dialogLabels,
  children,
}: HorizonWebProviderProps): ReactElement {
  const parent = useContext(HorizonWebContext);
  const value = useMemo(
    () => ({
      ...parent,
      namespace: namespace ?? parent.namespace,
      navigate: navigate ?? parent.navigate,
      resolveHref: resolveHref ?? parent.resolveHref,
      switchLabels: {
        ...parent.switchLabels,
        ...switchLabels,
      },
      selectLabels: {
        ...parent.selectLabels,
        ...selectLabels,
      },
      linkLabels: {
        ...parent.linkLabels,
        ...linkLabels,
      },
      breadcrumbLabels: {
        ...parent.breadcrumbLabels,
        ...breadcrumbLabels,
      },
      timelineLabels: {
        ...parent.timelineLabels,
        ...timelineLabels,
      },
      stepsLabels: {
        ...parent.stepsLabels,
        ...stepsLabels,
      },
      paginationLabels: {
        ...parent.paginationLabels,
        ...paginationLabels,
      },
      popconfirmLabels: {
        ...parent.popconfirmLabels,
        ...popconfirmLabels,
      },
      dialogLabels: {
        ...parent.dialogLabels,
        ...dialogLabels,
      },
    }),
    [
      namespace,
      navigate,
      resolveHref,
      parent,
      breadcrumbLabels,
      linkLabels,
      selectLabels,
      switchLabels,
      timelineLabels,
      stepsLabels,
      paginationLabels,
      popconfirmLabels,
      dialogLabels,
    ],
  );

  return createElement(HorizonWebContext.Provider, { value }, children);
}

export function useHorizonWebConfig(): HorizonWebConfig {
  return useContext(HorizonWebContext);
}
