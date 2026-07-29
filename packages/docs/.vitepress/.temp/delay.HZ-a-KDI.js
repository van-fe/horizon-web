import { resolveComponent, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_hover = resolveComponent("h-hover");
  const _component_h_button = resolveComponent("h-button");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-16636185>`);
  _push(ssrRenderComponent(_component_h_hover, { "hover-show-delay": 1e3 }, {
    default: withCtx(({ hover }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="container" data-v-16636185${_scopeId}><span data-v-16636185${_scopeId}>容器1 按钮延迟1000 ms 出现</span>`);
        if (hover) {
          _push2(ssrRenderComponent(_component_h_button, { size: "medium" }, {
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`延迟出现`);
              } else {
                return [
                  createTextVNode("延迟出现")
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "container" }, [
            createVNode("span", null, "容器1 按钮延迟1000 ms 出现"),
            hover ? (openBlock(), createBlock(_component_h_button, {
              key: 0,
              size: "medium"
            }, {
              default: withCtx(() => [
                createTextVNode("延迟出现")
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_hover, { "hover-hide-delay": 1e3 }, {
    default: withCtx(({ hover }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="container" data-v-16636185${_scopeId}><span data-v-16636185${_scopeId}>容器2 按钮延迟1000 ms 隐藏</span>`);
        if (hover) {
          _push2(ssrRenderComponent(_component_h_button, { size: "medium" }, {
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`延迟隐藏`);
              } else {
                return [
                  createTextVNode("延迟隐藏")
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "container" }, [
            createVNode("span", null, "容器2 按钮延迟1000 ms 隐藏"),
            hover ? (openBlock(), createBlock(_component_h_button, {
              key: 0,
              size: "medium"
            }, {
              default: withCtx(() => [
                createTextVNode("延迟隐藏")
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Hover/delay.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const delay = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-16636185"]]);
export {
  delay as default
};
