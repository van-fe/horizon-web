import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import { faker } from "@faker-js/faker";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "column-default-slot",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref(new Array(20).fill(0).map((_, index) => ({
      id: index + 1,
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ min: 22, max: 50, mode: "age" }).toDateString(),
      gender: faker.helpers.arrayElement(["male", "female"]),
      address: faker.location.streetAddress()
    })));
    function view(data2) {
      $message(`view ${data2.row.name}`);
      console.info("view: ", data2);
    }
    function edit(data2) {
      $message(`edit ${data2.row.name}`);
      console.info("edit: ", data2);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_table_column = resolveComponent("h-table-column");
      const _component_h_tag = resolveComponent("h-tag");
      const _component_h_button = resolveComponent("h-button");
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
            _push2(ssrRenderComponent(_component_h_table_column, { title: "Gender" }, {
              default: withCtx((scope, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tag, {
                    type: scope.row.gender === "male" ? "info" : "error",
                    plain: ""
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(scope.row.gender)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(scope.row.gender), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tag, {
                      type: scope.row.gender === "male" ? "info" : "error",
                      plain: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(scope.row.gender), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Birthday",
              field: "birthday"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, {
              title: "Address",
              field: "address"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_table_column, { title: "Action" }, {
              default: withCtx((scope, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, {
                    type: "normal",
                    size: "small",
                    onClick: ($event) => view(scope)
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
                    type: "normal",
                    size: "small",
                    onClick: ($event) => edit(scope)
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
                      type: "normal",
                      size: "small",
                      onClick: ($event) => view(scope)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("View")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_h_button, {
                      type: "normal",
                      size: "small",
                      onClick: ($event) => edit(scope)
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
                title: "ID",
                field: "id"
              }),
              createVNode(_component_h_table_column, {
                title: "Name",
                field: "name"
              }),
              createVNode(_component_h_table_column, { title: "Gender" }, {
                default: withCtx((scope) => [
                  createVNode(_component_h_tag, {
                    type: scope.row.gender === "male" ? "info" : "error",
                    plain: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(scope.row.gender), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_h_table_column, {
                title: "Birthday",
                field: "birthday"
              }),
              createVNode(_component_h_table_column, {
                title: "Address",
                field: "address"
              }),
              createVNode(_component_h_table_column, { title: "Action" }, {
                default: withCtx((scope) => [
                  createVNode(_component_h_button, {
                    type: "normal",
                    size: "small",
                    onClick: ($event) => view(scope)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("View")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_h_button, {
                    type: "normal",
                    size: "small",
                    onClick: ($event) => edit(scope)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/column-default-slot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
