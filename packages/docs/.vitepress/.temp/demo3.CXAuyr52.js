import { defineComponent, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { z as $alert, C as $confirm } from "./app.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    const showAlert = () => {
      $alert("这是一段文本", "提示", {
        iconName: "light_on",
        iconSize: "22",
        maskClose: true,
        escClose: true,
        okText: "我知道了",
        okButtonProps: {
          type: "text"
        }
      }).then(() => {
        console.info("OK clicked!");
      });
    };
    const showConfirm = () => {
      $confirm("这是一段文本", "提示", {
        iconName: "time",
        iconSize: "22",
        maskClose: true,
        escClose: true,
        okText: "确认提交",
        okButtonProps: {
          type: "primary",
          kind: "negative"
        },
        cancelText: "返回修改",
        cancelButtonProps: {
          type: "text",
          kind: "neutral"
        }
      }).then(() => {
        console.info("Confirmed!");
      }).catch(() => {
        console.info("Cancelled!");
      });
    };
    const showNoClose = () => {
      $alert("这是一段文本", "提示", {
        iconName: "time",
        iconSize: "22",
        maskClose: true,
        escClose: true,
        okText: "确认提交",
        closeButton: false,
        okButtonProps: {
          type: "primary",
          kind: "negative"
        },
        cancelText: "返回修改",
        cancelButtonProps: {
          type: "text",
          kind: "neutral"
        }
      }).then(() => {
        console.info("Confirmed!");
      }).catch(() => {
        console.info("Cancelled!");
      });
    };
    return {
      showAlert,
      showConfirm,
      showNoClose
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: _ctx.showAlert
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
    onClick: _ctx.showConfirm
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Confirm`);
      } else {
        return [
          createTextVNode("Confirm")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    class: "mr-2",
    onClick: _ctx.showNoClose
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`No Close`);
      } else {
        return [
          createTextVNode("No Close")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/MessageBox/demo3.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  demo3 as default
};
