# UnpluginResolver Configuration

## exclude
- Type: `RegExp | ((name: string) => boolean)`

Filter method/regex for component names that are not imported

## ssr
- Type: `Boolean`
- Default: `false`

Whether to use `ssr` mode. After enabling, it will automatically change imports from files under `es` to `lib`

## importStyle
- Type: `'scss' | 'css' | false`
- Default: `css`

Type of style file to import
- `scss`: Will import `scss` files. If you need to customize the namespace, you need to set this value, otherwise the custom namespace will be invalid
- `css`: Import static style files by default
- `false`: Do not import style files

## directives
- Type: `Boolean`
- Default: `true`

Whether to process directives

## namespace
- Type: `String`
- Default: `N`

Define namespace

If you are using the form `<x-button>...</x-button>`, you need to set this value.
