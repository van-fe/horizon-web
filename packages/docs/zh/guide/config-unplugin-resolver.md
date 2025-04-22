# UnpluginResolver 配置

## exclude
- 类型: `RegExp | ((name: string) => boolean)`

不进行引入的组件名称的过滤方法/正则

## ssr
- 类型: `Boolean`
- 默认: `false`

是否使用 `ssr` 模式。启用后，会自动从 `es` 下的文件的引入改为 `lib`

## importStyle
- 类型: `'scss' | 'css' | false`
- 默认: `css`

引入样式文件的类型
- `scss`: 会引入 `scss` 文件，如果需要自定义命名空间的话，需要设置为此值，否则自定义命名空间将无效
- `css`: 默认引入静态样式文件
- `false`: 不引入样式文件

## directives
- 类型: `Boolean`
- 默认: `true`

是否处理指令

## namespace
- 类型: `String`
- 默认: `N`

定义命名空间

如果你使用的是 `<x-button>...</x-button>` 的形式，则需要设置此值。

## useRestStyle
- 类型: `Boolean`
- 默认: `true`

是否使用 [rest.css](https://github.com/filipelinhares/ress) 来消除浏览器不一致性

## usePresetStyle
- 类型: `Boolean`
- 默认: `true`

是否引入预制的样式

例如会预制类似于 [TailwindCss](https://www.tailwindcss.com) 基础样式，比如 `.text-center` 等

如果你在使用 `TailwindCss`，则可以将此项设置为 `false`

