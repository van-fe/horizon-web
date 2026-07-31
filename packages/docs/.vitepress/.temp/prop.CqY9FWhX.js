import { defineComponent, ref, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const timelineData = ref([
      {
        name: "Current milestone",
        time: "03/02/2021"
      },
      {
        name: "The third milestone",
        time: "03/02/2021"
      },
      {
        name: "The second milestone",
        time: "03/02/2021"
      },
      {
        name: "The first milestone",
        time: "03/02/2021"
      }
    ]);
    const foldConfig = ref({
      number: 2,
      content: "Show hidden events （2）",
      dot: {
        type: "circle",
        icon: "arrow_down",
        color: "#242629",
        borderColor: "#E9EAEC"
      }
    });
    return {
      timelineData,
      foldConfig
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_timeline = resolveComponent("h-timeline");
  const _component_h_timeline_item = resolveComponent("h-timeline-item");
  const _component_h_avatar = resolveComponent("h-avatar");
  const _component_h_tag = resolveComponent("h-tag");
  const _component_h_image = resolveComponent("h-image");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-fc647c4b><div class="container" data-v-fc647c4b><div class="container__block" data-v-fc647c4b><div class="container__title" data-v-fc647c4b> 添加描述信息 <div data-v-fc647c4b>可根据节点内容，自定义节点文本内容；</div></div>`);
  _push(ssrRenderComponent(_component_h_timeline, {
    first: { color: "var(--h-bg-brand-default)" },
    style: { "width": "270px" }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          timestamp: "03/02/2021",
          desc: "Demo installed its 700th battery swap station in China, hitting its annual target ahead of schedule."
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The third milestone",
          timestamp: "03/02/2021"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The second milestone",
          timestamp: "03/02/2021"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The first milestone",
          timestamp: "03/02/2021",
          tail: false
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            timestamp: "03/02/2021",
            desc: "Demo installed its 700th battery swap station in China, hitting its annual target ahead of schedule."
          }),
          createVNode(_component_h_timeline_item, {
            name: "The third milestone",
            timestamp: "03/02/2021"
          }),
          createVNode(_component_h_timeline_item, {
            name: "The second milestone",
            timestamp: "03/02/2021"
          }),
          createVNode(_component_h_timeline_item, {
            name: "The first milestone",
            timestamp: "03/02/2021",
            tail: false
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="container__block" data-v-fc647c4b><div class="container__title" data-v-fc647c4b> ⾃定义时间戳 <div data-v-fc647c4b> 时间有三种排列方式：置顶、置右、置下 <br data-v-fc647c4b> 可以将时间格式化 </div></div><div class="container" data-v-fc647c4b>`);
  _push(ssrRenderComponent(_component_h_timeline, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The third milestone",
          timestamp: "03/02/2021 14:32",
          placement: "top"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The second milestone",
          timestamp: "03/02/2021 14:32"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The first milestone",
          timestamp: "03/02/2021 14:32",
          placement: "right"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The first milestone",
          timestamp: "03/02/2021 14:32",
          placement: "right",
          format: "mm/dd/yyyy h:i",
          tail: false
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_timeline_item, {
            name: "The third milestone",
            timestamp: "03/02/2021 14:32",
            placement: "top"
          }),
          createVNode(_component_h_timeline_item, {
            name: "The second milestone",
            timestamp: "03/02/2021 14:32"
          }),
          createVNode(_component_h_timeline_item, {
            name: "The first milestone",
            timestamp: "03/02/2021 14:32",
            placement: "right"
          }),
          createVNode(_component_h_timeline_item, {
            name: "The first milestone",
            timestamp: "03/02/2021 14:32",
            placement: "right",
            format: "mm/dd/yyyy h:i",
            tail: false
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div><div class="container__block" data-v-fc647c4b><div class="container__title" data-v-fc647c4b> 自定义时间顺序 <div data-v-fc647c4b>可以按照时间顺序/逆序展示</div></div><div class="container" data-v-fc647c4b>`);
  _push(ssrRenderComponent(_component_h_timeline, {
    sort: "order",
    first: { color: "var(--h-bg-brand-default)" }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          timestamp: "03/05/2021",
          placement: "top",
          tail: false
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The first milestone",
          timestamp: "03/02/2021",
          placement: "top"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The second milestone",
          timestamp: "03/03/2021",
          placement: "top"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The third milestone",
          timestamp: "03/04/2021",
          placement: "top"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            timestamp: "03/05/2021",
            placement: "top",
            tail: false
          }),
          createVNode(_component_h_timeline_item, {
            name: "The first milestone",
            timestamp: "03/02/2021",
            placement: "top"
          }),
          createVNode(_component_h_timeline_item, {
            name: "The second milestone",
            timestamp: "03/03/2021",
            placement: "top"
          }),
          createVNode(_component_h_timeline_item, {
            name: "The third milestone",
            timestamp: "03/04/2021",
            placement: "top"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_timeline, {
    sort: "reverse",
    first: { color: "var(--h-bg-brand-default)" }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          timestamp: "03/05/2021",
          placement: "top"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The first milestone",
          timestamp: "03/02/2021",
          placement: "top",
          tail: false
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The second milestone",
          timestamp: "03/03/2021",
          placement: "top"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The third milestone",
          timestamp: "03/04/2021",
          placement: "top"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            timestamp: "03/05/2021",
            placement: "top"
          }),
          createVNode(_component_h_timeline_item, {
            name: "The first milestone",
            timestamp: "03/02/2021",
            placement: "top",
            tail: false
          }),
          createVNode(_component_h_timeline_item, {
            name: "The second milestone",
            timestamp: "03/03/2021",
            placement: "top"
          }),
          createVNode(_component_h_timeline_item, {
            name: "The third milestone",
            timestamp: "03/04/2021",
            placement: "top"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div><div class="container" data-v-fc647c4b><div class="container__block" data-v-fc647c4b><div class="container__title" data-v-fc647c4b> 自定义节点样式 <div data-v-fc647c4b>可根据实际业务情况，自定义节点内容，如错误、预警、成功签收等状态；</div></div><div class="container" data-v-fc647c4b>`);
  _push(ssrRenderComponent(_component_h_timeline, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          timestamp: "03/02/2021",
          placement: "top",
          color: "var(--h-bg-brand-default)"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "An unknown error has occurred",
          timestamp: "03/02/2021",
          placement: "top",
          color: "var(--h-bg-error-default)"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The second milestone",
          timestamp: "03/02/2021",
          placement: "top",
          color: "var(--h-bg-warning-default)"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The second milestone",
          timestamp: "03/02/2021",
          placement: "top",
          color: "var(--h-bg-success-default)"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "The first milestone",
          timestamp: "03/02/2021",
          placement: "top",
          tail: false
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            timestamp: "03/02/2021",
            placement: "top",
            color: "var(--h-bg-brand-default)"
          }),
          createVNode(_component_h_timeline_item, {
            name: "An unknown error has occurred",
            timestamp: "03/02/2021",
            placement: "top",
            color: "var(--h-bg-error-default)"
          }),
          createVNode(_component_h_timeline_item, {
            name: "The second milestone",
            timestamp: "03/02/2021",
            placement: "top",
            color: "var(--h-bg-warning-default)"
          }),
          createVNode(_component_h_timeline_item, {
            name: "The second milestone",
            timestamp: "03/02/2021",
            placement: "top",
            color: "var(--h-bg-success-default)"
          }),
          createVNode(_component_h_timeline_item, {
            name: "The first milestone",
            timestamp: "03/02/2021",
            placement: "top",
            tail: false
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_timeline, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          size: "large",
          timestamp: "03/02/2021",
          placement: "top",
          color: "var(--h-bg-brand-default)",
          icon: "email",
          offset: "8"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          size: "large",
          timestamp: "03/02/2021",
          placement: "top",
          color: "var(--h-bg-error-default)",
          icon: "close",
          offset: "8"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          size: "large",
          timestamp: "03/02/2021",
          placement: "top",
          color: "var(--h-bg-warning-default)",
          icon: "light_on",
          offset: "8"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          size: "large",
          timestamp: "03/02/2021",
          placement: "top",
          color: "var(--h-bg-success-default)",
          icon: "check",
          offset: "8"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          size: "large",
          timestamp: "03/02/2021",
          placement: "top",
          color: "#242629",
          icon: "check",
          type: "circle",
          offset: "8",
          tail: false
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            size: "large",
            timestamp: "03/02/2021",
            placement: "top",
            color: "var(--h-bg-brand-default)",
            icon: "email",
            offset: "8"
          }),
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            size: "large",
            timestamp: "03/02/2021",
            placement: "top",
            color: "var(--h-bg-error-default)",
            icon: "close",
            offset: "8"
          }),
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            size: "large",
            timestamp: "03/02/2021",
            placement: "top",
            color: "var(--h-bg-warning-default)",
            icon: "light_on",
            offset: "8"
          }),
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            size: "large",
            timestamp: "03/02/2021",
            placement: "top",
            color: "var(--h-bg-success-default)",
            icon: "check",
            offset: "8"
          }),
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            size: "large",
            timestamp: "03/02/2021",
            placement: "top",
            color: "#242629",
            icon: "check",
            type: "circle",
            offset: "8",
            tail: false
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div><div class="container__block" data-v-fc647c4b><div class="container__title" data-v-fc647c4b> 自定义节点内容 <div data-v-fc647c4b>可根据实际业务情况，自定义节点内容，如内文、图片、回复等；</div></div>`);
  _push(ssrRenderComponent(_component_h_timeline, { class: "timeline-slot" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          placement: "top",
          timestamp: "03/02/2021",
          color: "var(--h-bg-brand-default)"
        }, {
          name: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="timeline-title-slot" data-v-fc647c4b${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_h_avatar, { size: "mini" }, null, _parent3, _scopeId2));
              _push3(`<div class="timeline-title-slot__name" data-v-fc647c4b${_scopeId2}>Wanqi peng</div>`);
              _push3(ssrRenderComponent(_component_h_tag, {
                type: "hollow",
                color: "#242629",
                major: "",
                size: "small"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Fellow`);
                  } else {
                    return [
                      createTextVNode("Fellow")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createVNode("div", { class: "timeline-title-slot" }, [
                  createVNode(_component_h_avatar, { size: "mini" }),
                  createVNode("div", { class: "timeline-title-slot__name" }, "Wanqi peng"),
                  createVNode(_component_h_tag, {
                    type: "hollow",
                    color: "#242629",
                    major: "",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Fellow")
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          desc: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div data-v-fc647c4b${_scopeId2}> Demo installed its 700th battery swap station in China, <br data-v-fc647c4b${_scopeId2}> hitting its annual target ahead of schedule. </div><div style="${ssrRenderStyle({ "display": "flex" })}" data-v-fc647c4b${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_h_image, {
                src: "/demo-assets/scene-aurora.svg",
                class: "mr-1 mt-2",
                width: 40,
                height: 40
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_image, {
                src: "/demo-assets/scene-coast.svg",
                class: "mr-1 mt-2",
                width: 40,
                height: 40
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_h_image, {
                src: "/demo-assets/scene-city.svg",
                class: "mr-1 mt-2",
                width: 40,
                height: 40
              }, null, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createVNode("div", null, [
                  createTextVNode(" Demo installed its 700th battery swap station in China, "),
                  createVNode("br"),
                  createTextVNode(" hitting its annual target ahead of schedule. ")
                ]),
                createVNode("div", { style: { "display": "flex" } }, [
                  createVNode(_component_h_image, {
                    src: "/demo-assets/scene-aurora.svg",
                    class: "mr-1 mt-2",
                    width: 40,
                    height: 40
                  }),
                  createVNode(_component_h_image, {
                    src: "/demo-assets/scene-coast.svg",
                    class: "mr-1 mt-2",
                    width: 40,
                    height: 40
                  }),
                  createVNode(_component_h_image, {
                    src: "/demo-assets/scene-city.svg",
                    class: "mr-1 mt-2",
                    width: 40,
                    height: 40
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          placement: "top",
          timestamp: "03/02/2021"
        }, {
          name: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="timeline-title-slot" data-v-fc647c4b${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_h_avatar, { size: "mini" }, null, _parent3, _scopeId2));
              _push3(`<div class="timeline-title-slot__name" data-v-fc647c4b${_scopeId2}>Wanqi peng</div>`);
              _push3(ssrRenderComponent(_component_h_tag, {
                type: "hollow",
                color: "#242629",
                major: "",
                size: "small"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Fellow`);
                  } else {
                    return [
                      createTextVNode("Fellow")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createVNode("div", { class: "timeline-title-slot" }, [
                  createVNode(_component_h_avatar, { size: "mini" }),
                  createVNode("div", { class: "timeline-title-slot__name" }, "Wanqi peng"),
                  createVNode(_component_h_tag, {
                    type: "hollow",
                    color: "#242629",
                    major: "",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Fellow")
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          desc: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div data-v-fc647c4b${_scopeId2}> Demo installed its 700th battery swap station in China, <br data-v-fc647c4b${_scopeId2}> hitting its annual target ahead of schedule. </div>`);
            } else {
              return [
                createVNode("div", null, [
                  createTextVNode(" Demo installed its 700th battery swap station in China, "),
                  createVNode("br"),
                  createTextVNode(" hitting its annual target ahead of schedule. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          placement: "right",
          timestamp: "03/02/2021",
          color: "var(--h-bg-brand-default)",
          tail: false
        }, {
          name: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="timeline-title-slot" data-v-fc647c4b${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_h_avatar, { size: "mini" }, null, _parent3, _scopeId2));
              _push3(`<div class="timeline-title-slot__name" data-v-fc647c4b${_scopeId2}>Wanqi peng</div>`);
              _push3(ssrRenderComponent(_component_h_tag, {
                type: "hollow",
                color: "#242629",
                major: "",
                size: "small"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Fellow`);
                  } else {
                    return [
                      createTextVNode("Fellow")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`<div class="timeline-title-slot__action" data-v-fc647c4b${_scopeId2}>Add follow-up note</div></div>`);
            } else {
              return [
                createVNode("div", { class: "timeline-title-slot" }, [
                  createVNode(_component_h_avatar, { size: "mini" }),
                  createVNode("div", { class: "timeline-title-slot__name" }, "Wanqi peng"),
                  createVNode(_component_h_tag, {
                    type: "hollow",
                    color: "#242629",
                    major: "",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Fellow")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "timeline-title-slot__action" }, "Add follow-up note")
                ])
              ];
            }
          }),
          desc: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div data-v-fc647c4b${_scopeId2}> Demo installed its 700th battery swap station in China, <br data-v-fc647c4b${_scopeId2}> hitting its annual target ahead of schedule. </div>`);
            } else {
              return [
                createVNode("div", null, [
                  createTextVNode(" Demo installed its 700th battery swap station in China, "),
                  createVNode("br"),
                  createTextVNode(" hitting its annual target ahead of schedule. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_timeline_item, {
            placement: "top",
            timestamp: "03/02/2021",
            color: "var(--h-bg-brand-default)"
          }, {
            name: withCtx(() => [
              createVNode("div", { class: "timeline-title-slot" }, [
                createVNode(_component_h_avatar, { size: "mini" }),
                createVNode("div", { class: "timeline-title-slot__name" }, "Wanqi peng"),
                createVNode(_component_h_tag, {
                  type: "hollow",
                  color: "#242629",
                  major: "",
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Fellow")
                  ]),
                  _: 1
                })
              ])
            ]),
            desc: withCtx(() => [
              createVNode("div", null, [
                createTextVNode(" Demo installed its 700th battery swap station in China, "),
                createVNode("br"),
                createTextVNode(" hitting its annual target ahead of schedule. ")
              ]),
              createVNode("div", { style: { "display": "flex" } }, [
                createVNode(_component_h_image, {
                  src: "/demo-assets/scene-aurora.svg",
                  class: "mr-1 mt-2",
                  width: 40,
                  height: 40
                }),
                createVNode(_component_h_image, {
                  src: "/demo-assets/scene-coast.svg",
                  class: "mr-1 mt-2",
                  width: 40,
                  height: 40
                }),
                createVNode(_component_h_image, {
                  src: "/demo-assets/scene-city.svg",
                  class: "mr-1 mt-2",
                  width: 40,
                  height: 40
                })
              ])
            ]),
            _: 1
          }),
          createVNode(_component_h_timeline_item, {
            placement: "top",
            timestamp: "03/02/2021"
          }, {
            name: withCtx(() => [
              createVNode("div", { class: "timeline-title-slot" }, [
                createVNode(_component_h_avatar, { size: "mini" }),
                createVNode("div", { class: "timeline-title-slot__name" }, "Wanqi peng"),
                createVNode(_component_h_tag, {
                  type: "hollow",
                  color: "#242629",
                  major: "",
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Fellow")
                  ]),
                  _: 1
                })
              ])
            ]),
            desc: withCtx(() => [
              createVNode("div", null, [
                createTextVNode(" Demo installed its 700th battery swap station in China, "),
                createVNode("br"),
                createTextVNode(" hitting its annual target ahead of schedule. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_h_timeline_item, {
            placement: "right",
            timestamp: "03/02/2021",
            color: "var(--h-bg-brand-default)",
            tail: false
          }, {
            name: withCtx(() => [
              createVNode("div", { class: "timeline-title-slot" }, [
                createVNode(_component_h_avatar, { size: "mini" }),
                createVNode("div", { class: "timeline-title-slot__name" }, "Wanqi peng"),
                createVNode(_component_h_tag, {
                  type: "hollow",
                  color: "#242629",
                  major: "",
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Fellow")
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "timeline-title-slot__action" }, "Add follow-up note")
              ])
            ]),
            desc: withCtx(() => [
              createVNode("div", null, [
                createTextVNode(" Demo installed its 700th battery swap station in China, "),
                createVNode("br"),
                createTextVNode(" hitting its annual target ahead of schedule. ")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="container__block" data-v-fc647c4b><div class="container__title" data-v-fc647c4b> 表达步骤感的混合时间轴 <div data-v-fc647c4b> 实线显示已发生的时间节点，虚线显示未发生的时间节点。一般已经发生的步骤再上，步骤过多，可折叠。 </div></div>`);
  _push(ssrRenderComponent(_component_h_timeline, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          size: "large",
          timestamp: "03/02/2021",
          color: "var(--h-bg-brand-default)",
          "border-color": "var(--h-bg-brand-default)",
          icon: "check",
          type: "circle",
          desc: "you can fold the dot",
          "fold-config": _ctx.foldConfig
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          size: "large",
          timestamp: "03/02/2021",
          placement: "top",
          color: "var(--h-bg-brand-default)",
          "border-color": "var(--h-bg-brand-default)",
          icon: "check",
          type: "circle"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          size: "large",
          timestamp: "03/02/2021",
          placement: "top",
          color: "var(--h-bg-brand-default)",
          "border-color": "var(--h-bg-brand-default)",
          icon: "check",
          type: "circle"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          size: "large",
          timestamp: "03/02/2021",
          placement: "top",
          color: "var(--h-bg-brand-default)",
          dashed: "",
          offset: "0"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          timestamp: "03/02/2021",
          placement: "top",
          dashed: "",
          offset: "0"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          timestamp: "03/02/2021",
          placement: "top",
          dashed: "",
          offset: "0"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_timeline_item, {
          name: "Current milestone",
          timestamp: "03/02/2021",
          placement: "top",
          dashed: "",
          offset: "0"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            size: "large",
            timestamp: "03/02/2021",
            color: "var(--h-bg-brand-default)",
            "border-color": "var(--h-bg-brand-default)",
            icon: "check",
            type: "circle",
            desc: "you can fold the dot",
            "fold-config": _ctx.foldConfig
          }, null, 8, ["fold-config"]),
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            size: "large",
            timestamp: "03/02/2021",
            placement: "top",
            color: "var(--h-bg-brand-default)",
            "border-color": "var(--h-bg-brand-default)",
            icon: "check",
            type: "circle"
          }),
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            size: "large",
            timestamp: "03/02/2021",
            placement: "top",
            color: "var(--h-bg-brand-default)",
            "border-color": "var(--h-bg-brand-default)",
            icon: "check",
            type: "circle"
          }),
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            size: "large",
            timestamp: "03/02/2021",
            placement: "top",
            color: "var(--h-bg-brand-default)",
            dashed: "",
            offset: "0"
          }),
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            timestamp: "03/02/2021",
            placement: "top",
            dashed: "",
            offset: "0"
          }),
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            timestamp: "03/02/2021",
            placement: "top",
            dashed: "",
            offset: "0"
          }),
          createVNode(_component_h_timeline_item, {
            name: "Current milestone",
            timestamp: "03/02/2021",
            placement: "top",
            dashed: "",
            offset: "0"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Timeline/prop.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const prop = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-fc647c4b"]]);
export {
  prop as default
};
