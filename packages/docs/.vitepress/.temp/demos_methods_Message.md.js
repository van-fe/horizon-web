import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/methods/Message.md","filePath":"zh/demos/methods/Message.md"}');
const _sfc_main = { name: "demos/methods/Message.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Message</h1><p class="description">由用户的操作触发的轻量级全局反馈，具有即时、简短的特点</p><h2 id="基础" tabindex="-1">基础 <a class="header-anchor" href="#基础" aria-label="Permalink to &quot;基础&quot;">​</a></h2><p>通过调用 <code>$message</code> 方法即可，默认关闭时间是 3s.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button @click="open">Default Message</h-button>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';

const open = () => {
  $message({ message: 'This message will automatically close after 3 seconds.' });
};
<\/script>

<style scoped></style>
`,
    path: "demos/methods/Message/basic.vue"
  }, null, _parent));
  _push(`<h2 id="各种消息类型" tabindex="-1">各种消息类型 <a class="header-anchor" href="#各种消息类型" aria-label="Permalink to &quot;各种消息类型&quot;">​</a></h2><p>用来显示「成功、警告、消息、错误」类的操作反馈。 当需要自定义更多属性时，Message 也可以接收一个对象为参数。 通过设置 <code>type</code>提示不同的消息类型或者通过 <code>$message[type]</code> 调用。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space>
    <h-button type="normal" plain @click="open2">成功</h-button>
    <h-button type="normal" plain @click="open3">警告</h-button>
    <h-button type="normal" plain @click="open1">消息</h-button>
    <h-button type="normal" plain @click="open4">错误</h-button>
  </h-space>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';
const open1 = () => {
  $message.info('这是一条消息提示');
};
const open2 = () => {
  $message.success('操作成功');
};

const open3 = () => {
  $message.warning('操作警告');
};

const open4 = () => {
  $message.error('操作错误');
};
<\/script>
`,
    path: "demos/methods/Message/type.vue"
  }, null, _parent));
  _push(`<h2 id="加载中消息" tabindex="-1">加载中消息 <a class="header-anchor" href="#加载中消息" aria-label="Permalink to &quot;加载中消息&quot;">​</a></h2><p>通过调用 <code>$message.loading</code> 使用，异步自行移除。<strong>请注意: 使用对象方式需要自行设置 <code>duration=0</code>，否则依旧按照3s后关闭.</strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button type="normal" plain @click="open">加载</h-button>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';
const open = () => {
  const inst = $message.loading('After 2 seconds, the asynchronous operation will be completed');
  setTimeout(() => {
    inst.update({
      message: 'The asynchronous operation is completed',
      type: 'success',
      duration: 3000,
    });
  }, 2000);
};
<\/script>
`,
    path: "demos/methods/Message/loading.vue"
  }, null, _parent));
  _push(`<h2 id="可关闭的消息提示" tabindex="-1">可关闭的消息提示 <a class="header-anchor" href="#可关闭的消息提示" aria-label="Permalink to &quot;可关闭的消息提示&quot;">​</a></h2><p>可以添加关闭按钮。</p><p>默认的 Message 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 showClose 设置为 true 此外，和 Notification 一样，Message 拥有可控的 duration， 默认的关闭时间为 3000 毫秒。PS: loading 类型不支持 <code>showClose</code> 属性</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button type="normal" plain @click="open2">成功</h-button>
  <h-button type="normal" plain @click="open3">警告</h-button>
  <h-button type="normal" plain @click="open1">消息</h-button>
  <h-button type="normal" plain @click="open4">错误</h-button>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';
const open1 = () => {
  $message({
    showClose: true,
    message: '这是一条提示消息',
  });
};
const open2 = () => {
  $message({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};
const open3 = () => {
  $message({
    showClose: true,
    message: 'Warning, this is a warning message.',
    type: 'warning',
  });
};
const open4 = () => {
  $message({
    showClose: true,
    message: 'Oops, this is a error message.',
    type: 'error',
  });
};
<\/script>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
`,
    path: "demos/methods/Message/closable.vue"
  }, null, _parent));
  _push(`<h2 id="使用-html-片段作为正文内容" tabindex="-1">使用 HTML 片段作为正文内容 <a class="header-anchor" href="#使用-html-片段作为正文内容" aria-label="Permalink to &quot;使用 HTML 片段作为正文内容&quot;">​</a></h2><p>可以添加关闭按钮。</p><p>message 还支持使用 HTML 字符串作为正文内容。 将useHTMLString属性设置为 true,message 就会被当作 HTML 片段处理。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button :plain="true" @click="openHTML">Use HTML String</h-button>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';

const openHTML = () => {
  $message({
    useHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  });
};
<\/script>
`,
    path: "demos/methods/Message/demo4.vue"
  }, null, _parent));
  _push(`<h2 id="自定义" tabindex="-1">自定义 <a class="header-anchor" href="#自定义" aria-label="Permalink to &quot;自定义&quot;">​</a></h2><p><code>message</code> 支持自定义组件</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button :plain="true" @click="openHTML">自定义消息体</h-button>
</template>

<script lang="ts" setup>
import { $message, HButton, HSpace } from '@aurora/horizon-web';
import { defineComponent, h } from 'vue';

const ButtonGroup = defineComponent({
  name: 'ButtonGroup',
  // eslint-disable-next-line vue/no-unused-components
  setup() {
    return () => h(HSpace, [
      h(HButton, { size: 'small', plain: true, onClick: () => $message.success('nice~') }, 'one'),
      h(HButton, { size: 'small', plain: true, type: 'danger', onClick: () => $message.warning('danger!!!') }, 'two'),
      h(HButton, { size: 'small', plain: true, type: 'tertiary', onClick: () => $message.error('terrible') }, 'three'),
    ]);
  },
});

const openHTML = () => {
  $message({ message: h(ButtonGroup), duration: 0, showClose: true });
};
<\/script>
`,
    path: "demos/methods/Message/customize.vue"
  }, null, _parent));
  _push(`<h2 id="全局配置" tabindex="-1">全局配置 <a class="header-anchor" href="#全局配置" aria-label="Permalink to &quot;全局配置&quot;">​</a></h2><p>通过 message.config 方式可配置全局默认时间和最大显示数量</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space direction="vertical">
    <h-checkbox v-model="opened" @change="onToggle">启用全局配置(会影响所有message demo)</h-checkbox>
    <h-space v-if="opened">
      <div>延迟时间: {{ customize.duration }}</div>
      <div>最大数量: {{ customize.maxCount }}</div>
    </h-space>
    <h-space v-else>
      <div>延迟时间: 3000</div>
      <div>最大数量: Number.MAX_SAFE_INTEGER </div>
    </h-space>
    <h-space>
      <h-button type="normal" plain @click="open">new message</h-button>
      <h-button type="normal" plain @click="$message.closeAll">Close All</h-button>
    </h-space>
  </h-space>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const opened = ref(false);
const customize = { maxCount: 3, duration: 5000 };

const onToggle = () => {
  if (opened.value) {
    $message.config(customize);
  } else {
    $message.config({ duration: 3000, maxCount: Number.MAX_SAFE_INTEGER });
  }
};

const open = () => {
  $message.success(\`This is a succeed message, current code: \${Math.random().toString(16).slice(2)}\`);
};
<\/script>
`,
    path: "demos/methods/Message/config.vue"
  }, null, _parent));
  _push(`<h3 id="message-options" class="no-underline h3"><a href="#message-options" class="!no-underline">Message Options</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>是否必填</th><th>默认值</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">message</td><td rowspan="1">消息文字</td><td rowspan="1">是</td><td rowspan="1">-</td><td rowspan="1"><code> string | VNode</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td rowspan="1">消息类型</td><td rowspan="1">否</td><td rowspan="1">&#39;info&#39;</td><td rowspan="1"><code> &#39;success&#39; | &#39;info&#39; | &#39;warning&#39; | &#39;error&#39; | &#39;loading&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">useHTMLString</td><td rowspan="1">是否将 message 属性作为 HTML 片段处理</td><td rowspan="1">否</td><td rowspan="1">false</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">duration</td><td rowspan="1">显示时间，单位为毫秒<br>设置为 0 时不会自动关闭</td><td rowspan="1">否</td><td rowspan="1">3000</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">showClose</td><td rowspan="1">是否显示关闭按钮</td><td rowspan="1">否</td><td rowspan="1">false</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">offset</td><td rowspan="1">Message 距离窗口顶部的偏移量</td><td rowspan="1">否</td><td rowspan="1">32</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">zIndex</td><td rowspan="1">消息文字</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">onClose</td><td rowspan="1">当关闭时的回调</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> (vm: VNode) =&gt; void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">vm</td><td><code>VNode</code></td><td>-</td></tr></tbody></table><h3 id="message-methods" class="no-underline h3"><a href="#message-methods" class="!no-underline">Message Methods</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">closeAll</td><td rowspan="1">关闭所有消息</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">success</td><td rowspan="1">成功消息</td><td rowspan="1">( options: <code>Partial&lt;ExtractMethodOptions&lt;string | MessageOriginOption&gt;&gt;</code> ) =&gt; <code>Pick&lt;IMessageInstance, &#39;close&#39;&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td><code>Partial&lt;ExtractMethodOptions&lt;string | MessageOriginOption&gt;&gt;</code></td><td>提示的消息文字，或者 <code>MessageOriginOption</code> 选项</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">warning</td><td rowspan="1">警告消息</td><td rowspan="1">( options: <code>Partial&lt;ExtractMethodOptions&lt;string | MessageOriginOption&gt;&gt;</code> ) =&gt; <code>Pick&lt;IMessageInstance, &#39;close&#39;&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td><code>Partial&lt;ExtractMethodOptions&lt;string | MessageOriginOption&gt;&gt;</code></td><td>提示的消息文字，或者 <code>MessageOriginOption</code> 选项</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">error</td><td rowspan="1">错误消息</td><td rowspan="1">( options: <code>Partial&lt;ExtractMethodOptions&lt;string | MessageOriginOption&gt;&gt;</code> ) =&gt; <code>Pick&lt;IMessageInstance, &#39;close&#39;&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td><code>Partial&lt;ExtractMethodOptions&lt;string | MessageOriginOption&gt;&gt;</code></td><td>提示的消息文字，或者 <code>MessageOriginOption</code> 选项</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">info</td><td rowspan="1">提示消息</td><td rowspan="1">( options: <code>Partial&lt;ExtractMethodOptions&lt;string | MessageOriginOption&gt;&gt;</code> ) =&gt; <code>Pick&lt;IMessageInstance, &#39;close&#39;&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td><code>Partial&lt;ExtractMethodOptions&lt;string | MessageOriginOption&gt;&gt;</code></td><td>提示的消息文字，或者 <code>MessageOriginOption</code> 选项</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading</td><td rowspan="1">等待消息，可异步关闭</td><td rowspan="1">( options: <code>Partial&lt;ExtractMethodOptions&lt;string | MessageOriginOption&gt;&gt;</code> ) =&gt; <code>IMessageInstance</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td><code>Partial&lt;ExtractMethodOptions&lt;string | MessageOriginOption&gt;&gt;</code></td><td>提示的消息文字，或者 <code>MessageOriginOption</code> 选项</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">config</td><td rowspan="1">全局配置，可设置最大显示数</td><td rowspan="1">( options: <code>Partial&lt;ExtractMethodOptions&lt;{ maxCount: number; duration: number }&gt;&gt;</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td><code>Partial&lt;ExtractMethodOptions&lt;{ maxCount: number; duration: number }&gt;&gt;</code></td><td>Global message configuration</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/methods/Message.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Message = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Message as default
};
