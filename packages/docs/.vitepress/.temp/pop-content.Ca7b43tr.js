import { resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_popover = resolveComponent("h-popover");
  const _component_h_button = resolveComponent("h-button");
  const _component_h_pop_content = resolveComponent("h-pop-content");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_popover, {
    class: "mr-4",
    "popper-class": "content_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`使用PopContent组件包裹内容`);
            } else {
              return [
                createTextVNode("使用PopContent组件包裹内容")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { plain: true }, {
            default: withCtx(() => [
              createTextVNode("使用PopContent组件包裹内容")
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
              _push3(`<div class="popper"${_scopeId2}><div class="header"${_scopeId2}>内容标题</div><div class="content"${_scopeId2}>我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div></div>`);
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
  _push(ssrRenderComponent(_component_h_popover, { "popper-class": "content_popper" }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`不使用PopContent组件包裹内容`);
            } else {
              return [
                createTextVNode("不使用PopContent组件包裹内容")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { plain: true }, {
            default: withCtx(() => [
              createTextVNode("不使用PopContent组件包裹内容")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="nocontent-wrap popper"${_scopeId}><div class="header"${_scopeId}>内容标题</div><div class="content"${_scopeId}>我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div></div>`);
      } else {
        return [
          createVNode("div", { class: "nocontent-wrap popper" }, [
            createVNode("div", { class: "header" }, "内容标题"),
            createVNode("div", { class: "content" }, "我是气泡卡片文本描述内容, 我是气泡卡片文字链接...")
          ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Popover/pop-content.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const popContent = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  popContent as default
};
