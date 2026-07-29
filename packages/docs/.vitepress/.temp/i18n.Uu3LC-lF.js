import { defineComponent, inject, resolveComponent, mergeProps, unref, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { l as localeInjectKey, d as defaultLocale, L as LocaleSupportLang } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "i18n",
  __ssrInlineRender: true,
  setup(__props) {
    const locale = inject(localeInjectKey, defaultLocale);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_application = resolveComponent("h-application");
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(ssrRenderComponent(_component_h_application, mergeProps({
        locale: unref(locale).current
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form, { "label-position": "left" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_form_item, { label: "current language" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_select, {
                          modelValue: unref(locale).current,
                          "onUpdate:modelValue": ($event) => unref(locale).current = $event,
                          size: "small",
                          style: { "width": "120px", "display": "inline-block" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(LocaleSupportLang), (item) => {
                                _push5(ssrRenderComponent(_component_h_option, {
                                  key: item,
                                  value: item,
                                  label: item
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(LocaleSupportLang), (item) => {
                                  return openBlock(), createBlock(_component_h_option, {
                                    key: item,
                                    value: item,
                                    label: item
                                  }, null, 8, ["value", "label"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_select, {
                            modelValue: unref(locale).current,
                            "onUpdate:modelValue": ($event) => unref(locale).current = $event,
                            size: "small",
                            style: { "width": "120px", "display": "inline-block" }
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(LocaleSupportLang), (item) => {
                                return openBlock(), createBlock(_component_h_option, {
                                  key: item,
                                  value: item,
                                  label: item
                                }, null, 8, ["value", "label"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_form_item, { label: "current language" }, {
                      default: withCtx(() => [
                        createVNode(_component_h_select, {
                          modelValue: unref(locale).current,
                          "onUpdate:modelValue": ($event) => unref(locale).current = $event,
                          size: "small",
                          style: { "width": "120px", "display": "inline-block" }
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(LocaleSupportLang), (item) => {
                              return openBlock(), createBlock(_component_h_option, {
                                key: item,
                                value: item,
                                label: item
                              }, null, 8, ["value", "label"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p style="${ssrRenderStyle({ "margin-top": "20px" })}"${_scopeId}>${ssrInterpolate(_ctx.td().horizonWeb.datePicker.now)}</p><p${_scopeId}>${ssrInterpolate(_ctx.td().horizonWeb.datePicker.today)}</p>`);
          } else {
            return [
              createVNode(_component_h_form, { "label-position": "left" }, {
                default: withCtx(() => [
                  createVNode(_component_h_form_item, { label: "current language" }, {
                    default: withCtx(() => [
                      createVNode(_component_h_select, {
                        modelValue: unref(locale).current,
                        "onUpdate:modelValue": ($event) => unref(locale).current = $event,
                        size: "small",
                        style: { "width": "120px", "display": "inline-block" }
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(LocaleSupportLang), (item) => {
                            return openBlock(), createBlock(_component_h_option, {
                              key: item,
                              value: item,
                              label: item
                            }, null, 8, ["value", "label"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("p", { style: { "margin-top": "20px" } }, toDisplayString(_ctx.td().horizonWeb.datePicker.now), 1),
              createVNode("p", null, toDisplayString(_ctx.td().horizonWeb.datePicker.today), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Application/i18n.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
