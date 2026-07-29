import { defineComponent, resolveComponent, withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createTextVNode, createCommentVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { i as dayjs } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "custom-date",
  __ssrInlineRender: true,
  setup(__props) {
    const today = dayjs().format("YYYY-MM-DD");
    const actionList = [
      {
        time: "09:00",
        text: "每日三省吾身之一"
      },
      {
        time: "09:10",
        text: "今天算了"
      },
      {
        time: "09:20",
        text: "还是省一下吧"
      },
      {
        time: "09:30",
        text: "每日三省吾身之一"
      },
      {
        time: "10:30",
        text: "每日三省吾身之二"
      },
      {
        time: "11:30",
        text: "每日三省吾身之三"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_calendar = resolveComponent("h-calendar");
      const _component_h_popover = resolveComponent("h-popover");
      const _component_h_pop_content = resolveComponent("h-pop-content");
      _push(ssrRenderComponent(_component_h_calendar, _attrs, {
        dateCellAppend: withCtx((dateFormat, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(today) === dateFormat) {
              _push2(`<div class="wrap"${_scopeId}><!--[-->`);
              ssrRenderList(actionList.slice(0, 3), (item) => {
                _push2(`<div class="row"${_scopeId}><div class="dot"${_scopeId}></div> ${ssrInterpolate(item.time)} ${ssrInterpolate(item.text)}</div>`);
              });
              _push2(`<!--]-->`);
              if (actionList.length > 3) {
                _push2(ssrRenderComponent(_component_h_popover, {
                  placement: "bottom-start",
                  arrow: false,
                  distance: 0
                }, {
                  reference: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="row desc"${_scopeId2}> 还有${ssrInterpolate(actionList.length - 3)}个日程 </div>`);
                    } else {
                      return [
                        createVNode("div", { class: "row desc" }, " 还有" + toDisplayString(actionList.length - 3) + "个日程 ", 1)
                      ];
                    }
                  }),
                  popper: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_h_pop_content, { class: "pop-content" }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="title"${_scopeId3}>${ssrInterpolate(unref(dayjs)().format("MM.DD dddd"))}</div><div class="content"${_scopeId3}><!--[-->`);
                            ssrRenderList(actionList.slice(3), (item) => {
                              _push4(`<div class="row"${_scopeId3}><div class="dot"${_scopeId3}></div> ${ssrInterpolate(item.time)} ${ssrInterpolate(item.text)}</div>`);
                            });
                            _push4(`<!--]--></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "title" }, toDisplayString(unref(dayjs)().format("MM.DD dddd")), 1),
                              createVNode("div", { class: "content" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(actionList.slice(3), (item) => {
                                  return openBlock(), createBlock("div", {
                                    key: item.time,
                                    class: "row"
                                  }, [
                                    createVNode("div", { class: "dot" }),
                                    createTextVNode(" " + toDisplayString(item.time) + " " + toDisplayString(item.text), 1)
                                  ]);
                                }), 128))
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_h_pop_content, { class: "pop-content" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "title" }, toDisplayString(unref(dayjs)().format("MM.DD dddd")), 1),
                            createVNode("div", { class: "content" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(actionList.slice(3), (item) => {
                                return openBlock(), createBlock("div", {
                                  key: item.time,
                                  class: "row"
                                }, [
                                  createVNode("div", { class: "dot" }),
                                  createTextVNode(" " + toDisplayString(item.time) + " " + toDisplayString(item.text), 1)
                                ]);
                              }), 128))
                            ])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(today) === dateFormat ? (openBlock(), createBlock("div", {
                key: 0,
                class: "wrap"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(actionList.slice(0, 3), (item) => {
                  return openBlock(), createBlock("div", {
                    key: item.time,
                    class: "row"
                  }, [
                    createVNode("div", { class: "dot" }),
                    createTextVNode(" " + toDisplayString(item.time) + " " + toDisplayString(item.text), 1)
                  ]);
                }), 128)),
                actionList.length > 3 ? (openBlock(), createBlock(_component_h_popover, {
                  key: 0,
                  placement: "bottom-start",
                  arrow: false,
                  distance: 0
                }, {
                  reference: withCtx(() => [
                    createVNode("div", { class: "row desc" }, " 还有" + toDisplayString(actionList.length - 3) + "个日程 ", 1)
                  ]),
                  popper: withCtx(() => [
                    createVNode(_component_h_pop_content, { class: "pop-content" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "title" }, toDisplayString(unref(dayjs)().format("MM.DD dddd")), 1),
                        createVNode("div", { class: "content" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(actionList.slice(3), (item) => {
                            return openBlock(), createBlock("div", {
                              key: item.time,
                              class: "row"
                            }, [
                              createVNode("div", { class: "dot" }),
                              createTextVNode(" " + toDisplayString(item.time) + " " + toDisplayString(item.text), 1)
                            ]);
                          }), 128))
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Calendar/custom-date.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
