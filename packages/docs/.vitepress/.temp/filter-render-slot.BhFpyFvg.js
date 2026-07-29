import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const currentVal1 = ref([]);
    const currentVal2 = ref([]);
    const options = ref([]);
    fetch(
      new URL("/cascader-options.json", import.meta.url).href
    ).then((res) => {
      res.json().then((value) => {
        options.value = value;
      });
    });
    return {
      currentVal1,
      currentVal2,
      options
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_cascader = resolveComponent("h-cascader");
  _push(ssrRenderComponent(_component_h_row, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>单选</div>`);
              _push3(ssrRenderComponent(_component_h_cascader, {
                modelValue: _ctx.currentVal1,
                "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                options: _ctx.options,
                filter: "",
                "to-body": false
              }, {
                searchPanelRender: withCtx((slotProps, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` 🐂 ${ssrInterpolate(slotProps.paths.map((path) => path.label).join("～"))}`);
                  } else {
                    return [
                      createTextVNode(" 🐂 " + toDisplayString(slotProps.paths.map((path) => path.label).join("～")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "单选"),
                createVNode(_component_h_cascader, {
                  modelValue: _ctx.currentVal1,
                  "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                  options: _ctx.options,
                  filter: "",
                  "to-body": false
                }, {
                  searchPanelRender: withCtx((slotProps) => [
                    createTextVNode(" 🐂 " + toDisplayString(slotProps.paths.map((path) => path.label).join("～")), 1)
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "options"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>多选</div>`);
              _push3(ssrRenderComponent(_component_h_cascader, {
                modelValue: _ctx.currentVal2,
                "onUpdate:modelValue": ($event) => _ctx.currentVal2 = $event,
                options: _ctx.options,
                filter: "",
                multiple: "",
                "to-body": false
              }, {
                searchPanelRender: withCtx((slotProps, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` 🐂 ${ssrInterpolate(slotProps.paths.map((path) => path.label).join("～"))}`);
                  } else {
                    return [
                      createTextVNode(" 🐂 " + toDisplayString(slotProps.paths.map((path) => path.label).join("～")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "多选"),
                createVNode(_component_h_cascader, {
                  modelValue: _ctx.currentVal2,
                  "onUpdate:modelValue": ($event) => _ctx.currentVal2 = $event,
                  options: _ctx.options,
                  filter: "",
                  multiple: "",
                  "to-body": false
                }, {
                  searchPanelRender: withCtx((slotProps) => [
                    createTextVNode(" 🐂 " + toDisplayString(slotProps.paths.map((path) => path.label).join("～")), 1)
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "options"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "单选"),
              createVNode(_component_h_cascader, {
                modelValue: _ctx.currentVal1,
                "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                options: _ctx.options,
                filter: "",
                "to-body": false
              }, {
                searchPanelRender: withCtx((slotProps) => [
                  createTextVNode(" 🐂 " + toDisplayString(slotProps.paths.map((path) => path.label).join("～")), 1)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "options"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "多选"),
              createVNode(_component_h_cascader, {
                modelValue: _ctx.currentVal2,
                "onUpdate:modelValue": ($event) => _ctx.currentVal2 = $event,
                options: _ctx.options,
                filter: "",
                multiple: "",
                "to-body": false
              }, {
                searchPanelRender: withCtx((slotProps) => [
                  createTextVNode(" 🐂 " + toDisplayString(slotProps.paths.map((path) => path.label).join("～")), 1)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "options"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/filter-render-slot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const filterRenderSlot = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  filterRenderSlot as default
};
