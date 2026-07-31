import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "fixed",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref(new Array(5).fill(0).map((_) => ({
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ min: 22, max: 50, mode: "age" }).toDateString(),
      address: faker.location.streetAddress(),
      message: faker.hacker.phrase()
    })));
    function view(data2) {
      console.info("view:", data2.name);
    }
    function edit(data2) {
      console.info("edit:", data2.name);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      const _component_h_button = resolveComponent("h-button");
      _push(ssrRenderComponent(_component_h_table, mergeProps({
        data: data.value,
        "header-sticky": "",
        "header-sticky-container": ".VPDoc"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Seq",
              type: "index",
              fixed: true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Name",
              field: "name",
              fixed: ""
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
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Message",
              field: "message",
              "show-overflow-tooltip": "",
              width: "800px"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Operations",
              fixed: "right",
              "min-width": "120px",
              align: "center",
              "header-align": "center"
            }, {
              default: withCtx((scope, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, {
                    link: "",
                    size: "small",
                    onClick: ($event) => view(scope.row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`View`);
                      } else {
                        return [
                          createTextVNode("View")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_button, {
                    link: "",
                    size: "small",
                    onClick: ($event) => edit(scope.row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Edit`);
                      } else {
                        return [
                          createTextVNode("Edit")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, {
                      link: "",
                      size: "small",
                      onClick: ($event) => view(scope.row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("View")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_h_button, {
                      link: "",
                      size: "small",
                      onClick: ($event) => edit(scope.row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Edit")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_table_column, {
                title: "Seq",
                type: "index",
                fixed: true
              }),
              createVNode(_component_h_table_column, {
                title: "Name",
                field: "name",
                fixed: ""
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
              }),
              createVNode(_component_h_table_column, {
                title: "Message",
                field: "message",
                "show-overflow-tooltip": "",
                width: "800px"
              }),
              createVNode(_component_h_table_column, {
                title: "Operations",
                fixed: "right",
                "min-width": "120px",
                align: "center",
                "header-align": "center"
              }, {
                default: withCtx((scope) => [
                  createVNode(_component_h_button, {
                    link: "",
                    size: "small",
                    onClick: ($event) => view(scope.row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("View")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_h_button, {
                    link: "",
                    size: "small",
                    onClick: ($event) => edit(scope.row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Edit")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/fixed.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
