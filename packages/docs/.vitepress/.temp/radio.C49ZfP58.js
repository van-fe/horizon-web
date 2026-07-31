import { defineComponent, reactive, ref, watchEffect, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, createVNode, withDirectives, toDisplayString, vShow, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "radio",
  __ssrInlineRender: true,
  setup(__props) {
    const dataMap = reactive({
      user: [
        {
          key: 10,
          name: "Arooklyn Simmons 用户",
          avatar: "/demo-assets/avatar-indigo.svg",
          department: "Product Design & Development-Digital Development-Web Application Development Department"
        },
        {
          key: 11,
          name: "Brooklyn Simmons 用户2",
          avatar: "/demo-assets/avatar-indigo.svg",
          department: "Product Design & Development-Digital Development-Web Application Development Department"
        },
        {
          key: 12,
          name: "Crooklyn Simmons 用户3",
          avatar: "/demo-assets/avatar-indigo.svg",
          department: "Product Design & Development-Digital Development-Web Application Development Department"
        },
        {
          key: 13,
          name: "Drooklyn Simmons 用户4",
          avatar: "/demo-assets/avatar-indigo.svg",
          department: "Product Design & Development-Digital Development-Web Application Development Department"
        },
        {
          key: 14,
          name: "Erooklyn Simmons 用户5",
          avatar: "/demo-assets/avatar-indigo.svg",
          department: "Product Design & Development-Digital Development-Web Application Development Department"
        }
      ],
      colleague: [
        {
          key: 101,
          name: "Arooklyn Simmons 王磊",
          avatar: "/demo-assets/avatar-indigo.svg",
          department: "Product Design & Development-Digital Development-Web Application Development Department"
        },
        {
          key: 1,
          name: "Brooklyn Simmons 王磊2",
          avatar: "/demo-assets/avatar-indigo.svg",
          department: "Product Design & Development-Digital Development-Web Application Development Department"
        },
        {
          key: 2,
          name: "Crooklyn Simmons 王磊3",
          avatar: "/demo-assets/avatar-indigo.svg",
          department: "Product Design & Development-Digital Development-Web Application Development Department"
        },
        {
          key: 3,
          name: "Drooklyn Simmons 王磊4",
          avatar: "/demo-assets/avatar-indigo.svg",
          department: "Product Design & Development-Digital Development-Web Application Development Department"
        },
        {
          key: 4,
          name: "Erooklyn Simmons 王磊5",
          avatar: "/demo-assets/avatar-indigo.svg",
          department: "Product Design & Development-Digital Development-Web Application Development Department"
        }
      ]
    });
    const data = ref([]);
    const searchInput = ref();
    const tabActiveKey = ref("colleague");
    watchEffect(() => {
      data.value = dataMap[tabActiveKey.value].filter(
        (item) => !searchInput.value || item.name.includes(searchInput.value)
      );
    });
    const dataModel = ref([]);
    const radioModelValue = ref(3);
    watchEffect(() => {
      radioModelValue.value = dataModel.value[0];
    });
    const changeSelect = (v) => {
      dataModel.value = [v];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_transfer = resolveComponent("h-transfer");
      const _component_h_input = resolveComponent("h-input");
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_avatar = resolveComponent("h-avatar");
      const _component_h_button = resolveComponent("h-button");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(ssrRenderComponent(_component_h_transfer, mergeProps({
        modelValue: dataModel.value,
        "onUpdate:modelValue": ($event) => dataModel.value = $event,
        data: data.value,
        titles: [""],
        props: { label: "name" },
        style: { "width": "600px" }
      }, _attrs), {
        leftFilter: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="transfer-radio__filter" data-v-10d8ca96${_scopeId}>`);
            _push2(ssrRenderComponent(_component_h_input, {
              modelValue: searchInput.value,
              "onUpdate:modelValue": ($event) => searchInput.value = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_tabs, {
              "active-key": tabActiveKey.value,
              "onUpdate:activeKey": ($event) => tabActiveKey.value = $event,
              class: "transfer-radio__tab",
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tab, {
                    key: "colleague",
                    label: "同事联系人"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tab, {
                    key: "user",
                    label: "用户联系人"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tab, {
                      key: "colleague",
                      label: "同事联系人"
                    }),
                    createVNode(_component_h_tab, {
                      key: "user",
                      label: "用户联系人"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "transfer-radio__filter" }, [
                createVNode(_component_h_input, {
                  modelValue: searchInput.value,
                  "onUpdate:modelValue": ($event) => searchInput.value = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_h_tabs, {
                  "active-key": tabActiveKey.value,
                  "onUpdate:activeKey": ($event) => tabActiveKey.value = $event,
                  class: "transfer-radio__tab",
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_tab, {
                      key: "colleague",
                      label: "同事联系人"
                    }),
                    createVNode(_component_h_tab, {
                      key: "user",
                      label: "用户联系人"
                    })
                  ]),
                  _: 1
                }, 8, ["active-key", "onUpdate:activeKey"])
              ])
            ];
          }
        }),
        leftBody: withCtx(({ data: data2 }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="transfer-radio__left" data-v-10d8ca96${_scopeId}><!--[-->`);
            ssrRenderList(data2, (item) => {
              _push2(`<div class="transfer-radio__item" data-v-10d8ca96${_scopeId}>`);
              _push2(ssrRenderComponent(_component_h_radio, {
                modelValue: radioModelValue.value,
                "onUpdate:modelValue": ($event) => radioModelValue.value = $event,
                value: item.key,
                disabled: item.disabled,
                onChange: changeSelect
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex align-center" data-v-10d8ca96${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_h_avatar, {
                      size: "small",
                      src: item.avatar
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="ml-2 flex-1 flex flex-column overflow-hidden" data-v-10d8ca96${_scopeId2}><div style="${ssrRenderStyle({ "text-overflow": "ellipsis", "overflow": "hidden" })}" data-v-10d8ca96${_scopeId2}>${ssrInterpolate(item.name)}</div><div${ssrRenderAttrs(mergeProps({ style: { "text-overflow": "ellipsis", "overflow": "hidden", "color": "#929398" } }, ssrGetDirectiveProps(_ctx, _directive_tooltip, item.department, void 0, { overflow: true })))} data-v-10d8ca96${_scopeId2}>${ssrInterpolate(item.department)}</div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex align-center" }, [
                        createVNode(_component_h_avatar, {
                          size: "small",
                          src: item.avatar
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "ml-2 flex-1 flex flex-column overflow-hidden" }, [
                          createVNode("div", { style: { "text-overflow": "ellipsis", "overflow": "hidden" } }, toDisplayString(item.name), 1),
                          withDirectives((openBlock(), createBlock("div", { style: { "text-overflow": "ellipsis", "overflow": "hidden", "color": "#929398" } }, [
                            createTextVNode(toDisplayString(item.department), 1)
                          ])), [
                            [
                              _directive_tooltip,
                              item.department,
                              void 0,
                              { overflow: true }
                            ]
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "transfer-radio__left" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(data2, (item) => {
                  return openBlock(), createBlock("div", {
                    key: item.key,
                    class: "transfer-radio__item"
                  }, [
                    createVNode(_component_h_radio, {
                      modelValue: radioModelValue.value,
                      "onUpdate:modelValue": ($event) => radioModelValue.value = $event,
                      value: item.key,
                      disabled: item.disabled,
                      onChange: changeSelect
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex align-center" }, [
                          createVNode(_component_h_avatar, {
                            size: "small",
                            src: item.avatar
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "ml-2 flex-1 flex flex-column overflow-hidden" }, [
                            createVNode("div", { style: { "text-overflow": "ellipsis", "overflow": "hidden" } }, toDisplayString(item.name), 1),
                            withDirectives((openBlock(), createBlock("div", { style: { "text-overflow": "ellipsis", "overflow": "hidden", "color": "#929398" } }, [
                              createTextVNode(toDisplayString(item.department), 1)
                            ])), [
                              [
                                _directive_tooltip,
                                item.department,
                                void 0,
                                { overflow: true }
                              ]
                            ])
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["modelValue", "onUpdate:modelValue", "value", "disabled"])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        item: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex align-center" data-v-10d8ca96${_scopeId}>`);
            _push2(ssrRenderComponent(_component_h_avatar, {
              size: "small",
              src: item.avatar
            }, null, _parent2, _scopeId));
            _push2(`<div class="ml-2 flex-1 flex flex-column overflow-hidden" data-v-10d8ca96${_scopeId}><div style="${ssrRenderStyle({ "text-overflow": "ellipsis", "overflow": "hidden" })}" data-v-10d8ca96${_scopeId}>${ssrInterpolate(item.name)}</div><div${ssrRenderAttrs(mergeProps({ style: { "text-overflow": "ellipsis", "overflow": "hidden", "color": "#929398" } }, ssrGetDirectiveProps(_ctx, _directive_tooltip, item.department, void 0, { overflow: true })))} data-v-10d8ca96${_scopeId}>${ssrInterpolate(item.department)}</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex align-center" }, [
                createVNode(_component_h_avatar, {
                  size: "small",
                  src: item.avatar
                }, null, 8, ["src"]),
                createVNode("div", { class: "ml-2 flex-1 flex flex-column overflow-hidden" }, [
                  createVNode("div", { style: { "text-overflow": "ellipsis", "overflow": "hidden" } }, toDisplayString(item.name), 1),
                  withDirectives((openBlock(), createBlock("div", { style: { "text-overflow": "ellipsis", "overflow": "hidden", "color": "#929398" } }, [
                    createTextVNode(toDisplayString(item.department), 1)
                  ])), [
                    [
                      _directive_tooltip,
                      item.department,
                      void 0,
                      { overflow: true }
                    ]
                  ])
                ])
              ])
            ];
          }
        }),
        rightHeader: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-1 align-center justify-space-between" data-v-10d8ca96${_scopeId}><div data-v-10d8ca96${_scopeId}>${ssrInterpolate(`已选: ${dataModel.value.length} 人`)}</div>`);
            _push2(ssrRenderComponent(_component_h_button, {
              style: !!dataModel.value.length ? null : { display: "none" },
              size: "medium",
              link: true,
              active: true,
              onClick: () => dataModel.value = []
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 清除 `);
                } else {
                  return [
                    createTextVNode(" 清除 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-1 align-center justify-space-between" }, [
                createVNode("div", null, toDisplayString(`已选: ${dataModel.value.length} 人`), 1),
                withDirectives(createVNode(_component_h_button, {
                  size: "medium",
                  link: true,
                  active: true,
                  onClick: () => dataModel.value = []
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 清除 ")
                  ]),
                  _: 1
                }, 8, ["onClick"]), [
                  [vShow, !!dataModel.value.length]
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Transfer/radio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const radio = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-10d8ca96"]]);
export {
  radio as default
};
