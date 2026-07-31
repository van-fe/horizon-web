import { defineComponent, ref, computed, resolveComponent, resolveDirective, withCtx, mergeProps, createVNode, withDirectives, toDisplayString, createBlock, openBlock, createTextVNode, createCommentVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { I as __default__ } from "./app.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const originData = [
  {
    key: 0,
    label: "某某集团",
    avatar: "/demo-assets/avatar-cyan.svg",
    children: [
      {
        key: "0-1",
        label: "某某公司",
        avatar: "/demo-assets/avatar-cyan.svg",
        children: [
          {
            key: "0-1-1",
            label: "Brooklyn Simmons 王磊",
            avatar: "/demo-assets/avatar-indigo.svg",
            department: "Product Design & Development-Digital Development-Web Application Development Department"
          },
          {
            key: 1,
            label: "产品事业部",
            avatar: "/demo-assets/avatar-cyan.svg",
            department: "Product Design & Development-Digital Development-Web Application Development Department",
            children: [
              {
                key: "1-1",
                label: "产品事业部1-1",
                avatar: "/demo-assets/avatar-indigo.svg",
                department: "Product Design & Development-Digital Development-Web Application Development Department",
                children: [
                  {
                    key: "1-2",
                    label: "产品事业部1-2",
                    avatar: "/demo-assets/avatar-indigo.svg",
                    department: "Product Design & Development-Digital Development-Web Application Development Department",
                    children: [
                      {
                        key: "1-3",
                        label: "产品事业部1-3",
                        avatar: "/demo-assets/avatar-indigo.svg",
                        department: "Product Design & Development-Digital Development-Web Application Development Department",
                        children: [
                          {
                            key: "1-4",
                            label: "产品事业部1-4",
                            avatar: "/demo-assets/avatar-indigo.svg",
                            department: "Product Design & Development-Digital Development-Web Application Development Department",
                            children: [
                              {
                                key: "1-5",
                                label: "产品事业部1-5",
                                avatar: "/demo-assets/avatar-indigo.svg",
                                department: "Product Design & Development-Digital Development-Web Application Development Department",
                                children: [
                                  {
                                    key: "1-6",
                                    label: "产品事业部1-6",
                                    avatar: "/demo-assets/avatar-indigo.svg",
                                    department: "Product Design & Development-Digital Development-Web Application Development Department",
                                    children: [
                                      {
                                        key: "1-7",
                                        label: "产品事业部1-7",
                                        avatar: "/demo-assets/avatar-indigo.svg",
                                        department: "Product Design & Development-Digital Development-Web Application Development Department",
                                        children: [
                                          {
                                            key: "1-8",
                                            label: "产品事业部1-8",
                                            avatar: "/demo-assets/avatar-indigo.svg",
                                            department: "Product Design & Development-Digital Development-Web Application Development Department",
                                            children: []
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            key: 2,
            label: "UED设计部",
            avatar: "/demo-assets/avatar-cyan.svg",
            department: "Product Design & Development-Digital Development-Web Application Development Department",
            children: [
              {
                key: "2-1",
                label: "Brooklyn Simmons 王磊2-1",
                avatar: "/demo-assets/avatar-indigo.svg",
                department: "Product Design & Development-Digital Development-Web Application Development Department"
              }
            ]
          },
          {
            key: 3,
            label: "研发部门",
            avatar: "/demo-assets/avatar-cyan.svg",
            department: "Product Design & Development-Digital Development-Web Application Development Department",
            children: [
              {
                key: "3-1",
                label: "Brooklyn Simmons 王磊3-1",
                avatar: "/demo-assets/avatar-indigo.svg",
                department: "Product Design & Development-Digital Development-Web Application Development Department"
              }
            ]
          },
          {
            key: 222222,
            label: "研发部门1",
            avatar: "/demo-assets/avatar-cyan.svg",
            department: "Product Design & Development-Digital Development-Web Application Development Department",
            children: []
          },
          {
            key: 3111,
            label: "研发部门222",
            avatar: "/demo-assets/avatar-cyan.svg",
            department: "Product Design & Development-Digital Development-Web Application Development Department",
            children: []
          }
        ]
      }
    ]
  }
];
const _sfc_main = defineComponent({
  components: { IconLogo: __default__ },
  setup() {
    const data = ref(originData);
    const dataModel = ref([]);
    const searchInput = ref("");
    const handleFlatTree = (treeArr, children = "children") => {
      if (treeArr === void 0) return [];
      let result = [];
      for (const item of treeArr) {
        if (item[children]) {
          result = result.concat(handleFlatTree(item[children], children));
        }
        result.push(item);
      }
      return result;
    };
    const handleSearch = (e) => {
      data.value = handleFlatTree(originData).filter((item) => {
        var _a;
        return item.label.toLowerCase().includes((_a = e == null ? void 0 : e.target) == null ? void 0 : _a.value);
      });
    };
    const checkedDataTxt = computed(() => {
      const peopleArr = handleFlatTree(originData).filter(
        (item) => dataModel.value.includes(item.key) && !item.children
      );
      const departArr = handleFlatTree(originData).filter(
        (item) => dataModel.value.includes(item.key) && item.children
      );
      if (!peopleArr.length && !departArr.length) return `0`;
      return departArr.length && peopleArr.length ? `${peopleArr.length} 人、${departArr.length} 组` : peopleArr.length ? `${peopleArr.length} 人` : `${departArr.length} 组`;
    });
    const handleClear = () => {
      dataModel.value = [];
    };
    return {
      data,
      dataModel,
      searchInput,
      handleSearch,
      handleClear,
      checkedDataTxt
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_transfer = resolveComponent("h-transfer");
  const _component_h_avatar = resolveComponent("h-avatar");
  const _component_h_button = resolveComponent("h-button");
  const _directive_tooltip = resolveDirective("tooltip");
  _push(`<div${ssrRenderAttrs(_attrs)}><h3 class="m-4">组织架构</h3>`);
  _push(ssrRenderComponent(_component_h_transfer, {
    modelValue: _ctx.dataModel,
    "onUpdate:modelValue": ($event) => _ctx.dataModel = $event,
    titles: [""],
    data: _ctx.data,
    filterable: "",
    draggable: "",
    type: "work",
    style: { "width": "600px" }
  }, {
    item: withCtx(({ item, type }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flex align-center overflow-hidden"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_h_avatar, {
          size: "small",
          src: item.avatar
        }, null, _parent2, _scopeId));
        _push2(`<div class="ml-2 flex-1 flex flex-column overflow-hidden"${_scopeId}><div style="${ssrRenderStyle({ "text-overflow": "ellipsis", "overflow": "hidden" })}"${_scopeId}>${ssrInterpolate(item.label)}</div><div${ssrRenderAttrs(mergeProps({ style: { "text-overflow": "ellipsis", "overflow": "hidden", "color": "#929398" } }, ssrGetDirectiveProps(_ctx, _directive_tooltip, item.department, void 0, { overflow: true })))}${_scopeId}>${ssrInterpolate(item.department)}</div></div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex align-center overflow-hidden" }, [
            createVNode(_component_h_avatar, {
              size: "small",
              src: item.avatar
            }, null, 8, ["src"]),
            createVNode("div", { class: "ml-2 flex-1 flex flex-column overflow-hidden" }, [
              createVNode("div", { style: { "text-overflow": "ellipsis", "overflow": "hidden" } }, toDisplayString(item.label), 1),
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
  _push(`<h3 class="m-4">操作控件</h3>`);
  _push(ssrRenderComponent(_component_h_transfer, {
    modelValue: _ctx.dataModel,
    "onUpdate:modelValue": ($event) => _ctx.dataModel = $event,
    data: _ctx.data,
    draggable: "",
    type: "work",
    style: { "width": "600px" }
  }, {
    item: withCtx(({ item, type }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (type === "left") {
          _push2(`<div class="flex align-center overflow-hidden"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_h_avatar, {
            size: "small",
            src: item.avatar
          }, null, _parent2, _scopeId));
          _push2(`<div class="ml-2 flex-1 flex flex-column overflow-hidden"${_scopeId}><div style="${ssrRenderStyle({ "text-overflow": "ellipsis", "overflow": "hidden" })}"${_scopeId}>${ssrInterpolate(item.label)}</div><div${ssrRenderAttrs(mergeProps({ style: { "text-overflow": "ellipsis", "overflow": "hidden", "color": "#929398" } }, ssrGetDirectiveProps(_ctx, _directive_tooltip, item.department, void 0, { overflow: true })))}${_scopeId}>${ssrInterpolate(item.department)}</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (type === "right") {
          _push2(`<div class="flex align-center overflow-hidden"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_h_avatar, {
            size: "small",
            src: item.avatar
          }, null, _parent2, _scopeId));
          _push2(`<div class="ml-2 flex-1 flex flex-column overflow-hidden"${_scopeId}><div style="${ssrRenderStyle({ "text-overflow": "ellipsis", "overflow": "hidden" })}"${_scopeId}>${ssrInterpolate(item.label)}</div><div${ssrRenderAttrs(mergeProps({ style: { "text-overflow": "ellipsis", "overflow": "hidden", "color": "#929398" } }, ssrGetDirectiveProps(_ctx, _directive_tooltip, item.department, void 0, { overflow: true })))}${_scopeId}>${ssrInterpolate(item.department)}</div></div>`);
          _push2(ssrRenderComponent(_component_h_button, {
            type: "normal",
            icon: "exclusive_group",
            text: ""
          }, null, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          type === "left" ? (openBlock(), createBlock("div", {
            key: 0,
            class: "flex align-center overflow-hidden"
          }, [
            createVNode(_component_h_avatar, {
              size: "small",
              src: item.avatar
            }, null, 8, ["src"]),
            createVNode("div", { class: "ml-2 flex-1 flex flex-column overflow-hidden" }, [
              createVNode("div", { style: { "text-overflow": "ellipsis", "overflow": "hidden" } }, toDisplayString(item.label), 1),
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
          ])) : createCommentVNode("", true),
          type === "right" ? (openBlock(), createBlock("div", {
            key: 1,
            class: "flex align-center overflow-hidden"
          }, [
            createVNode(_component_h_avatar, {
              size: "small",
              src: item.avatar
            }, null, 8, ["src"]),
            createVNode("div", { class: "ml-2 flex-1 flex flex-column overflow-hidden" }, [
              createVNode("div", { style: { "text-overflow": "ellipsis", "overflow": "hidden" } }, toDisplayString(item.label), 1),
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
            ]),
            createVNode(_component_h_button, {
              type: "normal",
              icon: "exclusive_group",
              text: ""
            })
          ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Transfer/tree.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tree = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  tree as default
};
