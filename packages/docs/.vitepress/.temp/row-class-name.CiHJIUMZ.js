import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "row-class-name",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref([
      { name: "Jon", age: 32, address: "Shanghai" },
      { name: "Wang", age: 22, address: "Hangzhou" },
      { name: "Jacob", age: 16, address: "Shenzhen" },
      { name: "Alice", age: 26, address: "Beijing" }
    ]);
    function rowClassNameSet(row) {
      if (row.age >= 25) {
        return "bg-weak-success";
      }
      if (row.age < 18) {
        return "bg-weak-error";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      _push(ssrRenderComponent(_component_h_table, mergeProps({
        data: data.value,
        "row-class-name": rowClassNameSet
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Name",
              field: "name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Age",
              field: "age"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Address",
              field: "address"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table_column, {
                title: "Name",
                field: "name"
              }),
              createVNode(_component_h_table_column, {
                title: "Age",
                field: "age"
              }),
              createVNode(_component_h_table_column, {
                title: "Address",
                field: "address"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/row-class-name.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
