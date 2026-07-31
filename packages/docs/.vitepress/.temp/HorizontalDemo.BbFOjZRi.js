import { defineComponent, ref, computed, resolveComponent, mergeProps, withCtx, unref, createVNode, createBlock, openBlock, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
import { q as __default__ } from "./app.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HorizontalDemo",
  __ssrInlineRender: true,
  setup(__props) {
    const items = ref([]);
    const kw = ref("");
    const tmpKw = ref("");
    const filteredItems = computed(() => {
      let ret = [];
      if (!kw.value) ret = items.value;
      const lowerKw = kw.value.toLowerCase();
      ret = items.value.filter((i) => i.message.toLowerCase().includes(lowerKw));
      return ret;
    });
    function generateItems() {
      for (let i = 0; i < 1e4; i++) {
        items.value.push({
          id: i + "_sjifeji",
          message: faker.lorem.text(),
          avatar: "/demo-assets/avatar-indigo.svg"
        });
      }
    }
    function doSearch() {
      kw.value = tmpKw.value;
    }
    generateItems();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_input = resolveComponent("h-input");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_virtual_scroller = resolveComponent("h-virtual-scroller");
      const _component_h_virtual_scroller_item = resolveComponent("h-virtual-scroller-item");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "virtual-scroller-horizontal" }, _attrs))} data-v-eb1eb070><section class="toolbar" data-v-eb1eb070>`);
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 10 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_input, {
                    modelValue: tmpKw.value,
                    "onUpdate:modelValue": ($event) => tmpKw.value = $event,
                    placeholder: "type kw to search"
                  }, {
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_button, {
                          icon: unref(__default__),
                          size: "medium",
                          type: "info",
                          onClick: doSearch
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_button, {
                            icon: unref(__default__),
                            size: "medium",
                            type: "info",
                            onClick: doSearch
                          }, null, 8, ["icon"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_input, {
                      modelValue: tmpKw.value,
                      "onUpdate:modelValue": ($event) => tmpKw.value = $event,
                      placeholder: "type kw to search"
                    }, {
                      append: withCtx(() => [
                        createVNode(_component_h_button, {
                          icon: unref(__default__),
                          size: "medium",
                          type: "info",
                          onClick: doSearch
                        }, null, 8, ["icon"])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 20 }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 10 }, {
                default: withCtx(() => [
                  createVNode(_component_h_input, {
                    modelValue: tmpKw.value,
                    "onUpdate:modelValue": ($event) => tmpKw.value = $event,
                    placeholder: "type kw to search"
                  }, {
                    append: withCtx(() => [
                      createVNode(_component_h_button, {
                        icon: unref(__default__),
                        size: "medium",
                        type: "info",
                        onClick: doSearch
                      }, null, 8, ["icon"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 20 })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
      _push(ssrRenderComponent(_component_h_virtual_scroller, {
        items: filteredItems.value,
        "min-item-size": 54,
        direction: "horizontal",
        "scroller-height": 500,
        class: "scroller-h"
      }, {
        default: withCtx(({ item, index, active }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_virtual_scroller_item, {
              item,
              active,
              title: `Click to change message ${index}`,
              style: {
                width: `${Math.max(130, Math.round(item.message.length / 20 * 20))}px`
              },
              class: "message-h"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="avatar-h" data-v-eb1eb070${_scopeId2}><img${ssrRenderAttr("src", item.avatar)} alt="avatar" class="image-h" data-v-eb1eb070${_scopeId2}></div><div class="text-h" data-v-eb1eb070${_scopeId2}>${ssrInterpolate(item.message)}</div><div class="index-h" data-v-eb1eb070${_scopeId2}><span data-v-eb1eb070${_scopeId2}>${ssrInterpolate(item.id)} (id)</span><span data-v-eb1eb070${_scopeId2}>${ssrInterpolate(index)} (index)</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "avatar-h" }, [
                      (openBlock(), createBlock("img", {
                        key: item.avatar,
                        src: item.avatar,
                        alt: "avatar",
                        class: "image-h"
                      }, null, 8, ["src"]))
                    ]),
                    createVNode("div", { class: "text-h" }, toDisplayString(item.message), 1),
                    createVNode("div", { class: "index-h" }, [
                      createVNode("span", null, toDisplayString(item.id) + " (id)", 1),
                      createVNode("span", null, toDisplayString(index) + " (index)", 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_virtual_scroller_item, {
                item,
                active,
                title: `Click to change message ${index}`,
                style: {
                  width: `${Math.max(130, Math.round(item.message.length / 20 * 20))}px`
                },
                class: "message-h"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "avatar-h" }, [
                    (openBlock(), createBlock("img", {
                      key: item.avatar,
                      src: item.avatar,
                      alt: "avatar",
                      class: "image-h"
                    }, null, 8, ["src"]))
                  ]),
                  createVNode("div", { class: "text-h" }, toDisplayString(item.message), 1),
                  createVNode("div", { class: "index-h" }, [
                    createVNode("span", null, toDisplayString(item.id) + " (id)", 1),
                    createVNode("span", null, toDisplayString(index) + " (index)", 1)
                  ])
                ]),
                _: 2
              }, 1032, ["item", "active", "title", "style"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/VirtualScroller/HorizontalDemo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HorizontalDemo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb1eb070"]]);
export {
  HorizontalDemo as default
};
