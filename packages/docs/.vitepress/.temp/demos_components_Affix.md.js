import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Affix.md","filePath":"zh/demos/components/Affix.md"}');
const _sfc_main = { name: "demos/components/Affix.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Affix</h1><p class="description">将页面元素固定在特定可视区域</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><p>固钉默认固定在页面顶部</p><p>固钉使用 <code>div</code> 包裹元素，所以如果需要修改样式，可以直接给予 <code>style.display</code> 为 <code>inline-block</code> 等值即可</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-affix style="display: inline-block">\n    <h-button>Affix top</h-button>\n  </h-affix>\n</template>',
    path: "demos/components/Affix/basic.vue"
  }, null, _parent));
  _push(`<h2 id="设定-offset" tabindex="-1">设定 offset <a class="header-anchor" href="#设定-offset" aria-label="Permalink to &quot;设定 offset&quot;">​</a></h2><p>如果希望固钉可以距滚动容器有距离，可以指定 <code>offset</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-affix :offset="64">\n    <h-button>Affix top with 64px offset</h-button>\n  </h-affix>\n</template>',
    path: "demos/components/Affix/offset.vue"
  }, null, _parent));
  _push(`<h2 id="指定容器" tabindex="-1">指定容器 <a class="header-anchor" href="#指定容器" aria-label="Permalink to &quot;指定容器&quot;">​</a></h2><p>固钉默认监听 <code>document.body</code> 的滚动事件，如果需要另外指定，可以设置 <code>target</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div id="scroll" class="target-wrapper">\n    <div class="target-container">\n      <h-affix target=".target-wrapper">\n        <h-button>Affix in container</h-button>\n      </h-affix>\n    </div>\n  </div>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.target-wrapper {\n  height: 200px;\n  border: 1px solid var(--h-border-default);\n  overflow: auto;\n}\n\n.target-container {\n  height: 1000px;\n  background: var(--h-bg-weak-activated);\n  padding-top: 50px;\n}\n</style>\n',
    path: "demos/components/Affix/target.vue"
  }, null, _parent));
  _push(`<h2 id="套层滚动容器" tabindex="-1">套层滚动容器 <a class="header-anchor" href="#套层滚动容器" aria-label="Permalink to &quot;套层滚动容器&quot;">​</a></h2><p>如果固钉所在容器的父级还可以滚动，如果不做特殊设置则无法准确保证元素在容器内</p><p>此时需要对父级滚动事件做监听</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div id="scroll-2" class="target-wrapper">
    <div class="target-container">
      <h-affix ref="affixDomRef" position="top" target="#scroll-2" :offset="20">
        <h-button>Affix in container and won't placed out of container</h-button>
      </h-affix>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const affixDomRef = ref();

function onScroll() {
  affixDomRef.value?.updatePosition();
}

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
<\/script>

<style scoped>
.target-wrapper {
  height: 200px;
  border: 1px solid var(--h-border-default);
  overflow: auto;
}

.target-container {
  height: 1000px;
  background: var(--h-bg-weak-activated);
  padding-top: 20px;
}
</style>
`,
    path: "demos/components/Affix/multiple-scroll-container.vue"
  }, null, _parent));
  _push(`<h2 id="固定底部" tabindex="-1">固定底部 <a class="header-anchor" href="#固定底部" aria-label="Permalink to &quot;固定底部&quot;">​</a></h2><p>可以设置 <code>position = &#39;bottom&#39;</code> 让固钉固定在底部</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-space>\n    <h-affix position="bottom" style="display: inline-block">\n      <h-button>Affix bottom</h-button>\n    </h-affix>\n    <h-affix position="bottom" :offset="100" style="display: inline-block">\n      <h-button>Affix bottom with 100px offset</h-button>\n    </h-affix>\n  </h-space>\n</template>\n',
    path: "demos/components/Affix/bottom.vue"
  }, null, _parent));
  _push(`<h2 id="affix-api" class="no-underline h2"><a href="#affix-api" class="!no-underline">Affix Api</a></h2><h3 id="affix-props" class="no-underline h3"><a href="#affix-props" class="!no-underline">Affix Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">offset</td><td>偏移距离</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">position</td><td>固钉位置</td><td><code>&#39;top&#39; | &#39;bottom&#39;</code></td><td class="text-center">否</td><td>&#39;top&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td>判断偏移的容器</td><td><code>string | HTMLElement</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>层级</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3 id="affix-exposes" class="no-underline h3"><a href="#affix-exposes" class="!no-underline">Affix Exposes</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">updatePosition</td><td rowspan="1">在存在多层滚动容器时，外层容器滚动后，需要用此更新位置</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Affix.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Affix = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Affix as default
};
