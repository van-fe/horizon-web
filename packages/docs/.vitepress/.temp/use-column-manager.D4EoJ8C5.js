import { defineComponent, ref, resolveComponent, withCtx, createVNode, unref, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { P as __default__, Q as __default__$1 } from "./app.js";
import { faker } from "@faker-js/faker";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "use-column-manager",
  __ssrInlineRender: true,
  setup(__props) {
    const useColumnManager = ref(true);
    const data = ref(new Array(20).fill(0).map(() => ({
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ min: 22, max: 50, mode: "age" }).toDateString(),
      address: [faker.location.country(), faker.location.state(), faker.location.city()],
      sign: new Array(30).fill(0).map(() => faker.datatype.boolean())
    })));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: useColumnManager.value,
        "onUpdate:modelValue": ($event) => useColumnManager.value = $event,
        class: "mb-2",
        status: true,
        "status-on-text": "Enabled Column Manager",
        "status-off-text": "Disabled Column Manager"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_table, {
        data: data.value,
        "max-height": "300",
        "use-column-manager": useColumnManager.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Name",
              field: "name",
              fixed: "",
              "lock-position": "",
              "lock-visible": "",
              "lock-fixed": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Birthday",
              field: "birthday",
              "min-width": "150",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Address",
              field: "address",
              fixed: "",
              "lock-visible": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_table_column, {
                    title: "Country",
                    field: "address[0]",
                    "show-overflow-tooltip": true,
                    width: "120px"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_table_column, {
                    title: "State",
                    field: "address[1]",
                    "show-overflow-tooltip": true,
                    width: "120px"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_table_column, {
                    title: "City",
                    field: "address[2]",
                    "show-overflow-tooltip": true,
                    width: "120px"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_table_column, {
                      title: "Country",
                      field: "address[0]",
                      "show-overflow-tooltip": true,
                      width: "120px"
                    }),
                    createVNode(_component_h_table_column, {
                      title: "State",
                      field: "address[1]",
                      "show-overflow-tooltip": true,
                      width: "120px"
                    }),
                    createVNode(_component_h_table_column, {
                      title: "City",
                      field: "address[2]",
                      "show-overflow-tooltip": true,
                      width: "120px"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, { title: "sign" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(30, (day) => {
                    _push3(ssrRenderComponent(_component_h_table_column, {
                      key: day,
                      title: day,
                      "header-align": "center",
                      width: "40px"
                    }, {
                      default: withCtx((scope, _push4, _parent4, _scopeId3) => {
                        var _a, _b;
                        if (_push4) {
                          if ((_a = scope.row.sign) == null ? void 0 : _a[day - 1]) {
                            _push4(ssrRenderComponent(unref(__default__), null, null, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(unref(__default__$1), null, null, _parent4, _scopeId3));
                          }
                        } else {
                          return [
                            ((_b = scope.row.sign) == null ? void 0 : _b[day - 1]) ? (openBlock(), createBlock(unref(__default__), { key: 0 })) : (openBlock(), createBlock(unref(__default__$1), { key: 1 }))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(30, (day) => {
                      return createVNode(_component_h_table_column, {
                        key: day,
                        title: day,
                        "header-align": "center",
                        width: "40px"
                      }, {
                        default: withCtx((scope) => {
                          var _a;
                          return [
                            ((_a = scope.row.sign) == null ? void 0 : _a[day - 1]) ? (openBlock(), createBlock(unref(__default__), { key: 0 })) : (openBlock(), createBlock(unref(__default__$1), { key: 1 }))
                          ];
                        }),
                        _: 2
                      }, 1032, ["title"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table_column, {
                title: "Name",
                field: "name",
                fixed: "",
                "lock-position": "",
                "lock-visible": "",
                "lock-fixed": ""
              }),
              createVNode(_component_h_table_column, {
                title: "Birthday",
                field: "birthday",
                "min-width": "150",
                align: "center"
              }),
              createVNode(_component_h_table_column, {
                title: "Address",
                field: "address",
                fixed: "",
                "lock-visible": ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_table_column, {
                    title: "Country",
                    field: "address[0]",
                    "show-overflow-tooltip": true,
                    width: "120px"
                  }),
                  createVNode(_component_h_table_column, {
                    title: "State",
                    field: "address[1]",
                    "show-overflow-tooltip": true,
                    width: "120px"
                  }),
                  createVNode(_component_h_table_column, {
                    title: "City",
                    field: "address[2]",
                    "show-overflow-tooltip": true,
                    width: "120px"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_h_table_column, { title: "sign" }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(30, (day) => {
                    return createVNode(_component_h_table_column, {
                      key: day,
                      title: day,
                      "header-align": "center",
                      width: "40px"
                    }, {
                      default: withCtx((scope) => {
                        var _a;
                        return [
                          ((_a = scope.row.sign) == null ? void 0 : _a[day - 1]) ? (openBlock(), createBlock(unref(__default__), { key: 0 })) : (openBlock(), createBlock(unref(__default__$1), { key: 1 }))
                        ];
                      }),
                      _: 2
                    }, 1032, ["title"]);
                  }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/use-column-manager.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
