import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Link.md","filePath":"en/demos/components/Link.md"}');
const _sfc_main = { name: "en/demos/components/Link.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Link</h1><p class="description">Basic text link usage</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Basic text link usage</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="demo-wrapper">\n    <h-link>Default</h-link>\n    <h-link :loading="true">Loading text will replace me</h-link>\n  </div>\n</template>\n\n<style scoped>\n.demo-wrapper {\n  display: flex;\n  align-items: center;\n}\n</style>\n',
    path: "demos/components/Link/base.vue"
  }, null, _parent));
  _push(`<h2 id="different-sizes" tabindex="-1">Different Sizes <a class="header-anchor" href="#different-sizes" aria-label="Permalink to &quot;Different Sizes&quot;">​</a></h2><p>Control size by setting <code>size</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div>\n    <h-row>\n      <h-col>\n        <h-link size="small">Small</h-link>\n        <h-link size="medium">Medium</h-link>\n        <h-link size="large">Large</h-link>\n      </h-col>\n    </h-row>\n    <h-row>\n      <h-col>\n        <h-link size="small" :loading="true">Small</h-link>\n        <h-link size="medium" :loading="true">Medium</h-link>\n        <h-link size="large" :loading="true">Large</h-link>\n      </h-col>\n    </h-row>\n  </div>\n</template>\n\n<script lang="ts">\nexport default {\n  data() {\n    return {\n      loading: false,\n    };\n  },\n};\n<\/script>\n',
    path: "demos/components/Link/size.vue"
  }, null, _parent));
  _push(`<h2 id="different-types" tabindex="-1">Different Types <a class="header-anchor" href="#different-types" aria-label="Permalink to &quot;Different Types&quot;">​</a></h2><p>Use <code>type</code> to set different states of <code>link</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="demo-wrapper">\n    <h-link>Positive</h-link>\n    <h-link type="neutral">Neutral</h-link>\n    <h-link type="negative">Negative</h-link>\n  </div>\n</template>\n\n<style scoped>\n.demo-wrapper {\n  display: flex;\n  align-items: center;\n}\n</style>\n',
    path: "demos/components/Link/type.vue"
  }, null, _parent));
  _push(`<h2 id="different-states" tabindex="-1">Different States <a class="header-anchor" href="#different-states" aria-label="Permalink to &quot;Different States&quot;">​</a></h2><p>Text link different states</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-link :href="randomHref">Will Visit</h-link>
  <h-link :href="currentHref">Already Visited</h-link>
  <h-link disabled>Disabled</h-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  computed: {
    currentHref() {
      return window.location.href;
    },
    randomHref() {
      return '?' + Math.round(Math.random() * 1000000);
    },
  },
});
<\/script>
`,
    path: "demos/components/Link/status.vue"
  }, null, _parent));
  _push(`<h2 id="jump-method" tabindex="-1">Jump Method <a class="header-anchor" href="#jump-method" aria-label="Permalink to &quot;Jump Method&quot;">​</a></h2><p>Text link jump method, same as the <code>target</code> of the <code>a</code> tag</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { computed } from 'vue';

const randomHref = computed(() => '?' + Math.round(Math.random() * 1000000));
<\/script>

<template>
  <h-link :href="randomHref">Jump to Home in this page</h-link>
  <h-link :href="randomHref" target="_blank">Jump to Home in new window</h-link>
</template>
`,
    path: "demos/components/Link/jump-reaction.vue"
  }, null, _parent));
  _push(`<h2 id="underline" tabindex="-1">Underline <a class="header-anchor" href="#underline" aria-label="Permalink to &quot;Underline&quot;">​</a></h2><p>Text link underline</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-link>with underline</h-link>\n  <h-link :underline="false">without underline</h-link>\n  <h-link underline="always">Always Show</h-link>\n</template>\n',
    path: "demos/components/Link/underline.vue"
  }, null, _parent));
  _push(`<h2 id="icon" tabindex="-1">ICON <a class="header-anchor" href="#icon" aria-label="Permalink to &quot;ICON&quot;">​</a></h2><p>You can set <code>icon</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-link :href="randomHref" :underline="false" icon="share" icon-suffix="2xs">
    Open New Link
  </h-link>
  <h-link :href="currentHref" :underline="false" icon="share" icon-suffix="2xs">
    Open Visited Link
  </h-link>
  <h-link :href="randomHref" :underline="false" icon="share" icon-suffix="2xs" disabled>
    Disable Open Link
  </h-link>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    currentHref() {
      return window.location.href;
    },
    randomHref() {
      return '?' + Math.round(Math.random() * 1000000);
    },
  },
});
<\/script>
`,
    path: "demos/components/Link/icon.vue"
  }, null, _parent));
  _push(`<h2 id="annotation" tabindex="-1">Annotation <a class="header-anchor" href="#annotation" aria-label="Permalink to &quot;Annotation&quot;">​</a></h2><p>Links with annotation effect. Text links do not provide popups, please use <code>h-popover</code> to wrap</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-popover>\n    <template #popper>\n      <h-pop-content>Something need to popper...</h-pop-content>\n    </template>\n    <template #reference>\n      <h-link attribute type="text">Has Attribute</h-link>\n    </template>\n  </h-popover>\n</template>\n',
    path: "demos/components/Link/attribute.vue"
  }, null, _parent));
  _push(`<h2 id="anchor" tabindex="-1">Anchor <a class="header-anchor" href="#anchor" aria-label="Permalink to &quot;Anchor&quot;">​</a></h2><p>With anchor, you can also set <code>anchor-offset</code> to scroll to px from the top</p><p>Because the content of this document is placed in <code>h-main</code>, you need to set <code>scroll-target</code></p><p>Note:</p><ul><li>If <code>anchor</code>, <code>to</code> or <code>href</code> are passed in at the same time, <code>to</code> and <code>href</code> will be ignored</li><li>Must use history routing form, hash routing form will affect the use of anchors</li></ul>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <p>\n    <h-link anchor="anchor" type="text" :underline="false" scroll-target=".VPDoc">Anchor</h-link>\n  </p>\n  <p>\n    <h-link\n      anchor="anchor2"\n      :anchor-offset="200"\n      type="text"\n      :underline="false"\n      scroll-target=".VPDoc"\n    >\n      Anchor2 Set Offset 200\n    </h-link>\n  </p>\n</template>\n',
    path: "demos/components/Link/anchor.vue"
  }, null, _parent));
  _push(`<h2 id="use-with-vue-router" tabindex="-1">Use with <code>vue-router</code> <a class="header-anchor" href="#use-with-vue-router" aria-label="Permalink to &quot;Use with \`vue-router\`&quot;">​</a></h2><p>You can use <code>to</code> <code>replace</code> parameters with <code>vue-router</code></p><blockquote><p><em>Note that <code>to</code> has higher priority than <code>href</code></em></p></blockquote>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-link to="/">Go to other route</h-link>\n  <h-link to="/" replace>Go to other route and replace</h-link>\n</template>\n',
    path: "demos/components/Link/vue-router.vue"
  }, null, _parent));
  _push(`<h2 id="prefix-suffix" tabindex="-1">Prefix/Suffix <a class="header-anchor" href="#prefix-suffix" aria-label="Permalink to &quot;Prefix/Suffix&quot;">​</a></h2><p>Links with prefix and suffix, you can use <code>icon</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <p>
    <h-link>
      <template #suffix>...</template>
      And So on
    </h-link>
  </p>
  <p>
    <h-link icon="el-icon-edit" :underline="false">
      {{ new Date().toLocaleString() }}
      <template #prefix><a-icon name="time" suffix="2xs" /></template>
    </h-link>
  </p>
</template>

<script>
import { defineComponent } from 'vue';
import { AIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    AIcon,
  },
});
<\/script>
`,
    path: "demos/components/Link/prefix-suffix.vue"
  }, null, _parent));
  _push(`<h2 id="link-api" class="no-underline h2"><a href="#link-api" class="!no-underline">Link Api</a></h2><h3 id="link-props" class="no-underline h3"><a href="#link-props" class="!no-underline">Link Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>Configuration for type.</td><td><code>&#39;default&#39; | &#39;text&#39; | &#39;positive&#39; | &#39;neutral&#39; | &#39;negative&#39;</code></td><td class="text-center">No</td><td>&#39;positive&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">underline</td><td>Configuration for underline.</td><td><code>boolean | &#39;always&#39;</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">href</td><td>Configuration for href.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td>Configuration for target.</td><td><code>&#39;_blank&#39; | &#39;_self&#39; | &#39;_parent&#39; | &#39;_top&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">attribute</td><td>Configuration for attribute.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">anchor</td><td>Configuration for anchor.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">anchor-position</td><td>Configuration for anchor position.</td><td><code>&#39;right&#39; | &#39;left&#39;</code></td><td class="text-center">No</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">anchor-offset</td><td>Configuration for anchor offset.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>Configuration for icon.</td><td><code>iconPropType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-size</td><td>Configuration for icon size.</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to</td><td>Configuration for to.</td><td><code>RouteLocationRaw</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">replace</td><td>Configuration for replace.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-target</td><td>Configuration for scroll target.</td><td><code>string | Element</code></td><td class="text-center">No</td><td>&#39;body&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading</td><td>Configuration for loading.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="link-emits" class="no-underline h3"><a href="#link-emits" class="!no-underline">Link Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">Emitted when click changes.</td><td rowspan="1">( event: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">event</td><td><code>MouseEvent</code></td><td>The event value.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Link.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Link = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Link as default
};
