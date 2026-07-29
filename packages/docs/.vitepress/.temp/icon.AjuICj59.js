import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "icon",
  __ssrInlineRender: true,
  setup(__props) {
    const cardType = ref("line");
    const tabs = ["Tab 1", "Tab 2", "Tab 3"];
    const icons = ["car", "change_power", "card_voucher"];
    const onTabChanged = (tab) => {
      console.info("tab changed", tab);
      $message({ type: "success", message: `Tab ${tab} is clicked` });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      _push(`<!--[--><div class="mb-8 flex align-center"><span class="mr-4">类型</span>`);
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
      _push(`</div><div style="${ssrRenderStyle({ "height": "50px" })}">`);
      _push(ssrRenderComponent(_component_h_tabs, {
        "default-active-key": 0,
        type: cardType.value,
        onChange: onTabChanged
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(tabs, (tab, i) => {
              _push2(ssrRenderComponent(_component_h_tab, {
                key: i,
                icon: icons[i],
                label: tab
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab, i) => {
                return createVNode(_component_h_tab, {
                  key: i,
                  icon: icons[i],
                  label: tab
                }, null, 8, ["icon", "label"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
