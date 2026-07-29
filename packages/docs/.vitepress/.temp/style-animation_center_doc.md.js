import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Center","description":"","frontmatter":{},"headers":[],"relativePath":"style-animation/center/doc.md","filePath":"zh/style-animation/center/doc.md"}');
const _sfc_main = { name: "style-animation/center/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="center" tabindex="-1">Center <a class="header-anchor" href="#center" aria-label="Permalink to &quot;Center&quot;">​</a></h1><p>元素居中是实际开发中很常见的需求，这里总结了相关的工具类供使用。</p><h2 id="文本居中" tabindex="-1">文本居中 <a class="header-anchor" href="#文本居中" aria-label="Permalink to &quot;文本居中&quot;">​</a></h2><p>使用 <a href="./../typography/doc">Typography</a> 中的 <code>text-center</code> 工具类实现水平居中，通过设置 <code>line-height</code> 实现垂直居中。</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>text-center</td><td>text-align: center;</td></tr></tbody></table><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="text-center" style="height: 60px; line-height: 60px;">\n    This is a center aligned text.\n  </div>\n</template>',
    path: "zh/style-animation/center/demos/textcenter.vue"
  }, null, _parent));
  _push(`<h2 id="自动边距居中" tabindex="-1">自动边距居中 <a class="header-anchor" href="#自动边距居中" aria-label="Permalink to &quot;自动边距居中&quot;">​</a></h2><p>如果元素具有固定的 <code>width</code>，可以使用 <a href="./../spacing/doc">Spacing</a> 中的 <code>mx-auto</code> 工具类实现水平居中。</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>mx-auto</td><td>margin-left: auto;<br>margin-right: auto;</td></tr></tbody></table><h2 id="demo-1" tabindex="-1">Demo <a class="header-anchor" href="#demo-1" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div style="height: 60px;">\n    <div class="mx-auto bg-primary" style="width: 50px; height: 50px;"></div>\n  </div>\n</template>',
    path: "zh/style-animation/center/demos/margin.vue"
  }, null, _parent));
  _push(`<h2 id="定位居中" tabindex="-1">定位居中 <a class="header-anchor" href="#定位居中" aria-label="Permalink to &quot;定位居中&quot;">​</a></h2><p>如果元素是 <code>absolute</code> 或 <code>fixed</code> 定位，可以使用 <a href="./../position/doc">Position</a> 中的工具类实现水平或垂直居中。</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>position-x-center</td><td>left: 50%;<br>transform: translateX(-50%);</td></tr><tr><td>position-y-center</td><td>top: 50%;<br>transform: translateY(-50%);</td></tr><tr><td>position-center</td><td>top: 50%;<br>left: 50%;<br>transform: translate(-50%, -50%);</td></tr></tbody></table><h2 id="demo-2" tabindex="-1">Demo <a class="header-anchor" href="#demo-2" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="relative" style="height: 60px;">\n    <div class="absolute position-center bg-primary" style="width: 50px; height: 50px;"></div>\n  </div>\n</template>',
    path: "zh/style-animation/center/demos/position.vue"
  }, null, _parent));
  _push(`<h2 id="flex-居中" tabindex="-1">Flex 居中 <a class="header-anchor" href="#flex-居中" aria-label="Permalink to &quot;Flex 居中&quot;">​</a></h2><p>如果元素是 <code>flex</code> 或 <code>inline-flex</code> 模型，可以使用 <a href="./../flex/doc">Flex</a> 中的工具类实现水平或垂直居中。</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>justify-center</td><td>justify-content: center;</td></tr><tr><td>align-center</td><td>align-items: center;</td></tr></tbody></table><h2 id="demo-3" tabindex="-1">Demo <a class="header-anchor" href="#demo-3" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="flex justify-center align-center" style="height: 60px;">\n    <div class="bg-primary" style="width: 50px; height: 50px;"></div>\n  </div>\n</template>',
    path: "zh/style-animation/center/demos/flex.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/center/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
