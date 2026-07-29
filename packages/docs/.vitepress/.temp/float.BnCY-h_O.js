import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, withDirectives, createVNode, vShow, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "float",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_transition = resolveComponent("h-transition");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-fc483069>`);
      _push(ssrRenderComponent(_component_h_button, {
        type: "normal",
        class: "mb-2",
        onClick: ($event) => visible.value = !visible.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Change`);
          } else {
            return [
              createTextVNode("Change")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, {
        gutter: 10,
        style: { "height": "80px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_transition, { name: "float" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="animate-box" style="${ssrRenderStyle(visible.value ? null : { display: "none" })}" data-v-fc483069${_scopeId3}>float</div>`);
                      } else {
                        return [
                          withDirectives(createVNode("div", { class: "animate-box" }, "float", 512), [
                            [vShow, visible.value]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_transition, { name: "float" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode("div", { class: "animate-box" }, "float", 512), [
                          [vShow, visible.value]
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_h_transition, { name: "float" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode("div", { class: "animate-box" }, "float", 512), [
                        [vShow, visible.value]
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Transition/float.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const float = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fc483069"]]);
export {
  float as default
};
