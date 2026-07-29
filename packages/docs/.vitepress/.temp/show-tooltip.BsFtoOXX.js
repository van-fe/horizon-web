import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "show-tooltip",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref();
    function showDateTooltip(date) {
      return {
        show: true,
        content: date.format("YYYY-MM-DD")
      };
    }
    function showMonthTooltip(month) {
      return {
        show: true,
        content: `${month.daysInMonth()} Days`
      };
    }
    function showYearTooltip(year) {
      const isLoopYear = year.year() % 4 === 0 && year.year() % 100 !== 0 || year.year() % 400 === 0;
      return {
        show: isLoopYear,
        content: isLoopYear ? "Loop Year" : void 0
      };
    }
    function showTimeTooltip(time) {
      if (time.hour() < 9 || time.hour() > 20) {
        return {
          show: false
        };
      }
      return {
        show: true,
        content: "Working hours"
      };
    }
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
                    type: "datetime",
                    "show-date-tooltip": showDateTooltip,
                    "show-month-tooltip": showMonthTooltip,
                    "show-year-tooltip": showYearTooltip,
                    "show-time-tooltip": showTimeTooltip
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_date_picker, {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      type: "datetime",
                      "show-date-tooltip": showDateTooltip,
                      "show-month-tooltip": showMonthTooltip,
                      "show-year-tooltip": showYearTooltip,
                      "show-time-tooltip": showTimeTooltip
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    type: "datetime",
                    "show-date-tooltip": showDateTooltip,
                    "show-month-tooltip": showMonthTooltip,
                    "show-year-tooltip": showYearTooltip,
                    "show-time-tooltip": showTimeTooltip
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/DatePicker/show-tooltip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
