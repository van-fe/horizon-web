import { defineComponent, resolveComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo1",
  __ssrInlineRender: true,
  setup(__props) {
    const scrollContainer = top == null ? void 0 : top.document.querySelector("main.VPDoc");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_anchor = resolveComponent("h-anchor");
      const _component_h_anchor_link = resolveComponent("h-anchor-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wrapper" }, _attrs))} data-v-27b88911>`);
      _push(ssrRenderComponent(_component_h_anchor, {
        "scroll-container": unref(scrollContainer),
        "link-target": "_top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#设置尺寸",
              title: "设置尺寸"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#是否改变hash",
              title: "是否改变hash"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#自定义滚动容器",
              title: "自定义滚动容器"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#设置偏移量",
              title: "设置偏移量"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#是否开启折叠模式",
              title: "是否开启折叠模式"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#是否展示侧边线",
              title: "是否展示侧边线"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#监听自定义事件",
              title: "监听自定义事件"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_anchor_link, {
                href: "#设置尺寸",
                title: "设置尺寸"
              }),
              createVNode(_component_h_anchor_link, {
                href: "#是否改变hash",
                title: "是否改变hash"
              }),
              createVNode(_component_h_anchor_link, {
                href: "#自定义滚动容器",
                title: "自定义滚动容器"
              }),
              createVNode(_component_h_anchor_link, {
                href: "#设置偏移量",
                title: "设置偏移量"
              }),
              createVNode(_component_h_anchor_link, {
                href: "#是否开启折叠模式",
                title: "是否开启折叠模式"
              }),
              createVNode(_component_h_anchor_link, {
                href: "#是否展示侧边线",
                title: "是否展示侧边线"
              }),
              createVNode(_component_h_anchor_link, {
                href: "#监听自定义事件",
                title: "监听自定义事件"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_anchor, {
        "scroll-container": unref(scrollContainer),
        size: "small",
        "link-target": "_top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#设置尺寸",
              title: "设置尺寸"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#是否改变hash",
              title: "是否改变hash"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#自定义滚动容器",
              title: "自定义滚动容器"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#设置偏移量",
              title: "设置偏移量"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#是否开启折叠模式",
              title: "是否开启折叠模式"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#是否展示侧边线",
              title: "是否展示侧边线"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#监听自定义事件",
              title: "监听自定义事件"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_anchor_link, {
                href: "#设置尺寸",
                title: "设置尺寸"
              }),
              createVNode(_component_h_anchor_link, {
                href: "#是否改变hash",
                title: "是否改变hash"
              }),
              createVNode(_component_h_anchor_link, {
                href: "#自定义滚动容器",
                title: "自定义滚动容器"
              }),
              createVNode(_component_h_anchor_link, {
                href: "#设置偏移量",
                title: "设置偏移量"
              }),
              createVNode(_component_h_anchor_link, {
                href: "#是否开启折叠模式",
                title: "是否开启折叠模式"
              }),
              createVNode(_component_h_anchor_link, {
                href: "#是否展示侧边线",
                title: "是否展示侧边线"
              }),
              createVNode(_component_h_anchor_link, {
                href: "#监听自定义事件",
                title: "监听自定义事件"
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Anchor/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-27b88911"]]);
export {
  demo1 as default
};
