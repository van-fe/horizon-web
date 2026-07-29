import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const value = ref(1);
    return {
      value
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_input_number = resolveComponent("h-input-number");
  _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 12 }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>默认（居右）</div>`);
              _push3(ssrRenderComponent(_component_h_input_number, {
                modelValue: _ctx.value,
                "onUpdate:modelValue": ($event) => _ctx.value = $event,
                min: 0
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "默认（居右）"),
                createVNode(_component_h_input_number, {
                  modelValue: _ctx.value,
                  "onUpdate:modelValue": ($event) => _ctx.value = $event,
                  min: 0
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>两侧</div>`);
              _push3(ssrRenderComponent(_component_h_input_number, {
                modelValue: _ctx.value,
                "onUpdate:modelValue": ($event) => _ctx.value = $event,
                "controls-position": "between",
                min: 0
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "两侧"),
                createVNode(_component_h_input_number, {
                  modelValue: _ctx.value,
                  "onUpdate:modelValue": ($event) => _ctx.value = $event,
                  "controls-position": "between",
                  min: 0
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 8 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>隐藏</div>`);
              _push3(ssrRenderComponent(_component_h_input_number, {
                modelValue: _ctx.value,
                "onUpdate:modelValue": ($event) => _ctx.value = $event,
                controls: false,
                min: 0
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "隐藏"),
                createVNode(_component_h_input_number, {
                  modelValue: _ctx.value,
                  "onUpdate:modelValue": ($event) => _ctx.value = $event,
                  controls: false,
                  min: 0
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "默认（居右）"),
              createVNode(_component_h_input_number, {
                modelValue: _ctx.value,
                "onUpdate:modelValue": ($event) => _ctx.value = $event,
                min: 0
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "两侧"),
              createVNode(_component_h_input_number, {
                modelValue: _ctx.value,
                "onUpdate:modelValue": ($event) => _ctx.value = $event,
                "controls-position": "between",
                min: 0
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 8 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "隐藏"),
              createVNode(_component_h_input_number, {
                modelValue: _ctx.value,
                "onUpdate:modelValue": ($event) => _ctx.value = $event,
                controls: false,
                min: 0
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/InputNumber/controls-position.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const controlsPosition = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  controlsPosition as default
};
