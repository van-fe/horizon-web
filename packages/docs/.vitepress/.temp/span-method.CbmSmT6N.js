import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "span-method",
  __ssrInlineRender: true,
  setup(__props) {
    let count = 2;
    let partNo = "";
    function createPartNo() {
      if (count === 2) {
        count = 0;
        partNo = `P${faker.helpers.rangeToNumber({ min: 1e6, max: 9999999 })}`;
      } else {
        count++;
      }
      return partNo;
    }
    const data = ref(new Array(20).fill(0).map(() => ({
      id: faker.string.uuid(),
      partNo: createPartNo(),
      parentSVNumber: `P${faker.helpers.rangeToNumber({ min: 1e6, max: 9999999 })}`,
      status: faker.helpers.arrayElement(["released", "working"])
    })));
    const arraySpanMethod = (data2) => {
      if (data2.columnIndex === 0) {
        if (data2.rowIndex % 3 === 0) {
          return [3, 1];
        } else {
          return [0, 0];
        }
      }
    };
    const objectSpanMethod = (data2) => {
      if (data2.rowIndex % 2 === 0) {
        if (data2.columnIndex === 0) {
          return [1, 2];
        } else if (data2.columnIndex === 1) {
          return [0, 0];
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      const _component_h_tag = resolveComponent("h-tag");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_table, {
        data: data.value,
        "spah-method": arraySpanMethod,
        "row-key": "id",
        height: 400,
        border: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Part No.",
              field: "partNo",
              width: "120"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Parent SV Number",
              field: "parentSVNumber"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, { title: "Status" }, {
              default: withCtx((scope, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tag, {
                    type: scope.row.status === "released" ? "success" : "info",
                    clickable: false
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(scope.row.status)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(scope.row.status), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tag, {
                      type: scope.row.status === "released" ? "success" : "info",
                      clickable: false
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(scope.row.status), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table_column, {
                title: "Part No.",
                field: "partNo",
                width: "120"
              }),
              createVNode(_component_h_table_column, {
                title: "Parent SV Number",
                field: "parentSVNumber"
              }),
              createVNode(_component_h_table_column, { title: "Status" }, {
                default: withCtx((scope) => [
                  createVNode(_component_h_tag, {
                    type: scope.row.status === "released" ? "success" : "info",
                    clickable: false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(scope.row.status), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_table, {
        data: data.value,
        "spah-method": objectSpanMethod,
        "row-key": "id",
        "max-height": 400,
        class: "mt-3",
        border: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Part No.",
              field: "partNo",
              width: "120"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Parent SV Number",
              field: "parentSVNumber"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, { title: "Status" }, {
              default: withCtx((scope, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tag, {
                    type: scope.row.status === "released" ? "success" : "info",
                    clickable: false
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(scope.row.status)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(scope.row.status), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tag, {
                      type: scope.row.status === "released" ? "success" : "info",
                      clickable: false
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(scope.row.status), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table_column, {
                title: "Part No.",
                field: "partNo",
                width: "120"
              }),
              createVNode(_component_h_table_column, {
                title: "Parent SV Number",
                field: "parentSVNumber"
              }),
              createVNode(_component_h_table_column, { title: "Status" }, {
                default: withCtx((scope) => [
                  createVNode(_component_h_tag, {
                    type: scope.row.status === "released" ? "success" : "info",
                    clickable: false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(scope.row.status), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/span-method.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
