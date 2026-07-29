import { defineComponent, ref, watch, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo4",
  __ssrInlineRender: true,
  setup(__props) {
    const global = ref(false);
    const content = ref("watermark watermark");
    const image = ref(null);
    const showImage = ref(false);
    const rotate = ref(-15);
    const zIndex = ref(99999);
    const lineGap = ref(5);
    const gapX = ref(100);
    const gapY = ref(60);
    const offsetX = ref(0);
    const offsetY = ref(0);
    const opacity = ref(0.1);
    watch(showImage, () => {
      image.value = showImage.value ? "https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg" : null;
    });
    const tamperedHandle = () => {
      console.info("水印元素被“删除”或“篡改”啦！");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_watermark = resolveComponent("h-watermark");
      const _component_h_switch = resolveComponent("h-switch");
      const _component_h_input = resolveComponent("h-input");
      const _component_h_input_number = resolveComponent("h-input-number");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wrapper" }, _attrs))} data-v-d5f1b40d><div class="content-box" data-v-d5f1b40d>`);
      _push(ssrRenderComponent(_component_h_watermark, {
        content: content.value,
        image: image.value,
        rotate: rotate.value,
        "z-index": zIndex.value,
        "line-gap": lineGap.value,
        gap: [gapX.value, gapY.value],
        offset: [offsetX.value, offsetY.value],
        opacity: opacity.value,
        global: global.value,
        onTampered: tamperedHandle
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "height": "500px", "overflow": "auto" })}" data-v-d5f1b40d${_scopeId}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem rerum, dolores ex ipsa distinctio officiis necessitatibus ab deserunt aperiam veritatis quisquam nihil non praesentium quasi ad tempore est. Necessitatibus, id. Voluptatem incidunt fugiat fuga quasi iure nobis assumenda impedit nesciunt sequi facere illo ad, necessitatibus odit rerum itaque maxime. Quos molestias aut iste quas eveniet. Tempore culpa molestias beatae impedit. Tempore distinctio accusantium commodi illum ducimus rerum magnam totam sapiente obcaecati illo nostrum corrupti qui velit accusamus iste a et quos, quae cupiditate at deleniti eos! Minima qui debitis in. Necessitatibus officiis nulla iste incidunt unde iure, natus vel voluptatem voluptates minus commodi ad? Velit facere, dolorum rem explicabo voluptate ullam! Facere porro suscipit reprehenderit impedit maxime sed vero aliquid? Cumque, harum. Dignissimos, est quo aliquid placeat minus at quae fugiat deserunt, iure beatae quasi alias aspernatur explicabo, assumenda facere quibusdam veritatis unde dolorem facilis. Delectus officiis quae facilis aliquid? Minus expedita dolor omnis necessitatibus earum? Enim assumenda sequi dolorum consequuntur possimus nulla vero fuga asperiores voluptate laudantium, qui aliquam corporis aliquid, repellat eius eos nisi quam velit modi maxime. Vel minus, ab voluptas veritatis nobis libero ipsum eum ullam blanditiis architecto voluptatem. Eveniet accusantium nobis rerum a aspernatur! Odit nemo quidem tenetur, perspiciatis optio molestias! Modi, beatae. Veritatis, quos. Esse unde ipsam saepe magni, blanditiis qui obcaecati rem officiis earum repellat, et totam sit odio quo, doloribus harum eos vel voluptates excepturi a ducimus! Dolorem quis libero voluptate esse! Nihil nemo laudantium dolore voluptatem iste omnis maxime tenetur, nisi ut veniam doloremque exercitationem vero, qui, porro pariatur! Minus, fugiat ipsa explicabo praesentium tempora delectus aspernatur saepe dolor aliquam pariatur? Maxime cum facere saepe? Dolorem, ipsa, animi excepturi corporis sint velit incidunt placeat totam esse, quos dolores vel? Facilis at maiores ullam dolores voluptas eum temporibus rerum quam modi tempore. Nihil nemo laudantium dolore voluptatem iste omnis maxime tenetur, nisi ut veniam doloremque exercitationem vero, qui, porro pariatur! Minus, fugiat ipsa explicabo praesentium tempora delectus aspernatur saepe dolor aliquam pariatur? Maxime cum facere saepe? Dolorem, ipsa, animi excepturi corporis sint velit incidunt placeat totam esse, quos dolores vel? Facilis at maiores ullam dolores voluptas eum temporibus rerum quam modi tempore. </div>`);
          } else {
            return [
              createVNode("div", { style: { "height": "500px", "overflow": "auto" } }, " Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem rerum, dolores ex ipsa distinctio officiis necessitatibus ab deserunt aperiam veritatis quisquam nihil non praesentium quasi ad tempore est. Necessitatibus, id. Voluptatem incidunt fugiat fuga quasi iure nobis assumenda impedit nesciunt sequi facere illo ad, necessitatibus odit rerum itaque maxime. Quos molestias aut iste quas eveniet. Tempore culpa molestias beatae impedit. Tempore distinctio accusantium commodi illum ducimus rerum magnam totam sapiente obcaecati illo nostrum corrupti qui velit accusamus iste a et quos, quae cupiditate at deleniti eos! Minima qui debitis in. Necessitatibus officiis nulla iste incidunt unde iure, natus vel voluptatem voluptates minus commodi ad? Velit facere, dolorum rem explicabo voluptate ullam! Facere porro suscipit reprehenderit impedit maxime sed vero aliquid? Cumque, harum. Dignissimos, est quo aliquid placeat minus at quae fugiat deserunt, iure beatae quasi alias aspernatur explicabo, assumenda facere quibusdam veritatis unde dolorem facilis. Delectus officiis quae facilis aliquid? Minus expedita dolor omnis necessitatibus earum? Enim assumenda sequi dolorum consequuntur possimus nulla vero fuga asperiores voluptate laudantium, qui aliquam corporis aliquid, repellat eius eos nisi quam velit modi maxime. Vel minus, ab voluptas veritatis nobis libero ipsum eum ullam blanditiis architecto voluptatem. Eveniet accusantium nobis rerum a aspernatur! Odit nemo quidem tenetur, perspiciatis optio molestias! Modi, beatae. Veritatis, quos. Esse unde ipsam saepe magni, blanditiis qui obcaecati rem officiis earum repellat, et totam sit odio quo, doloribus harum eos vel voluptates excepturi a ducimus! Dolorem quis libero voluptate esse! Nihil nemo laudantium dolore voluptatem iste omnis maxime tenetur, nisi ut veniam doloremque exercitationem vero, qui, porro pariatur! Minus, fugiat ipsa explicabo praesentium tempora delectus aspernatur saepe dolor aliquam pariatur? Maxime cum facere saepe? Dolorem, ipsa, animi excepturi corporis sint velit incidunt placeat totam esse, quos dolores vel? Facilis at maiores ullam dolores voluptas eum temporibus rerum quam modi tempore. Nihil nemo laudantium dolore voluptatem iste omnis maxime tenetur, nisi ut veniam doloremque exercitationem vero, qui, porro pariatur! Minus, fugiat ipsa explicabo praesentium tempora delectus aspernatur saepe dolor aliquam pariatur? Maxime cum facere saepe? Dolorem, ipsa, animi excepturi corporis sint velit incidunt placeat totam esse, quos dolores vel? Facilis at maiores ullam dolores voluptas eum temporibus rerum quam modi tempore. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="control-box" data-v-d5f1b40d><strong data-v-d5f1b40d>全局模式</strong><div class="control-item" data-v-d5f1b40d>`);
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: global.value,
        "onUpdate:modelValue": ($event) => global.value = $event
      }, null, _parent));
      _push(`</div><strong data-v-d5f1b40d>文本内容</strong><div class="control-item" data-v-d5f1b40d>`);
      _push(ssrRenderComponent(_component_h_input, {
        modelValue: content.value,
        "onUpdate:modelValue": ($event) => content.value = $event
      }, null, _parent));
      _push(`</div><strong data-v-d5f1b40d>是否显示图片内容</strong><div class="control-item" data-v-d5f1b40d>`);
      _push(ssrRenderComponent(_component_h_switch, {
        modelValue: showImage.value,
        "onUpdate:modelValue": ($event) => showImage.value = $event
      }, null, _parent));
      _push(`</div>`);
      if (showImage.value) {
        _push(`<!--[--><strong data-v-d5f1b40d>图片内容</strong><div class="control-item" data-v-d5f1b40d>`);
        _push(ssrRenderComponent(_component_h_input, {
          modelValue: image.value,
          "onUpdate:modelValue": ($event) => image.value = $event
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<strong data-v-d5f1b40d>旋转角度</strong><div class="control-item" data-v-d5f1b40d>`);
      _push(ssrRenderComponent(_component_h_input_number, {
        modelValue: rotate.value,
        "onUpdate:modelValue": ($event) => rotate.value = $event
      }, null, _parent));
      _push(`</div><strong data-v-d5f1b40d>zIndex层级</strong><div class="control-item" data-v-d5f1b40d>`);
      _push(ssrRenderComponent(_component_h_input_number, {
        modelValue: zIndex.value,
        "onUpdate:modelValue": ($event) => zIndex.value = $event
      }, null, _parent));
      _push(`</div><strong data-v-d5f1b40d>多行文本垂直方向的间距</strong><div class="control-item" data-v-d5f1b40d>`);
      _push(ssrRenderComponent(_component_h_input_number, {
        modelValue: lineGap.value,
        "onUpdate:modelValue": ($event) => lineGap.value = $event
      }, null, _parent));
      _push(`</div><strong data-v-d5f1b40d>水平及垂直间距（gapX、gapY）</strong><div class="control-item" data-v-d5f1b40d>`);
      _push(ssrRenderComponent(_component_h_input_number, {
        modelValue: gapX.value,
        "onUpdate:modelValue": ($event) => gapX.value = $event
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_input_number, {
        modelValue: gapY.value,
        "onUpdate:modelValue": ($event) => gapY.value = $event
      }, null, _parent));
      _push(`</div><strong data-v-d5f1b40d>水平及垂直偏移量（offsetX、offsetY）</strong><div class="control-item" data-v-d5f1b40d>`);
      _push(ssrRenderComponent(_component_h_input_number, {
        modelValue: offsetX.value,
        "onUpdate:modelValue": ($event) => offsetX.value = $event
      }, null, _parent));
      _push(ssrRenderComponent(_component_h_input_number, {
        modelValue: offsetY.value,
        "onUpdate:modelValue": ($event) => offsetY.value = $event
      }, null, _parent));
      _push(`</div><strong data-v-d5f1b40d>不透明度</strong><div class="control-item" data-v-d5f1b40d>`);
      _push(ssrRenderComponent(_component_h_input_number, {
        modelValue: opacity.value,
        "onUpdate:modelValue": ($event) => opacity.value = $event,
        min: 0,
        max: 1,
        step: 0.1
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Watermark/demo4.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demo4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d5f1b40d"]]);
export {
  demo4 as default
};
