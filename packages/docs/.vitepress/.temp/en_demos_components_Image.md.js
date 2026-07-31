import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Image.md","filePath":"en/demos/components/Image.md"}');
const _sfc_main = { name: "en/demos/components/Image.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Image</h1><p class="description">Set the image path through <code>src</code>, and set the image width and maximum width through <code>width</code> and <code>max-width</code>.</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Set the image path through <code>src</code>, and set the image width and maximum width through <code>width</code> and <code>max-width</code>.<br> You don&#39;t need to set the image height, so the image can maintain its original aspect ratio.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-image\n    src="/demo-assets/scene-aurora.svg"\n    width="500px"\n  />\n</template>\n',
    path: "demos/components/Image/basic.vue"
  }, null, _parent));
  _push(`<h2 id="set-height" tabindex="-1">Set Height <a class="header-anchor" href="#set-height" aria-label="Permalink to &quot;Set Height&quot;">​</a></h2><p>You can also set the image height and maximum height through <code>height</code> and <code>max-height</code>, which is equivalent to customizing the image aspect ratio.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-image\n    src="/demo-assets/scene-aurora.svg"\n    width="500px"\n    height="500px"\n  />\n</template>\n',
    path: "demos/components/Image/height.vue"
  }, null, _parent));
  _push(`<h2 id="set-aspect-ratio" tabindex="-1">Set Aspect Ratio <a class="header-anchor" href="#set-aspect-ratio" aria-label="Permalink to &quot;Set Aspect Ratio&quot;">​</a></h2><p>Sometimes the image width is not a fixed value, making it inconvenient to set the height, but you want to customize the image aspect ratio. At this time, <code>aspect-ratio</code> can help you. For details, see <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio" target="_blank" rel="noreferrer">MDN</a>.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex">
    <div v-for="ratio in ratios" :key="ratio" class="mr-3" style="width: 20%">
            <p class="text-center">{{ ratio.replace('/', ':') }}</p>
      <h-image
        src="/demo-assets/scene-aurora.svg"
        width="100%"
        :aspect-ratio="ratio"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      ratios: ['1/1', '16/9'],
    };
  },
});
<\/script>
`,
    path: "demos/components/Image/aspect.vue"
  }, null, _parent));
  _push(`<h2 id="fit-content-box" tabindex="-1">Fit Content Box <a class="header-anchor" href="#fit-content-box" aria-label="Permalink to &quot;Fit Content Box&quot;">​</a></h2><p>When the actual aspect ratio of the image is inconsistent with the original aspect ratio, you can control how the image fits the content box through the <code>object-fit</code> attribute. For details, see <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit" target="_blank" rel="noreferrer">MDN</a>.<br> The dashed line is used to indicate the size of the current content box.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex flex-wrap">
    <div v-for="item in fits" :key="item">
      <p class="text-center">
        {{ item }}
        <span v-if="item === 'cover'">(default)</span>
      </p>
      <h-image
        src="/demo-assets/scene-aurora.svg"
        :object-fit="item"
        class="mr-2 img"
        :width="150"
        :height="150"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    };
  },
});
<\/script>

<style scoped>
.img {
  border: 2px dashed #aaa;
}
</style>
`,
    path: "demos/components/Image/fit.vue"
  }, null, _parent));
  _push(`<h2 id="set-title" tabindex="-1">Set Title <a class="header-anchor" href="#set-title" aria-label="Permalink to &quot;Set Title&quot;">​</a></h2><p>Set <code>show-tooltip</code> to <code>true</code> and <code>title</code> is not empty, and the image title will be displayed in the form of tooltip.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-image\n    src="/demo-assets/scene-aurora.svg"\n    width="300px"\n    show-tooltip\n    title="Demo ES7 FAR BEYOND"\n  />\n</template>\n',
    path: "demos/components/Image/title.vue"
  }, null, _parent));
  _push(`<h2 id="set-border-radius" tabindex="-1">Set Border Radius <a class="header-anchor" href="#set-border-radius" aria-label="Permalink to &quot;Set Border Radius&quot;">​</a></h2><p>Control the border radius of the image through <code>rounded</code>.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex">
    <h-image
      v-for="rounded in roundedList"
      :key="rounded"
      class="mr-3"
      src="/demo-assets/scene-aurora.svg"
      width="150px"
      height="150px"
      :rounded="rounded"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      roundedList: [0, 2, 4, '8px', '50%'],
    };
  },
});
<\/script>
`,
    path: "demos/components/Image/rounded.vue"
  }, null, _parent));
  _push(`<h2 id="placeholder" tabindex="-1">Placeholder <a class="header-anchor" href="#placeholder" aria-label="Permalink to &quot;Placeholder&quot;">​</a></h2><p>By default, a placeholder of adaptive size will be displayed during image loading. You can also customize it through the <code>placeholder</code> slot.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-button class="mb-2" @click="generateImage">reload</h-button>
    <div class="flex">
      <h-image :src="imgSrc" class="mr-2" :width="70" :height="70" />
      <h-image :src="imgSrc" class="mr-2" :width="100" :height="100" />
      <h-image :src="imgSrc" class="mr-2" :width="150" :height="150" />
      <h-image :src="imgSrc" :width="150" :height="150">
        <template #placeholder>
          <div class="flex justify-center align-center" style="height: 100%">Loading...</div>
        </template>
      </h-image>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getDemoImageUrl } from '../../demo-assets';
export default defineComponent({
  setup() {
    const imgSrc = ref('');
    let imageIndex = 0;
    const generateImage = () => {
      imgSrc.value = getDemoImageUrl(imageIndex);
      imageIndex += 1;
    };
    generateImage();
    return {
      imgSrc,
      generateImage,
    };
  },
});
<\/script>
`,
    path: "demos/components/Image/placeholder.vue"
  }, null, _parent));
  _push(`<h2 id="load-failed" tabindex="-1">Load Failed <a class="header-anchor" href="#load-failed" aria-label="Permalink to &quot;Load Failed&quot;">​</a></h2><p>By default, error content of adaptive size will be displayed after the image fails to load. You can also customize it through the <code>error</code> slot.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="flex">\n    <h-image src="https://not-found" class="mr-2" :width="70" :height="70" />\n    <h-image src="https://not-found" class="mr-2" :width="100" :height="100" />\n    <h-image src="https://not-found" class="mr-2" :width="150" :height="150" />\n    <h-image src="https://not-found" :width="150" :height="150">\n      <template #error>\n        <div class="flex justify-center align-center" style="height: 100%">Error</div>\n      </template>\n    </h-image>\n  </div>\n</template>\n',
    path: "demos/components/Image/error.vue"
  }, null, _parent));
  _push(`<h2 id="lazy-load" tabindex="-1">Lazy Load <a class="header-anchor" href="#lazy-load" aria-label="Permalink to &quot;Lazy Load&quot;">​</a></h2><p>Pass in <code>lazyload</code> to enable lazy loading. Images will only be loaded when they first appear in the visible area.<br> You can open Developer Tools - Network - Filter Img, then go back to the top of the page and refresh the page to observe when the images are loaded.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div>\n    <h-image\n      src="/demo-assets/scene-aurora.svg"\n      lazyload\n      :width="500"\n    />\n  </div>\n</template>\n',
    path: "demos/components/Image/lazyload.vue"
  }, null, _parent));
  _push(`<h2 id="image-viewer" tabindex="-1">Image Viewer <a class="header-anchor" href="#image-viewer" aria-label="Permalink to &quot;Image Viewer&quot;">​</a></h2><p>Pass in <code>show-viewer</code> to enable the image viewer <code>&lt;h-viewer /&gt;</code>.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-image\n    src="/demo-assets/scene-aurora.svg"\n    show-viewer\n    :width="500"\n  />\n</template>\n',
    path: "demos/components/Image/viewer.vue"
  }, null, _parent));
  _push(`<h2 id="action-items" tabindex="-1">Action Items <a class="header-anchor" href="#action-items" aria-label="Permalink to &quot;Action Items&quot;">​</a></h2><p>Sometimes you want to display some action items when the mouse moves over the image. You can set <code>show-actions</code> to <code>true</code> and pass in an action list through <code>actions-list</code>.<br> By default, when the image width is greater than <code>40px</code>, the action items will be displayed as buttons, otherwise they will be displayed as a dropdown list; when the image width is greater than <code>80px</code>, the action items will be located in the bottom right corner, otherwise they will be centered. You can also completely customize the type and position through <code>actions-type</code> and <code>actions-position</code>.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex">
    <h-image
      v-for="size in sizes"
      :key="size"
      src="/demo-assets/scene-aurora.svg"
      :show-actions="true"
      :actions-list="actions"
      class="mr-2"
      :width="size"
      :height="size"
      @load="imgLoad"
      @error="imgError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HImageAction } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const sizes = [150, 80, 40];
    const actions = ref<HImageAction[]>([]);
    const imgLoad = () => {
      actions.value = [
        {
          icon: 'scale_big',
          title: '放大',
          handler: (src: string) => {
            console.info('scale_big', src);
          },
        },
        {
          icon: 'download',
          title: '下载',
          handler: (src: string) => {
            console.info('download', src);
          },
        },
        {
          icon: 'rubbish',
          title: '删除',
          handler: (src: string) => {
            console.info('close', src);
          },
        },
      ];
    };
    const imgError = () => {
      actions.value = [
        {
          icon: 'refresh',
          title: '重新加载',
          handler: (src: string) => {
            console.info('refresh', src);
          },
        },
      ];
    };
    return {
      sizes,
      actions,
      imgLoad,
      imgError,
    };
  },
});
<\/script>
`,
    path: "demos/components/Image/actions.vue"
  }, null, _parent));
  _push(`<h2 id="content-slot" tabindex="-1">Content Slot <a class="header-anchor" href="#content-slot" aria-label="Permalink to &quot;Content Slot&quot;">​</a></h2><p>If you need to completely customize the content on the image, you can use the default slot, which will always be displayed on the upper layer of the image; we also provide a <code>hover</code> slot, which will only be displayed when the mouse moves over the image.<br> The content slot will only take effect after the image has been successfully loaded.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="flex">\n    <h-image\n      src="/demo-assets/scene-aurora.svg"\n      width="300px"\n      height="300px"\n      class="mr-2"\n    >\n      <div\n        class="absolute p-3"\n        style="\n          width: 100%;\n          bottom: 0;\n          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);\n        "\n      >\n        <div class="white text-body-1">Demo ES7</div>\n        <span class="white">FAR BEYOND</span>\n      </div>\n    </h-image>\n    <h-image\n      src="/demo-assets/scene-aurora.svg"\n      width="300px"\n      height="300px"\n    >\n      <template #hover>\n        <div\n          class="absolute p-3"\n          style="\n            width: 100%;\n            bottom: 0;\n            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);\n          "\n        >\n          <div class="white text-body-1">Demo ES7</div>\n          <span class="white">FAR BEYOND</span>\n        </div>\n      </template>\n    </h-image>\n  </div>\n</template>\n',
    path: "demos/components/Image/slot.vue"
  }, null, _parent));
  _push(`<h2 id="image-list" tabindex="-1">Image List <a class="header-anchor" href="#image-list" aria-label="Permalink to &quot;Image List&quot;">​</a></h2><p>To make it easier to display a series of images, we also provide the <code>h-image-list</code> component. You can control the spacing between each image and the maximum number of images to display.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <div class="flex align-center mb-5">
      <span>间距：</span>
      <h-select v-model="margin">
        <h-option v-for="item in margins" :key="item" :label="item" :value="item"></h-option>
      </h-select>
      <span class="ml-4">最大数量：</span>
      <h-select v-model="limit">
        <h-option v-for="item in limits" :key="item" :label="item" :value="item"></h-option>
      </h-select>
    </div>
    <h-image-list :margin="margin" :limit="limit">
      <h-image
        v-for="img in imgs"
        :key="img.src"
        :src="img.src"
        width="120px"
        height="120px"
        rounded="8px"
        :show-viewer="true"
      />
    </h-image-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const margins = [2, 4, 8, 12];
    const limits = [1, 2, 3, 4, 5, 6];
    const margin = ref(8);
    const limit = ref(4);
    const imgs = ref([
      {
        src: '/demo-assets/scene-aurora.svg',
      },
      {
        src: '/demo-assets/scene-summit.svg',
      },
      {
        src: '/demo-assets/scene-city.svg',
      },
      {
        src: '/demo-assets/scene-coast.svg',
      },
      {
        src: '/demo-assets/scene-forest.svg',
      },
      {
        src: '/demo-assets/scene-night.svg',
      },
    ]);
    return {
      margins,
      limits,
      margin,
      limit,
      imgs,
    };
  },
});
<\/script>
`,
    path: "demos/components/Image/list.vue"
  }, null, _parent));
  _push(`<h2 id="custom-overflow" tabindex="-1">Custom Overflow <a class="header-anchor" href="#custom-overflow" aria-label="Permalink to &quot;Custom Overflow&quot;">​</a></h2><p>You can control the font size of overflow text through <code>limit-text-size</code>, and you can also completely customize the overflow display through the <code>limit</code> slot.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-image-list margin="8px" :limit="3" :limit-text-size="20">
      <h-image
        v-for="img in imgs"
        :key="img.src"
        :src="img.src"
        width="120px"
        height="120px"
        rounded="8px"
        :show-viewer="true"
      />
      <template #limit>
        <span class="font-bold">More {{ imgs.length - 3 }}</span>
      </template>
    </h-image-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const imgs = ref([
      {
        src: '/demo-assets/scene-aurora.svg',
      },
      {
        src: '/demo-assets/scene-summit.svg',
      },
      {
        src: '/demo-assets/scene-city.svg',
      },
      {
        src: '/demo-assets/scene-coast.svg',
      },
      {
        src: '/demo-assets/scene-forest.svg',
      },
      {
        src: '/demo-assets/scene-night.svg',
      },
    ]);
    const customLimitText = (total: number, limit: number) => {
      return \`More \${total - limit}...\`;
    };
    return {
      imgs,
      customLimitText,
    };
  },
});
<\/script>
`,
    path: "demos/components/Image/listCustom.vue"
  }, null, _parent));
  _push(`<h2 id="image-api" class="no-underline h2"><a href="#image-api" class="!no-underline">Image Api</a></h2><h3 id="image-props" class="no-underline h3"><a href="#image-props" class="!no-underline">Image Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">src</td><td>Configuration for src.</td><td><code>string</code></td><td class="text-center">Yes</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">alt</td><td>Configuration for alt.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">width</td><td>Configuration for width.</td><td><code>string | number</code></td><td class="text-center">No</td><td>&#39;auto&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-width</td><td>Configuration for max width.</td><td><code>string | number</code></td><td class="text-center">No</td><td>&#39;none&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">height</td><td>Configuration for height.</td><td><code>string | number</code></td><td class="text-center">No</td><td>&#39;auto&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-height</td><td>Configuration for max height.</td><td><code>string | number</code></td><td class="text-center">No</td><td>&#39;none&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">aspect-ratio</td><td>Configuration for aspect ratio.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;auto&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">object-fit</td><td>Configuration for object fit.</td><td><code>&#39;fill&#39; | &#39;contain&#39; | &#39;cover&#39; | &#39;none&#39; | &#39;scale-down&#39;</code></td><td class="text-center">No</td><td>&#39;cover&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rounded</td><td>Configuration for rounded.</td><td><code>string | number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">animated</td><td>Configuration for animated.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">lazyload</td><td>Configuration for lazyload.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>Configuration for title.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-tooltip</td><td>Configuration for show tooltip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-placeholder</td><td>Configuration for show placeholder.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-error</td><td>Configuration for show error.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-viewer</td><td>Configuration for show viewer.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewer-src</td><td>Configuration for viewer src.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-actions</td><td>Configuration for show actions.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">actions-list</td><td>Configuration for actions list.</td><td><code>HImageAction[]</code></td><td class="text-center">No</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">actions-position</td><td>Configuration for actions position.</td><td><code>&#39;auto&#39; | &#39;center&#39; | &#39;bottom-right&#39;</code></td><td class="text-center">No</td><td>&#39;auto&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">actions-type</td><td>Configuration for actions type.</td><td><code>&#39;auto&#39; | &#39;icon&#39; | &#39;dropdown&#39;</code></td><td class="text-center">No</td><td>&#39;auto&#39;</td></tr></tbody></table><h3 id="image-emits" class="no-underline h3"><a href="#image-emits" class="!no-underline">Image Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">load</td><td rowspan="1">Emitted when load changes.</td><td rowspan="1">( path: <code>string | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">path</td><td><code>string | undefined</code></td><td>The path value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">error</td><td rowspan="1">Emitted when error changes.</td><td rowspan="1">( path: <code>string | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">path</td><td><code>string | undefined</code></td><td>The path value.</td></tr></tbody></table><h2 id="imagelist-api" class="no-underline h2"><a href="#imagelist-api" class="!no-underline">ImageList Api</a></h2><h3 id="imagelist-props" class="no-underline h3"><a href="#imagelist-props" class="!no-underline">ImageList Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">margin</td><td>Configuration for margin.</td><td><code>string | number</code></td><td class="text-center">No</td><td>&#39;8px&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">limit</td><td>Configuration for limit.</td><td><code>number</code></td><td class="text-center">No</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">limit-text-size</td><td>Configuration for limit text size.</td><td><code>string | number</code></td><td class="text-center">No</td><td>&#39;14px&#39;</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Image.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Image = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Image as default
};
