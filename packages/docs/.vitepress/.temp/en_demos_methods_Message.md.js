import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/methods/Message.md","filePath":"en/demos/methods/Message.md"}');
const _sfc_main = { name: "en/demos/methods/Message.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="basic" tabindex="-1">Basic <a class="header-anchor" href="#basic" aria-label="Permalink to &quot;Basic&quot;">​</a></h2><p>By calling the <code>$message</code> method, the default close time is 3s.</p>`);
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
  _push(`<h2 id="various-message-types" tabindex="-1">Various Message Types <a class="header-anchor" href="#various-message-types" aria-label="Permalink to &quot;Various Message Types&quot;">​</a></h2><p>Used to display operation feedback of &quot;success, warning, message, error&quot; types. When you need to customize more properties, Message can also receive an object as a parameter. Set <code>type</code> to prompt different message types or call through <code>$message[type]</code>.</p>`);
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
  _push(`<h2 id="loading-message" tabindex="-1">Loading Message <a class="header-anchor" href="#loading-message" aria-label="Permalink to &quot;Loading Message&quot;">​</a></h2><p>Use by calling <code>$message.loading</code>, automatically removed asynchronously. <strong>Please note: When using the object method, you need to set <code>duration=0</code> yourself, otherwise it will still close after 3s.</strong></p>`);
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
  _push(`<h2 id="closable-message-prompt" tabindex="-1">Closable Message Prompt <a class="header-anchor" href="#closable-message-prompt" aria-label="Permalink to &quot;Closable Message Prompt&quot;">​</a></h2><p>You can add a close button.</p><p>The default Message cannot be manually closed. If you need manual close functionality, you can set showClose to true. In addition, like Notification, Message has a controllable duration, and the default close time is 3000 milliseconds. PS: The loading type does not support the <code>showClose</code> attribute</p>`);
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
  _push(`<h2 id="using-html-fragments-as-body-content" tabindex="-1">Using HTML Fragments as Body Content <a class="header-anchor" href="#using-html-fragments-as-body-content" aria-label="Permalink to &quot;Using HTML Fragments as Body Content&quot;">​</a></h2><p>You can add a close button.</p><p>message also supports using HTML strings as body content. Set the useHTMLString attribute to true, and message will be treated as an HTML fragment.</p>`);
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
  _push(`<h2 id="custom" tabindex="-1">Custom <a class="header-anchor" href="#custom" aria-label="Permalink to &quot;Custom&quot;">​</a></h2><p><code>message</code> supports custom components</p>`);
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
  _push(`<h2 id="global-configuration" tabindex="-1">Global Configuration <a class="header-anchor" href="#global-configuration" aria-label="Permalink to &quot;Global Configuration&quot;">​</a></h2><p>You can configure global default time and maximum display number through message.config</p>`);
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
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/methods/Message.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Message = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Message as default
};
