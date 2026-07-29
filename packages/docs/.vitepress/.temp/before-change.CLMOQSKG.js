import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { C as $confirm } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "before-change",
  __ssrInlineRender: true,
  setup(__props) {
    const modelValue = ref(0);
    function onBeforeChange(next, curr, nextProp, currProp) {
      console.info({ next, curr, nextProp, currProp });
      return new Promise((resolve, reject) => {
        $confirm(`是否同意切换步骤？从 【${curr}】 切换到 【${next}】`, "切换步骤确认").then((close) => {
          resolve(true);
          close();
        }).catch(() => {
          reject();
        });
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_steps = resolveComponent("h-steps");
      const _component_h_step = resolveComponent("h-step");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_h_steps, {
        modelValue: modelValue.value,
        "onUpdate:modelValue": ($event) => modelValue.value = $event,
        clickable: true,
        "before-change": onBeforeChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_step, null, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Succeeded`);
                } else {
                  return [
                    createTextVNode("Succeeded")
                  ];
                }
              }),
              subtitle: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>This is a description.</span>`);
                } else {
                  return [
                    createVNode("span", null, "This is a description.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_step, {
              title: "Processing",
              subtitle: "This is a description.",
              description: "03/23/2021"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_step, {
              title: "Future step",
              subtitle: "This is a description."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_step, null, {
                title: withCtx(() => [
                  createTextVNode("Succeeded")
                ]),
                subtitle: withCtx(() => [
                  createVNode("span", null, "This is a description.")
                ]),
                _: 1
              }),
              createVNode(_component_h_step, {
                title: "Processing",
                subtitle: "This is a description.",
                description: "03/23/2021"
              }),
              createVNode(_component_h_step, {
                title: "Future step",
                subtitle: "This is a description."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Steps/before-change.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
