import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { $ as $message } from "./app.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    const formData = ref({
      username: "",
      email: "",
      notes: ""
    });
    const labelPosition2 = ref("top");
    const labelJustifyAlign = ref("left");
    const labelVerticalAlign = ref("top");
    const submit = () => {
      console.info("formData:", formData.value);
      $message.success("Submit");
    };
    return {
      formData,
      labelPosition: labelPosition2,
      labelJustifyAlign,
      labelVerticalAlign,
      submit
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_radio_group = resolveComponent("h-radio-group");
  const _component_h_radio_button = resolveComponent("h-radio-button");
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_input = resolveComponent("h-input");
  const _component_h_button = resolveComponent("h-button");
  _push(`<!--[--><div class="flex align-center mb-6"><div class="mr-4">标签位置</div>`);
  _push(ssrRenderComponent(_component_h_radio_group, {
    modelValue: _ctx.labelPosition,
    "onUpdate:modelValue": ($event) => _ctx.labelPosition = $event,
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_radio_button, { label: "top" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_radio_button, { label: "left" }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_radio_button, { label: "top" }),
          createVNode(_component_h_radio_button, { label: "left" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="ml-6 mr-4">水平对齐</div>`);
  _push(ssrRenderComponent(_component_h_radio_group, {
    modelValue: _ctx.labelJustifyAlign,
    "onUpdate:modelValue": ($event) => _ctx.labelJustifyAlign = $event,
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_radio_button, { label: "left" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_radio_button, { label: "right" }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_radio_button, { label: "left" }),
          createVNode(_component_h_radio_button, { label: "right" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="ml-6 mr-4">垂直对齐</div>`);
  _push(ssrRenderComponent(_component_h_radio_group, {
    modelValue: _ctx.labelVerticalAlign,
    "onUpdate:modelValue": ($event) => _ctx.labelVerticalAlign = $event,
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_radio_button, { label: "top" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_radio_button, { label: "middle" }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_radio_button, { label: "top" }),
          createVNode(_component_h_radio_button, { label: "middle" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_h_form, {
    "label-position": _ctx.labelPosition,
    "label-justify-align": _ctx.labelJustifyAlign,
    "label-vertical-align": _ctx.labelVerticalAlign
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_form_item, { label: "User name" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.formData.username,
                "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.formData.username,
                  "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, { label: "Email" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.formData.email,
                "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.formData.email,
                  "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, { label: "Notes" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.formData.notes,
                "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                type: "textarea"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.formData.notes,
                  "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                  type: "textarea"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, null, {
          label: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) ;
            else {
              return [];
            }
          }),
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_button, { onClick: _ctx.submit }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Submit`);
                  } else {
                    return [
                      createTextVNode("Submit")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_button, { onClick: _ctx.submit }, {
                  default: withCtx(() => [
                    createTextVNode("Submit")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_form_item, { label: "User name" }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formData.username,
                "onUpdate:modelValue": ($event) => _ctx.formData.username = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, { label: "Email" }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formData.email,
                "onUpdate:modelValue": ($event) => _ctx.formData.email = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, { label: "Notes" }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formData.notes,
                "onUpdate:modelValue": ($event) => _ctx.formData.notes = $event,
                type: "textarea"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, null, {
            label: withCtx(() => []),
            default: withCtx(() => [
              createVNode(_component_h_button, { onClick: _ctx.submit }, {
                default: withCtx(() => [
                  createTextVNode("Submit")
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Form/label-position.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const labelPosition = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  labelPosition as default
};
