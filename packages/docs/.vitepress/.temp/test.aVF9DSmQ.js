import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { $ as $message } from "./app.js";
import jsonp from "fetch-jsonp";
import qs from "qs";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "test",
  __ssrInlineRender: true,
  setup(__props) {
    const visible = ref(false);
    const isLoading = ref(false);
    const value1 = ref(["1", "2", "3"]);
    let timeout = null;
    let currentValue = "";
    const options = ref([]);
    const searchHandle = (value) => {
      console.info("search: ", value);
      if (value) {
        fetch(value, (data) => options.value = data);
      } else {
        options.value = [];
      }
    };
    function fetch(value, callback) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      currentValue = value;
      function fake() {
        const str = qs.stringify({
          code: "utf-8",
          q: value
        });
        isLoading.value = true;
        jsonp(`https://suggest.taobao.com/sug?${str}`).then((response) => response.json()).then((d) => {
          if (currentValue === value) {
            const { result } = d;
            const data = [];
            result.forEach((r) => {
              data.push({
                value: r[0],
                text: r[0]
              });
            });
            callback(data);
          }
        }).finally(() => {
          isLoading.value = false;
        });
      }
      timeout = setTimeout(fake, 300);
    }
    const onOk = () => {
      console.info("ok button clicked!");
      $message({ type: "success", message: "ok button clicked" });
    };
    const onCancel = () => {
      console.info("cancel button clicked!");
      $message({ type: "warning", message: "cancel button clicked!" });
    };
    function onFocus() {
      console.trace("focus");
    }
    function onBlur() {
      console.trace("blur");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_button = resolveComponent("h-button");
      const _component_h_drawer = resolveComponent("h-drawer");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_button, {
        onClick: ($event) => visible.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Open Drawer`);
          } else {
            return [
              createTextVNode("Open Drawer")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_drawer, {
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        title: "Title",
        placement: "right",
        onOk,
        onCancel
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_select, {
              modelValue: value1.value,
              "onUpdate:modelValue": ($event) => value1.value = $event,
              "show-search": "",
              clearable: "",
              "allow-create": "",
              multiple: "",
              "to-body": false,
              loading: isLoading.value,
              "loading-text": "加载中",
              onSearch: searchHandle,
              onFocus,
              onBlur
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(options.value, (item) => {
                    _push3(ssrRenderComponent(_component_h_option, {
                      key: item.value,
                      value: item.value,
                      label: item.text
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(options.value, (item) => {
                      return openBlock(), createBlock(_component_h_option, {
                        key: item.value,
                        value: item.value,
                        label: item.text
                      }, null, 8, ["value", "label"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_select, {
                modelValue: value1.value,
                "onUpdate:modelValue": ($event) => value1.value = $event,
                "show-search": "",
                clearable: "",
                "allow-create": "",
                multiple: "",
                "to-body": false,
                loading: isLoading.value,
                "loading-text": "加载中",
                onSearch: searchHandle,
                onFocus,
                onBlur
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(options.value, (item) => {
                    return openBlock(), createBlock(_component_h_option, {
                      key: item.value,
                      value: item.value,
                      label: item.text
                    }, null, 8, ["value", "label"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "loading"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
