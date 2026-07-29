import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dynamic-collapse",
  __ssrInlineRender: true,
  setup(__props) {
    const values1 = ref([]);
    const collapse = ref(false);
    const selectOptions = [
      { value: 1, label: "上海" },
      { value: 2, label: "北京" },
      { value: 3, label: "合肥" },
      { value: 4, label: "深圳" },
      { value: 5, label: "杭州" },
      { value: 6, label: "天津" },
      { value: 7, label: "西安" },
      { value: 8, label: "南京" },
      { value: 9, label: "哈尔滨" },
      { value: 10, label: "香港" }
    ];
    const focusHandle = () => {
      console.info("focus");
      collapse.value = false;
    };
    const blurHandle = () => {
      console.info("blur");
      collapse.value = true;
    };
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
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    placeholder: "请选择",
                    collapse: collapse.value,
                    multiple: true,
                    "to-body": false,
                    onFocus: focusHandle,
                    onBlur: blurHandle
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.value,
                              value: item.value,
                              label: item.label
                            }, null, 8, ["value", "label"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_select, {
                      modelValue: values1.value,
                      "onUpdate:modelValue": ($event) => values1.value = $event,
                      placeholder: "请选择",
                      collapse: collapse.value,
                      multiple: true,
                      "to-body": false,
                      onFocus: focusHandle,
                      onBlur: blurHandle
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label
                          }, null, 8, ["value", "label"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "collapse"])
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
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    placeholder: "请选择",
                    collapse: collapse.value,
                    multiple: true,
                    "to-body": false,
                    onFocus: focusHandle,
                    onBlur: blurHandle
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          value: item.value,
                          label: item.label
                        }, null, 8, ["value", "label"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "collapse"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/dynamic-collapse.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
