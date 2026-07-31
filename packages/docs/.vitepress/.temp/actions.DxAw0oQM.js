import { defineComponent, ref, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const sizes = [150, 80, 40];
    const actions2 = ref([]);
    const imgLoad = () => {
      actions2.value = [
        {
          icon: "scale_big",
          title: "放大",
          handler: (src) => {
            console.info("scale_big", src);
          }
        },
        {
          icon: "download",
          title: "下载",
          handler: (src) => {
            console.info("download", src);
          }
        },
        {
          icon: "rubbish",
          title: "删除",
          handler: (src) => {
            console.info("close", src);
          }
        }
      ];
    };
    const imgError = () => {
      actions2.value = [
        {
          icon: "refresh",
          title: "重新加载",
          handler: (src) => {
            console.info("refresh", src);
          }
        }
      ];
    };
    return {
      sizes,
      actions: actions2,
      imgLoad,
      imgError
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_image = resolveComponent("h-image");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}><!--[-->`);
  ssrRenderList(_ctx.sizes, (size) => {
    _push(ssrRenderComponent(_component_h_image, {
      key: size,
      src: "/demo-assets/scene-aurora.svg",
      "show-actions": true,
      "actions-list": _ctx.actions,
      class: "mr-2",
      width: size,
      height: size,
      onLoad: _ctx.imgLoad,
      onError: _ctx.imgError
    }, null, _parent));
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Image/actions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const actions = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  actions as default
};
