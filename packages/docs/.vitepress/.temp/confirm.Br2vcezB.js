import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const value1 = ref();
    const value2 = ref();
    const value3 = ref();
    const values1 = ref([]);
    const values2 = ref([]);
    const values3 = ref([]);
    const confirmRef = ref(null);
    const confirmRef2 = ref(null);
    const changeHandle = () => {
      console.info(value3.value);
    };
    return {
      value1,
      value2,
      value3,
      values1,
      values2,
      values3,
      confirmRef,
      confirmRef2,
      changeHandle,
      confirmHandle() {
        console.info("confirm");
        confirmRef.value.confirmHandle();
      },
      confirmHandle2() {
        console.info("confirm");
        confirmRef2.value.confirmHandle();
      },
      cancelHandle() {
        console.info("cancel");
        confirmRef.value.cancelHandle();
      },
      cancelHandle2() {
        console.info("cancel");
        confirmRef2.value.cancelHandle();
      }
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_select = resolveComponent("h-select");
  const _component_h_option = resolveComponent("h-option");
  const _component_h_button = resolveComponent("h-button");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_row, { gutter: 10 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>单选：默认</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.value1,
                "onUpdate:modelValue": ($event) => _ctx.value1 = $event,
                "filter-option": "",
                "need-dropdown-confirm": "",
                "show-selected-icon": "",
                "to-body": false,
                onChange: _ctx.changeHandle
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "齐齐哈尔",
                      value: ""
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 2,
                      label: "那然色布斯台音布拉格"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 3,
                      label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "齐齐哈尔",
                        value: ""
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "那然色布斯台音布拉格"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "单选：默认"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.value1,
                  "onUpdate:modelValue": ($event) => _ctx.value1 = $event,
                  "filter-option": "",
                  "need-dropdown-confirm": "",
                  "show-selected-icon": "",
                  "to-body": false,
                  onChange: _ctx.changeHandle
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "齐齐哈尔",
                      value: ""
                    }),
                    createVNode(_component_h_option, {
                      value: 2,
                      label: "那然色布斯台音布拉格"
                    }),
                    createVNode(_component_h_option, {
                      value: 3,
                      label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>单选：自定义按钮文字</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.value2,
                "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                "filter-option": "",
                "need-dropdown-confirm": "",
                "dropdown-confirm-btn-text": "确定",
                "dropdown-cancel-btn-text": "取消",
                "to-body": false
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "齐齐哈尔",
                      value: 1
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 2,
                      label: "那然色布斯台音布拉格"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 3,
                      label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "齐齐哈尔",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "那然色布斯台音布拉格"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "单选：自定义按钮文字"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.value2,
                  "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                  "filter-option": "",
                  "need-dropdown-confirm": "",
                  "dropdown-confirm-btn-text": "确定",
                  "dropdown-cancel-btn-text": "取消",
                  "to-body": false
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "齐齐哈尔",
                      value: 1
                    }),
                    createVNode(_component_h_option, {
                      value: 2,
                      label: "那然色布斯台音布拉格"
                    }),
                    createVNode(_component_h_option, {
                      value: 3,
                      label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>单选：使用插槽自定义确认框</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                ref: "confirmRef",
                modelValue: _ctx.value3,
                "onUpdate:modelValue": ($event) => _ctx.value3 = $event,
                "filter-option": "",
                "need-dropdown-confirm": "",
                "to-body": false
              }, {
                dropConfirmRender: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-end", "margin": "5px" })}"${_scopeId3}>`);
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "small",
                      class: "mr-2",
                      onClick: _ctx.confirmHandle
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`确定`);
                        } else {
                          return [
                            createTextVNode("确定")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "small",
                      type: "normal",
                      onClick: _ctx.cancelHandle
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`取消`);
                        } else {
                          return [
                            createTextVNode("取消")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", { style: { "display": "flex", "justify-content": "flex-end", "margin": "5px" } }, [
                        createVNode(_component_h_button, {
                          size: "small",
                          class: "mr-2",
                          onClick: _ctx.confirmHandle
                        }, {
                          default: withCtx(() => [
                            createTextVNode("确定")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_h_button, {
                          size: "small",
                          type: "normal",
                          onClick: _ctx.cancelHandle
                        }, {
                          default: withCtx(() => [
                            createTextVNode("取消")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ];
                  }
                }),
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "齐齐哈尔",
                      value: 1
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 2,
                      label: "那然色布斯台音布拉格"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 3,
                      label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "齐齐哈尔",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "那然色布斯台音布拉格"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "单选：使用插槽自定义确认框"),
                createVNode(_component_h_select, {
                  ref: "confirmRef",
                  modelValue: _ctx.value3,
                  "onUpdate:modelValue": ($event) => _ctx.value3 = $event,
                  "filter-option": "",
                  "need-dropdown-confirm": "",
                  "to-body": false
                }, {
                  dropConfirmRender: withCtx(() => [
                    createVNode("div", { style: { "display": "flex", "justify-content": "flex-end", "margin": "5px" } }, [
                      createVNode(_component_h_button, {
                        size: "small",
                        class: "mr-2",
                        onClick: _ctx.confirmHandle
                      }, {
                        default: withCtx(() => [
                          createTextVNode("确定")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_h_button, {
                        size: "small",
                        type: "normal",
                        onClick: _ctx.cancelHandle
                      }, {
                        default: withCtx(() => [
                          createTextVNode("取消")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "齐齐哈尔",
                      value: 1
                    }),
                    createVNode(_component_h_option, {
                      value: 2,
                      label: "那然色布斯台音布拉格"
                    }),
                    createVNode(_component_h_option, {
                      value: 3,
                      label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
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
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "单选：默认"),
              createVNode(_component_h_select, {
                modelValue: _ctx.value1,
                "onUpdate:modelValue": ($event) => _ctx.value1 = $event,
                "filter-option": "",
                "need-dropdown-confirm": "",
                "show-selected-icon": "",
                "to-body": false,
                onChange: _ctx.changeHandle
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "齐齐哈尔",
                    value: ""
                  }),
                  createVNode(_component_h_option, {
                    value: 2,
                    label: "那然色布斯台音布拉格"
                  }),
                  createVNode(_component_h_option, {
                    value: 3,
                    label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "单选：自定义按钮文字"),
              createVNode(_component_h_select, {
                modelValue: _ctx.value2,
                "onUpdate:modelValue": ($event) => _ctx.value2 = $event,
                "filter-option": "",
                "need-dropdown-confirm": "",
                "dropdown-confirm-btn-text": "确定",
                "dropdown-cancel-btn-text": "取消",
                "to-body": false
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "齐齐哈尔",
                    value: 1
                  }),
                  createVNode(_component_h_option, {
                    value: 2,
                    label: "那然色布斯台音布拉格"
                  }),
                  createVNode(_component_h_option, {
                    value: 3,
                    label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "单选：使用插槽自定义确认框"),
              createVNode(_component_h_select, {
                ref: "confirmRef",
                modelValue: _ctx.value3,
                "onUpdate:modelValue": ($event) => _ctx.value3 = $event,
                "filter-option": "",
                "need-dropdown-confirm": "",
                "to-body": false
              }, {
                dropConfirmRender: withCtx(() => [
                  createVNode("div", { style: { "display": "flex", "justify-content": "flex-end", "margin": "5px" } }, [
                    createVNode(_component_h_button, {
                      size: "small",
                      class: "mr-2",
                      onClick: _ctx.confirmHandle
                    }, {
                      default: withCtx(() => [
                        createTextVNode("确定")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_h_button, {
                      size: "small",
                      type: "normal",
                      onClick: _ctx.cancelHandle
                    }, {
                      default: withCtx(() => [
                        createTextVNode("取消")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "齐齐哈尔",
                    value: 1
                  }),
                  createVNode(_component_h_option, {
                    value: 2,
                    label: "那然色布斯台音布拉格"
                  }),
                  createVNode(_component_h_option, {
                    value: 3,
                    label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
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
  _push(ssrRenderComponent(_component_h_row, { gutter: 10 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>多选：默认</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.values1,
                "onUpdate:modelValue": ($event) => _ctx.values1 = $event,
                "filter-option": "",
                "need-dropdown-confirm": "",
                multiple: "",
                "to-body": false
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "齐齐哈尔",
                      value: 1
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 2,
                      label: "那然色布斯台音布拉格"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 3,
                      label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "齐齐哈尔",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "那然色布斯台音布拉格"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "多选：默认"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.values1,
                  "onUpdate:modelValue": ($event) => _ctx.values1 = $event,
                  "filter-option": "",
                  "need-dropdown-confirm": "",
                  multiple: "",
                  "to-body": false
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "齐齐哈尔",
                      value: 1
                    }),
                    createVNode(_component_h_option, {
                      value: 2,
                      label: "那然色布斯台音布拉格"
                    }),
                    createVNode(_component_h_option, {
                      value: 3,
                      label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>多选：自定义按钮文字</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.values2,
                "onUpdate:modelValue": ($event) => _ctx.values2 = $event,
                multiple: "",
                "filter-option": "",
                "need-dropdown-confirm": "",
                "dropdown-confirm-btn-text": "确定",
                "dropdown-cancel-btn-text": "取消",
                "to-body": false
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "齐齐哈尔",
                      value: 1
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 2,
                      label: "那然色布斯台音布拉格"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 3,
                      label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "齐齐哈尔",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "那然色布斯台音布拉格"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "多选：自定义按钮文字"),
                createVNode(_component_h_select, {
                  modelValue: _ctx.values2,
                  "onUpdate:modelValue": ($event) => _ctx.values2 = $event,
                  multiple: "",
                  "filter-option": "",
                  "need-dropdown-confirm": "",
                  "dropdown-confirm-btn-text": "确定",
                  "dropdown-cancel-btn-text": "取消",
                  "to-body": false
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "齐齐哈尔",
                      value: 1
                    }),
                    createVNode(_component_h_option, {
                      value: 2,
                      label: "那然色布斯台音布拉格"
                    }),
                    createVNode(_component_h_option, {
                      value: 3,
                      label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>多选：使用插槽自定义确认框</div>`);
              _push3(ssrRenderComponent(_component_h_select, {
                ref: "confirmRef2",
                modelValue: _ctx.values3,
                "onUpdate:modelValue": ($event) => _ctx.values3 = $event,
                multiple: "",
                "filter-option": "",
                "need-dropdown-confirm": "",
                "to-body": false
              }, {
                dropConfirmRender: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-end", "margin": "5px" })}"${_scopeId3}>`);
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "small",
                      class: "mr-2",
                      onClick: _ctx.confirmHandle2
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`确定`);
                        } else {
                          return [
                            createTextVNode("确定")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_button, {
                      size: "small",
                      type: "normal",
                      onClick: _ctx.cancelHandle2
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`取消`);
                        } else {
                          return [
                            createTextVNode("取消")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", { style: { "display": "flex", "justify-content": "flex-end", "margin": "5px" } }, [
                        createVNode(_component_h_button, {
                          size: "small",
                          class: "mr-2",
                          onClick: _ctx.confirmHandle2
                        }, {
                          default: withCtx(() => [
                            createTextVNode("确定")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_h_button, {
                          size: "small",
                          type: "normal",
                          onClick: _ctx.cancelHandle2
                        }, {
                          default: withCtx(() => [
                            createTextVNode("取消")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ];
                  }
                }),
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_option, {
                      label: "齐齐哈尔",
                      value: 1
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 2,
                      label: "那然色布斯台音布拉格"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_option, {
                      value: 3,
                      label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_option, {
                        label: "齐齐哈尔",
                        value: 1
                      }),
                      createVNode(_component_h_option, {
                        value: 2,
                        label: "那然色布斯台音布拉格"
                      }),
                      createVNode(_component_h_option, {
                        value: 3,
                        label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "多选：使用插槽自定义确认框"),
                createVNode(_component_h_select, {
                  ref: "confirmRef2",
                  modelValue: _ctx.values3,
                  "onUpdate:modelValue": ($event) => _ctx.values3 = $event,
                  multiple: "",
                  "filter-option": "",
                  "need-dropdown-confirm": "",
                  "to-body": false
                }, {
                  dropConfirmRender: withCtx(() => [
                    createVNode("div", { style: { "display": "flex", "justify-content": "flex-end", "margin": "5px" } }, [
                      createVNode(_component_h_button, {
                        size: "small",
                        class: "mr-2",
                        onClick: _ctx.confirmHandle2
                      }, {
                        default: withCtx(() => [
                          createTextVNode("确定")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_h_button, {
                        size: "small",
                        type: "normal",
                        onClick: _ctx.cancelHandle2
                      }, {
                        default: withCtx(() => [
                          createTextVNode("取消")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_h_option, {
                      label: "齐齐哈尔",
                      value: 1
                    }),
                    createVNode(_component_h_option, {
                      value: 2,
                      label: "那然色布斯台音布拉格"
                    }),
                    createVNode(_component_h_option, {
                      value: 3,
                      label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
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
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "多选：默认"),
              createVNode(_component_h_select, {
                modelValue: _ctx.values1,
                "onUpdate:modelValue": ($event) => _ctx.values1 = $event,
                "filter-option": "",
                "need-dropdown-confirm": "",
                multiple: "",
                "to-body": false
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "齐齐哈尔",
                    value: 1
                  }),
                  createVNode(_component_h_option, {
                    value: 2,
                    label: "那然色布斯台音布拉格"
                  }),
                  createVNode(_component_h_option, {
                    value: 3,
                    label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "多选：自定义按钮文字"),
              createVNode(_component_h_select, {
                modelValue: _ctx.values2,
                "onUpdate:modelValue": ($event) => _ctx.values2 = $event,
                multiple: "",
                "filter-option": "",
                "need-dropdown-confirm": "",
                "dropdown-confirm-btn-text": "确定",
                "dropdown-cancel-btn-text": "取消",
                "to-body": false
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "齐齐哈尔",
                    value: 1
                  }),
                  createVNode(_component_h_option, {
                    value: 2,
                    label: "那然色布斯台音布拉格"
                  }),
                  createVNode(_component_h_option, {
                    value: 3,
                    label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "多选：使用插槽自定义确认框"),
              createVNode(_component_h_select, {
                ref: "confirmRef2",
                modelValue: _ctx.values3,
                "onUpdate:modelValue": ($event) => _ctx.values3 = $event,
                multiple: "",
                "filter-option": "",
                "need-dropdown-confirm": "",
                "to-body": false
              }, {
                dropConfirmRender: withCtx(() => [
                  createVNode("div", { style: { "display": "flex", "justify-content": "flex-end", "margin": "5px" } }, [
                    createVNode(_component_h_button, {
                      size: "small",
                      class: "mr-2",
                      onClick: _ctx.confirmHandle2
                    }, {
                      default: withCtx(() => [
                        createTextVNode("确定")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_h_button, {
                      size: "small",
                      type: "normal",
                      onClick: _ctx.cancelHandle2
                    }, {
                      default: withCtx(() => [
                        createTextVNode("取消")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(_component_h_option, {
                    label: "齐齐哈尔",
                    value: 1
                  }),
                  createVNode(_component_h_option, {
                    value: 2,
                    label: "那然色布斯台音布拉格"
                  }),
                  createVNode(_component_h_option, {
                    value: 3,
                    label: "黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
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
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/confirm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const confirm = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  confirm as default
};
