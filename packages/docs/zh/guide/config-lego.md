# HORIZONWEB 使用配置
在使用 `createApp` 创建 `app` 时，会使用 `app.use(HorizonWeb)`，其中 `use` 的第二个参数可以用来配置 `HORIZONWEB` 的一些表现: 

::: warning 注意
以下配置中，`locale` 和 `sensor` 是通过 `provide` 传导，因此如果你创建了多个 `app`，则需要分别配置它们
:::

## cssVariableUseVersion
- 类型: `Boolean`
- 默认: `false`

因为不同版本的 `HORIZONWEB` 默认情况下 `css` 变量前缀相同，所以为了防止互相影响，请设置此项为 `true`

::: tip
为适配微应用等场景，此配置项会存于 `localStorage`
:::

## cssVariableUseVersionStoreKey
- 类型: `Boolean`
- 默认: `${current-version}-css-variable-use-version`

为了防止相同版本号的 `HORIZONWEB` 因为配置的全局变量相同而互相影响，所以可以通过此项配置防止此问题

::: tip
为适配微应用等场景，此配置项会存于 `localStorage`
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

### 举例
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

## sensor
- 类型: `Object`

神策用于追踪用户的使用情况

```ts
interface ConfigType {
  getUserId?: () => string;
  localstorageUserIdKey?: string;
  getCurrentEnv?: () => EnvEnum | string;
  sensorConfig: {
    basic?: {
      project?: string;
    };
    extra?: Record<string, unknown>;
    params?: {
      appId?: string | (() => string);
      platformType?: 'web' | 'android' | 'ios' | 'mini_program' | string;
      language?: 'zh-CN' | 'en-US' | 'nb-NO' | string;
      region?: 'CN' | 'NB' | string;
      deviceId?: string | (() => string);
      [index: string]: string | undefined | Function;
    };
  };
}
```

::: danger :heavy_exclamation_mark: 注意
在未来版本中将会移除此配置
:::

## sensor.getUserId
- 类型: `() => string`

用于获取用户域账号的方法

## sensor.localstorageUserIdKey
- 类型: `string | undefined`
- 默认: `lastUser`

存储在 `localstorage` 中用户域账号的 `key`
在 `getUserId` 没有传入的时候使用此项

## sensor.getCurrentEnv
- 类型: `() => EnvEnum | string`

获取当前运行环境的方法

```ts
enum EnvEnum {
  DEV = 'dev',
  TEST = 'test',
  STG = 'stg',
  PROD = 'prod',
}
```

## sensor.sensorConfig
- 类型: `Object`

神策具体配置


## sensor.sensorConfig.basic
- 类型: `{ project?: string }`

基础配置项，其中 `project` 是你的神策项目名称(`name`)

对于所有中台项目，`dev/test/stg` 都是 `nio_business_test`; `prod` 是 `nio_business_prod`

会自动根据 `getCurrentEnv` 返回的值判断，如与预期不符，需要自己设置

## sensor.sensorConfig.extra
- 类型: `Record<string, unknown>`

用于 `sensors.init` 传入的参数，会自动将 `key` 改为 `snakeCase` 模式。

例如: `nioWebsite` => `nio_website`

## sensor.sensorConfig.params
- 类型: `Object`

此配置项将会传入 `sensors.registerPage`

```ts
type params = {
  /**
   * 你的应用 appid
   */
  appId?: string | (() => string);
  /**
   * 当前应用平台
   */
  platformType?: 'web' | 'android' | 'ios' | 'mini_program' | string;
  /**
   * 当前语言
   */
  language?: 'zh-CN' | 'en-US' | 'nb-NO' | string;
  /**
   * 当前地区
   */
  region?: 'CN' | 'NB' | string;
  /**
   * 当前设备id
   */
  deviceId?: string | (() => string);
  /**
   * 其余参数的 key 也会被转为 snakeCase 模式
   */
  [index: string]: string | undefined | Function;
}
```