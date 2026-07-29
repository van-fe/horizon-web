import { resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_time = resolveComponent("h-time");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}><div class="mr-4"> 格式化 `);
  _push(ssrRenderComponent(_component_h_time, null, {
    default: withCtx((timeObj, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(`00${timeObj.hh ?? "00"}`.slice(-2))}-${ssrInterpolate(`00${timeObj.mm ?? "00"}`.slice(-2))}-${ssrInterpolate(`00${timeObj.ss ?? "00"}`.slice(-2))}`);
      } else {
        return [
          createTextVNode(toDisplayString(`00${timeObj.hh ?? "00"}`.slice(-2)) + "-" + toDisplayString(`00${timeObj.mm ?? "00"}`.slice(-2)) + "-" + toDisplayString(`00${timeObj.ss ?? "00"}`.slice(-2)), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div>${ssrInterpolate(new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 2)))} `);
  _push(ssrRenderComponent(_component_h_time, {
    "end-time": (/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 2)
  }, {
    default: withCtx((timeObj, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(`${timeObj.dd ?? "0"}天`)}${ssrInterpolate(`00${timeObj.hh ?? "00"}`.slice(-2))}小时${ssrInterpolate(`00${timeObj.mm ?? "00"}`.slice(-2))}分${ssrInterpolate(`00${timeObj.ss ?? "00"}`.slice(-2))}秒 `);
      } else {
        return [
          createTextVNode(toDisplayString(`${timeObj.dd ?? "0"}天`) + toDisplayString(`00${timeObj.hh ?? "00"}`.slice(-2)) + "小时" + toDisplayString(`00${timeObj.mm ?? "00"}`.slice(-2)) + "分" + toDisplayString(`00${timeObj.ss ?? "00"}`.slice(-2)) + "秒 ", 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Time/slot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const slot = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  slot as default
};
