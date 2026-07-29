import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    let hoverMsg = ref("hover top");
    let clickMsg = ref("click left");
    let focusMsg = ref("focus right");
    let contextmenuMsg = ref("contextmenu top");
    return {
      hoverMsg,
      clickMsg,
      focusMsg,
      contextmenuMsg
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_tooltip = resolveComponent("h-tooltip");
  const _component_h_button = resolveComponent("h-button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-block" }, _attrs))} data-v-29338f38>`);
  _push(ssrRenderComponent(_component_h_tooltip, { placement: "top" }, {
    content: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`min`);
      } else {
        return [
          createTextVNode("min")
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`最小宽度`);
            } else {
              return [
                createTextVNode("最小宽度")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, null, {
            default: withCtx(() => [
              createTextVNode("最小宽度")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_tooltip, { placement: "top" }, {
    content: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` 你的关心，是独我一份的，还是他人都有的，若不是独我一份的，那这份关心不要也罢。 `);
      } else {
        return [
          createTextVNode(" 你的关心，是独我一份的，还是他人都有的，若不是独我一份的，那这份关心不要也罢。 ")
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`最大宽度中文`);
            } else {
              return [
                createTextVNode("最大宽度中文")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, null, {
            default: withCtx(() => [
              createTextVNode("最大宽度中文")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_tooltip, { placement: "top" }, {
    content: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Lorem ipsum dolor sit amet, nullam tacimates scribentur id sea, mea libris docendi tacimates id. Pro laoreet oportere te, id pri quis vero omnesque. Vero utinam mandamus his ad, populo abhorreant duo ad. Mea nibh definitiones ei, an quo civibus commune cotidieque. `);
      } else {
        return [
          createTextVNode(" Lorem ipsum dolor sit amet, nullam tacimates scribentur id sea, mea libris docendi tacimates id. Pro laoreet oportere te, id pri quis vero omnesque. Vero utinam mandamus his ad, populo abhorreant duo ad. Mea nibh definitiones ei, an quo civibus commune cotidieque. ")
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_button, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`最大宽度英文`);
            } else {
              return [
                createTextVNode("最大宽度英文")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_button, null, {
            default: withCtx(() => [
              createTextVNode("最大宽度英文")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_tooltip, {
    overflow: "",
    content: "总感觉要做点什么，但真正做的时候却又显得有些迷茫，这事还真恼人"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="careless" data-v-29338f38${_scopeId}> 总感觉要做点什么，但真正做的时候却又显得有些迷茫，这事还真恼人 </div>`);
      } else {
        return [
          createVNode("div", { class: "careless" }, " 总感觉要做点什么，但真正做的时候却又显得有些迷茫，这事还真恼人 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tooltip/width.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const width = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-29338f38"]]);
export {
  width as default
};
