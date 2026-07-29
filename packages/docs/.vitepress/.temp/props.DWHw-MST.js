import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const data = ref([
      { label: "Name", value: "bingkun Zhou" },
      { label: "Telephone", value: "0924-250492" },
      { label: "Residence", value: "Norway" },
      { label: "City", value: "Oslo" },
      { label: "Address", value: "Leg.Kiropraktor Iréne Johnson" }
    ]);
    const border = ref(false);
    const type = ref("vertical");
    const size = ref("medium");
    const typeOptions = ref(["horizontal", "vertical"]);
    const sizeOptions = ref(["small", "medium", "large"]);
    const title = ref("");
    const LabelPosition = ref("left");
    const checked = ref(false);
    const column = ref(1);
    const setTitle = (val) => {
      title.value = val ? "User Info" : "";
    };
    return {
      data,
      border,
      type,
      size,
      typeOptions,
      sizeOptions,
      title,
      setTitle,
      checked,
      LabelPosition,
      column
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_checkbox_button = resolveComponent("h-checkbox-button");
  const _component_h_radio_group = resolveComponent("h-radio-group");
  const _component_h_radio_button = resolveComponent("h-radio-button");
  const _component_h_descriptions = resolveComponent("h-descriptions");
  const _component_h_description_item = resolveComponent("h-description-item");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-28a0a744><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center" })}" data-v-28a0a744>`);
  _push(ssrRenderComponent(_component_h_checkbox_button, {
    modelValue: _ctx.checked,
    "onUpdate:modelValue": ($event) => _ctx.checked = $event,
    onChange: _ctx.setTitle
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Set Title`);
      } else {
        return [
          createTextVNode("Set Title")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_checkbox_button, {
    modelValue: _ctx.border,
    "onUpdate:modelValue": ($event) => _ctx.border = $event
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Border`);
      } else {
        return [
          createTextVNode("Border")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div data-v-28a0a744>Type：</div>`);
  _push(ssrRenderComponent(_component_h_radio_group, {
    modelValue: _ctx.type,
    "onUpdate:modelValue": ($event) => _ctx.type = $event
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.typeOptions, (label, index) => {
          _push2(ssrRenderComponent(_component_h_radio_button, {
            key: index,
            label
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.typeOptions, (label, index) => {
            return openBlock(), createBlock(_component_h_radio_button, {
              key: index,
              label
            }, null, 8, ["label"]);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div data-v-28a0a744>Size：</div>`);
  _push(ssrRenderComponent(_component_h_radio_group, {
    modelValue: _ctx.size,
    "onUpdate:modelValue": ($event) => _ctx.size = $event
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.sizeOptions, (label, index) => {
          _push2(ssrRenderComponent(_component_h_radio_button, {
            key: index,
            label
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.sizeOptions, (label, index) => {
            return openBlock(), createBlock(_component_h_radio_button, {
              key: index,
              label
            }, null, 8, ["label"]);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div data-v-28a0a744>LabelPosition：</div>`);
  _push(ssrRenderComponent(_component_h_radio_group, {
    modelValue: _ctx.LabelPosition,
    "onUpdate:modelValue": ($event) => _ctx.LabelPosition = $event
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(["left", "top"], (label, index) => {
          _push2(ssrRenderComponent(_component_h_radio_button, {
            key: index,
            label
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(), createBlock(Fragment, null, renderList(["left", "top"], (label, index) => {
            return createVNode(_component_h_radio_button, {
              key: index,
              label
            }, null, 8, ["label"]);
          }), 64))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div data-v-28a0a744>Column：</div>`);
  _push(ssrRenderComponent(_component_h_radio_group, {
    modelValue: _ctx.column,
    "onUpdate:modelValue": ($event) => _ctx.column = $event
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList([1, 2], (label, index) => {
          _push2(ssrRenderComponent(_component_h_radio_button, {
            key: index,
            label
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(), createBlock(Fragment, null, renderList([1, 2], (label, index) => {
            return createVNode(_component_h_radio_button, {
              key: index,
              label
            }, null, 8, ["label"]);
          }), 64))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_h_descriptions, {
    title: _ctx.title,
    border: _ctx.border,
    type: _ctx.type,
    size: _ctx.size,
    "label-position": _ctx.LabelPosition,
    column: _ctx.column
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.data, (item, index) => {
          _push2(ssrRenderComponent(_component_h_description_item, {
            key: index,
            label: item.label,
            value: item.value,
            "span-col": index === _ctx.data.length - 1 ? _ctx.column : 1
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
            return openBlock(), createBlock(_component_h_description_item, {
              key: index,
              label: item.label,
              value: item.value,
              "span-col": index === _ctx.data.length - 1 ? _ctx.column : 1
            }, null, 8, ["label", "value", "span-col"]);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Descriptions/props.vue");
  return _sfc_setup ? _sfc_setup(props2, ctx) : void 0;
};
const props = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-28a0a744"]]);
export {
  props as default
};
