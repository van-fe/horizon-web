import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const disabled = ref(false);
    const formModel = ref({
      val1: "",
      val2: "",
      val3: "",
      val4: ""
    });
    const rules = ref({
      val1: {
        max: 10,
        message: "Please enter less than 10 characters"
      },
      val2: {
        max: 10,
        message: "Please enter less than 10 characters"
      },
      val3: {
        max: 100,
        message: "Please enter less than 100 characters"
      },
      val4: {
        max: 100,
        message: "Please enter less than 100 characters"
      }
    });
    return {
      formModel,
      rules,
      disabled
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_switch = resolveComponent("h-switch");
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_input = resolveComponent("h-input");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_switch, {
    modelValue: _ctx.disabled,
    "onUpdate:modelValue": ($event) => _ctx.disabled = $event,
    label: "禁用",
    status: ""
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_form, {
    model: _ctx.formModel,
    rules: _ctx.rules
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_form_item, {
          label: "Input",
          prop: "val1"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.formModel.val1,
                "onUpdate:modelValue": ($event) => _ctx.formModel.val1 = $event,
                disabled: _ctx.disabled,
                maxlength: 10,
                "show-limit": ""
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.formModel.val1,
                  "onUpdate:modelValue": ($event) => _ctx.formModel.val1 = $event,
                  disabled: _ctx.disabled,
                  maxlength: 10,
                  "show-limit": ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, {
          label: "Input enable out of exceeded",
          prop: "val2"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.formModel.val2,
                "onUpdate:modelValue": ($event) => _ctx.formModel.val2 = $event,
                disabled: _ctx.disabled,
                maxlength: 10,
                "show-limit": "",
                "enable-out-of-exceeded": ""
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.formModel.val2,
                  "onUpdate:modelValue": ($event) => _ctx.formModel.val2 = $event,
                  disabled: _ctx.disabled,
                  maxlength: 10,
                  "show-limit": "",
                  "enable-out-of-exceeded": ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, {
          label: "Textarea",
          prop: "val3"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.formModel.val3,
                "onUpdate:modelValue": ($event) => _ctx.formModel.val3 = $event,
                disabled: _ctx.disabled,
                type: "textarea",
                maxlength: 100,
                rows: 3,
                "show-limit": ""
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.formModel.val3,
                  "onUpdate:modelValue": ($event) => _ctx.formModel.val3 = $event,
                  disabled: _ctx.disabled,
                  type: "textarea",
                  maxlength: 100,
                  rows: 3,
                  "show-limit": ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, {
          label: "Textarea enable out of exceeded",
          prop: "val4"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.formModel.val4,
                "onUpdate:modelValue": ($event) => _ctx.formModel.val4 = $event,
                disabled: _ctx.disabled,
                type: "textarea",
                maxlength: 100,
                rows: 1,
                "show-limit": "",
                "enable-out-of-exceeded": ""
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.formModel.val4,
                  "onUpdate:modelValue": ($event) => _ctx.formModel.val4 = $event,
                  disabled: _ctx.disabled,
                  type: "textarea",
                  maxlength: 100,
                  rows: 1,
                  "show-limit": "",
                  "enable-out-of-exceeded": ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_form_item, {
            label: "Input",
            prop: "val1"
          }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formModel.val1,
                "onUpdate:modelValue": ($event) => _ctx.formModel.val1 = $event,
                disabled: _ctx.disabled,
                maxlength: 10,
                "show-limit": ""
              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, {
            label: "Input enable out of exceeded",
            prop: "val2"
          }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formModel.val2,
                "onUpdate:modelValue": ($event) => _ctx.formModel.val2 = $event,
                disabled: _ctx.disabled,
                maxlength: 10,
                "show-limit": "",
                "enable-out-of-exceeded": ""
              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, {
            label: "Textarea",
            prop: "val3"
          }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formModel.val3,
                "onUpdate:modelValue": ($event) => _ctx.formModel.val3 = $event,
                disabled: _ctx.disabled,
                type: "textarea",
                maxlength: 100,
                rows: 3,
                "show-limit": ""
              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, {
            label: "Textarea enable out of exceeded",
            prop: "val4"
          }, {
            default: withCtx(() => [
              createVNode(_component_h_input, {
                modelValue: _ctx.formModel.val4,
                "onUpdate:modelValue": ($event) => _ctx.formModel.val4 = $event,
                disabled: _ctx.disabled,
                type: "textarea",
                maxlength: 100,
                rows: 1,
                "show-limit": "",
                "enable-out-of-exceeded": ""
              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Input/limit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const limit = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  limit as default
};
