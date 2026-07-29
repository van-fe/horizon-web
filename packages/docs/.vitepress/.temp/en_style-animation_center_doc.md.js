import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Center","description":"","frontmatter":{},"headers":[],"relativePath":"en/style-animation/center/doc.md","filePath":"en/style-animation/center/doc.md"}');
const _sfc_main = { name: "en/style-animation/center/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="center" tabindex="-1">Center <a class="header-anchor" href="#center" aria-label="Permalink to &quot;Center&quot;">​</a></h1><p>Element centering is a very common requirement in actual development. Here are summarized related utility classes for use.</p><h2 id="text-center" tabindex="-1">Text Center <a class="header-anchor" href="#text-center" aria-label="Permalink to &quot;Text Center&quot;">​</a></h2><p>Use the <code>text-center</code> utility class in <a href="./../typography/doc">Typography</a> to achieve horizontal centering, and set <code>line-height</code> to achieve vertical centering.</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>text-center</td><td>text-align: center;</td></tr></tbody></table><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="text-center" style="height: 60px; line-height: 60px;">\n    This is a center aligned text.\n  </div>\n</template>',
    path: "en/style-animation/center/demos/textcenter.vue"
  }, null, _parent));
  _push(`<h2 id="auto-margin-center" tabindex="-1">Auto Margin Center <a class="header-anchor" href="#auto-margin-center" aria-label="Permalink to &quot;Auto Margin Center&quot;">​</a></h2><p>If the element has a fixed <code>width</code>, you can use the <code>mx-auto</code> utility class in <a href="./../spacing/doc">Spacing</a> to achieve horizontal centering.</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>mx-auto</td><td>margin-left: auto;<br>margin-right: auto;</td></tr></tbody></table><h2 id="demo-1" tabindex="-1">Demo <a class="header-anchor" href="#demo-1" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div style="height: 60px;">\n    <div class="mx-auto bg-primary" style="width: 50px; height: 50px;"></div>\n  </div>\n</template>',
    path: "en/style-animation/center/demos/margin.vue"
  }, null, _parent));
  _push(`<h2 id="position-center" tabindex="-1">Position Center <a class="header-anchor" href="#position-center" aria-label="Permalink to &quot;Position Center&quot;">​</a></h2><p>If the element is <code>absolute</code> or <code>fixed</code> positioned, you can use utility classes in <a href="./../position/doc">Position</a> to achieve horizontal or vertical centering.</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>position-x-center</td><td>left: 50%;<br>transform: translateX(-50%);</td></tr><tr><td>position-y-center</td><td>top: 50%;<br>transform: translateY(-50%);</td></tr><tr><td>position-center</td><td>top: 50%;<br>left: 50%;<br>transform: translate(-50%, -50%);</td></tr></tbody></table><h2 id="demo-2" tabindex="-1">Demo <a class="header-anchor" href="#demo-2" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="relative" style="height: 60px;">\n    <div class="absolute position-center bg-primary" style="width: 50px; height: 50px;"></div>\n  </div>\n</template>',
    path: "en/style-animation/center/demos/position.vue"
  }, null, _parent));
  _push(`<h2 id="flex-center" tabindex="-1">Flex Center <a class="header-anchor" href="#flex-center" aria-label="Permalink to &quot;Flex Center&quot;">​</a></h2><p>If the element is <code>flex</code> or <code>inline-flex</code> model, you can use utility classes in <a href="./../flex/doc">Flex</a> to achieve horizontal or vertical centering.</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>justify-center</td><td>justify-content: center;</td></tr><tr><td>align-center</td><td>align-items: center;</td></tr></tbody></table><h2 id="demo-3" tabindex="-1">Demo <a class="header-anchor" href="#demo-3" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="flex justify-center align-center" style="height: 60px;">\n    <div class="bg-primary" style="width: 50px; height: 50px;"></div>\n  </div>\n</template>',
    path: "en/style-animation/center/demos/flex.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/style-animation/center/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
