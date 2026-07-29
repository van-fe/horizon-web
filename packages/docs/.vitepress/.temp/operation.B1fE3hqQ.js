import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { a6 as $notify, $ as $message } from "./app.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  setup() {
    const open = () => {
      $notify(
        "这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。",
        "操作按钮",
        {
          type: "info",
          showConfirmButton: true,
          showCancelButton: true,
          callback(action, instance) {
            console.info(action, instance);
          }
        }
      );
    };
    const open1 = () => {
      $notify({
        title: "部分导入失败",
        useHTML: true,
        duration: 0,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: "关闭",
        confirmButtonText: "下载失败报告",
        confirmButtonProps: {
          debounceType: "loading",
          debounceFn: () => {
            console.info("clicked!");
            return new Promise((resolve) => {
              setTimeout(() => {
                $message.success("保存成功！");
                resolve(null);
              }, 2e3);
            });
          }
        },
        content: "部分导入失败",
        type: "error"
      });
    };
    return {
      open,
      open1
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_button = resolveComponent("h-button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-wrapper" }, _attrs))} data-v-f2dae900>`);
  _push(ssrRenderComponent(_component_h_button, {
    size: "medium",
    type: "primary",
    plain: "",
    onClick: _ctx.open
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`操作按钮`);
      } else {
        return [
          createTextVNode("操作按钮")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_button, {
    size: "medium",
    type: "primary",
    plain: "",
    onClick: _ctx.open1
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`防抖按钮`);
      } else {
        return [
          createTextVNode("防抖按钮")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/Notification/operation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const operation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f2dae900"]]);
export {
  operation as default
};
