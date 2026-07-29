import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    let src = ref("https://cdn-app.example.com/us/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg");
    let src2 = ref("https://cdn-app.example.com/us/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg");
    let src1 = ref("https://cdn-app.example.com/us/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg");
    const errorHandler = () => {
      src.value = "https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg";
    };
    const errorHandler1 = () => {
      console.info("图片加载失败了");
    };
    return {
      errorHandler,
      errorHandler1,
      src,
      src1,
      src2
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_avatar = resolveComponent("h-avatar");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "n-demo" }, _attrs))} data-v-5adb6bd2><div class="n-demo__container" data-v-5adb6bd2><div class="n-demo__title" data-v-5adb6bd2>通过加载图片失败默认处理</div>`);
  _push(ssrRenderComponent(_component_h_avatar, {
    size: "large",
    src: _ctx.src1,
    onError: _ctx.errorHandler1
  }, null, _parent));
  _push(`</div><div class="n-demo__container" data-v-5adb6bd2><div class="n-demo__title" data-v-5adb6bd2>通过 error 方法自定义处理加载图片失败情况</div>`);
  _push(ssrRenderComponent(_component_h_avatar, {
    size: "large",
    src: _ctx.src,
    onError: _ctx.errorHandler
  }, null, _parent));
  _push(`</div><div class="n-demo__container" data-v-5adb6bd2><div class="n-demo__title" data-v-5adb6bd2>通过插槽自定义加载图片失败情况</div>`);
  _push(ssrRenderComponent(_component_h_avatar, {
    size: "large",
    src: _ctx.src2
  }, {
    error: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div data-v-5adb6bd2${_scopeId}>失败了</div>`);
      } else {
        return [
          createVNode("div", null, "失败了")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Avatar/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-5adb6bd2"]]);
export {
  error as default
};
