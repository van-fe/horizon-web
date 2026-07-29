import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "show-overflow-tooltip",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref(new Array(5).fill(0).map((_) => ({
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ min: 22, max: 50, mode: "age" }).toDateString(),
      address: faker.location.streetAddress(),
      message: faker.hacker.phrase()
    })));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      _push(ssrRenderComponent(_component_h_table, mergeProps({ data: data.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Name",
              field: "name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Birthday",
              field: "birthday",
              width: "100px"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Address",
              field: "address",
              "show-overflow-tooltip": true,
              width: "100px"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Message",
              field: "message"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table_column, {
                title: "Name",
                field: "name"
              }),
              createVNode(_component_h_table_column, {
                title: "Birthday",
                field: "birthday",
                width: "100px"
              }),
              createVNode(_component_h_table_column, {
                title: "Address",
                field: "address",
                "show-overflow-tooltip": true,
                width: "100px"
              }),
              createVNode(_component_h_table_column, {
                title: "Message",
                field: "message"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/show-overflow-tooltip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
