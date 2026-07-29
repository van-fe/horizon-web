import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createBlock, openBlock, Fragment, renderList, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "load-more",
  __ssrInlineRender: true,
  setup(__props) {
    const options = ref(["Default Option1", "Default Option2"]);
    const week = ["Monday", "Tuesday", "Wednesday"];
    const loading = ref(false);
    const loaded = ref(false);
    const onLoad = () => {
      loading.value = true;
      setTimeout(() => {
        options.value.push(...week);
        loading.value = false;
        loaded.value = true;
      }, 1500);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_space = resolveComponent("h-space");
      const _component_h_segmented = resolveComponent("h-segmented");
      const _component_h_segmented_item = resolveComponent("h-segmented-item");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_space, mergeProps({
        direction: "vertical",
        block: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_segmented, { "default-active-key": "Default Option1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(options.value, (v) => {
                    _push3(ssrRenderComponent(_component_h_segmented_item, {
                      key: v,
                      label: v
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(options.value, (v) => {
                      return openBlock(), createBlock(_component_h_segmented_item, {
                        key: v,
                        label: v
                      }, null, 8, ["label"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, {
              type: "normal",
              loading: loading.value,
              disabled: loaded.value,
              onClick: onLoad
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Load`);
                } else {
                  return [
                    createTextVNode("Load")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_segmented, { "default-active-key": "Default Option1" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(options.value, (v) => {
                    return openBlock(), createBlock(_component_h_segmented_item, {
                      key: v,
                      label: v
                    }, null, 8, ["label"]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(_component_h_button, {
                type: "normal",
                loading: loading.value,
                disabled: loaded.value,
                onClick: onLoad
              }, {
                default: withCtx(() => [
                  createTextVNode("Load")
                ]),
                _: 1
              }, 8, ["loading", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Segmented/load-more.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
