import { defineComponent, resolveComponent, withCtx, createVNode, createTextVNode, h, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import { F as HPopContent } from "./app.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const DemoContent = defineComponent({
  render: () => h(
    HPopContent,
    {},
    {
      default: () => h(
        "div",
        {
          class: "popper"
        },
        [
          h(
            "div",
            {
              class: "header"
            },
            ["内容标题"]
          ),
          h(
            "div",
            {
              class: "content"
            },
            ["我是气泡卡片文本描述内容, 我是气泡卡片文字链接..."]
          )
        ]
      )
    }
  )
});
const _sfc_main = defineComponent({
  components: {
    DemoContent
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_popover = resolveComponent("h-popover");
  const _component_h_button = resolveComponent("h-button");
  const _component_demo_content = resolveComponent("demo-content");
  _push(`<!--[--><div class="mb-4"> 调整popper和reference的远近，小三角会影响 distance 的效果，这里的 demo 不使用小三角以方便展示 distance 的效果 </div><div class="mb-4">`);
  _push(ssrRenderComponent(_component_h_popover, {
    class: "mr-4",
    arrow: false,
    distance: 0,
    "popper-class": "offset_popover"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`distance 0`);
            } else {
              return [
                createTextVNode("distance 0")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { plain: true }, {
            default: withCtx(() => [
              createTextVNode("distance 0")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_demo_content, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_demo_content)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_popover, {
    class: "mr-4",
    arrow: false,
    distance: 10,
    "popper-class": "offset_popover"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`distance 10`);
            } else {
              return [
                createTextVNode("distance 10")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { plain: true }, {
            default: withCtx(() => [
              createTextVNode("distance 10")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_demo_content, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_demo_content)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_popover, {
    class: "mr-4",
    arrow: false,
    distance: -10,
    "popper-class": "offset_popover"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`distance -10`);
            } else {
              return [
                createTextVNode("distance -10")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { plain: true }, {
            default: withCtx(() => [
              createTextVNode("distance -10")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_demo_content, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_demo_content)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="mb-4">调整popper在辅助方向上的偏移</div><div class="mb-4">`);
  _push(ssrRenderComponent(_component_h_popover, {
    class: "mr-4",
    skidding: 0,
    placement: "top",
    "popper-class": "offset_popover"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`placement top: skidding 0`);
            } else {
              return [
                createTextVNode("placement top: skidding 0")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, null, {
            default: withCtx(() => [
              createTextVNode("placement top: skidding 0")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_demo_content, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_demo_content)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_popover, {
    class: "mr-4",
    skidding: 30,
    placement: "top",
    "popper-class": "offset_popover"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`placement top: skidding 30`);
            } else {
              return [
                createTextVNode("placement top: skidding 30")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, null, {
            default: withCtx(() => [
              createTextVNode("placement top: skidding 30")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_demo_content, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_demo_content)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_popover, {
    class: "mr-4",
    skidding: -30,
    placement: "top",
    "popper-class": "offset_popover"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`placement top: skidding -30`);
            } else {
              return [
                createTextVNode("placement top: skidding -30")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, null, {
            default: withCtx(() => [
              createTextVNode("placement top: skidding -30")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_demo_content, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_demo_content)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="mb-4">`);
  _push(ssrRenderComponent(_component_h_popover, {
    class: "mr-4",
    skidding: 0,
    placement: "left",
    "popper-class": "offset_popover"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`placement left: skidding 0`);
            } else {
              return [
                createTextVNode("placement left: skidding 0")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, null, {
            default: withCtx(() => [
              createTextVNode("placement left: skidding 0")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_demo_content, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_demo_content)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_popover, {
    class: "mr-4",
    skidding: 30,
    placement: "left",
    "popper-class": "offset_popover"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`placement left: skidding 30`);
            } else {
              return [
                createTextVNode("placement left: skidding 30")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, null, {
            default: withCtx(() => [
              createTextVNode("placement left: skidding 30")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_demo_content, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_demo_content)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_popover, {
    class: "mr-4",
    skidding: -30,
    placement: "left",
    "popper-class": "offset_popover"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`placement left: skidding -30`);
            } else {
              return [
                createTextVNode("placement left: skidding -30")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, null, {
            default: withCtx(() => [
              createTextVNode("placement left: skidding -30")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_demo_content, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_demo_content)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Popover/offset.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const offset = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  offset as default
};
