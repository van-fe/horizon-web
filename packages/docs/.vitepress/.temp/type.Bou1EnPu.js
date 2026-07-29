import { resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_avatar = resolveComponent("h-avatar");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "n-demo" }, _attrs))} data-v-47577766><div class="n-demo__container" data-v-47577766><div class="n-demo__title" data-v-47577766>通过 size 设置形状</div>`);
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
  _push(`</div><div class="n-demo__container" data-v-47577766><div class="n-demo__title" data-v-47577766>通过 src 自定义头像资源</div>`);
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  }, null, _parent));
  _push(`</div><div class="n-demo__container" data-v-47577766><div class="n-demo__title" data-v-47577766>通过 fit 设置适应容器,同原生 object-fit</div>`);
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg",
    fit: "contain"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg",
    fit: "cover"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg",
    fit: "none"
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_avatar, {
    class: "avatar",
    src: "https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg",
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
const type = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-47577766"]]);
export {
  type as default
};
