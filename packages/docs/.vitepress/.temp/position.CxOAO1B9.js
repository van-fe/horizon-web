import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_popover = resolveComponent("h-popover");
  const _component_h_button = resolveComponent("h-button");
  const _component_h_pop_content = resolveComponent("h-pop-content");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "block-popover" }, _attrs))}><div class="item"></div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "top-start",
    flip: false,
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`上左`);
            } else {
              return [
                createTextVNode("上左")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("上左")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` top-start `);
            } else {
              return [
                createTextVNode(" top-start ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" top-start ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "top",
    flip: false,
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`上`);
            } else {
              return [
                createTextVNode("上")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("上")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` top `);
            } else {
              return [
                createTextVNode(" top ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" top ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "top-end",
    flip: false,
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`上右`);
            } else {
              return [
                createTextVNode("上右")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("上右")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` top-end `);
            } else {
              return [
                createTextVNode(" top-end ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" top-end ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item"></div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "left-start",
    flip: false,
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`左上`);
            } else {
              return [
                createTextVNode("左上")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("左上")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` left-start `);
            } else {
              return [
                createTextVNode(" left-start ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" left-start ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item"></div><div class="item"></div><div class="item"></div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "right-start",
    flip: false,
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`右上`);
            } else {
              return [
                createTextVNode("右上")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("右上")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` right-start `);
            } else {
              return [
                createTextVNode(" right-start ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" right-start ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "left",
    flip: false,
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`左`);
            } else {
              return [
                createTextVNode("左")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("左")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` left `);
            } else {
              return [
                createTextVNode(" left ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" left ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item"></div><div class="item"></div><div class="item"></div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "right",
    flip: false,
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`右`);
            } else {
              return [
                createTextVNode("右")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("右")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` right `);
            } else {
              return [
                createTextVNode(" right ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" right ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "left-end",
    flip: false,
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`左下`);
            } else {
              return [
                createTextVNode("左下")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("左下")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` left-end `);
            } else {
              return [
                createTextVNode(" left-end ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" left-end ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item"></div><div class="item"></div><div class="item"></div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "right-end",
    flip: false,
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`右下`);
            } else {
              return [
                createTextVNode("右下")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("右下")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` right end `);
            } else {
              return [
                createTextVNode(" right end ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" right end ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item"></div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "bottom-start",
    flip: false,
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`下左`);
            } else {
              return [
                createTextVNode("下左")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("下左")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` bottom-start `);
            } else {
              return [
                createTextVNode(" bottom-start ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" bottom-start ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "bottom",
    flip: false,
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`下`);
            } else {
              return [
                createTextVNode("下")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("下")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` bottom `);
            } else {
              return [
                createTextVNode(" bottom ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" bottom ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "bottom-end",
    flip: false,
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`下右`);
            } else {
              return [
                createTextVNode("下右")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("下右")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` bottom-end `);
            } else {
              return [
                createTextVNode(" bottom-end ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" bottom-end ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item"></div><div class="item"></div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "auto-start",
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`自适应 起始`);
            } else {
              return [
                createTextVNode("自适应 起始")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("自适应 起始")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` auto-start `);
            } else {
              return [
                createTextVNode(" auto-start ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" auto-start ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "auto",
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`自适应`);
            } else {
              return [
                createTextVNode("自适应")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("自适应")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` auto `);
            } else {
              return [
                createTextVNode(" auto ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" auto ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item">`);
  _push(ssrRenderComponent(_component_h_popover, {
    trigger: "hover",
    placement: "auto-end",
    "popper-class": "position_popper"
  }, {
    reference: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, {
          plain: true,
          class: "btn"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`自适应 尾部`);
            } else {
              return [
                createTextVNode("自适应 尾部")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, {
            plain: true,
            class: "btn"
          }, {
            default: withCtx(() => [
              createTextVNode("自适应 尾部")
            ]),
            _: 1
          })
        ];
      }
    }),
    popper: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_pop_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` auto-end `);
            } else {
              return [
                createTextVNode(" auto-end ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_pop_content, null, {
            default: withCtx(() => [
              createTextVNode(" auto-end ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="item"></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Popover/position.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const position = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  position as default
};
