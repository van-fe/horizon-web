import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "content",
  __ssrInlineRender: true,
  setup(__props) {
    const tab = ref("label1");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_card = resolveComponent("h-card");
      const _component_h_tabs = resolveComponent("h-tabs");
      const _component_h_tab = resolveComponent("h-tab");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))} data-v-9d84e7ec>`);
      _push(ssrRenderComponent(_component_h_card, { title: "标题" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="content-img" src="https://static.example.com/fx-static/card-component/clbu60ecm0000072w2izw1wsp/img.png" alt="" data-v-9d84e7ec${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                class: "content-img",
                src: "https://static.example.com/fx-static/card-component/clbu60ecm0000072w2izw1wsp/img.png",
                alt: ""
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="list" data-v-9d84e7ec${_scopeId}><!--[-->`);
            ssrRenderList(3, (item) => {
              _push2(`<li data-v-9d84e7ec${_scopeId}><h4 data-v-9d84e7ec${_scopeId}>标题</h4><p data-v-9d84e7ec${_scopeId}> 卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。 </p></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "list" }, [
                (openBlock(), createBlock(Fragment, null, renderList(3, (item) => {
                  return createVNode("li", { key: item }, [
                    createVNode("h4", null, "标题"),
                    createVNode("p", null, " 卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。 ")
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_card, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_tabs, {
              size: "medium",
              modelValue: tab.value,
              "onUpdate:modelValue": ($event) => tab.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_tab, {
                    label: "标签一",
                    name: "label1"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tab, {
                    label: "标签二",
                    name: "label2"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_tab, {
                    label: "标签三",
                    name: "label3"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_tab, {
                      label: "标签一",
                      name: "label1"
                    }),
                    createVNode(_component_h_tab, {
                      label: "标签二",
                      name: "label2"
                    }),
                    createVNode(_component_h_tab, {
                      label: "标签三",
                      name: "label3"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_tabs, {
                size: "medium",
                modelValue: tab.value,
                "onUpdate:modelValue": ($event) => tab.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_tab, {
                    label: "标签一",
                    name: "label1"
                  }),
                  createVNode(_component_h_tab, {
                    label: "标签二",
                    name: "label2"
                  }),
                  createVNode(_component_h_tab, {
                    label: "标签三",
                    name: "label3"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-9d84e7ec${_scopeId}> 这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段长很长很长很长很长很长很的内容文案 </p>`);
          } else {
            return [
              createVNode("p", null, " 这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段长很长很长很长很长很长很的内容文案 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Card/content.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const content = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9d84e7ec"]]);
export {
  content as default
};
