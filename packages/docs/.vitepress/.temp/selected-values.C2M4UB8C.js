import { defineComponent, ref, onMounted, resolveComponent, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "selected-values",
  __ssrInlineRender: true,
  setup(__props) {
    const baseTreeData = ref([]);
    const selectedValues = [
      ref(["feedback"]),
      ref([])
    ];
    function change(index) {
      selectedValues[index].value = index % 2 === 0 ? ["radio"] : ["radio", "tag"];
    }
    onMounted(() => {
      fetch(new URL("/tree-data.json", import.meta.url).href).then((res) => res.json()).then((res) => {
        baseTreeData.value = res;
      });
      selectedValues[1].value.push("feedback", "efficiency");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_tree = resolveComponent("h-tree");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选</div><div class="demo-description"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_button, {
                    plain: true,
                    size: "small",
                    onClick: ($event) => change(0)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`修改`);
                      } else {
                        return [
                          createTextVNode("修改")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(selectedValues[0].value)}</div>`);
                  if (baseTreeData.value.length) {
                    _push3(ssrRenderComponent(_component_h_tree, {
                      "selected-values": selectedValues[0].value,
                      "onUpdate:selectedValues": ($event) => selectedValues[0].value = $event,
                      "tree-data": baseTreeData.value,
                      "max-height": 300
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode("div", { class: "demo-description" }, [
                      createVNode(_component_h_button, {
                        plain: true,
                        size: "small",
                        onClick: ($event) => change(0)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("修改")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createTextVNode(" " + toDisplayString(selectedValues[0].value), 1)
                    ]),
                    baseTreeData.value.length ? (openBlock(), createBlock(_component_h_tree, {
                      key: 0,
                      "selected-values": selectedValues[0].value,
                      "onUpdate:selectedValues": ($event) => selectedValues[0].value = $event,
                      "tree-data": baseTreeData.value,
                      "max-height": 300
                    }, null, 8, ["selected-values", "onUpdate:selectedValues", "tree-data"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选</div><div class="demo-description"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_h_button, {
                    plain: true,
                    size: "small",
                    onClick: ($event) => change(1)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`修改`);
                      } else {
                        return [
                          createTextVNode("修改")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(selectedValues[1].value)}</div>`);
                  if (baseTreeData.value.length) {
                    _push3(ssrRenderComponent(_component_h_tree, {
                      "selected-values": selectedValues[1].value,
                      "onUpdate:selectedValues": ($event) => selectedValues[1].value = $event,
                      "tree-data": baseTreeData.value,
                      "max-height": 300,
                      multiple: true
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode("div", { class: "demo-description" }, [
                      createVNode(_component_h_button, {
                        plain: true,
                        size: "small",
                        onClick: ($event) => change(1)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("修改")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createTextVNode(" " + toDisplayString(selectedValues[1].value), 1)
                    ]),
                    baseTreeData.value.length ? (openBlock(), createBlock(_component_h_tree, {
                      key: 0,
                      "selected-values": selectedValues[1].value,
                      "onUpdate:selectedValues": ($event) => selectedValues[1].value = $event,
                      "tree-data": baseTreeData.value,
                      "max-height": 300,
                      multiple: true
                    }, null, 8, ["selected-values", "onUpdate:selectedValues", "tree-data"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选"),
                  createVNode("div", { class: "demo-description" }, [
                    createVNode(_component_h_button, {
                      plain: true,
                      size: "small",
                      onClick: ($event) => change(0)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("修改")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createTextVNode(" " + toDisplayString(selectedValues[0].value), 1)
                  ]),
                  baseTreeData.value.length ? (openBlock(), createBlock(_component_h_tree, {
                    key: 0,
                    "selected-values": selectedValues[0].value,
                    "onUpdate:selectedValues": ($event) => selectedValues[0].value = $event,
                    "tree-data": baseTreeData.value,
                    "max-height": 300
                  }, null, 8, ["selected-values", "onUpdate:selectedValues", "tree-data"])) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode("div", { class: "demo-description" }, [
                    createVNode(_component_h_button, {
                      plain: true,
                      size: "small",
                      onClick: ($event) => change(1)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("修改")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createTextVNode(" " + toDisplayString(selectedValues[1].value), 1)
                  ]),
                  baseTreeData.value.length ? (openBlock(), createBlock(_component_h_tree, {
                    key: 0,
                    "selected-values": selectedValues[1].value,
                    "onUpdate:selectedValues": ($event) => selectedValues[1].value = $event,
                    "tree-data": baseTreeData.value,
                    "max-height": 300,
                    multiple: true
                  }, null, 8, ["selected-values", "onUpdate:selectedValues", "tree-data"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tree/selected-values.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
