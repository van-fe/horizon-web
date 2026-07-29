import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "initial-value",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    const value2 = ref();
    function onUpdate(val) {
      console.info("update: ", val);
    }
    function onChange(val) {
      console.info("change: ", val);
    }
    function onPick(val) {
      console.info("pick: ", val);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_date_picker = resolveComponent("h-date-picker");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(Object.prototype.toString.call(value.value))} `);
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": [($event) => value.value = $event, onUpdate],
                    type: "date",
                    "initial-value": null,
                    onChange,
                    onPick
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(toDisplayString(Object.prototype.toString.call(value.value)) + " ", 1),
                    createVNode(_component_h_date_picker, {
                      modelValue: value.value,
                      "onUpdate:modelValue": [($event) => value.value = $event, onUpdate],
                      type: "date",
                      "initial-value": null,
                      onChange,
                      onPick
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(Object.prototype.toString.call(value2.value))} `);
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": [($event) => value2.value = $event, onUpdate],
                    type: "date-range",
                    "initial-value": null,
                    onChange,
                    onPick
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(toDisplayString(Object.prototype.toString.call(value2.value)) + " ", 1),
                    createVNode(_component_h_date_picker, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": [($event) => value2.value = $event, onUpdate],
                      type: "date-range",
                      "initial-value": null,
                      onChange,
                      onPick
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(Object.prototype.toString.call(value.value)) + " ", 1),
                  createVNode(_component_h_date_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": [($event) => value.value = $event, onUpdate],
                    type: "date",
                    "initial-value": null,
                    onChange,
                    onPick
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(Object.prototype.toString.call(value2.value)) + " ", 1),
                  createVNode(_component_h_date_picker, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": [($event) => value2.value = $event, onUpdate],
                    type: "date-range",
                    "initial-value": null,
                    onChange,
                    onPick
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/DatePicker/initial-value.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
