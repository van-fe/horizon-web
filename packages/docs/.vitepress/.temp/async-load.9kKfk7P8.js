import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, createTextVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const initial = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "async-load",
  __ssrInlineRender: true,
  setup(__props) {
    const current = ref(initial);
    const steps = ref([]);
    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };
    onMounted(() => {
      setTimeout(() => {
        steps.value = [
          {
            title: "First",
            content: "First-content"
          },
          {
            title: "Second",
            content: "Second-content"
          }
        ];
      }, 500);
      setTimeout(() => {
        steps.value.push(
          {
            title: "Last",
            content: "Last-content"
          }
        );
      }, 1e3);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_steps = resolveComponent("h-steps");
      const _component_h_step = resolveComponent("h-step");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_row, { gutter: 10 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-e11571c4${_scopeId2}> 设置了 <code data-v-e11571c4${_scopeId2}>index</code> 值 </div>`);
                  _push3(ssrRenderComponent(_component_h_steps, {
                    modelValue: current.value,
                    "onUpdate:modelValue": ($event) => current.value = $event,
                    initial
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_step, {
                          title: "Start",
                          index: initial
                        }, null, _parent4, _scopeId3));
                        _push4(`<!--[-->`);
                        ssrRenderList(steps.value, (item, index) => {
                          _push4(ssrRenderComponent(_component_h_step, {
                            key: item.title,
                            title: item.title,
                            index: index + initial + 1
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                        _push4(ssrRenderComponent(_component_h_step, {
                          title: "End",
                          index: steps.value.length + initial + 1
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_step, {
                            title: "Start",
                            index: initial
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(steps.value, (item, index) => {
                            return openBlock(), createBlock(_component_h_step, {
                              key: item.title,
                              title: item.title,
                              index: index + initial + 1
                            }, null, 8, ["title", "index"]);
                          }), 128)),
                          createVNode(_component_h_step, {
                            title: "End",
                            index: steps.value.length + initial + 1
                          }, null, 8, ["index"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, [
                      createTextVNode(" 设置了 "),
                      createVNode("code", null, "index"),
                      createTextVNode(" 值 ")
                    ]),
                    createVNode(_component_h_steps, {
                      modelValue: current.value,
                      "onUpdate:modelValue": ($event) => current.value = $event,
                      initial
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_step, {
                          title: "Start",
                          index: initial
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(steps.value, (item, index) => {
                          return openBlock(), createBlock(_component_h_step, {
                            key: item.title,
                            title: item.title,
                            index: index + initial + 1
                          }, null, 8, ["title", "index"]);
                        }), 128)),
                        createVNode(_component_h_step, {
                          title: "End",
                          index: steps.value.length + initial + 1
                        }, null, 8, ["index"])
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
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, [
                    createTextVNode(" 设置了 "),
                    createVNode("code", null, "index"),
                    createTextVNode(" 值 ")
                  ]),
                  createVNode(_component_h_steps, {
                    modelValue: current.value,
                    "onUpdate:modelValue": ($event) => current.value = $event,
                    initial
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_step, {
                        title: "Start",
                        index: initial
                      }),
                      (openBlock(true), createBlock(Fragment, null, renderList(steps.value, (item, index) => {
                        return openBlock(), createBlock(_component_h_step, {
                          key: item.title,
                          title: item.title,
                          index: index + initial + 1
                        }, null, 8, ["title", "index"]);
                      }), 128)),
                      createVNode(_component_h_step, {
                        title: "End",
                        index: steps.value.length + initial + 1
                      }, null, 8, ["index"])
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
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-e11571c4${_scopeId2}> 未设置 <code data-v-e11571c4${_scopeId2}>index</code> 值 </div>`);
                  _push3(ssrRenderComponent(_component_h_steps, {
                    modelValue: current.value,
                    "onUpdate:modelValue": ($event) => current.value = $event,
                    initial
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_step, { title: "Start" }, null, _parent4, _scopeId3));
                        _push4(`<!--[-->`);
                        ssrRenderList(steps.value, (item) => {
                          _push4(ssrRenderComponent(_component_h_step, {
                            key: item.title,
                            title: item.title
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                        _push4(ssrRenderComponent(_component_h_step, { title: "End" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_step, { title: "Start" }),
                          (openBlock(true), createBlock(Fragment, null, renderList(steps.value, (item) => {
                            return openBlock(), createBlock(_component_h_step, {
                              key: item.title,
                              title: item.title
                            }, null, 8, ["title"]);
                          }), 128)),
                          createVNode(_component_h_step, { title: "End" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, [
                      createTextVNode(" 未设置 "),
                      createVNode("code", null, "index"),
                      createTextVNode(" 值 ")
                    ]),
                    createVNode(_component_h_steps, {
                      modelValue: current.value,
                      "onUpdate:modelValue": ($event) => current.value = $event,
                      initial
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_step, { title: "Start" }),
                        (openBlock(true), createBlock(Fragment, null, renderList(steps.value, (item) => {
                          return openBlock(), createBlock(_component_h_step, {
                            key: item.title,
                            title: item.title
                          }, null, 8, ["title"]);
                        }), 128)),
                        createVNode(_component_h_step, { title: "End" })
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
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, [
                    createTextVNode(" 未设置 "),
                    createVNode("code", null, "index"),
                    createTextVNode(" 值 ")
                  ]),
                  createVNode(_component_h_steps, {
                    modelValue: current.value,
                    "onUpdate:modelValue": ($event) => current.value = $event,
                    initial
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_h_step, { title: "Start" }),
                      (openBlock(true), createBlock(Fragment, null, renderList(steps.value, (item) => {
                        return openBlock(), createBlock(_component_h_step, {
                          key: item.title,
                          title: item.title
                        }, null, 8, ["title"]);
                      }), 128)),
                      createVNode(_component_h_step, { title: "End" })
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
      _push(`<div class="steps-action" data-v-e11571c4>`);
      _push(ssrRenderComponent(_component_h_button, {
        disabled: current.value === initial,
        onClick: prev
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`上一步`);
          } else {
            return [
              createTextVNode("上一步")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        disabled: current.value === steps.value.length + initial + 2,
        type: "primary",
        onClick: next
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(current.value === steps.value.length + initial + 2 ? "全部完成" : "下一步")}`);
          } else {
            return [
              createTextVNode(toDisplayString(current.value === steps.value.length + initial + 2 ? "全部完成" : "下一步"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Steps/async-load.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const asyncLoad = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e11571c4"]]);
export {
  asyncLoad as default
};
