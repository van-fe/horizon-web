import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { p as currDayjs } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "format-cell-text",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    const formatCellText = (unit, value2) => {
      if (unit === "hours") {
        if (Number(value2) > 23) {
          return `次日 ${(Number(value2) - 24).toString().padStart(2, "0")}`;
        }
      }
      return value2;
    };
    const formatTriggerText = (day, text) => {
      if (day.diff(currDayjs().startOf("day"), "hours") > 23) {
        return `次日 ${text}`;
      } else return text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_time_picker = resolveComponent("h-time-picker");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_time_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "start-at": "8",
                    "end-at": "32",
                    "format-cell-text": formatCellText,
                    "format-trigger-text": formatTriggerText
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_time_picker, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      "start-at": "8",
                      "end-at": "32",
                      "format-cell-text": formatCellText,
                      "format-trigger-text": formatTriggerText
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
                  createVNode(_component_h_time_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    "start-at": "8",
                    "end-at": "32",
                    "format-cell-text": formatCellText,
                    "format-trigger-text": formatTriggerText
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/TimePicker/format-cell-text.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
