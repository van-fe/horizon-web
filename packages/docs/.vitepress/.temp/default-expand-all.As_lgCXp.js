import { defineComponent, ref, onMounted, resolveComponent, withCtx, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default-expand-all",
  __ssrInlineRender: true,
  setup(__props) {
    const baseTreeData = ref([]);
    onMounted(() => {
      fetch(new URL("/tree-data.json", import.meta.url).href).then((res) => res.json()).then((res) => {
        baseTreeData.value = res;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_tree = resolveComponent("h-tree");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选</div>`);
                  if (baseTreeData.value.length) {
                    _push3(ssrRenderComponent(_component_h_tree, {
                      "tree-data": baseTreeData.value,
                      "is-default-expand-all": true,
                      "max-height": 300
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    baseTreeData.value.length ? (openBlock(), createBlock(_component_h_tree, {
                      key: 0,
                      "tree-data": baseTreeData.value,
                      "is-default-expand-all": true,
                      "max-height": 300
                    }, null, 8, ["tree-data"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选</div>`);
                  if (baseTreeData.value.length) {
                    _push3(ssrRenderComponent(_component_h_tree, {
                      "tree-data": baseTreeData.value,
                      "is-default-expand-all": true,
                      "max-height": 300,
                      multiple: true
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    baseTreeData.value.length ? (openBlock(), createBlock(_component_h_tree, {
                      key: 0,
                      "tree-data": baseTreeData.value,
                      "is-default-expand-all": true,
                      "max-height": 300,
                      multiple: true
                    }, null, 8, ["tree-data"])) : createCommentVNode("", true)
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
                  baseTreeData.value.length ? (openBlock(), createBlock(_component_h_tree, {
                    key: 0,
                    "tree-data": baseTreeData.value,
                    "is-default-expand-all": true,
                    "max-height": 300
                  }, null, 8, ["tree-data"])) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  baseTreeData.value.length ? (openBlock(), createBlock(_component_h_tree, {
                    key: 0,
                    "tree-data": baseTreeData.value,
                    "is-default-expand-all": true,
                    "max-height": 300,
                    multiple: true
                  }, null, 8, ["tree-data"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tree/default-expand-all.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
