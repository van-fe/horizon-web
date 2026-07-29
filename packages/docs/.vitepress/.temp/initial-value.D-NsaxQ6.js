import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "initial-value",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = ref();
    const value2 = ref(void 0);
    const selectOptions = [
      { value: "", label: "上海" },
      { value: 2, label: "北京" },
      { value: 3, label: "合肥" },
      { value: 4, label: "深圳" },
      { value: 5, label: "杭州" },
      { value: 6, label: "天津" },
      { value: 7, label: "西安" },
      { value: 8, label: "南京" },
      { value: 9, label: "哈尔滨" },
      { value: 10, label: "香港" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, {
              xs: 12,
              md: 8,
              lg: 6,
              xl: 6,
              xxl: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>默认值为 null</div><div class="demo-description"${_scopeId2}> modelValue: ${ssrInterpolate(Object.prototype.toString.call(value1.value))} ${ssrInterpolate(value1.value)}</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "initial-value": null,
                    clearable: true,
                    "to-body": false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.value,
                              value: item.value,
                              label: item.label
                            }, null, 8, ["value", "label"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "默认值为 null"),
                    createVNode("div", { class: "demo-description" }, " modelValue: " + toDisplayString(Object.prototype.toString.call(value1.value)) + " " + toDisplayString(value1.value), 1),
                    createVNode(_component_h_select, {
                      modelValue: value1.value,
                      "onUpdate:modelValue": ($event) => value1.value = $event,
                      "initial-value": null,
                      clearable: true,
                      "to-body": false
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label
                          }, null, 8, ["value", "label"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, {
              xs: 12,
              md: 8,
              lg: 6,
              xl: 6,
              xxl: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>默认值为 []</div><div class="demo-description"${_scopeId2}> modelValue: ${ssrInterpolate(Object.prototype.toString.call(value2.value))} ${ssrInterpolate(value2.value)}</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    multiple: true,
                    "initial-value": [],
                    "to-body": false,
                    clearable: true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.value,
                              value: item.value,
                              label: item.label
                            }, null, 8, ["value", "label"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "默认值为 []"),
                    createVNode("div", { class: "demo-description" }, " modelValue: " + toDisplayString(Object.prototype.toString.call(value2.value)) + " " + toDisplayString(value2.value), 1),
                    createVNode(_component_h_select, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      multiple: true,
                      "initial-value": [],
                      "to-body": false,
                      clearable: true
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label
                          }, null, 8, ["value", "label"]);
                        }), 64))
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
              createVNode(_component_h_col, {
                xs: 12,
                md: 8,
                lg: 6,
                xl: 6,
                xxl: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "默认值为 null"),
                  createVNode("div", { class: "demo-description" }, " modelValue: " + toDisplayString(Object.prototype.toString.call(value1.value)) + " " + toDisplayString(value1.value), 1),
                  createVNode(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "initial-value": null,
                    clearable: true,
                    "to-body": false
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          value: item.value,
                          label: item.label
                        }, null, 8, ["value", "label"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024),
              createVNode(_component_h_col, {
                xs: 12,
                md: 8,
                lg: 6,
                xl: 6,
                xxl: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "默认值为 []"),
                  createVNode("div", { class: "demo-description" }, " modelValue: " + toDisplayString(Object.prototype.toString.call(value2.value)) + " " + toDisplayString(value2.value), 1),
                  createVNode(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    multiple: true,
                    "initial-value": [],
                    "to-body": false,
                    clearable: true
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          value: item.value,
                          label: item.label
                        }, null, 8, ["value", "label"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/initial-value.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
