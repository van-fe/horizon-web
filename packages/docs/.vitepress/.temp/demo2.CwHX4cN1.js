import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const show = ref(false);
    const open = function() {
      console.info("打开");
      show.value = true;
    };
    const close = function() {
      console.info("关闭");
      show.value = false;
    };
    return {
      show,
      open,
      close
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _component_h_mask = resolveComponent("h-mask");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "box" }, _attrs))} data-v-ab0588ef>`);
  _push(ssrRenderComponent(_component_h_button, { onClick: _ctx.open }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`打开`);
      } else {
        return [
          createTextVNode("打开")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_mask, {
    absolute: "",
    value: _ctx.show
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { onClick: _ctx.close }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`关闭`);
            } else {
              return [
                createTextVNode("关闭")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { onClick: _ctx.close }, {
            default: withCtx(() => [
              createTextVNode("关闭")
            ]),
            _: 1
          }, 8, ["onClick"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Mask/demo2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ab0588ef"]]);
export {
  demo2 as default
};
