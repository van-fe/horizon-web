import { defineComponent, ref, resolveComponent, mergeProps, withCtx, unref, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
import { N as throttle } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "reach-bottom",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref(null);
    const list = ref([]);
    const loading = ref(false);
    function generateRandomOptions() {
      loading.value = true;
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          list.value.push({
            label: faker.person.fullName(),
            value: faker.phone.number()
          });
        }
        loading.value = false;
      }, 1e3);
    }
    const onOptionListReachBottom = throttle(() => {
      console.info("reach bottom");
      generateRandomOptions();
    }, 500);
    generateRandomOptions();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    clearable: true,
                    "to-body": false,
                    loading: loading.value,
                    onOptionListReachBottom: unref(onOptionListReachBottom)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(list.value, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            label: item.label,
                            value: item.value
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(list.value, (item) => {
                            return openBlock(), createBlock(_component_h_option, {
                              key: item.value,
                              label: item.label,
                              value: item.value
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_select, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      clearable: true,
                      "to-body": false,
                      loading: loading.value,
                      onOptionListReachBottom: unref(onOptionListReachBottom)
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(list.value, (item) => {
                          return openBlock(), createBlock(_component_h_option, {
                            key: item.value,
                            label: item.label,
                            value: item.value
                          }, null, 8, ["label", "value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "loading", "onOptionListReachBottom"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_select, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    clearable: true,
                    "to-body": false,
                    loading: loading.value,
                    onOptionListReachBottom: unref(onOptionListReachBottom)
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(list.value, (item) => {
                        return openBlock(), createBlock(_component_h_option, {
                          key: item.value,
                          label: item.label,
                          value: item.value
                        }, null, 8, ["label", "value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "loading", "onOptionListReachBottom"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/reach-bottom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
