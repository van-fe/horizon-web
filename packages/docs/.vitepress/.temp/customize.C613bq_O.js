import { defineComponent, h, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { a4 as HSpace, a5 as HButton, $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "customize",
  __ssrInlineRender: true,
  setup(__props) {
    const ButtonGroup = defineComponent({
      name: "ButtonGroup",
      // eslint-disable-next-line vue/no-unused-components
      setup() {
        return () => h(HSpace, [
          h(HButton, { size: "small", plain: true, onClick: () => $message.success("nice~") }, "one"),
          h(HButton, { size: "small", plain: true, type: "danger", onClick: () => $message.warning("danger!!!") }, "two"),
          h(HButton, { size: "small", plain: true, type: "tertiary", onClick: () => $message.error("terrible") }, "three")
        ]);
      }
    });
    const openHTML = () => {
      $message({ message: h(ButtonGroup), duration: 0, showClose: true });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(HButton), mergeProps({
        plain: true,
        onClick: openHTML
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`自定义消息体`);
          } else {
            return [
              createTextVNode("自定义消息体")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/Message/customize.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
