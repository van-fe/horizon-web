import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Alert.md","filePath":"zh/demos/components/Alert.md"}');
const _sfc_main = { name: "demos/components/Alert.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Alert</h1><p class="description">用于页面中展示重要的提示信息</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><p>最简单的用法，适用于简短的警告提示。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-alert description="Info Text" type="info" />\n</template>\n',
    path: "demos/components/Alert/basic.vue"
  }, null, _parent));
  _push(`<h2 id="大小" tabindex="-1">大小 <a class="header-anchor" href="#大小" aria-label="Permalink to &quot;大小&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-alert\n    show-icon\n    :closable="true"\n    size="small"\n    title="small"\n    description="Info Text"\n    type="info"\n  />\n  <h-alert\n    show-icon\n    :closable="true"\n    primary-button-text="确定"\n    default-button-text="取消"\n    size="medium"\n    title="medium"\n    description="Info Text"\n    type="info"\n  />\n</template>\n\n<style scoped>\n.h-alert {\n  margin: 20px 0 0;\n}\n\n.h-alert:first-child {\n  margin: 0;\n}\n</style>\n<script setup lang="ts"><\/script>\n',
    path: "demos/components/Alert/size.vue"
  }, null, _parent));
  _push(`<h2 id="四种样式" tabindex="-1">四种样式 <a class="header-anchor" href="#四种样式" aria-label="Permalink to &quot;四种样式&quot;">​</a></h2><p>共有四种样式 success、info、warning、error。</p>`);
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
  _push(`<h2 id="拓展样式" tabindex="-1">拓展样式 <a class="header-anchor" href="#拓展样式" aria-label="Permalink to &quot;拓展样式&quot;">​</a></h2>`);
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
  _push(`<h2 id="不同布局" tabindex="-1">不同布局 <a class="header-anchor" href="#不同布局" aria-label="Permalink to &quot;不同布局&quot;">​</a></h2><ul><li>水平布局：描述文案内容较少时使用</li><li>垂直布局：描述文字内容较多时使用</li><li>辅助性文字只能存放单行文本，会自动换行显示。</li><li>如果文本换行，自动隐藏关闭按钮，需要手动传入，<code>primary-button-text</code> 或 <code>default-button-text</code>，定义按钮文本传入 <code>onPrimary</code> 或 <code>onDefault</code> 对应按钮回调事件，回调函数的第一个参数提供关闭 <code>alert</code> 组件的 <code>close</code> 方法`);
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
  _push(`</li></ul><h2 id="alert-api" class="no-underline h2"><a href="#alert-api" class="!no-underline">Alert Api</a></h2><h3 id="alert-props" class="no-underline h3"><a href="#alert-props" class="!no-underline">Alert Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>标题</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description</td><td>辅助性文字</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>icon类型</td><td><code>&#39;success&#39; | &#39;info&#39; | &#39;warning&#39; | &#39;error&#39;</code></td><td class="text-center">否</td><td>&#39;info&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">closable</td><td>是否可关闭</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">primary-button-text</td><td>主按钮文本</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default-button-text</td><td>默认按钮文本</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-icon</td><td>是否显示图标</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>组件大小，支持small和medium</td><td><code>&#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">on-primary</td><td>主按钮回调方法</td><td><code>(close: () =&gt; void) =&gt; void</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">on-default</td><td>默认按钮回调方法</td><td><code>(close: () =&gt; void) =&gt; void</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rounded</td><td>是否这是圆角</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr></tbody></table><h3 id="alert-emits" class="no-underline h3"><a href="#alert-emits" class="!no-underline">Alert Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">关闭alert时触发的事件</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Alert.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Alert = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Alert as default
};
