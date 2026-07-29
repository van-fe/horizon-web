import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default-slot",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    const holiday2025 = [
      "2025/01/01",
      "2025/01/28",
      "2025/01/29",
      "2025/01/30",
      "2025/01/31",
      "2025/02/01",
      "2025/02/02",
      "2025/02/03",
      "2025/02/04",
      "2025/04/04",
      "2025/04/05",
      "2025/04/06",
      "2025/05/01",
      "2025/05/02",
      "2025/05/03",
      "2025/05/04",
      "2025/05/05",
      "2025/05/31",
      "2025/06/01",
      "2025/06/02",
      "2025/10/01",
      "2025/10/02",
      "2025/10/03",
      "2025/10/04",
      "2025/10/05",
      "2025/10/06",
      "2025/10/07",
      "2025/10/08"
    ];
    const workday2025 = [
      "2025/01/26",
      "2025/02/08",
      "2025/04/27",
      "2025/09/28",
      "2025/10/11"
    ];
    const isInHoliday = (date) => holiday2025.includes(date.format("YYYY/MM/DD"));
    const isInWorkday = (date) => workday2025.includes(date.format("YYYY/MM/DD"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_date_picker = resolveComponent("h-date-picker");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_date_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    type: "date",
                    "to-body": false
                  }, {
                    default: withCtx(({ grid }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="${ssrRenderClass({ "custom-grid": true, "is-selected": grid.isSelected, "is-holiday": [0, 6].includes(grid.date.day()) && !isInWorkday(grid.date) || isInHoliday(grid.date) })}"${_scopeId3}>${ssrInterpolate(grid.text)} `);
                        if (isInHoliday(grid.date)) {
                          _push4(`<div class="badge holiday"${_scopeId3}>休</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (isInWorkday(grid.date)) {
                          _push4(`<div class="badge workday"${_scopeId3}>班</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: { "custom-grid": true, "is-selected": grid.isSelected, "is-holiday": [0, 6].includes(grid.date.day()) && !isInWorkday(grid.date) || isInHoliday(grid.date) }
                          }, [
                            createTextVNode(toDisplayString(grid.text) + " ", 1),
                            isInHoliday(grid.date) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "badge holiday"
                            }, "休")) : createCommentVNode("", true),
                            isInWorkday(grid.date) ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "badge workday"
                            }, "班")) : createCommentVNode("", true)
                          ], 2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      type: "date",
                      "to-body": false
                    }, {
                      default: withCtx(({ grid }) => [
                        createVNode("div", {
                          class: { "custom-grid": true, "is-selected": grid.isSelected, "is-holiday": [0, 6].includes(grid.date.day()) && !isInWorkday(grid.date) || isInHoliday(grid.date) }
                        }, [
                          createTextVNode(toDisplayString(grid.text) + " ", 1),
                          isInHoliday(grid.date) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "badge holiday"
                          }, "休")) : createCommentVNode("", true),
                          isInWorkday(grid.date) ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "badge workday"
                          }, "班")) : createCommentVNode("", true)
                        ], 2)
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
                  createVNode(_component_h_date_picker, {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    type: "date",
                    "to-body": false
                  }, {
                    default: withCtx(({ grid }) => [
                      createVNode("div", {
                        class: { "custom-grid": true, "is-selected": grid.isSelected, "is-holiday": [0, 6].includes(grid.date.day()) && !isInWorkday(grid.date) || isInHoliday(grid.date) }
                      }, [
                        createTextVNode(toDisplayString(grid.text) + " ", 1),
                        isInHoliday(grid.date) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "badge holiday"
                        }, "休")) : createCommentVNode("", true),
                        isInWorkday(grid.date) ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "badge workday"
                        }, "班")) : createCommentVNode("", true)
                      ], 2)
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/DatePicker/default-slot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
