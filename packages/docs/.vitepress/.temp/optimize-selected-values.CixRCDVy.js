import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "optimize-selected-values",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedValues = ref(["component", "basic", "color", "data"]);
    const expandValues = ref(["component", "basic", "color", "data"]);
    const baseTreeData = ref([]);
    onMounted(() => {
      fetch(new URL("/tree-data.json", import.meta.url).href).then((res) => res.json()).then((res) => {
        baseTreeData.value = res;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tree = resolveComponent("h-tree");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>选中了 Component、Basic、Color、Data 四个节点</div>`);
                  _push3(ssrRenderComponent(_component_h_tree, {
                    "expand-values": expandValues.value,
                    "onUpdate:expandValues": ($event) => expandValues.value = $event,
                    "selected-values": selectedValues.value,
                    "onUpdate:selectedValues": ($event) => selectedValues.value = $event,
                    "tree-data": baseTreeData.value,
                    multiple: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "选中了 Component、Basic、Color、Data 四个节点"),
                    createVNode(_component_h_tree, {
                      "expand-values": expandValues.value,
                      "onUpdate:expandValues": ($event) => expandValues.value = $event,
                      "selected-values": selectedValues.value,
                      "onUpdate:selectedValues": ($event) => selectedValues.value = $event,
                      "tree-data": baseTreeData.value,
                      multiple: true
                    }, null, 8, ["expand-values", "onUpdate:expandValues", "selected-values", "onUpdate:selectedValues", "tree-data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "选中了 Component、Basic、Color、Data 四个节点"),
                  createVNode(_component_h_tree, {
                    "expand-values": expandValues.value,
                    "onUpdate:expandValues": ($event) => expandValues.value = $event,
                    "selected-values": selectedValues.value,
                    "onUpdate:selectedValues": ($event) => selectedValues.value = $event,
                    "tree-data": baseTreeData.value,
                    multiple: true
                  }, null, 8, ["expand-values", "onUpdate:expandValues", "selected-values", "onUpdate:selectedValues", "tree-data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tree/optimize-selected-values.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
