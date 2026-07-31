import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/directives/v-draggable.md","filePath":"zh/demos/directives/v-draggable.md"}');
const _sfc_main = { name: "demos/directives/v-draggable.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>v-draggable</h1><p class="description">允许自由移动元素</p><h2 id="基本示例" tabindex="-1">基本示例 <a class="header-anchor" href="#基本示例" aria-label="Permalink to &quot;基本示例&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="drag-container">\n    <div v-draggable>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n.drag-container {\n  height: 200px;\n}\n\n.drag-container div {\n  height: 80px;\n  width: 80px;\n  background: #14798F;\n}\n\n</style>\n',
    path: "demos/directives/v-draggable/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="切换允许移动" tabindex="-1">切换允许移动 <a class="header-anchor" href="#切换允许移动" aria-label="Permalink to &quot;切换允许移动&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-switch v-model="enabled" label="允许移动" label-position="right" />
  <div class="drag-container">
    <div v-draggable="{ enabled }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const enabled = ref(true);
    return {
      enabled,
    };
  },
});
<\/script>

<style scoped>
.drag-container {
  height: 200px;
}

.drag-container div {
  height: 80px;
  width: 80px;
  background: #14798f;
}
</style>
`,
    path: "demos/directives/v-draggable/demo2.vue"
  }, null, _parent));
  _push(`<h2 id="draggable-api" class="no-underline h2"><a href="#draggable-api" class="!no-underline">Draggable Api</a></h2><h3 id="draggable-options" class="no-underline h3"><a href="#draggable-options" class="!no-underline">Draggable Options</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>是否必填</th><th>默认值</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">enabled</td><td rowspan="1">允许拖动</td><td rowspan="1">否</td><td rowspan="1">true</td><td rowspan="1"><code> Boolean as DirectiveOptionType&lt;boolean&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">position</td><td rowspan="1">元素的定位方式，默认是 <code>absolute</code>，某些情况下你可能需要 <code>fixed</code>。</td><td rowspan="1">否</td><td rowspan="1">&#39;absolute&#39;</td><td rowspan="1"><code> &#39;absolute&#39; | &#39;fixed&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">onMoveStart</td><td rowspan="1">开始移动时的回调函数</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> (e: MouseEvent) =&gt; void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">onMove</td><td rowspan="3">移动过程中的回调函数</td><td rowspan="3">否</td><td rowspan="3">-</td><td rowspan="3"><code> (clientX: number, clientY: number, e: MouseEvent) =&gt; void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clientX</td><td><code>number</code></td><td>触发点相对浏览器可视区域左侧距离</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clientY</td><td><code>number</code></td><td>触发点相对浏览器可视区域上侧距离</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">onMoveEnd</td><td rowspan="1">移动结束的回调函数</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> (e: MouseEvent) =&gt; void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/directives/v-draggable.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vDraggable = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vDraggable as default
};
