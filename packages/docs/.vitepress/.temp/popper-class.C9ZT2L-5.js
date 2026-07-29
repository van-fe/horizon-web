import { defineComponent, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  data() {
    return {
      dialogShow1: false,
      dialogShow2: false
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_popover = resolveComponent("h-popover");
  const _component_h_button = resolveComponent("h-button");
  const _component_h_pop_content = resolveComponent("h-pop-content");
  const _component_h_dialog = resolveComponent("h-dialog");
  _push(`<!--[--><div class="mb-4" data-v-7f95f917> 使用popperClass挂载样式，但是custom-style选择器写在test-wrap下面，所以没生效 </div><div class="test-wrap mb-4" data-v-7f95f917>`);
  _push(ssrRenderComponent(_component_h_popover, { "popper-class": "custom-style" }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`使用popperClass挂载样式`);
            } else {
              return [
                createTextVNode("使用popperClass挂载样式")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { plain: true }, {
            default: withCtx(() => [
              createTextVNode("使用popperClass挂载样式")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="popper" data-v-7f95f917${_scopeId2}><div class="header" data-v-7f95f917${_scopeId2}>内容标题</div><div class="content" data-v-7f95f917${_scopeId2}>我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div></div>`);
            } else {
              return [
                createVNode("div", { class: "popper" }, [
                  createVNode("div", { class: "header" }, "内容标题"),
                  createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createVNode("div", { class: "popper" }, [
                createVNode("div", { class: "header" }, "内容标题"),
                createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="mb-4" data-v-7f95f917>使用popperClass挂载样式，custom-style2选择器直接写在顶层，可以生效</div><div class="test-wrap mb-4" data-v-7f95f917>`);
  _push(ssrRenderComponent(_component_h_popover, {
    class: "mr-4",
    "popper-class": "custom-style2"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`使用popperClass挂载样式`);
            } else {
              return [
                createTextVNode("使用popperClass挂载样式")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { plain: true }, {
            default: withCtx(() => [
              createTextVNode("使用popperClass挂载样式")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="popper" data-v-7f95f917${_scopeId2}><div class="header" data-v-7f95f917${_scopeId2}>内容标题</div><div class="content" data-v-7f95f917${_scopeId2}>我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div></div>`);
            } else {
              return [
                createVNode("div", { class: "popper" }, [
                  createVNode("div", { class: "header" }, "内容标题"),
                  createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createVNode("div", { class: "popper" }, [
                createVNode("div", { class: "header" }, "内容标题"),
                createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="mb-4" data-v-7f95f917>在Dialog中使用popover，设置toBody来处理z-index的问题</div>`);
  _push(ssrRenderComponent(_component_h_button, {
    plain: true,
    class: "mb-4",
    onClick: ($event) => _ctx.dialogShow1 = true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`在Dialog中使用popover`);
      } else {
        return [
          createTextVNode("在Dialog中使用popover")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_dialog, {
    modelValue: _ctx.dialogShow1,
    "onUpdate:modelValue": ($event) => _ctx.dialogShow1 = $event,
    title: "标题",
    onPrimaryClick: ($event) => _ctx.dialogShow1 = false,
    onSecondaryClick: ($event) => _ctx.dialogShow1 = false
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_popover, { class: "mr-4" }, {
          reference: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_button, { plain: true }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`不设置toBody`);
                  } else {
                    return [
                      createTextVNode("不设置toBody")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_button, { plain: true }, {
                  default: withCtx(() => [
                    createTextVNode("不设置toBody")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pop_content, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="popper" data-v-7f95f917${_scopeId3}><div class="header" data-v-7f95f917${_scopeId3}>内容标题</div><div class="content" data-v-7f95f917${_scopeId3}>我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "popper" }, [
                        createVNode("div", { class: "header" }, "内容标题"),
                        createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pop_content, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "popper" }, [
                      createVNode("div", { class: "header" }, "内容标题"),
                      createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_popover, {
          class: "mr-4",
          "to-body": false
        }, {
          reference: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_button, { plain: true }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`设置toBody为false`);
                  } else {
                    return [
                      createTextVNode("设置toBody为false")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_button, { plain: true }, {
                  default: withCtx(() => [
                    createTextVNode("设置toBody为false")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pop_content, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="popper" data-v-7f95f917${_scopeId3}><div class="header" data-v-7f95f917${_scopeId3}>内容标题</div><div class="content" data-v-7f95f917${_scopeId3}>我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "popper" }, [
                        createVNode("div", { class: "header" }, "内容标题"),
                        createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pop_content, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "popper" }, [
                      createVNode("div", { class: "header" }, "内容标题"),
                      createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                    ])
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
          createVNode(_component_h_popover, { class: "mr-4" }, {
            reference: withCtx(() => [
              createVNode(_component_h_button, { plain: true }, {
                default: withCtx(() => [
                  createTextVNode("不设置toBody")
                ]),
                _: 1
              })
            ]),
            popper: withCtx(() => [
              createVNode(_component_h_pop_content, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "popper" }, [
                    createVNode("div", { class: "header" }, "内容标题"),
                    createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_popover, {
            class: "mr-4",
            "to-body": false
          }, {
            reference: withCtx(() => [
              createVNode(_component_h_button, { plain: true }, {
                default: withCtx(() => [
                  createTextVNode("设置toBody为false")
                ]),
                _: 1
              })
            ]),
            popper: withCtx(() => [
              createVNode(_component_h_pop_content, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "popper" }, [
                    createVNode("div", { class: "header" }, "内容标题"),
                    createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                  ])
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
  _push(`<div class="mb-4" data-v-7f95f917>在Dialog中使用popover，直接设置z-index</div>`);
  _push(ssrRenderComponent(_component_h_button, {
    plain: true,
    class: "mb-4",
    onClick: ($event) => _ctx.dialogShow2 = true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`在Dialog中使用popover`);
      } else {
        return [
          createTextVNode("在Dialog中使用popover")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_dialog, {
    modelValue: _ctx.dialogShow2,
    "onUpdate:modelValue": ($event) => _ctx.dialogShow2 = $event,
    title: "标题",
    onPrimaryClick: ($event) => _ctx.dialogShow2 = false,
    onSecondaryClick: ($event) => _ctx.dialogShow2 = false
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_popover, { class: "mr-4" }, {
          reference: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_button, { plain: true }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`不设置z-index`);
                  } else {
                    return [
                      createTextVNode("不设置z-index")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_button, { plain: true }, {
                  default: withCtx(() => [
                    createTextVNode("不设置z-index")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pop_content, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="popper" data-v-7f95f917${_scopeId3}><div class="header" data-v-7f95f917${_scopeId3}>内容标题</div><div class="content" data-v-7f95f917${_scopeId3}>我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "popper" }, [
                        createVNode("div", { class: "header" }, "内容标题"),
                        createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pop_content, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "popper" }, [
                      createVNode("div", { class: "header" }, "内容标题"),
                      createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_popover, {
          class: "mr-4",
          "popper-class": "custom-style3"
        }, {
          reference: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_button, { plain: true }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`设置z-index，注意样式如果写在scoped中可能不生效`);
                  } else {
                    return [
                      createTextVNode("设置z-index，注意样式如果写在scoped中可能不生效")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_button, { plain: true }, {
                  default: withCtx(() => [
                    createTextVNode("设置z-index，注意样式如果写在scoped中可能不生效")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pop_content, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="popper" data-v-7f95f917${_scopeId3}><div class="header" data-v-7f95f917${_scopeId3}>内容标题</div><div class="content" data-v-7f95f917${_scopeId3}>我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "popper" }, [
                        createVNode("div", { class: "header" }, "内容标题"),
                        createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pop_content, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "popper" }, [
                      createVNode("div", { class: "header" }, "内容标题"),
                      createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                    ])
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
          createVNode(_component_h_popover, { class: "mr-4" }, {
            reference: withCtx(() => [
              createVNode(_component_h_button, { plain: true }, {
                default: withCtx(() => [
                  createTextVNode("不设置z-index")
                ]),
                _: 1
              })
            ]),
            popper: withCtx(() => [
              createVNode(_component_h_pop_content, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "popper" }, [
                    createVNode("div", { class: "header" }, "内容标题"),
                    createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_popover, {
            class: "mr-4",
            "popper-class": "custom-style3"
          }, {
            reference: withCtx(() => [
              createVNode(_component_h_button, { plain: true }, {
                default: withCtx(() => [
                  createTextVNode("设置z-index，注意样式如果写在scoped中可能不生效")
                ]),
                _: 1
              })
            ]),
            popper: withCtx(() => [
              createVNode(_component_h_pop_content, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "popper" }, [
                    createVNode("div", { class: "header" }, "内容标题"),
                    createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
                  ])
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
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Popover/popper-class.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const popperClass = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-7f95f917"]]);
export {
  popperClass as default
};
