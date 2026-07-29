import { defineComponent, ref, h, onMounted, resolveComponent, withCtx, createTextVNode, createVNode, withModifiers, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-render",
  __ssrInlineRender: true,
  setup(__props) {
    const renderTreeData = ref([
      {
        value: "guide",
        label: "Guide",
        children: [
          {
            value: "disciplines",
            label: "Disciplines"
          },
          {
            value: "navigation",
            label: (data) => h(
              "div",
              {
                style: "color: var(--h-text-warning-default)"
              },
              ["😂 ", data.value]
            ),
            children: [
              {
                value: "side nav",
                label: "Side Navigation"
              },
              {
                value: "top nav",
                label: "Top Navigation"
              }
            ]
          }
        ]
      }
    ]);
    function action(command) {
      $message.success(command);
    }
    const baseTreeData = ref([]);
    onMounted(() => {
      fetch(new URL("/tree-data.json", import.meta.url).href).then((res) => res.json()).then((res) => {
        baseTreeData.value = res;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tree_select = resolveComponent("h-tree-select");
      const _component_h_dropdown = resolveComponent("h-dropdown");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_dropdown_menu = resolveComponent("h-dropdown-menu");
      const _component_h_dropdown_item = resolveComponent("h-dropdown-item");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-6e5ccac3${_scopeId2}>自定义渲染全部节点</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    multiple: true,
                    "to-body": false
                  }, {
                    treeNodeRender: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="tree-item" data-v-6e5ccac3${_scopeId3}>${ssrInterpolate(data.label)} (${ssrInterpolate(data.value)}) `);
                        _push4(ssrRenderComponent(_component_h_dropdown, { onCommand: action }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_h_button, {
                                icon: "ellipsis",
                                type: "normal",
                                size: "small",
                                text: true,
                                onClick: () => {
                                }
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_h_dropdown_menu, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_h_dropdown_item, {
                                      command: "view",
                                      icon: "eye"
                                    }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`查看`);
                                        } else {
                                          return [
                                            createTextVNode("查看")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_h_dropdown_item, {
                                      command: "edit",
                                      icon: "edit"
                                    }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`修改`);
                                        } else {
                                          return [
                                            createTextVNode("修改")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_h_dropdown_item, {
                                        command: "view",
                                        icon: "eye"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("查看")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_h_dropdown_item, {
                                        command: "edit",
                                        icon: "edit"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("修改")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_h_button, {
                                  icon: "ellipsis",
                                  type: "normal",
                                  size: "small",
                                  text: true,
                                  onClick: withModifiers(() => {
                                  }, ["stop"])
                                }, null, 8, ["onClick"]),
                                createVNode(_component_h_dropdown_menu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_h_dropdown_item, {
                                      command: "view",
                                      icon: "eye"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("查看")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_dropdown_item, {
                                      command: "edit",
                                      icon: "edit"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("修改")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "tree-item" }, [
                            createTextVNode(toDisplayString(data.label) + " (" + toDisplayString(data.value) + ") ", 1),
                            createVNode(_component_h_dropdown, { onCommand: action }, {
                              default: withCtx(() => [
                                createVNode(_component_h_button, {
                                  icon: "ellipsis",
                                  type: "normal",
                                  size: "small",
                                  text: true,
                                  onClick: withModifiers(() => {
                                  }, ["stop"])
                                }, null, 8, ["onClick"]),
                                createVNode(_component_h_dropdown_menu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_h_dropdown_item, {
                                      command: "view",
                                      icon: "eye"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("查看")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_h_dropdown_item, {
                                      command: "edit",
                                      icon: "edit"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("修改")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "自定义渲染全部节点"),
                    createVNode(_component_h_tree_select, {
                      "tree-data": baseTreeData.value,
                      multiple: true,
                      "to-body": false
                    }, {
                      treeNodeRender: withCtx(({ data }) => [
                        createVNode("div", { class: "tree-item" }, [
                          createTextVNode(toDisplayString(data.label) + " (" + toDisplayString(data.value) + ") ", 1),
                          createVNode(_component_h_dropdown, { onCommand: action }, {
                            default: withCtx(() => [
                              createVNode(_component_h_button, {
                                icon: "ellipsis",
                                type: "normal",
                                size: "small",
                                text: true,
                                onClick: withModifiers(() => {
                                }, ["stop"])
                              }, null, 8, ["onClick"]),
                              createVNode(_component_h_dropdown_menu, null, {
                                default: withCtx(() => [
                                  createVNode(_component_h_dropdown_item, {
                                    command: "view",
                                    icon: "eye"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("查看")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_h_dropdown_item, {
                                    command: "edit",
                                    icon: "edit"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("修改")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }, 8, ["tree-data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-6e5ccac3${_scopeId2}>自定义渲染指定节点</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    "tree-data": renderTreeData.value,
                    multiple: true,
                    "to-body": false
                  }, {
                    treeNodeRender: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div data-v-6e5ccac3${_scopeId3}>${ssrInterpolate(data.label)} (${ssrInterpolate(data.value)})</div>`);
                      } else {
                        return [
                          createVNode("div", null, toDisplayString(data.label) + " (" + toDisplayString(data.value) + ")", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "自定义渲染指定节点"),
                    createVNode(_component_h_tree_select, {
                      "tree-data": renderTreeData.value,
                      multiple: true,
                      "to-body": false
                    }, {
                      treeNodeRender: withCtx(({ data }) => [
                        createVNode("div", null, toDisplayString(data.label) + " (" + toDisplayString(data.value) + ")", 1)
                      ]),
                      _: 1
                    }, 8, ["tree-data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "自定义渲染全部节点"),
                  createVNode(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    multiple: true,
                    "to-body": false
                  }, {
                    treeNodeRender: withCtx(({ data }) => [
                      createVNode("div", { class: "tree-item" }, [
                        createTextVNode(toDisplayString(data.label) + " (" + toDisplayString(data.value) + ") ", 1),
                        createVNode(_component_h_dropdown, { onCommand: action }, {
                          default: withCtx(() => [
                            createVNode(_component_h_button, {
                              icon: "ellipsis",
                              type: "normal",
                              size: "small",
                              text: true,
                              onClick: withModifiers(() => {
                              }, ["stop"])
                            }, null, 8, ["onClick"]),
                            createVNode(_component_h_dropdown_menu, null, {
                              default: withCtx(() => [
                                createVNode(_component_h_dropdown_item, {
                                  command: "view",
                                  icon: "eye"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("查看")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_h_dropdown_item, {
                                  command: "edit",
                                  icon: "edit"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("修改")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }, 8, ["tree-data"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "自定义渲染指定节点"),
                  createVNode(_component_h_tree_select, {
                    "tree-data": renderTreeData.value,
                    multiple: true,
                    "to-body": false
                  }, {
                    treeNodeRender: withCtx(({ data }) => [
                      createVNode("div", null, toDisplayString(data.label) + " (" + toDisplayString(data.value) + ")", 1)
                    ]),
                    _: 1
                  }, 8, ["tree-data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/TreeSelect/custom-render.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customRender = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6e5ccac3"]]);
export {
  customRender as default
};
