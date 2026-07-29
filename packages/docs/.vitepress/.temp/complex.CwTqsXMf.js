import { defineComponent, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  components: {},
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6],
      categoryCode: ""
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_popover = resolveComponent("h-popover");
  const _component_h_button = resolveComponent("h-button");
  const _component_h_pop_content = resolveComponent("h-pop-content");
  const _component_h_select = resolveComponent("h-select");
  const _component_h_option = resolveComponent("h-option");
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-8">`);
  _push(ssrRenderComponent(_component_h_popover, { trigger: "click-remain" }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          type: "secondary",
          class: "mr-4"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` click-remain 模式，点击 popper 里面的内容，浮层会消失 `);
            } else {
              return [
                createTextVNode(" click-remain 模式，点击 popper 里面的内容，浮层会消失 ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            type: "secondary",
            class: "mr-4"
          }, {
            default: withCtx(() => [
              createTextVNode(" click-remain 模式，点击 popper 里面的内容，浮层会消失 ")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_select, {
                clearable: "",
                collapse: true,
                "to-body": false,
                modelValue: _ctx.categoryCode,
                "onUpdate:modelValue": ($event) => _ctx.categoryCode = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(_ctx.list, (el) => {
                      _push4(ssrRenderComponent(_component_h_option, {
                        key: el,
                        label: el,
                        value: el
                      }, null, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.list, (el) => {
                        return openBlock(), createBlock(_component_h_option, {
                          key: el,
                          label: el,
                          value: el
                        }, null, 8, ["label", "value"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_select, {
                  clearable: "",
                  collapse: true,
                  "to-body": false,
                  modelValue: _ctx.categoryCode,
                  "onUpdate:modelValue": ($event) => _ctx.categoryCode = $event
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.list, (el) => {
                      return openBlock(), createBlock(_component_h_option, {
                        key: el,
                        label: el,
                        value: el
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createVNode(_component_h_select, {
                clearable: "",
                collapse: true,
                "to-body": false,
                modelValue: _ctx.categoryCode,
                "onUpdate:modelValue": ($event) => _ctx.categoryCode = $event
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.list, (el) => {
                    return openBlock(), createBlock(_component_h_option, {
                      key: el,
                      label: el,
                      value: el
                    }, null, 8, ["label", "value"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div>`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "click-remain",
    "hide-event-type": "mousedown"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          type: "secondary",
          class: "mr-4"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` 设置了hide-event-type=&quot;mousedown&quot;，浮层会保留 `);
            } else {
              return [
                createTextVNode(' 设置了hide-event-type="mousedown"，浮层会保留 ')
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            type: "secondary",
            class: "mr-4"
          }, {
            default: withCtx(() => [
              createTextVNode(' 设置了hide-event-type="mousedown"，浮层会保留 ')
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_select, {
                clearable: "",
                collapse: true,
                "to-body": false,
                modelValue: _ctx.categoryCode,
                "onUpdate:modelValue": ($event) => _ctx.categoryCode = $event
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(_ctx.list, (el) => {
                      _push4(ssrRenderComponent(_component_h_option, {
                        key: el,
                        label: el,
                        value: el
                      }, null, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.list, (el) => {
                        return openBlock(), createBlock(_component_h_option, {
                          key: el,
                          label: el,
                          value: el
                        }, null, 8, ["label", "value"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_select, {
                  clearable: "",
                  collapse: true,
                  "to-body": false,
                  modelValue: _ctx.categoryCode,
                  "onUpdate:modelValue": ($event) => _ctx.categoryCode = $event
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.list, (el) => {
                      return openBlock(), createBlock(_component_h_option, {
                        key: el,
                        label: el,
                        value: el
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createVNode(_component_h_select, {
                clearable: "",
                collapse: true,
                "to-body": false,
                modelValue: _ctx.categoryCode,
                "onUpdate:modelValue": ($event) => _ctx.categoryCode = $event
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.list, (el) => {
                    return openBlock(), createBlock(_component_h_option, {
                      key: el,
                      label: el,
                      value: el
                    }, null, 8, ["label", "value"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Popover/complex.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const complex = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  complex as default
};
