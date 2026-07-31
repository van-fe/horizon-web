import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "loading",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    const data = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: loading.value,
        "onUpdate:modelValue": ($event) => loading.value = $event,
        status: "",
        "status-on-text": "loading",
        "status-off-text": "default"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_table, {
        data: data.value,
        height: "300",
        loading: loading.value,
        "loading-text": "Please wait..."
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "ID",
              field: "id"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Name",
              field: "name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Gender",
              field: "gender"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Birthday",
              field: "birthday"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Address",
              field: "address"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table_column, {
                title: "ID",
                field: "id"
              }),
              createVNode(_component_h_table_column, {
                title: "Name",
                field: "name"
              }),
              createVNode(_component_h_table_column, {
                title: "Gender",
                field: "gender"
              }),
              createVNode(_component_h_table_column, {
                title: "Birthday",
                field: "birthday"
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/loading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
