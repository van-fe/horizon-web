import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "compatible",
  __ssrInlineRender: true,
  setup(__props) {
    const visible0 = ref(false);
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);
    const visible4 = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      const _component_h_drawer = resolveComponent("h-drawer");
      _push(`<!--[--><div class="example" data-v-96b1b6d7>`);
      _push(ssrRenderComponent(_component_h_button, {
        onClick: ($event) => visible0.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Open Drawer no header`);
          } else {
            return [
              createTextVNode("Open Drawer no header")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        onClick: ($event) => visible1.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Open Drawer no footer`);
          } else {
            return [
              createTextVNode("Open Drawer no footer")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        onClick: ($event) => visible3.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Open Drawer v1`);
          } else {
            return [
              createTextVNode("Open Drawer v1")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        onClick: ($event) => visible4.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Open Drawer v1 custom title`);
          } else {
            return [
              createTextVNode("Open Drawer v1 custom title")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        onClick: ($event) => visible2.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Open Drawer v2`);
          } else {
            return [
              createTextVNode("Open Drawer v2")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_h_drawer, {
        visible: visible0.value,
        "onUpdate:visible": ($event) => visible0.value = $event,
        position: "right",
        onOk: ($event) => visible0.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-96b1b6d7${_scopeId}> You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. </div>`);
          } else {
            return [
              createVNode("div", null, " You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_drawer, {
        visible: visible1.value,
        "onUpdate:visible": ($event) => visible1.value = $event,
        title: "Title",
        closable: false,
        "primary-button": false,
        "secondary-button": false,
        placement: "right"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) ;
          else {
            return [];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-96b1b6d7${_scopeId}> You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. </div>`);
          } else {
            return [
              createVNode("div", null, " You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_drawer, {
        visible: visible2.value,
        "onUpdate:visible": ($event) => visible2.value = $event,
        v2: "",
        placement: "right",
        header: false,
        footer: false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-96b1b6d7${_scopeId}> You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. </div>`);
          } else {
            return [
              createVNode("div", null, " You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_drawer, {
        modelValue: visible3.value,
        "onUpdate:modelValue": ($event) => visible3.value = $event,
        position: "left",
        "primary-text": "Primary Text",
        "secondary-text": "Secondary Text",
        onPrimaryClick: ($event) => visible3.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-96b1b6d7${_scopeId}> You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. </div>`);
          } else {
            return [
              createVNode("div", null, " You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_drawer, {
        modelValue: visible4.value,
        "onUpdate:modelValue": ($event) => visible4.value = $event,
        position: "right",
        "primary-text": "Primary Text",
        "secondary-text": "Secondary Text",
        onPrimaryClick: ($event) => visible3.value = false
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex align-center" style="${ssrRenderStyle({ "column-gap": "10px" })}" data-v-96b1b6d7${_scopeId}>`);
            _push2(ssrRenderComponent(_component_h_button, {
              icon: "close",
              text: "",
              size: "small",
              onClick: ($event) => visible4.value = false
            }, null, _parent2, _scopeId));
            _push2(`<div data-v-96b1b6d7${_scopeId}>This Version 1 Title</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "flex align-center",
                style: { "column-gap": "10px" }
              }, [
                createVNode(_component_h_button, {
                  icon: "close",
                  text: "",
                  size: "small",
                  onClick: ($event) => visible4.value = false
                }, null, 8, ["onClick"]),
                createVNode("div", null, "This Version 1 Title")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-96b1b6d7${_scopeId}> You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. </div>`);
          } else {
            return [
              createVNode("div", null, " You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Drawer/compatible.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const compatible = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-96b1b6d7"]]);
export {
  compatible as default
};
