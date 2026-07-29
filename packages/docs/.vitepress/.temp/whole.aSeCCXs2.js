import { defineComponent, shallowRef, ref, resolveComponent, withCtx, createTextVNode, createVNode, withKeys, unref, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { y as HGuide, $ as $message, z as $alert } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "whole",
  __ssrInlineRender: true,
  setup(__props) {
    const guideRef = shallowRef(null);
    const inputRef = shallowRef(null);
    const inputNumberRef = shallowRef(null);
    const confirmBtnRef = shallowRef(null);
    const visible = ref(false);
    const dialogVisible = ref(false);
    const name = ref("");
    const age = ref(0);
    function start() {
      dialogVisible.value = true;
    }
    function onInputBlur() {
      var _a;
      if (name.value.length >= 2) {
        (_a = guideRef.value) == null ? void 0 : _a.next();
      }
    }
    function onInputAgeBlur() {
      var _a;
      if (age.value >= 10 && age.value <= 60) {
        (_a = guideRef.value) == null ? void 0 : _a.next();
      }
    }
    function onClose() {
      $message.warning("跳过了新手引导");
    }
    function onFinish() {
      $message.success("完成了新手引导");
      dialogVisible.value = false;
    }
    function onOpened() {
      visible.value = true;
    }
    function onCloseDialog() {
      visible.value = false;
    }
    function onSubmit() {
      $alert("填写结束").then(() => {
        var _a;
        (_a = guideRef.value) == null ? void 0 : _a.next();
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_row = resolveComponent("h-row");
      const _component_h_col = resolveComponent("h-col");
      const _component_h_button = resolveComponent("h-button");
      const _component_h_dialog = resolveComponent("h-dialog");
      const _component_h_form = resolveComponent("h-form");
      const _component_h_form_item = resolveComponent("h-form-item");
      const _component_h_input = resolveComponent("h-input");
      const _component_h_input_number = resolveComponent("h-input-number");
      const _component_h_guide_item = resolveComponent("h-guide-item");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_h_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_col, { span: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_button, { onClick: start }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Start`);
                      } else {
                        return [
                          createTextVNode("Start")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_button, { onClick: start }, {
                      default: withCtx(() => [
                        createTextVNode("Start")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_h_button, { onClick: start }, {
                    default: withCtx(() => [
                      createTextVNode("Start")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_dialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: "信息填写",
        onClose: onCloseDialog,
        onOpened
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_button, {
              onClick: ($event) => dialogVisible.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`取消`);
                } else {
                  return [
                    createTextVNode("取消")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_button, {
              ref_key: "confirmBtnRef",
              ref: confirmBtnRef,
              onClick: onSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`确定`);
                } else {
                  return [
                    createTextVNode("确定")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_button, {
                onClick: ($event) => dialogVisible.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode("取消")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_h_button, {
                ref_key: "confirmBtnRef",
                ref: confirmBtnRef,
                onClick: onSubmit
              }, {
                default: withCtx(() => [
                  createTextVNode("确定")
                ]),
                _: 1
              }, 512)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_form, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_h_form_item, { label: "姓名" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_input, {
                          ref_key: "inputRef",
                          ref: inputRef,
                          modelValue: name.value,
                          "onUpdate:modelValue": ($event) => name.value = $event,
                          onKeypress: onInputBlur
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_input, {
                            ref_key: "inputRef",
                            ref: inputRef,
                            modelValue: name.value,
                            "onUpdate:modelValue": ($event) => name.value = $event,
                            onKeypress: withKeys(onInputBlur, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_h_form_item, { label: "年龄" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_h_input_number, {
                          ref_key: "inputNumberRef",
                          ref: inputNumberRef,
                          modelValue: age.value,
                          "onUpdate:modelValue": ($event) => age.value = $event,
                          onKeypress: onInputAgeBlur
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_h_input_number, {
                            ref_key: "inputNumberRef",
                            ref: inputNumberRef,
                            modelValue: age.value,
                            "onUpdate:modelValue": ($event) => age.value = $event,
                            onKeypress: withKeys(onInputAgeBlur, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_h_form_item, { label: "姓名" }, {
                      default: withCtx(() => [
                        createVNode(_component_h_input, {
                          ref_key: "inputRef",
                          ref: inputRef,
                          modelValue: name.value,
                          "onUpdate:modelValue": ($event) => name.value = $event,
                          onKeypress: withKeys(onInputBlur, ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_h_form_item, { label: "年龄" }, {
                      default: withCtx(() => [
                        createVNode(_component_h_input_number, {
                          ref_key: "inputNumberRef",
                          ref: inputNumberRef,
                          modelValue: age.value,
                          "onUpdate:modelValue": ($event) => age.value = $event,
                          onKeypress: withKeys(onInputAgeBlur, ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_form, null, {
                default: withCtx(() => [
                  createVNode(_component_h_form_item, { label: "姓名" }, {
                    default: withCtx(() => [
                      createVNode(_component_h_input, {
                        ref_key: "inputRef",
                        ref: inputRef,
                        modelValue: name.value,
                        "onUpdate:modelValue": ($event) => name.value = $event,
                        onKeypress: withKeys(onInputBlur, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_h_form_item, { label: "年龄" }, {
                    default: withCtx(() => [
                      createVNode(_component_h_input_number, {
                        ref_key: "inputNumberRef",
                        ref: inputNumberRef,
                        modelValue: age.value,
                        "onUpdate:modelValue": ($event) => age.value = $event,
                        onKeypress: withKeys(onInputAgeBlur, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(HGuide), {
        ref_key: "guideRef",
        ref: guideRef,
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        "use-controls": false,
        onClose,
        onFinish
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_h_guide_item, {
              target: inputRef.value,
              title: "第一步",
              content: "请填写姓名，至少2位字符；填写完成后按下回车"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_guide_item, {
              target: inputNumberRef.value,
              title: "第二步",
              content: "请填写年龄，在10-60区间；填写完成后按下回车",
              placement: "top-start"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_h_guide_item, {
              target: confirmBtnRef.value,
              title: "第三步",
              content: "点击确定提交",
              placement: "right-start"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_h_guide_item, {
                target: inputRef.value,
                title: "第一步",
                content: "请填写姓名，至少2位字符；填写完成后按下回车"
              }, null, 8, ["target"]),
              createVNode(_component_h_guide_item, {
                target: inputNumberRef.value,
                title: "第二步",
                content: "请填写年龄，在10-60区间；填写完成后按下回车",
                placement: "top-start"
              }, null, 8, ["target"]),
              createVNode(_component_h_guide_item, {
                target: confirmBtnRef.value,
                title: "第三步",
                content: "点击确定提交",
                placement: "right-start"
              }, null, 8, ["target"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Guide/whole.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
