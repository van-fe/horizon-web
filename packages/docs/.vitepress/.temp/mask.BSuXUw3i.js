import { defineComponent, shallowRef, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mask",
  __ssrInlineRender: true,
  setup(__props) {
    const firstRef = shallowRef(null);
    const thirdRef = shallowRef(null);
    const visible = ref(false);
    function start() {
      visible.value = true;
    }
    function onClose() {
      $message.warning("跳过了新手引导");
    }
    function onFinish() {
      $message.success("完成了新手引导");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_divider = resolveComponent("h-divider");
      const _component_h_guide = resolveComponent("h-guide");
      const _component_h_guide_item = resolveComponent("h-guide-item");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, {
                    ref_key: "firstRef",
                    ref: firstRef
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`First`);
                      } else {
                        return [
                          createTextVNode("First")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_button, { class: "guide-second-mask" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Second`);
                      } else {
                        return [
                          createTextVNode("Second")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_button, {
                    ref_key: "thirdRef",
                    ref: thirdRef
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Third`);
                      } else {
                        return [
                          createTextVNode("Third")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, {
                      ref_key: "firstRef",
                      ref: firstRef
                    }, {
                      default: withCtx(() => [
                        createTextVNode("First")
                      ]),
                      _: 1
                    }, 512),
                    createVNode(_component_h_button, { class: "guide-second-mask" }, {
                      default: withCtx(() => [
                        createTextVNode("Second")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_button, {
                      ref_key: "thirdRef",
                      ref: thirdRef
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Third")
                      ]),
                      _: 1
                    }, 512)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_divider, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, { onClick: start }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Start`);
                      } else {
                        return [
                          createTextVNode("Start")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, { onClick: start }, {
                      default: withCtx(() => [
                        createTextVNode("Start")
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
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_button, {
                    ref_key: "firstRef",
                    ref: firstRef
                  }, {
                    default: withCtx(() => [
                      createTextVNode("First")
                    ]),
                    _: 1
                  }, 512),
                  createVNode(_component_h_button, { class: "guide-second-mask" }, {
                    default: withCtx(() => [
                      createTextVNode("Second")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_button, {
                    ref_key: "thirdRef",
                    ref: thirdRef
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Third")
                    ]),
                    _: 1
                  }, 512)
                ]),
                _: 1
              }),
              createVNode(_component_h_divider),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_button, { onClick: start }, {
                    default: withCtx(() => [
                      createTextVNode("Start")
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
      _push(ssrRenderComponent(_component_h_guide, {
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        mask: false,
        type: "primary",
        onClose,
        onFinish
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_guide_item, {
              target: firstRef.value,
              title: "第一步",
              content: "第一步就是第一步"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_guide_item, {
              target: ".guide-second-mask",
              title: "第二步",
              content: "第二步就是第二步",
              placement: "top-start",
              image: "/demo-assets/guide-card.svg"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_guide_item, {
              target: thirdRef.value,
              title: "第三步",
              content: "第三步就是第三步",
              placement: "right-start"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_guide_item, {
              title: "第四步",
              content: "第四步全局居中了"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_guide_item, {
                target: firstRef.value,
                title: "第一步",
                content: "第一步就是第一步"
              }, null, 8, ["target"]),
              createVNode(_component_h_guide_item, {
                target: ".guide-second-mask",
                title: "第二步",
                content: "第二步就是第二步",
                placement: "top-start",
                image: "/demo-assets/guide-card.svg"
              }),
              createVNode(_component_h_guide_item, {
                target: thirdRef.value,
                title: "第三步",
                content: "第三步就是第三步",
                placement: "right-start"
              }, null, 8, ["target"]),
              createVNode(_component_h_guide_item, {
                title: "第四步",
                content: "第四步全局居中了"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Guide/mask.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
