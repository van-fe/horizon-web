import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tree-single-selection",
  __ssrInlineRender: true,
  setup(__props) {
    let id = 1;
    const checkStrictly = ref(false);
    const checkedRow = ref();
    const createData = (amount, childAmount) => new Array(amount).fill(0).map(() => ({
      id: id++,
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ min: 22, max: 50, mode: "age" }).toDateString(),
      gender: faker.helpers.arrayElement(["male", "female"]),
      address: faker.location.streetAddress(),
      children: childAmount > 0 ? createData(childAmount, childAmount - 2) : []
    }));
    const data = ref(createData(20, 6));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      _push(`<!--[--><p>`);
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: checkStrictly.value,
        "onUpdate:modelValue": ($event) => checkStrictly.value = $event,
        status: "",
        "status-oh-text": "check strictly",
        "status-off-text": "not check strictly"
      }, null, _parent));
      _push(`</p><p> Checked row&#39;s id: ${ssrInterpolate(checkedRow.value)}</p>`);
      _push(ssrRenderComponent(_component_h_table, {
        data: data.value,
        height: "500",
        "row-key": "id"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              "selected-keys": checkedRow.value,
              "onUpdate:selectedKeys": ($event) => checkedRow.value = $event,
              title: "ID",
              field: "id",
              type: "selection",
              "column-key": "id",
              "check-strictly": checkStrictly.value
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
                "selected-keys": checkedRow.value,
                "onUpdate:selectedKeys": ($event) => checkedRow.value = $event,
                title: "ID",
                field: "id",
                type: "selection",
                "column-key": "id",
                "check-strictly": checkStrictly.value
              }, null, 8, ["selected-keys", "onUpdate:selectedKeys", "check-strictly"]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/tree-single-selection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
