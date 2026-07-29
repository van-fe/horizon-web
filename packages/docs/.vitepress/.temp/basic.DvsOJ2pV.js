import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
  __ssrInlineRender: true,
  setup(__props) {
    const align = ref("right");
    function onCurrentChange(currentPage) {
      console.info("current-page: ", currentPage);
    }
    function onSizeChange(size) {
      console.info("size: ", size);
    }
    function onModify(currentPage, pageSize) {
      console.info({ currentPage, pageSize });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_pagination = resolveComponent("h-pagination");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-position": "left",
        "label-vertical-align": "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "align" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_radio_group, {
                    modelValue: align.value,
                    "onUpdate:modelValue": ($event) => align.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_radio, { label: "left" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`left`);
                            } else {
                              return [
                                createTextVNode("left")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`center`);
                            } else {
                              return [
                                createTextVNode("center")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_radio, { label: "right" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`right`);
                            } else {
                              return [
                                createTextVNode("right")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_radio, { label: "left" }, {
                            default: withCtx(() => [
                              createTextVNode("left")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: "center" }, {
                            default: withCtx(() => [
                              createTextVNode("center")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_radio, { label: "right" }, {
                            default: withCtx(() => [
                              createTextVNode("right")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_radio_group, {
                      modelValue: align.value,
                      "onUpdate:modelValue": ($event) => align.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_radio, { label: "left" }, {
                          default: withCtx(() => [
                            createTextVNode("left")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: "center" }, {
                          default: withCtx(() => [
                            createTextVNode("center")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_radio, { label: "right" }, {
                          default: withCtx(() => [
                            createTextVNode("right")
                          ]),
                          _: 1
                        })
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
              createVNode(_component_h_form_item, { label: "align" }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio_group, {
                    modelValue: align.value,
                    "onUpdate:modelValue": ($event) => align.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_radio, { label: "left" }, {
                        default: withCtx(() => [
                          createTextVNode("left")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: "center" }, {
                        default: withCtx(() => [
                          createTextVNode("center")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: "right" }, {
                        default: withCtx(() => [
                          createTextVNode("right")
                        ]),
                        _: 1
                      })
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
      _push(ssrRenderComponent(_component_h_row, {
        gutter: 10,
        align: "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>当你页数不超过7页时</div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "当你页数不超过7页时")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_pagination, {
                    total: 50,
                    align: align.value,
                    onModify,
                    onCurrentChange,
                    onSizeChange
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_pagination, {
                      total: 50,
                      align: align.value,
                      onModify,
                      onCurrentChange,
                      onSizeChange
                    }, null, 8, ["align"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "当你页数不超过7页时")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 18 }, {
                default: withCtx(() => [
                  createVNode(_component_h_pagination, {
                    total: 50,
                    align: align.value,
                    onModify,
                    onCurrentChange,
                    onSizeChange
                  }, null, 8, ["align"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, {
        gutter: 10,
        align: "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>当你页数超过7页时</div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "当你页数超过7页时")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_pagination, {
                    total: 100,
                    align: align.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_pagination, {
                      total: 100,
                      align: align.value
                    }, null, 8, ["align"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "当你页数超过7页时")
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 18 }, {
                default: withCtx(() => [
                  createVNode(_component_h_pagination, {
                    total: 100,
                    align: align.value
                  }, null, 8, ["align"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Pagination/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
