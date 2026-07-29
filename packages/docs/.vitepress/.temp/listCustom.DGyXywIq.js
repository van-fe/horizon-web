import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, toDisplayString, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const imgs = ref([
      {
        src: "https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"
      },
      {
        src: "https://www.example.com/cdn-static/mydemo/nextjs/images/et5/top-hero-desktop.jpg"
      },
      {
        src: "https://www.example.com/cdn-static/mydemo/nextjs/images/et7/et7-hero-desktop.jpg"
      },
      {
        src: "https://www.example.com/ecs/prod/s3fs-public/ec6/hero-background-mobile.jpg"
      },
      {
        src: "https://www.example.com/cdn-static/mydemo/nextjs/images/es8/intro/ES8-EU-SE.000.jpg"
      },
      {
        src: "https://www.example.com/ecs/prod/s3fs-public/hero/es6-banner-2-pc.png"
      }
    ]);
    const customLimitText = (total, limit) => {
      return `More ${total - limit}...`;
    };
    return {
      imgs,
      customLimitText
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_image_list = resolveComponent("h-image-list");
  const _component_h_image = resolveComponent("h-image");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_h_image_list, {
    margin: "8px",
    limit: 3,
    "limit-text-size": 20
  }, {
    limit: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="font-bold"${_scopeId}>More ${ssrInterpolate(_ctx.imgs.length - 3)}</span>`);
      } else {
        return [
          createVNode("span", { class: "font-bold" }, "More " + toDisplayString(_ctx.imgs.length - 3), 1)
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.imgs, (img) => {
          _push2(ssrRenderComponent(_component_h_image, {
            key: img.src,
            src: img.src,
            width: "120px",
            height: "120px",
            rounded: "8px",
            "show-viewer": true
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.imgs, (img) => {
            return openBlock(), createBlock(_component_h_image, {
              key: img.src,
              src: img.src,
              width: "120px",
              height: "120px",
              rounded: "8px",
              "show-viewer": true
            }, null, 8, ["src"]);
          }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Image/listCustom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const listCustom = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  listCustom as default
};
