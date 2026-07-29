import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const text = "这是一段很长很长很长很长很长很长很长很长很长很";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "other",
  __ssrInlineRender: true,
  setup(__props) {
    const dragging = ref(false);
    const handleDragStart = () => {
      dragging.value = true;
    };
    const handleDragEnd = () => {
      dragging.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_card = resolveComponent("h-card");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))} data-v-430bd08f>`);
      _push(ssrRenderComponent(_component_h_card, {
        draggable: "true",
        class: [
          "drag",
          "hover",
          {
            dragging: dragging.value
          }
        ],
        title: "可拖拽",
        onDragstart: handleDragStart,
        onDragend: handleDragEnd
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(text))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_card, {
        draggable: "true",
        class: "hover",
        title: "悬浮阴影",
        onDragstart: handleDragStart,
        onDragend: handleDragEnd
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(text))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Card/other.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const other = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-430bd08f"]]);
export {
  other as default
};
