import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, unref, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo7",
  __ssrInlineRender: true,
  setup(__props) {
    const scrollContainer = top == null ? void 0 : top.document.querySelector("main.VPDoc");
    const curSize = ref("medium");
    const sizeOptions = ref([
      { label: "medium", value: "medium" },
      { label: "small", value: "small" }
    ]);
    const curMaxHeight = ref(260);
    const showTitleSuffix = ref(false);
    const lastFirstTitle = ref("倒数第一个导航title");
    const lastSecondTitle = ref("倒数第二个导航title");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_radio_group = resolveComponent("h-radio-group");
      const _component_h_radio = resolveComponent("h-radio");
      const _component_h_input_number = resolveComponent("h-input-number");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_input = resolveComponent("h-input");
      const _component_h_anchor = resolveComponent("h-anchor");
      const _component_h_anchor_link = resolveComponent("h-anchor-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wrapper" }, _attrs))} data-v-22648f38><div class="control-box" data-v-22648f38><strong data-v-22648f38>设置 组件尺寸:</strong>`);
      _push(ssrRenderComponent(_component_h_radio_group, {
        modelValue: curSize.value,
        "onUpdate:modelValue": ($event) => curSize.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(sizeOptions.value, (item) => {
              _push2(ssrRenderComponent(_component_h_radio, {
                key: item.value,
                label: item.value,
                size: "small"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(item.label)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item.label), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(sizeOptions.value, (item) => {
                return openBlock(), createBlock(_component_h_radio, {
                  key: item.value,
                  label: item.value,
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(item.label), 1)
                  ]),
                  _: 2
                }, 1032, ["label"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<br data-v-22648f38><strong data-v-22648f38>设置 容器的最大高度(px):</strong>`);
      _push(ssrRenderComponent(_component_h_input_number, {
        modelValue: curMaxHeight.value,
        "onUpdate:modelValue": ($event) => curMaxHeight.value = $event,
        precision: 0,
        step: 50
      }, null, _parent));
      _push(`<br data-v-22648f38><br data-v-22648f38><strong data-v-22648f38>设置 是否显示一级导航的数字后缀:</strong><br data-v-22648f38>`);
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: showTitleSuffix.value,
        "onUpdate:modelValue": ($event) => showTitleSuffix.value = $event,
        status: "",
        "status-on-text": "是",
        "status-off-text": "否"
      }, null, _parent));
      _push(`<br data-v-22648f38><br data-v-22648f38><strong data-v-22648f38>修改 倒数第二个导航title:</strong>`);
      _push(ssrRenderComponent(_component_h_input, {
        modelValue: lastSecondTitle.value,
        "onUpdate:modelValue": ($event) => lastSecondTitle.value = $event
      }, null, _parent));
      _push(`<br data-v-22648f38><br data-v-22648f38><strong data-v-22648f38>修改 倒数第一个导航title:</strong>`);
      _push(ssrRenderComponent(_component_h_input, {
        modelValue: lastFirstTitle.value,
        "onUpdate:modelValue": ($event) => lastFirstTitle.value = $event
      }, null, _parent));
      _push(`</div><div class="content-box" data-v-22648f38>`);
      _push(ssrRenderComponent(_component_h_anchor, {
        "scroll-container": unref(scrollContainer),
        size: curSize.value,
        "show-title-suffix": showTitleSuffix.value,
        "max-height": curMaxHeight.value,
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
              title: lastSecondTitle.value
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_anchor_link, {
              href: "#额外的使用场景",
              title: lastFirstTitle.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_anchor_link, {
                    href: "#sectionOne3",
                    title: "sectionOne3"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_anchor_link, {
                    href: "#sectionOne4",
                    title: "sectionOne4"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_anchor_link, {
                    href: "#sectionOne5",
                    title: "sectionOne5"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_anchor_link, {
                    href: "#sectionOne6",
                    title: "多行文本溢出多行文本溢出多行文本溢出"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_anchor_link, {
                      href: "#sectionOne3",
                      title: "sectionOne3"
                    }),
                    createVNode(_component_h_anchor_link, {
                      href: "#sectionOne4",
                      title: "sectionOne4"
                    }),
                    createVNode(_component_h_anchor_link, {
                      href: "#sectionOne5",
                      title: "sectionOne5"
                    }),
                    createVNode(_component_h_anchor_link, {
                      href: "#sectionOne6",
                      title: "多行文本溢出多行文本溢出多行文本溢出"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
                title: lastSecondTitle.value
              }, null, 8, ["title"]),
              createVNode(_component_h_anchor_link, {
                href: "#额外的使用场景",
                title: lastFirstTitle.value
              }, {
                default: withCtx(() => [
                  createVNode(_component_h_anchor_link, {
                    href: "#sectionOne3",
                    title: "sectionOne3"
                  }),
                  createVNode(_component_h_anchor_link, {
                    href: "#sectionOne4",
                    title: "sectionOne4"
                  }),
                  createVNode(_component_h_anchor_link, {
                    href: "#sectionOne5",
                    title: "sectionOne5"
                  }),
                  createVNode(_component_h_anchor_link, {
                    href: "#sectionOne6",
                    title: "多行文本溢出多行文本溢出多行文本溢出"
                  })
                ]),
                _: 1
              }, 8, ["title"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Anchor/demo7.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo7 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-22648f38"]]);
export {
  demo7 as default
};
