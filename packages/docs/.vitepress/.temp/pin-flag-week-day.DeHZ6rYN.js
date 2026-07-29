import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { i as dayjs } from "./app.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    const reserveEvent = ref(1);
    const enableCreatePinFlags = ref(true);
    const showSpacingBetweenFlags = ref(true);
    const createFlagCanThoughDisableDateOrHour = ref(true);
    const weekStart = dayjs().startOf("week");
    const pinFlags = ref([
      {
        startAt: weekStart.day(1).hour(8),
        endAt: weekStart.day(1).hour(9),
        type: "success",
        clickable: true
      },
      {
        title: "会议",
        startAt: weekStart.day(1).hour(9),
        endAt: weekStart.day(1).hour(10).minute(30),
        type: "info"
      },
      {
        startAt: weekStart.day(1).hour(10).minute(30),
        endAt: weekStart.day(1).hour(14),
        type: "warning"
      },
      {
        startAt: weekStart.day(3).hour(9),
        endAt: weekStart.day(4).hour(6),
        type: "success"
      },
      {
        title: "On Leave",
        startAt: weekStart.day(5).hour(8),
        endAt: weekStart.day(5).hour(15),
        type: "error"
      }
    ]);
    function onFlagClick(flag) {
      console.info(flag);
    }
    function onCreatingPinFlagCallback(date) {
      console.info(date.format("YYYY-MM-DD HH:mm"));
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
      reserveEvent,
      enableCreatePinFlags,
      showSpacingBetweenFlags,
      createFlagCanThoughDisableDateOrHour,
      pinFlags,
      onFlagClick,
      onCreatingPinFlagCallback,
      onCreatFinishFlagCallback,
      disableHours(date) {
        if ([0, 6].includes(Number(date.format("d")))) {
          return [[date, date.endOf("d")]];
        } else if (date.isSame(dayjs().startOf("d"))) {
          return [[date, date.add(8, "h")], [date.add(10, "h"), date.add(12, "h").add(20, "m")], [date.add(20, "h"), date.endOf("d")]];
        } else {
          return [[date, date.add(8, "h")], [date.add(20, "h"), date.endOf("d")]];
        }
      }
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_radio_group = resolveComponent("h-radio-group");
  const _component_h_radio = resolveComponent("h-radio");
  const _component_h_calendar = resolveComponent("h-calendar");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "wrapper" }, _attrs))} data-v-4e9b32bc>`);
  _push(ssrRenderComponent(_component_h_form, {
    "label-position": "left",
    "label-vertical-align": "middle",
    "label-width": "200px"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_form_item, { label: "Enable Create Pin Flags" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.enableCreatePinFlags,
                "onUpdate:modelValue": ($event) => _ctx.enableCreatePinFlags = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_radio, { label: true }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`True`);
                        } else {
                          return [
                            createTextVNode("True")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_radio, { label: false }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`False`);
                        } else {
                          return [
                            createTextVNode("False")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_radio, { label: true }, {
                        default: withCtx(() => [
                          createTextVNode("True")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: false }, {
                        default: withCtx(() => [
                          createTextVNode("False")
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
                  modelValue: _ctx.enableCreatePinFlags,
                  "onUpdate:modelValue": ($event) => _ctx.enableCreatePinFlags = $event
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_radio, { label: true }, {
                      default: withCtx(() => [
                        createTextVNode("True")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: false }, {
                      default: withCtx(() => [
                        createTextVNode("False")
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
        _push2(ssrRenderComponent(_component_h_form_item, { label: "Show Spacing Between Flags" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_radio_group, {
                modelValue: _ctx.showSpacingBetweenFlags,
                "onUpdate:modelValue": ($event) => _ctx.showSpacingBetweenFlags = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_radio, { label: true }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`True`);
                        } else {
                          return [
                            createTextVNode("True")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_h_radio, { label: false }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`False`);
                        } else {
                          return [
                            createTextVNode("False")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_radio, { label: true }, {
                        default: withCtx(() => [
                          createTextVNode("True")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_radio, { label: false }, {
                        default: withCtx(() => [
                          createTextVNode("False")
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
                  modelValue: _ctx.showSpacingBetweenFlags,
                  "onUpdate:modelValue": ($event) => _ctx.showSpacingBetweenFlags = $event
                }, {
                  default: withCtx(() => [
                    createVNode(_component_h_radio, { label: true }, {
                      default: withCtx(() => [
                        createTextVNode("True")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_radio, { label: false }, {
                      default: withCtx(() => [
                        createTextVNode("False")
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
          createVNode(_component_h_form_item, { label: "Enable Create Pin Flags" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.enableCreatePinFlags,
                "onUpdate:modelValue": ($event) => _ctx.enableCreatePinFlags = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio, { label: true }, {
                    default: withCtx(() => [
                      createTextVNode("True")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: false }, {
                    default: withCtx(() => [
                      createTextVNode("False")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
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
          createVNode(_component_h_form_item, { label: "Show Spacing Between Flags" }, {
            default: withCtx(() => [
              createVNode(_component_h_radio_group, {
                modelValue: _ctx.showSpacingBetweenFlags,
                "onUpdate:modelValue": ($event) => _ctx.showSpacingBetweenFlags = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_radio, { label: true }, {
                    default: withCtx(() => [
                      createTextVNode("True")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_radio, { label: false }, {
                    default: withCtx(() => [
                      createTextVNode("False")
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
    pickable: true,
    mode: "week",
    "mode-switchable": true,
    "mode-switchable-list": ["week", "day"],
    "enable-create-pin-flags": _ctx.enableCreatePinFlags,
    "pin-flags-show-time": true,
    "creating-pin-flag-callback": _ctx.onCreatingPinFlagCallback,
    "creat-finish-flag-callback": _ctx.onCreatFinishFlagCallback,
    "create-flag-can-though-disable-date-or-hour": _ctx.createFlagCanThoughDisableDateOrHour,
    "show-spacing-between-flags": _ctx.showSpacingBetweenFlags,
    "disable-hours": _ctx.disableHours,
    onPinFlagClick: _ctx.onFlagClick
  }, {
    dayHeader: withCtx((dayStr, dayObj, isToday, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(dayStr)} ${ssrInterpolate(dayObj.format("dddd"))} ${ssrInterpolate(isToday ? "Today" : "")}`);
      } else {
        return [
          createTextVNode(toDisplayString(dayStr) + " " + toDisplayString(dayObj.format("dddd")) + " " + toDisplayString(isToday ? "Today" : ""), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Calendar/pin-flag-week-day.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pinFlagWeekDay = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4e9b32bc"]]);
export {
  pinFlagWeekDay as default
};
