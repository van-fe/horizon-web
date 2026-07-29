import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "group",
  __ssrInlineRender: true,
  setup(__props) {
    const value1 = ref();
    const value2 = ref();
    const value3 = ref();
    const values1 = ref([]);
    const values2 = ref([]);
    const values3 = ref([]);
    const selectOptionGroupsHasLabel = [
      {
        label: "第一批",
        children: [
          { value: 1, label: "上海" },
          { value: 2, label: "北京" },
          { value: 3, label: "合肥" },
          { value: 4, label: "深圳" },
          { value: 5, label: "杭州" }
        ]
      },
      {
        label: "第二批",
        children: [
          { value: 6, label: "天津" },
          { value: 7, label: "西安" },
          { value: 8, label: "南京" },
          { value: 9, label: "哈尔滨" },
          { value: 10, label: "香港" }
        ]
      }
    ];
    const selectOptionGroupsNoLabel = [
      {
        children: [
          { value: 1, label: "上海" },
          { value: 2, label: "北京" },
          { value: 3, label: "合肥" },
          { value: 4, label: "深圳" },
          { value: 5, label: "杭州" }
        ]
      },
      {
        children: [
          { value: 6, label: "天津" },
          { value: 7, label: "西安" },
          { value: 8, label: "南京" },
          { value: 9, label: "哈尔滨" },
          { value: 10, label: "香港" }
        ]
      }
    ];
    const selectOptionGroupsMixins = [
      {
        label: "第一批",
        children: [
          { value: 1, label: "上海" },
          { value: 2, label: "北京" },
          { value: 3, label: "合肥" },
          { value: 4, label: "深圳" },
          { value: 5, label: "杭州" }
        ]
      },
      { value: 6, label: "天津" },
      { value: 7, label: "西安" },
      { value: 8, label: "南京" },
      { value: 9, label: "哈尔滨" },
      { value: 10, label: "香港" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option_group = resolveComponent("h-option-group");
      const _component_h_option = resolveComponent("h-option");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选: 不具名分组</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    clearable: "",
                    "to-body": false,
                    filterable: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptionGroupsMixins, (group, index) => {
                          _push4(`<!--[-->`);
                          if (group.children) {
                            _push4(ssrRenderComponent(_component_h_option_group, {
                              key: index,
                              disabled: group.disabled
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(group.children, (item) => {
                                    _push5(ssrRenderComponent(_component_h_option, {
                                      key: item.value,
                                      label: item.label,
                                      value: item.value,
                                      disabled: item.disabled
                                    }, null, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                      return openBlock(), createBlock(_component_h_option, {
                                        key: item.value,
                                        label: item.label,
                                        value: item.value,
                                        disabled: item.disabled
                                      }, null, 8, ["label", "value", "disabled"]);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(_component_h_option, {
                              key: `option_${index}`,
                              label: group.label,
                              value: group.value,
                              disabled: group.disabled
                            }, null, _parent4, _scopeId3));
                          }
                          _push4(`<!--]-->`);
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsMixins, (group, index) => {
                            return openBlock(), createBlock(Fragment, null, [
                              group.children ? (openBlock(), createBlock(_component_h_option_group, {
                                key: index,
                                disabled: group.disabled
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                    return openBlock(), createBlock(_component_h_option, {
                                      key: item.value,
                                      label: item.label,
                                      value: item.value,
                                      disabled: item.disabled
                                    }, null, 8, ["label", "value", "disabled"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["disabled"])) : (openBlock(), createBlock(_component_h_option, {
                                key: `option_${index}`,
                                label: group.label,
                                value: group.value,
                                disabled: group.disabled
                              }, null, 8, ["label", "value", "disabled"]))
                            ], 64);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选: 不具名分组"),
                    createVNode(_component_h_select, {
                      modelValue: value1.value,
                      "onUpdate:modelValue": ($event) => value1.value = $event,
                      clearable: "",
                      "to-body": false,
                      filterable: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsMixins, (group, index) => {
                          return openBlock(), createBlock(Fragment, null, [
                            group.children ? (openBlock(), createBlock(_component_h_option_group, {
                              key: index,
                              disabled: group.disabled
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                  return openBlock(), createBlock(_component_h_option, {
                                    key: item.value,
                                    label: item.label,
                                    value: item.value,
                                    disabled: item.disabled
                                  }, null, 8, ["label", "value", "disabled"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["disabled"])) : (openBlock(), createBlock(_component_h_option, {
                              key: `option_${index}`,
                              label: group.label,
                              value: group.value,
                              disabled: group.disabled
                            }, null, 8, ["label", "value", "disabled"]))
                          ], 64);
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
                  _push3(`<div class="demo-title"${_scopeId2}>单选: 不具名分组</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    clearable: "",
                    "to-body": false,
                    filterable: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptionGroupsNoLabel, (group, index) => {
                          _push4(ssrRenderComponent(_component_h_option_group, {
                            key: index,
                            label: group.label,
                            disabled: group.disabled
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(group.children, (item) => {
                                  _push5(ssrRenderComponent(_component_h_option, {
                                    key: item.value,
                                    label: item.label,
                                    value: item.value,
                                    disabled: item.disabled
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                    return openBlock(), createBlock(_component_h_option, {
                                      key: item.value,
                                      label: item.label,
                                      value: item.value,
                                      disabled: item.disabled
                                    }, null, 8, ["label", "value", "disabled"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsNoLabel, (group, index) => {
                            return createVNode(_component_h_option_group, {
                              key: index,
                              label: group.label,
                              disabled: group.disabled
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                  return openBlock(), createBlock(_component_h_option, {
                                    key: item.value,
                                    label: item.label,
                                    value: item.value,
                                    disabled: item.disabled
                                  }, null, 8, ["label", "value", "disabled"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["label", "disabled"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选: 不具名分组"),
                    createVNode(_component_h_select, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      clearable: "",
                      "to-body": false,
                      filterable: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsNoLabel, (group, index) => {
                          return createVNode(_component_h_option_group, {
                            key: index,
                            label: group.label,
                            disabled: group.disabled
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                return openBlock(), createBlock(_component_h_option, {
                                  key: item.value,
                                  label: item.label,
                                  value: item.value,
                                  disabled: item.disabled
                                }, null, 8, ["label", "value", "disabled"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["label", "disabled"]);
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
                  _push3(`<div class="demo-title"${_scopeId2}>单选: 具名分组</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value3.value,
                    "onUpdate:modelValue": ($event) => value3.value = $event,
                    clearable: "",
                    "to-body": false,
                    filterable: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptionGroupsHasLabel, (group, index) => {
                          _push4(ssrRenderComponent(_component_h_option_group, {
                            key: index,
                            label: group.label,
                            disabled: group.disabled
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(group.children, (item) => {
                                  _push5(ssrRenderComponent(_component_h_option, {
                                    key: item.value,
                                    label: item.label,
                                    value: item.value,
                                    disabled: item.disabled
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                    return openBlock(), createBlock(_component_h_option, {
                                      key: item.value,
                                      label: item.label,
                                      value: item.value,
                                      disabled: item.disabled
                                    }, null, 8, ["label", "value", "disabled"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsHasLabel, (group, index) => {
                            return createVNode(_component_h_option_group, {
                              key: index,
                              label: group.label,
                              disabled: group.disabled
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                  return openBlock(), createBlock(_component_h_option, {
                                    key: item.value,
                                    label: item.label,
                                    value: item.value,
                                    disabled: item.disabled
                                  }, null, 8, ["label", "value", "disabled"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["label", "disabled"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选: 具名分组"),
                    createVNode(_component_h_select, {
                      modelValue: value3.value,
                      "onUpdate:modelValue": ($event) => value3.value = $event,
                      clearable: "",
                      "to-body": false,
                      filterable: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsHasLabel, (group, index) => {
                          return createVNode(_component_h_option_group, {
                            key: index,
                            label: group.label,
                            disabled: group.disabled
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                return openBlock(), createBlock(_component_h_option, {
                                  key: item.value,
                                  label: item.label,
                                  value: item.value,
                                  disabled: item.disabled
                                }, null, 8, ["label", "value", "disabled"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["label", "disabled"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选: 不具名分组"),
                  createVNode(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    clearable: "",
                    "to-body": false,
                    filterable: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsMixins, (group, index) => {
                        return openBlock(), createBlock(Fragment, null, [
                          group.children ? (openBlock(), createBlock(_component_h_option_group, {
                            key: index,
                            disabled: group.disabled
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                return openBlock(), createBlock(_component_h_option, {
                                  key: item.value,
                                  label: item.label,
                                  value: item.value,
                                  disabled: item.disabled
                                }, null, 8, ["label", "value", "disabled"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["disabled"])) : (openBlock(), createBlock(_component_h_option, {
                            key: `option_${index}`,
                            label: group.label,
                            value: group.value,
                            disabled: group.disabled
                          }, null, 8, ["label", "value", "disabled"]))
                        ], 64);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选: 不具名分组"),
                  createVNode(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    clearable: "",
                    "to-body": false,
                    filterable: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsNoLabel, (group, index) => {
                        return createVNode(_component_h_option_group, {
                          key: index,
                          label: group.label,
                          disabled: group.disabled
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                              return openBlock(), createBlock(_component_h_option, {
                                key: item.value,
                                label: item.label,
                                value: item.value,
                                disabled: item.disabled
                              }, null, 8, ["label", "value", "disabled"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1032, ["label", "disabled"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选: 具名分组"),
                  createVNode(_component_h_select, {
                    modelValue: value3.value,
                    "onUpdate:modelValue": ($event) => value3.value = $event,
                    clearable: "",
                    "to-body": false,
                    filterable: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsHasLabel, (group, index) => {
                        return createVNode(_component_h_option_group, {
                          key: index,
                          label: group.label,
                          disabled: group.disabled
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                              return openBlock(), createBlock(_component_h_option, {
                                key: item.value,
                                label: item.label,
                                value: item.value,
                                disabled: item.disabled
                              }, null, 8, ["label", "value", "disabled"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1032, ["label", "disabled"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选: 不具名分组</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    clearable: "",
                    multiple: "",
                    "to-body": false,
                    filterable: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptionGroupsMixins, (group, index) => {
                          _push4(`<!--[-->`);
                          if (group.children) {
                            _push4(ssrRenderComponent(_component_h_option_group, {
                              key: index,
                              disabled: group.disabled
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(group.children, (item) => {
                                    _push5(ssrRenderComponent(_component_h_option, {
                                      key: item.value,
                                      label: item.label,
                                      value: item.value,
                                      disabled: item.disabled
                                    }, null, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                      return openBlock(), createBlock(_component_h_option, {
                                        key: item.value,
                                        label: item.label,
                                        value: item.value,
                                        disabled: item.disabled
                                      }, null, 8, ["label", "value", "disabled"]);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(_component_h_option, {
                              key: `option_${index}`,
                              label: group.label,
                              value: group.value,
                              disabled: group.disabled
                            }, null, _parent4, _scopeId3));
                          }
                          _push4(`<!--]-->`);
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsMixins, (group, index) => {
                            return openBlock(), createBlock(Fragment, null, [
                              group.children ? (openBlock(), createBlock(_component_h_option_group, {
                                key: index,
                                disabled: group.disabled
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                    return openBlock(), createBlock(_component_h_option, {
                                      key: item.value,
                                      label: item.label,
                                      value: item.value,
                                      disabled: item.disabled
                                    }, null, 8, ["label", "value", "disabled"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["disabled"])) : (openBlock(), createBlock(_component_h_option, {
                                key: `option_${index}`,
                                label: group.label,
                                value: group.value,
                                disabled: group.disabled
                              }, null, 8, ["label", "value", "disabled"]))
                            ], 64);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选: 不具名分组"),
                    createVNode(_component_h_select, {
                      modelValue: values1.value,
                      "onUpdate:modelValue": ($event) => values1.value = $event,
                      clearable: "",
                      multiple: "",
                      "to-body": false,
                      filterable: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsMixins, (group, index) => {
                          return openBlock(), createBlock(Fragment, null, [
                            group.children ? (openBlock(), createBlock(_component_h_option_group, {
                              key: index,
                              disabled: group.disabled
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                  return openBlock(), createBlock(_component_h_option, {
                                    key: item.value,
                                    label: item.label,
                                    value: item.value,
                                    disabled: item.disabled
                                  }, null, 8, ["label", "value", "disabled"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["disabled"])) : (openBlock(), createBlock(_component_h_option, {
                              key: `option_${index}`,
                              label: group.label,
                              value: group.value,
                              disabled: group.disabled
                            }, null, 8, ["label", "value", "disabled"]))
                          ], 64);
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
                  _push3(`<div class="demo-title"${_scopeId2}>多选: 不具名分组</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    clearable: "",
                    multiple: "",
                    "to-body": false,
                    filterable: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptionGroupsNoLabel, (group, index) => {
                          _push4(ssrRenderComponent(_component_h_option_group, {
                            key: index,
                            label: group.label,
                            disabled: group.disabled
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(group.children, (item) => {
                                  _push5(ssrRenderComponent(_component_h_option, {
                                    key: item.value,
                                    label: item.label,
                                    value: item.value,
                                    disabled: item.disabled
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                    return openBlock(), createBlock(_component_h_option, {
                                      key: item.value,
                                      label: item.label,
                                      value: item.value,
                                      disabled: item.disabled
                                    }, null, 8, ["label", "value", "disabled"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsNoLabel, (group, index) => {
                            return createVNode(_component_h_option_group, {
                              key: index,
                              label: group.label,
                              disabled: group.disabled
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                  return openBlock(), createBlock(_component_h_option, {
                                    key: item.value,
                                    label: item.label,
                                    value: item.value,
                                    disabled: item.disabled
                                  }, null, 8, ["label", "value", "disabled"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["label", "disabled"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选: 不具名分组"),
                    createVNode(_component_h_select, {
                      modelValue: values2.value,
                      "onUpdate:modelValue": ($event) => values2.value = $event,
                      clearable: "",
                      multiple: "",
                      "to-body": false,
                      filterable: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsNoLabel, (group, index) => {
                          return createVNode(_component_h_option_group, {
                            key: index,
                            label: group.label,
                            disabled: group.disabled
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                return openBlock(), createBlock(_component_h_option, {
                                  key: item.value,
                                  label: item.label,
                                  value: item.value,
                                  disabled: item.disabled
                                }, null, 8, ["label", "value", "disabled"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["label", "disabled"]);
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
                  _push3(`<div class="demo-title"${_scopeId2}>多选: 具名分组</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values3.value,
                    "onUpdate:modelValue": ($event) => values3.value = $event,
                    clearable: "",
                    multiple: "",
                    "to-body": false,
                    filterable: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(selectOptionGroupsHasLabel, (group, index) => {
                          _push4(ssrRenderComponent(_component_h_option_group, {
                            key: index,
                            label: group.label,
                            disabled: group.disabled
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(group.children, (item) => {
                                  _push5(ssrRenderComponent(_component_h_option, {
                                    key: item.value,
                                    label: item.label,
                                    value: item.value,
                                    disabled: item.disabled
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                    return openBlock(), createBlock(_component_h_option, {
                                      key: item.value,
                                      label: item.label,
                                      value: item.value,
                                      disabled: item.disabled
                                    }, null, 8, ["label", "value", "disabled"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsHasLabel, (group, index) => {
                            return createVNode(_component_h_option_group, {
                              key: index,
                              label: group.label,
                              disabled: group.disabled
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                  return openBlock(), createBlock(_component_h_option, {
                                    key: item.value,
                                    label: item.label,
                                    value: item.value,
                                    disabled: item.disabled
                                  }, null, 8, ["label", "value", "disabled"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["label", "disabled"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选: 具名分组"),
                    createVNode(_component_h_select, {
                      modelValue: values3.value,
                      "onUpdate:modelValue": ($event) => values3.value = $event,
                      clearable: "",
                      multiple: "",
                      "to-body": false,
                      filterable: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsHasLabel, (group, index) => {
                          return createVNode(_component_h_option_group, {
                            key: index,
                            label: group.label,
                            disabled: group.disabled
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                return openBlock(), createBlock(_component_h_option, {
                                  key: item.value,
                                  label: item.label,
                                  value: item.value,
                                  disabled: item.disabled
                                }, null, 8, ["label", "value", "disabled"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["label", "disabled"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选: 不具名分组"),
                  createVNode(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    clearable: "",
                    multiple: "",
                    "to-body": false,
                    filterable: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsMixins, (group, index) => {
                        return openBlock(), createBlock(Fragment, null, [
                          group.children ? (openBlock(), createBlock(_component_h_option_group, {
                            key: index,
                            disabled: group.disabled
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                                return openBlock(), createBlock(_component_h_option, {
                                  key: item.value,
                                  label: item.label,
                                  value: item.value,
                                  disabled: item.disabled
                                }, null, 8, ["label", "value", "disabled"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["disabled"])) : (openBlock(), createBlock(_component_h_option, {
                            key: `option_${index}`,
                            label: group.label,
                            value: group.value,
                            disabled: group.disabled
                          }, null, 8, ["label", "value", "disabled"]))
                        ], 64);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选: 不具名分组"),
                  createVNode(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    clearable: "",
                    multiple: "",
                    "to-body": false,
                    filterable: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsNoLabel, (group, index) => {
                        return createVNode(_component_h_option_group, {
                          key: index,
                          label: group.label,
                          disabled: group.disabled
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                              return openBlock(), createBlock(_component_h_option, {
                                key: item.value,
                                label: item.label,
                                value: item.value,
                                disabled: item.disabled
                              }, null, 8, ["label", "value", "disabled"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1032, ["label", "disabled"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选: 具名分组"),
                  createVNode(_component_h_select, {
                    modelValue: values3.value,
                    "onUpdate:modelValue": ($event) => values3.value = $event,
                    clearable: "",
                    multiple: "",
                    "to-body": false,
                    filterable: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(selectOptionGroupsHasLabel, (group, index) => {
                        return createVNode(_component_h_option_group, {
                          key: index,
                          label: group.label,
                          disabled: group.disabled
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(group.children, (item) => {
                              return openBlock(), createBlock(_component_h_option, {
                                key: item.value,
                                label: item.label,
                                value: item.value,
                                disabled: item.disabled
                              }, null, 8, ["label", "value", "disabled"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1032, ["label", "disabled"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/group.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
