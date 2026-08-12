import type { PropsWithChildren, ReactElement } from 'react';
import { createContext, createElement, useContext, useMemo } from 'react';
import type { PaginationLabels } from '@aurora/core';
import type { ApplicationShowTimeZone, ApplicationSize } from '@aurora/core';
import { APPLICATION_DEFAULTS, PAGINATION_DEFAULT_LABELS } from '@aurora/core';
import type { ApplicationPopupContainerGetter } from '@aurora/horizon-web-core';
import { DEFAULT_NAMESPACE } from '@aurora/theme';

export interface HorizonWebConfig {
  namespace: string;
  locale?: string;
  size: ApplicationSize;
  showTimeZone: ApplicationShowTimeZone;
  getPopupContainer?: ApplicationPopupContainerGetter;
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
  drawerLabels: {
    ok: string;
    cancel: string;
    close: string;
    drawer: string;
  };
  floatButtonLabels: {
    button: string;
    expand: string;
    fold: string;
  };
  backtopLabels: {
    button: string;
  };
}

export type HorizonWebProviderProps = PropsWithChildren<
  Omit<
    Partial<HorizonWebConfig>,
    | 'backtopLabels'
    | 'breadcrumbLabels'
    | 'dialogLabels'
    | 'drawerLabels'
    | 'floatButtonLabels'
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
    drawerLabels?: Partial<HorizonWebConfig['drawerLabels']>;
    floatButtonLabels?: Partial<HorizonWebConfig['floatButtonLabels']>;
    backtopLabels?: Partial<HorizonWebConfig['backtopLabels']>;
  }
>;

const defaultConfig: HorizonWebConfig = Object.freeze({
  namespace: DEFAULT_NAMESPACE,
  size: APPLICATION_DEFAULTS.size,
  showTimeZone: APPLICATION_DEFAULTS.showTimeZone,
  switchLabels: { on: 'On', off: 'Off' },
  selectLabels: { placeholder: 'Please select', empty: 'No options', clear: 'Clear selection' },
  linkLabels: { loading: 'Loading' },
  breadcrumbLabels: { collapsed: 'Show collapsed breadcrumb items' },
  timelineLabels: { toggle: 'Toggle hidden timeline items' },
  stepsLabels: { progress: 'Progress steps' },
  paginationLabels: PAGINATION_DEFAULT_LABELS,
  popconfirmLabels: { confirm: 'Confirm', cancel: 'Cancel' },
  dialogLabels: { ok: 'OK', cancel: 'Cancel', close: 'Close dialog', dialog: 'Dialog' },
  drawerLabels: { ok: 'OK', cancel: 'Cancel', close: 'Close drawer', drawer: 'Drawer' },
  floatButtonLabels: {
    button: 'Floating action',
    expand: 'Expand floating actions',
    fold: 'Collapse floating actions',
  },
  backtopLabels: { button: 'Back to top' },
});

export const HorizonWebContext = createContext<HorizonWebConfig>(defaultConfig);

export function HorizonWebProvider({
  namespace,
  locale,
  size,
  showTimeZone,
  getPopupContainer,
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
  drawerLabels,
  floatButtonLabels,
  backtopLabels,
  children,
}: HorizonWebProviderProps): ReactElement {
  const parent = useContext(HorizonWebContext);
  const value = useMemo(
    () => ({
      ...parent,
      namespace: namespace ?? parent.namespace,
      locale: locale ?? parent.locale,
      size: size ?? parent.size,
      showTimeZone: showTimeZone ?? parent.showTimeZone,
      getPopupContainer: getPopupContainer ?? parent.getPopupContainer,
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
      drawerLabels: {
        ...parent.drawerLabels,
        ...drawerLabels,
      },
      floatButtonLabels: {
        ...parent.floatButtonLabels,
        ...floatButtonLabels,
      },
      backtopLabels: {
        ...parent.backtopLabels,
        ...backtopLabels,
      },
    }),
    [
      namespace,
      locale,
      size,
      showTimeZone,
      getPopupContainer,
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
      drawerLabels,
      floatButtonLabels,
      backtopLabels,
    ],
  );

  return createElement(HorizonWebContext.Provider, { value }, children);
}

export function useHorizonWebConfig(): HorizonWebConfig {
  return useContext(HorizonWebContext);
}
