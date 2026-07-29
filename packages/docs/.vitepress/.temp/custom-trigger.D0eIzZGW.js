import { defineComponent, ref, watch, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const cascaderFilterRef = ref(null);
    const currentVal1 = ref([]);
    const selectRenderInputValue = ref("");
    const options = ref([]);
    fetch(
      new URL("/cascader-options.json", import.meta.url).href
    ).then((res) => {
      res.json().then((value) => {
        options.value = value;
      });
    });
    watch(selectRenderInputValue, (newValue) => {
      var _a, _b;
      if (cascaderFilterRef.value) {
        (_b = (_a = cascaderFilterRef.value).inputChange) == null ? void 0 : _b.call(_a, newValue);
      }
    });
    return {
      currentVal1,
      options,
      selectRenderInputValue,
      cascaderFilterRef
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_cascader = resolveComponent("h-cascader");
  const _component_h_input = resolveComponent("h-input");
  _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_cascader, {
                ref: "cascaderFilterRef",
                modelValue: _ctx.currentVal1,
                "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                options: _ctx.options,
                "expand-trigger": "click",
                filter: true,
                "to-body": false
              }, {
                default: withCtx(({ visible: panelVisible }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div${_scopeId3}> 完全自定义的内容，可以点击我： `);
                    if (_ctx.currentVal1.length > 0) {
                      _push4(`<p${_scopeId3}>${ssrInterpolate(_ctx.currentVal1)}</p>`);
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(ssrRenderComponent(_component_h_input, {
                      modelValue: _ctx.selectRenderInputValue,
                      "onUpdate:modelValue": ($event) => _ctx.selectRenderInputValue = $event
                    }, null, _parent4, _scopeId3));
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        onClick: () => panelVisible.value = true
                      }, [
                        createTextVNode(" 完全自定义的内容，可以点击我： "),
                        _ctx.currentVal1.length > 0 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(_ctx.currentVal1), 1)) : createCommentVNode("", true),
                        createVNode(_component_h_input, {
                          modelValue: _ctx.selectRenderInputValue,
                          "onUpdate:modelValue": ($event) => _ctx.selectRenderInputValue = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ], 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_cascader, {
                  ref: "cascaderFilterRef",
                  modelValue: _ctx.currentVal1,
                  "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                  options: _ctx.options,
                  "expand-trigger": "click",
                  filter: true,
                  "to-body": false
                }, {
                  default: withCtx(({ visible: panelVisible }) => [
                    createVNode("div", {
                      onClick: () => panelVisible.value = true
                    }, [
                      createTextVNode(" 完全自定义的内容，可以点击我： "),
                      _ctx.currentVal1.length > 0 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(_ctx.currentVal1), 1)) : createCommentVNode("", true),
                      createVNode(_component_h_input, {
                        modelValue: _ctx.selectRenderInputValue,
                        "onUpdate:modelValue": ($event) => _ctx.selectRenderInputValue = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ], 8, ["onClick"])
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
              createVNode(_component_h_cascader, {
                ref: "cascaderFilterRef",
                modelValue: _ctx.currentVal1,
                "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                options: _ctx.options,
                "expand-trigger": "click",
                filter: true,
                "to-body": false
              }, {
                default: withCtx(({ visible: panelVisible }) => [
                  createVNode("div", {
                    onClick: () => panelVisible.value = true
                  }, [
                    createTextVNode(" 完全自定义的内容，可以点击我： "),
                    _ctx.currentVal1.length > 0 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(_ctx.currentVal1), 1)) : createCommentVNode("", true),
                    createVNode(_component_h_input, {
                      modelValue: _ctx.selectRenderInputValue,
                      "onUpdate:modelValue": ($event) => _ctx.selectRenderInputValue = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ], 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/custom-trigger.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customTrigger = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  customTrigger as default
};
