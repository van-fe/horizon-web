import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "filter-in-panel",
  __ssrInlineRender: true,
  setup(__props) {
    const baseTreeData = ref([]);
    const filterValue = ref();
    onMounted(() => {
      fetch(new URL("/tree-data.json", import.meta.url).href).then((res) => res.json()).then((res) => {
        baseTreeData.value = res;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tree_select = resolveComponent("h-tree-select");
      const _component_h_input = resolveComponent("h-input");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-10688107${_scopeId2}>内置面板</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "panel-filterable": true,
                    "use-build-in-panel-filter": true,
                    "max-height": 300,
                    multiple: true,
                    "to-body": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "内置面板"),
                    createVNode(_component_h_tree_select, {
                      "tree-data": baseTreeData.value,
                      "panel-filterable": true,
                      "use-build-in-panel-filter": true,
                      "max-height": 300,
                      multiple: true,
                      "to-body": false
                    }, null, 8, ["tree-data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-10688107${_scopeId2}>自定义插槽</div>`);
                  _push3(ssrRenderComponent(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "panel-filterable": true,
                    "panel-filter-input-value": filterValue.value,
                    "max-height": 300,
                    multiple: true,
                    "to-body": false
                  }, {
                    panelHeaderRender: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_input, {
                          modelValue: filterValue.value,
                          "onUpdate:modelValue": ($event) => filterValue.value = $event,
                          class: "filter-input"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_input, {
                            modelValue: filterValue.value,
                            "onUpdate:modelValue": ($event) => filterValue.value = $event,
                            class: "filter-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "自定义插槽"),
                    createVNode(_component_h_tree_select, {
                      "tree-data": baseTreeData.value,
                      "panel-filterable": true,
                      "panel-filter-input-value": filterValue.value,
                      "max-height": 300,
                      multiple: true,
                      "to-body": false
                    }, {
                      panelHeaderRender: withCtx(() => [
                        createVNode(_component_h_input, {
                          modelValue: filterValue.value,
                          "onUpdate:modelValue": ($event) => filterValue.value = $event,
                          class: "filter-input"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }, 8, ["tree-data", "panel-filter-input-value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "内置面板"),
                  createVNode(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "panel-filterable": true,
                    "use-build-in-panel-filter": true,
                    "max-height": 300,
                    multiple: true,
                    "to-body": false
                  }, null, 8, ["tree-data"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "自定义插槽"),
                  createVNode(_component_h_tree_select, {
                    "tree-data": baseTreeData.value,
                    "panel-filterable": true,
                    "panel-filter-input-value": filterValue.value,
                    "max-height": 300,
                    multiple: true,
                    "to-body": false
                  }, {
                    panelHeaderRender: withCtx(() => [
                      createVNode(_component_h_input, {
                        modelValue: filterValue.value,
                        "onUpdate:modelValue": ($event) => filterValue.value = $event,
                        class: "filter-input"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }, 8, ["tree-data", "panel-filter-input-value"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/TreeSelect/filter-in-panel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const filterInPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-10688107"]]);
export {
  filterInPanel as default
};
