import { defineComponent, ref, resolveComponent, withCtx, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "table",
  __ssrInlineRender: true,
  setup(__props) {
    const sourceData = ref([
      { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
      { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
      { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
      { id: 10004, name: "Test4", role: "Designer", sex: "Women", age: 23, address: "test abc" },
      { id: 10005, name: "Test5", role: "Develop", sex: "Women", age: 30, address: "Shanghai" },
      { id: 10006, name: "Test6", role: "Designer", sex: "Women", age: 21, address: "test abc" },
      { id: 10007, name: "Test7", role: "Test", sex: "Man", age: 29, address: "test abc" },
      { id: 10008, name: "Test8", role: "Develop", sex: "Man", age: 35, address: "test abc" }
    ]);
    const dataModel = ref([]);
    const leftTableRef = ref();
    const rightTableRef = ref();
    const leftCheckedData = ref(/* @__PURE__ */ new Set());
    const rightCheckedData = ref(/* @__PURE__ */ new Set());
    const handleCheckboxChange = ({ row }, type) => {
      if (type === "left") {
        leftCheckedData.value.has(row.id) ? leftCheckedData.value.delete(row.id) : leftCheckedData.value.add(row.id);
      } else {
        rightCheckedData.value.has(row.id) ? rightCheckedData.value.delete(row.id) : rightCheckedData.value.add(row.id);
      }
    };
    const handleCheckboxAll = (data, type) => {
      if (type === "left") {
        leftCheckedData.value = new Set(data.map((item) => item.id));
      } else {
        rightCheckedData.value = new Set(dataModel.value);
      }
    };
    const transferToLeft = () => {
      var _a, _b;
      dataModel.value = dataModel.value.filter((id) => !rightCheckedData.value.has(id));
      rightCheckedData.value.clear();
      (_a = rightTableRef.value) == null ? void 0 : _a.clearCheckboxRow();
      (_b = rightTableRef.value) == null ? void 0 : _b.clearCheckboxReserve();
    };
    const transferToRight = () => {
      var _a, _b;
      dataModel.value = dataModel.value.filter((id) => !leftCheckedData.value.has(id)).concat(Array.from(leftCheckedData.value));
      leftCheckedData.value.clear();
      (_a = leftTableRef.value) == null ? void 0 : _a.clearCheckboxRow();
      (_b = leftTableRef.value) == null ? void 0 : _b.clearCheckboxReserve();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_transfer = resolveComponent("h-transfer");
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_pagination = resolveComponent("h-pagination");
      _push(`<div${ssrRenderAttrs(_attrs)}><h3 class="m-4">搜索Address</h3>`);
      _push(ssrRenderComponent(_component_h_transfer, {
        modelValue: dataModel.value,
        "onUpdate:modelValue": ($event) => dataModel.value = $event,
        props: { key: "id", label: "address" },
        data: sourceData.value,
        type: "table",
        style: { "width": "auto" }
      }, {
        leftHeader: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>标题（${ssrInterpolate(leftCheckedData.value.size)}/${ssrInterpolate(sourceData.value.length)}）</div>`);
          } else {
            return [
              createVNode("div", null, "标题（" + toDisplayString(leftCheckedData.value.size) + "/" + toDisplayString(sourceData.value.length) + "）", 1)
            ];
          }
        }),
        leftBody: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table, {
              ref_key: "leftTableRef",
              ref: leftTableRef,
              height: "100%",
              data,
              border: "inner",
              "checkbox-config": { highlight: true, reserve: false },
              onCheckboxChange: (checkedObj) => handleCheckboxChange(checkedObj, "left"),
              onCheckboxAll: ($event) => handleCheckboxAll(data, "left")
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_table_column, {
                    type: "checkbox",
                    width: "60",
                    align: "center",
                    "header-align": "center"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_table_column, {
                    field: "sex",
                    title: "Sex"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_table_column, {
                    field: "age",
                    title: "Age"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_table_column, {
                    field: "address",
                    title: "Address",
                    "show-overflow": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_table_column, {
                      type: "checkbox",
                      width: "60",
                      align: "center",
                      "header-align": "center"
                    }),
                    createVNode(_component_h_table_column, {
                      field: "sex",
                      title: "Sex"
                    }),
                    createVNode(_component_h_table_column, {
                      field: "age",
                      title: "Age"
                    }),
                    createVNode(_component_h_table_column, {
                      field: "address",
                      title: "Address",
                      "show-overflow": ""
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table, {
                ref_key: "leftTableRef",
                ref: leftTableRef,
                height: "100%",
                data,
                border: "inner",
                "checkbox-config": { highlight: true, reserve: false },
                onCheckboxChange: (checkedObj) => handleCheckboxChange(checkedObj, "left"),
                onCheckboxAll: ($event) => handleCheckboxAll(data, "left")
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_table_column, {
                    type: "checkbox",
                    width: "60",
                    align: "center",
                    "header-align": "center"
                  }),
                  createVNode(_component_h_table_column, {
                    field: "sex",
                    title: "Sex"
                  }),
                  createVNode(_component_h_table_column, {
                    field: "age",
                    title: "Age"
                  }),
                  createVNode(_component_h_table_column, {
                    field: "address",
                    title: "Address",
                    "show-overflow": ""
                  })
                ]),
                _: 1
              }, 8, ["data", "onCheckboxChange", "onCheckboxAll"])
            ];
          }
        }),
        control: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, {
              type: "normal",
              plain: true,
              disabled: !rightCheckedData.value.size,
              icon: "arrow_left",
              onClick: transferToLeft
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, {
              type: "normal",
              style: { "margin-left": "0" },
              disabled: !leftCheckedData.value.size,
              plain: true,
              icon: "arrow_right",
              onClick: transferToRight
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, {
                type: "normal",
                plain: true,
                disabled: !rightCheckedData.value.size,
                icon: "arrow_left",
                onClick: transferToLeft
              }, null, 8, ["disabled"]),
              createVNode(_component_h_button, {
                type: "normal",
                style: { "margin-left": "0" },
                disabled: !leftCheckedData.value.size,
                plain: true,
                icon: "arrow_right",
                onClick: transferToRight
              }, null, 8, ["disabled"])
            ];
          }
        }),
        rightHeader: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>标题（${ssrInterpolate(rightCheckedData.value.size)}/${ssrInterpolate(dataModel.value.length)}）</div>`);
          } else {
            return [
              createVNode("div", null, "标题（" + toDisplayString(rightCheckedData.value.size) + "/" + toDisplayString(dataModel.value.length) + "）", 1)
            ];
          }
        }),
        rightBody: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table, {
              ref_key: "rightTableRef",
              ref: rightTableRef,
              data,
              height: "100%",
              border: "inner",
              "checkbox-config": { highlight: true, reserve: false },
              onCheckboxAll: ($event) => handleCheckboxAll(data, "right"),
              onCheckboxChange: (checkedObj) => handleCheckboxChange(checkedObj, "right")
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_table_column, {
                    type: "checkbox",
                    width: "60",
                    align: "center",
                    "header-align": "center"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_table_column, {
                    field: "sex",
                    title: "Sex"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_table_column, {
                    field: "age",
                    title: "Age"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_table_column, {
                    field: "role",
                    title: "Role"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_table_column, {
                    field: "address",
                    title: "Address",
                    "show-overflow": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_table_column, {
                      type: "checkbox",
                      width: "60",
                      align: "center",
                      "header-align": "center"
                    }),
                    createVNode(_component_h_table_column, {
                      field: "sex",
                      title: "Sex"
                    }),
                    createVNode(_component_h_table_column, {
                      field: "age",
                      title: "Age"
                    }),
                    createVNode(_component_h_table_column, {
                      field: "role",
                      title: "Role"
                    }),
                    createVNode(_component_h_table_column, {
                      field: "address",
                      title: "Address",
                      "show-overflow": ""
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table, {
                ref_key: "rightTableRef",
                ref: rightTableRef,
                data,
                height: "100%",
                border: "inner",
                "checkbox-config": { highlight: true, reserve: false },
                onCheckboxAll: ($event) => handleCheckboxAll(data, "right"),
                onCheckboxChange: (checkedObj) => handleCheckboxChange(checkedObj, "right")
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_table_column, {
                    type: "checkbox",
                    width: "60",
                    align: "center",
                    "header-align": "center"
                  }),
                  createVNode(_component_h_table_column, {
                    field: "sex",
                    title: "Sex"
                  }),
                  createVNode(_component_h_table_column, {
                    field: "age",
                    title: "Age"
                  }),
                  createVNode(_component_h_table_column, {
                    field: "role",
                    title: "Role"
                  }),
                  createVNode(_component_h_table_column, {
                    field: "address",
                    title: "Address",
                    "show-overflow": ""
                  })
                ]),
                _: 1
              }, 8, ["data", "onCheckboxAll", "onCheckboxChange"])
            ];
          }
        }),
        leftFooter: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_pagination, {
              total: sourceData.value.length,
              type: "simplest"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_pagination, {
                total: sourceData.value.length,
                type: "simplest"
              }, null, 8, ["total"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Transfer/table.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
