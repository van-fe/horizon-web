import type { App } from 'vue';
import type { HorizonWebOption } from '~/makeInstaller';
import {
  createHApplicationContext,
  HApplicationContextInjectedKey,
} from '~/components/Application/src/applicationContext';
import {
  GlobalSizeInjectedKey,
  HApplicationShowTimeZoneInjectedKey,
} from '~/components/Application/src/utils/injectedKeys';

const APPLICATION_CONTEXT_PROVIDED_KEY = Symbol('APPLICATION_CONTEXT_PROVIDED_KEY');

export default function applicationProvide(app: App, options?: HorizonWebOption): App {
  if (app[APPLICATION_CONTEXT_PROVIDED_KEY]) return app;

  app[APPLICATION_CONTEXT_PROVIDED_KEY] = true;
  const context = createHApplicationContext({ locale: options?.locale?.current });

  app.provide(HApplicationContextInjectedKey, context);
  app.provide(GlobalSizeInjectedKey, context.size);
  app.provide(HApplicationShowTimeZoneInjectedKey, context.showTimeZone);

  return app;
}

declare module '@vue/runtime-core' {
  interface App {
    [APPLICATION_CONTEXT_PROVIDED_KEY]: boolean;
  }
}
