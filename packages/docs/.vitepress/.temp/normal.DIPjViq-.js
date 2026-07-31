import { defineComponent, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const src_url_1 = [
      "/demo-assets/avatar-coral.svg"
    ];
    const src_url_2 = [
      "/demo-assets/avatar-coral.svg",
      "/demo-assets/avatar-indigo.svg"
    ];
    const src_url_3 = [
      "/demo-assets/avatar-coral.svg",
      "/demo-assets/avatar-indigo.svg",
      "/demo-assets/avatar-cyan.svg"
    ];
    return {
      src_url_1,
      src_url_2,
      src_url_3
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_avatar = resolveComponent("h-avatar");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-demo" }, _attrs))} data-v-ca47ed2c><div class="h-demo__container" data-v-ca47ed2c><div class="h-demo__title" data-v-ca47ed2c>默认随机图片头像</div>`);
  _push(ssrRenderComponent(_component_h_avatar, null, null, _parent));
  _push(`</div><div class="h-demo__container" data-v-ca47ed2c><div class="h-demo__title" data-v-ca47ed2c>群拼接头像(1个人)</div>`);
  _push(ssrRenderComponent(_component_h_avatar, { src: _ctx.src_url_1 }, null, _parent));
  _push(`</div><div class="h-demo__container" data-v-ca47ed2c><div class="h-demo__title" data-v-ca47ed2c>群拼接头像(2个人)</div>`);
  _push(ssrRenderComponent(_component_h_avatar, { src: _ctx.src_url_2 }, null, _parent));
  _push(`</div><div class="h-demo__container" data-v-ca47ed2c><div class="h-demo__title" data-v-ca47ed2c>群拼接头像(3个及以上)</div>`);
  _push(ssrRenderComponent(_component_h_avatar, { src: _ctx.src_url_3 }, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Avatar/normal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const normal = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ca47ed2c"]]);
export {
  normal as default
};
