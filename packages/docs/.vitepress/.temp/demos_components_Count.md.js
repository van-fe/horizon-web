import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Count.md","filePath":"zh/demos/components/Count.md"}');
const _sfc_main = { name: "demos/components/Count.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Count</h1><p class="description">用于计数，并且可以提供格式化显示数字的能力</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-count :end-value="100" />\n</template>\n',
    path: "demos/components/Count/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="flex justify-space-between" style="width: 500px">\n    <div>展示数字,三位一个分隔符</div>\n    <h-count :end-value="987654321" :auto-play="false" />\n  </div>\n  <div class="flex justify-space-between" style="width: 500px">\n    <div>设置精度（toFixed）</div>\n    <h-count :end-value="987654321.8989" :auto-play="false" :decimal="2" />\n  </div>\n  <div class="flex justify-space-between" style="width: 500px">\n    <div>设置前后缀和延迟时间</div>\n    <h-count :end-value="100" :start-value="10" prefix="¥" suffix="RMB" :delay="1000" />\n  </div>\n</template>\n',
    path: "demos/components/Count/prop.vue"
  }, null, _parent));
  _push(`<h2 id="count-api" class="no-underline h2"><a href="#count-api" class="!no-underline">Count Api</a></h2><h3 id="count-props" class="no-underline h3"><a href="#count-props" class="!no-underline">Count Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">start-value</td><td>开始值</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">end-value</td><td>结束值</td><td><code>number</code></td><td class="text-center">是</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">decimal</td><td>小数位数</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">step</td><td>递增步长(10的幂指数)</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-play</td><td>自动播放</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">delay</td><td>setTimeout每次延迟的毫秒数(&gt;=4)</td><td><code>number</code></td><td class="text-center">否</td><td>300</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">separator</td><td>分隔符</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;,&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">extent</td><td>分隔长度</td><td><code>number</code></td><td class="text-center">否</td><td>3</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prefix</td><td>前缀</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">suffix</td><td>后缀</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3 id="count-emits" class="no-underline h3"><a href="#count-emits" class="!no-underline">Count Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">显示内容变化</td><td rowspan="1">( value: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>number</code></td><td>当前变化的值</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Count.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Count = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Count as default
};
