import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Spacing","description":"","frontmatter":{},"headers":[],"relativePath":"style-animation/spacing/doc.md","filePath":"zh/style-animation/spacing/doc.md"}');
const _sfc_main = { name: "style-animation/spacing/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="spacing" tabindex="-1">Spacing <a class="header-anchor" href="#spacing" aria-label="Permalink to &quot;Spacing&quot;">​</a></h1><p>样式工具类，用来设置元素的内外边距。</p><p>class 规则：<code>{type}{direction}-{size}</code>。</p><p><strong>type</strong> 是边距的类型：</p><ul><li><code>m</code> - 表示 <code>margin</code></li><li><code>p</code> - 表示 <code>padding</code></li></ul><p><strong>direction</strong> 是边距的方向：</p><ul><li><code>t</code> - 表示 <code>top</code></li><li><code>r</code> - 表示 <code>right</code></li><li><code>b</code> - 表示 <code>bottom</code></li><li><code>l</code> - 表示 <code>left</code></li><li><code>x</code> - 表示 <code>left</code> 和 <code>right</code></li><li><code>y</code> - 表示 <code>top</code> 和 <code>bottom</code></li><li><code>空</code> - 表示 4 个边的边距</li></ul><p><strong>size</strong> 是边距的大小：</p><ul><li><code>0</code> - 表示 <code>0</code></li><li><code>1</code> - 表示 <code>4px</code></li><li><code>2</code> - 表示 <code>8px</code></li><li><code>3</code> - 表示 <code>12px</code></li><li><code>4</code> - 表示 <code>16px</code></li><li><code>5</code> - 表示 <code>20px</code></li><li><code>6</code> - 表示 <code>24px</code></li><li><code>7</code> - 表示 <code>28px</code></li><li><code>8</code> - 表示 <code>32px</code></li><li><code>9</code> - 表示 <code>36px</code></li><li><code>10</code> - 表示 <code>40px</code></li><li><code>11</code> - 表示 <code>44px</code></li><li><code>12</code> - 表示 <code>48px</code></li><li><code>13</code> - 表示 <code>52px</code></li><li><code>14</code> - 表示 <code>56px</code></li><li><code>15</code> - 表示 <code>60px</code></li><li><code>16</code> - 表示 <code>64px</code></li><li><code>auto</code> - 表示 <code>auto</code></li></ul><p>示例：</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>m-1</td><td>margin: 4px;</td></tr><tr><td>mt-3</td><td>margin-top: 12px;</td></tr><tr><td>mr-5</td><td>margin-right: 20px;</td></tr><tr><td>p-2</td><td>padding: 8px;</td></tr><tr><td>pb-3</td><td>padding-bottom: 12px;</td></tr><tr><td>pl-5</td><td>padding-left: 20px;</td></tr><tr><td>mx-auto</td><td>margin-left: auto;<br>margin-right: auto;</td></tr><tr><td>py-10</td><td>padding-top: 40px;<br>padding-bottom: 40px;</td></tr></tbody></table><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="p-5">\n    <div class="mx-auto" style="width: 100px;">mx-auto</div>\n    <div class="py-3">py-3</div>\n    <span class="mb-3">mb-3</span>\n    <span class="ml-5">ml-5</span>\n  </div>\n</template>',
    path: "zh/style-animation/spacing/demos/demo1.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/spacing/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
