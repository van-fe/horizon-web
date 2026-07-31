import { defineComponent, ref, resolveComponent, withCtx, createVNode, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "virtual-scroller",
  __ssrInlineRender: true,
  setup(__props) {
    const options = new Array(50).fill(0).map((_, index) => {
      const value = faker.person.fullName();
      return {
        label: value,
        value,
        description: index % 2 === 0 ? void 0 : faker.location.county(),
        disabled: index % 5 === 0
      };
    });
    const value1 = ref();
    const value2 = ref([options[12].value, options[15].value]);
    const descriptionPosition = ref("right");
    function onReachBottom() {
      console.info("reach bottom");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "description-position" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: descriptionPosition.value,
                    "onUpdate:modelValue": ($event) => descriptionPosition.value = $event
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
                      modelValue: descriptionPosition.value,
                      "onUpdate:modelValue": ($event) => descriptionPosition.value = $event
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
              createVNode(_component_h_form_item, { label: "description-position" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: descriptionPosition.value,
                    "onUpdate:modelValue": ($event) => descriptionPosition.value = $event
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
                  _push3(`<div class="demo-title"${_scopeId2}>单选</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "to-body": false,
                    filterable: "",
                    options: unref(options),
                    "description-position": descriptionPosition.value,
                    onOptionListReachBottom: onReachBottom
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_select, {
                      modelValue: value1.value,
                      "onUpdate:modelValue": ($event) => value1.value = $event,
                      "to-body": false,
                      filterable: "",
                      options: unref(options),
                      "description-position": descriptionPosition.value,
                      onOptionListReachBottom: onReachBottom
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "description-position"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "to-body": false,
                    filterable: "",
                    multiple: "",
                    options: unref(options),
                    "description-position": descriptionPosition.value,
                    "collapse-tags": true,
                    "collapse-tags-tooltip": true,
                    onOptionListReachBottom: onReachBottom
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(_component_h_select, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      "to-body": false,
                      filterable: "",
                      multiple: "",
                      options: unref(options),
                      "description-position": descriptionPosition.value,
                      "collapse-tags": true,
                      "collapse-tags-tooltip": true,
                      onOptionListReachBottom: onReachBottom
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "description-position"])
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
                  createVNode(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "to-body": false,
                    filterable: "",
                    options: unref(options),
                    "description-position": descriptionPosition.value,
                    onOptionListReachBottom: onReachBottom
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "description-position"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "to-body": false,
                    filterable: "",
                    multiple: "",
                    options: unref(options),
                    "description-position": descriptionPosition.value,
                    "collapse-tags": true,
                    "collapse-tags-tooltip": true,
                    onOptionListReachBottom: onReachBottom
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "description-position"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/virtual-scroller.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
