import { defineComponent, ref, onMounted, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GridDemo",
  __ssrInlineRender: true,
  setup(__props) {
    const gridItems = ref(5);
    const items = ref([]);
    onMounted(() => {
      for (let i = 0; i < 5e3; i++) {
        items.value.push({
          id: i,
          name: faker.person.fullName()
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_slider = resolveComponent("h-slider");
      const _component_h_recycle_scroller = resolveComponent("h-recycle-scroller");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid-scroller-demo" }, _attrs))} data-v-d6c92e81><section class="toolbar" data-v-d6c92e81><div class="tip" data-v-d6c92e81>每行网格数:</div><div class="slider-wrap" data-v-d6c92e81>`);
      _push(ssrRenderComponent(_component_h_slider, {
        modelValue: gridItems.value,
        "onUpdate:modelValue": ($event) => gridItems.value = $event,
        min: 2,
        max: 10
      }, null, _parent));
      _push(`</div><div class="grid-num" data-v-d6c92e81>${ssrInterpolate(gridItems.value)}</div></section>`);
      _push(ssrRenderComponent(_component_h_recycle_scroller, {
        class: "scroller",
        "item-size": 128,
        items: items.value,
        "grid-items": gridItems.value
      }, {
        default: withCtx(({ item, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="item" data-v-d6c92e81${_scopeId}><div class="index" data-v-d6c92e81${_scopeId}>${ssrInterpolate(index)}</div><div class="name" data-v-d6c92e81${_scopeId}>${ssrInterpolate(item.name)}</div></div>`);
          } else {
            return [
              createVNode("div", { class: "item" }, [
                createVNode("div", { class: "index" }, toDisplayString(index), 1),
                createVNode("div", { class: "name" }, toDisplayString(item.name), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/VirtualScroller/GridDemo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GridDemo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d6c92e81"]]);
export {
  GridDemo as default
};
