import type { PropsWithChildren, ReactElement } from 'react';
import { createContext, createElement, useContext, useMemo } from 'react';
import { DEFAULT_NAMESPACE } from '@aurora/theme';

export interface HorizonWebConfig {
  namespace: string;
  navigate?: (to: unknown, options: { replace: boolean }) => void | Promise<void>;
  switchLabels: {
    on: string;
    off: string;
  };
}

export type HorizonWebProviderProps = PropsWithChildren<
  Omit<Partial<HorizonWebConfig>, 'switchLabels'> & {
    switchLabels?: Partial<HorizonWebConfig['switchLabels']>;
  }
>;

const defaultConfig: HorizonWebConfig = Object.freeze({
  namespace: DEFAULT_NAMESPACE,
  switchLabels: { on: 'On', off: 'Off' },
});

export const HorizonWebContext = createContext<HorizonWebConfig>(defaultConfig);

export function HorizonWebProvider({
  namespace,
  navigate,
  switchLabels,
  children,
}: HorizonWebProviderProps): ReactElement {
  const parent = useContext(HorizonWebContext);
  const value = useMemo(
    () => ({
      ...parent,
      namespace: namespace ?? parent.namespace,
      navigate: navigate ?? parent.navigate,
      switchLabels: {
        ...parent.switchLabels,
        ...switchLabels,
      },
    }),
    [namespace, navigate, parent, switchLabels],
  );

  return createElement(HorizonWebContext.Provider, { value }, children);
}

export function useHorizonWebConfig(): HorizonWebConfig {
  return useContext(HorizonWebContext);
}
