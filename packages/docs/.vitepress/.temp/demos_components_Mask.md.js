import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Mask.md","filePath":"zh/demos/components/Mask.md"}');
const _sfc_main = { name: "demos/components/Mask.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Mask</h1><p class="description">提供一个遮罩，可以覆盖在任意元素上</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><p>在应用程序上添加一个暗淡的层（type:五种类型，默认为default）。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div style="display: flex">
    <div class="box">
      <h-button @click="open">打开(default)</h-button>
      <h-mask :value="show" type="default">
        <h-button @click="close">关闭</h-button>
      </h-mask>
    </div>
    <div class="box">
      <h-button @click="open01">打开(weak)</h-button>
      <h-mask :value="show01" type="weak">
        <h-button @click="close01">关闭</h-button>
      </h-mask>
    </div>
    <div class="box">
      <h-button @click="open02">打开(strong)</h-button>
      <h-mask :value="show02" type="strong">
        <h-button @click="close02">关闭</h-button>
      </h-mask>
    </div>
    <div class="box">
      <h-button @click="open03">打开(inverse)</h-button>
      <h-mask :value="show03" type="inverse">
        <h-button @click="close03">关闭</h-button>
      </h-mask>
    </div>
    <div class="box">
      <h-button @click="open04">打开(transparent)</h-button>
      <h-mask :value="show04" type="transparent">
        <h-button @click="close04">关闭</h-button>
      </h-mask>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref(false);
    const show01 = ref(false);
    const show02 = ref(false);
    const show03 = ref(false);
    const show04 = ref(false);
    const open = function () {
      show.value = true;
    };
    const close = function () {
      show.value = false;
    };
    const open01 = function () {
      show01.value = true;
    };
    const close01 = function () {
      show01.value = false;
    };
    const open02 = function () {
      show02.value = true;
    };
    const close02 = function () {
      show02.value = false;
    };
    const open03 = function () {
      show03.value = true;
    };
    const close03 = function () {
      show03.value = false;
    };
    const open04 = function () {
      show04.value = true;
    };
    const close04 = function () {
      show04.value = false;
    };
    return {
      show,
      show01,
      show02,
      show03,
      show04,
      open,
      close,
      open01,
      close01,
      open02,
      close02,
      open03,
      close03,
      open04,
      close04,
    };
  },
});
<\/script>

<style scoped>
.box {
  position: relative;
  margin: 0px 10px;
}
</style>
`,
    path: "demos/components/Mask/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="绝对定位" tabindex="-1">绝对定位 <a class="header-anchor" href="#绝对定位" aria-label="Permalink to &quot;绝对定位&quot;">​</a></h2><p>注意：需要给父元素设置相对定位才可以进行盒子撑大。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="box">
    <h-button @click="open">打开</h-button>
    <h-mask absolute :value="show">
      <h-button @click="close">关闭</h-button>
    </h-mask>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref(false);
    const open = function () {
      console.info('打开');
      show.value = true;
    };
    const close = function () {
      console.info('关闭');
      show.value = false;
    };
    return {
      show,
      open,
      close,
    };
  },
});
<\/script>

<style scoped>
.box {
  position: relative;
  width: 200px;
  height: 200px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%),
    0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
`,
    path: "demos/components/Mask/demo2.vue"
  }, null, _parent));
  _push(`<h2 id="透明度" tabindex="-1">透明度 <a class="header-anchor" href="#透明度" aria-label="Permalink to &quot;透明度&quot;">​</a></h2><p>可以设置 <code>opacity</code>，即遮罩层的透明度（2.1.4之之后，默认值 0.5 -&gt; 1）</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="box">
    <h-button @click="open">打开</h-button>
    <h-mask :value="show" absolute :opacity="0.5">
      <h-button @click="close">关闭</h-button>
    </h-mask>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref(false);
    const open = function () {
      console.info('打开');
      show.value = true;
    };
    const close = function () {
      console.info('关闭');
      show.value = false;
    };
    return {
      show,
      open,
      close,
    };
  },
});
<\/script>

<style scoped>
.box {
  position: relative;
  width: 200px;
  height: 200px;
  box-shadow:
    0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%),
    0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
`,
    path: "demos/components/Mask/demo3.vue"
  }, null, _parent));
  _push(`<h2 id="层级" tabindex="-1">层级 <a class="header-anchor" href="#层级" aria-label="Permalink to &quot;层级&quot;">​</a></h2><p>设置遮罩层的层叠性的权重</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="box">
    <h-button @click="open">打开</h-button>
    <h-mask :value="show" :z-index="999">
      <h-button @click="close">关闭</h-button>
    </h-mask>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref(false);
    const open = function () {
      show.value = true;
    };
    const close = function () {
      show.value = false;
    };
    return {
      show,
      open,
      close,
    };
  },
});
<\/script>

<style scoped>
.box {
  position: relative;
}
</style>
`,
    path: "demos/components/Mask/demo4.vue"
  }, null, _parent));
  _push(`<h2 id="高斯模糊" tabindex="-1">高斯模糊 <a class="header-anchor" href="#高斯模糊" aria-label="Permalink to &quot;高斯模糊&quot;">​</a></h2><p>设置特定的模糊程度，以及透明度，以及遮罩层颜色</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="box">
    <img src="./1.png" alt="" />
    <h-mask absolute :is-fuzzification="true"></h-mask>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const show = ref(true);
    return {
      show,
    };
  },
});
<\/script>

<style scoped>
.box {
  position: relative;
  width: 200px;
  height: 200px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
`,
    path: "demos/components/Mask/demo5.vue"
  }, null, _parent));
  _push(`<h2>Mask Api</h2><h3>Mask Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>默认值：default</td><td><code>&#39;default&#39; | &#39;weak&#39; | &#39;strong&#39; | &#39;inverse&#39; | &#39;transparent&#39; | &#39;customize&#39;</code></td><td class="text-center">否</td><td>&#39;default&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td>是否展示遮罩层</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">absolute</td><td>设置遮罩层为绝对定位</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">opacity</td><td>设置透明度</td><td><code>number | string</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>遮罩层颜色</td><td><code>&#39;rgba(-,-,-,-)&#39; | &#39;rgb(-,-,-)&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>层级</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrim-class</td><td>设置遮罩层的class</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrim-style</td><td>设置遮罩层的style</td><td><code>CSSProperties</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-fuzzification</td><td>是否触发高斯模糊，若进行高斯模糊，必定会打开遮罩层</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">content-full-size</td><td>是否使内部容器占满父容器</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3>Mask Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click-mask</td><td rowspan="1">点击这遮罩层触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Mask.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Mask = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Mask as default
};
