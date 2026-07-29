import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "resizable",
  __ssrInlineRender: true,
  setup(__props) {
    const showHeaderDivider = ref(true);
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
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: showHeaderDivider.value,
        "onUpdate:modelValue": ($event) => showHeaderDivider.value = $event,
        class: "mb-2",
        status: "",
        "status-oh-text": "Shown Header Divider",
        "status-off-text": "Hidden Header Divider"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_table, {
        data: data.value,
        "show-header-divider": showHeaderDivider.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Seq",
              type: "index",
              fixed: true,
              resizable: false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Name",
              field: "name",
              fixed: "",
              resizable: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Birthday",
              field: "birthday",
              width: "200px",
              resizable: "",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Address",
              field: "address",
              "mih-width": "500px",
              resizable: ""
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
              "mih-width": "120px",
              align: "center",
              "header-align": "center",
              resizable: ""
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
                fixed: true,
                resizable: false
              }),
              createVNode(_component_h_table_column, {
                title: "Name",
                field: "name",
                fixed: "",
                resizable: ""
              }),
              createVNode(_component_h_table_column, {
                title: "Birthday",
                field: "birthday",
                width: "200px",
                resizable: "",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_h_table_column, {
                title: "Address",
                field: "address",
                "mih-width": "500px",
                resizable: ""
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
                "mih-width": "120px",
                align: "center",
                "header-align": "center",
                resizable: ""
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/resizable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
