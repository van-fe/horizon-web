import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Empty.md","filePath":"en/demos/components/Empty.md"}');
const _sfc_main = { name: "en/demos/components/Empty.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Empty</h1><p class="description">Default empty placeholder effect.</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Default empty placeholder effect.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: "<template>\n  <h-empty />\n</template>\n",
    path: "demos/components/Empty/basic.vue"
  }, null, _parent));
  _push(`<h2 id="description-text" tabindex="-1">Description Text <a class="header-anchor" href="#description-text" aria-label="Permalink to &quot;Description Text&quot;">​</a></h2><p>Empty placeholder effect with description text.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-empty description="No task for now, take a coffee break" />\n</template>\n',
    path: "demos/components/Empty/description.vue"
  }, null, _parent));
  _push(`<h2 id="size" tabindex="-1">Size <a class="header-anchor" href="#size" aria-label="Permalink to &quot;Size&quot;">​</a></h2><p>Set the size of the empty placeholder, supporting built-in sizes and numeric sizes.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-empty :size="emptySizeRef" description="No task for now, take a coffee break" />
  <h-radio-group v-model="sizeRef">
    <h-radio label="small" />
    <h-radio label="medium" />
    <h-radio label="large" />
    <h-radio label="number">
      <h-input-number v-model="sizeNumberRef" :step="10" />
    </h-radio>
  </h-radio-group>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const sizeRef = ref('medium');
const sizeNumberRef = ref(240);

const emptySizeRef = computed(() => {
  if (sizeRef.value === 'number') {
    return sizeNumberRef.value;
  }
  return sizeRef.value;
});
<\/script>
`,
    path: "demos/components/Empty/size.vue"
  }, null, _parent));
  _push(`<h2 id="built-in-image" tabindex="-1">Built-in Image <a class="header-anchor" href="#built-in-image" aria-label="Permalink to &quot;Built-in Image&quot;">​</a></h2><p>Set and use built-in images.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex flex-wrap">
    <div v-for="name in presentedImageNameList" :key="name">
      <h-empty :image="HEmpty.PRESENTED_IMAGES[name]" :description="name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { HEmpty } from '@aurora/horizon-web';

type PresentedImageName = keyof typeof HEmpty.PRESENTED_IMAGES;

const presentedImageNameList = ref<PresentedImageName[]>(
  Object.keys(HEmpty.PRESENTED_IMAGES) as PresentedImageName[],
);
<\/script>
`,
    path: "demos/components/Empty/image-presented.vue"
  }, null, _parent));
  _push(`<h2 id="external-image" tabindex="-1">External Image <a class="header-anchor" href="#external-image" aria-label="Permalink to &quot;External Image&quot;">​</a></h2><p>Set and use external images. It is recommended to use svg images with a recommended size of 160*160.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-empty\n    :size="120"\n    image="https://static.example.com/fx-static/issue-management/clbn4wr6r000807742tv19ro7/img-default.svg"\n  />\n</template>\n',
    path: "demos/components/Empty/image-external.vue"
  }, null, _parent));
  _push(`<h2 id="custom-image" tabindex="-1">Custom Image <a class="header-anchor" href="#custom-image" aria-label="Permalink to &quot;Custom Image&quot;">​</a></h2><p>Customize image through slot.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-empty :size="120">\n    <template #image>\n      <div class="my-img">\n        <img\n          src="https://static.example.com/fx-static/issue-management/clbn4wr6r000807742tv19ro7/img-default.svg"\n          alt="img"\n        />\n      </div>\n    </template>\n  </h-empty>\n</template>\n\n<style lang="scss">\n.my-img {\n  width: 100%;\n  border-radius: 50%;\n  overflow: hidden;\n}\n</style>\n',
    path: "demos/components/Empty/image-slot.vue"
  }, null, _parent));
  _push(`<h2 id="custom-description" tabindex="-1">Custom Description <a class="header-anchor" href="#custom-description" aria-label="Permalink to &quot;Custom Description&quot;">​</a></h2><p>Customize description through slot.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-empty>\n    <template #description>\n      <span>\n        No data found,\n        <a href="#">try refresh?</a>\n      </span>\n    </template>\n  </h-empty>\n</template>\n',
    path: "demos/components/Empty/description-slot.vue"
  }, null, _parent));
  _push(`<h2 id="custom-bottom-content" tabindex="-1">Custom Bottom Content <a class="header-anchor" href="#custom-bottom-content" aria-label="Permalink to &quot;Custom Bottom Content&quot;">​</a></h2><p>Customize bottom content through default slot.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n	<div class="flex justify-center">\n		<h-empty description="No data found.">\n			<h-button size="small">Refresh</h-button>\n		</h-empty>\n		<h-empty description="No data found.">\n			<h-button plain size="small">Back</h-button>\n			<h-button size="small">Refresh</h-button>\n		</h-empty>\n	</div>\n</template>\n',
    path: "demos/components/Empty/bottom-slot.vue"
  }, null, _parent));
  _push(`<h2>Empty Api</h2><h3>Empty Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">image</td><td>图片地址<br>可使用内置图片，列表见文档<br>可使用自定义图片，建议使用 svg，尺寸 160*160<br>还可使用插槽自定义</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸(图片宽度)<br>支持内置 small, medium, large 宽度和数值宽度。默认是 medium.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description</td><td>描述文字<br>可使用插槽自定义</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Empty.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Empty = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Empty as default
};
