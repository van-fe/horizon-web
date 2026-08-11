import type { ComponentEventArguments, ComponentRegionContext } from '@aurora/core';
import type { ReactNode } from 'react';

export type ReactEventHandler<Events extends object, Name extends keyof Events> = (
  ...args: ComponentEventArguments<Events, Name>
) => void;

export type ReactRegionContent<Regions extends object, Name extends keyof Regions> = [
  keyof ComponentRegionContext<Regions, Name>,
] extends [never]
  ? ReactNode
  : ReactNode | ((context: ComponentRegionContext<Regions, Name>) => ReactNode);
