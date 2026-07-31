import { defineComponent, ref, computed, watch, onMounted, nextTick, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, createCommentVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { faker } from "@faker-js/faker";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    let uid = 0;
    const scrollerRef = ref(null);
    const items = ref([]);
    const count = ref(1e4);
    const buffer = ref(200);
    const enableLetters = ref(true);
    const pageMode = ref(false);
    const scrollTo = ref(100);
    const updateParts = ref({
      viewStartIdx: 0,
      viewEndIdx: 0,
      visibleStartIdx: 0,
      visibleEndIdx: 0
    });
    const itemHeight = computed(() => {
      return enableLetters.value ? null : 50;
    });
    const inputCount = computed({
      get: () => count.value,
      set: (val) => {
        if (val > 2e5) {
          val = 2e5;
        } else if (val < 0) {
          val = 0;
        }
        count.value = val;
      }
    });
    watch(
      () => enableLetters.value,
      () => generateItems()
    );
    watch(
      () => count.value,
      () => generateItems()
    );
    onMounted(() => {
      nextTick(generateItems);
    });
    function generateItems() {
      const _items = _getData(count.value, enableLetters.value);
      items.value = _items;
    }
    function _generateItem() {
      return {
        name: faker.person.fullName(),
        // avatar: faker.internet.avatar(),
        avatar: "/demo-assets/avatar-indigo.svg"
      };
    }
    function _getData(count2, letters) {
      const raw = {};
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
      for (const l of alphabet) {
        raw[l] = [];
      }
      for (let i = 0; i < count2; i++) {
        const item = _generateItem();
        const letter = item.name.charAt(0).toLowerCase();
        raw[letter].push(item);
      }
      const list = [];
      let index = 1;
      for (const l of alphabet) {
        raw[l] = raw[l].sort((a, b) => a.name < b.name ? -1 : 1);
        if (letters) {
          list.push({
            id: uid++,
            index: index++,
            type: "letter",
            value: { name: l, avatar: "" },
            height: 200
          });
        }
        for (const item of raw[l]) {
          list.push({
            id: uid++,
            index: index++,
            type: "person",
            value: item,
            // height: Math.round(Math.random() * (100 - 50)) + 50,
            height: 50
          });
        }
      }
      return list;
    }
    function _addItem(l) {
      l.push({
        id: uid++,
        index: l.length + 1,
        type: "person",
        value: _generateItem(),
        height: 50
        // height: Math.round(Math.random() * (60 - 30)) + 30,
      });
    }
    function inputCountInput(val) {
      count.value = val;
    }
    function doScrollTo() {
      var _a;
      (_a = scrollerRef.value) == null ? void 0 : _a.scrollToItem(scrollTo.value);
    }
    function addItem() {
      _addItem(items.value);
    }
    function onUpdate(viewStartIndex, viewEndIndex, visibleStartIndex, visibleEndIndex) {
      updateParts.value.viewStartIdx = viewStartIndex;
      updateParts.value.viewEndIdx = viewEndIndex;
      updateParts.value.visibleStartIdx = visibleStartIndex;
      updateParts.value.visibleEndIdx = visibleEndIndex;
    }
    function onScrollTop() {
      console.info("组件滚动到起始位置了~~");
    }
    function onScrollEnd() {
      console.info("组件滚动到未尾位置了~~");
    }
    return {
      inputCount,
      items,
      itemHeight,
      buffer,
      enableLetters,
      pageMode,
      scrollTo,
      scrollerRef,
      updateParts,
      doScrollTo,
      addItem,
      onUpdate,
      inputCountInput,
      onScrollTop,
      onScrollEnd
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_alert = resolveComponent("h-alert");
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_input_number = resolveComponent("h-input-number");
  const _component_h_button = resolveComponent("h-button");
  const _component_h_checkbox = resolveComponent("h-checkbox");
  const _component_h_recycle_scroller = resolveComponent("h-recycle-scroller");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "recycle-scroller-demo" }, _attrs))} data-v-0678a7db><section data-v-0678a7db>`);
  _push(ssrRenderComponent(_component_h_alert, {
    type: "warning",
    title: "注意: 必需为该组件提供item的高度信息!",
    description: "可以通过设置itemSize, itemSecondarySize, minItemSize为item设置高度. 或者在数据中提供高度字段, 但需要sizeField配合",
    size: "small",
    "show-icon": "",
    round: "",
    closable: false
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_row, {
    gutter: 14,
    style: { "margin-top": "20px" }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_row, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_col, {
                      span: 5,
                      class: "align-center"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`生成数据`);
                        } else {
                          return [
                            createTextVNode("生成数据")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_col, { span: 11 }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_input_number, {
                            modelValue: _ctx.inputCount,
                            "onUpdate:modelValue": ($event) => _ctx.inputCount = $event,
                            onInput: _ctx.inputCountInput
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_input_number, {
                              modelValue: _ctx.inputCount,
                              "onUpdate:modelValue": ($event) => _ctx.inputCount = $event,
                              onInput: _ctx.inputCountInput
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_col, { span: 8 }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_button, {
                            circle: "",
                            type: "primary",
                            size: "medium",
                            onClick: _ctx.addItem
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`+1`);
                              } else {
                                return [
                                  createTextVNode("+1")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_button, {
                              circle: "",
                              type: "primary",
                              size: "medium",
                              onClick: _ctx.addItem
                            }, {
                              default: withCtx(() => [
                                createTextVNode("+1")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_col, {
                        span: 5,
                        class: "align-center"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("生成数据")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_col, { span: 11 }, {
                        default: withCtx(() => [
                          createVNode(_component_h_input_number, {
                            modelValue: _ctx.inputCount,
                            "onUpdate:modelValue": ($event) => _ctx.inputCount = $event,
                            onInput: _ctx.inputCountInput
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_h_button, {
                            circle: "",
                            type: "primary",
                            size: "medium",
                            onClick: _ctx.addItem
                          }, {
                            default: withCtx(() => [
                              createTextVNode("+1")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
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
                createVNode(_component_h_row, null, {
                  default: withCtx(() => [
                    createVNode(_component_h_col, {
                      span: 5,
                      class: "align-center"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("生成数据")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_col, { span: 11 }, {
                      default: withCtx(() => [
                        createVNode(_component_h_input_number, {
                          modelValue: _ctx.inputCount,
                          "onUpdate:modelValue": ($event) => _ctx.inputCount = $event,
                          onInput: _ctx.inputCountInput
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_col, { span: 8 }, {
                      default: withCtx(() => [
                        createVNode(_component_h_button, {
                          circle: "",
                          type: "primary",
                          size: "medium",
                          onClick: _ctx.addItem
                        }, {
                          default: withCtx(() => [
                            createTextVNode("+1")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
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
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_row, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_col, {
                      span: 8,
                      class: "align-center"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`从数据中获得高度`);
                        } else {
                          return [
                            createTextVNode("从数据中获得高度")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_col, { span: 16 }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_checkbox, {
                            modelValue: _ctx.enableLetters,
                            "onUpdate:modelValue": ($event) => _ctx.enableLetters = $event
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_checkbox, {
                              modelValue: _ctx.enableLetters,
                              "onUpdate:modelValue": ($event) => _ctx.enableLetters = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_col, {
                        span: 8,
                        class: "align-center"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("从数据中获得高度")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_col, { span: 16 }, {
                        default: withCtx(() => [
                          createVNode(_component_h_checkbox, {
                            modelValue: _ctx.enableLetters,
                            "onUpdate:modelValue": ($event) => _ctx.enableLetters = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                createVNode(_component_h_row, null, {
                  default: withCtx(() => [
                    createVNode(_component_h_col, {
                      span: 8,
                      class: "align-center"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("从数据中获得高度")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_col, { span: 16 }, {
                      default: withCtx(() => [
                        createVNode(_component_h_checkbox, {
                          modelValue: _ctx.enableLetters,
                          "onUpdate:modelValue": ($event) => _ctx.enableLetters = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_row, null, {
                default: withCtx(() => [
                  createVNode(_component_h_col, {
                    span: 5,
                    class: "align-center"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("生成数据")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_col, { span: 11 }, {
                    default: withCtx(() => [
                      createVNode(_component_h_input_number, {
                        modelValue: _ctx.inputCount,
                        "onUpdate:modelValue": ($event) => _ctx.inputCount = $event,
                        onInput: _ctx.inputCountInput
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_col, { span: 8 }, {
                    default: withCtx(() => [
                      createVNode(_component_h_button, {
                        circle: "",
                        type: "primary",
                        size: "medium",
                        onClick: _ctx.addItem
                      }, {
                        default: withCtx(() => [
                          createTextVNode("+1")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_row, null, {
                default: withCtx(() => [
                  createVNode(_component_h_col, {
                    span: 8,
                    class: "align-center"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("从数据中获得高度")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_col, { span: 16 }, {
                    default: withCtx(() => [
                      createVNode(_component_h_checkbox, {
                        modelValue: _ctx.enableLetters,
                        "onUpdate:modelValue": ($event) => _ctx.enableLetters = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  _push(ssrRenderComponent(_component_h_row, { gutter: 14 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_row, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_col, {
                      span: 5,
                      class: "align-center"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`缓存值设置`);
                        } else {
                          return [
                            createTextVNode("缓存值设置")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_col, { span: 11 }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_input_number, {
                            modelValue: _ctx.buffer,
                            "onUpdate:modelValue": ($event) => _ctx.buffer = $event,
                            max: 1e3,
                            min: 1
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_input_number, {
                              modelValue: _ctx.buffer,
                              "onUpdate:modelValue": ($event) => _ctx.buffer = $event,
                              max: 1e3,
                              min: 1
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_col, { span: 8 }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_col, {
                        span: 5,
                        class: "align-center"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("缓存值设置")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_col, { span: 11 }, {
                        default: withCtx(() => [
                          createVNode(_component_h_input_number, {
                            modelValue: _ctx.buffer,
                            "onUpdate:modelValue": ($event) => _ctx.buffer = $event,
                            max: 1e3,
                            min: 1
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_col, { span: 8 })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_row, null, {
                  default: withCtx(() => [
                    createVNode(_component_h_col, {
                      span: 5,
                      class: "align-center"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("缓存值设置")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_col, { span: 11 }, {
                      default: withCtx(() => [
                        createVNode(_component_h_input_number, {
                          modelValue: _ctx.buffer,
                          "onUpdate:modelValue": ($event) => _ctx.buffer = $event,
                          max: 1e3,
                          min: 1
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_col, { span: 8 })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_row, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_col, {
                      span: 5,
                      class: "align-center"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`滚动至`);
                        } else {
                          return [
                            createTextVNode("滚动至")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_col, { span: 11 }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_input_number, {
                            modelValue: _ctx.scrollTo,
                            "onUpdate:modelValue": ($event) => _ctx.scrollTo = $event
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_input_number, {
                              modelValue: _ctx.scrollTo,
                              "onUpdate:modelValue": ($event) => _ctx.scrollTo = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_col, { span: 8 }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_h_button, {
                            circle: "",
                            type: "primary",
                            size: "medium",
                            onClick: _ctx.doScrollTo
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`执行`);
                              } else {
                                return [
                                  createTextVNode("执行")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_h_button, {
                              circle: "",
                              type: "primary",
                              size: "medium",
                              onClick: _ctx.doScrollTo
                            }, {
                              default: withCtx(() => [
                                createTextVNode("执行")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_col, {
                        span: 5,
                        class: "align-center"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("滚动至")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_col, { span: 11 }, {
                        default: withCtx(() => [
                          createVNode(_component_h_input_number, {
                            modelValue: _ctx.scrollTo,
                            "onUpdate:modelValue": ($event) => _ctx.scrollTo = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_h_button, {
                            circle: "",
                            type: "primary",
                            size: "medium",
                            onClick: _ctx.doScrollTo
                          }, {
                            default: withCtx(() => [
                              createTextVNode("执行")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
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
                createVNode(_component_h_row, null, {
                  default: withCtx(() => [
                    createVNode(_component_h_col, {
                      span: 5,
                      class: "align-center"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("滚动至")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_col, { span: 11 }, {
                      default: withCtx(() => [
                        createVNode(_component_h_input_number, {
                          modelValue: _ctx.scrollTo,
                          "onUpdate:modelValue": ($event) => _ctx.scrollTo = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_col, { span: 8 }, {
                      default: withCtx(() => [
                        createVNode(_component_h_button, {
                          circle: "",
                          type: "primary",
                          size: "medium",
                          onClick: _ctx.doScrollTo
                        }, {
                          default: withCtx(() => [
                            createTextVNode("执行")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
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
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_row, null, {
                default: withCtx(() => [
                  createVNode(_component_h_col, {
                    span: 5,
                    class: "align-center"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("缓存值设置")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_col, { span: 11 }, {
                    default: withCtx(() => [
                      createVNode(_component_h_input_number, {
                        modelValue: _ctx.buffer,
                        "onUpdate:modelValue": ($event) => _ctx.buffer = $event,
                        max: 1e3,
                        min: 1
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_col, { span: 8 })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 12 }, {
            default: withCtx(() => [
              createVNode(_component_h_row, null, {
                default: withCtx(() => [
                  createVNode(_component_h_col, {
                    span: 5,
                    class: "align-center"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("滚动至")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_col, { span: 11 }, {
                    default: withCtx(() => [
                      createVNode(_component_h_input_number, {
                        modelValue: _ctx.scrollTo,
                        "onUpdate:modelValue": ($event) => _ctx.scrollTo = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_col, { span: 8 }, {
                    default: withCtx(() => [
                      createVNode(_component_h_button, {
                        circle: "",
                        type: "primary",
                        size: "medium",
                        onClick: _ctx.doScrollTo
                      }, {
                        default: withCtx(() => [
                          createTextVNode("执行")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
  _push(ssrRenderComponent(_component_h_row, { style: { "padding-bottom": "24px", "border-bottom": "1px solid #ccc" } }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, {
          span: 3,
          class: "align-center"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`滚动状态`);
            } else {
              return [
                createTextVNode("滚动状态")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, {
          span: 21,
          class: "align-center"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` (${ssrInterpolate(_ctx.updateParts.viewStartIdx)} - [${ssrInterpolate(_ctx.updateParts.visibleStartIdx)} - ${ssrInterpolate(_ctx.updateParts.visibleEndIdx)}] - ${ssrInterpolate(_ctx.updateParts.viewEndIdx)}) <br data-v-0678a7db${_scopeId2}> (元素索引开始于 - [可见元素开始于 - 可见元素结束于] - 元素索引结束于) `);
            } else {
              return [
                createTextVNode(" (" + toDisplayString(_ctx.updateParts.viewStartIdx) + " - [" + toDisplayString(_ctx.updateParts.visibleStartIdx) + " - " + toDisplayString(_ctx.updateParts.visibleEndIdx) + "] - " + toDisplayString(_ctx.updateParts.viewEndIdx) + ") ", 1),
                createVNode("br"),
                createTextVNode(" (元素索引开始于 - [可见元素开始于 - 可见元素结束于] - 元素索引结束于) ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, {
            span: 3,
            class: "align-center"
          }, {
            default: withCtx(() => [
              createTextVNode("滚动状态")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, {
            span: 21,
            class: "align-center"
          }, {
            default: withCtx(() => [
              createTextVNode(" (" + toDisplayString(_ctx.updateParts.viewStartIdx) + " - [" + toDisplayString(_ctx.updateParts.visibleStartIdx) + " - " + toDisplayString(_ctx.updateParts.visibleEndIdx) + "] - " + toDisplayString(_ctx.updateParts.viewEndIdx) + ") ", 1),
              createVNode("br"),
              createTextVNode(" (元素索引开始于 - [可见元素开始于 - 可见元素结束于] - 元素索引结束于) ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section>`);
  _push(ssrRenderComponent(_component_h_recycle_scroller, {
    ref: "scrollerRef",
    class: "scroller",
    "scroller-height": 500,
    items: _ctx.items,
    buffer: _ctx.buffer,
    "item-size": _ctx.itemHeight,
    "page-mode": _ctx.pageMode,
    "size-field": "height",
    "emit-update": "",
    onScrollStart: _ctx.onScrollTop,
    onScrollEnd: _ctx.onScrollEnd,
    onUpdate: _ctx.onUpdate
  }, {
    before: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_alert, {
          title: "我是before插槽",
          type: "success",
          round: "",
          closeable: false
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_alert, {
            title: "我是before插槽",
            type: "success",
            round: "",
            closeable: false
          })
        ];
      }
    }),
    default: withCtx((props, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (props.item.type === "letter") {
          _push2(`<div class="tr letter big" data-v-0678a7db${_scopeId}><div class="td index" data-v-0678a7db${_scopeId}>${ssrInterpolate(props.index)}</div><div class="td value" data-v-0678a7db${_scopeId}>${ssrInterpolate(props.item.value.name)} Scoped</div></div>`);
        } else {
          _push2(`<div class="tr person" data-v-0678a7db${_scopeId}><div class="td index" data-v-0678a7db${_scopeId}>${ssrInterpolate(props.index)}</div><div class="td" data-v-0678a7db${_scopeId}><div class="info" data-v-0678a7db${_scopeId}><div class="avatar" data-v-0678a7db${_scopeId}>`);
          if (props.item.value.avatar) {
            _push2(`<img${ssrRenderAttr("src", props.item.value.avatar)} alt="" data-v-0678a7db${_scopeId}>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><span data-v-0678a7db${_scopeId}>${ssrInterpolate(props.item.value.name)}</span></div></div></div>`);
        }
      } else {
        return [
          props.item.type === "letter" ? (openBlock(), createBlock("div", {
            key: 0,
            class: "tr letter big"
          }, [
            createVNode("div", { class: "td index" }, toDisplayString(props.index), 1),
            createVNode("div", { class: "td value" }, toDisplayString(props.item.value.name) + " Scoped", 1)
          ])) : (openBlock(), createBlock("div", {
            key: 1,
            class: "tr person"
          }, [
            createVNode("div", { class: "td index" }, toDisplayString(props.index), 1),
            createVNode("div", { class: "td" }, [
              createVNode("div", { class: "info" }, [
                createVNode("div", { class: "avatar" }, [
                  props.item.value.avatar ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: props.item.value.avatar,
                    alt: ""
                  }, null, 8, ["src"])) : createCommentVNode("", true)
                ]),
                createVNode("span", null, toDisplayString(props.item.value.name), 1)
              ])
            ])
          ]))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/VirtualScroller/RecycleScrollerDemo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RecycleScrollerDemo = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0678a7db"]]);
export {
  RecycleScrollerDemo as default
};
