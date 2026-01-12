### 何时使用
- 当有一系列信息需按时间排列时，可正序和倒序；
- 需要有一条时间轴进行视觉上的串联时。

### 基本样式
时间轴包含节点、时间线、节点名称、时间日期、描述等基本信息，此外可附加Icon、描述、操作记录、评论等；
:::demo components/Timeline/basic.vue :::

### 可附加属性
:::demo components/Timeline/prop.vue :::

### `format` 值的说明

1. `format` 当前版本开始将作为 `dayjs` 的参数进行格式化
2. 为兼容较前版本，将会做以下匹配替换并产生相应副作用，若开启TimeLine v2属性，则直接按照day.js格式化，不会进行下面的匹配替换
```javascript
/**
  * y+ -> Y+
  * m+ -> M+ ---- dayjs中m无用
  * d -> D
  * dd -> DD
  * h+ -> H+ ---- dayjs中h无用
  * i+ -> m+
  * s -> s
  * ss -> ss
  * ms -> SSS
  * t+ -> A+ ---- dayjs中A会有更细分凌晨、上午、中午……
  * w -> dddd
  * q -> Q ---- LocaleSupportLang.ZH_CN ? `第${Q}季度` : `Q${Q}`
 */
```
3. 更多可用格式，请查看 [Day.js Format 文档](https://day.js.org/docs/zh-CN/display/format)
