import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const statusList = ["wait", "process", "finish", "warning", "error"];
    const status = ref("wait");
    return {
      status,
      statusList
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_form = resolveComponent("h-form");
  const _component_h_form_item = resolveComponent("h-form-item");
  const _component_h_select = resolveComponent("h-select");
  const _component_h_option = resolveComponent("h-option");
  const _component_h_steps = resolveComponent("h-steps");
  const _component_h_step = resolveComponent("h-step");
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-4">`);
  _push(ssrRenderComponent(_component_h_form, {
    "label-position": "left",
    "label-vertical-align": "middle"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_form_item, { label: "切换状态" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_select, {
                modelValue: _ctx.status,
                "onUpdate:modelValue": ($event) => _ctx.status = $event,
                style: { "width": "fit-content" }
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(_ctx.statusList, (item) => {
                      _push4(ssrRenderComponent(_component_h_option, {
                        key: item,
                        value: item,
                        label: item
                      }, null, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.statusList, (item) => {
                        return openBlock(), createBlock(_component_h_option, {
                          key: item,
                          value: item,
                          label: item
                        }, null, 8, ["value", "label"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_select, {
                  modelValue: _ctx.status,
                  "onUpdate:modelValue": ($event) => _ctx.status = $event,
                  style: { "width": "fit-content" }
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.statusList, (item) => {
                      return openBlock(), createBlock(_component_h_option, {
                        key: item,
                        value: item,
                        label: item
                      }, null, 8, ["value", "label"]);
                    }), 128))
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
          createVNode(_component_h_form_item, { label: "切换状态" }, {
            default: withCtx(() => [
              createVNode(_component_h_select, {
                modelValue: _ctx.status,
                "onUpdate:modelValue": ($event) => _ctx.status = $event,
                style: { "width": "fit-content" }
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.statusList, (item) => {
                    return openBlock(), createBlock(_component_h_option, {
                      key: item,
                      value: item,
                      label: item
                    }, null, 8, ["value", "label"]);
                  }), 128))
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
  _push(`</div>`);
  _push(ssrRenderComponent(_component_h_steps, {
    "model-value": 1,
    status: _ctx.status
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_step, null, {
          title: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Succeeded`);
            } else {
              return [
                createTextVNode("Succeeded")
              ];
            }
          }),
          subtitle: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<span${_scopeId2}>This is a description.</span>`);
            } else {
              return [
                createVNode("span", null, "This is a description.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_step, {
          title: "Processing",
          subtitle: "This is a description.",
          description: "03/23/2021"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_step, {
          title: "Future step",
          subtitle: "This is a description."
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_step, null, {
            title: withCtx(() => [
              createTextVNode("Succeeded")
            ]),
            subtitle: withCtx(() => [
              createVNode("span", null, "This is a description.")
            ]),
            _: 1
          }),
          createVNode(_component_h_step, {
            title: "Processing",
            subtitle: "This is a description.",
            description: "03/23/2021"
          }),
          createVNode(_component_h_step, {
            title: "Future step",
            subtitle: "This is a description."
          })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Steps/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const basic = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  basic as default
};
