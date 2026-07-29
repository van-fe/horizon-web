import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Button.md","filePath":"en/demos/components/Button.md"}');
const _sfc_main = { name: "en/demos/components/Button.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Button</h1><p class="description">Control the <code>type</code> field to enable different button colors</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Control the <code>type</code> field to enable different button colors</p><p>Set <code>round</code> to make the button oval-shaped</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<script setup lang="ts"><\/script>\n\n<template>\n  <h-row>\n    <h-col :span="24">\n      <h-button>Primary Button</h-button>\n      <h-button type="danger">Danger Button</h-button>\n    </h-col>\n    <h-col :span="24">\n      <h-button :round="true">Primary Button</h-button>\n      <h-button :round="true" type="danger">Danger Button</h-button>\n    </h-col>\n  </h-row>\n</template>\n\n<style scoped>\n.h-button + .h-button {\n  margin-left: 10px;\n}\n</style>\n',
    path: "demos/components/Button/basic.vue"
  }, null, _parent));
  _push(`<h2 id="size" tabindex="-1">Size <a class="header-anchor" href="#size" aria-label="Permalink to &quot;Size&quot;">​</a></h2><p>Control the <code>size</code> field to set different button sizes</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<script setup lang="ts"><\/script>\n\n<template>\n  <h-row>\n    <h-col :span="24">\n      <h-button size="small" :auto-fit="true">Small</h-button>\n      <h-button size="medium" :auto-fit="true">Medium</h-button>\n      <h-button size="large" :auto-fit="true">Large</h-button>\n    </h-col>\n  </h-row>\n</template>\n\n<style scoped>\n.h-button + .h-button {\n  margin-left: 10px;\n}\n</style>\n',
    path: "demos/components/Button/size.vue"
  }, null, _parent));
  _push(`<h2 id="plain-button" tabindex="-1">Plain Button <a class="header-anchor" href="#plain-button" aria-label="Permalink to &quot;Plain Button&quot;">​</a></h2><p>Use <code>plain = true</code> to enable plain button</p><p>If you need to apply it on a black background, set <code>ghost = true</code> to enable ghost button form</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col :span="24">\n      <h-button type="normal" plain>Normal Plain Button</h-button>\n      <h-button plain>Primary Plain Button</h-button>\n      <h-button type="danger" plain>Danger Plain Button</h-button>\n    </h-col>\n  </h-row>\n  <h-row class="dark-wrapper">\n    <h-col :span="24">\n      <h-button type="normal" ghost plain>Normal Ghost Button</h-button>\n      <h-button ghost plain>Primary Ghost Button</h-button>\n      <h-button type="danger" ghost plain>Danger Ghost Button</h-button>\n    </h-col>\n  </h-row>\n</template>\n\n<style scoped>\n.h-button + .h-button {\n  margin-left: 10px;\n}\n\n.dark-wrapper {\n  background: rgba(69, 69, 69, 1);\n  padding: 10px 0;\n}\n</style>\n',
    path: "demos/components/Button/plain.vue"
  }, null, _parent));
  _push(`<h2 id="text-button" tabindex="-1">Text Button <a class="header-anchor" href="#text-button" aria-label="Permalink to &quot;Text Button&quot;">​</a></h2><p>Use <code>text = true</code> to enable text button</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<script setup lang="ts"><\/script>\n\n<template>\n  <h-button type="normal" text>Normal Text Button</h-button>\n  <h-button text>Primary Text Button</h-button>\n  <h-button type="danger" text>Danger Text Button</h-button>\n</template>\n\n<style scoped>\n.h-button + .h-button {\n  margin-left: 10px;\n}\n</style>\n',
    path: "demos/components/Button/text.vue"
  }, null, _parent));
  _push(`<h2 id="link-button" tabindex="-1">Link Button <a class="header-anchor" href="#link-button" aria-label="Permalink to &quot;Link Button&quot;">​</a></h2><p>Use <code>link = true</code> to enable link button</p><p>Set <code>to</code> or <code>href</code> to jump directly</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<script setup lang="ts"><\/script>\n\n<template>\n  <h-row>\n    <h-col :span="24">\n      <h-button type="normal" :link="true">Normal Link Button</h-button>\n      <h-button type="primary" :link="true">Primary Link Button</h-button>\n      <h-button type="danger" :link="true">Danger Link Button</h-button>\n      <h-button type="normal" :link="true" href="/">href 跳到首页</h-button>\n      <h-button type="normal" :link="true" to="/">router 跳到首页</h-button>\n    </h-col>\n  </h-row>\n</template>\n\n<style scoped>\n.h-button + .h-button {\n  margin-left: 10px;\n}\n</style>\n',
    path: "demos/components/Button/link.vue"
  }, null, _parent));
  _push(`<h2 id="active-button" tabindex="-1">Active Button <a class="header-anchor" href="#active-button" aria-label="Permalink to &quot;Active Button&quot;">​</a></h2><p>Set <code>active = true</code> to set the button to active state</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="grid">\n    <div><h-button :active="true">Primary Button</h-button></div>\n    <div><h-button :active="true" type="danger">Danger Button</h-button></div>\n    <div></div>\n    <div><h-button :plain="true" :active="true">Primary Plain Button</h-button></div>\n    <div><h-button :plain="true" :active="true" type="danger">Danger Plain Button</h-button></div>\n    <div><h-button :plain="true" :active="true" type="normal">Normal Plain Button</h-button></div>\n    <div><h-button :text="true" :active="true">Primary Text Button</h-button></div>\n    <div><h-button :text="true" :active="true" type="danger">Danger Text Button</h-button></div>\n    <div><h-button :text="true" :active="true" type="normal">Normal Text Button</h-button></div>\n    <div><h-button :link="true" :active="true">Primary Link Button</h-button></div>\n    <div><h-button :link="true" :active="true" type="danger">Danger Link Button</h-button></div>\n    <div><h-button :link="true" :active="true" type="normal">Normal Link Button</h-button></div>\n  </div>\n</template>\n\n<script setup lang="ts"><\/script>\n<style scoped>\n.grid {\n  display: grid;\n  width: fit-content;\n  grid-template-rows: repeat(3, 1fr);\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 10px;\n}\n\n.grid > div {\n  text-align: center;\n}\n</style>\n',
    path: "demos/components/Button/active.vue"
  }, null, _parent));
  _push(`<h2 id="disabled" tabindex="-1">Disabled <a class="header-anchor" href="#disabled" aria-label="Permalink to &quot;Disabled&quot;">​</a></h2><p>Set <code>disabled = true</code> to set the button to unavailable state</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<script setup lang="ts">\n<\/script>\n\n<template>\n  <div class="grid">\n    <div><h-button :disabled="true">Primary Button</h-button></div>\n    <div><h-button type="danger" :disabled="true">Danger Button</h-button></div>\n    <div><h-button type="normal" :disabled="true">Normal Button</h-button></div>\n    <div><h-button :plain="true" :disabled="true">Primary Plain Button</h-button></div>\n    <div><h-button type="danger" :plain="true" :disabled="true">Danger Plain Button</h-button></div>\n    <div><h-button type="normal" :plain="true" :disabled="true">Normal Plain Button</h-button></div>\n    <div class="dark"><h-button :plain="true" :disabled="true" ghost>Primary Plain Ghost Button</h-button></div>\n    <div class="dark"><h-button type="danger" :plain="true" :disabled="true" ghost>Danger Plain Ghost Button</h-button></div>\n    <div class="dark"><h-button type="normal" :plain="true" :disabled="true" ghost>Normal Plain Ghost Button</h-button></div>\n    <div><h-button :text="true" :disabled="true">Primary Text Button</h-button></div>\n    <div><h-button type="danger" :text="true" :disabled="true">Danger Text Button</h-button></div>\n    <div><h-button type="normal" :text="true" :disabled="true">Normal Text Button</h-button></div>\n    <div><h-button :link="true" :disabled="true">Primary Link Button</h-button></div>\n    <div><h-button type="danger" :link="true" :disabled="true">Danger Link Button</h-button></div>\n    <div><h-button type="normal" :link="true" :disabled="true">Normal Link Button</h-button></div>\n  </div>\n</template>\n\n<style scoped>\n.grid {\n  display: grid;\n  width: fit-content;\n  grid-template-rows: repeat(3, 1fr);\n  grid-template-columns: repeat(3, 1fr);\n}\n\n.grid > div {\n  text-align: center;\n  align-self: center;\n  padding: 5px;\n}\n\n.dark {\n  background: rgba(69, 69, 69, 1);\n}\n</style>\n',
    path: "demos/components/Button/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="icon-button" tabindex="-1">Icon Button <a class="header-anchor" href="#icon-button" aria-label="Permalink to &quot;Icon Button&quot;">​</a></h2><p>Set <code>icon</code>, it will automatically determine whether the default slot is used and display square or adaptive</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { IconEye, IconEdit, IconRubbish } from '@aurora/icon';
<\/script>

<template>
  <div class="grid">
    <div>
      <h-button :auto-fit="true" :icon="IconEdit">Edit</h-button>
    </div>
    <div>
      <h-button :auto-fit="true" type="danger" :icon="IconRubbish">Delete</h-button>
    </div>
    <div>
      <h-button :auto-fit="true" type="normal" :icon="IconEye">Preview</h-button>
    </div>
    <div>
      <h-button :auto-fit="true" :plain="true" :icon="IconEdit" />
    </div>
    <div>
      <h-button :auto-fit="true" type="danger" :plain="true" :icon="IconRubbish" />
    </div>
    <div>
      <h-button :auto-fit="true" type="normal" :plain="true" :icon="IconEye" />
    </div>
    <div>
      <h-button :auto-fit="true" :loading="true" :icon="IconEdit">Edit</h-button>
    </div>
    <div>
      <h-button :auto-fit="true" type="danger" :loading="true" :icon="IconRubbish">Delete</h-button>
    </div>
    <div>
      <h-button :auto-fit="true" type="normal" :loading="true" :icon="IconEye">Preview</h-button>
    </div>
    <div>
      <h-button :auto-fit="true" :plain="true" :loading="true" />
    </div>
    <div>
      <h-button :auto-fit="true" type="danger" :plain="true" :loading="true" />
    </div>
    <div>
      <h-button :auto-fit="true" type="normal" :plain="true" :loading="true" />
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  width: fit-content;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.grid > div {
  text-align: center;
}
</style>
`,
    path: "demos/components/Button/icon.vue"
  }, null, _parent));
  _push(`<h2 id="block-button" tabindex="-1">Block Button <a class="header-anchor" href="#block-button" aria-label="Permalink to &quot;Block Button&quot;">​</a></h2><p>Set <code>block = true</code> to make the button width fill the parent</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<script setup lang="ts"><\/script>\n\n<template>\n  <div class="block-buttons">\n    <h-button :block="true">Primary Button</h-button>\n    <h-button :block="true" type="danger">Danger Button</h-button>\n    <h-button :block="true" :plain="true">Primary Plain Button</h-button>\n    <h-button :block="true" :plain="true" type="danger">Danger Plain Button</h-button>\n  </div>\n</template>\n\n<style scoped>\n.block-buttons {\n  display: grid;\n  grid-template-rows: repeat(3, 1fr);\n  grid-row-gap: 10px;\n}\n</style>\n',
    path: "demos/components/Button/block.vue"
  }, null, _parent));
  _push(`<h2 id="button-group" tabindex="-1">Button Group <a class="header-anchor" href="#button-group" aria-label="Permalink to &quot;Button Group&quot;">​</a></h2><p>Use <code>n-button-group</code> to wrap buttons, you can set a smooth adjacent button group</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconEye,
  IconEdit,
  IconRubbish,
} from '@aurora/icon';
<\/script>

<template>
  <h-row>
    <h-button-group type="primary">
      <h-button :icon="IconArrowLeft">Previous Page</h-button>
      <h-button>
        Next Page
        <template #suffix>
          <div class="n-button__icon">
            <IconArrowRight :size="16" />
          </div>
        </template>
      </h-button>
    </h-button-group>
    <h-button-group>
      <h-button :plain="true" :icon="IconEye" />
      <h-button :plain="true" :icon="IconEdit" />
      <h-button :plain="true" :icon="IconRubbish" />
    </h-button-group>
    <h-button-group type="primary">
      <h-button>Confirm</h-button>
      <h-dropdown>
        <h-button :icon="IconArrowDown" />
        <h-dropdown-menu>
          <h-dropdown-item>Agree</h-dropdown-item>
          <h-dropdown-item>Disagree</h-dropdown-item>
          <h-dropdown-item>Cancel</h-dropdown-item>
        </h-dropdown-menu>
      </h-dropdown>
    </h-button-group>
  </h-row>
</template>

<style scoped>
.h-button-group + .h-button-group {
  margin-left: 10px;
}
</style>
`,
    path: "demos/components/Button/button-group.vue"
  }, null, _parent));
  _push(`<h2 id="debounce-function-call" tabindex="-1">Debounce Function Call <a class="header-anchor" href="#debounce-function-call" aria-label="Permalink to &quot;Debounce Function Call&quot;">​</a></h2><p>Pass a function through <code>debounce-fn</code>, this function will be automatically triggered when the button is clicked, and if the function returns a Promise, it will automatically implement debounce during execution to avoid the effects of multiple clicks. The bound <code>click</code> event will be ignored at this time.</p><p>You can also control the button state during debounce through <code>debounce-type</code>.</p><p>This will be very useful if you need to perform asynchronous operations such as calling interfaces when clicking the button.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const debounceType = ref('disabled');

const saveData = () => {
  console.info('clicked!');
  return new Promise(resolve => {
    setTimeout(() => {
      $message.success('保存成功！');
      resolve(null);
    }, 2000);
  });
};
<\/script>

<template>
  <div class="flex mb-4">
    <span class="mr-2">debounce-type:</span>
    <h-radio-group v-model="debounceType" size="small">
      <h-radio label="disabled">disabled</h-radio>
      <h-radio label="loading">loading</h-radio>
      <h-radio label="none">none</h-radio>
    </h-radio-group>
  </div>
  <h-button :debounce-fn="saveData" :debounce-type="debounceType">防抖按钮</h-button>
  <h-button @click="saveData">普通按钮</h-button>
</template>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
`,
    path: "demos/components/Button/debounce-fn.vue"
  }, null, _parent));
  _push(`<h2 id="border-style" tabindex="-1">Border Style <a class="header-anchor" href="#border-style" aria-label="Permalink to &quot;Border Style&quot;">​</a></h2><p>The border can be set to <code>solid</code> <code>dotted</code> <code>dashed</code>, the default is <code>solid</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col :span="24">\n      <h-button :plain="true" border-style="solid">Solid</h-button>\n      <h-button :plain="true" border-style="dotted">Dotted</h-button>\n      <h-button :plain="true" border-style="dashed">Dashed</h-button>\n    </h-col>\n  </h-row>\n</template>\n\n<style scoped>\n.h-button + .h-button {\n  margin-left: 10px;\n}\n</style>\n',
    path: "demos/components/Button/border-style.vue"
  }, null, _parent));
  _push(`<h2 id="custom-color-beta" tabindex="-1">Custom Color (BETA) <a class="header-anchor" href="#custom-color-beta" aria-label="Permalink to &quot;Custom Color (BETA)&quot;">​</a></h2><p>After setting <code>color</code>, it will automatically calculate the colors of hover, click and other states based on the given color</p><p>The system has five built-in colors: <code>brand</code> <code>indigo</code> <code>purple</code> <code>magenta</code> <code>orange</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(false);
<\/script>

<template>
  <h-form label-position="left" label-width="fit-content">
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :value="true">True</h-radio>
        <h-radio :value="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <div class="grid-buttons">
    <div>Default</div>
    <div>Plain</div>
    <div>Text</div>
    <div>Link</div>
    <div>Ghost</div>
    <div><h-button color="brand" :disabled="disabled">brand</h-button></div>
    <div><h-button color="indigo" :disabled="disabled" :plain="true">indigo</h-button></div>
    <div><h-button color="purple" :disabled="disabled" :text="true">purple</h-button></div>
    <div><h-button color="magenta" :disabled="disabled" :link="true">magenta</h-button></div>
    <div>
      <h-button color="orange" :disabled="disabled" :plain="true" :ghost="true">orange</h-button>
    </div>
    <div><h-button color="#595E72" :disabled="disabled">#595E72</h-button></div>
    <div><h-button color="#00B3BE" :disabled="disabled" :plain="true">#00B3BE</h-button></div>
    <div><h-button color="#1880F2" :disabled="disabled" :text="true">#1880F2</h-button></div>
    <div><h-button color="#FD8C08" :disabled="disabled" :link="true">#FD8C08</h-button></div>
    <div>
      <h-button color="#26BD4B" :disabled="disabled" :plain="true" :ghost="true">#26BD4B</h-button>
    </div>
  </div>
</template>

<style scoped>
.grid-buttons {
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(5, 1fr);
  grid-gap: 8px;
}

.grid-buttons > div {
  text-align: center;
  padding: 4px;
}

.grid-buttons > div:nth-child(10),
.grid-buttons > div:nth-child(15) {
  background: rgba(69, 69, 69, 1);
}
</style>
`,
    path: "demos/components/Button/custom-color.vue"
  }, null, _parent));
  _push(`<h2>Button Api</h2><h3>Button Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>按钮Type<br>此字段由其他Name替代:<br><code>secondary</code>: 请改用 <code>plain</code><br><code>text</code>: 请改用 <code>text</code></td><td><code>&#39;primary&#39; | &#39;normal&#39; | &#39;danger&#39; | &#39;secondary&#39; | &#39;text&#39; | &#39;tertiary&#39;</code></td><td class="text-center">No</td><td>&#39;primary&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">kind`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "" }, null, _parent));
  _push(`</td><td>Type<br>此字段由其他Name替代:<br><code>neutral</code>: 请改为 <code>type = &#39;normal&#39;</code><br><code>negative</code>: 请改用 <code>danger</code></td><td><code>&#39;positive&#39; | &#39;neutral&#39; | &#39;negative&#39;</code></td><td class="text-center">No</td><td>&#39;positive&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;huge&#39; | &#39;large&#39; | &#39;medium&#39; | &#39;small&#39; | &#39;mini&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">round</td><td>是否是椭圆按钮</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">text</td><td>是否是文字按钮</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">link</td><td>是否是链接按钮</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">block</td><td>是否自适应父宽度</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">plain</td><td>是否是简洁按钮，与 <code>type=&#39;secondary&#39;</code>效果相同</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active</td><td>是否激活按钮</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">autofocus</td><td>是否自动聚焦</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading</td><td>是否处于加载中</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-fit</td><td>是否自适应启用最小宽度</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>图标，请传入图标对象</td><td><code>Component | string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-size</td><td>图标尺寸</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">native-type</td><td>按钮 <code>type</code> 的原生Name</td><td><code>&#39;button&#39; | &#39;submit&#39; | &#39;reset&#39;</code></td><td class="text-center">No</td><td>&#39;button&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tag</td><td>使用哪种原生渲染 <code>button</code></td><td><code>&#39;button&#39; | &#39;div&#39; | &#39;a&#39;</code></td><td class="text-center">No</td><td>&#39;button&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">href</td><td>点击跳转链接，使用 <code>location.href</code><br>优先级高于 <code>to</code></td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to</td><td>点击跳转的目标，使用 <code>router.push</code><br>优先级高于 <code>debounce-fn</code></td><td><code>RouteLocationRaw</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">replace</td><td>需结合 <code>to</code> 字段一起使用<br>是否用 <code>router.replace</code> 而不是 <code>router.push</code></td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td>链接打开目标对象<br>只针对 <code>href</code> 有效</td><td><code>&#39;_blank&#39; | &#39;_self&#39; | &#39;_parent&#39; | &#39;_top&#39;</code></td><td class="text-center">No</td><td>&#39;_self&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">debounce-fn</td><td>防抖调用函数</td><td><code>() =&gt; Awaitable&lt;any&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">debounce-type</td><td>防抖过程中的按钮状态控制<br><code>disabled</code>: 防抖时自动控制按钮的 <code>disabled</code> Name<br><code>loading</code>: 防抖时自动控制按钮的 <code>loading</code> Name<br><code>none</code>: 仅做防抖控制</td><td><code>&#39;disabled&#39; | &#39;loading&#39; | &#39;none&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">force-newest-size</td><td>是否强制使用最新尺寸规则</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">ghost</td><td>幽灵按钮</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>自定义文字颜色</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">border-style</td><td>按钮边框样式</td><td><code>&#39;solid&#39; | &#39;dashed&#39; | &#39;dotted&#39;</code></td><td class="text-center">No</td><td>&#39;solid&#39;</td></tr></tbody></table><h3>Button Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">鼠标点击后触发</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>点击事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">聚焦后触发</td><td rowspan="1">( e: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>FocusEvent</code></td><td>聚集事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦后触发</td><td rowspan="1">( e: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">debounce-finished</td><td rowspan="1">防抖函数执行完毕的通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2>ButtonGroup Api</h2><h3>ButtonGroup Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>控制按钮组内按钮的尺寸</td><td><code>&#39;huge&#39; | &#39;large&#39; | &#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>控制按钮组内按钮的Type</td><td><code>&#39;primary&#39; | &#39;normal&#39; | &#39;danger&#39;</code></td><td class="text-center">No</td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Button.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Button = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Button as default
};
