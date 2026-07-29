import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, TransitionGroup, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "draggable",
  __ssrInlineRender: true,
  setup(__props) {
    const activeKey = ref(1);
    const cardType = ref("card");
    const disabled = ref(false);
    const tabs = ref(
      Array(5).fill(0).map((_, i) => ({ title: `Tab ${i + 1}`, key: i }))
    );
    const onTabChanged = (tab) => {
      console.info("tab changed", tab);
      $message({ type: "success", message: `Tab ${tab} is clicked` });
    };
    const onSort = (current, target, sortedKeys) => {
      console.debug("sort", current, target, sortedKeys);
      tabs.value = sortedKeys.map((key) => ({ title: `Tab ${key + 1}`, key }));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      _push(`<!--[--><div class="mb-4 flex align-center" data-v-4651c770><span class="mr-4" data-v-4651c770>类型</span>`);
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
      _push(`</div><div class="mb-8 flex align-center" data-v-4651c770><span class="mr-4" data-v-4651c770>其他</span><div class="flex align-center" style="${ssrRenderStyle({ "column-gap": "10px" })}" data-v-4651c770>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: disabled.value,
        "onUpdate:modelValue": ($event) => disabled.value = $event,
        label: "设置第三项不可拖拽"
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_h_tabs, {
        "default-active-key": activeKey.value,
        draggable: "",
        type: cardType.value,
        onChange: onTabChanged,
        onSort
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(tabs.value, (tab, i) => {
              _push2(ssrRenderComponent(_component_h_tab, {
                key: tab.key,
                label: tab.title,
                draggable: disabled.value ? !(i === 2) : true
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode(TransitionGroup, { name: "fade" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(tabs.value, (tab, i) => {
                    return openBlock(), createBlock(_component_h_tab, {
                      key: tab.key,
                      label: tab.title,
                      draggable: disabled.value ? !(i === 2) : true
                    }, null, 8, ["label", "draggable"]);
                  }), 128))
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/draggable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const draggable = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4651c770"]]);
export {
  draggable as default
};
