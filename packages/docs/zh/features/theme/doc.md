# 主题色

Horizon Web 提供了可以动态修改主题色的方式，效果参考如下 DEMO

### 注意事项

- 该功能通过动态修改 CSS Variable 实现，因而在 IE 中页面将无法正常展示。请先确认你的用户环境是否需要支持 IE。

### 使用方式

Horizon Web 内部提供了主题切换工具，在 `ESModule` 中你可以通过如下的方式导入该工具：

```typescript
import { $themes } from '@aurora/horizon-web';
```

`$themes` 工具对象提供了基于 `typescript` 的类型支持，配合 `typescript` 可以让你更方便的设置当前支持的 `css` 变量

- `$themes` 的类型签名如下：

```typescript
type Themes = {
  set(themeType: ThemeType, targetElementSelector?: string): void;
  remove(targetElementSelector?: string): void;
};
```

### `set` 
  - 第一个参数可以传入需要设置的 `css variables`，此方法有类型智能提示
  - 第二个参数可以传入css元素选择path，如果不传入，则挂载在 `:root` 下；如果此方法使用多次且第二个参数不同，会多次挂载；如果第二个参数相同，则会替换

使用方式如下：

```typescript
$themes.set({
  nBgPrimary: '#ccc',
  nBorderBasicActive: '#ddd',
  ...
}, '#app');
```

### `remove`
此方法是用来删除使用了 `set` 设置的 `style element` 的，如果不传入参数，则会把后来设置的 `:root` 删除（但horizonweb中原本基础的变量不会改动）。

使用方法如下：

```ts
$themes.remove('#app')
```

### css 变量
因可配置变量太多，此处不再打印

可配置的css变量可以参照 [这里](https://git.nevint.com/horizon-web/horizon-web/-/tree/master/packages/horizon-web/src/styles/element)



