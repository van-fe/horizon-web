import { defineComponent, onUnmounted, resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { a3 as $loadingBar } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo1",
  __ssrInlineRender: true,
  setup(__props) {
    const start = () => {
      $loadingBar.start();
    };
    const error = () => {
      $loadingBar.error();
    };
    const finish = () => {
      $loadingBar.finish();
    };
    const update = () => {
      $loadingBar.update(60);
    };
    const destroy = () => {
      $loadingBar.destroy();
    };
    onUnmounted(() => {
      destroy();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_button, {
        plain: true,
        class: "btn-common",
        onClick: start
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`开始`);
          } else {
            return [
              createTextVNode("开始")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        plain: true,
        class: "btn-common",
        onClick: finish
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`结束`);
          } else {
            return [
              createTextVNode("结束")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        plain: true,
        class: "btn-common",
        type: "danger",
        onClick: error
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`错误`);
          } else {
            return [
              createTextVNode("错误")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        plain: true,
        class: "btn-common",
        onClick: update
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`更新指定进度`);
          } else {
            return [
              createTextVNode("更新指定进度")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        plain: true,
        class: "btn-common",
        type: "danger",
        onClick: destroy
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`销毁`);
          } else {
            return [
              createTextVNode("销毁")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/methods/LoadingBar/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8e988b7d"]]);
export {
  demo1 as default
};
