# Horizon Web 使用配置
在使用 `createApp` 创建 `app` 时，会使用 `app.use(HorizonWeb)`，其中 `use` 的第二个参数可以用来配置 `Horizon Web` 的一些表现: 

::: warning 注意
以下配置中，`locale` 是通过 `provide` 传导，因此如果你创建了多个 `app`，则需要分别配置它们
:::

## locale
- 类型: `Object`

国际化配置

```ts
interface LocalOptionType {
  current?: LocaleSupportLang;
  lang?: LangOptions;
}
```

## locale.current
- 类型: `LocaleSupportLang`
- 默认: `LocaleSupportLang.EN`

用于定义当前语言

```ts
enum LocaleSupportLang {
  EN = 'En',
  SvSE = 'SvSE',
  ZH_CN = 'ZhCN',
  ZH_TW = 'ZhTW',
}
```

## locale.lang
- 类型: `LangOptions`

用于自定义字典和转换方法的配置

```ts
type LangOptions = {
  dictionaries: PartialLocaleLangFileType;
  t?: LocaleLangMethod;
}
```

## locale.lang.dictionaries
- 类型: `PartialLocaleLangFileType`

此配置可以自定义字典

```ts
export interface LocaleLangDictionary {
  [index: string | number]: string | string[] | LocaleLangDictionary;
}

export type LocaleLangDictionaries = Record<LocaleSupportLang, LocaleLangDictionary>;

export type PartialLocaleLangFileType = Partial<LocaleLangDictionaries>;
```

## 举例
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

那么根据上面的举例，则可以通过注入到全局的 `$t('tree.type')` `${'likes[2]'}` 获取到字典值


## locale.lang.t
- 类型: `(path: string, lang?: LocaleSupportLang) => string`

此数据可以自定义国际化转换
- `path`: 字典的路径
- `lang`: 当前指定转换的语言，为 `undefined` 时则使用当前语言
