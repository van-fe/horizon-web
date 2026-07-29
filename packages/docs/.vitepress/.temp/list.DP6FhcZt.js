import { defineComponent, ref, resolveComponent, withCtx, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = defineComponent({
  setup() {
    const margins = [2, 4, 8, 12];
    const limits = [1, 2, 3, 4, 5, 6];
    const margin = ref(8);
    const limit = ref(4);
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
    return {
      margins,
      limits,
      margin,
      limit,
      imgs
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_select = resolveComponent("h-select");
  const _component_h_option = resolveComponent("h-option");
  const _component_h_image_list = resolveComponent("h-image-list");
  const _component_h_image = resolveComponent("h-image");
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex align-center mb-5"><span>间距：</span>`);
  _push(ssrRenderComponent(_component_h_select, {
    modelValue: _ctx.margin,
    "onUpdate:modelValue": ($event) => _ctx.margin = $event
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.margins, (item) => {
          _push2(ssrRenderComponent(_component_h_option, {
            key: item,
            label: item,
            value: item
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.margins, (item) => {
            return openBlock(), createBlock(_component_h_option, {
              key: item,
              label: item,
              value: item
            }, null, 8, ["label", "value"]);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<span class="ml-4">最大数量：</span>`);
  _push(ssrRenderComponent(_component_h_select, {
    modelValue: _ctx.limit,
    "onUpdate:modelValue": ($event) => _ctx.limit = $event
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.limits, (item) => {
          _push2(ssrRenderComponent(_component_h_option, {
            key: item,
            label: item,
            value: item
          }, null, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.limits, (item) => {
            return openBlock(), createBlock(_component_h_option, {
              key: item,
              label: item,
              value: item
            }, null, 8, ["label", "value"]);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_h_image_list, {
    margin: _ctx.margin,
    limit: _ctx.limit
  }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Image/list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const list = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  list as default
};
