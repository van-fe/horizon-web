import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo7",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    const visible2 = ref(false);
    const onPrimary = () => {
      console.info("Primary button clicked!");
      visible2.value = true;
    };
    const onSecondary = () => {
      console.info("Secondary button clicked!");
      visible.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      const _component_h_dialog = resolveComponent("h-dialog");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_button, {
        onClick: ($event) => visible.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`点我`);
          } else {
            return [
              createTextVNode("点我")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_dialog, {
        class: "my-dialog",
        modelValue: visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        "header-margin": "0",
        "footer-margin": "0",
        "class-names": {
          wrapper: "my-wrapper",
          header: "my-header",
          body: "my-body",
          footer: "my-footer",
          mask: "my-mask"
        },
        title: "标题",
        onPrimaryClick: onPrimary,
        onSecondaryClick: onSecondary
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}>完全自定义</p>`);
          } else {
            return [
              createVNode("p", null, "完全自定义")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Dialog/demo7.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
