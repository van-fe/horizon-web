import { defineComponent, computed, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "jump-reaction",
  __ssrInlineRender: true,
  setup(__props) {
    const randomHref = computed(() => "?" + Math.round(Math.random() * 1e6));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_link = resolveComponent("h-link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_link, { href: randomHref.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Jump to Home in this page`);
          } else {
            return [
              createTextVNode("Jump to Home in this page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_link, {
        href: randomHref.value,
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Jump to Home in new window`);
          } else {
            return [
              createTextVNode("Jump to Home in new window")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Link/jump-reaction.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
