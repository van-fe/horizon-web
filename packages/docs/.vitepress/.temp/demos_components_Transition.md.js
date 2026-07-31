import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Transition.md","filePath":"zh/demos/components/Transition.md"}');
const _sfc_main = { name: "demos/components/Transition.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Transition</h1><p class="description">内置过渡动画</p><h2 id="淡入淡出" tabindex="-1">淡入淡出 <a class="header-anchor" href="#淡入淡出" aria-label="Permalink to &quot;淡入淡出&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-button type="normal" class="mb-2" @click="visible = !visible">Change</h-button>
    <h-row :gutter="10" style="height: 80px;">
      <h-col :span="6">
        <h-transition name="fade-in-linear">
          <div v-show="visible" class="animate-box">fade-in-linear</div>
        </h-transition>
      </h-col>
      <h-col :span="6">
        <h-transition name="fade-in">
          <div v-show="visible" class="animate-box">fade-in</div>
        </h-transition>
      </h-col>
    </h-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      visible: ref(true),
    };
  },
});
<\/script>

<style scoped>
.animate-box {
    width: 150px;
    height: 80px;
    background: var(--h-bg-brand-default);
    border-radius: var(--h-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--h-text-inverse);
}
</style>
`,
    path: "demos/components/Transition/fade.vue"
  }, null, _parent));
  _push(`<h2 id="缩放" tabindex="-1">缩放 <a class="header-anchor" href="#缩放" aria-label="Permalink to &quot;缩放&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-button type="normal" class="mb-2" @click="visible = !visible">Change</h-button>
    <h-row :gutter="10" style="height: 80px;">
      <h-col :span="6">
        <h-transition name="zoom-in-center">
          <div v-show="visible" class="animate-box">zoom-in-center</div>
        </h-transition>
      </h-col>
      <h-col :span="6">
        <h-transition name="zoom-in-top">
          <div v-show="visible" class="animate-box">zoom-in-top</div>
        </h-transition>
      </h-col>
      <h-col :span="6">
        <h-transition name="zoom-in-bottom">
          <div v-show="visible" class="animate-box">zoom-in-bottom</div>
        </h-transition>
      </h-col>
      <h-col :span="6">
        <h-transition name="zoom-in-left">
          <div v-show="visible" class="animate-box">zoom-in-left</div>
        </h-transition>
      </h-col>
    </h-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      visible: ref(true),
    };
  },
});
<\/script>

<style scoped>
.animate-box {
    width: 150px;
    height: 80px;
    background: var(--h-bg-brand-default);
    border-radius: var(--h-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--h-text-inverse);
}
</style>
`,
    path: "demos/components/Transition/zoom.vue"
  }, null, _parent));
  _push(`<h2 id="展开收起" tabindex="-1">展开收起 <a class="header-anchor" href="#展开收起" aria-label="Permalink to &quot;展开收起&quot;">​</a></h2><p>如果使用 <code>collapse-horizontal</code>，注意要将外层容器设置为不换行，防止在缩小的过程中会因为宽度的变化而换行，破坏布局。例如 <code>white-space: nowrap;</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div style="height: 200px">
    <h-button type="normal" class="mb-2" @click="visible = !visible">Change</h-button>
    <h-row :gutter="10">
      <h-col :span="6">
        <h-transition name="collapse">
          <div v-show="visible">
            <div class="animate-box">collapse</div>
            <div class="animate-box" style="margin-top: 10px">collapse</div>
          </div>
        </h-transition>
      </h-col>
      <h-col :span="12">
        <h-transition name="collapse-horizontal">
          <div v-show="visible" style="white-space: nowrap">
            <div class="animate-box-horizontal">collapse-horizontal</div>
            <div class="animate-box-horizontal" style="margin-left: 10px">collapse-horizontal</div>
          </div>
        </h-transition>
      </h-col>
    </h-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const visible = ref(true);
<\/script>

<style scoped lang="scss">
.animate-box {
  width: 150px;
  height: 80px;
  background: var(--h-bg-brand-default);
  border-radius: var(--h-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h-text-inverse);
}

.animate-box-horizontal {
  width: 150px;
  height: 80px;
  background: var(--h-bg-brand-default);
  border-radius: var(--h-radius);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--h-text-inverse);
}
</style>
`,
    path: "demos/components/Transition/collapse.vue"
  }, null, _parent));
  _push(`<h2 id="滑动" tabindex="-1">滑动 <a class="header-anchor" href="#滑动" aria-label="Permalink to &quot;滑动&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button type="normal" class="mb-2" @click="visible = !visible">Change</h-button>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="animate-box__wrapper">
        <h-transition name="slide-up">
          <div v-show="visible" class="animate-box">slide-up</div>
        </h-transition>
      </div>
    </h-col>
    <h-col :span="6">
      <div class="animate-box__wrapper">
        <h-transition name="slide-down">
          <div v-show="visible" class="animate-box">slide-down</div>
        </h-transition>
      </div>
    </h-col>
    <h-col :span="6">
      <div class="animate-box__wrapper">
        <h-transition name="slide-left">
          <div v-show="visible" class="animate-box">slide-left</div>
        </h-transition>
      </div>
    </h-col>
    <h-col :span="6">
      <div class="animate-box__wrapper">
        <h-transition name="slide-right">
          <div v-show="visible" class="animate-box">slide-right</div>
        </h-transition>
      </div>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
<\/script>

<style scoped>
.animate-box__wrapper {
  width: 150px;
  height: 80px;
  overflow: hidden;
  position: relative;
}

.animate-box {
  width: 150px;
  height: 80px;
  background: var(--h-bg-brand-default);
  border-radius: var(--h-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h-text-inverse);
}
</style>
`,
    path: "demos/components/Transition/slide.vue"
  }, null, _parent));
  _push(`<h2 id="特殊" tabindex="-1">特殊 <a class="header-anchor" href="#特殊" aria-label="Permalink to &quot;特殊&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-button type="normal" class="mb-2" @click="visible = !visible">Change</h-button>
    <h-row :gutter="10" style="height: 80px;">
      <h-col :span="6">
        <h-transition name="float">
          <div v-show="visible" class="animate-box">float</div>
        </h-transition>
      </h-col>
    </h-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
<\/script>

<style scoped>
.animate-box {
    width: 150px;
    height: 80px;
    background: var(--h-bg-brand-default);
    border-radius: var(--h-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--h-text-inverse);
}
</style>
`,
    path: "demos/components/Transition/float.vue"
  }, null, _parent));
  _push(`<h2 id="transition-api" class="no-underline h2"><a href="#transition-api" class="!no-underline">Transition Api</a></h2><h3 id="transition-props" class="no-underline h3"><a href="#transition-props" class="!no-underline">Transition Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>动画名称</td><td><code>| &#39;fade-in&#39;<br>      | &#39;fade-in-linear&#39;<br>      | &#39;zoom-in-center&#39;<br>      | &#39;zoom-in-top&#39;<br>      | &#39;zoom-in-bottom&#39;<br>      | &#39;zoom-in-left&#39;<br>      | &#39;collapse&#39;<br>      | &#39;collapse-horizontal&#39;<br>      | &#39;float&#39;<br>      | &#39;slide-up&#39;<br>      | &#39;slide-right&#39;<br>      | &#39;slide-down&#39;<br>      | &#39;slide-left&#39;<br>      | &#39;dropdown&#39;<br>      | &#39;tooltip&#39;<br>      | &#39;none&#39;</code></td><td class="text-center">否</td><td>&#39;fade-in&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">group</td><td>是否是群组动画</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">speed</td><td>动画速度<br><code>dropdown</code> 有自带速度控制，无法自定义</td><td><code>&#39;normal&#39; | &#39;fast&#39; | &#39;slow&#39; | &#39;extra-fast&#39;</code></td><td class="text-center">否</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">appear</td><td>出现时过渡</td><td><code>boolean</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">css</td><td>是否显式地向 <code>Vue</code> 表明可以跳过对 <code>CSS</code> 过渡的自动探测</td><td><code>boolean</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mode</td><td>模式<br><code>group = true</code> 下无效</td><td><code>BaseTransitionProps[&#39;mode&#39;]</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">persisted</td><td>持久化</td><td><code>BaseTransitionProps[&#39;persisted&#39;]</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3 id="transition-emits" class="no-underline h3"><a href="#transition-emits" class="!no-underline">Transition Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-enter</td><td rowspan="1">动画进入前调用</td><td rowspan="1">( el: <code>RendererElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">el</td><td><code>RendererElement</code></td><td>渲染的元素对象</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">enter</td><td rowspan="1">动画进入时调用</td><td rowspan="1">( el: <code>RendererElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">el</td><td><code>RendererElement</code></td><td>渲染的元素对象</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">after-enter</td><td rowspan="1">动画进入后调用</td><td rowspan="1">( el: <code>RendererElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">el</td><td><code>RendererElement</code></td><td>渲染的元素对象</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-leave</td><td rowspan="1">动画离开前调用</td><td rowspan="1">( el: <code>RendererElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">el</td><td><code>RendererElement</code></td><td>渲染的元素对象</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">leave</td><td rowspan="1">动画离开时调用</td><td rowspan="1">( el: <code>RendererElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">el</td><td><code>RendererElement</code></td><td>渲染的元素对象</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">after-leave</td><td rowspan="1">动画离开后调用</td><td rowspan="1">( el: <code>RendererElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">el</td><td><code>RendererElement</code></td><td>渲染的元素对象</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Transition.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Transition = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Transition as default
};
