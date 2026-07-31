import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "size-and-type",
  __ssrInlineRender: true,
  setup(__props) {
    const activeKey = ref(1);
    const size = ref("medium");
    const cardType = ref("line");
    const showIcon = ref(true);
    const underline = ref(true);
    const customizeUnderline = ref(false);
    const customizeSpace = ref(false);
    const tabs = ["Tab 1", "Tab 2", "Tab 3"];
    const icons = ["car", "change_power", "card_voucher"];
    const onTabChanged = (tab) => {
      console.info("tab changed", tab);
      $message({ type: "success", message: `Tab ${tab} is clicked` });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      _push(`<!--[--><div class="mb-4 flex align-center" data-v-45400861><span class="mr-4" data-v-45400861>类型</span>`);
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
      _push(`</div><div class="mb-4 flex align-center" data-v-45400861><span class="mr-4" data-v-45400861>尺寸</span>`);
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
      _push(`</div><div class="mb-8 flex align-center" data-v-45400861><span class="mr-4" data-v-45400861>其他</span><div class="flex align-center" style="${ssrRenderStyle({ "column-gap": "10px" })}" data-v-45400861>`);
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: showIcon.value,
        "onUpdate:modelValue": ($event) => showIcon.value = $event,
        label: "展示图标"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: underline.value,
        "onUpdate:modelValue": ($event) => underline.value = $event,
        disabled: cardType.value !== "line",
        label: "展示分割线(only line)"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: customizeUnderline.value,
        "onUpdate:modelValue": ($event) => customizeUnderline.value = $event,
        disabled: cardType.value !== "line",
        label: "自定义分割线(only line)"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_checkbox, {
        modelValue: customizeSpace.value,
        "onUpdate:modelValue": ($event) => customizeSpace.value = $event,
        disabled: cardType.value !== "card",
        label: "移除首段间距(only card)"
      }, null, _parent));
      _push(`</div></div><div style="${ssrRenderStyle({ "height": "80px" })}" class="${ssrRenderClass({ "customize-underline": customizeUnderline.value, "customize-space": customizeSpace.value })}" data-v-45400861>`);
      _push(ssrRenderComponent(_component_h_tabs, {
        "active-key": activeKey.value,
        "onUpdate:activeKey": ($event) => activeKey.value = $event,
        underline: underline.value,
        type: cardType.value,
        size: size.value,
        onChange: onTabChanged
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(tabs, (tab, i) => {
              _push2(ssrRenderComponent(_component_h_tab, {
                key: i,
                icon: showIcon.value ? icons[i] : null,
                label: tab
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab, i) => {
                return createVNode(_component_h_tab, {
                  key: i,
                  icon: showIcon.value ? icons[i] : null,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tabs/size-and-type.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sizeAndType = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-45400861"]]);
export {
  sizeAndType as default
};
