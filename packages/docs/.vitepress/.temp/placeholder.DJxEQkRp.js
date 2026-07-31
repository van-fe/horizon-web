import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { g as getDemoImageUrl } from "./demo-assets._-wFvpS1.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const imgSrc = ref("");
    let imageIndex = 0;
    const generateImage = () => {
      imgSrc.value = getDemoImageUrl(imageIndex);
      imageIndex += 1;
    };
    generateImage();
    return {
      imgSrc,
      generateImage
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _component_h_image = resolveComponent("h-image");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_h_button, {
    class: "mb-2",
    onClick: _ctx.generateImage
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`reload`);
      } else {
        return [
          createTextVNode("reload")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="flex">`);
  _push(ssrRenderComponent(_component_h_image, {
    src: _ctx.imgSrc,
    class: "mr-2",
    width: 70,
    height: 70
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_image, {
    src: _ctx.imgSrc,
    class: "mr-2",
    width: 100,
    height: 100
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_image, {
    src: _ctx.imgSrc,
    class: "mr-2",
    width: 150,
    height: 150
  }, null, _parent));
  _push(ssrRenderComponent(_component_h_image, {
    src: _ctx.imgSrc,
    width: 150,
    height: 150
  }, {
    placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flex justify-center align-center" style="${ssrRenderStyle({ "height": "100%" })}"${_scopeId}>Loading...</div>`);
      } else {
        return [
          createVNode("div", {
            class: "flex justify-center align-center",
            style: { "height": "100%" }
          }, "Loading...")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Image/placeholder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const placeholder = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  placeholder as default
};
