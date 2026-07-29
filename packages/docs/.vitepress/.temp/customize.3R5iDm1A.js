import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_space = resolveComponent("h-space");
  const _component_h_segmented = resolveComponent("h-segmented");
  const _component_h_segmented_item = resolveComponent("h-segmented-item");
  const _component_h_avatar = resolveComponent("h-avatar");
  const _component_h_tag = resolveComponent("h-tag");
  _push(ssrRenderComponent(_component_h_space, mergeProps({ direction: "vertical" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_segmented, { "default-active-key": "user" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_segmented_item, { key: "user" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_avatar, { size: "small" }, null, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_tag, {
                            type: "info",
                            clickable: false
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`User`);
                              } else {
                                return [
                                  createTextVNode("User")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_avatar, { size: "small" }),
                            createVNode(_component_h_tag, {
                              type: "info",
                              clickable: false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("User")
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
                      createVNode(_component_h_space, {
                        size: "small",
                        direction: "vertical",
                        align: "center"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_avatar, { size: "small" }),
                          createVNode(_component_h_tag, {
                            type: "info",
                            clickable: false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("User")
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
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_segmented_item, { key: "employee" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_avatar, { size: "small" }, null, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_tag, { clickable: false }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`Emp`);
                              } else {
                                return [
                                  createTextVNode("Emp")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_avatar, { size: "small" }),
                            createVNode(_component_h_tag, { clickable: false }, {
                              default: withCtx(() => [
                                createTextVNode("Emp")
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
                      createVNode(_component_h_space, {
                        size: "small",
                        direction: "vertical",
                        align: "center"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_avatar, { size: "small" }),
                          createVNode(_component_h_tag, { clickable: false }, {
                            default: withCtx(() => [
                              createTextVNode("Emp")
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
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_segmented_item, { key: "lv" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_avatar, { size: "small" }, null, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_h_tag, {
                            type: "success",
                            clickable: false
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`LV`);
                              } else {
                                return [
                                  createTextVNode("LV")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_avatar, { size: "small" }),
                            createVNode(_component_h_tag, {
                              type: "success",
                              clickable: false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("LV")
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
                      createVNode(_component_h_space, {
                        size: "small",
                        direction: "vertical",
                        align: "center"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_h_avatar, { size: "small" }),
                          createVNode(_component_h_tag, {
                            type: "success",
                            clickable: false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("LV")
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
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_segmented_item, { key: "user" }, {
                  default: withCtx(() => [
                    createVNode(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_avatar, { size: "small" }),
                        createVNode(_component_h_tag, {
                          type: "info",
                          clickable: false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("User")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_h_segmented_item, { key: "employee" }, {
                  default: withCtx(() => [
                    createVNode(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_avatar, { size: "small" }),
                        createVNode(_component_h_tag, { clickable: false }, {
                          default: withCtx(() => [
                            createTextVNode("Emp")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_h_segmented_item, { key: "lv" }, {
                  default: withCtx(() => [
                    createVNode(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_avatar, { size: "small" }),
                        createVNode(_component_h_tag, {
                          type: "success",
                          clickable: false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("LV")
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
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_segmented, { "default-active-key": "spring" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_segmented_item, { key: "spring" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<div${_scopeId4}>Spring</div><div${_scopeId4}>Jan-Mar</div>`);
                        } else {
                          return [
                            createVNode("div", null, "Spring"),
                            createVNode("div", null, "Jan-Mar")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_space, {
                        size: "small",
                        direction: "vertical",
                        align: "center"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", null, "Spring"),
                          createVNode("div", null, "Jan-Mar")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_segmented_item, { key: "summer" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<div${_scopeId4}>Summer</div><div${_scopeId4}>Apr-Jun</div>`);
                        } else {
                          return [
                            createVNode("div", null, "Summer"),
                            createVNode("div", null, "Apr-Jun")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_space, {
                        size: "small",
                        direction: "vertical",
                        align: "center"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", null, "Summer"),
                          createVNode("div", null, "Apr-Jun")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_segmented_item, { key: "fall" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<div${_scopeId4}>Fall</div><div${_scopeId4}>Jul-Sep</div>`);
                        } else {
                          return [
                            createVNode("div", null, "Fall"),
                            createVNode("div", null, "Jul-Sep")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_space, {
                        size: "small",
                        direction: "vertical",
                        align: "center"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", null, "Fall"),
                          createVNode("div", null, "Jul-Sep")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_segmented_item, { key: "winter" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<div${_scopeId4}>Winter</div><div${_scopeId4}>Oct-Dec</div>`);
                        } else {
                          return [
                            createVNode("div", null, "Winter"),
                            createVNode("div", null, "Oct-Dec")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_space, {
                        size: "small",
                        direction: "vertical",
                        align: "center"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", null, "Winter"),
                          createVNode("div", null, "Oct-Dec")
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
                createVNode(_component_h_segmented_item, { key: "spring" }, {
                  default: withCtx(() => [
                    createVNode(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", null, "Spring"),
                        createVNode("div", null, "Jan-Mar")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_h_segmented_item, { key: "summer" }, {
                  default: withCtx(() => [
                    createVNode(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", null, "Summer"),
                        createVNode("div", null, "Apr-Jun")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_h_segmented_item, { key: "fall" }, {
                  default: withCtx(() => [
                    createVNode(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", null, "Fall"),
                        createVNode("div", null, "Jul-Sep")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_h_segmented_item, { key: "winter" }, {
                  default: withCtx(() => [
                    createVNode(_component_h_space, {
                      size: "small",
                      direction: "vertical",
                      align: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", null, "Winter"),
                        createVNode("div", null, "Oct-Dec")
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
          createVNode(_component_h_segmented, { "default-active-key": "user" }, {
            default: withCtx(() => [
              createVNode(_component_h_segmented_item, { key: "user" }, {
                default: withCtx(() => [
                  createVNode(_component_h_space, {
                    size: "small",
                    direction: "vertical",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_avatar, { size: "small" }),
                      createVNode(_component_h_tag, {
                        type: "info",
                        clickable: false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("User")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_segmented_item, { key: "employee" }, {
                default: withCtx(() => [
                  createVNode(_component_h_space, {
                    size: "small",
                    direction: "vertical",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_avatar, { size: "small" }),
                      createVNode(_component_h_tag, { clickable: false }, {
                        default: withCtx(() => [
                          createTextVNode("Emp")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_segmented_item, { key: "lv" }, {
                default: withCtx(() => [
                  createVNode(_component_h_space, {
                    size: "small",
                    direction: "vertical",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_avatar, { size: "small" }),
                      createVNode(_component_h_tag, {
                        type: "success",
                        clickable: false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("LV")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_segmented, { "default-active-key": "spring" }, {
            default: withCtx(() => [
              createVNode(_component_h_segmented_item, { key: "spring" }, {
                default: withCtx(() => [
                  createVNode(_component_h_space, {
                    size: "small",
                    direction: "vertical",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", null, "Spring"),
                      createVNode("div", null, "Jan-Mar")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_segmented_item, { key: "summer" }, {
                default: withCtx(() => [
                  createVNode(_component_h_space, {
                    size: "small",
                    direction: "vertical",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", null, "Summer"),
                      createVNode("div", null, "Apr-Jun")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_segmented_item, { key: "fall" }, {
                default: withCtx(() => [
                  createVNode(_component_h_space, {
                    size: "small",
                    direction: "vertical",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", null, "Fall"),
                      createVNode("div", null, "Jul-Sep")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_segmented_item, { key: "winter" }, {
                default: withCtx(() => [
                  createVNode(_component_h_space, {
                    size: "small",
                    direction: "vertical",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", null, "Winter"),
                      createVNode("div", null, "Oct-Dec")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Segmented/customize.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customize = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  customize as default
};
