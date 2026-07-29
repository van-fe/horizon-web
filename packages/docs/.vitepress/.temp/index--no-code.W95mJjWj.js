import { defineComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { a8 as tinycolor, c as colors } from "./app.js";
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    return {
      colors,
      isDark: (color) => tinycolor(color).isDark(),
      textColor(color) {
        return tinycolor(color).isDark() ? "#FFF" : "#000";
      }
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "flex flex-wrap",
    style: { "max-width": "780px" }
  }, _attrs))}><!--[-->`);
  ssrRenderList(_ctx.colors, (lists, typeName) => {
    _push(`<!--[-->`);
    if (Array.isArray(lists)) {
      _push(`<div class="pr-4 pb-4" style="${ssrRenderStyle({ "width": "33.333%" })}"><div class="text-lg mb-2">${ssrInterpolate(typeName)}</div><!--[-->`);
      ssrRenderList(lists, (color, index) => {
        _push(`<div class="flex justify-space-between p-3 text-center mb-1 rounded" style="${ssrRenderStyle({
          backgroundColor: color,
          color: _ctx.textColor(color)
        })}"><div>${ssrInterpolate(`${typeName}-${index + 1}`)}</div><span>${ssrInterpolate(color.toUpperCase())}</span></div>`);
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--><div class="pr-4 pb-4" style="${ssrRenderStyle({ "width": "33.333%" })}"><div class="text-lg mb-2">others</div><div class="flex justify-space-between p-3 text-center mb-1 rounded" style="${ssrRenderStyle({ "background-color": "#000", "color": "#fff" })}"><div> black </div><span>#000000</span></div><div class="flex justify-space-between p-3 text-center mb-1 rounded" style="${ssrRenderStyle({ "background-color": "#fff" })}"><div> white </div><span>#FFFFFF</span></div><div class="flex justify-space-between p-3 text-center mb-1 rounded" style="${ssrRenderStyle({ "background-color": "transparent" })}"><div> transparent </div><span>transparent</span></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/colors/demos/index--no-code.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index_NoCode = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index_NoCode as default
};
