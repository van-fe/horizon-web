import { defineComponent, shallowRef, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "virtual-scroll",
  __ssrInlineRender: true,
  setup(__props) {
    const baseData = shallowRef(new Array(100).fill(0).map((_, i) => ({
      label: `${i + 1}`,
      value: i + 1,
      children: new Array(50).fill(0).map((_2, j) => ({
        label: `${i + 1}-${j + 1}`,
        value: (i + 1) * 100 + j + 1,
        children: new Array(10).fill(0).map((_3, k) => ({
          label: `${i + 1}-${j + 1}-${k + 1}`,
          value: (i + 1) * 1e4 + (j + 1) * 100 + k + 1
        }))
      }))
    })));
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
                  _push3(ssrRenderComponent(_component_h_tree, {
                    "tree-data": baseData.value,
                    "use-virtual-scroll": true,
                    "max-height": 300
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_tree, {
                      "tree-data": baseData.value,
                      "use-virtual-scroll": true,
                      "max-height": 300
                    }, null, 8, ["tree-data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选</div>`);
                  _push3(ssrRenderComponent(_component_h_tree, {
                    "tree-data": baseData.value,
                    "use-virtual-scroll": true,
                    "max-height": 300,
                    multiple: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(_component_h_tree, {
                      "tree-data": baseData.value,
                      "use-virtual-scroll": true,
                      "max-height": 300,
                      multiple: true
                    }, null, 8, ["tree-data"])
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
                  createVNode(_component_h_tree, {
                    "tree-data": baseData.value,
                    "use-virtual-scroll": true,
                    "max-height": 300
                  }, null, 8, ["tree-data"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_tree, {
                    "tree-data": baseData.value,
                    "use-virtual-scroll": true,
                    "max-height": 300,
                    multiple: true
                  }, null, 8, ["tree-data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tree/virtual-scroll.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
