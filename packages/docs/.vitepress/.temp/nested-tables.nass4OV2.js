import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "nested-tables",
  __ssrInlineRender: true,
  setup(__props) {
    const tableDomRef = ref();
    const data = ref(new Array(20).fill(0).map((_, index) => ({
      id: index + 1,
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ min: 22, max: 50, mode: "age" }).toDateString(),
      gender: faker.helpers.arrayElement(["male", "female"]),
      address: faker.location.streetAddress(),
      orders: new Array(faker.helpers.arrayElement([10, 15, 20, 25])).fill(0).map(() => ({
        no: faker.finance.bic(),
        name: faker.word.noun(),
        price: faker.finance.amount()
      }))
    })));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      _push(ssrRenderComponent(_component_h_table, mergeProps({
        ref_key: "tableDomRef",
        ref: tableDomRef,
        data: data.value,
        height: "500"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "ID",
              field: "id",
              type: "expand",
              fixed: ""
            }, {
              expand: withCtx((scope, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_table, {
                    data: scope.row.orders,
                    border: "",
                    "header-sticky": "",
                    "header-sticky-offset": 92,
                    "header-sticky-container": (_a = tableDomRef.value) == null ? void 0 : _a.getScrollWrap()
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_table_column, {
                          title: "No",
                          field: "no"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_table_column, {
                          title: "Name",
                          field: "name"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_h_table_column, {
                          title: "Price",
                          field: "price"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_table_column, {
                            title: "No",
                            field: "no"
                          }),
                          createVNode(_component_h_table_column, {
                            title: "Name",
                            field: "name"
                          }),
                          createVNode(_component_h_table_column, {
                            title: "Price",
                            field: "price"
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_table, {
                      data: scope.row.orders,
                      border: "",
                      "header-sticky": "",
                      "header-sticky-offset": 92,
                      "header-sticky-container": (_b = tableDomRef.value) == null ? void 0 : _b.getScrollWrap()
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_table_column, {
                          title: "No",
                          field: "no"
                        }),
                        createVNode(_component_h_table_column, {
                          title: "Name",
                          field: "name"
                        }),
                        createVNode(_component_h_table_column, {
                          title: "Price",
                          field: "price"
                        })
                      ]),
                      _: 1
                    }, 8, ["data", "header-sticky-container"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Name",
              field: "name",
              width: "100px",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Gender",
              field: "gender",
              width: "100px"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Birthday",
              field: "birthday",
              "min-width": "200px"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Address",
              field: "address",
              "min-width": "500px"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table_column, {
                title: "ID",
                field: "id",
                type: "expand",
                fixed: ""
              }, {
                expand: withCtx((scope) => {
                  var _a;
                  return [
                    createVNode(_component_h_table, {
                      data: scope.row.orders,
                      border: "",
                      "header-sticky": "",
                      "header-sticky-offset": 92,
                      "header-sticky-container": (_a = tableDomRef.value) == null ? void 0 : _a.getScrollWrap()
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_h_table_column, {
                          title: "No",
                          field: "no"
                        }),
                        createVNode(_component_h_table_column, {
                          title: "Name",
                          field: "name"
                        }),
                        createVNode(_component_h_table_column, {
                          title: "Price",
                          field: "price"
                        })
                      ]),
                      _: 1
                    }, 8, ["data", "header-sticky-container"])
                  ];
                }),
                _: 1
              }),
              createVNode(_component_h_table_column, {
                title: "Name",
                field: "name",
                width: "100px",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_h_table_column, {
                title: "Gender",
                field: "gender",
                width: "100px"
              }),
              createVNode(_component_h_table_column, {
                title: "Birthday",
                field: "birthday",
                "min-width": "200px"
              }),
              createVNode(_component_h_table_column, {
                title: "Address",
                field: "address",
                "min-width": "500px"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/nested-tables.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
