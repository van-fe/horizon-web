import { faker } from "@faker-js/faker";
import { defineComponent, ref, computed, onMounted, resolveComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, toDisplayString, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { q as __default__ } from "./app.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = defineComponent({
  name: "VirtualScrollerDemo",
  setup() {
    const items = ref([]);
    const kw = ref("");
    const tmpKw = ref("");
    function generateMessage() {
      return {
        avatar: "https://www.example.com/cdn-static/mydemo/nextjs/images/home/demoApp/demo-app-logo.png",
        message: faker.lorem.text()
      };
    }
    const filteredItems = computed(() => {
      let ret = [];
      if (!kw.value) ret = items.value;
      const lowerKw = kw.value.toLowerCase();
      ret = items.value.filter((i) => i.message.toLowerCase().includes(lowerKw));
      return ret;
    });
    onMounted(() => {
      for (let i = 0; i < 1e4; i++) {
        items.value.push({
          id: i,
          ...generateMessage()
        });
      }
    });
    function doSearch() {
      kw.value = tmpKw.value;
    }
    return {
      filteredItems,
      tmpKw,
      doSearch
    };
  },
  computed: {
    IconSearch() {
      return __default__;
    }
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_input = resolveComponent("h-input");
  const _component_h_button = resolveComponent("h-button");
  const _component_h_virtual_scroller = resolveComponent("h-virtual-scroller");
  const _component_h_virtual_scroller_item = resolveComponent("h-virtual-scroller-item");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "virtual-scroller-demo" }, _attrs))}><section class="toolbar">`);
  _push(ssrRenderComponent(_component_h_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 10 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_input, {
                modelValue: _ctx.tmpKw,
                "onUpdate:modelValue": ($event) => _ctx.tmpKw = $event,
                placeholder: "type kw to search"
              }, {
                append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_h_button, {
                      icon: _ctx.IconSearch,
                      size: "medium",
                      onClick: _ctx.doSearch
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_h_button, {
                        icon: _ctx.IconSearch,
                        size: "medium",
                        onClick: _ctx.doSearch
                      }, null, 8, ["icon", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_input, {
                  modelValue: _ctx.tmpKw,
                  "onUpdate:modelValue": ($event) => _ctx.tmpKw = $event,
                  placeholder: "type kw to search"
                }, {
                  append: withCtx(() => [
                    createVNode(_component_h_button, {
                      icon: _ctx.IconSearch,
                      size: "medium",
                      onClick: _ctx.doSearch
                    }, null, 8, ["icon", "onClick"])
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
                modelValue: _ctx.tmpKw,
                "onUpdate:modelValue": ($event) => _ctx.tmpKw = $event,
                placeholder: "type kw to search"
              }, {
                append: withCtx(() => [
                  createVNode(_component_h_button, {
                    icon: _ctx.IconSearch,
                    size: "medium",
                    onClick: _ctx.doSearch
                  }, null, 8, ["icon", "onClick"])
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
    class: "scroller",
    items: _ctx.filteredItems,
    "min-item-size": 54
  }, {
    before: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="notice"${_scopeId}>这是一个消息列表, 我们并不清楚任意一个消息元素的高度~</div>`);
      } else {
        return [
          createVNode("div", { class: "notice" }, "这是一个消息列表, 我们并不清楚任意一个消息元素的高度~")
        ];
      }
    }),
    after: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="notice"${_scopeId}>已经没有更多了~</div>`);
      } else {
        return [
          createVNode("div", { class: "notice" }, "已经没有更多了~")
        ];
      }
    }),
    empty: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`no data yet~!`);
      } else {
        return [
          createTextVNode("no data yet~!")
        ];
      }
    }),
    default: withCtx(({ item, active, index }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_virtual_scroller_item, {
          item,
          active,
          "data-active": active,
          "data-index": index,
          "size-dependencies": [item.message],
          title: `Click to change message ${index}`,
          class: "message"
        }, {
          default: withCtx((_, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="avatar"${_scopeId2}><img${ssrRenderAttr("src", item.avatar)} alt="avatar" class="image"${_scopeId2}></div><div class="text"${_scopeId2}>${ssrInterpolate(item.message)}</div><div class="index"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(item.id)} (id)</span><span${_scopeId2}>${ssrInterpolate(index)} (index)</span></div>`);
            } else {
              return [
                createVNode("div", { class: "avatar" }, [
                  (openBlock(), createBlock("img", {
                    key: item.avatar,
                    src: item.avatar,
                    alt: "avatar",
                    class: "image"
                  }, null, 8, ["src"]))
                ]),
                createVNode("div", { class: "text" }, toDisplayString(item.message), 1),
                createVNode("div", { class: "index" }, [
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
            "data-active": active,
            "data-index": index,
            "size-dependencies": [item.message],
            title: `Click to change message ${index}`,
            class: "message"
          }, {
            default: withCtx(() => [
              createVNode("div", { class: "avatar" }, [
                (openBlock(), createBlock("img", {
                  key: item.avatar,
                  src: item.avatar,
                  alt: "avatar",
                  class: "image"
                }, null, 8, ["src"]))
              ]),
              createVNode("div", { class: "text" }, toDisplayString(item.message), 1),
              createVNode("div", { class: "index" }, [
                createVNode("span", null, toDisplayString(item.id) + " (id)", 1),
                createVNode("span", null, toDisplayString(index) + " (index)", 1)
              ])
            ]),
            _: 2
          }, 1032, ["item", "active", "data-active", "data-index", "size-dependencies", "title"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/VirtualScroller/VirtualScrollerDemo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const VirtualScrollerDemo = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  VirtualScrollerDemo as default
};
