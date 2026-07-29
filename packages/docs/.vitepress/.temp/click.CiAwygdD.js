import { defineComponent, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  data() {
    return {
      current: 0
    };
  },
  methods: {
    onChange(current) {
      console.info("onChange:", current);
    },
    onClickStep1(evt, index) {
      console.info({ evt, index });
    }
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_steps = resolveComponent("h-steps");
  const _component_h_step = resolveComponent("h-step");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_steps, {
    modelValue: _ctx.current,
    "onUpdate:modelValue": ($event) => _ctx.current = $event,
    clickable: true,
    onChange: _ctx.onChange
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_step, {
          title: "Step 1",
          description: "Here is a paragraph.",
          onClick: _ctx.onClickStep1
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_step, {
          title: "Step 2",
          description: "Cannot click",
          clickable: false
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_step, {
          title: "Step 3",
          description: "Here is a paragraph."
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_step, {
          title: "Step 3",
          description: "Here is a paragraph."
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_step, {
            title: "Step 1",
            description: "Here is a paragraph.",
            onClick: _ctx.onClickStep1
          }, null, 8, ["onClick"]),
          createVNode(_component_h_step, {
            title: "Step 2",
            description: "Cannot click",
            clickable: false
          }),
          createVNode(_component_h_step, {
            title: "Step 3",
            description: "Here is a paragraph."
          }),
          createVNode(_component_h_step, {
            title: "Step 3",
            description: "Here is a paragraph."
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<br>`);
  _push(ssrRenderComponent(_component_h_steps, {
    modelValue: _ctx.current,
    "onUpdate:modelValue": ($event) => _ctx.current = $event,
    clickable: true,
    direction: "vertical",
    onChange: _ctx.onChange
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_step, {
          title: "Step 1",
          description: "Here is a paragraph."
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_step, {
          title: "Step 2",
          description: "Cannot click",
          clickable: false
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_step, {
          title: "Step 3",
          description: "Here is a paragraph."
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_step, {
          title: "Step 3",
          description: "Here is a paragraph."
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_step, {
            title: "Step 1",
            description: "Here is a paragraph."
          }),
          createVNode(_component_h_step, {
            title: "Step 2",
            description: "Cannot click",
            clickable: false
          }),
          createVNode(_component_h_step, {
            title: "Step 3",
            description: "Here is a paragraph."
          }),
          createVNode(_component_h_step, {
            title: "Step 3",
            description: "Here is a paragraph."
          })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Steps/click.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const click = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  click as default
};
