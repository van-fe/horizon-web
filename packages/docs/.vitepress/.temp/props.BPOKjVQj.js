import { defineComponent, ref, resolveComponent, mergeProps, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const finished = ref(false);
    const currentTime = ref(Date.now());
    window.setInterval(() => {
      currentTime.value = Date.now();
    }, 1e4);
    return {
      finished,
      currentTime
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_time = resolveComponent("h-time");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}><div class="mr-4"> 正向计时 <span class="ml-2" style="${ssrRenderStyle(_ctx.finished ? null : { display: "none" })}">----计时完成！</span>`);
  _push(ssrRenderComponent(_component_h_time, {
    forward: true,
    onFinished: ($event) => _ctx.finished = true
  }, null, _parent));
  _push(`</div><div class="mr-4"> 到期时间:30秒后 `);
  _push(ssrRenderComponent(_component_h_time, {
    "end-time": Date.now() + 3e4,
    time: Date.now() + 9e4
  }, null, _parent));
  _push(`</div><div> 持续时长、10s更新一次 `);
  _push(ssrRenderComponent(_component_h_time, {
    "end-time": +/* @__PURE__ */ new Date("2023-02-27 16:27:30"),
    time: _ctx.currentTime,
    calculative: ""
  }, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Time/props.vue");
  return _sfc_setup ? _sfc_setup(props2, ctx) : void 0;
};
const props = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  props as default
};
