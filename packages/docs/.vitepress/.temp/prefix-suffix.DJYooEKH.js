import { defineComponent, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as __default__ } from "./app.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  components: {
    AIcon: __default__
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_link = resolveComponent("h-link");
  const _component_a_icon = resolveComponent("a-icon");
  _push(`<!--[--><p>`);
  _push(ssrRenderComponent(_component_h_link, null, {
    suffix: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`...`);
      } else {
        return [
          createTextVNode("...")
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` And So on `);
      } else {
        return [
          createTextVNode(" And So on ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</p><p>`);
  _push(ssrRenderComponent(_component_h_link, {
    icon: "el-icon-edit",
    underline: false
  }, {
    prefix: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_a_icon, {
          name: "time",
          suffix: "2xs"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_a_icon, {
            name: "time",
            suffix: "2xs"
          })
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleString())} `);
      } else {
        return [
          createTextVNode(toDisplayString((/* @__PURE__ */ new Date()).toLocaleString()) + " ", 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</p><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Link/prefix-suffix.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const prefixSuffix = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  prefixSuffix as default
};
