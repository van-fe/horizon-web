import { defineComponent, ref, resolveComponent, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createBlock, createVNode, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { a8 as tinycolor } from "./app.js";
import { t as tokens } from "./theme.Bzcu2eW2.js";
import { g as groupBy } from "./groupBy.DlcuIUtR.js";
import { s as snakeCase } from "./snakeCase.C8M_p3qe.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "color--no-code",
  __ssrInlineRender: true,
  setup(__props) {
    function unwrappedRGBToHex(unwrappedRGB) {
      return `#${tinycolor(`rgb(${unwrappedRGB})`).toHex(false)}`;
    }
    const isColor = (value) => /^rgb(a)*/.test(value);
    const colorTokenReg = /^rgb(a)*\(var\(([\w-]+)\)(,\s*var\(([\w-]+)\))*\)$/;
    const getBasicToken = (value) => value.replace(colorTokenReg, "$2");
    const getAlphaValue = (value) => value.replace(colorTokenReg, "$4");
    const formatTokenName = (token) => token.replace(
      /([A-Z][a-z]*|\d+)/gu,
      (curr, index) => index === 0 ? curr.toLowerCase() : `-${curr.toLowerCase()}`
    );
    const getHexValue = (rgb) => `#${tinycolor(`rgb(${rgb})`).toHex(false)}`;
    const getInstanceValue = (basicToken, colors) => {
      const basicKey = snakeCase(basicToken.replace("--n-", ""));
      return getHexValue(colors[basicKey]);
    };
    const getAlphaInstanceValue = (alphaToken, opacity) => {
      const basicKey = snakeCase(alphaToken.replace("--n-", ""));
      return Number(opacity[basicKey]);
    };
    const tinyColorToRgba = (tinyColor2) => {
      return `rgba(${tinyColor2.r}, ${tinyColor2.g}, ${tinyColor2.b}, ${tinyColor2.a})`;
    };
    function getOpacityList(opacityTokens) {
      return Object.entries(opacityTokens || {}).map(([key, value]) => {
        return {
          label: key,
          refToken: `--n-${key.replace(/_/g, "-")}`,
          rawLabel: key,
          value: parseFloat(value),
          isDark: parseFloat(value) >= 0.4
        };
      });
    }
    function getGroupedBasicColorToken(basicToken) {
      return Object.entries(
        groupBy(Object.entries(basicToken ?? {}), ([label]) => label.match(/^color_\d+/)[0])
      ).map(([key, values]) => {
        const rawKey = `${key}_name`;
        const colorNameTarget = values.find(([currKey]) => currKey === rawKey);
        const primaryColor = values.find(([currKey]) => currKey === `${key}_6`)[1];
        return {
          label: colorNameTarget[1],
          rawName: key,
          primaryColor: unwrappedRGBToHex(primaryColor),
          rawKey,
          children: values.filter((val) => val !== colorNameTarget).map(([colorKey, value]) => {
            return {
              label: colorKey.replace(key, colorNameTarget[1]),
              value,
              hexValue: unwrappedRGBToHex(value),
              group: key,
              rawLabel: colorKey
            };
          })
        };
      });
    }
    function getGroupedElementColorToken(elementColorToken, groupedBasicTokens, colors, opacity) {
      return Object.entries(elementColorToken).map(([groupKey, data]) => ({
        label: groupKey,
        children: Object.entries(data).map(([key, value]) => {
          var _a, _b;
          const currentIsColor = isColor(value);
          const basicToken = getBasicToken(value);
          const basicTokenFormatted = basicToken.replace(/^--n-/, "");
          const basicTokenShowRawName = ((_a = basicTokenFormatted.match(/^(color-\d+)-/)) == null ? void 0 : _a[1]) ?? "";
          const basicTokenShowGroupName = ((_b = groupedBasicTokens.find(
            (curr) => curr.rawName.replace(/_/g, "-") === basicTokenShowRawName
          )) == null ? void 0 : _b.label) ?? "";
          const basicTokenShowName = basicTokenFormatted.replace(
            basicTokenShowRawName,
            basicTokenShowGroupName
          );
          const alphaToken = getAlphaValue(value) || "--n-opacity-10";
          const alphaValue = getAlphaInstanceValue(alphaToken, opacity);
          const color = tinycolor(getInstanceValue(basicToken, colors)).setAlpha(alphaValue);
          return {
            label: formatTokenName(key),
            basicToken,
            basicJsToken: snakeCase(basicToken.replace("--n-", "")),
            refToken: `--n-${key.replace(/_/g, "-")}`,
            showValue: basicTokenShowName,
            alphaToken,
            alphaJsKey: snakeCase(alphaToken.replace("--n-", "")),
            alphaValue,
            hex: currentIsColor ? color.toHexString() : "",
            hex8: color.toHex8String(),
            rgba: tinyColorToRgba(color),
            isDark: color.isDark()
          };
        })
      })).sort((a, b) => a.label.localeCompare(b.label) * -1);
    }
    const alphaTokens = getOpacityList(tokens.basic.opacity);
    const basicColorTokens = getGroupedBasicColorToken(tokens.basic.color);
    const elementTokens = getGroupedElementColorToken(tokens.element.colors, basicColorTokens, tokens.basic.color, tokens.basic.opacity);
    const currentTabs = ref("text");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      const _component_h_panels = resolveComponent("h-panels");
      const _component_h_panel = resolveComponent("h-panel");
      const _component_copy_btn = resolveComponent("copy-btn");
      const _component_h_tooltip = resolveComponent("h-tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "colors" }, _attrs))} data-v-16f17f7f>`);
      _push(ssrRenderComponent(_component_h_tabs, {
        modelValue: currentTabs.value,
        "onUpdate:modelValue": ($event) => currentTabs.value = $event,
        type: "page"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(elementTokens), (group) => {
              _push2(ssrRenderComponent(_component_h_tab, {
                key: group.label,
                name: group.label
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(group.label)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(group.label), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(_component_h_tab, { name: "alpha" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`alpha`);
                } else {
                  return [
                    createTextVNode("alpha")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(elementTokens), (group) => {
                return openBlock(), createBlock(_component_h_tab, {
                  key: group.label,
                  name: group.label
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(group.label), 1)
                  ]),
                  _: 2
                }, 1032, ["name"]);
              }), 128)),
              createVNode(_component_h_tab, { name: "alpha" }, {
                default: withCtx(() => [
                  createTextVNode("alpha")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_panels, { "model-value": currentTabs.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(elementTokens), (group) => {
              _push2(ssrRenderComponent(_component_h_panel, {
                key: group.label,
                name: group.label
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(group.children, (color) => {
                      _push3(`<div class="${ssrRenderClass({ "color": true, "inverse": color.refToken.includes("inverse") })}" data-v-16f17f7f${_scopeId2}><div class="label" data-v-16f17f7f${_scopeId2}><div class="preview" data-v-16f17f7f${_scopeId2}><div class="color" style="${ssrRenderStyle({ backgroundColor: color.hex8 })}" data-v-16f17f7f${_scopeId2}></div></div><div class="key" data-v-16f17f7f${_scopeId2}>${ssrInterpolate(color.refToken)} `);
                      _push3(ssrRenderComponent(_component_copy_btn, {
                        text: color.refToken
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                      _push3(ssrRenderComponent(_component_h_tooltip, {
                        enterable: true,
                        "click-to-copy": true
                      }, {
                        content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(color.hex8.toUpperCase())}, ${ssrInterpolate(color.rgba)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(color.hex8.toUpperCase()) + ", " + toDisplayString(color.rgba), 1)
                            ];
                          }
                        }),
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="value" data-v-16f17f7f${_scopeId3}>#${ssrInterpolate(color.showValue.replace(/-/g, "_"))} @ ${ssrInterpolate(color.alphaJsKey)}</div>`);
                          } else {
                            return [
                              createVNode("div", { class: "value" }, "#" + toDisplayString(color.showValue.replace(/-/g, "_")) + " @ " + toDisplayString(color.alphaJsKey), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(group.children, (color) => {
                        return openBlock(), createBlock("div", {
                          key: color.label,
                          class: { "color": true, "inverse": color.refToken.includes("inverse") }
                        }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("div", { class: "preview" }, [
                              createVNode("div", {
                                class: "color",
                                style: { backgroundColor: color.hex8 }
                              }, null, 4)
                            ]),
                            createVNode("div", { class: "key" }, [
                              createTextVNode(toDisplayString(color.refToken) + " ", 1),
                              createVNode(_component_copy_btn, {
                                text: color.refToken
                              }, null, 8, ["text"])
                            ])
                          ]),
                          createVNode(_component_h_tooltip, {
                            enterable: true,
                            "click-to-copy": true
                          }, {
                            content: withCtx(() => [
                              createTextVNode(toDisplayString(color.hex8.toUpperCase()) + ", " + toDisplayString(color.rgba), 1)
                            ]),
                            default: withCtx(() => [
                              createVNode("div", { class: "value" }, "#" + toDisplayString(color.showValue.replace(/-/g, "_")) + " @ " + toDisplayString(color.alphaJsKey), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ], 2);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(_component_h_panel, { name: "alpha" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(alphaTokens), (opacity) => {
                    _push3(`<div class="color" data-v-16f17f7f${_scopeId2}><div class="label" data-v-16f17f7f${_scopeId2}><div class="preview" data-v-16f17f7f${_scopeId2}><div class="color" style="${ssrRenderStyle({ backgroundColor: `rgba(255, 255, 255, ${opacity.value})` })}" data-v-16f17f7f${_scopeId2}></div></div><div class="key" data-v-16f17f7f${_scopeId2}>${ssrInterpolate(opacity.refToken)} `);
                    _push3(ssrRenderComponent(_component_copy_btn, {
                      text: opacity.refToken
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div><div class="value" data-v-16f17f7f${_scopeId2}>${ssrInterpolate(opacity.value)}</div></div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(alphaTokens), (opacity) => {
                      return openBlock(), createBlock("div", {
                        key: opacity.label,
                        class: "color"
                      }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("div", { class: "preview" }, [
                            createVNode("div", {
                              class: "color",
                              style: { backgroundColor: `rgba(255, 255, 255, ${opacity.value})` }
                            }, null, 4)
                          ]),
                          createVNode("div", { class: "key" }, [
                            createTextVNode(toDisplayString(opacity.refToken) + " ", 1),
                            createVNode(_component_copy_btn, {
                              text: opacity.refToken
                            }, null, 8, ["text"])
                          ])
                        ]),
                        createVNode("div", { class: "value" }, toDisplayString(opacity.value), 1)
                      ]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(elementTokens), (group) => {
                return openBlock(), createBlock(_component_h_panel, {
                  key: group.label,
                  name: group.label
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(group.children, (color) => {
                      return openBlock(), createBlock("div", {
                        key: color.label,
                        class: { "color": true, "inverse": color.refToken.includes("inverse") }
                      }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("div", { class: "preview" }, [
                            createVNode("div", {
                              class: "color",
                              style: { backgroundColor: color.hex8 }
                            }, null, 4)
                          ]),
                          createVNode("div", { class: "key" }, [
                            createTextVNode(toDisplayString(color.refToken) + " ", 1),
                            createVNode(_component_copy_btn, {
                              text: color.refToken
                            }, null, 8, ["text"])
                          ])
                        ]),
                        createVNode(_component_h_tooltip, {
                          enterable: true,
                          "click-to-copy": true
                        }, {
                          content: withCtx(() => [
                            createTextVNode(toDisplayString(color.hex8.toUpperCase()) + ", " + toDisplayString(color.rgba), 1)
                          ]),
                          default: withCtx(() => [
                            createVNode("div", { class: "value" }, "#" + toDisplayString(color.showValue.replace(/-/g, "_")) + " @ " + toDisplayString(color.alphaJsKey), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ], 2);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["name"]);
              }), 128)),
              createVNode(_component_h_panel, { name: "alpha" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(alphaTokens), (opacity) => {
                    return openBlock(), createBlock("div", {
                      key: opacity.label,
                      class: "color"
                    }, [
                      createVNode("div", { class: "label" }, [
                        createVNode("div", { class: "preview" }, [
                          createVNode("div", {
                            class: "color",
                            style: { backgroundColor: `rgba(255, 255, 255, ${opacity.value})` }
                          }, null, 4)
                        ]),
                        createVNode("div", { class: "key" }, [
                          createTextVNode(toDisplayString(opacity.refToken) + " ", 1),
                          createVNode(_component_copy_btn, {
                            text: opacity.refToken
                          }, null, 8, ["text"])
                        ])
                      ]),
                      createVNode("div", { class: "value" }, toDisplayString(opacity.value), 1)
                    ]);
                  }), 128))
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/features/tokens/demos/color--no-code.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const color_NoCode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-16f17f7f"]]);
export {
  color_NoCode as default
};
