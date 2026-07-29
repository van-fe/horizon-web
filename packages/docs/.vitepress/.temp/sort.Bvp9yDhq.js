import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
import { S as HTableSortOrderEnum, p as currDayjs } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sort",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(false);
    const data = ref(new Array(20).fill(0).map((_, index) => ({
      id: index + 1,
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ min: 22, max: 50, mode: "age" }).toDateString(),
      gender: faker.helpers.arrayElement(["male", "female"]),
      address: faker.location.streetAddress()
    })));
    function numberSort(order) {
      return (a, b) => order === HTableSortOrderEnum.ASC ? a.id - b.id : b.id - a.id;
    }
    function dateSort(order) {
      return (a, b) => {
        const res = order === HTableSortOrderEnum.ASC ? currDayjs(a.birthday).isBefore(b.birthday) : currDayjs(a.birthday).isAfter(b.birthday);
        return res ? -1 : 1;
      };
    }
    function onSortChange(states) {
      console.info("Table sort change", states);
    }
    function onColumnSortChange(order) {
      console.info("Column(Address) sort change:", order);
      isLoading.value = true;
      setTimeout(() => {
        data.value = order === null ? data.value.sort(numberSort(HTableSortOrderEnum.ASC)) : data.value.sort((a, b) => order === HTableSortOrderEnum.ASC ? a.address.localeCompare(b.address) : b.address.localeCompare(a.address));
        isLoading.value = false;
      }, 2e3);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      _push(ssrRenderComponent(_component_h_table, mergeProps({
        data: data.value,
        height: "300px",
        loading: isLoading.value,
        onSortChange
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "ID",
              field: "id",
              width: "80",
              sortable: "",
              "sort-method": numberSort
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Name",
              field: "name",
              sortable: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Gender",
              field: "gender",
              sortable: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Birthday",
              field: "birthday",
              sortable: "",
              "sort-separate": "",
              "sort-method": dateSort
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Address",
              field: "address",
              sortable: "",
              "use-built-ih-sort": false,
              onSortChange: onColumnSortChange
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table_column, {
                title: "ID",
                field: "id",
                width: "80",
                sortable: "",
                "sort-method": numberSort
              }),
              createVNode(_component_h_table_column, {
                title: "Name",
                field: "name",
                sortable: ""
              }),
              createVNode(_component_h_table_column, {
                title: "Gender",
                field: "gender",
                sortable: ""
              }),
              createVNode(_component_h_table_column, {
                title: "Birthday",
                field: "birthday",
                sortable: "",
                "sort-separate": "",
                "sort-method": dateSort
              }),
              createVNode(_component_h_table_column, {
                title: "Address",
                field: "address",
                sortable: "",
                "use-built-ih-sort": false,
                onSortChange: onColumnSortChange
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/sort.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
