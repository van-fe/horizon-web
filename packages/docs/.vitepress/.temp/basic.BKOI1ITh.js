import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const timelineData = ref([
      {
        name: "milestone 2022-03-01",
        time: "03/01/2022"
      },
      {
        name: "milestone 2022-03-02",
        time: "03/02/2022"
      },
      {
        name: "milestone 2022-02-02",
        time: "02/02/2022"
      },
      {
        name: "milestone 2022-02-01",
        time: "02/01/2022",
        tail: false
      }
    ]);
    return {
      timelineData
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_timeline = resolveComponent("h-timeline");
  const _component_h_timeline_item = resolveComponent("h-timeline-item");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-27c438f3><div class="container__block" data-v-27c438f3><div class="container__title" data-v-27c438f3>small大小</div>`);
  _push(ssrRenderComponent(_component_h_timeline, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.timelineData, (item, index) => {
          _push2(ssrRenderComponent(_component_h_timeline_item, {
            key: index,
            name: item.name,
            tail: item.tail,
            timestamp: item.time,
            size: "small"
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.timelineData, (item, index) => {
            return openBlock(), createBlock(_component_h_timeline_item, {
              key: index,
              name: item.name,
              tail: item.tail,
              timestamp: item.time,
              size: "small"
            }, null, 8, ["name", "tail", "timestamp"]);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="container__block" data-v-27c438f3><div class="container__title" data-v-27c438f3>默认大小(medium)</div>`);
  _push(ssrRenderComponent(_component_h_timeline, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.timelineData, (item, index) => {
          _push2(ssrRenderComponent(_component_h_timeline_item, {
            key: index,
            name: item.name,
            tail: item.tail,
            timestamp: item.time
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.timelineData, (item, index) => {
            return openBlock(), createBlock(_component_h_timeline_item, {
              key: index,
              name: item.name,
              tail: item.tail,
              timestamp: item.time
            }, null, 8, ["name", "tail", "timestamp"]);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="container__block" data-v-27c438f3><div class="container__title" data-v-27c438f3>large大小</div>`);
  _push(ssrRenderComponent(_component_h_timeline, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.timelineData, (item, index) => {
          _push2(ssrRenderComponent(_component_h_timeline_item, {
            key: index,
            name: item.name,
            tail: item.tail,
            timestamp: item.time,
            size: "large"
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.timelineData, (item, index) => {
            return openBlock(), createBlock(_component_h_timeline_item, {
              key: index,
              name: item.name,
              tail: item.tail,
              timestamp: item.time,
              size: "large"
            }, null, 8, ["name", "tail", "timestamp"]);
          }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Timeline/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const basic = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-27c438f3"]]);
export {
  basic as default
};
