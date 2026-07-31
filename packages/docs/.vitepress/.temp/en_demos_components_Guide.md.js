import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Guide.md","filePath":"en/demos/components/Guide.md"}');
const _sfc_main = { name: "en/demos/components/Guide.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Guide</h1><p class="description">In some cases, you may not need to use the <code>h-guide-item</code> component to build steps, you can directly pass in data to build</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-button ref="firstRef">First</h-button>
      <h-button class="guide-second">Second</h-button>
      <h-button ref="thirdRef">Third</h-button>
    </h-col>
    <h-divider />
    <h-col :span="24">
      <h-button @click="start">Start</h-button>
    </h-col>
  </h-row>

  <h-guide v-model="current" v-model:visible="visible" type="primary" @close="onClose" @finish="onFinish">
    <h-guide-item :target="firstRef" title="第一步" content="第一步就是第一步" />
    <h-guide-item target=".guide-second" title="第二步" content="第二步就是第二步" placement="top-start" image="/demo-assets/guide-card.svg" />
    <h-guide-item :target="thirdRef" title="第三步" content="第三步就是第三步" placement="right-start" />
    <h-guide-item title="第四步" content="第四步全局居中了" />
  </h-guide>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { $message } from '@aurora/horizon-web';

const firstRef = shallowRef<HTMLElement | null>(null);
const thirdRef = shallowRef<HTMLElement | null>(null);

const current = ref(0);
const visible = ref(false);

function start() {
  current.value = 0;
  visible.value = true;
}

function onClose() {
  $message.warning('跳过了新手引导');
}

function onFinish() {
  $message.success('完成了新手引导');
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Guide/basic.vue"
  }, null, _parent));
  _push(`<h2 id="direct-parameter-passing" tabindex="-1">Direct Parameter Passing <a class="header-anchor" href="#direct-parameter-passing" aria-label="Permalink to &quot;Direct Parameter Passing&quot;">​</a></h2><p>In some cases, you may not need to use the <code>h-guide-item</code> component to build steps, you can directly pass in data to build</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-button ref="firstRef">First</h-button>
      <h-button class="guide-second-2">Second</h-button>
      <h-button ref="thirdRef">Third</h-button>
    </h-col>
    <h-divider />
    <h-col :span="24">
      <h-button @click="start">Start</h-button>
    </h-col>
  </h-row>

  <h-guide v-model:visible="visible" :item-list="itemList" @close="onClose" @finish="onFinish" />
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import type { GuideItemProps } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';

const firstRef = shallowRef<HTMLElement | null>(null);
const thirdRef = shallowRef<HTMLElement | null>(null);
const itemList = ref<GuideItemProps[]>([]);

const visible = ref(false);

function start() {
  visible.value = true;
}

function onClose() {
  $message.warning('跳过了新手引导');
}

function onFinish() {
  $message.success('完成了新手引导');
}

onMounted(() => {
  itemList.value = [
    {
      target: firstRef,
      title: '第一步',
      content: '第一步就是第一步',
    },
    {
      target: '.guide-second-2',
      title: '第二步',
      content: '第二步就是第二步',
      placement: 'top-start',
      image: '/demo-assets/guide-card.svg',
    },
    {
      target: thirdRef,
      title: "第三步",
      content: "第三步就是第三步",
      placement:"right-start",
    },
    {
      title:"第四步",
      content: "第四步全局居中了",
    },
  ];
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Guide/itemList.vue"
  }, null, _parent));
  _push(`<h2 id="mask" tabindex="-1">Mask <a class="header-anchor" href="#mask" aria-label="Permalink to &quot;Mask&quot;">​</a></h2><p>You can set <code>mask = false</code> to close the mask</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-button ref="firstRef">First</h-button>
      <h-button class="guide-second-mask">Second</h-button>
      <h-button ref="thirdRef">Third</h-button>
    </h-col>
    <h-divider />
    <h-col :span="24">
      <h-button @click="start">Start</h-button>
    </h-col>
  </h-row>

  <h-guide v-model:visible="visible" :mask="false" type="primary" @close="onClose" @finish="onFinish">
    <h-guide-item :target="firstRef" title="第一步" content="第一步就是第一步" />
    <h-guide-item target=".guide-second-mask" title="第二步" content="第二步就是第二步" placement="top-start" image="/demo-assets/guide-card.svg" />
    <h-guide-item :target="thirdRef" title="第三步" content="第三步就是第三步" placement="right-start" />
    <h-guide-item title="第四步" content="第四步全局居中了" />
  </h-guide>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { $message } from '@aurora/horizon-web';

const firstRef = shallowRef<HTMLElement | null>(null);
const thirdRef = shallowRef<HTMLElement | null>(null);

const visible = ref(false);

function start() {
  visible.value = true;
}

function onClose() {
  $message.warning('跳过了新手引导');
}

function onFinish() {
  $message.success('完成了新手引导');
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Guide/mask.vue"
  }, null, _parent));
  _push(`<h2 id="complete-example" tabindex="-1">Complete Example <a class="header-anchor" href="#complete-example" aria-label="Permalink to &quot;Complete Example&quot;">​</a></h2><p>In most cases, the elements that need to be focused appear dynamically, and new elements will appear after interacting with the previously focused element</p><p>In this case, you cannot use the controller to switch between steps</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-button @click="start">Start</h-button>
    </h-col>
  </h-row>

  <h-dialog v-model="dialogVisible" title="信息填写" @close="onCloseDialog" @opened="onOpened">
    <h-form>
      <h-form-item label="姓名">
        <h-input ref="inputRef" v-model="name" @keypress.enter="onInputBlur" />
      </h-form-item>
      <h-form-item label="年龄">
        <h-input-number ref="inputNumberRef" v-model="age" @keypress.enter="onInputAgeBlur" />
      </h-form-item>
    </h-form>
    <template #footer>
      <h-button @click="dialogVisible = false">取消</h-button>
      <h-button ref="confirmBtnRef" @click="onSubmit">确定</h-button>
    </template>
  </h-dialog>

  <h-guide ref="guideRef" v-model:visible="visible" :use-controls="false" @close="onClose" @finish="onFinish">
    <h-guide-item :target="inputRef" title="第一步" content="请填写姓名，至少2位字符；填写完成后按下回车" />
    <h-guide-item :target="inputNumberRef" title="第二步" content="请填写年龄，在10-60区间；填写完成后按下回车" placement="top-start" />
    <h-guide-item :target="confirmBtnRef" title="第三步" content="点击确定提交" placement="right-start"></h-guide-item>
  </h-guide>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { $alert, $message, HGuide } from '@aurora/horizon-web';

const guideRef = shallowRef<typeof HGuide | null>(null);
const inputRef = shallowRef<HTMLElement | null>(null);
const inputNumberRef = shallowRef<HTMLElement | null>(null);
const confirmBtnRef = shallowRef<HTMLElement | null>(null);

const visible = ref(false);
const dialogVisible = ref(false);

const name = ref('');
const age = ref(0);

function start() {
  dialogVisible.value = true;
}

function onInputBlur() {
  if (name.value.length >= 2) {
    guideRef.value?.next();
  }
}

function onInputAgeBlur() {
  if (age.value >= 10 && age.value <= 60) {
    guideRef.value?.next();
  }
}

function onClose() {
  $message.warning('跳过了新手引导');
}

function onFinish() {
  $message.success('完成了新手引导');
  dialogVisible.value = false;
}

function onOpened() {
  visible.value = true;
}

function onCloseDialog() {
  visible.value = false;
}

function onSubmit() {
  $alert('填写结束').then(() => {
    guideRef.value?.next();
  });
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Guide/whole.vue"
  }, null, _parent));
  _push(`<h2 id="guide-api" class="no-underline h2"><a href="#guide-api" class="!no-underline">Guide Api</a></h2><h3 id="guide-props" class="no-underline h3"><a href="#guide-props" class="!no-underline">Guide Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>number</code></td><td class="text-center">No</td><td>-1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td>Configuration for visible.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>Configuration for type.</td><td><code>&#39;default&#39; | &#39;primary&#39;</code></td><td class="text-center">No</td><td>&#39;default&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>Configuration for placement.</td><td><code>| &#39;left&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;</code></td><td class="text-center">No</td><td>&#39;top&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow</td><td>Configuration for arrow.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">distance</td><td>Configuration for distance.</td><td><code>number</code></td><td class="text-center">No</td><td>8</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">skidding</td><td>Configuration for skidding.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">flip</td><td>Configuration for flip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-controls</td><td>Configuration for use controls.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask</td><td>Configuration for mask.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-trigger-padding</td><td>Configuration for mask trigger padding.</td><td><code>number</code></td><td class="text-center">No</td><td>8</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-class</td><td>Configuration for mask class.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-style</td><td>Configuration for mask style.</td><td><code>CSSProperties</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-into-view</td><td>Configuration for scroll into view.</td><td><code>boolean | ScrollIntoViewOptions</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>Configuration for z index.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">closable</td><td>Configuration for closable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">item-list</td><td>Configuration for item list.</td><td><code>Array&lt;ExtractPropTypes&lt;GuideItemProps&gt;&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">finish-text</td><td>Configuration for finish text.</td><td><code>string</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>Configuration for draggable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="guide-emits" class="no-underline h3"><a href="#guide-emits" class="!no-underline">Guide Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:visible</td><td rowspan="1">Emitted when update:visible changes.</td><td rowspan="1">( val: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">val</td><td><code>boolean</code></td><td>The val value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">Emitted when close changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">finish</td><td rowspan="1">Emitted when finish changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3 id="guide-exposes" class="no-underline h3"><a href="#guide-exposes" class="!no-underline">Guide Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">next</td><td rowspan="1">Controls next.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">prev</td><td rowspan="1">Controls prev.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">Controls close.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide</td><td rowspan="1">Controls hide.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">show</td><td rowspan="1">Controls show.</td><td rowspan="1">( startFromFirst: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">startFromFirst</td><td><code>boolean</code></td><td>The start from first value.</td></tr></tbody></table><h2 id="guideitem-api" class="no-underline h2"><a href="#guideitem-api" class="!no-underline">GuideItem Api</a></h2><h3 id="guideitem-props" class="no-underline h3"><a href="#guideitem-props" class="!no-underline">GuideItem Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">index</td><td>Configuration for index.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td>Configuration for target.</td><td><code>string | HTMLElement</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>Configuration for title.</td><td><code>string | VNode</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">image</td><td>Configuration for image.</td><td><code>string | VNode</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td>Configuration for content.</td><td><code>string | VNode</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>Configuration for type.</td><td><code>&#39;default&#39; | &#39;primary&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>Configuration for placement.</td><td><code>| &#39;left&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow</td><td>Configuration for arrow.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">distance</td><td>Configuration for distance.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">skidding</td><td>Configuration for skidding.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">flip</td><td>Configuration for flip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-controls</td><td>Configuration for use controls.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask</td><td>Configuration for mask.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-trigger-padding</td><td>Configuration for mask trigger padding.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-class</td><td>Configuration for mask class.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-style</td><td>Configuration for mask style.</td><td><code>CSSProperties</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-into-view</td><td>Configuration for scroll into view.</td><td><code>boolean | ScrollIntoViewOptions</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">closable</td><td>Configuration for closable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">finish-text</td><td>Configuration for finish text.</td><td><code>string</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>Configuration for draggable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="guideitem-emits" class="no-underline h3"><a href="#guideitem-emits" class="!no-underline">GuideItem Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">Emitted when close changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">finish</td><td rowspan="1">Emitted when finish changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3 id="guideitem-exposes" class="no-underline h3"><a href="#guideitem-exposes" class="!no-underline">GuideItem Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">Controls close.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Guide.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Guide = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Guide as default
};
