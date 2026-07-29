import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, h, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
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
  },
  data() {
    return {
      maskOption: {
        enable: true
        // class: 'mask-opacity',
        // to: document.querySelector('#app')
      }
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_popover = resolveComponent("h-popover");
  const _component_h_button = resolveComponent("h-button");
  const _component_demo_content = resolveComponent("demo-content");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb16" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_h_popover, {
    class: "mr16",
    "popper-class": "mask_popover",
    trigger: "click",
    placement: "top",
    "show-with-mask": _ctx.maskOption
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`show with mask`);
            } else {
              return [
                createTextVNode("show with mask")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { plain: true }, {
            default: withCtx(() => [
              createTextVNode("show with mask")
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
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Popover/mask.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mask = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  mask as default
};
