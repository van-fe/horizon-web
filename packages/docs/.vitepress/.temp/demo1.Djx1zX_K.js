import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const visible = ref(false);
    const visible2 = ref(false);
    const onPrimary = () => {
      console.info("Primary button clicked!");
      visible2.value = true;
    };
    const onPrimary2 = () => {
      console.info(`2nd dialog's primary button clicked!`);
      visible2.value = false;
    };
    const onSecondary = () => {
      console.info("Secondary button clicked!");
      visible.value = false;
    };
    const onSecondary2 = () => {
      console.info("2nd dialog's secondary button clicked!");
      visible.value = false;
      visible2.value = false;
    };
    return {
      visible,
      visible2,
      onPrimary,
      onSecondary,
      onPrimary2,
      onSecondary2
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _component_h_dialog = resolveComponent("h-dialog");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_button, {
    onClick: ($event) => _ctx.visible = true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`点我`);
      } else {
        return [
          createTextVNode("点我")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_dialog, {
    modelValue: _ctx.visible,
    "onUpdate:modelValue": ($event) => _ctx.visible = $event,
    title: "标题",
    onPrimaryClick: _ctx.onPrimary,
    onSecondaryClick: _ctx.onSecondary
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}>点击 OK 会打开第二个 Dialog</div><div${_scopeId}>点击 Cancel 会关闭当前 Dialog</div>`);
      } else {
        return [
          createVNode("div", null, "点击 OK 会打开第二个 Dialog"),
          createVNode("div", null, "点击 Cancel 会关闭当前 Dialog")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_dialog, {
    modelValue: _ctx.visible2,
    "onUpdate:modelValue": ($event) => _ctx.visible2 = $event,
    title: "标题",
    onPrimaryClick: _ctx.onPrimary2,
    onSecondaryClick: _ctx.onSecondary2
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}>点击 OK 会关闭当前 Dialog</div><div${_scopeId}>点击 Cancel 会关闭所有 Dialog</div>`);
      } else {
        return [
          createVNode("div", null, "点击 OK 会关闭当前 Dialog"),
          createVNode("div", null, "点击 Cancel 会关闭所有 Dialog")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Dialog/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  demo1 as default
};
