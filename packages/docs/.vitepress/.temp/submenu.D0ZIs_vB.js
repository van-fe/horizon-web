import { defineComponent, resolveComponent, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submenu",
  __ssrInlineRender: true,
  setup(__props) {
    const list = [{
      label: "小学",
      children: [
        {
          label: "一年级",
          children: [
            {
              label: "1班"
            },
            {
              label: "2班"
            },
            {
              label: "3班"
            },
            {
              label: "4班"
            }
          ]
        },
        {
          label: "二年级",
          children: [
            {
              label: "1班"
            },
            {
              label: "2班"
            },
            {
              label: "3班"
            },
            {
              label: "4班"
            }
          ]
        },
        {
          label: "三年级",
          children: [
            {
              label: "1班"
            },
            {
              label: "2班"
            },
            {
              label: "3班"
            },
            {
              label: "4班"
            }
          ]
        },
        {
          label: "四年级",
          children: [
            {
              label: "1班"
            },
            {
              label: "2班"
            },
            {
              label: "3班"
            },
            {
              label: "4班"
            }
          ]
        },
        {
          label: "五年级",
          children: [
            {
              label: "1班"
            },
            {
              label: "2班"
            },
            {
              label: "3班"
            },
            {
              label: "4班"
            }
          ]
        },
        {
          label: "六年级",
          children: [
            {
              label: "1班"
            },
            {
              label: "2班"
            },
            {
              label: "3班"
            },
            {
              label: "4班"
            }
          ]
        }
      ]
    }, {
      label: "初中",
      children: [
        {
          label: "七年级",
          children: [
            {
              label: "1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班"
            },
            {
              label: "2班"
            },
            {
              label: "3班"
            },
            {
              label: "4班"
            },
            {
              label: "5班"
            },
            {
              label: "6班"
            },
            {
              label: "7班"
            },
            {
              label: "8班"
            },
            {
              label: "9班"
            },
            {
              label: "10班"
            }
          ]
        },
        {
          label: "八年级",
          children: [
            {
              label: "1班"
            },
            {
              label: "2班"
            },
            {
              label: "3班"
            },
            {
              label: "4班"
            },
            {
              label: "5班"
            },
            {
              label: "6班"
            },
            {
              label: "7班"
            },
            {
              label: "8班"
            },
            {
              label: "9班"
            },
            {
              label: "10班"
            }
          ]
        },
        {
          label: "九年级",
          children: [
            {
              label: "1班"
            },
            {
              label: "2班"
            },
            {
              label: "3班"
            },
            {
              label: "4班"
            },
            {
              label: "5班"
            },
            {
              label: "6班"
            },
            {
              label: "7班"
            },
            {
              label: "8班"
            },
            {
              label: "9班"
            },
            {
              label: "10班"
            }
          ]
        }
      ]
    }, {
      label: "高中",
      children: [
        {
          label: "高一",
          children: [
            {
              label: "1班"
            },
            {
              label: "2班"
            },
            {
              label: "3班"
            },
            {
              label: "4班"
            },
            {
              label: "5班"
            },
            {
              label: "6班"
            },
            {
              label: "7班"
            },
            {
              label: "8班"
            },
            {
              label: "9班"
            },
            {
              label: "10班"
            }
          ]
        },
        {
          label: "高二",
          children: [
            {
              label: "1班"
            },
            {
              label: "2班"
            },
            {
              label: "3班"
            },
            {
              label: "4班"
            }
          ]
        },
        {
          label: "高三",
          children: [
            {
              label: "1班"
            },
            {
              label: "2班"
            },
            {
              label: "3班"
            },
            {
              label: "4班"
            }
          ]
        }
      ]
    }];
    function onCommand(val) {
      $message.info(val);
    }
    function onClick() {
      $message.warning("click 事件外部冒泡");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_dropdown = resolveComponent("h-dropdown");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_dropdown_menu = resolveComponent("h-dropdown-menu");
      const _component_h_dropdown_submenu = resolveComponent("h-dropdown-submenu");
      const _component_h_dropdown_item = resolveComponent("h-dropdown-item");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, {
              span: 24,
              onClick
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_dropdown, { onCommand }, {
                    dropdown: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_dropdown_menu, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(list, (item) => {
                                _push5(ssrRenderComponent(_component_h_dropdown_submenu, {
                                  key: item.label,
                                  title: item.label
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(item.children, (subItem) => {
                                        _push6(ssrRenderComponent(_component_h_dropdown_submenu, {
                                          key: subItem.label,
                                          title: subItem.label
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<!--[-->`);
                                              ssrRenderList(subItem.children, (child) => {
                                                _push7(ssrRenderComponent(_component_h_dropdown_item, {
                                                  key: child.label,
                                                  command: subItem.label + child.label
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(`${ssrInterpolate(child.label)}`);
                                                    } else {
                                                      return [
                                                        createTextVNode(toDisplayString(child.label), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              });
                                              _push7(`<!--]-->`);
                                            } else {
                                              return [
                                                (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                                  return openBlock(), createBlock(_component_h_dropdown_item, {
                                                    key: child.label,
                                                    command: subItem.label + child.label
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(child.label), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["command"]);
                                                }), 128))
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                          return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                            key: subItem.label,
                                            title: subItem.label
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                                return openBlock(), createBlock(_component_h_dropdown_item, {
                                                  key: child.label,
                                                  command: subItem.label + child.label
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(child.label), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["command"]);
                                              }), 128))
                                            ]),
                                            _: 2
                                          }, 1032, ["title"]);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                                  return createVNode(_component_h_dropdown_submenu, {
                                    key: item.label,
                                    title: item.label
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                        return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                          key: subItem.label,
                                          title: subItem.label
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                              return openBlock(), createBlock(_component_h_dropdown_item, {
                                                key: child.label,
                                                command: subItem.label + child.label
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(child.label), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["command"]);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1032, ["title"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["title"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_dropdown_menu, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                                return createVNode(_component_h_dropdown_submenu, {
                                  key: item.label,
                                  title: item.label
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                      return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                        key: subItem.label,
                                        title: subItem.label
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                            return openBlock(), createBlock(_component_h_dropdown_item, {
                                              key: child.label,
                                              command: subItem.label + child.label
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(child.label), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["command"]);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1032, ["title"]);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1032, ["title"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Grade (hover)`);
                            } else {
                              return [
                                createTextVNode("Grade (hover)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, null, {
                            default: withCtx(() => [
                              createTextVNode("Grade (hover)")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_dropdown, {
                    trigger: "click",
                    onCommand
                  }, {
                    dropdown: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_dropdown_menu, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(list, (item) => {
                                _push5(ssrRenderComponent(_component_h_dropdown_submenu, {
                                  key: item.label,
                                  title: item.label,
                                  trigger: "click"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(item.children, (subItem) => {
                                        _push6(ssrRenderComponent(_component_h_dropdown_submenu, {
                                          key: subItem.label,
                                          title: subItem.label,
                                          trigger: "click"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<!--[-->`);
                                              ssrRenderList(subItem.children, (child) => {
                                                _push7(ssrRenderComponent(_component_h_dropdown_item, {
                                                  key: child.label,
                                                  command: subItem.label + child.label
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(`${ssrInterpolate(child.label)}`);
                                                    } else {
                                                      return [
                                                        createTextVNode(toDisplayString(child.label), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              });
                                              _push7(`<!--]-->`);
                                            } else {
                                              return [
                                                (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                                  return openBlock(), createBlock(_component_h_dropdown_item, {
                                                    key: child.label,
                                                    command: subItem.label + child.label
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(child.label), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["command"]);
                                                }), 128))
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                          return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                            key: subItem.label,
                                            title: subItem.label,
                                            trigger: "click"
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                                return openBlock(), createBlock(_component_h_dropdown_item, {
                                                  key: child.label,
                                                  command: subItem.label + child.label
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(child.label), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["command"]);
                                              }), 128))
                                            ]),
                                            _: 2
                                          }, 1032, ["title"]);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                                  return createVNode(_component_h_dropdown_submenu, {
                                    key: item.label,
                                    title: item.label,
                                    trigger: "click"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                        return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                          key: subItem.label,
                                          title: subItem.label,
                                          trigger: "click"
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                              return openBlock(), createBlock(_component_h_dropdown_item, {
                                                key: child.label,
                                                command: subItem.label + child.label
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(child.label), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["command"]);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1032, ["title"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["title"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_dropdown_menu, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                                return createVNode(_component_h_dropdown_submenu, {
                                  key: item.label,
                                  title: item.label,
                                  trigger: "click"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                      return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                        key: subItem.label,
                                        title: subItem.label,
                                        trigger: "click"
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                            return openBlock(), createBlock(_component_h_dropdown_item, {
                                              key: child.label,
                                              command: subItem.label + child.label
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(child.label), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["command"]);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1032, ["title"]);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1032, ["title"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Grade (click)`);
                            } else {
                              return [
                                createTextVNode("Grade (click)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, null, {
                            default: withCtx(() => [
                              createTextVNode("Grade (click)")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_dropdown, {
                    trigger: "click",
                    onCommand
                  }, {
                    dropdown: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_dropdown_menu, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(list, (item) => {
                                _push5(ssrRenderComponent(_component_h_dropdown_submenu, {
                                  key: item.label,
                                  title: item.label,
                                  trigger: "click"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(item.children, (subItem) => {
                                        _push6(ssrRenderComponent(_component_h_dropdown_submenu, {
                                          key: subItem.label,
                                          title: subItem.label,
                                          trigger: "click"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<!--[-->`);
                                              ssrRenderList(subItem.children, (child) => {
                                                _push7(ssrRenderComponent(_component_h_dropdown_item, {
                                                  key: child.label,
                                                  command: subItem.label + child.label
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(`${ssrInterpolate(child.label)}`);
                                                    } else {
                                                      return [
                                                        createTextVNode(toDisplayString(child.label), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              });
                                              _push7(`<!--]-->`);
                                            } else {
                                              return [
                                                (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                                  return openBlock(), createBlock(_component_h_dropdown_item, {
                                                    key: child.label,
                                                    command: subItem.label + child.label
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(child.label), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["command"]);
                                                }), 128))
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                          return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                            key: subItem.label,
                                            title: subItem.label,
                                            trigger: "click"
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                                return openBlock(), createBlock(_component_h_dropdown_item, {
                                                  key: child.label,
                                                  command: subItem.label + child.label
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(child.label), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["command"]);
                                              }), 128))
                                            ]),
                                            _: 2
                                          }, 1032, ["title"]);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                                  return createVNode(_component_h_dropdown_submenu, {
                                    key: item.label,
                                    title: item.label,
                                    trigger: "click"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                        return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                          key: subItem.label,
                                          title: subItem.label,
                                          trigger: "click"
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                              return openBlock(), createBlock(_component_h_dropdown_item, {
                                                key: child.label,
                                                command: subItem.label + child.label
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(child.label), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["command"]);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1032, ["title"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["title"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_dropdown_menu, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                                return createVNode(_component_h_dropdown_submenu, {
                                  key: item.label,
                                  title: item.label,
                                  trigger: "click"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                      return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                        key: subItem.label,
                                        title: subItem.label,
                                        trigger: "click"
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                            return openBlock(), createBlock(_component_h_dropdown_item, {
                                              key: child.label,
                                              command: subItem.label + child.label
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(child.label), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["command"]);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1032, ["title"]);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1032, ["title"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Grade (click)`);
                            } else {
                              return [
                                createTextVNode("Grade (click)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, null, {
                            default: withCtx(() => [
                              createTextVNode("Grade (click)")
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
                    createVNode(_component_h_dropdown, { onCommand }, {
                      dropdown: withCtx(() => [
                        createVNode(_component_h_dropdown_menu, null, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                              return createVNode(_component_h_dropdown_submenu, {
                                key: item.label,
                                title: item.label
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                    return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                      key: subItem.label,
                                      title: subItem.label
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                          return openBlock(), createBlock(_component_h_dropdown_item, {
                                            key: child.label,
                                            command: subItem.label + child.label
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(child.label), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["command"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["title"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["title"]);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_h_button, null, {
                          default: withCtx(() => [
                            createTextVNode("Grade (hover)")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_dropdown, {
                      trigger: "click",
                      onCommand
                    }, {
                      dropdown: withCtx(() => [
                        createVNode(_component_h_dropdown_menu, null, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                              return createVNode(_component_h_dropdown_submenu, {
                                key: item.label,
                                title: item.label,
                                trigger: "click"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                    return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                      key: subItem.label,
                                      title: subItem.label,
                                      trigger: "click"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                          return openBlock(), createBlock(_component_h_dropdown_item, {
                                            key: child.label,
                                            command: subItem.label + child.label
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(child.label), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["command"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["title"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["title"]);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_h_button, null, {
                          default: withCtx(() => [
                            createTextVNode("Grade (click)")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_dropdown, {
                      trigger: "click",
                      onCommand
                    }, {
                      dropdown: withCtx(() => [
                        createVNode(_component_h_dropdown_menu, null, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                              return createVNode(_component_h_dropdown_submenu, {
                                key: item.label,
                                title: item.label,
                                trigger: "click"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                    return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                      key: subItem.label,
                                      title: subItem.label,
                                      trigger: "click"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                          return openBlock(), createBlock(_component_h_dropdown_item, {
                                            key: child.label,
                                            command: subItem.label + child.label
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(child.label), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["command"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["title"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["title"]);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_h_button, null, {
                          default: withCtx(() => [
                            createTextVNode("Grade (click)")
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
              createVNode(_component_h_col, {
                span: 24,
                onClick
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_dropdown, { onCommand }, {
                    dropdown: withCtx(() => [
                      createVNode(_component_h_dropdown_menu, null, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                            return createVNode(_component_h_dropdown_submenu, {
                              key: item.label,
                              title: item.label
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                  return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                    key: subItem.label,
                                    title: subItem.label
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                        return openBlock(), createBlock(_component_h_dropdown_item, {
                                          key: child.label,
                                          command: subItem.label + child.label
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(child.label), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["command"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["title"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["title"]);
                          }), 64))
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_h_button, null, {
                        default: withCtx(() => [
                          createTextVNode("Grade (hover)")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_dropdown, {
                    trigger: "click",
                    onCommand
                  }, {
                    dropdown: withCtx(() => [
                      createVNode(_component_h_dropdown_menu, null, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                            return createVNode(_component_h_dropdown_submenu, {
                              key: item.label,
                              title: item.label,
                              trigger: "click"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                  return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                    key: subItem.label,
                                    title: subItem.label,
                                    trigger: "click"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                        return openBlock(), createBlock(_component_h_dropdown_item, {
                                          key: child.label,
                                          command: subItem.label + child.label
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(child.label), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["command"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["title"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["title"]);
                          }), 64))
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_h_button, null, {
                        default: withCtx(() => [
                          createTextVNode("Grade (click)")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_dropdown, {
                    trigger: "click",
                    onCommand
                  }, {
                    dropdown: withCtx(() => [
                      createVNode(_component_h_dropdown_menu, null, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(list, (item) => {
                            return createVNode(_component_h_dropdown_submenu, {
                              key: item.label,
                              title: item.label,
                              trigger: "click"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(item.children, (subItem) => {
                                  return openBlock(), createBlock(_component_h_dropdown_submenu, {
                                    key: subItem.label,
                                    title: subItem.label,
                                    trigger: "click"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(subItem.children, (child) => {
                                        return openBlock(), createBlock(_component_h_dropdown_item, {
                                          key: child.label,
                                          command: subItem.label + child.label
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(child.label), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["command"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["title"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["title"]);
                          }), 64))
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_h_button, null, {
                        default: withCtx(() => [
                          createTextVNode("Grade (click)")
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Dropdown/submenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const submenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d84e6c5b"]]);
export {
  submenu as default
};
