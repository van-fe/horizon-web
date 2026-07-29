import { defineComponent, ref, watch, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "column-header-slot",
  __ssrInlineRender: true,
  setup(__props) {
    const searchedAddress = ref();
    const originData = new Array(20).fill(0).map((_, index) => ({
      id: index + 1,
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ min: 22, max: 50, mode: "age" }).toDateString(),
      gender: faker.helpers.arrayElement(["male", "female"]),
      address: faker.location.streetAddress()
    }));
    const data = ref(originData);
    watch(searchedAddress, (val) => {
      data.value = val ? originData.filter((row) => row.address.includes(val)) : originData;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      const _component_h_input = resolveComponent("h-input");
      _push(ssrRenderComponent(_component_h_table, mergeProps({
        data: data.value,
        height: "300"
      }, _attrs), {
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
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: searchedAddress.value,
                    "onUpdate:modelValue": ($event) => searchedAddress.value = $event,
                    placeholder: "Please search"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: searchedAddress.value,
                      "onUpdate:modelValue": ($event) => searchedAddress.value = $event,
                      placeholder: "Please search"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
              }, {
                header: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: searchedAddress.value,
                    "onUpdate:modelValue": ($event) => searchedAddress.value = $event,
                    placeholder: "Please search"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/column-header-slot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
