import { defineComponent, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { z as $alert } from "./app.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    const showAlert = (type) => {
      $alert("这是一段文本", "提示", {
        type
      }).then(() => {
        console.info("OK clicked!");
      }).catch(() => {
        console.info("Close clicked!");
      });
    };
    return {
      showAlert
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: ($event) => _ctx.showAlert()
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Alert`);
      } else {
        return [
          createTextVNode("Alert")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: ($event) => _ctx.showAlert("info")
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Info`);
      } else {
        return [
          createTextVNode("Info")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: ($event) => _ctx.showAlert("success")
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Success`);
      } else {
        return [
          createTextVNode("Success")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: ($event) => _ctx.showAlert("warning")
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Warning`);
      } else {
        return [
          createTextVNode("Warning")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: ($event) => _ctx.showAlert("error")
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Error`);
      } else {
        return [
          createTextVNode("Error")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/MessageBox/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  demo1 as default
};
