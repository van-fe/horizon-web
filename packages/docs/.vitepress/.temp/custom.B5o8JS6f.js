import { defineComponent, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as __default__ } from "./app.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  components: {
    AIcon: __default__
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_breadcrumb = resolveComponent("h-breadcrumb");
  const _component_a_icon = resolveComponent("a-icon");
  const _component_h_breadcrumb_item = resolveComponent("h-breadcrumb-item");
  _push(`<!--[--><div class="text-subtitle-2 mb-2">自定义分隔符</div>`);
  _push(ssrRenderComponent(_component_h_breadcrumb, {
    class: "mb-2",
    texts: [{ text: "Home" }, { text: "Sub Page1" }, { text: "Sub Page2" }],
    separator: "*"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_breadcrumb, { texts: [{ text: "Home" }, { text: "Sub Page1" }, { text: "Sub Page2" }] }, {
    separator: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_a_icon, {
          name: "gift",
          size: "12"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_a_icon, {
            name: "gift",
            size: "12"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="text-subtitle-2 mt-4 mb-2">自定义面包屑内容</div>`);
  _push(ssrRenderComponent(_component_h_breadcrumb, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_breadcrumb_item, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_breadcrumb_item, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Sub Page1 `);
              _push3(ssrRenderComponent(_component_a_icon, {
                name: "repair_filled",
                size: "12"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createTextVNode(" Sub Page1 "),
                createVNode(_component_a_icon, {
                  name: "repair_filled",
                  size: "12"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_breadcrumb_item, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Sub Page2`);
            } else {
              return [
                createTextVNode("Sub Page2")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_breadcrumb_item, null, {
            default: withCtx(() => [
              createTextVNode("Home")
            ]),
            _: 1
          }),
          createVNode(_component_h_breadcrumb_item, null, {
            default: withCtx(() => [
              createTextVNode(" Sub Page1 "),
              createVNode(_component_a_icon, {
                name: "repair_filled",
                size: "12"
              })
            ]),
            _: 1
          }),
          createVNode(_component_h_breadcrumb_item, null, {
            default: withCtx(() => [
              createTextVNode("Sub Page2")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="text-subtitle-2 mt-4 mb-2">自定义面包屑内容，并自定义分隔符</div>`);
  _push(ssrRenderComponent(_component_h_breadcrumb, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_breadcrumb_item, { separator: "*" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_breadcrumb_item, { separator: "?" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Sub Page1`);
            } else {
              return [
                createTextVNode("Sub Page1")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_breadcrumb_item, { separator: "!" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Sub Page2`);
            } else {
              return [
                createTextVNode("Sub Page2")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_breadcrumb_item, { separator: "*" }, {
            default: withCtx(() => [
              createTextVNode("Home")
            ]),
            _: 1
          }),
          createVNode(_component_h_breadcrumb_item, { separator: "?" }, {
            default: withCtx(() => [
              createTextVNode("Sub Page1")
            ]),
            _: 1
          }),
          createVNode(_component_h_breadcrumb_item, { separator: "!" }, {
            default: withCtx(() => [
              createTextVNode("Sub Page2")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_breadcrumb, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_breadcrumb_item, null, {
          separator: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`*`);
            } else {
              return [
                createTextVNode("*")
              ];
            }
          }),
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Home `);
            } else {
              return [
                createTextVNode(" Home ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_breadcrumb_item, null, {
          separator: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`?`);
            } else {
              return [
                createTextVNode("?")
              ];
            }
          }),
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Sub Page1 `);
            } else {
              return [
                createTextVNode(" Sub Page1 ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_breadcrumb_item, null, {
          separator: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`!`);
            } else {
              return [
                createTextVNode("!")
              ];
            }
          }),
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Sub Page2 `);
            } else {
              return [
                createTextVNode(" Sub Page2 ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_breadcrumb_item, null, {
            separator: withCtx(() => [
              createTextVNode("*")
            ]),
            default: withCtx(() => [
              createTextVNode(" Home ")
            ]),
            _: 1
          }),
          createVNode(_component_h_breadcrumb_item, null, {
            separator: withCtx(() => [
              createTextVNode("?")
            ]),
            default: withCtx(() => [
              createTextVNode(" Sub Page1 ")
            ]),
            _: 1
          }),
          createVNode(_component_h_breadcrumb_item, null, {
            separator: withCtx(() => [
              createTextVNode("!")
            ]),
            default: withCtx(() => [
              createTextVNode(" Sub Page2 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Breadcrumb/custom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const custom = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  custom as default
};
