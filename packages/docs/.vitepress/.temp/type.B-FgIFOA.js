import { resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_avatar = resolveComponent("h-avatar");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-demo" }, _attrs))} data-v-37f9b43f><div class="h-demo__container" data-v-37f9b43f><div class="h-demo__title" data-v-37f9b43f>通过 size 设置形状</div>`);
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    size: "mini"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    size: "small"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    size: "smedium"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, { class: "avatar" }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    size: "large"
  }, null, _parent));
  _push(`</div><div class="h-demo__container" data-v-37f9b43f><div class="h-demo__title" data-v-37f9b43f>通过 src 自定义头像资源</div>`);
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "/demo-assets/avatar-coral.svg"
  }, null, _parent));
  _push(`</div><div class="h-demo__container" data-v-37f9b43f><div class="h-demo__title" data-v-37f9b43f>通过 fit 设置适应容器,同原生 object-fit</div>`);
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "/demo-assets/avatar-cyan.svg",
    fit: "contain"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "/demo-assets/avatar-cyan.svg"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "/demo-assets/avatar-cyan.svg",
    fit: "cover"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "/demo-assets/avatar-cyan.svg",
    fit: "none"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "/demo-assets/avatar-cyan.svg",
    fit: "scale-down"
  }, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Avatar/type.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const type = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-37f9b43f"]]);
export {
  type as default
};
