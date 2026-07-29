import { defineComponent, inject, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrInterpolate } from "vue/server-renderer";
import { l as localeInjectKey, d as defaultLocale } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo1",
  __ssrInlineRender: true,
  setup(__props) {
    const locale = inject(localeInjectKey, defaultLocale);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[--><p>now: ${ssrInterpolate(_ctx.td()["horizon-web"].datePicker.now)}</p><p>cancel: ${ssrInterpolate((_a = unref(locale)) == null ? void 0 : _a.langService.td()["horizon-web"].colorPicker.cancel)}</p><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/features/locale/demos/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
