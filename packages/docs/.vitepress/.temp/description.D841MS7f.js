import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "description",
  __ssrInlineRender: true,
  setup(__props) {
    const options = ref([]);
    const position = ref("right");
    function onSearch(val) {
      options.value = [];
      if (val) {
        new Array(10).fill(0).forEach((_, index) => {
          const value = val.repeat(index + 1);
          options.value.push({
            label: value,
            description: `第 ${index + 1} 个选项`,
            value
          });
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_auto_complete = resolveComponent("h-auto-complete");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "position" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: position.value,
                    "onUpdate:modelValue": ($event) => position.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "right" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "bottom" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "right" }),
                          createVNode(_component_h_radio, { label: "bottom" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: position.value,
                      "onUpdate:modelValue": ($event) => position.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "right" }),
                        createVNode(_component_h_radio, { label: "bottom" })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form_item, { label: "position" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: position.value,
                    "onUpdate:modelValue": ($event) => position.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "right" }),
                      createVNode(_component_h_radio, { label: "bottom" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_auto_complete, {
                    options: options.value,
                    "description-position": position.value,
                    onSearch
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_auto_complete, {
                      options: options.value,
                      "description-position": position.value,
                      onSearch
                    }, null, 8, ["options", "description-position"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_auto_complete, {
                    options: options.value,
                    "description-position": position.value,
                    onSearch
                  }, null, 8, ["options", "description-position"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/AutoComplete/description.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
