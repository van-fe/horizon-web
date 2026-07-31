import { defineComponent, ref, computed, watchEffect, resolveComponent, resolveDirective, mergeProps, withCtx, createVNode, withDirectives, toDisplayString, createBlock, openBlock, createTextVNode, vShow, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "people",
  __ssrInlineRender: true,
  setup(__props) {
    const originData = [
      {
        key: 0,
        name: "Arooklyn Simmons 王磊",
        avatar: "/demo-assets/avatar-indigo.svg",
        department: "Product Design & Development-Digital Development-Web Application Development Department"
      },
      {
        key: 1,
        name: "Brooklyn Simmons 王磊2",
        avatar: "/demo-assets/avatar-indigo.svg",
        department: "Product Design & Development-Digital Development-Web Application Development Department"
      },
      {
        key: 2,
        name: "Crooklyn Simmons 王磊3",
        avatar: "/demo-assets/avatar-indigo.svg",
        department: "Product Design & Development-Digital Development-Web Application Development Department"
      },
      {
        key: 3,
        name: "Drooklyn Simmons 王磊4",
        avatar: "/demo-assets/avatar-indigo.svg",
        department: "Product Design & Development-Digital Development-Web Application Development Department"
      },
      {
        key: 4,
        name: "Erooklyn Simmons 王磊5",
        avatar: "/demo-assets/avatar-indigo.svg",
        department: "Product Design & Development-Digital Development-Web Application Development Department"
      }
    ];
    const data = ref(originData);
    const dataModel = ref([]);
    const searchInput = ref("");
    const checkedAll = ref(false);
    const handleSearch = (value, item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    };
    const filterModel = computed(() => {
      return data.value.filter((item) => {
        return handleSearch(searchInput.value, item);
      });
    });
    computed(() => {
      return dataModel.value.length > 0 && dataModel.value.length < filterModel.value.length;
    });
    watchEffect(() => {
      checkedAll.value = dataModel.value.length === filterModel.value.length;
    });
    const handleClear = () => {
      dataModel.value = [];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_transfer = resolveComponent("h-transfer");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_avatar = resolveComponent("h-avatar");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(ssrRenderComponent(_component_h_transfer, mergeProps({
        modelValue: dataModel.value,
        "onUpdate:modelValue": ($event) => dataModel.value = $event,
        data: filterModel.value,
        filterable: handleSearch,
        props: { label: "name" },
        titles: [""],
        style: { "width": "600px" }
      }, _attrs), {
        rightHeader: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-1 align-center justify-space-between"${_scopeId}><div${_scopeId}>${ssrInterpolate(`已选: ${dataModel.value.length} 人`)}</div>`);
            _push2(ssrRenderComponent(_component_h_button, {
              style: !!dataModel.value.length ? null : { display: "none" },
              size: "medium",
              text: true,
              onClick: handleClear
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 清除 `);
                } else {
                  return [
                    createTextVNode(" 清除 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-1 align-center justify-space-between" }, [
                createVNode("div", null, toDisplayString(`已选: ${dataModel.value.length} 人`), 1),
                withDirectives(createVNode(_component_h_button, {
                  size: "medium",
                  text: true,
                  onClick: handleClear
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 清除 ")
                  ]),
                  _: 1
                }, 512), [
                  [vShow, !!dataModel.value.length]
                ])
              ])
            ];
          }
        }),
        item: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex align-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_h_avatar, {
              size: "small",
              src: item.avatar
            }, null, _parent2, _scopeId));
            _push2(`<div class="ml-2 flex-1 flex flex-column overflow-hidden"${_scopeId}><div style="${ssrRenderStyle({ "text-overflow": "ellipsis", "overflow": "hidden" })}"${_scopeId}>${ssrInterpolate(item.name)}</div><div${ssrRenderAttrs(mergeProps({ style: { "text-overflow": "ellipsis", "overflow": "hidden", "color": "#929398" } }, ssrGetDirectiveProps(_ctx, _directive_tooltip, item.department, void 0, { overflow: true })))}${_scopeId}>${ssrInterpolate(item.department)}</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex align-center" }, [
                createVNode(_component_h_avatar, {
                  size: "small",
                  src: item.avatar
                }, null, 8, ["src"]),
                createVNode("div", { class: "ml-2 flex-1 flex flex-column overflow-hidden" }, [
                  createVNode("div", { style: { "text-overflow": "ellipsis", "overflow": "hidden" } }, toDisplayString(item.name), 1),
                  withDirectives((openBlock(), createBlock("div", { style: { "text-overflow": "ellipsis", "overflow": "hidden", "color": "#929398" } }, [
                    createTextVNode(toDisplayString(item.department), 1)
                  ])), [
                    [
                      _directive_tooltip,
                      item.department,
                      void 0,
                      { overflow: true }
                    ]
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Transfer/people.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
