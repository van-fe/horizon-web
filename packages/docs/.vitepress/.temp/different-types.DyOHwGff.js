import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { a6 as $notify } from "./app.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    const open1 = () => {
      $notify(
        "这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。",
        "Normal",
        {
          type: "normal"
        }
      );
    };
    const open2 = () => {
      $notify(
        "这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。",
        "Info",
        {
          type: "info"
        }
      );
    };
    const open3 = () => {
      $notify(
        "这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。",
        "Success",
        {
          type: "success"
        }
      );
    };
    const open4 = () => {
      $notify(
        "这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。",
        "Warning",
        {
          type: "warning"
        }
      );
    };
    const open5 = () => {
      $notify(
        "这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。",
        "Error",
        {
          type: "error"
        }
      );
    };
    return {
      open1,
      open2,
      open3,
      open4,
      open5
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-wrapper" }, _attrs))} data-v-f741d882>`);
  _push(ssrRenderComponent(_component_h_button, {
    size: "medium",
    type: "primary",
    plain: "",
    onClick: _ctx.open1
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`normal`);
      } else {
        return [
          createTextVNode("normal")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    size: "medium",
    type: "primary",
    plain: "",
    onClick: _ctx.open2
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`info`);
      } else {
        return [
          createTextVNode("info")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    size: "medium",
    type: "primary",
    plain: "",
    onClick: _ctx.open3
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`success`);
      } else {
        return [
          createTextVNode("success")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    size: "medium",
    type: "primary",
    plain: "",
    onClick: _ctx.open4
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`warning`);
      } else {
        return [
          createTextVNode("warning")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    size: "medium",
    type: "primary",
    plain: "",
    onClick: _ctx.open5
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`error`);
      } else {
        return [
          createTextVNode("error")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/Notification/different-types.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const differentTypes = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f741d882"]]);
export {
  differentTypes as default
};
