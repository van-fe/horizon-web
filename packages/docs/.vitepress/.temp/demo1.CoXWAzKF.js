import { defineComponent, reactive, ref, resolveComponent, withCtx, createTextVNode, unref, createVNode, createBlock, openBlock, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { A as HListItem } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo1",
  __ssrInlineRender: true,
  setup(__props) {
    const list = reactive(
      Array(10).fill("").map((item, index) => {
        return {
          title: "This is Title" + item,
          subtitle: "Subhead" + item,
          describe: `${index}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat eget ipsum vel blandit. Nam sed enim orci. Vivamus non eros at ex varius luctus. Pellentesque blandit molestie leo, vel vulputate mi vehicula ac. Etiam dignissim arcu eget felis egestas cursus. Pellentesque tempus sollicitudin nulla at hendrerit.`
        };
      })
    );
    const changeTitleSize = () => {
      titleSize.value = titleSize.value === "medium" ? "small" : "medium";
    };
    const isZebra = ref(true);
    const isBorder = ref(false);
    const isSplit = ref(false);
    const titleSize = ref("medium");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_list = resolveComponent("h-list");
      const _component_h_image = resolveComponent("h-image");
      _push(`<!--[--><div class="mb-4" data-v-29af9d0d>`);
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: isZebra.value,
        "onUpdate:modelValue": ($event) => isZebra.value = $event,
        label: "是否斑马纹",
        class: "switch"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: isBorder.value,
        "onUpdate:modelValue": ($event) => isBorder.value = $event,
        label: "是否显示边框",
        class: "switch"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: isSplit.value,
        "onUpdate:modelValue": ($event) => isSplit.value = $event,
        label: "是否显示分界线",
        class: "switch"
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        size: "medium",
        type: "primary",
        class: "switch",
        onClick: changeTitleSize
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 切换标题size `);
          } else {
            return [
              createTextVNode(" 切换标题size ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_h_list, {
        data: list,
        "max-height": 400,
        zebra: isZebra.value,
        "is-border": isBorder.value,
        split: isSplit.value
      }, {
        item: withCtx(({ item, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(HListItem), {
              key: index,
              title: item.title,
              describe: item.describe,
              subtitle: item.subtitle,
              "title-size": titleSize.value
            }, {
              sider: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_image, {
                    src: "https://source.demohome.com//MyNextEv/image/cutting/672C4D53B6559FFFF2A0523B21D36B35.jpg",
                    "object-fit": "cover",
                    width: 50,
                    height: 50
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_image, {
                      src: "https://source.demohome.com//MyNextEv/image/cutting/672C4D53B6559FFFF2A0523B21D36B35.jpg",
                      "object-fit": "cover",
                      width: 50,
                      height: 50
                    })
                  ];
                }
              }),
              right: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<section class="list-right" data-v-29af9d0d${_scopeId2}><section data-v-29af9d0d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_button, {
                    size: "medium",
                    plain: true,
                    class: "list-btn"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`撤销`);
                      } else {
                        return [
                          createTextVNode("撤销")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_button, {
                    size: "medium",
                    type: "primary"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`提交`);
                      } else {
                        return [
                          createTextVNode("提交")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</section></section>`);
                } else {
                  return [
                    createVNode("section", { class: "list-right" }, [
                      createVNode("section", null, [
                        createVNode(_component_h_button, {
                          size: "medium",
                          plain: true,
                          class: "list-btn"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("撤销")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_h_button, {
                          size: "medium",
                          type: "primary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("提交")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              (openBlock(), createBlock(unref(HListItem), {
                key: index,
                title: item.title,
                describe: item.describe,
                subtitle: item.subtitle,
                "title-size": titleSize.value
              }, {
                sider: withCtx(() => [
                  createVNode(_component_h_image, {
                    src: "https://source.demohome.com//MyNextEv/image/cutting/672C4D53B6559FFFF2A0523B21D36B35.jpg",
                    "object-fit": "cover",
                    width: 50,
                    height: 50
                  })
                ]),
                right: withCtx(() => [
                  createVNode("section", { class: "list-right" }, [
                    createVNode("section", null, [
                      createVNode(_component_h_button, {
                        size: "medium",
                        plain: true,
                        class: "list-btn"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("撤销")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_h_button, {
                        size: "medium",
                        type: "primary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("提交")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["title", "describe", "subtitle", "title-size"]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/List/demo1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-29af9d0d"]]);
export {
  demo1 as default
};
