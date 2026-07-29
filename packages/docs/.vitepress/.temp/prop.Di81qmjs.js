import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_count = resolveComponent("h-count");
  _push(`<!--[--><div class="flex justify-space-between" style="${ssrRenderStyle({ "width": "500px" })}"><div>展示数字,三位一个分隔符</div>`);
  _push(ssrRenderComponent(_component_h_count, {
    "end-value": 987654321,
    "auto-play": false
  }, null, _parent));
  _push(`</div><div class="flex justify-space-between" style="${ssrRenderStyle({ "width": "500px" })}"><div>设置精度（toFixed）</div>`);
  _push(ssrRenderComponent(_component_h_count, {
    "end-value": 9876543218989e-4,
    "auto-play": false,
    decimal: 2
  }, null, _parent));
  _push(`</div><div class="flex justify-space-between" style="${ssrRenderStyle({ "width": "500px" })}"><div>设置前后缀和延迟时间</div>`);
  _push(ssrRenderComponent(_component_h_count, {
    "end-value": 100,
    "start-value": 10,
    prefix: "¥",
    suffix: "RMB",
    delay: 1e3
  }, null, _parent));
  _push(`</div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Count/prop.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const prop = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  prop as default
};
