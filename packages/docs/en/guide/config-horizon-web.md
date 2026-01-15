# Horizon Web Usage Configuration
When using `createApp` to create an `app`, you will use `app.use(HorizonWeb)`, where the second parameter of `use` can be used to configure some behaviors of `Horizon Web`:

::: warning Note
In the following configuration, `locale` is passed through `provide`, so if you create multiple `app`s, you need to configure them separately
:::

## cssVariableUseVersion
- Type: `Boolean`
- Default: `false`

Because different versions of `Horizon Web` have the same CSS variable prefix by default, to prevent mutual interference, please set this to `true`

::: tip
To adapt to scenarios such as micro-applications, this configuration item will be stored in `localStorage`
:::

## cssVariableUseVersionStoreKey
- Type: `Boolean`
- Default: `${current-version}-css-variable-use-version`

To prevent different `Horizon Web` instances with the same version number from interfering with each other due to the same global variable configuration, you can prevent this problem by configuring this item

::: tip
To adapt to scenarios such as micro-applications, this configuration item will be stored in `localStorage`
:::

## locale
- Type: `Object`

Internationalization configuration

```ts
interface LocalOptionType {
  current?: LocaleSupportLang;
  lang?: LangOptions;
}
```

## locale.current
- Type: `LocaleSupportLang`
- Default: `LocaleSupportLang.EN`

Used to define the current language

```ts
enum LocaleSupportLang {
  EN = 'En',
  SvSE = 'SvSE',
  ZH_CN = 'ZhCN',
  ZH_TW = 'ZhTW',
}
```

## locale.lang
- Type: `LangOptions`

Configuration for customizing dictionaries and conversion methods

```ts
type LangOptions = {
  dictionaries: PartialLocaleLangFileType;
  t?: LocaleLangMethod;
}
```

## locale.lang.dictionaries
- Type: `PartialLocaleLangFileType`

This configuration can customize dictionaries

```ts
export interface LocaleLangDictionary {
  [index: string | number]: string | string[] | LocaleLangDictionary;
}

export type LocaleLangDictionaries = Record<LocaleSupportLang, LocaleLangDictionary>;

export type PartialLocaleLangFileType = Partial<LocaleLangDictionaries>;
```

## Example
```ts
app.use(HorizonWeb, {
  locale: {
    lang: {
      dictionaries: {
        [LocaleSupportLang.EN]: {
          flower: 'flower',
          tree: {
            name: 'tree',
            type: 'plant'
          },
          likes: ['tree', 'flower', 'dog', 'elephant']
        },
        [LocaleSupportLang.ZH_CN]: {
          flower: '花',
          tree: {
            name: '树',
            type: '植物'
          },
          likes: ['树', '花', '狗', '大象']
        },
        [LocaleSupportLang.SvSE]: {
          // ...
        },
        [LocaleSupportLang.ZH_TW]: {
          // ...
        }
      }
    }
  }
})
```

Then according to the above example, you can get dictionary values by injecting into the global `$t('tree.type')` `${'likes[2]'}`


## locale.lang.t
- Type: `(path: string, lang?: LocaleSupportLang) => string`

This data can customize internationalization conversion
- `path`: The path of the dictionary
- `lang`: The currently specified language for conversion, when it is `undefined`, the current language is used
