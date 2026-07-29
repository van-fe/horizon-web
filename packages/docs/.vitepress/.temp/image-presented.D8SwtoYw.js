import { defineComponent, ref, mergeProps, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { t as HEmpty } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "image-presented",
  __ssrInlineRender: true,
  setup(__props) {
    const presentedImageNameList = ref(
      Object.keys(HEmpty.PRESENTED_IMAGES)
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap" }, _attrs))}><!--[-->`);
      ssrRenderList(presentedImageNameList.value, (name) => {
        _push(`<div>`);
        _push(ssrRenderComponent(unref(HEmpty), {
          image: unref(HEmpty).PRESENTED_IMAGES[name],
          description: name
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Empty/image-presented.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
