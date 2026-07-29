import { defineComponent, resolveDirective, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
const html1 = `<span>some text</span>
  <img src=x onerror="console.info('XSS attack with v-html!')">`;
const html2 = `<span>some text</span>
  <img src=x onerror="console.info('XSS attack with v-safe-html!')">`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo1",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_safe_html = resolveDirective("safe-html");
      let _temp0;
      _push(`<!--[--><div>${html1}</div><div${ssrRenderAttrs(_temp0 = ssrGetDirectiveProps(_ctx, _directive_safe_html, html2))}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : _temp0.innerHTML ?? ""}</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/directives/v-safe-html/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
