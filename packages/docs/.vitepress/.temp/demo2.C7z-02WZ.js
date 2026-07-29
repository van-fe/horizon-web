import { defineComponent, resolveDirective, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
const html = `<div id="my-div"><span class="my-span" style="color: red;">some text</span></div>`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo2",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_safe_html = resolveDirective("safe-html");
      let _temp0;
      _push(`<div${ssrRenderAttrs(_temp0 = mergeProps(_attrs, ssrGetDirectiveProps(_ctx, _directive_safe_html, {
        html,
        options: {
          ALLOWED_TAGS: ["span", "p"],
          ALLOWED_ATTR: ["style"]
        }
      })))}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : _temp0.innerHTML ?? ""}</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-safe-html/demo2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
