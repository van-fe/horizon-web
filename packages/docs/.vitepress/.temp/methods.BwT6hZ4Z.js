import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { a6 as $notify } from "./app.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    let instance = null;
    const open = async () => {
      instance = await $notify({
        title: "实例",
        content: "这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。"
      });
    };
    function close1() {
      instance.close();
    }
    function close2() {
      instance.closeAll();
    }
    return {
      open,
      close1,
      close2
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-wrapper" }, _attrs))} data-v-ec2ba3d0>`);
  _push(ssrRenderComponent(_component_h_button, {
    size: "medium",
    type: "primary",
    plain: "",
    onClick: _ctx.open
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`打开实例`);
      } else {
        return [
          createTextVNode("打开实例")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    size: "medium",
    type: "primary",
    plain: "",
    onClick: _ctx.close1
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`关闭当前实例`);
      } else {
        return [
          createTextVNode("关闭当前实例")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    size: "medium",
    type: "primary",
    plain: "",
    onClick: _ctx.close2
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`关闭所有实例`);
      } else {
        return [
          createTextVNode("关闭所有实例")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/Notification/methods.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const methods = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ec2ba3d0"]]);
export {
  methods as default
};
