import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "check-all-summary",
  __ssrInlineRender: true,
  setup(__props) {
    const values1 = ref([]);
    const values2 = ref([]);
    const baseData = ref([]);
    onMounted(async () => {
      baseData.value = await fetch(new URL("/cascader-options.json", import.meta.url).href).then((r) => r.json());
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_cascader = resolveComponent("h-cascader");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, {
              xs: 12,
              md: 8,
              lg: 6,
              xl: 6,
              xxl: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>全选后标记为“全部”</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    multiple: true,
                    "use-check-all-summary": true,
                    "to-body": false,
                    "collapse-tags": true,
                    options: baseData.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "全选后标记为“全部”"),
                    createVNode(_component_h_cascader, {
                      modelValue: values1.value,
                      "onUpdate:modelValue": ($event) => values1.value = $event,
                      multiple: true,
                      "use-check-all-summary": true,
                      "to-body": false,
                      "collapse-tags": true,
                      options: baseData.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, {
              xs: 12,
              md: 8,
              lg: 6,
              xl: 6,
              xxl: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>全选后自定义标记为“全部选择”</div>`);
                  _push3(ssrRenderComponent(_component_h_cascader, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    multiple: true,
                    "use-check-all-summary": true,
                    "check-all-summary-text": "全部选择",
                    "to-body": false,
                    "collapse-tags": true,
                    options: baseData.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "全选后自定义标记为“全部选择”"),
                    createVNode(_component_h_cascader, {
                      modelValue: values2.value,
                      "onUpdate:modelValue": ($event) => values2.value = $event,
                      multiple: true,
                      "use-check-all-summary": true,
                      "check-all-summary-text": "全部选择",
                      "to-body": false,
                      "collapse-tags": true,
                      options: baseData.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, {
                xs: 12,
                md: 8,
                lg: 6,
                xl: 6,
                xxl: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "全选后标记为“全部”"),
                  createVNode(_component_h_cascader, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    multiple: true,
                    "use-check-all-summary": true,
                    "to-body": false,
                    "collapse-tags": true,
                    options: baseData.value
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, {
                xs: 12,
                md: 8,
                lg: 6,
                xl: 6,
                xxl: 6
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "全选后自定义标记为“全部选择”"),
                  createVNode(_component_h_cascader, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    multiple: true,
                    "use-check-all-summary": true,
                    "check-all-summary-text": "全部选择",
                    "to-body": false,
                    "collapse-tags": true,
                    options: baseData.value
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/check-all-summary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
