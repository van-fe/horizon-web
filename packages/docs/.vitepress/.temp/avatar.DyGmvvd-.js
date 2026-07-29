import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_tag = resolveComponent("h-tag");
  const _component_h_avatar = resolveComponent("h-avatar");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_tag, {
    avatar: "https://source.demohome.com/UserPicture/default.jpg",
    plain: true,
    round: true,
    clickable: false,
    size: "small"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Elizabeth`);
      } else {
        return [
          createTextVNode("Elizabeth")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_tag, {
    avatar: "https://source.demohome.com/UserPicture/default.jpg",
    plain: true,
    round: true,
    clickable: false,
    size: "medium"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Jupiter`);
      } else {
        return [
          createTextVNode("Jupiter")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_h_tag, {
    plain: true,
    round: true,
    clickable: false,
    size: "large"
  }, {
    avatar: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_h_avatar, {
          src: "https://source.demohome.com/UserPicture/default.jpg",
          size: 24
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_h_avatar, {
            src: "https://source.demohome.com/UserPicture/default.jpg",
            size: 24
          })
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` William `);
      } else {
        return [
          createTextVNode(" William ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tag/avatar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const avatar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  avatar as default
};
