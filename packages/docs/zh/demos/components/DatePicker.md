### 输入框样式

基本的日期选择控件，可以通过设置 `inputStyle` 属性来配置输入框样式。

:::demo components/DatePicker/demo16.vue :::

### 基本用法

基本的日期选择控件，可以通过设置 `shortcuts` 属性来配置快捷选项，通过设置`show-year-button`属性来配置显示或者隐藏年份按钮，默认显示，通过`first-day-of-week`自定义周一到周日的排序。

:::demo components/DatePicker/demo1.vue :::

### 其他日期单位

通过扩展基础组件可以通过设置 `type` 属性来配置年、月选择。

:::demo components/DatePicker/demo13.vue :::

### 日期时间

可以通过设置 `type` 属性来设置3种类型的模式，分别为：`datetime、dateminutes、dateseconds`。

`pickerOptions`属性可以设置日期时间的开始、结束和间隔，仅`type`为`datetime、dateminutes、dateseconds`有效。

:::demo components/DatePicker/demo2.vue :::

### 日期范围

可以通过设置 `type` 属性来设置3种类型的模式，分别为：`daterange、monthrange、yearrange`。

日期范围也可以使用单月模式进行选择，只需设置`type=daterange,panelNumber=1`即可。

选择月份范围时，默认两个面板前后联动，通过设置`unlink-panels=true`解除两个面板联动

:::demo components/DatePicker/demo14.vue :::

### 日期时间范围

可以通过设置 `type` 属性来设置3种类型的模式，分别为：`datetimerange、dateminutesrange、datesecondsrange`。
通过`defaultTime`可以设置日期的默认开始时刻和结束时刻，不设置，默认选择00:00:00。

:::demo components/DatePicker/demo15.vue :::

### 自定义日期面板显示

可以通过设置 `showBeforeAfterDate` 和 `fixedSixRows` 属性来设置是否显示前后月和是否固定6行显示。

默认情况下，不显示前后月日期，不固定日期行数。

:::demo components/DatePicker/demo3.vue :::

### 自定义类型组件

触发器默认为输入框，为其他类型时，可通过插槽`reference`自行组合。

可通过设置`show-embed=true`和type结合将不同类型日期面板嵌入页面使用；`showHeader`属性可以设置是否显示年月切换操作按钮；默认展示，通过调用组件的`changeYear`和`changeMonth`方法切换日期年月。注意：低版本`type='panel'`后期大版本将会废弃，不建议再使用。

:::demo components/DatePicker/demo4.vue :::

### 自定义单元格

可通过默认插槽`default`自定义当前单元格的展示。

:::demo components/DatePicker/demo5.vue :::
插槽值类型如下

```ts
interface DateGridType {
  $date: Dayjs;
  date: Date;
  text: number|string|undefined;
  isToday: boolean;
  isNotCurrent?: boolean;
  isCurrent: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isBegin?: boolean;
  isEnd?: boolean;
  isRange?: boolean;
  isCurrentLastDate?: boolean;
  isDot?: boolean;
}
```

### 日期时间禁选

可以通过设置 `disabledDate`和`disabledTime` 属性来设置日期和时间的禁选。`disabledSwitchButton`可以和`disabledDate`配合使用，设置是否隐藏已设置禁用的日期，即，不可点击月年按钮切换，去选择禁用的月份。注意:`pick`事件以及`type="datetime/dateminutes/dateseconds"`时` disabledTime`方法，新增三个参数 `years, months, date`，旧参数`year,month,day`继续保留，后期大版本会废弃，强烈建议使用`years, months, date`


:::demo components/DatePicker/demo6.vue :::

### 日期时间Tooltip

可以通过设置 `showDateTooltip`和`showTimeTooltip` 属性来设置日期和时间的tooltip。

:::demo components/DatePicker/demo7.vue :::

### 底部扩展区

组件默认提供今天/此刻、取消、确认4种功能按钮。可通过插槽`footer`自定义按钮数量和功能。

通过属性`footerButton`设置底部操作区是否显示，含有时间选择的控件默认显示。

:::demo components/DatePicker/demo8.vue :::

### 日期格式

通过`format`可以设置输入框的显示格式，通过`value-format`设置绑定值的格式，默认情况下，组件接受并返回Date对象。

:::demo components/DatePicker/demo9.vue :::

### 自定义前缀、后缀内容

通过`prefixIcon`、`suffixIcon`可以输入框的图标，也可以通过插槽`prefix`、`suffix`设置前缀、后缀内容。

:::demo components/DatePicker/demo10.vue :::

### 默认面板日期、默认时刻

通过`defaultPickerValue`可以设置选择器打开时默认面板日期；通过`defaultTime`设置选择器选中日期后的默认具体时刻，不设置，默认时刻从00:00:00开始。

:::demo components/DatePicker/demo11.vue :::

### 空间不够
当显示位置的空间不够时，当所有方向没法满足时候可以通过 `preventOverflow` 阻止popover被切断

可以通过设置fallbackPlacements来调整flip的位置，比如上下位置都不够展示，希望能够展示到左边，可以设置fallbackPlacements为 ['top', 'bottom', 'left']

:::demo components/DatePicker/demo17.vue :::

### DatePicker 支持日期格式
默认情况下，组件接受并返回Date对象。以下为可用的格式化字串，也可参考[Dayjs](https://day.js.org/docs/en/display/format#list-of-all-available-formats)，注意：`Format` 符号：年份`Y`和`y`均支持，日`D`和`d`均支持，后期大版本会废弃`y`和`d`，强烈建议使用 `dayjs` 格式
以 UTC 2014年08月07日 06:07:08 为例：

| 格式        | 类型  | 说明           | 举例            |
|-----------|-----|--------------|---------------|
| YYYY      | 年   |              | 2014          |
| M         | 月   | 不补0          | 8             |
| MM        | 月   |              | 08            |
| D         | 日   | 不补0          | 7             |
| DD        | 日   |              | 07            |
| H         | 小时  | 24小时制；不补0    | 6             |
| HH        | 小时  | 24小时制        | 06            |
| m         | 分钟  | 不补0          | 7             |
| mm        | 分钟  |              | 07            |
| s         | 秒   | 不补0          | 8             |
| ss        | 秒   |              | 08            |
| timestamp | 时间戳(毫秒) | 格式化为number类型 | 1407362828000 |
| X | 时间戳(秒) | 格式化为number类型 | 1407362828 |

### DatePicker 默认的转化格式

| 类型                    | 默认值                   |
|-----------------------|-----------------------|
| date/daterange        | 'YYYY/MM/DD'          |
| datetime/dateminutes  | 'YYYY/MM/DD HH:mm'    |
| dateseconds           | 'YYYY/MM/DD HH:mm:ss' |
