import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Count.md","filePath":"en/demos/components/Count.md"}');
const _sfc_main = { name: "en/demos/components/Count.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Count</h1><p class="description">Displays a count with optional number formatting.</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-count :end-value="100" />\n</template>\n',
    path: "demos/components/Count/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="attributes" tabindex="-1">Attributes <a class="header-anchor" href="#attributes" aria-label="Permalink to &quot;Attributes&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="flex justify-space-between" style="width: 500px">\n    <div>展示数字,三位一个分隔符</div>\n    <h-count :end-value="987654321" :auto-play="false" />\n  </div>\n  <div class="flex justify-space-between" style="width: 500px">\n    <div>设置精度（toFixed）</div>\n    <h-count :end-value="987654321.8989" :auto-play="false" :decimal="2" />\n  </div>\n  <div class="flex justify-space-between" style="width: 500px">\n    <div>设置前后缀和延迟时间</div>\n    <h-count :end-value="100" :start-value="10" prefix="¥" suffix="RMB" :delay="1000" />\n  </div>\n</template>\n',
    path: "demos/components/Count/prop.vue"
  }, null, _parent));
  _push(`<h2 id="count-api" class="no-underline h2"><a href="#count-api" class="!no-underline">Count Api</a></h2><h3 id="count-props" class="no-underline h3"><a href="#count-props" class="!no-underline">Count Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">start-value</td><td>Configuration for start value.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">end-value</td><td>Configuration for end value.</td><td><code>number</code></td><td class="text-center">Yes</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">decimal</td><td>Configuration for decimal.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">step</td><td>Configuration for step.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-play</td><td>Configuration for auto play.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">delay</td><td>Configuration for delay.</td><td><code>number</code></td><td class="text-center">No</td><td>300</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">separator</td><td>Configuration for separator.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;,&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">extent</td><td>Configuration for extent.</td><td><code>number</code></td><td class="text-center">No</td><td>3</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prefix</td><td>Configuration for prefix.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">suffix</td><td>Configuration for suffix.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3 id="count-emits" class="no-underline h3"><a href="#count-emits" class="!no-underline">Count Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">Emitted when change changes.</td><td rowspan="1">( value: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>number</code></td><td>The value value.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Count.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Count = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Count as default
};
