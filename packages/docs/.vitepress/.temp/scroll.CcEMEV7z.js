import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "scroll",
  __ssrInlineRender: true,
  setup(__props) {
    const activeKey = ref(0);
    const size = ref("medium");
    const cardType = ref("line");
    const focusable = ref(true);
    const scrollable = ref(true);
    const arrow = ref(true);
    const tabs = ref(
      Array(20).fill(0).map((_, i) => i)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      _push(`<!--[--><div class="mb-4 flex align-center" data-v-f0df1961><span class="mr-4" data-v-f0df1961>类型</span>`);
      _push(ssrRenderComponent(_component_h_radio_group, {
        modelValue: cardType.value,
        "onUpdate:modelValue": ($event) => cardType.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_radio, { label: "line" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`line(Default)`);
                } else {
                  return [
                    createTextVNode("line(Default)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "card" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`card`);
                } else {
                  return [
                    createTextVNode("card")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "segment" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`segment`);
                } else {
                  return [
                    createTextVNode("segment")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "page" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`page(不支持尺寸调整)`);
                } else {
                  return [
                    createTextVNode("page(不支持尺寸调整)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_radio, { label: "line" }, {
                default: withCtx(() => [
                  createTextVNode("line(Default)")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "card" }, {
                default: withCtx(() => [
                  createTextVNode("card")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "segment" }, {
                default: withCtx(() => [
                  createTextVNode("segment")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "page" }, {
                default: withCtx(() => [
                  createTextVNode("page(不支持尺寸调整)")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mb-4 flex align-center" data-v-f0df1961><span class="mr-4" data-v-f0df1961>尺寸</span>`);
      _push(ssrRenderComponent(_component_h_radio_group, {
        modelValue: size.value,
        "onUpdate:modelValue": ($event) => size.value = $event,
        disabled: cardType.value === "page"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_radio, { label: "mini" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`mini`);
                } else {
                  return [
                    createTextVNode("mini")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "small" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`small`);
                } else {
                  return [
                    createTextVNode("small")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "medium" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`medium(Default)`);
                } else {
                  return [
                    createTextVNode("medium(Default)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_radio, { label: "large" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`large`);
                } else {
                  return [
                    createTextVNode("large")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_radio, { label: "mini" }, {
                default: withCtx(() => [
                  createTextVNode("mini")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "small" }, {
                default: withCtx(() => [
                  createTextVNode("small")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "medium" }, {
                default: withCtx(() => [
                  createTextVNode("medium(Default)")
                ]),
                _: 1
              }),
              createVNode(_component_h_radio, { label: "large" }, {
                default: withCtx(() => [
                  createTextVNode("large")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mb-8 flex align-center" data-v-f0df1961><span class="mr-4" data-v-f0df1961>其他</span><div class="flex align-center" style="${ssrRenderStyle({ "column-gap": "10px" })}" data-v-f0df1961>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: scrollable.value,
        "onUpdate:modelValue": ($event) => scrollable.value = $event,
        label: "标签可滑动"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: focusable.value,
        "onUpdate:modelValue": ($event) => focusable.value = $event,
        label: "自动滑动到激活元素"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: arrow.value,
        "onUpdate:modelValue": ($event) => arrow.value = $event,
        label: "超长页签使用箭头"
      }, null, _parent));
      _push(`</div></div><div class="flex" data-v-f0df1961><div class="box" data-v-f0df1961>`);
      _push(ssrRenderComponent(_component_h_tabs, {
        activeKey: activeKey.value,
        "onUpdate:activeKey": ($event) => activeKey.value = $event,
        "default-active-key": 1,
        type: cardType.value,
        size: size.value,
        arrow: arrow.value,
        focusable: focusable.value,
        scrollable: scrollable.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(tabs.value, (key) => {
              _push2(ssrRenderComponent(_component_h_tab, {
                key,
                label: `Tab${key}`
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(tabs.value, (key) => {
                return openBlock(), createBlock(_component_h_tab, {
                  key,
                  label: `Tab${key}`
                }, null, 8, ["label"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/scroll.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const scroll = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f0df1961"]]);
export {
  scroll as default
};
