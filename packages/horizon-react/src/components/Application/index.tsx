import type { ReactElement } from 'react';
import { createElement } from 'react';
import { HorizonWebProvider } from '../../provider';
import type { HorizonWebProviderProps } from '../../provider';

export type ApplicationProps = HorizonWebProviderProps;

/** 为后代组件提供 Horizon Web 应用级配置。 @en Provides Horizon Web application-level configuration to descendant components. */
export function Application(props: ApplicationProps): ReactElement {
  return createElement(HorizonWebProvider, props);
}

export const HApplication = Application;
export type { ApplicationShowTimeZone, ApplicationSize } from '@aurora/core';
