import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const show = ref(false);
    const show01 = ref(false);
    const show02 = ref(false);
    const show03 = ref(false);
    const show04 = ref(false);
    const open = function() {
      show.value = true;
    };
    const close = function() {
      show.value = false;
    };
    const open01 = function() {
      show01.value = true;
    };
    const close01 = function() {
      show01.value = false;
    };
    const open02 = function() {
      show02.value = true;
    };
    const close02 = function() {
      show02.value = false;
    };
    const open03 = function() {
      show03.value = true;
    };
    const close03 = function() {
      show03.value = false;
    };
    const open04 = function() {
      show04.value = true;
    };
    const close04 = function() {
      show04.value = false;
    };
    return {
      show,
      show01,
      show02,
      show03,
      show04,
      open,
      close,
      open01,
      close01,
      open02,
      close02,
      open03,
      close03,
      open04,
      close04
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  const _component_h_mask = resolveComponent("h-mask");
  _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex" } }, _attrs))} data-v-d83aac1d><div class="box" data-v-d83aac1d>`);
  _push(ssrRenderComponent(_component_h_button, { onClick: _ctx.open }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`打开(default)`);
      } else {
        return [
          createTextVNode("打开(default)")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_mask, {
    value: _ctx.show,
    type: "default"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { onClick: _ctx.close }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`关闭`);
            } else {
              return [
                createTextVNode("关闭")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { onClick: _ctx.close }, {
            default: withCtx(() => [
              createTextVNode("关闭")
            ]),
            _: 1
          }, 8, ["onClick"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="box" data-v-d83aac1d>`);
  _push(ssrRenderComponent(_component_h_button, { onClick: _ctx.open01 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`打开(weak)`);
      } else {
        return [
          createTextVNode("打开(weak)")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_mask, {
    value: _ctx.show01,
    type: "weak"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { onClick: _ctx.close01 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`关闭`);
            } else {
              return [
                createTextVNode("关闭")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { onClick: _ctx.close01 }, {
            default: withCtx(() => [
              createTextVNode("关闭")
            ]),
            _: 1
          }, 8, ["onClick"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="box" data-v-d83aac1d>`);
  _push(ssrRenderComponent(_component_h_button, { onClick: _ctx.open02 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`打开(strong)`);
      } else {
        return [
          createTextVNode("打开(strong)")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_mask, {
    value: _ctx.show02,
    type: "strong"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { onClick: _ctx.close02 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`关闭`);
            } else {
              return [
                createTextVNode("关闭")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { onClick: _ctx.close02 }, {
            default: withCtx(() => [
              createTextVNode("关闭")
            ]),
            _: 1
          }, 8, ["onClick"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="box" data-v-d83aac1d>`);
  _push(ssrRenderComponent(_component_h_button, { onClick: _ctx.open03 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`打开(inverse)`);
      } else {
        return [
          createTextVNode("打开(inverse)")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_mask, {
    value: _ctx.show03,
    type: "inverse"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { onClick: _ctx.close03 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`关闭`);
            } else {
              return [
                createTextVNode("关闭")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { onClick: _ctx.close03 }, {
            default: withCtx(() => [
              createTextVNode("关闭")
            ]),
            _: 1
          }, 8, ["onClick"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="box" data-v-d83aac1d>`);
  _push(ssrRenderComponent(_component_h_button, { onClick: _ctx.open04 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`打开(transparent)`);
      } else {
        return [
          createTextVNode("打开(transparent)")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_mask, {
    value: _ctx.show04,
    type: "transparent"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, { onClick: _ctx.close04 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`关闭`);
            } else {
              return [
                createTextVNode("关闭")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, { onClick: _ctx.close04 }, {
            default: withCtx(() => [
              createTextVNode("关闭")
            ]),
            _: 1
          }, 8, ["onClick"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Mask/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d83aac1d"]]);
export {
  demo1 as default
};
