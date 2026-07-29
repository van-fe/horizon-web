import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "switch-step",
  __ssrInlineRender: true,
  setup(__props) {
    const current = ref(0);
    const steps = [
      {
        title: "First",
        content: "First-content"
      },
      {
        title: "Second",
        content: "Second-content"
      },
      {
        title: "Last",
        content: "Last-content"
      }
    ];
    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_steps = resolveComponent("h-steps");
      const _component_h_step = resolveComponent("h-step");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_steps, {
        modelValue: current.value,
        "onUpdate:modelValue": ($event) => current.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(steps, (item) => {
              _push2(ssrRenderComponent(_component_h_step, {
                key: item.title,
                title: item.title
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(steps, (item) => {
                return createVNode(_component_h_step, {
                  key: item.title,
                  title: item.title
                }, null, 8, ["title"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="steps-action" data-v-45aa56a9>`);
      _push(ssrRenderComponent(_component_h_button, {
        disabled: current.value === 0,
        onClick: prev
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`上一步`);
          } else {
            return [
              createTextVNode("上一步")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        disabled: current.value === steps.length,
        type: "primary",
        onClick: next
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(current.value === steps.length - 1 ? "全部完成" : "下一步")}`);
          } else {
            return [
              createTextVNode(toDisplayString(current.value === steps.length - 1 ? "全部完成" : "下一步"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Steps/switch-step.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const switchStep = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-45aa56a9"]]);
export {
  switchStep as default
};
