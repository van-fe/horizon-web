# Microfrontend Architecture Contract

This page defines the target contract that Horizon Web must satisfy before microfrontend support is considered complete. It guides implementation and acceptance; a capability is not supported by the current release until its implementation is marked complete in release documentation.

## Initial support boundary

The first release targets standard DOM integration:

- Multiple independent Vue 3 applications can be mounted on the same page.
- The host and micro-apps share one Vue and Horizon Web runtime.
- Each Vue App owns independent locale, size, theme, popup container, z-index scope, and imperative service instances.
- Updating or unmounting one micro-app does not change another app's configuration, close its overlays, or release its scroll locks.
- A micro-app can repeatedly mount, update, and unmount without leaving DOM nodes, events, observers, dynamic styles, or module state behind.
- Existing `app.use(HorizonWeb, options)` usage remains compatible. When no scope is created explicitly, the installer creates a default scope for that Vue App.

The first release does not promise:

- Different Horizon Web major versions on the same page.
- A separately bundled Vue runtime in every micro-app.
- Multiple Horizon Web copies without isolated namespaces, styles, and popup roots.
- Shadow DOM, cross-iframe overlays, or SSR. Each enters the support boundary only after its dedicated roadmap item passes.

The component library does not depend on proprietary Module Federation, qiankun, or wujie lifecycle APIs. Framework adapters only map their lifecycles to the Horizon App lifecycle defined here.

## Shared singletons and version policy

The standard integration must share these packages as singletons from the host:

| Package | Why it is shared | Version rule |
| --- | --- | --- |
| `vue` | Components, injection keys, app contexts, and reactive values must use one runtime | Every participant resolves the same concrete version within Horizon Web's peer range |
| `@aurora/horizon-web` | Prevent duplicate imperative services and module coordinators | Host and all micro-apps use exactly the same version |
| `@aurora/utils` | Popup, z-index, and namespace foundations live here | Exactly the same version as Horizon Web |
| `@aurora/theme` | Class names, CSS variables, and theme contracts live here | Exactly the same version as Horizon Web |
| `@aurora/locale-vue` | Vue locale services and injection keys must be identical | Exactly the same version as Horizon Web |
| `@aurora/horizon-web-core` | Scroll locking and browser primitives require one coordinator | Exactly the same version as Horizon Web |

Shared-module configuration must enable singleton and strict version checks. A mismatch must fail during loading with an actionable error instead of silently creating a second runtime.

Applications may bundle ordinary utilities that have no cross-app state. Any new module-level coordinator added to the library must declare whether it is page-shared or isolated per App.

## Framework integration configuration

### Reusable Module Federation share map

The host and every remote must import the share map from one file. The versions below match the current `1.0.0` workspace. A release upgrade must update them and CI must compare the actual versions resolved by the host, every remote, and their lockfiles:

```ts
export const horizonShared = {
  vue: { singleton: true, requiredVersion: '3.5.26' },
  '@aurora/horizon-web': { singleton: true, requiredVersion: '1.0.0' },
  '@aurora/utils': { singleton: true, requiredVersion: '1.0.0' },
  '@aurora/theme': { singleton: true, requiredVersion: '1.0.0' },
  '@aurora/locale-vue': { singleton: true, requiredVersion: '1.0.0' },
  '@aurora/horizon-web-core': { singleton: true, requiredVersion: '1.0.0' },
} as const;

export const horizonRemoteShared = Object.fromEntries(
  Object.entries(horizonShared).map(([name, options]) => [
    name,
    { ...options, import: false },
  ]),
);
```

The host uses `horizonShared`; remotes use `horizonRemoteShared`. `import: false` prevents a remote from silently bundling its own fallback, so the host must provide every module first. Module Federation Enhanced can warn and choose another version when `requiredVersion` is incompatible, so that option does not replace the strict version gate required by this contract. Before publishing artifacts, the deployment pipeline must compare the actual resolved versions of all six packages and fail on any mismatch. Integration tests must also cover a missing provider and an incompatible version.

### qiankun

qiankun manages containers and lifecycles; it does not create a dependency share scope. In the standard shared-runtime profile, the host and micro-app still use the Module Federation share map above at the build layer. A qiankun UMD lifecycle configuration without a sharing layer does not satisfy the initial support boundary.

```ts
// qiankun-entry.ts
import { mountHorizonApp, updateHorizonApp, unmountHorizonApp } from './horizon-adapter';

export async function bootstrap() {}

export async function mount(props: MicroAppProps) {
  await mountHorizonApp({
    ...props.horizon,
    container: props.container.querySelector('[data-micro-root]'),
    popupRoot: props.container.querySelector('[data-horizon-popup-root]'),
  });
}

export async function update(props: MicroAppProps) {
  await updateHorizonApp(props.horizon);
}

export async function unmount() {
  await unmountHorizonApp();
}
```

The host-provided `container` must include both the application root and a dedicated popup root. Following this page's lifecycle contract, `unmountHorizonApp` disposes the Horizon runtime before unmounting the Vue App.

### wujie

wujie executes child application code in a separate iframe context, so the child and parent cannot participate in one Module Federation share scope. This is an isolated-runtime profile: host and child can pin identical versions, but the configuration must not be advertised as shared-singleton support. Cross-iframe overlays are also outside the initial boundary.

```ts
// host
await startApp({
  name: 'orders',
  url: '/micro/orders/',
  el: '#orders-container',
  alive: false,
  props: {
    horizon: { id: 'orders', locale: 'en-US', zIndexBase: 3000 },
  },
});

// child entry
window.__WUJIE_MOUNT = () => {
  const options = window.$wujie?.props?.horizon;
  return mountHorizonApp({
    ...options,
    container: document.querySelector('[data-micro-root]'),
    popupRoot: document.querySelector('[data-horizon-popup-root]'),
  });
};

window.__WUJIE_UNMOUNT = () => unmountHorizonApp();
```

With `alive: false`, every exit runs unmount and resource cleanup. If an application enables keep-alive mode, `deactivated` only pauses business interaction and is not final disposal. Call Horizon `dispose()` only when the application is actually destroyed.

Official references: [Module Federation `shared`](https://module-federation.io/configure/shared), [qiankun getting started](https://qiankun.umijs.org/guide/getting-started), [wujie `startApp`](https://wujie-micro.github.io/doc/api/startApp.html), and [wujie lifecycles](https://wujie-micro.github.io/doc/guide/lifecycle.html).

## Horizon App context

The target API uses an App-level runtime to own mutable configuration and resources. Final names may be adjusted to repository conventions during implementation, but the capability boundary must remain intact:

```ts
type HorizonRoot = HTMLElement | ShadowRoot;

interface HorizonZIndexOptions {
  base?: number;
  mode?: 'page' | 'scope';
}

interface HorizonPopupOptions {
  getContainer?: (trigger?: HTMLElement) => HTMLElement | ShadowRoot;
  zIndex?: HorizonZIndexOptions;
}

interface HorizonAppOptions {
  id: string;
  root: HorizonRoot | (() => HorizonRoot);
  locale?: LocalOptionType;
  size?: 'large' | 'medium' | 'small';
  namespace?: string;
  theme?: {
    mode?: 'light' | 'dark';
    tokens?: Partial<ThemeType>;
  };
  popup?: HorizonPopupOptions;
}

interface HorizonAppServices {
  message: HorizonMessageService;
  notification: HorizonNotificationService;
  loadingBar: HorizonLoadingBarService;
  alert: HorizonAlertService;
  confirm: HorizonConfirmService;
}

interface HorizonAppRuntime {
  readonly id: string;
  readonly services: HorizonAppServices;
  install(app: App): void;
  update(options: Partial<HorizonAppOptions>): void;
  dispose(): void | Promise<void>;
}

declare function createHorizonApp(options: HorizonAppOptions): HorizonAppRuntime;
```

The context follows these rules:

- One runtime installs into one Vue App. Repeated installation is idempotent or produces an explicit error.
- `id` is unique on the page and identifies diagnostics, dynamic styles, and resource ownership. It is not used as a visible component DOM ID.
- `root` exists before installation, remains valid during the runtime, and determines the default owner document and resource scope.
- `namespace` is installation-time configuration and must match the compiled CSS namespace. It cannot change after installation.
- Locale, size, theme, and popup container can be changed through `update`, affecting only that runtime.
- Service instances belong to the runtime. `closeAll` processes only instances created by that runtime.
- `dispose` is idempotent and removes the runtime's overlays, listeners, observers, dynamic styles, caches, and scroll locks.
- Components read the nearest App or component-tree provider. A global ref is not a valid fallback for multiple Apps.

## Lifecycle mapping

A microfrontend adapter keeps its Vue App and Horizon runtime references:

```ts
let app: App<Element> | undefined;
let horizon: HorizonAppRuntime | undefined;

export function mount(props: MicroAppProps) {
  horizon = createHorizonApp({
    id: props.name,
    root: props.container,
    locale: props.locale,
    popup: {
      getContainer: () => props.popupRoot,
      zIndex: { base: props.zIndexBase, mode: 'scope' },
    },
  });

  app = createApp(Root);
  app.use(horizon);
  app.mount(props.container);
}

export function update(props: Partial<MicroAppProps>) {
  horizon?.update({
    locale: props.locale,
    popup: props.popupRoot
      ? { getContainer: () => props.popupRoot! }
      : undefined,
  });
}

export async function unmount() {
  await horizon?.dispose();
  app?.unmount();
  horizon = undefined;
  app = undefined;
}
```

The implementation also registers idempotent fallback cleanup through `app.onUnmount`. Calling only `app.unmount()` therefore cannot leak Horizon resources. Explicitly calling `dispose()` first remains recommended for microfrontend adapters because it closes imperative overlays before the host removes their containers.

### Mount

1. The host creates stable application and popup roots.
2. The micro-app creates its Horizon runtime.
3. It creates the Vue App and installs the runtime.
4. It mounts the Vue App last.

Calling imperative services before installation must fail with an actionable message.

### Update

`update` changes only configuration declared as mutable. A change to an installation-time constraint, including namespace, runtime id, or root ownership, requires a complete unmount and mount instead of an in-place update.

### Unmount

1. Stop starting new application async work.
2. Call `dispose()` to close and release imperative resources.
3. Call the Vue App's `unmount()` to run component cleanup.
4. Let the host remove application and popup roots last.

Unloading one runtime must not reset page-level coordinators or delete DOM and styles owned by another runtime.

## Acceptance invariants

The final two-app browser suite must prove that:

- Changing locale or theme in App A does not change App B.
- Messages, notifications, and dialogs from App A mount only in App A's popup root.
- App A's `closeAll`, `dispose`, and unmount do not affect App B.
- When both apps hold modal scroll locks, closing either app preserves the correct page lock.
- Repeated App A mount and unmount leaves no nodes, listeners, dynamic styles, or unreleased locks.
- An incompatible shared dependency version fails the integration build explicitly.
