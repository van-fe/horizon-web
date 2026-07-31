import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Alert.md","filePath":"en/demos/components/Alert.md"}');
const _sfc_main = { name: "en/demos/components/Alert.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Alert</h1><p class="description">The simplest usage, suitable for short warning prompts.</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>The simplest usage, suitable for short warning prompts.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-alert description="Info Text" type="info" />\n</template>\n',
    path: "demos/components/Alert/basic.vue"
  }, null, _parent));
  _push(`<h2 id="size" tabindex="-1">Size <a class="header-anchor" href="#size" aria-label="Permalink to &quot;Size&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-alert\n    show-icon\n    :closable="true"\n    size="small"\n    title="small"\n    description="Info Text"\n    type="info"\n  />\n  <h-alert\n    show-icon\n    :closable="true"\n    primary-button-text="确定"\n    default-button-text="取消"\n    size="medium"\n    title="medium"\n    description="Info Text"\n    type="info"\n  />\n</template>\n\n<style scoped>\n.h-alert {\n  margin: 20px 0 0;\n}\n\n.h-alert:first-child {\n  margin: 0;\n}\n</style>\n<script setup lang="ts"><\/script>\n',
    path: "demos/components/Alert/size.vue"
  }, null, _parent));
  _push(`<h2 id="four-styles" tabindex="-1">Four Styles <a class="header-anchor" href="#four-styles" aria-label="Permalink to &quot;Four Styles&quot;">​</a></h2><p>There are four styles: success, info, warning, error.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-alert :closable="true" show-icon description="用于传达加载、帮助、指南信息，文案可配有文字链接用于传达加载、帮助、指南信息，文案可配有文字链接用于传达加载、帮助、指南信息，文案可配有文字链接用于传达加载、帮助、指南信息，文案可配有文字链接" type="info" />
  <h-alert :closable="true" show-icon description="展示成功、正向反馈的信息" type="success" />
  <h-alert :closable="false" show-icon description="展示反馈提醒、警示的信息，比较常用" type="warning" />
  <h-alert :closable="false" show-icon description="展示反馈失败、操作错误的信息，比较常用" type="error"/>
  <h-alert :closable="false" show-icon :description="'超长提示'.repeat(20)" type="error"/>

</template>

<style scoped>
.h-alert {
  margin: 20px 0 0;
}
.h-alert:first-child {
  margin: 0;
}
</style>
`,
    path: "demos/components/Alert/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="extended-styles" tabindex="-1">Extended Styles <a class="header-anchor" href="#extended-styles" aria-label="Permalink to &quot;Extended Styles&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <p>带关闭操作:为用户提供关闭操作</p>
  <h-alert description="这是一条提示消息" type="info" closable show-icon />
  <h-alert
    :closable="true"
    show-icon
    title="标题"
    description="描述文字不换行，按钮布局方式在容器的右侧"
    type="info"
  />
  <p>带一个操作按钮:为了解决提示框内的问题需要进行操作/跳转时</p>
  <h-alert
    closable
    show-icon
    description="这是一条提示消息"
    type="info"
    primary-button-text="确定"
  />
  <p>带两个操作按钮:为了解决提示框内的问题需要进行操作/跳转时</p>
  <h-alert
    closable
    show-icon
    description="这是一条提示消息"
    type="info"
    primary-button-text="确定"
    default-button-text="取消"
    @close="callback"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const onPrimary = (close: Function) => {
      close();
    };
    const callback = () => {
      alert('设置回调的alert！');
    };
    const onDefault = () => {};
    return {
      callback,
      onDefault,
      onPrimary,
    };
  },
});
<\/script>
<style scoped>
.h-alert {
  margin: 20px 0;
}

.h-alert:first-child {
  margin: 0;
}
</style>
`,
    path: "demos/components/Alert/demo2.vue"
  }, null, _parent));
  _push(`<h2 id="different-layouts" tabindex="-1">Different Layouts <a class="header-anchor" href="#different-layouts" aria-label="Permalink to &quot;Different Layouts&quot;">​</a></h2><ul><li>Horizontal layout: Used when the description text content is less</li><li>Vertical layout: Used when the description text content is more</li><li>Auxiliary text can only store single-line text and will automatically wrap</li><li>If the text wraps, the close button is automatically hidden. You need to manually pass in <code>primary-button-text</code> or <code>default-button-text</code>, define the button text, pass in <code>onPrimary</code> or <code>onDefault</code> corresponding button callback events. The first parameter of the callback function provides the <code>close</code> method to close the <code>alert</code> component`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-alert
    title="标题"
    type="info"
    description="这是一条提示消息"
    show-icon
    primary-button-text="按钮"
    default-button-text="按钮"
  />
  <h-alert
    title="标题"
    type="info"
    :description="contentLong"
    show-icon
    primary-button-text="primary"
    default-button-text="default"
  />
</template>

<style scoped>
.h-alert {
  margin: 20px 0 0;
}

.h-alert:first-child {
  margin: 0;
}
</style>
<script setup lang="ts">
const contentLong = '这是一条提示消息'.repeat(20);
<\/script>
`,
    path: "demos/components/Alert/demo3.vue"
  }, null, _parent));
  _push(`</li></ul><h2 id="alert-api" class="no-underline h2"><a href="#alert-api" class="!no-underline">Alert Api</a></h2><h3 id="alert-props" class="no-underline h3"><a href="#alert-props" class="!no-underline">Alert Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>Configuration for title.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description</td><td>Configuration for description.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>Configuration for type.</td><td><code>&#39;success&#39; | &#39;info&#39; | &#39;warning&#39; | &#39;error&#39;</code></td><td class="text-center">No</td><td>&#39;info&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">closable</td><td>Configuration for closable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">primary-button-text</td><td>Configuration for primary button text.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default-button-text</td><td>Configuration for default button text.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-icon</td><td>Configuration for show icon.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">on-primary</td><td>Configuration for on primary.</td><td><code>(close: () =&gt; void) =&gt; void</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">on-default</td><td>Configuration for on default.</td><td><code>(close: () =&gt; void) =&gt; void</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rounded</td><td>Configuration for rounded.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr></tbody></table><h3 id="alert-emits" class="no-underline h3"><a href="#alert-emits" class="!no-underline">Alert Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">Emitted when close changes.</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>The evt value.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Alert.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Alert = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Alert as default
};
