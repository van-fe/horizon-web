# 微前端架构契约

本文定义 Horizon Web 支持微前端时必须遵守的目标契约。契约用于指导后续实现和验收；尚未在发布说明中标记完成的能力，不应视为当前版本已经支持。

## 首期支持边界

首期支持标准 DOM 集成模式：

- 同一个页面可同时挂载多个独立的 Vue 3 应用；
- 基座与微应用共享同一份 Vue 和 Horizon Web 运行时；
- 每个 Vue App 拥有独立的 locale、size、theme、popup container、z-index scope 和命令式服务实例；
- 一个微应用更新或卸载时，不改变其他微应用的配置，不关闭其他应用的弹层，也不释放其他应用持有的滚动锁；
- 同一个微应用可以重复 mount、update、unmount，且不会遗留 DOM、事件、Observer、动态样式或模块级状态；
- 保持现有 `app.use(HorizonWeb, options)` 用法兼容。未显式创建 scope 时，安装器为当前 Vue App 创建默认 scope。

首期不承诺以下模式：

- 同页混用不同 Horizon Web 主版本；
- 每个微应用各自打包一份 Vue；
- 在未配置独立 namespace、样式和 popup root 时混用多份 Horizon Web；
- Shadow DOM、跨 iframe 弹层以及服务端渲染。它们需要单独通过对应清单项后才进入支持范围。

组件库不依赖 Module Federation、qiankun 或 wujie 的专有生命周期。各框架的适配层只负责把框架生命周期映射到本文定义的 Horizon App 生命周期。

## 共享单例与版本策略

标准模式下，以下包必须由基座共享为单例：

| 包 | 共享原因 | 版本规则 |
| --- | --- | --- |
| `vue` | 保证组件、InjectionKey、AppContext 和响应式对象来自同一运行时 | 所有参与方解析到同一个具体版本，并满足 Horizon Web 声明的 peer range |
| `@aurora/horizon-web` | 避免重复注册命令式服务和模块级协调器 | 基座与所有微应用使用完全相同版本 |
| `@aurora/utils` | popup、z-index、namespace 等基础能力位于该包 | 与 Horizon Web 使用完全相同版本 |
| `@aurora/theme` | 类名、CSS 变量和主题契约位于该包 | 与 Horizon Web 使用完全相同版本 |
| `@aurora/locale-vue` | Vue locale 服务和 InjectionKey 必须一致 | 与 Horizon Web 使用完全相同版本 |
| `@aurora/horizon-web-core` | 滚动锁和浏览器基础能力需要统一协调 | 与 Horizon Web 使用完全相同版本 |

共享配置应启用 singleton 和严格版本检查。版本不匹配时必须在加载阶段失败并给出明确错误，不允许静默回退为第二份运行时。

业务可以单独打包不含跨应用状态的普通工具依赖。任何新出现的模块级协调器在加入组件库时，都必须明确它属于页面级共享状态还是 App 级隔离状态。

## 框架接入配置

### 可复用的 Module Federation 共享表

基座和所有 remote 应从同一个文件导入共享表。下面版本对应当前 `1.0.0` 工作区；发布升级时必须同步更新，并在 CI 中比较基座、remote 和 lockfile 的实际解析版本：

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

基座使用 `horizonShared`，remote 使用 `horizonRemoteShared`。`import: false` 禁止 remote 静默打包自己的 fallback；基座必须先提供这些模块。Module Federation Enhanced 当前的 `requiredVersion` 在不兼容时可能只警告并选择其他版本，因此它不能替代严格版本门禁。部署流水线必须在产物发布前比较上述六个包的实际解析版本，不一致就失败；集成测试还要覆盖缺失 provider 和版本不兼容两种失败路径。

### qiankun

qiankun 负责容器和生命周期，不创建依赖共享域。标准共享运行时模式下，基座和微应用仍需在构建层使用上面的 Module Federation 共享表；只配置 qiankun UMD 生命周期而没有共享层，不符合首期支持边界。

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

基座传入的 `container` 必须同时包含应用根节点和独立 popup root。`unmountHorizonApp` 按本文生命周期契约先 `dispose()` Horizon runtime，再卸载 Vue App。

### wujie

wujie 子应用代码运行在独立 iframe 上下文，因此不能与父窗口形成同一个 Module Federation share scope。它属于隔离运行时模式：主子应用可以锁定相同版本，但不能把这种配置声明为“共享单例”支持；跨 iframe 弹层也不在首期范围内。

```ts
// host
await startApp({
  name: 'orders',
  url: '/micro/orders/',
  el: '#orders-container',
  alive: false,
  props: {
    horizon: { id: 'orders', locale: 'zh-CN', zIndexBase: 3000 },
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

使用 `alive: false` 时，每次离开都会执行卸载和资源清理。若业务启用保活模式，`deactivated` 只暂停业务交互，不能冒充最终释放；仅在应用真正销毁时调用 Horizon `dispose()`。

官方参考：[Module Federation `shared`](https://module-federation.io/configure/shared)、[qiankun 快速上手](https://qiankun.umijs.org/zh/guide/getting-started/)、[wujie `startApp`](https://wujie-micro.github.io/doc/api/startApp.html) 和 [wujie 生命周期](https://wujie-micro.github.io/doc/guide/lifecycle.html)。

## Horizon App 上下文

目标 API 使用一个 App 级 runtime 承载所有可变配置和资源所有权。接口名称在实现阶段可以按仓库规范微调，但能力边界必须保持一致：

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

上下文遵守以下约束：

- 一个 runtime 只能安装到一个 Vue App；重复安装必须保持幂等或给出明确错误；
- `id` 在同一页面内唯一，用于诊断、动态样式和资源所有权，不作为可见组件 DOM ID；
- `root` 在安装前存在，运行期间保持有效，并决定默认 ownerDocument 和资源作用域；
- `namespace` 是安装期配置，必须与加载的 SCSS/CSS namespace 一致，安装后不得动态修改；
- locale、size、theme 和 popup container 可通过 `update` 更新；更新只影响当前 runtime；
- 服务实例属于当前 runtime，`closeAll` 只能处理当前 runtime 创建的实例；
- `dispose` 可重复调用，必须清理当前 runtime 拥有的弹层、监听、Observer、动态样式、缓存和滚动锁；
- 组件优先读取最近的 App/组件树 provide，不得把全局 ref 作为多 App 情况下的回退状态。

## 生命周期映射

微应用适配层应维护自己的 Vue App 和 Horizon runtime 引用：

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

实现还应通过 `app.onUnmount` 注册幂等的兜底清理。因此，即使接入方只调用 `app.unmount()`，也不会遗留 Horizon 资源；显式先调用 `dispose()` 仍是微前端适配层的推荐顺序，因为它可以在容器被基座移除前关闭命令式弹层。

### Mount

1. 基座创建并传入稳定的应用根节点和 popup root；
2. 微应用创建 Horizon runtime；
3. 创建 Vue App，并安装 Horizon runtime；
4. 最后挂载 Vue App。

在安装完成前调用命令式服务必须失败并给出明确提示。

### Update

`update` 只修改声明为可更新的 App 配置。namespace、runtime id 和根节点所有权等安装期约束发生变化时，应执行完整 unmount 后重新 mount，而不是原地更新。

### Unmount

1. 停止发起新的业务异步任务；
2. 调用 Horizon runtime 的 `dispose()`，关闭并清理命令式资源；
3. 调用 Vue App 的 `unmount()`，触发组件级清理；
4. 基座最后移除应用根节点和 popup root。

卸载一个 runtime 不得重置页面级共享协调器，也不得删除其他 runtime 创建的 DOM 或样式。

## 验收不变量

实现完成后，双微应用真实浏览器测试必须证明：

- A 应用切换语言或主题时，B 应用不变化；
- A 的 Message、Notification 和 Dialog 只挂载到 A 的 popup root；
- A 的 `closeAll`、`dispose` 和 unmount 不影响 B；
- 两个应用同时持有模态滚动锁时，任一应用关闭后页面仍保持正确锁定；
- A 重复挂载和卸载后，没有残留节点、监听、动态样式或未释放锁；
- 共享依赖版本不匹配时，集成构建明确失败。
