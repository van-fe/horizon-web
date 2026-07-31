import { defineComponent, ref, resolveComponent, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { t as tokens } from "./theme.BRUcC0DO.js";
import "./app.js";
import { s as snakeCase } from "./snakeCase.C8M_p3qe.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "font-size--no-code",
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
    const currentTabs = ref("lineHeight");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      const _component_h_panels = resolveComponent("h-panels");
      const _component_h_panel = resolveComponent("h-panel");
      const _component_copy_btn = resolveComponent("copy-btn");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "colors" }, _attrs))} data-v-e236daa4>`);
      _push(ssrRenderComponent(_component_h_tabs, {
        modelValue: currentTabs.value,
        "onUpdate:modelValue": ($event) => currentTabs.value = $event,
        type: "page"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(elementListTokens).font, (group, key) => {
              _push2(ssrRenderComponent(_component_h_tab, {
                key,
                name: key
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(key)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(key), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(elementListTokens).font, (group, key) => {
                return openBlock(), createBlock(_component_h_tab, {
                  key,
                  name: key
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(key), 1)
                  ]),
                  _: 2
                }, 1032, ["name"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_panels, {
        modelValue: currentTabs.value,
        "onUpdate:modelValue": ($event) => currentTabs.value = $event,
        type: "page"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(elementListTokens).font, (group, key) => {
              _push2(ssrRenderComponent(_component_h_panel, {
                key,
                name: key
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(group, (token) => {
                      _push3(`<div class="color" data-v-e236daa4${_scopeId2}><div class="label" data-v-e236daa4${_scopeId2}><div class="key" data-v-e236daa4${_scopeId2}>${ssrInterpolate(token.refToken)} `);
                      _push3(ssrRenderComponent(_component_copy_btn, {
                        text: token.refToken
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div><div class="value" data-v-e236daa4${_scopeId2}>${ssrInterpolate(token.value)}</div></div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(group, (token) => {
                        return openBlock(), createBlock("div", {
                          key: token.label,
                          class: "color"
                        }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("div", { class: "key" }, [
                              createTextVNode(toDisplayString(token.refToken) + " ", 1),
                              createVNode(_component_copy_btn, {
                                text: token.refToken
                              }, null, 8, ["text"])
                            ])
                          ]),
                          createVNode("div", { class: "value" }, toDisplayString(token.value), 1)
                        ]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(elementListTokens).font, (group, key) => {
                return openBlock(), createBlock(_component_h_panel, {
                  key,
                  name: key
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(group, (token) => {
                      return openBlock(), createBlock("div", {
                        key: token.label,
                        class: "color"
                      }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("div", { class: "key" }, [
                            createTextVNode(toDisplayString(token.refToken) + " ", 1),
                            createVNode(_component_copy_btn, {
                              text: token.refToken
                            }, null, 8, ["text"])
                          ])
                        ]),
                        createVNode("div", { class: "value" }, toDisplayString(token.value), 1)
                      ]);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["name"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/features/tokens/demos/font-size--no-code.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const fontSize_NoCode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e236daa4"]]);
export {
  fontSize_NoCode as default
};
