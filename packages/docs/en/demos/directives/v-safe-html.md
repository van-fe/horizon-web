## Basic Example
Just use `v-safe-html` instead of `v-html`, the default security rules can meet most needs.  
In the following example, the `img` inserted through `v-safe-html` has its `src` attribute retained, but `onerror` is automatically filtered out because it may be injected with illegal scripts.
:::demo directives/v-safe-html/demo1.vue :::

## Custom Configuration
You can also completely customize security rules to allow or block specified tags or attributes. For detailed introduction, please refer to [DOMPurify](https://github.com/cure53/DOMPurify#can-i-configure-dompurify).  
In the following example, only `span` and `p` tags and `style` attributes are allowed, and all other content will be filtered out.
:::demo directives/v-safe-html/demo2.vue :::
