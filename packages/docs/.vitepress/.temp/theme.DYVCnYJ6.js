import { defineComponent, ref, watchEffect, h, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { a7 as themes, c as colors } from "./app.js";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    const currentVal = ref([]);
    const bgColorValue = ref("");
    const textColorValue = ref("");
    watchEffect(() => {
      themes.set(
        {
          bgPrimary: bgColorValue.value
        },
        document.body
      );
    });
    watchEffect(() => {
      themes.set({
        textPrimary: textColorValue.value
      });
    });
    return {
      bgColorValue,
      textColorValue,
      currentVal,
      teals: colors.brand,
      blues: colors.blue,
      options: [
        {
          value: "a",
          label: "1",
          children: [
            {
              value: "a-a",
              label: (option) => h(
                "div",
                {
                  style: "border: 1px solid #f00;"
                },
                [h("span", {}, ["我的值是：", option.value])]
              ),
              children: [
                {
                  value: "a-a-a",
                  label: "1-1-1"
                },
                {
                  value: "a-a-b",
                  label: "1-1-2"
                }
              ]
            },
            {
              value: "a-b",
              label: "1-2",
              children: [
                {
                  value: "a-b-a",
                  label: "1-2-1"
                },
                {
                  value: "a-b-b",
                  label: "1-2-2"
                }
              ]
            },
            {
              value: "a-c",
              label: "1-3",
              children: [
                {
                  value: "a-c-a",
                  label: "1-3-1"
                }
              ]
            }
          ]
        },
        {
          value: "b",
          label: "2",
          children: [
            {
              value: "b-a",
              label: "2-1"
            },
            {
              value: "b-b",
              label: "2-2",
              children: [
                {
                  value: "b-b-a",
                  label: "2-2-1"
                }
              ]
            }
          ]
        }
      ]
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_select = resolveComponent("h-select");
  const _component_h_option = resolveComponent("h-option");
  const _component_h_cascader = resolveComponent("h-cascader");
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-2" style="${ssrRenderStyle({ "width": "220px", "display": "flex", "align-items": "center", "justify-content": "space-between" })}"> 背景主题色: `);
  _push(ssrRenderComponent(_component_h_select, {
    modelValue: _ctx.bgColorValue,
    "onUpdate:modelValue": ($event) => _ctx.bgColorValue = $event
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.teals, (color) => {
          _push2(ssrRenderComponent(_component_h_option, {
            key: color,
            value: color,
            label: color
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.teals, (color) => {
            return openBlock(), createBlock(_component_h_option, {
              key: color,
              value: color,
              label: color
            }, null, 8, ["value", "label"]);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="mb-2" style="${ssrRenderStyle({ "width": "220px", "display": "flex", "align-items": "center", "justify-content": "space-between" })}"> 文字主题色: `);
  _push(ssrRenderComponent(_component_h_select, {
    modelValue: _ctx.textColorValue,
    "onUpdate:modelValue": ($event) => _ctx.textColorValue = $event
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.blues, (color) => {
          _push2(ssrRenderComponent(_component_h_option, {
            key: color,
            value: color,
            label: color
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.blues, (color) => {
            return openBlock(), createBlock(_component_h_option, {
              key: color,
              value: color,
              label: color
            }, null, 8, ["value", "label"]);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_h_cascader, {
    modelValue: _ctx.currentVal,
    "onUpdate:modelValue": ($event) => _ctx.currentVal = $event,
    options: _ctx.options
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/features/theme/demos/theme.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const theme = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  theme as default
};
