import { defineComponent, ref, resolveComponent, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const dynOptions = [
  {
    value: "disciplines",
    label: "disciplines"
  },
  {
    value: "navigation",
    label: "Navigation",
    isLeaf: false
  }
];
const _sfc_main = defineComponent({
  setup() {
    const refDynOptions1 = ref([...dynOptions]);
    const refDynOptions2 = ref(JSON.parse(JSON.stringify(dynOptions)));
    const currentVal1 = ref([]);
    const currentVal2 = ref([]);
    const options = ref([]);
    fetch(
      new URL("/cascader-options.json", import.meta.url).href
    ).then((res) => {
      res.json().then((value) => {
        options.value = value;
      });
    });
    const dynamicLoad2 = (node) => {
      console.info(node);
      return new Promise((resolve) => {
        setTimeout(() => {
          const codePoint = 97 + node.level;
          resolve(new Array(5).fill(0).map((_, index) => {
            var _a;
            return {
              label: `${(_a = node.options.at(0)) == null ? void 0 : _a.label} - ${String.fromCodePoint(codePoint)}(${index})`,
              value: `${codePoint}(${index})`,
              isLeaf: codePoint > 100,
              children: []
            };
          }));
        }, 2e3);
      });
    };
    return {
      refDynOptions1,
      refDynOptions2,
      currentVal1,
      currentVal2,
      options,
      dynamicLoad: dynamicLoad2
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_row = resolveComponent("h-row");
  const _component_h_col = resolveComponent("h-col");
  const _component_h_cascader = resolveComponent("h-cascader");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_h_row, { gutter: 10 }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>单选</div>`);
              _push3(ssrRenderComponent(_component_h_cascader, {
                modelValue: _ctx.currentVal1,
                "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                options: _ctx.refDynOptions1,
                "onUpdate:options": ($event) => _ctx.refDynOptions1 = $event,
                "dynamic-load": _ctx.dynamicLoad,
                "to-body": false
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "单选"),
                createVNode(_component_h_cascader, {
                  modelValue: _ctx.currentVal1,
                  "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                  options: _ctx.refDynOptions1,
                  "onUpdate:options": ($event) => _ctx.refDynOptions1 = $event,
                  "dynamic-load": _ctx.dynamicLoad,
                  "to-body": false
                }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "dynamic-load"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="demo-title"${_scopeId2}>多选</div>`);
              _push3(ssrRenderComponent(_component_h_cascader, {
                modelValue: _ctx.currentVal2,
                "onUpdate:modelValue": ($event) => _ctx.currentVal2 = $event,
                options: _ctx.refDynOptions2,
                "onUpdate:options": ($event) => _ctx.refDynOptions2 = $event,
                multiple: "",
                "dynamic-load": _ctx.dynamicLoad,
                "to-body": false
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "demo-title" }, "多选"),
                createVNode(_component_h_cascader, {
                  modelValue: _ctx.currentVal2,
                  "onUpdate:modelValue": ($event) => _ctx.currentVal2 = $event,
                  options: _ctx.refDynOptions2,
                  "onUpdate:options": ($event) => _ctx.refDynOptions2 = $event,
                  multiple: "",
                  "dynamic-load": _ctx.dynamicLoad,
                  "to-body": false
                }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "dynamic-load"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "单选"),
              createVNode(_component_h_cascader, {
                modelValue: _ctx.currentVal1,
                "onUpdate:modelValue": ($event) => _ctx.currentVal1 = $event,
                options: _ctx.refDynOptions1,
                "onUpdate:options": ($event) => _ctx.refDynOptions1 = $event,
                "dynamic-load": _ctx.dynamicLoad,
                "to-body": false
              }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "dynamic-load"])
            ]),
            _: 1
          }),
          createVNode(_component_h_col, { span: 6 }, {
            default: withCtx(() => [
              createVNode("div", { class: "demo-title" }, "多选"),
              createVNode(_component_h_cascader, {
                modelValue: _ctx.currentVal2,
                "onUpdate:modelValue": ($event) => _ctx.currentVal2 = $event,
                options: _ctx.refDynOptions2,
                "onUpdate:options": ($event) => _ctx.refDynOptions2 = $event,
                multiple: "",
                "dynamic-load": _ctx.dynamicLoad,
                "to-body": false
              }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "dynamic-load"])
            ]),
            _: 1
          })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Cascader/dynamic-load.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dynamicLoad = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  dynamicLoad as default
};
