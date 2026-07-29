import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { q as __default__ } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "filter",
  __ssrInlineRender: true,
  setup(__props) {
    const values1 = ref([1, 2]);
    const value2 = ref();
    const value4 = ref();
    const values2 = ref([]);
    const panelFilterInputValue2 = ref("");
    const selectOptions = [
      { value: 1, label: "上海", description: "Shanghai" },
      { value: 2, label: "北京", description: "Beijing" },
      { value: 3, label: "合肥", description: "Hefei" },
      { value: 4, label: "深圳", description: "Shenzhen" },
      { value: 5, label: "杭州", description: "Hangzhou" },
      { value: 6, label: "天津", description: "Tianjin" },
      { value: 7, label: "西安", description: `Xi'an` },
      { value: 8, label: "南京", description: "Nanjing" },
      { value: 9, label: "哈尔滨", description: "Harbin" },
      { value: 10, label: "香港", description: "HongKong" }
    ];
    const filterOption = (input, props) => {
      var _a, _b;
      return ((_a = props.label) == null ? void 0 : _a.toString().includes(input)) || ((_b = props.description) == null ? void 0 : _b.toString().includes(input)) || false;
    };
    const dropdownVisibleChange = (visible) => {
      if (!visible) {
        panelFilterInputValue2.value = "";
      }
    };
    function onInput(val) {
      console.info("input: ", val);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tooltip = resolveComponent("h-tooltip");
      const _component_a_icon = resolveComponent("a-icon");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      const _component_h_input = resolveComponent("h-input");
      _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-ac8e988f${_scopeId2}> 默认过滤规则 `);
                  _push3(ssrRenderComponent(_component_h_tooltip, null, {
                    content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 默认的规则为 \`label.toLowerCase().includes(value)\`，label 是传入的 option 上的 label/description 属性值，value 是输入的内容，默认规则是忽略大小写进行字符串匹配的 `);
                      } else {
                        return [
                          createTextVNode(" 默认的规则为 `label.toLowerCase().includes(value)`，label 是传入的 option 上的 label/description 属性值，value 是输入的内容，默认规则是忽略大小写进行字符串匹配的 ")
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_icon, { name: "help" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_icon, { name: "help" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    filterable: true,
                    multiple: true,
                    "to-body": false,
                    "fit-content-input-min-width": 1
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label,
                            description: item.description
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.value,
                              value: item.value,
                              label: item.label,
                              description: item.description
                            }, null, 8, ["value", "label", "description"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, [
                      createTextVNode(" 默认过滤规则 "),
                      createVNode(_component_h_tooltip, null, {
                        content: withCtx(() => [
                          createTextVNode(" 默认的规则为 `label.toLowerCase().includes(value)`，label 是传入的 option 上的 label/description 属性值，value 是输入的内容，默认规则是忽略大小写进行字符串匹配的 ")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_a_icon, { name: "help" })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_h_select, {
                      modelValue: values1.value,
                      "onUpdate:modelValue": ($event) => values1.value = $event,
                      filterable: true,
                      multiple: true,
                      "to-body": false,
                      "fit-content-input-min-width": 1
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label,
                            description: item.description
                          }, null, 8, ["value", "label", "description"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-ac8e988f${_scopeId2}> 自定义过滤器 `);
                  _push3(ssrRenderComponent(_component_h_tooltip, null, {
                    content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 这个示例展示的是自定义过滤方法，过滤方法中是大小写敏感的字符串匹配 `);
                      } else {
                        return [
                          createTextVNode(" 这个示例展示的是自定义过滤方法，过滤方法中是大小写敏感的字符串匹配 ")
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_icon, { name: "help" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_icon, { name: "help" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "filter-option": filterOption,
                    clearable: true,
                    placeholder: "请选择",
                    "to-body": false,
                    onInput
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label,
                            description: item.description
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.value,
                              value: item.value,
                              label: item.label,
                              description: item.description
                            }, null, 8, ["value", "label", "description"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, [
                      createTextVNode(" 自定义过滤器 "),
                      createVNode(_component_h_tooltip, null, {
                        content: withCtx(() => [
                          createTextVNode(" 这个示例展示的是自定义过滤方法，过滤方法中是大小写敏感的字符串匹配 ")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_a_icon, { name: "help" })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_h_select, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      "filter-option": filterOption,
                      clearable: true,
                      placeholder: "请选择",
                      "to-body": false,
                      onInput
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label,
                            description: item.description
                          }, null, 8, ["value", "label", "description"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-ac8e988f${_scopeId2}> 单选-下拉列表带筛选功能 </div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value4.value,
                    "onUpdate:modelValue": ($event) => value4.value = $event,
                    "panel-filter-option": "",
                    "use-build-in-panel-filter": "",
                    "to-body": false
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="empty-city" data-v-ac8e988f${_scopeId3}>没有找到对应的城市信息</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label,
                            description: item.description
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.value,
                              value: item.value,
                              label: item.label,
                              description: item.description
                            }, null, 8, ["value", "label", "description"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " 单选-下拉列表带筛选功能 "),
                    createVNode(_component_h_select, {
                      modelValue: value4.value,
                      "onUpdate:modelValue": ($event) => value4.value = $event,
                      "panel-filter-option": "",
                      "use-build-in-panel-filter": "",
                      "to-body": false
                    }, {
                      empty: withCtx(() => [
                        createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
                      ]),
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label,
                            description: item.description
                          }, null, 8, ["value", "label", "description"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title" data-v-ac8e988f${_scopeId2}> 多选-下拉列表带筛选功能 </div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    "panel-filter-option": "",
                    multiple: "",
                    "panel-filter-input-value": panelFilterInputValue2.value,
                    "to-body": false,
                    onDropdownVisibleChange: dropdownVisibleChange
                  }, {
                    panelHeaderRender: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="panel-filter-box" data-v-ac8e988f${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_h_input, {
                          modelValue: panelFilterInputValue2.value,
                          "onUpdate:modelValue": ($event) => panelFilterInputValue2.value = $event,
                          placeholder: "Please input search keywords"
                        }, {
                          prefix: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(__default__), {
                                size: "16",
                                color: "#BBBDC7"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(__default__), {
                                  size: "16",
                                  color: "#BBBDC7"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "panel-filter-box" }, [
                            createVNode(_component_h_input, {
                              modelValue: panelFilterInputValue2.value,
                              "onUpdate:modelValue": ($event) => panelFilterInputValue2.value = $event,
                              placeholder: "Please input search keywords"
                            }, {
                              prefix: withCtx(() => [
                                createVNode(unref(__default__), {
                                  size: "16",
                                  color: "#BBBDC7"
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ];
                      }
                    }),
                    optionEmptyRender: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="empty-city" data-v-ac8e988f${_scopeId3}>没有找到对应的城市信息</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptions, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label,
                            description: item.description
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                            return createVNode(_component_h_option, {
                              key: item.value,
                              value: item.value,
                              label: item.label,
                              description: item.description
                            }, null, 8, ["value", "label", "description"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, " 多选-下拉列表带筛选功能 "),
                    createVNode(_component_h_select, {
                      modelValue: values2.value,
                      "onUpdate:modelValue": ($event) => values2.value = $event,
                      "panel-filter-option": "",
                      multiple: "",
                      "panel-filter-input-value": panelFilterInputValue2.value,
                      "to-body": false,
                      onDropdownVisibleChange: dropdownVisibleChange
                    }, {
                      panelHeaderRender: withCtx(() => [
                        createVNode("div", { class: "panel-filter-box" }, [
                          createVNode(_component_h_input, {
                            modelValue: panelFilterInputValue2.value,
                            "onUpdate:modelValue": ($event) => panelFilterInputValue2.value = $event,
                            placeholder: "Please input search keywords"
                          }, {
                            prefix: withCtx(() => [
                              createVNode(unref(__default__), {
                                size: "16",
                                color: "#BBBDC7"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      optionEmptyRender: withCtx(() => [
                        createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
                      ]),
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                          return createVNode(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.label,
                            description: item.description
                          }, null, 8, ["value", "label", "description"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "panel-filter-input-value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, [
                    createTextVNode(" 默认过滤规则 "),
                    createVNode(_component_h_tooltip, null, {
                      content: withCtx(() => [
                        createTextVNode(" 默认的规则为 `label.toLowerCase().includes(value)`，label 是传入的 option 上的 label/description 属性值，value 是输入的内容，默认规则是忽略大小写进行字符串匹配的 ")
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_a_icon, { name: "help" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    filterable: true,
                    multiple: true,
                    "to-body": false,
                    "fit-content-input-min-width": 1
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          value: item.value,
                          label: item.label,
                          description: item.description
                        }, null, 8, ["value", "label", "description"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, [
                    createTextVNode(" 自定义过滤器 "),
                    createVNode(_component_h_tooltip, null, {
                      content: withCtx(() => [
                        createTextVNode(" 这个示例展示的是自定义过滤方法，过滤方法中是大小写敏感的字符串匹配 ")
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_a_icon, { name: "help" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "filter-option": filterOption,
                    clearable: true,
                    placeholder: "请选择",
                    "to-body": false,
                    onInput
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          value: item.value,
                          label: item.label,
                          description: item.description
                        }, null, 8, ["value", "label", "description"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " 单选-下拉列表带筛选功能 "),
                  createVNode(_component_h_select, {
                    modelValue: value4.value,
                    "onUpdate:modelValue": ($event) => value4.value = $event,
                    "panel-filter-option": "",
                    "use-build-in-panel-filter": "",
                    "to-body": false
                  }, {
                    empty: withCtx(() => [
                      createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
                    ]),
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          value: item.value,
                          label: item.label,
                          description: item.description
                        }, null, 8, ["value", "label", "description"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, " 多选-下拉列表带筛选功能 "),
                  createVNode(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    "panel-filter-option": "",
                    multiple: "",
                    "panel-filter-input-value": panelFilterInputValue2.value,
                    "to-body": false,
                    onDropdownVisibleChange: dropdownVisibleChange
                  }, {
                    panelHeaderRender: withCtx(() => [
                      createVNode("div", { class: "panel-filter-box" }, [
                        createVNode(_component_h_input, {
                          modelValue: panelFilterInputValue2.value,
                          "onUpdate:modelValue": ($event) => panelFilterInputValue2.value = $event,
                          placeholder: "Please input search keywords"
                        }, {
                          prefix: withCtx(() => [
                            createVNode(unref(__default__), {
                              size: "16",
                              color: "#BBBDC7"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    optionEmptyRender: withCtx(() => [
                      createVNode("div", { class: "empty-city" }, "没有找到对应的城市信息")
                    ]),
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptions, (item) => {
                        return createVNode(_component_h_option, {
                          key: item.value,
                          value: item.value,
                          label: item.label,
                          description: item.description
                        }, null, 8, ["value", "label", "description"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "panel-filter-input-value"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/filter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const filter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ac8e988f"]]);
export {
  filter as default
};
