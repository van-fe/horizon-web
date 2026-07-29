import { defineComponent, resolveComponent, mergeProps, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "size",
  __ssrInlineRender: true,
  setup(__props) {
    const options = ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_segmented = resolveComponent("h-segmented");
      const _component_h_segmented_item = resolveComponent("h-segmented-item");
      _push(ssrRenderComponent(_component_h_space, mergeProps({
        direction: "vertical",
        block: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(["mini", "small", "medium", "large"], (s) => {
              _push2(ssrRenderComponent(_component_h_segmented, {
                key: s,
                size: s,
                "default-active-key": "Daily"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(options, (v) => {
                      _push3(ssrRenderComponent(_component_h_segmented_item, {
                        key: v,
                        label: v
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(options, (v) => {
                        return createVNode(_component_h_segmented_item, {
                          key: v,
                          label: v
                        }, null, 8, ["label"]);
                      }), 64))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(["mini", "small", "medium", "large"], (s) => {
                return createVNode(_component_h_segmented, {
                  key: s,
                  size: s,
                  "default-active-key": "Daily"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(options, (v) => {
                      return createVNode(_component_h_segmented_item, {
                        key: v,
                        label: v
                      }, null, 8, ["label"]);
                    }), 64))
                  ]),
                  _: 1
                }, 8, ["size"]);
              }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Segmented/size.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
