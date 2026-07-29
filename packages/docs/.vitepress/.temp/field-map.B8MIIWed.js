import { defineComponent, ref, h, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const currentVal1 = ref([]);
    return {
      currentVal1,
      options1: [
        {
          id: "a",
          tag: "1",
          children: [
            {
              id: "a-a",
              tag: (option) => h(
                "div",
                {
                  style: "border: 1px solid #f00;"
                },
                [h("span", {}, ["我的值是：", option.id])]
              ),
              tagString: "a-a",
              children: [
                {
                  id: "a-a-a",
                  tag: "1-1-1"
                },
                {
                  id: "a-a-b",
                  tag: "1-1-2"
                }
              ]
            },
            {
              id: "a-b",
              tag: "1-2",
              children: [
                {
                  id: "a-b-a",
                  tag: "1-2-1"
                },
                {
                  id: "a-b-b",
                  tag: "1-2-2"
                }
              ]
            },
            {
              id: "a-c",
              tag: "1-3",
              children: [
                {
                  id: "a-c-a",
                  tag: "1-3-1"
                }
              ]
            }
          ]
        },
        {
          id: "b",
          tag: "2",
          children: [
            {
              id: "b-a",
              tag: "2-1"
            },
            {
              id: "b-b",
              tag: "2-2",
              children: [
                {
                  id: "b-b-a",
                  tag: "2-2-1"
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
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_cascader = resolveComponent("h-cascader");
  _push(ssrRenderComponent(_component_h_row, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_cascader, {
                modelValue: _ctx.currentVal1,
                "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                "field-map": {
                  value: "id",
                  label: "tag",
                  stringLabel: "tagString"
                },
                options: _ctx.options1,
                "to-body": false
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_cascader, {
                  modelValue: _ctx.currentVal1,
                  "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                  "field-map": {
                    value: "id",
                    label: "tag",
                    stringLabel: "tagString"
                  },
                  options: _ctx.options1,
                  "to-body": false
                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode(_component_h_cascader, {
                modelValue: _ctx.currentVal1,
                "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                "field-map": {
                  value: "id",
                  label: "tag",
                  stringLabel: "tagString"
                },
                options: _ctx.options1,
                "to-body": false
              }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/field-map.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const fieldMap = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  fieldMap as default
};
