import { defineComponent, ref, onMounted, resolveComponent, withCtx, createTextVNode, createVNode, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { Y as HTree } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "controls",
  __ssrInlineRender: true,
  setup(__props) {
    const baseTreeData = ref([]);
    const treeDomRef = ref();
    function getExpand() {
      var _a;
      console.info((_a = treeDomRef.value) == null ? void 0 : _a.getExpandNodes());
    }
    function setExpand() {
      var _a;
      (_a = treeDomRef.value) == null ? void 0 : _a.setCollapseStatusByValue(["feedback"], true);
    }
    function setFold() {
      var _a;
      (_a = treeDomRef.value) == null ? void 0 : _a.setCollapseStatusByValue(["guide", "disciplines"], false);
    }
    function setExpandAll() {
      var _a;
      (_a = treeDomRef.value) == null ? void 0 : _a.setAllCollapseStatus(true);
    }
    function setFoldAll() {
      var _a;
      (_a = treeDomRef.value) == null ? void 0 : _a.setAllCollapseStatus(false);
    }
    function getAllCheckedValues() {
      var _a;
      console.info((_a = treeDomRef.value) == null ? void 0 : _a.getSelectedNodes());
    }
    function getHalfCheckedValues() {
      var _a;
      console.info((_a = treeDomRef.value) == null ? void 0 : _a.getPartSelectedNodes());
    }
    function getUnCheckedValues() {
      var _a;
      console.info((_a = treeDomRef.value) == null ? void 0 : _a.getUnSelectedNodes());
    }
    function setSelectedValues() {
      var _a;
      (_a = treeDomRef.value) == null ? void 0 : _a.setSelectedStatus(["feedback", "color"], true);
    }
    function deleteSelectedValues() {
      var _a;
      (_a = treeDomRef.value) == null ? void 0 : _a.setSelectedStatus(["feedback", "color"], false);
    }
    function getNodes() {
      var _a;
      console.info((_a = treeDomRef.value) == null ? void 0 : _a.getNodeByValues(["feedback"]));
    }
    function setNode() {
      var _a;
      (_a = treeDomRef.value) == null ? void 0 : _a.setNodeByValue({
        label: "Feedback - modified"
      }, "feedback");
    }
    function delNode() {
      var _a;
      (_a = treeDomRef.value) == null ? void 0 : _a.delNodeByValue("feedback");
    }
    let index = 0;
    function addNodeChildren() {
      var _a;
      (_a = treeDomRef.value) == null ? void 0 : _a.addNodeChildrenByValue([
        {
          label: `New Item Child ${index}`,
          value: `new child ${index}`
        }
      ], "efficiency");
      index++;
    }
    onMounted(() => {
      fetch(new URL("/tree-data.json", import.meta.url).href).then((res) => res.json()).then((res) => {
        baseTreeData.value = res;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_space = resolveComponent("h-space");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_form, {
        "label-width": "fit-content",
        "label-position": "left",
        "label-vertical-align": "middle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form_item, { label: "展开收起" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_space, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, { onClick: getExpand }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`获取已展开`);
                            } else {
                              return [
                                createTextVNode("获取已展开")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_button, { onClick: setExpand }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`设置展开`);
                            } else {
                              return [
                                createTextVNode("设置展开")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_button, { onClick: setFold }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`设置收起`);
                            } else {
                              return [
                                createTextVNode("设置收起")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_button, { onClick: setExpandAll }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`全部展开`);
                            } else {
                              return [
                                createTextVNode("全部展开")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_button, { onClick: setFoldAll }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`全部收起`);
                            } else {
                              return [
                                createTextVNode("全部收起")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, { onClick: getExpand }, {
                            default: withCtx(() => [
                              createTextVNode("获取已展开")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_button, { onClick: setExpand }, {
                            default: withCtx(() => [
                              createTextVNode("设置展开")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_button, { onClick: setFold }, {
                            default: withCtx(() => [
                              createTextVNode("设置收起")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_button, { onClick: setExpandAll }, {
                            default: withCtx(() => [
                              createTextVNode("全部展开")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_button, { onClick: setFoldAll }, {
                            default: withCtx(() => [
                              createTextVNode("全部收起")
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
                    createVNode(_component_h_space, null, {
                      default: withCtx(() => [
                        createVNode(_component_h_button, { onClick: getExpand }, {
                          default: withCtx(() => [
                            createTextVNode("获取已展开")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_button, { onClick: setExpand }, {
                          default: withCtx(() => [
                            createTextVNode("设置展开")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_button, { onClick: setFold }, {
                          default: withCtx(() => [
                            createTextVNode("设置收起")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_button, { onClick: setExpandAll }, {
                          default: withCtx(() => [
                            createTextVNode("全部展开")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_button, { onClick: setFoldAll }, {
                          default: withCtx(() => [
                            createTextVNode("全部收起")
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
            _push2(ssrRenderComponent(_component_h_form_item, { label: "选中处理" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_space, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, { onClick: getAllCheckedValues }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`获取所有已选（不含半选）`);
                            } else {
                              return [
                                createTextVNode("获取所有已选（不含半选）")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_button, { onClick: getHalfCheckedValues }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`获取所有半选`);
                            } else {
                              return [
                                createTextVNode("获取所有半选")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_button, { onClick: getUnCheckedValues }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`获取所有未选`);
                            } else {
                              return [
                                createTextVNode("获取所有未选")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_button, { onClick: setSelectedValues }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`增加选中`);
                            } else {
                              return [
                                createTextVNode("增加选中")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_button, { onClick: deleteSelectedValues }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`取消选中`);
                            } else {
                              return [
                                createTextVNode("取消选中")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, { onClick: getAllCheckedValues }, {
                            default: withCtx(() => [
                              createTextVNode("获取所有已选（不含半选）")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_button, { onClick: getHalfCheckedValues }, {
                            default: withCtx(() => [
                              createTextVNode("获取所有半选")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_button, { onClick: getUnCheckedValues }, {
                            default: withCtx(() => [
                              createTextVNode("获取所有未选")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_button, { onClick: setSelectedValues }, {
                            default: withCtx(() => [
                              createTextVNode("增加选中")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_button, { onClick: deleteSelectedValues }, {
                            default: withCtx(() => [
                              createTextVNode("取消选中")
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
                    createVNode(_component_h_space, null, {
                      default: withCtx(() => [
                        createVNode(_component_h_button, { onClick: getAllCheckedValues }, {
                          default: withCtx(() => [
                            createTextVNode("获取所有已选（不含半选）")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_button, { onClick: getHalfCheckedValues }, {
                          default: withCtx(() => [
                            createTextVNode("获取所有半选")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_button, { onClick: getUnCheckedValues }, {
                          default: withCtx(() => [
                            createTextVNode("获取所有未选")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_button, { onClick: setSelectedValues }, {
                          default: withCtx(() => [
                            createTextVNode("增加选中")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_button, { onClick: deleteSelectedValues }, {
                          default: withCtx(() => [
                            createTextVNode("取消选中")
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
            _push2(ssrRenderComponent(_component_h_form_item, { label: "节点数据" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_space, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, { onClick: getNodes }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`获取节点`);
                            } else {
                              return [
                                createTextVNode("获取节点")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_button, { onClick: setNode }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`设置节点`);
                            } else {
                              return [
                                createTextVNode("设置节点")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_button, { onClick: delNode }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`删除节点`);
                            } else {
                              return [
                                createTextVNode("删除节点")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_button, { onClick: addNodeChildren }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`添加节点`);
                            } else {
                              return [
                                createTextVNode("添加节点")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, { onClick: getNodes }, {
                            default: withCtx(() => [
                              createTextVNode("获取节点")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_button, { onClick: setNode }, {
                            default: withCtx(() => [
                              createTextVNode("设置节点")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_button, { onClick: delNode }, {
                            default: withCtx(() => [
                              createTextVNode("删除节点")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_h_button, { onClick: addNodeChildren }, {
                            default: withCtx(() => [
                              createTextVNode("添加节点")
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
                    createVNode(_component_h_space, null, {
                      default: withCtx(() => [
                        createVNode(_component_h_button, { onClick: getNodes }, {
                          default: withCtx(() => [
                            createTextVNode("获取节点")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_button, { onClick: setNode }, {
                          default: withCtx(() => [
                            createTextVNode("设置节点")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_button, { onClick: delNode }, {
                          default: withCtx(() => [
                            createTextVNode("删除节点")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_button, { onClick: addNodeChildren }, {
                          default: withCtx(() => [
                            createTextVNode("添加节点")
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
              createVNode(_component_h_form_item, { label: "展开收起" }, {
                default: withCtx(() => [
                  createVNode(_component_h_space, null, {
                    default: withCtx(() => [
                      createVNode(_component_h_button, { onClick: getExpand }, {
                        default: withCtx(() => [
                          createTextVNode("获取已展开")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, { onClick: setExpand }, {
                        default: withCtx(() => [
                          createTextVNode("设置展开")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, { onClick: setFold }, {
                        default: withCtx(() => [
                          createTextVNode("设置收起")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, { onClick: setExpandAll }, {
                        default: withCtx(() => [
                          createTextVNode("全部展开")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, { onClick: setFoldAll }, {
                        default: withCtx(() => [
                          createTextVNode("全部收起")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "选中处理" }, {
                default: withCtx(() => [
                  createVNode(_component_h_space, null, {
                    default: withCtx(() => [
                      createVNode(_component_h_button, { onClick: getAllCheckedValues }, {
                        default: withCtx(() => [
                          createTextVNode("获取所有已选（不含半选）")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, { onClick: getHalfCheckedValues }, {
                        default: withCtx(() => [
                          createTextVNode("获取所有半选")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, { onClick: getUnCheckedValues }, {
                        default: withCtx(() => [
                          createTextVNode("获取所有未选")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, { onClick: setSelectedValues }, {
                        default: withCtx(() => [
                          createTextVNode("增加选中")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, { onClick: deleteSelectedValues }, {
                        default: withCtx(() => [
                          createTextVNode("取消选中")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_form_item, { label: "节点数据" }, {
                default: withCtx(() => [
                  createVNode(_component_h_space, null, {
                    default: withCtx(() => [
                      createVNode(_component_h_button, { onClick: getNodes }, {
                        default: withCtx(() => [
                          createTextVNode("获取节点")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, { onClick: setNode }, {
                        default: withCtx(() => [
                          createTextVNode("设置节点")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, { onClick: delNode }, {
                        default: withCtx(() => [
                          createTextVNode("删除节点")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, { onClick: addNodeChildren }, {
                        default: withCtx(() => [
                          createTextVNode("添加节点")
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
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(HTree), {
                    ref_key: "treeDomRef",
                    ref: treeDomRef,
                    "tree-data": baseTreeData.value,
                    multiple: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(HTree), {
                      ref_key: "treeDomRef",
                      ref: treeDomRef,
                      "tree-data": baseTreeData.value,
                      multiple: true
                    }, null, 8, ["tree-data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, null, {
                default: withCtx(() => [
                  createVNode(unref(HTree), {
                    ref_key: "treeDomRef",
                    ref: treeDomRef,
                    "tree-data": baseTreeData.value,
                    multiple: true
                  }, null, 8, ["tree-data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tree/controls.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
