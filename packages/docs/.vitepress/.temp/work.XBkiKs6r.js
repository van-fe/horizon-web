import { resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_avatar = resolveComponent("h-avatar");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-demo" }, _attrs))} data-v-220a50a3><div class="h-demo__container" data-v-220a50a3><div class="h-demo__title" data-v-220a50a3>通过 type 设置类型</div>`);
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    icon: "friend",
    type: "work",
    size: "mini"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    icon: "friend",
    type: "work",
    size: "small"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    icon: "friend",
    type: "work",
    size: "smedium"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    icon: "friend",
    type: "work"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    icon: "friend",
    type: "work",
    size: "large"
  }, null, _parent));
  _push(`</div><div class="h-demo__container" data-v-220a50a3><div class="h-demo__title" data-v-220a50a3>自定义颜色</div>`);
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    icon: "friend",
    type: "work",
    style: { "color": "#178ca6", "border-color": "#178ca6" }
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    icon: "friend",
    type: "work",
    style: { "color": "#0ba1d6", "border-color": "#0ba1d6" }
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    icon: "friend",
    type: "work",
    style: { "color": "#00bebe", "border-color": "#00bebe" }
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    icon: "friend",
    type: "work",
    style: { "color": "#e56c25", "border-color": "#e56c25" }
  }, null, _parent));
  _push(`</div><div class="h-demo__container" data-v-220a50a3><div class="h-demo__title" data-v-220a50a3>通过 src 设置文字</div>`);
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "Design",
    type: "work",
    size: "mini"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "Design",
    type: "work",
    size: "small"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "Design",
    type: "work",
    size: "smedium"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "Design",
    type: "work"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "Design",
    type: "work",
    size: "large"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "平台设计",
    type: "work",
    size: "mini"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "平台设计",
    type: "work",
    size: "small"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "平台设计",
    type: "work",
    size: "smedium"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "平台设计",
    type: "work"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "平台设计",
    type: "work",
    size: "large"
  }, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Avatar/work.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const work = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-220a50a3"]]);
export {
  work as default
};
