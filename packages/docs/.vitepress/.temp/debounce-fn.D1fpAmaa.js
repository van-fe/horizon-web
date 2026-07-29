import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "debounce-fn",
  __ssrInlineRender: true,
  setup(__props) {
    const debounceType = ref("disabled");
    const saveData = () => {
      console.info("clicked!");
      return new Promise((resolve) => {
        setTimeout(() => {
          $message.success("保存成功！");
          resolve(null);
        }, 2e3);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[--><div class="flex mb-4" data-v-d17a3668><span class="mr-2" data-v-d17a3668>debounce-type:</span>`);
      _push(ssrRenderComponent(_component_h_radio_group, {
        modelValue: debounceType.value,
        "onUpdate:modelValue": ($event) => debounceType.value = $event,
        size: "small"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_radio, { label: "disabled" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`disabled`);
                } else {
                  return [
                    createTextVNode("disabled")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "loading" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`loading`);
                } else {
                  return [
                    createTextVNode("loading")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`none`);
                } else {
                  return [
                    createTextVNode("none")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_radio, { label: "disabled" }, {
                default: withCtx(() => [
                  createTextVNode("disabled")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "loading" }, {
                default: withCtx(() => [
                  createTextVNode("loading")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "none" }, {
                default: withCtx(() => [
                  createTextVNode("none")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_h_button, {
        "debounce-fn": saveData,
        "debounce-type": debounceType.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`防抖按钮`);
          } else {
            return [
              createTextVNode("防抖按钮")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, { onClick: saveData }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`普通按钮`);
          } else {
            return [
              createTextVNode("普通按钮")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Button/debounce-fn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const debounceFn = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d17a3668"]]);
export {
  debounceFn as default
};
