import { defineComponent, ref, h, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const reserveEvent = ref(1);
    const dateType = ref("full");
    const showTime = ref(true);
    const createFlagCanThoughDisableDateOrHour = ref(true);
    const pinFlags = ref([
      {
        title: "Demo车展",
        startAt: "2022-10-14",
        endAt: "2022-10-20 23:59:59",
        tooltip: "Demo车展，千万不要错过",
        clickable: true
      },
      {
        title: "车主面对面",
        startAt: "2022-10-17",
        endAt: "2022-10-19 23:59:59",
        tooltip: "车主面对面，直面心灵的碰撞",
        type: "warning"
      },
      {
        title: "国庆节",
        startAt: "2022-10-1",
        endAt: "2022-10-8",
        type: "success"
      },
      {
        title: "WAD团建",
        startAt: "2022-10-21",
        type: "success"
      },
      {
        title: "自驾游",
        startAt: "2022-10-22",
        endAt: "2022-10-24",
        type: "warning"
      },
      {
        title: "桌游聚会",
        startAt: "2022-10-22 12:00",
        type: "default"
      },
      {
        title: h("span", "请假"),
        startAt: "2022-10-12 00:00",
        endAt: "2022-10-12 12:00",
        type: "error",
        tooltip: true
      },
      {
        title: "室内游",
        startAt: "2022-10-22 10:00",
        endAt: "2022-10-23 18:00",
        type: "success",
        color: "dodgerblue",
        background: "skyblue"
      }
    ]);
    function onFlagClick(flag) {
      console.info(flag);
    }
    function onCreatingPinFlagCallback(date) {
      console.info(date.format("YYYY-MM-DD"));
      return {
        title: "New Event",
        type: "pill"
      };
    }
    function onCreatFinishFlagCallback(flag) {
      return new Promise((resolve) => {
        console.info(flag);
        switch (reserveEvent.value) {
          case 1:
            resolve(false);
            break;
          case 2:
            resolve(true);
            break;
          case 3:
            flag.title = "Created Flag";
            resolve(flag);
            break;
        }
      });
    }
    return {
      dateType,
      reserveEvent,
      pinFlags,
      showTime,
      createFlagCanThoughDisableDateOrHour,
      disableDate(date) {
        return [0, 6].includes(date.day());
      },
      onFlagClick,
      onCreatingPinFlagCallback,
      onCreatFinishFlagCallback
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_radio_group = resolveComponent("h-radio-group");
  const _component_h_radio = resolveComponent("h-radio");
  const _component_h_calendar = resolveComponent("h-calendar");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "wrapper" }, _attrs))} data-v-a8d6605e>`);
  _push(ssrRenderComponent(_component_h_form, {
    "label-position": "left",
    "label-vertical-align": "middle",
    "label-width": "150px"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_form_item, { label: "Reserve Event" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.reserveEvent,
                "onUpdate:modelValue": ($event) => _ctx.reserveEvent = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_radio, { label: 1 }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Don&#39;t reserve`);
                        } else {
                          return [
                            createTextVNode("Don't reserve")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_radio, { label: 2 }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Reserve original`);
                        } else {
                          return [
                            createTextVNode("Reserve original")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_radio, { label: 3 }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Reserve and modify`);
                        } else {
                          return [
                            createTextVNode("Reserve and modify")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_radio, { label: 1 }, {
                        default: withCtx(() => [
                          createTextVNode("Don't reserve")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: 2 }, {
                        default: withCtx(() => [
                          createTextVNode("Reserve original")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: 3 }, {
                        default: withCtx(() => [
                          createTextVNode("Reserve and modify")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_radio_group, {
                  modelValue: _ctx.reserveEvent,
                  "onUpdate:modelValue": ($event) => _ctx.reserveEvent = $event
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_radio, { label: 1 }, {
                      default: withCtx(() => [
                        createTextVNode("Don't reserve")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: 2 }, {
                      default: withCtx(() => [
                        createTextVNode("Reserve original")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: 3 }, {
                      default: withCtx(() => [
                        createTextVNode("Reserve and modify")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, { label: "Date Type" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.dateType,
                "onUpdate:modelValue": ($event) => _ctx.dateType = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_radio, { label: "full" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Full`);
                        } else {
                          return [
                            createTextVNode("Full")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_radio, { label: "only-current" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Only Current`);
                        } else {
                          return [
                            createTextVNode("Only Current")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_radio, { label: "full" }, {
                        default: withCtx(() => [
                          createTextVNode("Full")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: "only-current" }, {
                        default: withCtx(() => [
                          createTextVNode("Only Current")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_radio_group, {
                  modelValue: _ctx.dateType,
                  "onUpdate:modelValue": ($event) => _ctx.dateType = $event
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_radio, { label: "full" }, {
                      default: withCtx(() => [
                        createTextVNode("Full")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: "only-current" }, {
                      default: withCtx(() => [
                        createTextVNode("Only Current")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, { label: "Pin Flags Show Time" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.showTime,
                "onUpdate:modelValue": ($event) => _ctx.showTime = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_radio, { label: true }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Yes`);
                        } else {
                          return [
                            createTextVNode("Yes")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_radio, { label: false }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`No`);
                        } else {
                          return [
                            createTextVNode("No")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_radio, { label: true }, {
                        default: withCtx(() => [
                          createTextVNode("Yes")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: false }, {
                        default: withCtx(() => [
                          createTextVNode("No")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_radio_group, {
                  modelValue: _ctx.showTime,
                  "onUpdate:modelValue": ($event) => _ctx.showTime = $event
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_radio, { label: true }, {
                      default: withCtx(() => [
                        createTextVNode("Yes")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: false }, {
                      default: withCtx(() => [
                        createTextVNode("No")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_form_item, { label: "Create Flag Can Though Disable Date Or Hour" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.createFlagCanThoughDisableDateOrHour,
                "onUpdate:modelValue": ($event) => _ctx.createFlagCanThoughDisableDateOrHour = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_radio, { label: true }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Yes`);
                        } else {
                          return [
                            createTextVNode("Yes")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_radio, { label: false }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`No`);
                        } else {
                          return [
                            createTextVNode("No")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_radio, { label: true }, {
                        default: withCtx(() => [
                          createTextVNode("Yes")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: false }, {
                        default: withCtx(() => [
                          createTextVNode("No")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_radio_group, {
                  modelValue: _ctx.createFlagCanThoughDisableDateOrHour,
                  "onUpdate:modelValue": ($event) => _ctx.createFlagCanThoughDisableDateOrHour = $event
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_radio, { label: true }, {
                      default: withCtx(() => [
                        createTextVNode("Yes")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: false }, {
                      default: withCtx(() => [
                        createTextVNode("No")
                      ]),
                      _: 1
                    })
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
          createVNode(_component_h_form_item, { label: "Reserve Event" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.reserveEvent,
                "onUpdate:modelValue": ($event) => _ctx.reserveEvent = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio, { label: 1 }, {
                    default: withCtx(() => [
                      createTextVNode("Don't reserve")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: 2 }, {
                    default: withCtx(() => [
                      createTextVNode("Reserve original")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: 3 }, {
                    default: withCtx(() => [
                      createTextVNode("Reserve and modify")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, { label: "Date Type" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.dateType,
                "onUpdate:modelValue": ($event) => _ctx.dateType = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio, { label: "full" }, {
                    default: withCtx(() => [
                      createTextVNode("Full")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: "only-current" }, {
                    default: withCtx(() => [
                      createTextVNode("Only Current")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, { label: "Pin Flags Show Time" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.showTime,
                "onUpdate:modelValue": ($event) => _ctx.showTime = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio, { label: true }, {
                    default: withCtx(() => [
                      createTextVNode("Yes")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: false }, {
                    default: withCtx(() => [
                      createTextVNode("No")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_h_form_item, { label: "Create Flag Can Though Disable Date Or Hour" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.createFlagCanThoughDisableDateOrHour,
                "onUpdate:modelValue": ($event) => _ctx.createFlagCanThoughDisableDateOrHour = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio, { label: true }, {
                    default: withCtx(() => [
                      createTextVNode("Yes")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: false }, {
                    default: withCtx(() => [
                      createTextVNode("No")
                    ]),
                    _: 1
                  })
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
  _push(ssrRenderComponent(_component_h_calendar, {
    "pin-flags": _ctx.pinFlags,
    "onUpdate:pinFlags": ($event) => _ctx.pinFlags = $event,
    "model-value": "2022-10-10",
    "date-type": _ctx.dateType,
    pickable: true,
    mode: "month",
    "pin-flags-show-time": _ctx.showTime,
    "mode-switchable": true,
    "mode-switchable-list": ["year", "month"],
    "enable-create-pin-flags": true,
    "disable-date": _ctx.disableDate,
    "create-flag-can-though-disable-date-or-hour": _ctx.createFlagCanThoughDisableDateOrHour,
    "creating-pin-flag-callback": _ctx.onCreatingPinFlagCallback,
    "creat-finish-flag-callback": _ctx.onCreatFinishFlagCallback,
    onPinFlagClick: _ctx.onFlagClick
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Calendar/pin-flag.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pinFlag = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a8d6605e"]]);
export {
  pinFlag as default
};
