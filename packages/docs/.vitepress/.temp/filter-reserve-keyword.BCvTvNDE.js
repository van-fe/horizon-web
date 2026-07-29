import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "filter-reserve-keyword",
  __ssrInlineRender: true,
  setup(__props) {
    const currentVal1 = ref([]);
    const currentVal2 = ref([]);
    const currentVal3 = ref([]);
    const changeHandle = (value, option) => {
      console.info(value, option);
    };
    const options = ref([]);
    onMounted(async () => {
      options.value = await fetch(new URL("/cascader-tree-data.json", import.meta.url).href).then((r) => r.json());
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_cascader = resolveComponent("h-cascader");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-13b58897${_scopeId2}>保留关键字（默认）</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    filterable: true,
                    options: options.value,
                    multiple: true,
                    "reserve-keyword": true,
                    "collapse-tags": true,
                    "collapse-tags-fill-up": true,
                    "to-body": false,
                    onChange: changeHandle
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "保留关键字（默认）"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal1.value,
                      "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                      filterable: true,
                      options: options.value,
                      multiple: true,
                      "reserve-keyword": true,
                      "collapse-tags": true,
                      "collapse-tags-fill-up": true,
                      "to-body": false,
                      onChange: changeHandle
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-13b58897${_scopeId2}>不保留关键字</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                    filterable: true,
                    options: options.value,
                    multiple: true,
                    "reserve-keyword": false,
                    "collapse-tags": true,
                    "collapse-tags-fill-up": true,
                    "to-body": false,
                    onChange: changeHandle
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "不保留关键字"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal2.value,
                      "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                      filterable: true,
                      options: options.value,
                      multiple: true,
                      "reserve-keyword": false,
                      "collapse-tags": true,
                      "collapse-tags-fill-up": true,
                      "to-body": false,
                      onChange: changeHandle
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-13b58897${_scopeId2}>在反选时保留，正选不保留</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: currentVal3.value,
                    "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                    filterable: true,
                    options: options.value,
                    multiple: true,
                    "reserve-keyword": "reserve-deselect",
                    "collapse-tags": true,
                    "collapse-tags-fill-up": true,
                    "to-body": false,
                    onChange: changeHandle
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "在反选时保留，正选不保留"),
                    createVNode(_component_h_cascader, {
                      modelValue: currentVal3.value,
                      "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                      filterable: true,
                      options: options.value,
                      multiple: true,
                      "reserve-keyword": "reserve-deselect",
                      "collapse-tags": true,
                      "collapse-tags-fill-up": true,
                      "to-body": false,
                      onChange: changeHandle
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "保留关键字（默认）"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal1.value,
                    "onUpdate:modelValue": ($event) => currentVal1.value = $event,
                    filterable: true,
                    options: options.value,
                    multiple: true,
                    "reserve-keyword": true,
                    "collapse-tags": true,
                    "collapse-tags-fill-up": true,
                    "to-body": false,
                    onChange: changeHandle
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "不保留关键字"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal2.value,
                    "onUpdate:modelValue": ($event) => currentVal2.value = $event,
                    filterable: true,
                    options: options.value,
                    multiple: true,
                    "reserve-keyword": false,
                    "collapse-tags": true,
                    "collapse-tags-fill-up": true,
                    "to-body": false,
                    onChange: changeHandle
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "在反选时保留，正选不保留"),
                  createVNode(_component_h_cascader, {
                    modelValue: currentVal3.value,
                    "onUpdate:modelValue": ($event) => currentVal3.value = $event,
                    filterable: true,
                    options: options.value,
                    multiple: true,
                    "reserve-keyword": "reserve-deselect",
                    "collapse-tags": true,
                    "collapse-tags-fill-up": true,
                    "to-body": false,
                    onChange: changeHandle
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/filter-reserve-keyword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const filterReserveKeyword = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-13b58897"]]);
export {
  filterReserveKeyword as default
};
