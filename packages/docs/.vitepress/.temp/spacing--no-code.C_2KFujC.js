import { defineComponent, resolveComponent, mergeProps, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { t as tokens } from "./theme.BRUcC0DO.js";
import "./app.js";
import { s as snakeCase } from "./snakeCase.C8M_p3qe.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "spacing--no-code",
  __ssrInlineRender: true,
  setup(__props) {
    function cssVariableNameToJsName(cssVariableName) {
      return snakeCase(cssVariableName.replace(/^--h-/, ""));
    }
    const formatTokenName = (token) => token.replace(
      /([A-Z][a-z]*|\d+)/gu,
      (curr, index) => index === 0 ? curr.toLowerCase() : `-${curr.toLowerCase()}`
    );
    function getFontList(currTokens) {
      const list = [];
      const handler = (currTokens2) => {
        Object.entries(currTokens2 || {}).map(([key, value]) => {
          if (typeof value === "object") {
            return handler(value);
          } else if (typeof value === "string") {
            list.push({
              label: key,
              rawLabel: key,
              value
            });
          }
        });
      };
      handler(currTokens);
      return list;
    }
    function getElementTokenRealValue(elementTokens, groupedBasicTokens) {
      const list = {};
      const handler = (current, subTree, parentKey) => {
        Object.entries(current).forEach(([key, value]) => {
          var _a;
          if (typeof value === "object" && value !== null) {
            subTree[key] = {};
            handler(value, subTree[key], parentKey.concat(key));
          } else if (typeof value === "string") {
            const reg = /^var\((.*?)\)$/;
            if (reg.test(value)) {
              const cssVariable = ((_a = value.match(reg)) == null ? void 0 : _a[1]) || "";
              const target = groupedBasicTokens.find(
                (curr) => curr.rawLabel === cssVariableNameToJsName(cssVariable)
              );
              const currentValue = (target == null ? void 0 : target.value) ?? value;
              subTree[key] = {
                label: formatTokenName(key),
                value: currentValue,
                refToken: `--h-${key.replace(/_/g, "-")}`,
                rawLabel: key,
                rawValue: value,
                path: `element.${parentKey.concat(key).join(".")}`
              };
            } else {
              subTree[key] = {
                label: formatTokenName(key),
                value,
                refToken: `--h-${key.replace(/_/g, "-")}`,
                rawLabel: key,
                rawValue: value,
                path: `element.${parentKey.concat(key).join(".")}`
              };
            }
          }
        });
      };
      handler(elementTokens, list, []);
      return list;
    }
    const basicFontListTokens = getFontList(tokens.basic.font);
    const elementListTokens = getElementTokenRealValue(tokens.element, basicFontListTokens);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_copy_btn = resolveComponent("copy-btn");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "colors" }, _attrs))} data-v-79bbbf32><!--[-->`);
      ssrRenderList(unref(elementListTokens).spacing, (token) => {
        _push(`<div class="color" data-v-79bbbf32><div class="label" data-v-79bbbf32><div class="key" data-v-79bbbf32>${ssrInterpolate(token.refToken)} `);
        _push(ssrRenderComponent(_component_copy_btn, {
          text: token.refToken
        }, null, _parent));
        _push(`</div></div><div class="value" data-v-79bbbf32>${ssrInterpolate(token.value)}</div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/features/tokens/demos/spacing--no-code.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const spacing_NoCode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-79bbbf32"]]);
export {
  spacing_NoCode as default
};
