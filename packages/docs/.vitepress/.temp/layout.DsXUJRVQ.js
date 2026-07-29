import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_pagination = resolveComponent("h-pagination");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_row, {
    gutter: 10,
    align: "middle"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>基础用法</div>`);
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "基础用法")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pagination, {
                total: 50,
                layout: "pager"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pagination, {
                  total: 50,
                  layout: "pager"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "基础用法")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 18 }, {
            default: withCtx(() => [
              createVNode(_component_h_pagination, {
                total: 50,
                layout: "pager"
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, {
    gutter: 10,
    align: "middle"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>+每页容量</div>`);
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "+每页容量")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pagination, {
                total: 100,
                layout: "pager, sizes"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pagination, {
                  total: 100,
                  layout: "pager, sizes"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "+每页容量")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 18 }, {
            default: withCtx(() => [
              createVNode(_component_h_pagination, {
                total: 100,
                layout: "pager, sizes"
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, {
    gutter: 10,
    align: "middle"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>+页面跳转</div>`);
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "+页面跳转")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pagination, {
                total: 100,
                layout: "pager, jumper"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pagination, {
                  total: 100,
                  layout: "pager, jumper"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "+页面跳转")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 18 }, {
            default: withCtx(() => [
              createVNode(_component_h_pagination, {
                total: 100,
                layout: "pager, jumper"
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, {
    gutter: 10,
    align: "middle"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>+总页数</div>`);
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "+总页数")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pagination, {
                total: 100,
                layout: "pager, total",
                "show-range": false
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pagination, {
                  total: 100,
                  layout: "pager, total",
                  "show-range": false
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "+总页数")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 18 }, {
            default: withCtx(() => [
              createVNode(_component_h_pagination, {
                total: 100,
                layout: "pager, total",
                "show-range": false
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, {
    gutter: 10,
    align: "middle"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>+每页容量+页面跳转</div>`);
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "+每页容量+页面跳转")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pagination, {
                total: 100,
                layout: "pager, sizes, jumper"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pagination, {
                  total: 100,
                  layout: "pager, sizes, jumper"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "+每页容量+页面跳转")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 18 }, {
            default: withCtx(() => [
              createVNode(_component_h_pagination, {
                total: 100,
                layout: "pager, sizes, jumper"
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, {
    gutter: 10,
    align: "middle"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>+每页容量+展示总数</div>`);
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "+每页容量+展示总数")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pagination, {
                total: 100,
                layout: ["pager", "sizes", "total"],
                "show-range": false
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pagination, {
                  total: 100,
                  layout: ["pager", "sizes", "total"],
                  "show-range": false
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "+每页容量+展示总数")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 18 }, {
            default: withCtx(() => [
              createVNode(_component_h_pagination, {
                total: 100,
                layout: ["pager", "sizes", "total"],
                "show-range": false
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, {
    gutter: 10,
    align: "middle"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>+页面跳转+展示总数</div>`);
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "+页面跳转+展示总数")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pagination, {
                total: 100,
                layout: "pager, jumper, total",
                "show-range": false
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pagination, {
                  total: 100,
                  layout: "pager, jumper, total",
                  "show-range": false
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "+页面跳转+展示总数")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 18 }, {
            default: withCtx(() => [
              createVNode(_component_h_pagination, {
                total: 100,
                layout: "pager, jumper, total",
                "show-range": false
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_row, {
    gutter: 10,
    align: "middle"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>全部展示</div>`);
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "全部展示")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 18 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_h_pagination, {
                total: 100,
                layout: "pager, jumper, total, sizes",
                "show-range": false
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_h_pagination, {
                  total: 100,
                  layout: "pager, jumper, total, sizes",
                  "show-range": false
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "全部展示")
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 18 }, {
            default: withCtx(() => [
              createVNode(_component_h_pagination, {
                total: 100,
                layout: "pager, jumper, total, sizes",
                "show-range": false
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Pagination/layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const layout = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  layout as default
};
