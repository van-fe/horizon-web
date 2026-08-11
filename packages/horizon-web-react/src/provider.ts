import type { PropsWithChildren, ReactElement } from 'react';
import { createContext, createElement, useContext, useMemo } from 'react';
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
}

export type HorizonWebProviderProps = PropsWithChildren<
  Omit<
    Partial<HorizonWebConfig>,
    'breadcrumbLabels' | 'linkLabels' | 'selectLabels' | 'switchLabels' | 'timelineLabels'
  > & {
    switchLabels?: Partial<HorizonWebConfig['switchLabels']>;
    selectLabels?: Partial<HorizonWebConfig['selectLabels']>;
    linkLabels?: Partial<HorizonWebConfig['linkLabels']>;
    breadcrumbLabels?: Partial<HorizonWebConfig['breadcrumbLabels']>;
    timelineLabels?: Partial<HorizonWebConfig['timelineLabels']>;
  }
>;

const defaultConfig: HorizonWebConfig = Object.freeze({
  namespace: DEFAULT_NAMESPACE,
  switchLabels: { on: 'On', off: 'Off' },
  selectLabels: { placeholder: 'Please select', empty: 'No options', clear: 'Clear selection' },
  linkLabels: { loading: 'Loading' },
  breadcrumbLabels: { collapsed: 'Show collapsed breadcrumb items' },
  timelineLabels: { toggle: 'Toggle hidden timeline items' },
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
    ],
  );

  return createElement(HorizonWebContext.Provider, { value }, children);
}

export function useHorizonWebConfig(): HorizonWebConfig {
  return useContext(HorizonWebContext);
}
