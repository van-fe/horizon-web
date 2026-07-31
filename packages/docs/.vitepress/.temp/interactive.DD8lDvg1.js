import { defineComponent, resolveComponent, withCtx, createTextVNode, createVNode, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { g as __default__ } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "interactive",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_page_header = resolveComponent("h-page-header");
      const _component_h_tag = resolveComponent("h-tag");
      const _component_copy_btn = resolveComponent("copy-btn");
      const _component_h_divider = resolveComponent("h-divider");
      const _component_h_link = resolveComponent("h-link");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_page_header, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` This is an extremely long header that may exceed the maximum width limit `);
          } else {
            return [
              createTextVNode(" This is an extremely long header that may exceed the maximum width limit ")
            ];
          }
        }),
        tags: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_tag, {
              size: "small",
              class: "ml-2",
              clickable: false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`标签`);
                } else {
                  return [
                    createTextVNode("标签")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_tag, {
                size: "small",
                class: "ml-2",
                clickable: false
              }, {
                default: withCtx(() => [
                  createTextVNode("标签")
                ]),
                _: 1
              })
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ID: 0012138 `);
            _push2(ssrRenderComponent(_component_copy_btn, { text: "0012138" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_divider, { direction: "vertical" }, null, _parent2, _scopeId));
            _push2(` 所有者: `);
            _push2(ssrRenderComponent(_component_h_tag, {
              avatar: "/demo-assets/avatar-indigo.svg",
              round: true,
              class: "ml-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Unknown`);
                } else {
                  return [
                    createTextVNode("Unknown")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_divider, { direction: "vertical" }, null, _parent2, _scopeId));
            _push2(` 所属空间: `);
            _push2(ssrRenderComponent(_component_h_link, {
              link: true,
              size: "small",
              type: "neutral",
              class: "ml-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(__default__), null, null, _parent3, _scopeId2));
                  _push3(` DD `);
                } else {
                  return [
                    createVNode(unref(__default__)),
                    createTextVNode(" DD ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" ID: 0012138 "),
              createVNode(_component_copy_btn, { text: "0012138" }),
              createVNode(_component_h_divider, { direction: "vertical" }),
              createTextVNode(" 所有者: "),
              createVNode(_component_h_tag, {
                avatar: "/demo-assets/avatar-indigo.svg",
                round: true,
                class: "ml-2"
              }, {
                default: withCtx(() => [
                  createTextVNode("Unknown")
                ]),
                _: 1
              }),
              createVNode(_component_h_divider, { direction: "vertical" }),
              createTextVNode(" 所属空间: "),
              createVNode(_component_h_link, {
                link: true,
                size: "small",
                type: "neutral",
                class: "ml-2"
              }, {
                default: withCtx(() => [
                  createVNode(unref(__default__)),
                  createTextVNode(" DD ")
                ]),
                _: 1
              })
            ];
          }
        }),
        extra: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`副按钮`);
                } else {
                  return [
                    createTextVNode("副按钮")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`主按钮`);
                } else {
                  return [
                    createTextVNode("主按钮")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, { plain: true }, {
                default: withCtx(() => [
                  createTextVNode("副按钮")
                ]),
                _: 1
              }),
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("主按钮")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/PageHeader/interactive.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const interactive = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-84feaa5e"]]);
export {
  interactive as default
};
