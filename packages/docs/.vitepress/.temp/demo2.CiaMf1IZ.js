import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    return {
      visible1: ref(false),
      primaryButton: ref(true),
      secondaryButton: ref(true),
      visible2: ref(false),
      visible3: ref(false)
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _component_h_dialog = resolveComponent("h-dialog");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: ($event) => {
      _ctx.primaryButton = true;
      _ctx.secondaryButton = true;
      _ctx.visible1 = true;
    }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` 默认显示全部按钮 `);
      } else {
        return [
          createTextVNode(" 默认显示全部按钮 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: ($event) => {
      _ctx.primaryButton = true;
      _ctx.secondaryButton = false;
      _ctx.visible1 = true;
    }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` 只显示主要按钮 `);
      } else {
        return [
          createTextVNode(" 只显示主要按钮 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: ($event) => {
      _ctx.primaryButton = false;
      _ctx.secondaryButton = false;
      _ctx.visible1 = true;
    }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` 不显示按钮 `);
      } else {
        return [
          createTextVNode(" 不显示按钮 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: ($event) => _ctx.visible2 = true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`自定义底部区域`);
      } else {
        return [
          createTextVNode("自定义底部区域")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_dialog, {
    modelValue: _ctx.visible1,
    "onUpdate:modelValue": ($event) => _ctx.visible1 = $event,
    title: "标题",
    "primary-button": _ctx.primaryButton,
    "secondary-button": _ctx.secondaryButton
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}>随便写点什么</div>`);
      } else {
        return [
          createVNode("div", null, "随便写点什么")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_dialog, {
    modelValue: _ctx.visible2,
    "onUpdate:modelValue": ($event) => _ctx.visible2 = $event,
    title: "标题"
  }, {
    footer: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flex"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_h_button, {
          type: "normal",
          class: "ml-auto"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`辅助按钮`);
            } else {
              return [
                createTextVNode("辅助按钮")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_button, { plain: true }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`次要按钮`);
            } else {
              return [
                createTextVNode("次要按钮")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_button, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`主要按钮`);
            } else {
              return [
                createTextVNode("主要按钮")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "flex" }, [
            createVNode(_component_h_button, {
              type: "normal",
              class: "ml-auto"
            }, {
              default: withCtx(() => [
                createTextVNode("辅助按钮")
              ]),
              _: 1
            }),
            createVNode(_component_h_button, { plain: true }, {
              default: withCtx(() => [
                createTextVNode("次要按钮")
              ]),
              _: 1
            }),
            createVNode(_component_h_button, null, {
              default: withCtx(() => [
                createTextVNode("主要按钮")
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}>随便写点什么</div>`);
      } else {
        return [
          createVNode("div", null, "随便写点什么")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_dialog, {
    modelValue: _ctx.visible3,
    "onUpdate:modelValue": ($event) => _ctx.visible3 = $event,
    title: "标题",
    "primary-button-props": {
      type: "primary",
      kind: "negative"
    },
    "secondary-button-props": {
      type: "text",
      kind: "neutral"
    }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}>随便写点什么</div>`);
      } else {
        return [
          createVNode("div", null, "随便写点什么")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Dialog/demo2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  demo2 as default
};
