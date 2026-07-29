import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tip",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref([
      { name: "Jon", age: 32, location: "Shanghai" },
      { name: "Jacob", age: 16, location: "Shenzhen" },
      { name: "Guang", age: 22, location: "Hangzhou" },
      { name: "Alice", age: 26, location: "Beijing" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      _push(ssrRenderComponent(_component_h_table, mergeProps({ data: data.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Name",
              field: "name",
              tip: "Without family name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Age",
              field: "age",
              tip: "The people's age"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Location",
              field: "location"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table_column, {
                title: "Name",
                field: "name",
                tip: "Without family name"
              }),
              createVNode(_component_h_table_column, {
                title: "Age",
                field: "age",
                tip: "The people's age"
              }),
              createVNode(_component_h_table_column, {
                title: "Location",
                field: "location"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/tip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
