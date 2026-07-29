import { defineComponent, ref, resolveComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { j as __default__, k as __default__$1, m as __default__$2, n as __default__$3, $ as $message } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "theme",
  __ssrInlineRender: true,
  setup(__props) {
    const isStared = ref(false);
    function onCommand(type) {
      switch (type) {
        case "star":
          isStared.value = !isStared.value;
          break;
        case "call":
          $message.info("沟通");
          break;
        case "msn":
          $message.info("发送信息");
          break;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_avatar = resolveComponent("h-avatar");
      const _component_h_controls = resolveComponent("h-controls");
      const _component_h_control = resolveComponent("h-control");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-53c1e193><div class="content" data-v-53c1e193>`);
      _push(ssrRenderComponent(_component_h_avatar, { size: "small" }, null, _parent));
      _push(`<div class="name" data-v-53c1e193> William Li </div></div><div class="controls" data-v-53c1e193>`);
      _push(ssrRenderComponent(_component_h_controls, {
        theme: "dark",
        onCommand
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_control, {
              icon: isStared.value ? unref(__default__) : unref(__default__$1),
              text: "关注",
              label: "star",
              "icon-color": isStared.value ? ["gold"] : void 0
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_control, {
              icon: unref(__default__$2),
              label: "call"
            }, {
              text: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`沟通`);
                } else {
                  return [
                    createTextVNode("沟通")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_control, {
              icon: unref(__default__$3),
              text: "发送信息",
              label: "msn"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_control, {
                icon: isStared.value ? unref(__default__) : unref(__default__$1),
                text: "关注",
                label: "star",
                "icon-color": isStared.value ? ["gold"] : void 0
              }, null, 8, ["icon", "icon-color"]),
              createVNode(_component_h_control, {
                icon: unref(__default__$2),
                label: "call"
              }, {
                text: withCtx(() => [
                  createTextVNode("沟通")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_h_control, {
                icon: unref(__default__$3),
                text: "发送信息",
                label: "msn"
              }, null, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Controls/theme.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const theme = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-53c1e193"]]);
export {
  theme as default
};
