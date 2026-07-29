import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const val1 = ref("");
    const val2 = ref("");
    const val3 = ref("");
    const select1 = ref();
    const select2 = ref();
    return {
      val1,
      val2,
      val3,
      select1,
      select2
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_input = resolveComponent("h-input");
  const _component_h_select = resolveComponent("h-select");
  const _component_h_option = resolveComponent("h-option");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_input, {
    modelValue: _ctx.val1,
    "onUpdate:modelValue": ($event) => _ctx.val1 = $event
  }, {
    prepend: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`https://`);
      } else {
        return [
          createTextVNode("https://")
        ];
      }
    }),
    append: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`.com`);
      } else {
        return [
          createTextVNode(".com")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<br><br>`);
  _push(ssrRenderComponent(_component_h_input, {
    modelValue: _ctx.val2,
    "onUpdate:modelValue": ($event) => _ctx.val2 = $event,
    style: { "--n-input-bg--prepend-append": "transparent" }
  }, {
    prepend: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_select, {
          modelValue: _ctx.select1,
          "onUpdate:modelValue": ($event) => _ctx.select1 = $event,
          placeholder: "Please Select",
          size: "medium",
          style: { "width": "200px" }
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_option, {
                key: "1",
                label: "选项1",
                value: "1"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_option, {
                key: "2",
                label: "选项2",
                value: "2"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_option, {
                  key: "1",
                  label: "选项1",
                  value: "1"
                }),
                createVNode(_component_h_option, {
                  key: "2",
                  label: "选项2",
                  value: "2"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_select, {
            modelValue: _ctx.select1,
            "onUpdate:modelValue": ($event) => _ctx.select1 = $event,
            placeholder: "Please Select",
            size: "medium",
            style: { "width": "200px" }
          }, {
            default: withCtx(() => [
              createVNode(_component_h_option, {
                key: "1",
                label: "选项1",
                value: "1"
              }),
              createVNode(_component_h_option, {
                key: "2",
                label: "选项2",
                value: "2"
              })
            ]),
            _: 1
          }, 8, ["modelValue", "onUpdate:modelValue"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<br><br>`);
  _push(ssrRenderComponent(_component_h_input, {
    modelValue: _ctx.val3,
    "onUpdate:modelValue": ($event) => _ctx.val3 = $event,
    style: { "--n-input-bg--prepend-append": "transparent" }
  }, {
    append: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_select, {
          modelValue: _ctx.select2,
          "onUpdate:modelValue": ($event) => _ctx.select2 = $event,
          placeholder: "Please Select",
          size: "medium"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_option, {
                key: "1",
                label: "选项1",
                value: "1"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_option, {
                  key: "1",
                  label: "选项1",
                  value: "1"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_select, {
            modelValue: _ctx.select2,
            "onUpdate:modelValue": ($event) => _ctx.select2 = $event,
            placeholder: "Please Select",
            size: "medium"
          }, {
            default: withCtx(() => [
              createVNode(_component_h_option, {
                key: "1",
                label: "选项1",
                value: "1"
              })
            ]),
            _: 1
          }, 8, ["modelValue", "onUpdate:modelValue"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Input/mixed.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mixed = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  mixed as default
};
