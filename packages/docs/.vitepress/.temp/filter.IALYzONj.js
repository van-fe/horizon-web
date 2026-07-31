import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
import { p as currDayjs } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "filter",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(false);
    const originData = new Array(100).fill(0).map((_, index) => ({
      id: index,
      name: faker.person.fullName(),
      registerDate: faker.date.recent(180).toDateString(),
      registerTime: currDayjs(faker.date.recent()).format("HH:mm:ss"),
      country: faker.location.country(),
      address: faker.location.streetAddress()
    }));
    const data = ref(originData);
    function onFilterChange(str) {
      isLoading.value = true;
      setTimeout(() => {
        data.value = str ? originData.filter((row) => row.address.includes(str)) : originData;
        isLoading.value = false;
      }, 2e3);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      _push(ssrRenderComponent(_component_h_table, mergeProps({
        data: data.value,
        height: "300px",
        loading: isLoading.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Seq",
              type: "index",
              width: "80",
              fixed: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Name",
              field: "name",
              filterable: true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Register Date",
              field: "registerDate",
              filterable: true,
              "filter-type": "date-picker",
              tip: "This column's data can be all formats that Dayjs can parse. If you have special format, you can set 'value-format' in 'filter-options'.",
              "filter-options": { type: "date-range", showNow: true }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Register Time",
              field: "registerTime",
              filterable: true,
              "filter-type": "time-picker",
              tip: "If you want to use time-picker component, you should give this column's data with HH:mm or HH:mm:ss format string",
              "filter-options": { type: "time", isRange: true, showNow: true, panelMinWidth: 250, fitInputWidth: "fit-content" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Country",
              field: "country",
              filterable: true,
              "filter-type": "select",
              "show-overflow-tooltip": "",
              width: "200px",
              tip: "Select filter will auto collect column's data to filter in multiple. If you have special options, you should give 'options' in 'filter-options'."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Address",
              field: "address",
              filterable: true,
              "min-width": "400",
              "use-built-in-filter": false,
              onFilterChange
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table_column, {
                title: "Seq",
                type: "index",
                width: "80",
                fixed: ""
              }),
              createVNode(_component_h_table_column, {
                title: "Name",
                field: "name",
                filterable: true
              }),
              createVNode(_component_h_table_column, {
                title: "Register Date",
                field: "registerDate",
                filterable: true,
                "filter-type": "date-picker",
                tip: "This column's data can be all formats that Dayjs can parse. If you have special format, you can set 'value-format' in 'filter-options'.",
                "filter-options": { type: "date-range", showNow: true }
              }),
              createVNode(_component_h_table_column, {
                title: "Register Time",
                field: "registerTime",
                filterable: true,
                "filter-type": "time-picker",
                tip: "If you want to use time-picker component, you should give this column's data with HH:mm or HH:mm:ss format string",
                "filter-options": { type: "time", isRange: true, showNow: true, panelMinWidth: 250, fitInputWidth: "fit-content" }
              }),
              createVNode(_component_h_table_column, {
                title: "Country",
                field: "country",
                filterable: true,
                "filter-type": "select",
                "show-overflow-tooltip": "",
                width: "200px",
                tip: "Select filter will auto collect column's data to filter in multiple. If you have special options, you should give 'options' in 'filter-options'."
              }),
              createVNode(_component_h_table_column, {
                title: "Address",
                field: "address",
                filterable: true,
                "min-width": "400",
                "use-built-in-filter": false,
                onFilterChange
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/filter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
