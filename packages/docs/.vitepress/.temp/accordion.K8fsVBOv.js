import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const activeKey = ref("1");
    const handleExpand = (val) => {
      console.info(`activeKey ===> `, val);
    };
    return {
      activeKey,
      handleExpand
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_collapse = resolveComponent("h-collapse");
  const _component_h_collapse_item = resolveComponent("h-collapse-item");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-space-between" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_h_collapse, {
    "active-key": _ctx.activeKey,
    accordion: "",
    style: { "width": "500px" }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_collapse_item, {
          title: "This is a panel header.",
          name: "1"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div${_scopeId2}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div><div${_scopeId2}>Velit officia consequat duis enim velit mollit.</div>`);
            } else {
              return [
                createVNode("div", null, "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."),
                createVNode("div", null, "Velit officia consequat duis enim velit mollit.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_collapse_item, {
          title: "Why can i not submit a higher price?",
          name: "2"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div${_scopeId2}>Why can i not submit a higher price?</div>`);
            } else {
              return [
                createVNode("div", null, "Why can i not submit a higher price?")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_collapse_item, {
          title: "How are you？",
          name: "3"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`How are you？`);
            } else {
              return [
                createTextVNode("How are you？")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_collapse_item, {
          title: "What are Promotion Products?",
          name: "4"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` What are Promotion Products? `);
            } else {
              return [
                createTextVNode(" What are Promotion Products? ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_collapse_item, {
            title: "This is a panel header.",
            name: "1"
          }, {
            default: withCtx(() => [
              createVNode("div", null, "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."),
              createVNode("div", null, "Velit officia consequat duis enim velit mollit.")
            ]),
            _: 1
          }),
          createVNode(_component_h_collapse_item, {
            title: "Why can i not submit a higher price?",
            name: "2"
          }, {
            default: withCtx(() => [
              createVNode("div", null, "Why can i not submit a higher price?")
            ]),
            _: 1
          }),
          createVNode(_component_h_collapse_item, {
            title: "How are you？",
            name: "3"
          }, {
            default: withCtx(() => [
              createTextVNode("How are you？")
            ]),
            _: 1
          }),
          createVNode(_component_h_collapse_item, {
            title: "What are Promotion Products?",
            name: "4"
          }, {
            default: withCtx(() => [
              createTextVNode(" What are Promotion Products? ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_collapse, {
    "active-key": _ctx.activeKey,
    accordion: "",
    filled: "",
    style: { "width": "500px" },
    onChange: _ctx.handleExpand
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_collapse_item, {
          title: "This is a panel header.",
          name: "1"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div${_scopeId2}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div><div${_scopeId2}>Velit officia consequat duis enim velit mollit.</div>`);
            } else {
              return [
                createVNode("div", null, "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."),
                createVNode("div", null, "Velit officia consequat duis enim velit mollit.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_collapse_item, {
          title: "Why can i not submit a higher price?",
          name: "2"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div${_scopeId2}>Why can i not submit a higher price?</div>`);
            } else {
              return [
                createVNode("div", null, "Why can i not submit a higher price?")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_collapse_item, {
          title: "How are you？",
          name: "3"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`How are you？`);
            } else {
              return [
                createTextVNode("How are you？")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_collapse_item, {
          title: "What are Promotion Products?",
          name: "4"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` What are Promotion Products? `);
            } else {
              return [
                createTextVNode(" What are Promotion Products? ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_collapse_item, {
            title: "This is a panel header.",
            name: "1"
          }, {
            default: withCtx(() => [
              createVNode("div", null, "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."),
              createVNode("div", null, "Velit officia consequat duis enim velit mollit.")
            ]),
            _: 1
          }),
          createVNode(_component_h_collapse_item, {
            title: "Why can i not submit a higher price?",
            name: "2"
          }, {
            default: withCtx(() => [
              createVNode("div", null, "Why can i not submit a higher price?")
            ]),
            _: 1
          }),
          createVNode(_component_h_collapse_item, {
            title: "How are you？",
            name: "3"
          }, {
            default: withCtx(() => [
              createTextVNode("How are you？")
            ]),
            _: 1
          }),
          createVNode(_component_h_collapse_item, {
            title: "What are Promotion Products?",
            name: "4"
          }, {
            default: withCtx(() => [
              createTextVNode(" What are Promotion Products? ")
            ]),
            _: 1
          })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Collapse/accordion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const accordion = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  accordion as default
};
