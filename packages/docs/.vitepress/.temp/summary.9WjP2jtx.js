import { defineComponent, ref, resolveComponent, withCtx, createVNode, h, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
import { T as Decimal, U as get } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "summary",
  __ssrInlineRender: true,
  setup(__props) {
    let id = 1;
    const createData = (amount, childAmount) => new Array(amount).fill(0).map(() => ({
      id: id++,
      name: faker.hacker.noun(),
      prices: [faker.finance.amount(), faker.finance.amount(), faker.finance.amount()],
      children: childAmount > 0 ? createData(childAmount, childAmount - 2) : []
    }));
    const data = ref(createData(20, 6));
    const summaryMethod = ({ columns, data: data2, flattenData }) => {
      const average = [];
      const summary = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          average.push(h("div", { style: "font-weight: bolder; color: orange" }, "Average"));
          summary.push(h("div", { style: "font-weight: bolder; color: skyblue" }, "Summary"));
        } else {
          let sum = new Decimal(0);
          let avg = new Decimal(0);
          for (const row of flattenData) {
            const value = get(row, column.props.field);
            if (Number.isNaN(Number(value))) {
              average.push("N/A");
              summary.push("N/A");
              return;
            } else {
              avg = avg.add(value);
              sum = sum.add(value);
            }
          }
          average.push(avg.div(flattenData.length).toFixed(2));
          summary.push(sum.toFixed(2));
        }
      });
      return [average, summary];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_table, {
        data: data.value,
        "max-height": "500",
        "row-key": "id",
        border: "full",
        "show-summary": true
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
              title: "Price 1",
              field: "prices[0]",
              align: "right",
              "footer-align": "right",
              "header-align": "right"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Price 2",
              field: "prices[1]",
              align: "right",
              "footer-align": "right",
              "header-align": "right"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Price 3",
              field: "prices[2]",
              align: "right",
              "footer-align": "right",
              "header-align": "right"
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
                title: "Price 1",
                field: "prices[0]",
                align: "right",
                "footer-align": "right",
                "header-align": "right"
              }),
              createVNode(_component_h_table_column, {
                title: "Price 2",
                field: "prices[1]",
                align: "right",
                "footer-align": "right",
                "header-align": "right"
              }),
              createVNode(_component_h_table_column, {
                title: "Price 3",
                field: "prices[2]",
                align: "right",
                "footer-align": "right",
                "header-align": "right"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_table, {
        data: data.value,
        "max-height": "500",
        "row-key": "id",
        border: "full",
        "show-summary": true,
        "summary-row-amount": 2,
        "summary-method": summaryMethod,
        class: "mt-3",
        "table-layout": "fixed"
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
              title: "Price 1",
              field: "prices[0]",
              align: "right",
              "footer-align": "right",
              "header-align": "right"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Price 2",
              field: "prices[1]",
              align: "right",
              "footer-align": "right",
              "header-align": "right"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Price 3",
              field: "prices[2]",
              align: "right",
              "footer-align": "right",
              "header-align": "right"
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
                title: "Price 1",
                field: "prices[0]",
                align: "right",
                "footer-align": "right",
                "header-align": "right"
              }),
              createVNode(_component_h_table_column, {
                title: "Price 2",
                field: "prices[1]",
                align: "right",
                "footer-align": "right",
                "header-align": "right"
              }),
              createVNode(_component_h_table_column, {
                title: "Price 3",
                field: "prices[2]",
                align: "right",
                "footer-align": "right",
                "header-align": "right"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/summary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
