import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const checkbox = ref(false);
    const content = ref(
      "这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_card = resolveComponent("h-card");
      const _component_h_checkbox = resolveComponent("h-checkbox");
      const _component_h_tag = resolveComponent("h-tag");
      _push(`<ul${ssrRenderAttrs(_attrs)} data-v-b2093ffe><li data-v-b2093ffe><p data-v-b2093ffe>带操作</p>`);
      _push(ssrRenderComponent(_component_h_card, { "top-divider": "" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header" data-v-b2093ffe${_scopeId}> 卡片标题 <a data-v-b2093ffe${_scopeId}>操作</a></div>`);
          } else {
            return [
              createVNode("div", { class: "header" }, [
                createTextVNode(" 卡片标题 "),
                createVNode("a", null, "操作")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ${ssrInterpolate(content.value)}`);
          } else {
            return [
              createTextVNode(" " + toDisplayString(content.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-b2093ffe><p data-v-b2093ffe>checkbox</p>`);
      _push(ssrRenderComponent(_component_h_card, { "top-divider": "" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header2" data-v-b2093ffe${_scopeId}>`);
            _push2(ssrRenderComponent(_component_h_checkbox, {
              modelValue: checkbox.value,
              "onUpdate:modelValue": ($event) => checkbox.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`卡片标题`);
                } else {
                  return [
                    createTextVNode("卡片标题")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "header2" }, [
                createVNode(_component_h_checkbox, {
                  modelValue: checkbox.value,
                  "onUpdate:modelValue": ($event) => checkbox.value = $event
                }, {
                  default: withCtx(() => [
                    createTextVNode("卡片标题")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ${ssrInterpolate(content.value)}`);
          } else {
            return [
              createTextVNode(" " + toDisplayString(content.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-b2093ffe><p data-v-b2093ffe>带标签</p>`);
      _push(ssrRenderComponent(_component_h_card, { "top-divider": "" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header3" data-v-b2093ffe${_scopeId}><div data-v-b2093ffe${_scopeId}>`);
            _push2(ssrRenderComponent(_component_h_tag, { size: "medium" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`标签`);
                } else {
                  return [
                    createTextVNode("标签")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><span class="title" data-v-b2093ffe${_scopeId}>卡片标题</span></div>`);
          } else {
            return [
              createVNode("div", { class: "header3" }, [
                createVNode("div", null, [
                  createVNode(_component_h_tag, { size: "medium" }, {
                    default: withCtx(() => [
                      createTextVNode("标签")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("span", { class: "title" }, "卡片标题")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ${ssrInterpolate(content.value)}`);
          } else {
            return [
              createTextVNode(" " + toDisplayString(content.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-b2093ffe><p data-v-b2093ffe>带图标</p>`);
      _push(ssrRenderComponent(_component_h_card, { "top-divider": "" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header4" data-v-b2093ffe${_scopeId}><svg t="1671430836155" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="2785" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200" data-v-b2093ffe${_scopeId}><path fill="currentColor" d="M512.042667 682.666667c-94.122667 0-170.666667-76.544-170.666667-170.666667s76.544-170.666667 170.666667-170.666667 170.666667 76.544 170.666666 170.666667-76.586667 170.666667-170.666666 170.666667z m0-298.666667c-70.570667 0-128 57.429333-128 128s57.429333 128 128 128 128-57.429333 128-128-57.429333-128-128-128z" p-id="2786" data-v-b2093ffe${_scopeId}></path><path fill="currentColor" d="M512.042667 810.666667C267.989333 810.666667 66.56 603.562667 10.666667 540.074667a42.922667 42.922667 0 0 1-0.085334-56.106667C66.517333 420.48 267.989333 213.333333 512.042667 213.333333c243.797333 0 445.098667 206.72 501.205333 270.378667l0.256 0.298667c13.866667 15.957333 13.866667 40.021333 0 55.978666C957.525333 603.52 756.053333 810.666667 512.042667 810.666667z m0-554.666667C285.909333 256 95.573333 452.010667 42.666667 512.128 95.616 571.989333 285.866667 768 512.042667 768c226.133333 0 416.426667-196.010667 469.376-256.128C928.426667 452.010667 738.133333 256 512.042667 256z" p-id="2787" data-v-b2093ffe${_scopeId}></path></svg><p data-v-b2093ffe${_scopeId}>DD UED TEAM</p><p style="${ssrRenderStyle({ "color": "#868a9a", "font-weight": "400" })}" data-v-b2093ffe${_scopeId}>描述文案描述文案描述文案描述文案</p></div>`);
          } else {
            return [
              createVNode("div", { class: "header4" }, [
                (openBlock(), createBlock("svg", {
                  t: "1671430836155",
                  class: "icon",
                  viewBox: "0 0 1024 1024",
                  xmlns: "http://www.w3.org/2000/svg",
                  "p-id": "2785",
                  "xmlns:xlink": "http://www.w3.org/1999/xlink",
                  width: "200",
                  height: "200"
                }, [
                  createVNode("path", {
                    fill: "currentColor",
                    d: "M512.042667 682.666667c-94.122667 0-170.666667-76.544-170.666667-170.666667s76.544-170.666667 170.666667-170.666667 170.666667 76.544 170.666666 170.666667-76.586667 170.666667-170.666666 170.666667z m0-298.666667c-70.570667 0-128 57.429333-128 128s57.429333 128 128 128 128-57.429333 128-128-57.429333-128-128-128z",
                    "p-id": "2786"
                  }),
                  createVNode("path", {
                    fill: "currentColor",
                    d: "M512.042667 810.666667C267.989333 810.666667 66.56 603.562667 10.666667 540.074667a42.922667 42.922667 0 0 1-0.085334-56.106667C66.517333 420.48 267.989333 213.333333 512.042667 213.333333c243.797333 0 445.098667 206.72 501.205333 270.378667l0.256 0.298667c13.866667 15.957333 13.866667 40.021333 0 55.978666C957.525333 603.52 756.053333 810.666667 512.042667 810.666667z m0-554.666667C285.909333 256 95.573333 452.010667 42.666667 512.128 95.616 571.989333 285.866667 768 512.042667 768c226.133333 0 416.426667-196.010667 469.376-256.128C928.426667 452.010667 738.133333 256 512.042667 256z",
                    "p-id": "2787"
                  })
                ])),
                createVNode("p", null, "DD UED TEAM"),
                createVNode("p", { style: { "color": "#868a9a", "font-weight": "400" } }, "描述文案描述文案描述文案描述文案")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ${ssrInterpolate(content.value)}`);
          } else {
            return [
              createTextVNode(" " + toDisplayString(content.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Card/header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const header = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b2093ffe"]]);
export {
  header as default
};
