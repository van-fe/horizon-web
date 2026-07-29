import { defineComponent, resolveComponent, withCtx, unref, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { g as __default__, h as __default__$1, $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
  __ssrInlineRender: true,
  setup(__props) {
    function onCommand(type) {
      switch (type) {
        case "edit":
          $message.info("编辑");
          break;
        case "del":
          $message.error("删除");
          break;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_hover = resolveComponent("h-hover");
      const _component_h_mask = resolveComponent("h-mask");
      const _component_h_controls = resolveComponent("h-controls");
      const _component_h_control = resolveComponent("h-control");
      _push(ssrRenderComponent(_component_h_hover, _attrs, {
        default: withCtx(({ hover }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="square" data-v-c39fd5b3${_scopeId}> Mouse move here `);
            _push2(ssrRenderComponent(_component_h_mask, {
              absolute: true,
              value: hover,
              "content-full-size": true
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_controls, {
                    theme: "light",
                    onCommand
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_control, {
                          label: "edit",
                          icon: unref(__default__),
                          text: "编辑"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_control, {
                          label: "del",
                          icon: unref(__default__$1),
                          text: "删除"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_control, {
                            label: "edit",
                            icon: unref(__default__),
                            text: "编辑"
                          }, null, 8, ["icon"]),
                          createVNode(_component_h_control, {
                            label: "del",
                            icon: unref(__default__$1),
                            text: "删除"
                          }, null, 8, ["icon"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_controls, {
                      theme: "light",
                      onCommand
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_control, {
                          label: "edit",
                          icon: unref(__default__),
                          text: "编辑"
                        }, null, 8, ["icon"]),
                        createVNode(_component_h_control, {
                          label: "del",
                          icon: unref(__default__$1),
                          text: "删除"
                        }, null, 8, ["icon"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "square" }, [
                createTextVNode(" Mouse move here "),
                createVNode(_component_h_mask, {
                  absolute: true,
                  value: hover,
                  "content-full-size": true
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_controls, {
                      theme: "light",
                      onCommand
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_control, {
                          label: "edit",
                          icon: unref(__default__),
                          text: "编辑"
                        }, null, 8, ["icon"]),
                        createVNode(_component_h_control, {
                          label: "del",
                          icon: unref(__default__$1),
                          text: "删除"
                        }, null, 8, ["icon"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["value"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Controls/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const basic = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c39fd5b3"]]);
export {
  basic as default
};
