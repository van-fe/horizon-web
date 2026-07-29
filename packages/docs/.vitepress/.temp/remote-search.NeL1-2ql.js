import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import jsonp from "fetch-jsonp";
import qs from "qs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "remote-search",
  __ssrInlineRender: true,
  setup(__props) {
    let timeout = null;
    let currentValue = "";
    const isLoading = ref(false);
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
    const value1 = ref("Demo Phone");
    const value2 = ref();
    const values1 = ref(["demo phone", "demo phone 手机"]);
    const values2 = ref([]);
    const options = ref([]);
    const searchHandle = (value) => {
      console.info("search: ", value);
      if (value) {
        fetch(value, (data) => options.value = data);
      } else {
        options.value = [];
      }
    };
    function onFocus() {
      console.info("focus");
    }
    function onBlur() {
      console.info("blur");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_select = resolveComponent("h-select");
      const _component_h_option = resolveComponent("h-option");
      _push(ssrRenderComponent(_component_h_row, mergeProps({ gutter: 10 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "show-search": "",
                    clearable: "",
                    "to-body": false,
                    loading: isLoading.value,
                    "loading-text": "加载中",
                    onSearch: searchHandle,
                    onFocus,
                    onBlur
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(options.value, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.text
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选"),
                    createVNode(_component_h_select, {
                      modelValue: value1.value,
                      "onUpdate:modelValue": ($event) => value1.value = $event,
                      "show-search": "",
                      clearable: "",
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>单选-无选项也显示面板</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "show-search": "",
                    clearable: "",
                    "to-body": false,
                    loading: isLoading.value,
                    "loading-text": "加载中",
                    "hide-panel-when-show-search-and-empty-list": false,
                    onSearch: searchHandle,
                    onFocus,
                    onBlur
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(options.value, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.text
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "单选-无选项也显示面板"),
                    createVNode(_component_h_select, {
                      modelValue: value2.value,
                      "onUpdate:modelValue": ($event) => value2.value = $event,
                      "show-search": "",
                      clearable: "",
                      "to-body": false,
                      loading: isLoading.value,
                      "loading-text": "加载中",
                      "hide-panel-when-show-search-and-empty-list": false,
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    "to-body": false,
                    multiple: "",
                    "show-search": "",
                    clearable: "",
                    "collapse-tags-fill-up": "",
                    "collapse-tags-tooltip": "",
                    "collapse-tags": "",
                    loading: isLoading.value,
                    onSearch: searchHandle,
                    onFocus,
                    onBlur
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(options.value, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.text
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选"),
                    createVNode(_component_h_select, {
                      modelValue: values1.value,
                      "onUpdate:modelValue": ($event) => values1.value = $event,
                      "to-body": false,
                      multiple: "",
                      "show-search": "",
                      clearable: "",
                      "collapse-tags-fill-up": "",
                      "collapse-tags-tooltip": "",
                      "collapse-tags": "",
                      loading: isLoading.value,
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-title"${_scopeId2}>多选-无选项也显示面板</div>`);
                  _push3(ssrRenderComponent(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    "to-body": false,
                    multiple: "",
                    "show-search": "",
                    clearable: "",
                    "collapse-tags-fill-up": "",
                    "collapse-tags-tooltip": "",
                    "collapse-tags": "",
                    "hide-panel-when-show-search-and-empty-list": false,
                    loading: isLoading.value,
                    onSearch: searchHandle,
                    onFocus,
                    onBlur
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(options.value, (item) => {
                          _push4(ssrRenderComponent(_component_h_option, {
                            key: item.value,
                            value: item.value,
                            label: item.text
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "demo-title" }, "多选-无选项也显示面板"),
                    createVNode(_component_h_select, {
                      modelValue: values2.value,
                      "onUpdate:modelValue": ($event) => values2.value = $event,
                      "to-body": false,
                      multiple: "",
                      "show-search": "",
                      clearable: "",
                      "collapse-tags-fill-up": "",
                      "collapse-tags-tooltip": "",
                      "collapse-tags": "",
                      "hide-panel-when-show-search-and-empty-list": false,
                      loading: isLoading.value,
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选"),
                  createVNode(_component_h_select, {
                    modelValue: value1.value,
                    "onUpdate:modelValue": ($event) => value1.value = $event,
                    "show-search": "",
                    clearable: "",
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
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "单选-无选项也显示面板"),
                  createVNode(_component_h_select, {
                    modelValue: value2.value,
                    "onUpdate:modelValue": ($event) => value2.value = $event,
                    "show-search": "",
                    clearable: "",
                    "to-body": false,
                    loading: isLoading.value,
                    "loading-text": "加载中",
                    "hide-panel-when-show-search-and-empty-list": false,
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
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选"),
                  createVNode(_component_h_select, {
                    modelValue: values1.value,
                    "onUpdate:modelValue": ($event) => values1.value = $event,
                    "to-body": false,
                    multiple: "",
                    "show-search": "",
                    clearable: "",
                    "collapse-tags-fill-up": "",
                    "collapse-tags-tooltip": "",
                    "collapse-tags": "",
                    loading: isLoading.value,
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
                ]),
                _: 1
              }),
              createVNode(_component_h_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "demo-title" }, "多选-无选项也显示面板"),
                  createVNode(_component_h_select, {
                    modelValue: values2.value,
                    "onUpdate:modelValue": ($event) => values2.value = $event,
                    "to-body": false,
                    multiple: "",
                    "show-search": "",
                    clearable: "",
                    "collapse-tags-fill-up": "",
                    "collapse-tags-tooltip": "",
                    "collapse-tags": "",
                    "hide-panel-when-show-search-and-empty-list": false,
                    loading: isLoading.value,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Select/remote-search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
