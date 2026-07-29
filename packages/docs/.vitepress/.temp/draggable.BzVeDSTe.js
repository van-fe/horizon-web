import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "draggable",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    const draggable = ref(true);
    const adsorbBottom = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_float_button = resolveComponent("h-float-button");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle",
        "label-width": "150px",
        "helper-placement": "after-label",
        "helper-theme": "dark",
        style: { "width": "400px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否显示" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: visible.value,
                    "onUpdate:modelValue": ($event) => visible.value = $event,
                    status: true,
                    "status-on-text": "显示",
                    "status-off-text": "隐藏"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: visible.value,
                      "onUpdate:modelValue": ($event) => visible.value = $event,
                      status: true,
                      "status-on-text": "显示",
                      "status-off-text": "隐藏"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, { label: "是否可拖拽" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: draggable.value,
                    "onUpdate:modelValue": ($event) => draggable.value = $event,
                    status: true,
                    "status-on-text": "开启",
                    "status-off-text": "关闭"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: draggable.value,
                      "onUpdate:modelValue": ($event) => draggable.value = $event,
                      status: true,
                      "status-on-text": "开启",
                      "status-off-text": "关闭"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_form_item, {
              label: "是否允许吸附在底部",
              helper: "如果拖拽距离离底部较近的话，则将其吸附在底部"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_switch, {
                    modelValue: adsorbBottom.value,
                    "onUpdate:modelValue": ($event) => adsorbBottom.value = $event,
                    status: true,
                    "status-on-text": "允许",
                    "status-off-text": "禁止"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_switch, {
                      modelValue: adsorbBottom.value,
                      "onUpdate:modelValue": ($event) => adsorbBottom.value = $event,
                      status: true,
                      "status-on-text": "允许",
                      "status-off-text": "禁止"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "是否显示" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: visible.value,
                    "onUpdate:modelValue": ($event) => visible.value = $event,
                    status: true,
                    "status-on-text": "显示",
                    "status-off-text": "隐藏"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "是否可拖拽" }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: draggable.value,
                    "onUpdate:modelValue": ($event) => draggable.value = $event,
                    status: true,
                    "status-on-text": "开启",
                    "status-off-text": "关闭"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, {
                label: "是否允许吸附在底部",
                helper: "如果拖拽距离离底部较近的话，则将其吸附在底部"
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_switch, {
                    modelValue: adsorbBottom.value,
                    "onUpdate:modelValue": ($event) => adsorbBottom.value = $event,
                    status: true,
                    "status-on-text": "允许",
                    "status-off-text": "禁止"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_float_button, {
        visible: visible.value,
        "adsorb-bottom": adsorbBottom.value,
        draggable: draggable.value,
        icon: "assistant"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/FloatButton/draggable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
