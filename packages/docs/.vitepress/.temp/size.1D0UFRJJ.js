import { resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_scrollbar = resolveComponent("h-scrollbar");
  const _component_h_popover = resolveComponent("h-popover");
  const _component_h_pop_content = resolveComponent("h-pop-content");
  const _component_h_button = resolveComponent("h-button");
  _push(ssrRenderComponent(_component_h_row, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title" data-v-f7bc3fb6${_scopeId2}>容器中使用 <code data-v-f7bc3fb6${_scopeId2}>medium</code></div>`);
              _push3(ssrRenderComponent(_component_h_scrollbar, { height: "400px" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(20, (item) => {
                      _push4(`<div class="item" data-v-f7bc3fb6${_scopeId3}>${ssrInterpolate(item)}</div>`);
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(20, (item) => {
                        return createVNode("div", {
                          key: item,
                          class: "item"
                        }, toDisplayString(item), 1);
                      }), 64))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, [
                  createTextVNode("容器中使用 "),
                  createVNode("code", null, "medium")
                ]),
                createVNode(_component_h_scrollbar, { height: "400px" }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(20, (item) => {
                      return createVNode("div", {
                        key: item,
                        class: "item"
                      }, toDisplayString(item), 1);
                    }), 64))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title" data-v-f7bc3fb6${_scopeId2}>弹窗中使用 <code data-v-f7bc3fb6${_scopeId2}>small</code></div>`);
              _push3(ssrRenderComponent(_component_h_popover, {
                placement: "bottom",
                "to-body": false
              }, {
                popper: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_pop_content, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_scrollbar, {
                            size: "small",
                            height: "400px"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`<!--[-->`);
                                ssrRenderList(20, (item) => {
                                  _push6(`<div class="item" style="${ssrRenderStyle({ "width": "300px" })}" data-v-f7bc3fb6${_scopeId5}>${ssrInterpolate(item)}</div>`);
                                });
                                _push6(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(), createBlock(Fragment, null, renderList(20, (item) => {
                                    return createVNode("div", {
                                      key: item,
                                      class: "item",
                                      style: { "width": "300px" }
                                    }, toDisplayString(item), 1);
                                  }), 64))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_scrollbar, {
                              size: "small",
                              height: "400px"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(20, (item) => {
                                  return createVNode("div", {
                                    key: item,
                                    class: "item",
                                    style: { "width": "300px" }
                                  }, toDisplayString(item), 1);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_pop_content, null, {
                        default: withCtx(() => [
                          createVNode(_component_h_scrollbar, {
                            size: "small",
                            height: "400px"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(20, (item) => {
                                return createVNode("div", {
                                  key: item,
                                  class: "item",
                                  style: { "width": "300px" }
                                }, toDisplayString(item), 1);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                reference: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_button, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Hover Me`);
                        } else {
                          return [
                            createTextVNode("Hover Me")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_button, null, {
                        default: withCtx(() => [
                          createTextVNode("Hover Me")
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
                createVNode("div", { class: "demo-title" }, [
                  createTextVNode("弹窗中使用 "),
                  createVNode("code", null, "small")
                ]),
                createVNode(_component_h_popover, {
                  placement: "bottom",
                  "to-body": false
                }, {
                  popper: withCtx(() => [
                    createVNode(_component_h_pop_content, null, {
                      default: withCtx(() => [
                        createVNode(_component_h_scrollbar, {
                          size: "small",
                          height: "400px"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(20, (item) => {
                              return createVNode("div", {
                                key: item,
                                class: "item",
                                style: { "width": "300px" }
                              }, toDisplayString(item), 1);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  reference: withCtx(() => [
                    createVNode(_component_h_button, null, {
                      default: withCtx(() => [
                        createTextVNode("Hover Me")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 18 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, [
                createTextVNode("容器中使用 "),
                createVNode("code", null, "medium")
              ]),
              createVNode(_component_h_scrollbar, { height: "400px" }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(20, (item) => {
                    return createVNode("div", {
                      key: item,
                      class: "item"
                    }, toDisplayString(item), 1);
                  }), 64))
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, [
                createTextVNode("弹窗中使用 "),
                createVNode("code", null, "small")
              ]),
              createVNode(_component_h_popover, {
                placement: "bottom",
                "to-body": false
              }, {
                popper: withCtx(() => [
                  createVNode(_component_h_pop_content, null, {
                    default: withCtx(() => [
                      createVNode(_component_h_scrollbar, {
                        size: "small",
                        height: "400px"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(20, (item) => {
                            return createVNode("div", {
                              key: item,
                              class: "item",
                              style: { "width": "300px" }
                            }, toDisplayString(item), 1);
                          }), 64))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                reference: withCtx(() => [
                  createVNode(_component_h_button, null, {
                    default: withCtx(() => [
                      createTextVNode("Hover Me")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Scrollbar/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const size = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f7bc3fb6"]]);
export {
  size as default
};
