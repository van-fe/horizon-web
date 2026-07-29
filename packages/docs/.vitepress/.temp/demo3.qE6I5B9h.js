import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const visible = ref(false);
    const icon = ref("");
    const onPrimary = () => {
      visible.value = false;
    };
    const title = ref("");
    return {
      icon,
      visible,
      onPrimary,
      title
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
      _ctx.title = "标题";
      _ctx.visible = true;
      _ctx.icon = "warning_filled";
    }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` 有图标时 `);
      } else {
        return [
          createTextVNode(" 有图标时 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: ($event) => {
      _ctx.title = "标题";
      _ctx.visible = true;
      _ctx.icon = "";
    }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` 无图标时 `);
      } else {
        return [
          createTextVNode(" 无图标时 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_dialog, {
    modelValue: _ctx.visible,
    "onUpdate:modelValue": ($event) => _ctx.visible = $event,
    title: _ctx.title,
    onPrimaryClick: _ctx.onPrimary,
    "icon-name": _ctx.icon,
    "icon-color": "orange"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="content" data-v-9f7fb3be${_scopeId}>随便写点什么</div>`);
      } else {
        return [
          createVNode("div", { class: "content" }, "随便写点什么")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Dialog/demo3.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-9f7fb3be"]]);
export {
  demo3 as default
};
