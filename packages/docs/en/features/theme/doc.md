# Theme Color

Horizon Web provides a way to dynamically modify theme colors. See the following DEMO for the effect

## Notes

- This function is implemented by dynamically modifying CSS Variables, so the page will not display normally in IE. Please confirm whether your user environment needs to support IE first.

## Usage

Horizon Web internally provides a theme switching tool. In `ESModule`, you can import this tool in the following way:

```typescript
import { $themes } from '@aurora/horizon-web';
```

The `$themes` tool object provides type support based on `typescript`. Combined with `typescript`, it can make it more convenient for you to set the currently supported `css` variables

- The type signature of `$themes` is as follows:

```typescript
type Themes = {
  set(themeType: ThemeType, targetElementSelector?: string): void;
  remove(targetElementSelector?: string): void;
};
```

## `set` 
  - The first parameter can pass in the `css variables` that need to be set. This method has type intelligent prompts
  - The second parameter can pass in the css element selector path. If not passed, it will be mounted under `:root`; if this method is used multiple times with different second parameters, it will be mounted multiple times; if the second parameter is the same, it will be replaced

Usage is as follows:

```typescript
$themes.set({
  nBgPrimary: '#ccc',
  nBorderBasicActive: '#ddd',
  ...
}, '#app');
```

## `remove`
This method is used to delete the `style element` set using `set`. If no parameter is passed, it will delete the later set `:root` (but the original basic variables in horizonweb will not be changed).

Usage is as follows:

```ts
$themes.remove('#app')
```

## css variables
Because there are too many configurable variables, they are not printed here

Configurable css variables can refer to [here](https://git.nevint.com/horizon-web/horizon-web/-/tree/master/packages/horizon-web/src/styles/element)



