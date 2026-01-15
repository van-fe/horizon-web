## When to Use
- When there is a series of information that needs to be arranged by time, it can be in forward or reverse order;
- When you need a timeline to visually connect them.

## Basic Style
Timeline includes basic information such as nodes, timeline, node names, time and date, descriptions, etc. In addition, icons, descriptions, operation records, comments, etc. can be attached;
:::demo components/Timeline/basic.vue :::

## Additional Attributes
:::demo components/Timeline/prop.vue :::

## Explanation of `format` Value

1. `format` Starting from the current version, it will be formatted as a parameter of `dayjs`
2. For compatibility with earlier versions, the following matching replacement will be performed and corresponding side effects will be generated. If the TimeLine v2 attribute is enabled, it will be formatted directly according to day.js without the following matching replacement
```javascript
/**
  * y+ -> Y+
  * m+ -> M+ ---- m is useless in dayjs
  * d -> D
  * dd -> DD
  * h+ -> H+ ---- h is useless in dayjs
  * i+ -> m+
  * s -> s
  * ss -> ss
  * ms -> SSS
  * t+ -> A+ ---- A in dayjs will have more detailed early morning, morning, noon...
  * w -> dddd
  * q -> Q ---- LocaleSupportLang.ZH_CN ? `第${Q}季度` : `Q${Q}`
 */
```
3. For more available formats, please refer to [Day.js Format Documentation](https://day.js.org/docs/en/display/format)
