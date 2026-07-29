import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "loading",
  __ssrInlineRender: true,
  setup(__props) {
    const options1 = ref([]);
    const options2 = ref([]);
    const loading1 = ref(false);
    const loading2 = ref(false);
    let timer = null;
    function clearTimer() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
    function onSearch(val, index = 1) {
      if (val) {
        const target2 = index === 1 ? options1 : options2;
        const loading = index === 1 ? loading1 : loading2;
        loading.value = true;
        clearTimer();
        timer = setTimeout(() => {
          target2.value = [];
          new Array(10).fill(0).forEach((_, index2) => {
            const value = val.repeat(index2 + 1);
            target2.value.push({
              label: value,
              value
            });
          });
          loading.value = false;
        }, 2e3);
      } else {
        target.value = [];
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_auto_complete = resolveComponent("h-auto-complete");
      _push(ssrRenderComponent(_component_h_row, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>默认样式</div>`);
                  _push3(ssrRenderComponent(_component_h_auto_complete, {
                    options: options1.value,
                    loading: loading1.value,
                    onSearch: (val) => onSearch(val, 1)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "默认样式"),
                    createVNode(_component_h_auto_complete, {
                      options: options1.value,
                      loading: loading1.value,
                      onSearch: (val) => onSearch(val, 1)
                    }, null, 8, ["options", "loading", "onSearch"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>显示搜索文字</div>`);
                  _push3(ssrRenderComponent(_component_h_auto_complete, {
                    options: options2.value,
                    loading: loading2.value,
                    "loading-text": "搜索中",
                    onSearch: (val) => onSearch(val, 2)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "显示搜索文字"),
                    createVNode(_component_h_auto_complete, {
                      options: options2.value,
                      loading: loading2.value,
                      "loading-text": "搜索中",
                      onSearch: (val) => onSearch(val, 2)
                    }, null, 8, ["options", "loading", "onSearch"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "默认样式"),
                  createVNode(_component_h_auto_complete, {
                    options: options1.value,
                    loading: loading1.value,
                    onSearch: (val) => onSearch(val, 1)
                  }, null, 8, ["options", "loading", "onSearch"])
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "显示搜索文字"),
                  createVNode(_component_h_auto_complete, {
                    options: options2.value,
                    loading: loading2.value,
                    "loading-text": "搜索中",
                    onSearch: (val) => onSearch(val, 2)
                  }, null, 8, ["options", "loading", "onSearch"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/AutoComplete/loading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
