import { defineComponent, ref, onMounted, onBeforeUnmount, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "multiple-scroll-container",
  __ssrInlineRender: true,
  setup(__props) {
    const affixDomRef = ref();
    function onScroll() {
      var _a;
      (_a = affixDomRef.value) == null ? void 0 : _a.updatePosition();
    }
    onMounted(() => {
      window.addEventListener("scroll", onScroll);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", onScroll);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_affix = resolveComponent("h-affix");
      const _component_h_button = resolveComponent("h-button");
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "scroll-2",
        class: "target-wrapper"
      }, _attrs))} data-v-3320a5ba><div class="target-container" data-v-3320a5ba>`);
      _push(ssrRenderComponent(_component_h_affix, {
        ref_key: "affixDomRef",
        ref: affixDomRef,
        position: "top",
        target: "#scroll-2",
        offset: 20
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Affix in container and won&#39;t placed out of container`);
                } else {
                  return [
                    createTextVNode("Affix in container and won't placed out of container")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, null, {
                default: withCtx(() => [
                  createTextVNode("Affix in container and won't placed out of container")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Affix/multiple-scroll-container.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const multipleScrollContainer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3320a5ba"]]);
export {
  multipleScrollContainer as default
};
