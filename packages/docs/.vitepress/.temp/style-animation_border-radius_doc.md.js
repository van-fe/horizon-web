import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Border radius","description":"","frontmatter":{},"headers":[],"relativePath":"style-animation/border-radius/doc.md","filePath":"zh/style-animation/border-radius/doc.md"}');
const _sfc_main = { name: "style-animation/border-radius/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="border-radius" tabindex="-1">Border radius <a class="header-anchor" href="#border-radius" aria-label="Permalink to &quot;Border radius&quot;">​</a></h1><p>样式工具类，用来设置元素的圆角。</p><table class="md-table"><thead><tr><th>Class</th><th>Properties</th></tr></thead><tbody><tr><td>rounded-0</td><td>border-radius: 0;</td></tr><tr><td>rounded-sm</td><td>border-radius: var(--n-radius-base) / 2; /* 2px */</td></tr><tr><td>rounded</td><td>border-radius: var(--n-radius-base); /* 4px */</td></tr><tr><td>rounded-lg</td><td>border-radius: var(--n-radius-base) * 2; /* 8px */</td></tr><tr><td>rounded-xl</td><td>border-radius: var(--n-radius-base) * 3; /* 12px */</td></tr><tr><td>rounded-pill</td><td>border-radius: 99999px;</td></tr><tr><td>circle</td><td>border-radius: 50%;</td></tr></tbody></table><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <section class="flex">\n    <div class="rounded-0 white bg-primary text-center mr-3">rounded-0</div>\n    <div class="rounded-sm white bg-primary text-center mr-3">rounded-sm</div>\n    <div class="rounded white bg-primary text-center mr-3">rounded</div>\n    <div class="rounded-lg white bg-primary text-center mr-3">rounded-lg</div>\n    <div class="rounded-xl white bg-primary text-center mr-3">rounded-xl</div>\n    <div class="rounded-pill white bg-primary text-center mr-3" style="width: 160px">\n      rounded-pill\n    </div>\n    <div class="circle white bg-primary text-center mr-3">circle</div>\n  </section>\n</template>\n\n<style scoped>\ndiv {\n  width: 100px;\n  height: 100px;\n  line-height: 100px;\n}\n</style>\n',
    path: "zh/style-animation/border-radius/demos/demo1.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/border-radius/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
