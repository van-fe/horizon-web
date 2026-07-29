import { defineComponent, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { z as $alert, C as $confirm, $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "debounce-fn",
  __ssrInlineRender: true,
  setup(__props) {
    const showAlert = () => {
      $alert("这是一段文本", "提示", {
        maskClose: true,
        escClose: true,
        okText: "我知道了",
        okButtonProps: {
          debounceType: "loading",
          debounceFn: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                $message.success("finished!");
                resolve(void 0);
              }, 2e3);
            });
          }
        }
      }).then(() => {
        console.info("OK clicked!");
      });
    };
    const showConfirm = () => {
      $confirm("这是一段文本", "提示", {
        maskClose: true,
        escClose: true,
        okText: "确认提交",
        okButtonProps: {
          debounceType: "loading",
          debounceFn: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                $message.success("finished!");
                resolve(void 0);
              }, 2e3);
            });
          }
        },
        cancelButtonProps: {
          debounceType: "loading",
          debounceFn: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                $message.warning("cancel!");
                resolve(void 0);
              }, 2e3);
            });
          }
        }
      }).then((close) => {
        console.info("Confirmed!");
        close();
      }).catch(() => {
        console.info("Cancelled!");
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_button, {
        class: "mr-2",
        onClick: showAlert
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
        onClick: showConfirm
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/MessageBox/debounce-fn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
