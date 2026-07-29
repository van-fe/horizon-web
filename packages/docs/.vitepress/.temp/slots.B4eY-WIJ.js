import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_h_divider = resolveComponent("h-divider");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_h_divider, { "title-placement": "left" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Left Title `);
      } else {
        return [
          createTextVNode(" Left Title ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis augue nunc, pharetra in eleifend tincidunt, fermentum eu dui. Integer ornare arcu non laoreet rhoncus. Vestibulum mattis fringilla porta. Donec nisl lectus, sagittis ac nisi in, varius fringilla ante. Nulla non interdum velit. Maecenas scelerisque iaculis justo quis dignissim. Fusce cursus, augue ac ultricies euismod, tellus eros posuere libero, a cursus ante dui vitae risus. Quisque ornare turpis eget mi lacinia, vitae tempor felis pulvinar. Mauris lorem dolor, rhoncus vitae dapibus eget, finibus nec turpis. Vestibulum a neque ac felis congue pharetra. Praesent ornare ut augue eget lobortis. Duis elementum lobortis dolor ut gravida. Nunc at justo sed massa aliquam tempor nec et justo. Suspendisse efficitur dictum nibh, sed pharetra tellus fermentum sed. </p>`);
  _push(ssrRenderComponent(_component_h_divider, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Center Title `);
      } else {
        return [
          createTextVNode(" Center Title ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p> Fusce imperdiet nisl eget sodales ullamcorper. Duis accumsan diam et dignissim gravida. Donec molestie mauris mi, non rhoncus sem feugiat nec. Aliquam maximus ut metus a dictum. Etiam commodo vel orci sit amet luctus. Etiam vitae volutpat lacus. Curabitur euismod venenatis erat sollicitudin vulputate. Donec tellus enim, rutrum ac nibh sed, ullamcorper vehicula odio. Vivamus luctus magna ac metus tempor rhoncus. Maecenas a lorem sed elit faucibus bibendum sed a neque. In quis nibh sed sapien condimentum faucibus vel vel dolor. Aliquam id facilisis turpis. Sed at ex a arcu dictum congue sit amet eu nisi. Donec felis ligula, egestas sed mi non, sagittis hendrerit tellus. Proin a ultricies sapien, non viverra est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. </p>`);
  _push(ssrRenderComponent(_component_h_divider, { "title-placement": "right" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Right Title `);
      } else {
        return [
          createTextVNode(" Right Title ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p> Donec in sapien mollis, tincidunt lectus ut, ultrices neque. Maecenas vestibulum facilisis sagittis. Sed vehicula laoreet lectus. Ut tempus convallis urna, non pharetra nisi pulvinar a. Aliquam cursus consequat maximus. Aenean tempus metus vulputate tortor lacinia auctor. Mauris malesuada magna nec mauris condimentum, sit amet bibendum mi venenatis. Cras magna sem, dictum vitae est et, dapibus imperdiet odio. Donec aliquam libero vitae consectetur commodo. In eu lorem eu dui tincidunt bibendum id in lacus. Ut non placerat ex, ut dictum massa. Morbi sed lorem augue. Nunc et pulvinar odio, nec maximus nisl. Aenean dapibus malesuada massa quis vestibulum. Donec eleifend vestibulum posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. </p><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Divider/slots.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const slots = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  slots as default
};
