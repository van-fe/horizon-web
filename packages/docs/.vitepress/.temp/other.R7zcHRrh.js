import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, withModifiers, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const activeKey = ref(["1", "2"]);
    const handleExpand = (activeKeys) => {
      console.info(`activeKeys ===> `, activeKeys);
    };
    const handleClickButton = () => {
      console.info("click button");
    };
    return {
      activeKey,
      handleExpand,
      handleClickButton
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_collapse = resolveComponent("h-collapse");
  const _component_h_collapse_item = resolveComponent("h-collapse-item");
  const _component_AIcon = resolveComponent("AIcon");
  const _component_h_button = resolveComponent("h-button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-space-between" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_h_collapse, {
    "active-key": _ctx.activeKey,
    style: { "width": "500px" },
    onChange: _ctx.handleExpand
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_collapse_item, { name: "1" }, {
          title: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_AIcon, {
                name: "task_complete",
                class: "mr-2",
                size: "24"
              }, null, _parent3, _scopeId2));
              _push3(` This is a panel header. `);
            } else {
              return [
                createVNode(_component_AIcon, {
                  name: "task_complete",
                  class: "mr-2",
                  size: "24"
                }),
                createTextVNode(" This is a panel header. ")
              ];
            }
          }),
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div${_scopeId2}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div><div${_scopeId2}>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div><div${_scopeId2}>sunt nostrud amet.Amet minim mollit.</div>`);
            } else {
              return [
                createVNode("div", null, "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."),
                createVNode("div", null, "Velit officia consequat duis enim velit mollit. Exercitation veniam consequat"),
                createVNode("div", null, "sunt nostrud amet.Amet minim mollit.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_collapse_item, { name: "2" }, {
          title: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="flex justify-space-between flex-1"${_scopeId2}><div${_scopeId2}>Why can i not submit a higher price?</div><div class="ml-3"${_scopeId2}>Extra Info</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex justify-space-between flex-1" }, [
                  createVNode("div", null, "Why can i not submit a higher price?"),
                  createVNode("div", { class: "ml-3" }, "Extra Info")
                ])
              ];
            }
          }),
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
        _push2(ssrRenderComponent(_component_h_collapse_item, { name: "3" }, {
          title: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="flex justify-space-between flex-1"${_scopeId2}><div${_scopeId2}>How are you？</div>`);
              _push3(ssrRenderComponent(_component_h_button, {
                class: "ml-3",
                size: "small",
                plain: true,
                onClick: _ctx.handleClickButton
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Default `);
                  } else {
                    return [
                      createTextVNode(" Default ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex justify-space-between flex-1" }, [
                  createVNode("div", null, "How are you？"),
                  createVNode(_component_h_button, {
                    class: "ml-3",
                    size: "small",
                    plain: true,
                    onClick: withModifiers(_ctx.handleClickButton, ["stop"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Default ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ];
            }
          }),
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` How are you？ `);
            } else {
              return [
                createTextVNode(" How are you？ ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_collapse_item, { name: "4" }, {
          title: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="flex justify-space-between flex-1"${_scopeId2}><div${_scopeId2}>What are Promotion Products?</div>`);
              _push3(ssrRenderComponent(_component_AIcon, {
                class: "ml-3",
                name: "alarm"
              }, null, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex justify-space-between flex-1" }, [
                  createVNode("div", null, "What are Promotion Products?"),
                  createVNode(_component_AIcon, {
                    class: "ml-3",
                    name: "alarm"
                  })
                ])
              ];
            }
          }),
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
          createVNode(_component_h_collapse_item, { name: "1" }, {
            title: withCtx(() => [
              createVNode(_component_AIcon, {
                name: "task_complete",
                class: "mr-2",
                size: "24"
              }),
              createTextVNode(" This is a panel header. ")
            ]),
            default: withCtx(() => [
              createVNode("div", null, "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."),
              createVNode("div", null, "Velit officia consequat duis enim velit mollit. Exercitation veniam consequat"),
              createVNode("div", null, "sunt nostrud amet.Amet minim mollit.")
            ]),
            _: 1
          }),
          createVNode(_component_h_collapse_item, { name: "2" }, {
            title: withCtx(() => [
              createVNode("div", { class: "flex justify-space-between flex-1" }, [
                createVNode("div", null, "Why can i not submit a higher price?"),
                createVNode("div", { class: "ml-3" }, "Extra Info")
              ])
            ]),
            default: withCtx(() => [
              createVNode("div", null, "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."),
              createVNode("div", null, "Velit officia consequat duis enim velit mollit.")
            ]),
            _: 1
          }),
          createVNode(_component_h_collapse_item, { name: "3" }, {
            title: withCtx(() => [
              createVNode("div", { class: "flex justify-space-between flex-1" }, [
                createVNode("div", null, "How are you？"),
                createVNode(_component_h_button, {
                  class: "ml-3",
                  size: "small",
                  plain: true,
                  onClick: withModifiers(_ctx.handleClickButton, ["stop"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Default ")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ]),
            default: withCtx(() => [
              createTextVNode(" How are you？ ")
            ]),
            _: 1
          }),
          createVNode(_component_h_collapse_item, { name: "4" }, {
            title: withCtx(() => [
              createVNode("div", { class: "flex justify-space-between flex-1" }, [
                createVNode("div", null, "What are Promotion Products?"),
                createVNode(_component_AIcon, {
                  class: "ml-3",
                  name: "alarm"
                })
              ])
            ]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Collapse/other.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const other = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  other as default
};
