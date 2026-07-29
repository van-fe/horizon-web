import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, withModifiers, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "close-trigger",
  __ssrInlineRender: true,
  setup(__props) {
    const hideEventType = ref("click");
    const show = ref(false);
    const onShow = () => {
      show.value = true;
    };
    const onHide = () => {
      show.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_popover = resolveComponent("h-popover");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_pop_content = resolveComponent("h-pop-content");
      _push(ssrRenderComponent(_component_h_space, mergeProps({
        direction: "vertical",
        block: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>hide event type</div>`);
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: hideEventType.value,
                    "onUpdate:modelValue": ($event) => hideEventType.value = $event,
                    label: "click"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`click`);
                      } else {
                        return [
                          createTextVNode("click")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: hideEventType.value,
                    "onUpdate:modelValue": ($event) => hideEventType.value = $event,
                    label: "mousedown"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`mousedown`);
                      } else {
                        return [
                          createTextVNode("mousedown")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_radio, {
                    modelValue: hideEventType.value,
                    "onUpdate:modelValue": ($event) => hideEventType.value = $event,
                    label: "mouseup"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`mouseup`);
                      } else {
                        return [
                          createTextVNode("mouseup")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, "hide event type"),
                    createVNode(_component_h_radio, {
                      modelValue: hideEventType.value,
                      "onUpdate:modelValue": ($event) => hideEventType.value = $event,
                      label: "click"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("click")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_radio, {
                      modelValue: hideEventType.value,
                      "onUpdate:modelValue": ($event) => hideEventType.value = $event,
                      label: "mousedown"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("mousedown")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_h_radio, {
                      modelValue: hideEventType.value,
                      "onUpdate:modelValue": ($event) => hideEventType.value = $event,
                      label: "mouseup"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("mouseup")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_popover, {
                    trigger: "click",
                    "hide-event-type": hideEventType.value,
                    "popper-class": "arrow_popover",
                    onShow,
                    onOnHide: onHide
                  }, {
                    reference: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, { plain: true }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`点击打开Popover，通过全局 ${ssrInterpolate(hideEventType.value)} 事件关闭`);
                            } else {
                              return [
                                createTextVNode("点击打开Popover，通过全局 " + toDisplayString(hideEventType.value) + " 事件关闭", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, { plain: true }, {
                            default: withCtx(() => [
                              createTextVNode("点击打开Popover，通过全局 " + toDisplayString(hideEventType.value) + " 事件关闭", 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    popper: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_pop_content, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="popper"${_scopeId4}><div class="header"${_scopeId4}>内容标题</div><div class="content"${_scopeId4}>我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div></div>`);
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
                        }, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_popover, {
                      trigger: "click",
                      "hide-event-type": hideEventType.value,
                      "popper-class": "arrow_popover",
                      onShow,
                      onOnHide: onHide
                    }, {
                      reference: withCtx(() => [
                        createVNode(_component_h_button, { plain: true }, {
                          default: withCtx(() => [
                            createTextVNode("点击打开Popover，通过全局 " + toDisplayString(hideEventType.value) + " 事件关闭", 1)
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
                    }, 8, ["hide-event-type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_space, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="block-card c1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_space, {
                    block: "",
                    direction: "vertical",
                    size: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>阻止 click 事件的冒泡</div>`);
                        if (show.value && hideEventType.value === "click") {
                          _push4(`<strong${_scopeId3}>点击不能关闭</strong>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", null, "阻止 click 事件的冒泡"),
                          show.value && hideEventType.value === "click" ? (openBlock(), createBlock("strong", { key: 0 }, "点击不能关闭")) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="block-card c2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_space, {
                    block: "",
                    direction: "vertical",
                    size: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>阻止 mousedown 事件的冒泡</div>`);
                        if (show.value && hideEventType.value === "mousedown") {
                          _push4(`<strong${_scopeId3}>点击不能关闭</strong>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", null, "阻止 mousedown 事件的冒泡"),
                          show.value && hideEventType.value === "mousedown" ? (openBlock(), createBlock("strong", { key: 0 }, "点击不能关闭")) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="block-card c3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_space, {
                    block: "",
                    direction: "vertical",
                    size: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>阻止 mouseup 事件的冒泡</div>`);
                        if (show.value && hideEventType.value === "mouseup") {
                          _push4(`<strong${_scopeId3}>点击不能关闭</strong>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", null, "阻止 mouseup 事件的冒泡"),
                          show.value && hideEventType.value === "mouseup" ? (openBlock(), createBlock("strong", { key: 0 }, "点击不能关闭")) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "block-card c1",
                      onClick: withModifiers(() => {
                      }, ["stop"])
                    }, [
                      createVNode(_component_h_space, {
                        block: "",
                        direction: "vertical",
                        size: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", null, "阻止 click 事件的冒泡"),
                          show.value && hideEventType.value === "click" ? (openBlock(), createBlock("strong", { key: 0 }, "点击不能关闭")) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 8, ["onClick"]),
                    createVNode("div", {
                      class: "block-card c2",
                      onMousedown: withModifiers(() => {
                      }, ["stop"])
                    }, [
                      createVNode(_component_h_space, {
                        block: "",
                        direction: "vertical",
                        size: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", null, "阻止 mousedown 事件的冒泡"),
                          show.value && hideEventType.value === "mousedown" ? (openBlock(), createBlock("strong", { key: 0 }, "点击不能关闭")) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 40, ["onMousedown"]),
                    createVNode("div", {
                      class: "block-card c3",
                      onMouseup: withModifiers(() => {
                      }, ["stop"])
                    }, [
                      createVNode(_component_h_space, {
                        block: "",
                        direction: "vertical",
                        size: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", null, "阻止 mouseup 事件的冒泡"),
                          show.value && hideEventType.value === "mouseup" ? (openBlock(), createBlock("strong", { key: 0 }, "点击不能关闭")) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 40, ["onMouseup"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_space, null, {
                default: withCtx(() => [
                  createVNode("div", null, "hide event type"),
                  createVNode(_component_h_radio, {
                    modelValue: hideEventType.value,
                    "onUpdate:modelValue": ($event) => hideEventType.value = $event,
                    label: "click"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("click")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_radio, {
                    modelValue: hideEventType.value,
                    "onUpdate:modelValue": ($event) => hideEventType.value = $event,
                    label: "mousedown"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("mousedown")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_h_radio, {
                    modelValue: hideEventType.value,
                    "onUpdate:modelValue": ($event) => hideEventType.value = $event,
                    label: "mouseup"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("mouseup")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_space, null, {
                default: withCtx(() => [
                  createVNode(_component_h_popover, {
                    trigger: "click",
                    "hide-event-type": hideEventType.value,
                    "popper-class": "arrow_popover",
                    onShow,
                    onOnHide: onHide
                  }, {
                    reference: withCtx(() => [
                      createVNode(_component_h_button, { plain: true }, {
                        default: withCtx(() => [
                          createTextVNode("点击打开Popover，通过全局 " + toDisplayString(hideEventType.value) + " 事件关闭", 1)
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
                  }, 8, ["hide-event-type"])
                ]),
                _: 1
              }),
              createVNode(_component_h_space, null, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: "block-card c1",
                    onClick: withModifiers(() => {
                    }, ["stop"])
                  }, [
                    createVNode(_component_h_space, {
                      block: "",
                      direction: "vertical",
                      size: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", null, "阻止 click 事件的冒泡"),
                        show.value && hideEventType.value === "click" ? (openBlock(), createBlock("strong", { key: 0 }, "点击不能关闭")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ], 8, ["onClick"]),
                  createVNode("div", {
                    class: "block-card c2",
                    onMousedown: withModifiers(() => {
                    }, ["stop"])
                  }, [
                    createVNode(_component_h_space, {
                      block: "",
                      direction: "vertical",
                      size: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", null, "阻止 mousedown 事件的冒泡"),
                        show.value && hideEventType.value === "mousedown" ? (openBlock(), createBlock("strong", { key: 0 }, "点击不能关闭")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ], 40, ["onMousedown"]),
                  createVNode("div", {
                    class: "block-card c3",
                    onMouseup: withModifiers(() => {
                    }, ["stop"])
                  }, [
                    createVNode(_component_h_space, {
                      block: "",
                      direction: "vertical",
                      size: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", null, "阻止 mouseup 事件的冒泡"),
                        show.value && hideEventType.value === "mouseup" ? (openBlock(), createBlock("strong", { key: 0 }, "点击不能关闭")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ], 40, ["onMouseup"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Popover/close-trigger.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
