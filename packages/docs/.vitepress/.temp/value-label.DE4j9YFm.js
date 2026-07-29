import { defineComponent, ref, resolveComponent, withCtx, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "value-label",
  __ssrInlineRender: true,
  setup(__props) {
    const options = ref([]);
    function onSearch(val) {
      options.value = [];
      if (val) {
        new Array(10).fill(0).forEach(() => {
          options.value.push({
            value: faker.helpers.fake(`${faker.animal.cat()} also likes ${val}`),
            label: faker.helpers.fake(`${faker.name.fullName()} likes ${val}`)
          });
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_auto_complete = resolveComponent("h-auto-complete");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_auto_complete, {
                    options: options.value,
                    "fit-input-width": false,
                    placeholder: "You like...",
                    clearable: "",
                    onSearch
                  }, {
                    default: withCtx((item, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="item-wrap" data-v-70fc4008${_scopeId3}><div class="title" data-v-70fc4008${_scopeId3}>${ssrInterpolate(item.label)}</div><div class="font-bold" data-v-70fc4008${_scopeId3}>${ssrInterpolate(item.value)}</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "item-wrap" }, [
                            createVNode("div", { class: "title" }, toDisplayString(item.label), 1),
                            createVNode("div", { class: "font-bold" }, toDisplayString(item.value), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_auto_complete, {
                      options: options.value,
                      "fit-input-width": false,
                      placeholder: "You like...",
                      clearable: "",
                      onSearch
                    }, {
                      default: withCtx((item) => [
                        createVNode("div", { class: "item-wrap" }, [
                          createVNode("div", { class: "title" }, toDisplayString(item.label), 1),
                          createVNode("div", { class: "font-bold" }, toDisplayString(item.value), 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_auto_complete, {
                    options: options.value,
                    "fit-input-width": false,
                    placeholder: "You like...",
                    clearable: "",
                    onSearch
                  }, {
                    default: withCtx((item) => [
                      createVNode("div", { class: "item-wrap" }, [
                        createVNode("div", { class: "title" }, toDisplayString(item.label), 1),
                        createVNode("div", { class: "font-bold" }, toDisplayString(item.value), 1)
                      ])
                    ]),
                    _: 1
                  }, 8, ["options"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/AutoComplete/value-label.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const valueLabel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-70fc4008"]]);
export {
  valueLabel as default
};
