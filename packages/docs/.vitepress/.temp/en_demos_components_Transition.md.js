import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Transition.md","filePath":"en/demos/components/Transition.md"}');
const _sfc_main = { name: "en/demos/components/Transition.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Transition</h1><p class="description">If using <code>collapse-horizontal</code>, note that the outer container should be set to no-wrap to prevent layout breaking due to width changes during shrinking. For example <code>white-space: nowrap;</code></p><h2 id="fade-in-out" tabindex="-1">Fade In/Out <a class="header-anchor" href="#fade-in-out" aria-label="Permalink to &quot;Fade In/Out&quot;">​</a></h2>`);
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
  _push(`<h2 id="zoom" tabindex="-1">Zoom <a class="header-anchor" href="#zoom" aria-label="Permalink to &quot;Zoom&quot;">​</a></h2>`);
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
  _push(`<h2 id="expand-collapse" tabindex="-1">Expand/Collapse <a class="header-anchor" href="#expand-collapse" aria-label="Permalink to &quot;Expand/Collapse&quot;">​</a></h2><p>If using <code>collapse-horizontal</code>, note that the outer container should be set to no-wrap to prevent layout breaking due to width changes during shrinking. For example <code>white-space: nowrap;</code></p>`);
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
  _push(`<h2 id="slide" tabindex="-1">Slide <a class="header-anchor" href="#slide" aria-label="Permalink to &quot;Slide&quot;">​</a></h2>`);
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
  _push(`<h2 id="special" tabindex="-1">Special <a class="header-anchor" href="#special" aria-label="Permalink to &quot;Special&quot;">​</a></h2>`);
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
  _push(`<h2 id="transition-api" class="no-underline h2"><a href="#transition-api" class="!no-underline">Transition Api</a></h2><h3 id="transition-props" class="no-underline h3"><a href="#transition-props" class="!no-underline">Transition Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>Configuration for name.</td><td><code>| &#39;fade-in&#39;<br>      | &#39;fade-in-linear&#39;<br>      | &#39;zoom-in-center&#39;<br>      | &#39;zoom-in-top&#39;<br>      | &#39;zoom-in-bottom&#39;<br>      | &#39;zoom-in-left&#39;<br>      | &#39;collapse&#39;<br>      | &#39;collapse-horizontal&#39;<br>      | &#39;float&#39;<br>      | &#39;slide-up&#39;<br>      | &#39;slide-right&#39;<br>      | &#39;slide-down&#39;<br>      | &#39;slide-left&#39;<br>      | &#39;dropdown&#39;<br>      | &#39;tooltip&#39;<br>      | &#39;none&#39;</code></td><td class="text-center">No</td><td>&#39;fade-in&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">group</td><td>Configuration for group.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">speed</td><td>Configuration for speed.</td><td><code>&#39;normal&#39; | &#39;fast&#39; | &#39;slow&#39; | &#39;extra-fast&#39;</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">appear</td><td>Configuration for appear.</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">css</td><td>Configuration for css.</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mode</td><td>Configuration for mode.</td><td><code>BaseTransitionProps[&#39;mode&#39;]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">persisted</td><td>Configuration for persisted.</td><td><code>BaseTransitionProps[&#39;persisted&#39;]</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3 id="transition-emits" class="no-underline h3"><a href="#transition-emits" class="!no-underline">Transition Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-enter</td><td rowspan="1">Emitted when before enter changes.</td><td rowspan="1">( el: <code>RendererElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">el</td><td><code>RendererElement</code></td><td>The el value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">enter</td><td rowspan="1">Emitted when enter changes.</td><td rowspan="1">( el: <code>RendererElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">el</td><td><code>RendererElement</code></td><td>The el value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">after-enter</td><td rowspan="1">Emitted when after enter changes.</td><td rowspan="1">( el: <code>RendererElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">el</td><td><code>RendererElement</code></td><td>The el value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-leave</td><td rowspan="1">Emitted when before leave changes.</td><td rowspan="1">( el: <code>RendererElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">el</td><td><code>RendererElement</code></td><td>The el value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">leave</td><td rowspan="1">Emitted when leave changes.</td><td rowspan="1">( el: <code>RendererElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">el</td><td><code>RendererElement</code></td><td>The el value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">after-leave</td><td rowspan="1">Emitted when after leave changes.</td><td rowspan="1">( el: <code>RendererElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">el</td><td><code>RendererElement</code></td><td>The el value.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Transition.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Transition = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Transition as default
};
