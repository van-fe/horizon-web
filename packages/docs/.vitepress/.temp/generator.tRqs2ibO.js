import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { ar as generateFactory, a8 as tinycolor } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "generator",
  __ssrInlineRender: true,
  setup(__props) {
    const inputColor = ref("#1890ff");
    const color = ref([]);
    function setColor() {
      color.value = generateFactory(inputColor.value).colors;
    }
    function textColor(color2) {
      return tinycolor(color2).isDark() ? "#FFF" : "#000";
    }
    setColor();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_color_picker = resolveComponent("h-color-picker");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_color_picker, {
                    modelValue: inputColor.value,
                    "onUpdate:modelValue": ($event) => inputColor.value = $event,
                    editable: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_color_picker, {
                      modelValue: inputColor.value,
                      "onUpdate:modelValue": ($event) => inputColor.value = $event,
                      editable: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, {
                    size: "medium",
                    onClick: setColor
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`生成`);
                      } else {
                        return [
                          createTextVNode("生成")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, {
                      size: "medium",
                      onClick: setColor
                    }, {
                      default: withCtx(() => [
                        createTextVNode("生成")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="color-palettes" data-v-85f3568d${_scopeId2}><!--[-->`);
                  ssrRenderList(color.value, (item, index) => {
                    _push3(`<div class="color-item" style="${ssrRenderStyle({ background: item, color: textColor(item) })}" data-v-85f3568d${_scopeId2}>${ssrInterpolate(item.toUpperCase())}</div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "color-palettes" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(color.value, (item, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "color-item",
                          style: { background: item, color: textColor(item) }
                        }, toDisplayString(item.toUpperCase()), 5);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_color_picker, {
                    modelValue: inputColor.value,
                    "onUpdate:modelValue": ($event) => inputColor.value = $event,
                    editable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_button, {
                    size: "medium",
                    onClick: setColor
                  }, {
                    default: withCtx(() => [
                      createTextVNode("生成")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "color-palettes" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(color.value, (item, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "color-item",
                        style: { background: item, color: textColor(item) }
                      }, toDisplayString(item.toUpperCase()), 5);
                    }), 128))
                  ])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/colors/demos/generator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const generator = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-85f3568d"]]);
export {
  generator as default
};
