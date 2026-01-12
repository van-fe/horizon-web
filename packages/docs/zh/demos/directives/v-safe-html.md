### 基本示例
直接使用 `v-safe-html` 替代 `v-html` 即可，默认的安全规则可以满足绝大多数需求。  
如下示例中，通过 `v-safe-html` 插入的 `img`，`src` 属性被保留了，但 `onerror` 由于可能被注入非法脚本，所以自动过滤掉了。
:::demo directives/v-safe-html/demo1.vue :::

### 自定义配置
你也可以完全自定义安全规则，放行或阻止指定的标签或属性。详细介绍请参见 [DOMPurify](https://github.com/cure53/DOMPurify#can-i-configure-dompurify)。  
如下示例中，只允许 `span` 和 `p` 标签以及 `style` 属性，其它内容将全部被过滤掉。
:::demo directives/v-safe-html/demo2.vue :::
