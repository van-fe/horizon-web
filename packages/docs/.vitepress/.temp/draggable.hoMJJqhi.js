import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "draggable",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref([
      { id: 1, name: "Alice", role: "Designer" },
      { id: 2, name: "Bob", role: "Engineer" },
      { id: 3, name: "Carol", role: "Product manager" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      _push(ssrRenderComponent(_component_h_table, mergeProps({
        data: data.value,
        "onUpdate:data": ($event) => data.value = $event,
        "row-key": "id"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              type: "drag",
              width: "44"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "ID",
              field: "id",
              width: "80",
              draggable: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Name",
              field: "name",
              draggable: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Role",
              field: "role",
              draggable: ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table_column, {
                type: "drag",
                width: "44"
              }),
              createVNode(_component_h_table_column, {
                title: "ID",
                field: "id",
                width: "80",
                draggable: ""
              }),
              createVNode(_component_h_table_column, {
                title: "Name",
                field: "name",
                draggable: ""
              }),
              createVNode(_component_h_table_column, {
                title: "Role",
                field: "role",
                draggable: ""
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/draggable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
