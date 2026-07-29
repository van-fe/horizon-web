import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Spacing","description":"","frontmatter":{},"headers":[],"relativePath":"en/style-animation/spacing/doc.md","filePath":"en/style-animation/spacing/doc.md"}');
const _sfc_main = { name: "en/style-animation/spacing/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="spacing" tabindex="-1">Spacing <a class="header-anchor" href="#spacing" aria-label="Permalink to &quot;Spacing&quot;">​</a></h1><p>Style utility classes for setting element margins and padding.</p><p>class rule: <code>{type}{direction}-{size}</code>.</p><p><strong>type</strong> is the type of spacing:</p><ul><li><code>m</code> - represents <code>margin</code></li><li><code>p</code> - represents <code>padding</code></li></ul><p><strong>direction</strong> is the direction of spacing:</p><ul><li><code>t</code> - represents <code>top</code></li><li><code>r</code> - represents <code>right</code></li><li><code>b</code> - represents <code>bottom</code></li><li><code>l</code> - represents <code>left</code></li><li><code>x</code> - represents <code>left</code> and <code>right</code></li><li><code>y</code> - represents <code>top</code> and <code>bottom</code></li><li><code>empty</code> - represents spacing for 4 sides</li></ul><p><strong>size</strong> is the size of spacing:</p><ul><li><code>0</code> - represents <code>0</code></li><li><code>1</code> - represents <code>4px</code></li><li><code>2</code> - represents <code>8px</code></li><li><code>3</code> - represents <code>12px</code></li><li><code>4</code> - represents <code>16px</code></li><li><code>5</code> - represents <code>20px</code></li><li><code>6</code> - represents <code>24px</code></li><li><code>7</code> - represents <code>28px</code></li><li><code>8</code> - represents <code>32px</code></li><li><code>9</code> - represents <code>36px</code></li><li><code>10</code> - represents <code>40px</code></li><li><code>11</code> - represents <code>44px</code></li><li><code>12</code> - represents <code>48px</code></li><li><code>13</code> - represents <code>52px</code></li><li><code>14</code> - represents <code>56px</code></li><li><code>15</code> - represents <code>60px</code></li><li><code>16</code> - represents <code>64px</code></li><li><code>auto</code> - represents <code>auto</code></li></ul><p>Examples:</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>m-1</td><td>margin: 4px;</td></tr><tr><td>mt-3</td><td>margin-top: 12px;</td></tr><tr><td>mr-5</td><td>margin-right: 20px;</td></tr><tr><td>p-2</td><td>padding: 8px;</td></tr><tr><td>pb-3</td><td>padding-bottom: 12px;</td></tr><tr><td>pl-5</td><td>padding-left: 20px;</td></tr><tr><td>mx-auto</td><td>margin-left: auto;<br>margin-right: auto;</td></tr><tr><td>py-10</td><td>padding-top: 40px;<br>padding-bottom: 40px;</td></tr></tbody></table><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="p-5">\n    <div class="mx-auto" style="width: 100px;">mx-auto</div>\n    <div class="py-3">py-3</div>\n    <span class="mb-3">mb-3</span>\n    <span class="ml-5">ml-5</span>\n  </div>\n</template>',
    path: "en/style-animation/spacing/demos/demo1.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/style-animation/spacing/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
