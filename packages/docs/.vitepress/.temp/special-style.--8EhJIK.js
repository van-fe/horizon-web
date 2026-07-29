import { defineComponent, resolveComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { b as __default__ } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "special-style",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_breadcrumb = resolveComponent("h-breadcrumb");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-block" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}> 单个文本超出一定长度后 </div>`);
                  _push3(ssrRenderComponent(_component_h_breadcrumb, {
                    separator: unref(__default__),
                    texts: [
                      { text: "Home" },
                      { text: "long text long text long text long text long text long text long text long text" },
                      { text: "Sub Page2" }
                    ]
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " 单个文本超出一定长度后 "),
                    createVNode(_component_h_breadcrumb, {
                      separator: unref(__default__),
                      texts: [
                        { text: "Home" },
                        { text: "long text long text long text long text long text long text long text long text" },
                        { text: "Sub Page2" }
                      ]
                    }, null, 8, ["separator"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>当前所在位置增加字重</div>`);
                  _push3(ssrRenderComponent(_component_h_breadcrumb, {
                    title: true,
                    texts: [
                      { text: "Home" },
                      { text: "Sub Page1" },
                      { text: "Sub Page2" },
                      { text: "Sub Page3" },
                      { text: "Sub Page4" }
                    ]
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "当前所在位置增加字重"),
                    createVNode(_component_h_breadcrumb, {
                      title: true,
                      texts: [
                        { text: "Home" },
                        { text: "Sub Page1" },
                        { text: "Sub Page2" },
                        { text: "Sub Page3" },
                        { text: "Sub Page4" }
                      ]
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
                  createVNode("div", { class: "demo-title" }, " 单个文本超出一定长度后 "),
                  createVNode(_component_h_breadcrumb, {
                    separator: unref(__default__),
                    texts: [
                      { text: "Home" },
                      { text: "long text long text long text long text long text long text long text long text" },
                      { text: "Sub Page2" }
                    ]
                  }, null, 8, ["separator"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "当前所在位置增加字重"),
                  createVNode(_component_h_breadcrumb, {
                    title: true,
                    texts: [
                      { text: "Home" },
                      { text: "Sub Page1" },
                      { text: "Sub Page2" },
                      { text: "Sub Page3" },
                      { text: "Sub Page4" }
                    ]
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Breadcrumb/special-style.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
