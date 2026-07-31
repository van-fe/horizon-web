import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Drawer.md","filePath":"en/demos/components/Drawer.md"}');
const _sfc_main = { name: "en/demos/components/Drawer.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Drawer</h1><p class="description">Drawer supports sliding out from any side of the screen. The default position is from the right, and the default size is <code>medium</code>.</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Drawer supports sliding out from any side of the screen. The default position is from the right, and the default size is <code>medium</code>.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button @click="visible = true">Open Drawer</h-button>
  <h-drawer v-model:visible="visible" title="Title" placement="right" @ok="onOk" @cancel="onCancel">
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const visible = ref(false);

const onOk = () => {
  console.info('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.info('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
<\/script>
`,
    path: "demos/components/Drawer/basic.vue"
  }, null, _parent));
  _push(`<h2 id="drawer-position" tabindex="-1">Drawer Position <a class="header-anchor" href="#drawer-position" aria-label="Permalink to &quot;Drawer Position&quot;">​</a></h2><p>Custom position, click the trigger button and the drawer slides out from the corresponding position.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-radio-group v-model="placement" style="margin-bottom: 20px">
    <h-radio label="right">右 - right（默认）</h-radio>
    <h-radio label="bottom">下 - bottom</h-radio>
    <h-radio label="left">左 - left</h-radio>
    <h-radio label="top">上 - top</h-radio>
  </h-radio-group>
  <h-button @click="visible = true">Open Drawer ({{ placement }})</h-button>
  <h-drawer v-model="visible" title="Title" :placement="placement" @ok="onOk" @cancel="onCancel">
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const visible = ref(false);
const placement = ref('right');

const onOk = () => {
  console.info('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.info('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
<\/script>
`,
    path: "demos/components/Drawer/position.vue"
  }, null, _parent));
  _push(`<h2 id="drawer-size" tabindex="-1">Drawer Size <a class="header-anchor" href="#drawer-size" aria-label="Permalink to &quot;Drawer Size&quot;">​</a></h2><p>You can freely control the drawer size through <code>size</code>, supporting predefined enums: <code>small</code>/<code>medium</code>/<code>large</code>, and also supporting numeric percentages like <code>300</code>, <code>500px</code>, <code>75%</code>.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-radio-group v-model="size" style="margin-bottom: 20px">
    <h-radio label="small">小 - small</h-radio>
    <h-radio label="medium">中(默认) - medium</h-radio>
    <h-radio label="large">大 - large</h-radio>
    <h-radio label="500px">固定像素 - 500px</h-radio>
    <h-radio label="75%">固定尺寸 - 75%</h-radio>
  </h-radio-group>
  <h-button @click="onOpen()">Open Drawer ({{ size }})</h-button>
  <h-drawer v-model:visible="visible" title="Title" :size="size" @ok="onOk" @cancel="onCancel">
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const visible = ref(false);
const size = ref('medium');

const onOpen = () => {
  visible.value = true;
};

const onOk = () => {
  console.info('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.info('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
<\/script>
`,
    path: "demos/components/Drawer/size.vue"
  }, null, _parent));
  _push(`<h2 id="custom-nodes" tabindex="-1">Custom Nodes <a class="header-anchor" href="#custom-nodes" aria-label="Permalink to &quot;Custom Nodes&quot;">​</a></h2><p>You can set whether the module is displayed or completely customize the bottom through slots. Please note that setting <code>v2</code> here adopts the new version logic</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space direction="vertical" block>
    <h-radio-group v-model="mode" class="example">
      <h-radio :label="0">Default</h-radio>
      <h-radio :label="1">Customize Header</h-radio>
      <h-radio :label="2">Customize Title</h-radio>
      <h-radio :label="3">Customize Footer</h-radio>
      <h-radio :label="4">No Title</h-radio>
      <h-radio :label="5">No Header and No Footer</h-radio>
      <h-radio :label="6">Hide Mask</h-radio>
    </h-radio-group>
    <h-button @click="visible = true">Open Drawer</h-button>
  </h-space>
  <h-drawer
    v-model:visible="visible"
    v2
    :title="mode !== 4 ? 'Default Title' : ''"
    :header="mode !== 5"
    :footer="mode !== 5"
    :mask="mode !== 6"
    position="right"
  >
    <template v-if="mode === 1" #header>
      <h-space size="4" block direction="vertical">
        <h-space size="4">
          <div class="text-subtitle-1">Great declaration</div>
          <h-tag :clickable="false">Demo</h-tag>
        </h-space>
        <div class="text-caption-1">Make Demo great again</div>
      </h-space>
    </template>

    <template v-if="mode === 2" #title>Customize Title</template>
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
    <template v-if="mode === 3" #footer>
      <h-button type="danger" style="margin-right: 8px" @click="onOk">Confirm Delete</h-button>
      <h-button type="secondary" @click="onCancel">Close</h-button>
    </template>
  </h-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const visible = ref(false);
const mode = ref(0);

const onOk = () => {
  console.info('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.info('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
<\/script>

<style scoped>
.example {
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
</style>
`,
    path: "demos/components/Drawer/customize.vue"
  }, null, _parent));
  _push(`<h2 id="nested-drawers" tabindex="-1">Nested Drawers <a class="header-anchor" href="#nested-drawers" aria-label="Permalink to &quot;Nested Drawers&quot;">​</a></h2><p>Open a new drawer inside the drawer</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button @click="visible = true">Open Drawer</h-button>

  <h-drawer v-model:visible="visible" title="Title" size="large" @ok="onOk" @cancel="onCancel">
    <div style="margin-bottom: 20px">
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
    <h-button @click="visible2 = true">Two-level Drawer</h-button>
  </h-drawer>
  <h-drawer version="v2" v-model:visible="visible2" title="Two-level Drawer">
    This is two-level drawer
  </h-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const visible = ref(false);
const visible2 = ref(false);

const onOk = () => {
  console.info('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.info('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
<\/script>
`,
    path: "demos/components/Drawer/nest.vue"
  }, null, _parent));
  _push(`<h2 id="close-confirmation" tabindex="-1">Close Confirmation <a class="header-anchor" href="#close-confirmation" aria-label="Permalink to &quot;Close Confirmation&quot;">​</a></h2><p>When the drawer closes, return <code>Promise&lt;false&gt;</code> to prevent the drawer from closing</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button @click="visible = true">Open Drawer</h-button>
  <h-drawer
    :visible="visible"
    v2
    title="Title"
    position="right"
    :before-close="onBeforeClose"
    @ok="onOk"
    @cancel="onCancel"
    @close="onClose"
  >
    <div v-loading="{ isShow: loading, loadingType: 'dots' }">
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const visible = ref(false);
const loading = ref(false);

const onOk = () => {
  console.info('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
  // visible.value = false;
};
const onCancel = () => {
  console.info('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
  visible.value = false;
};

const onClose = () => {
  visible.value = false;
};

const wait = (n: number) => new Promise(r => setTimeout(r, n));
const onBeforeClose = async () => {
  const seed = Math.floor(Math.random() * 100) % 2 === 0;
  loading.value = true;
  $message.info({ message: \`Drawer will \${seed ? 'close' : 'not close'}\`, type: 'info' });
  await wait(3000);
  loading.value = false;
  return seed;
};
<\/script>
`,
    path: "demos/components/Drawer/confirm.vue"
  }, null, _parent));
  _push(`<h2 id="mount-position" tabindex="-1">Mount Position <a class="header-anchor" href="#mount-position" aria-label="Permalink to &quot;Mount Position&quot;">​</a></h2><p>You can set the mount position of the popup layer node through <code>to</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div ref="innerEl" class="customize">
    <h-button @click="openDrawer(innerEl)">Open Drawer on Inner</h-button>
    <h-button class="ml-2" @click="openDrawer()">Open Drawer on Body</h-button>
  </div>
  <h-drawer
    v-model:visible="visible"
    v2
    :to="to"
    size="small"
    title="Title"
    position="right"
    @ok="onOk"
    @cancel="onCancel"
  >
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const visible = ref(false);
const innerEl = ref();
const to = ref();

const openDrawer = (el?: HTMLElement) => {
  if (el) to.value = el;
  else to.value = document.body;
  visible.value = true;
};

const onOk = () => {
  console.info('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.info('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
<\/script>

<style scoped>
.customize {
  position: relative;
  height: 500px;
  background-color: #efefef;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
`,
    path: "demos/components/Drawer/to.vue"
  }, null, _parent));
  _push(`<h2 id="v1-x-compatibility-logic" tabindex="-1">v1.x Compatibility Logic <a class="header-anchor" href="#v1-x-compatibility-logic" aria-label="Permalink to &quot;v1.x Compatibility Logic&quot;">​</a></h2><p>For smoother business migration, partial compatibility has been made for the <code>v1.x</code> version. You can set to use <code>v2.x</code> logic through <code>v2</code>.<br></p><ol><li>Drawer top display logic. By default, <code>v1.x</code> logic is used. When <code>title</code> or <code>slot.title</code> is set to <code>Falsy</code>, the drawer does not display top content<br></li><li>Drawer bottom display logic. By default, <code>v1.x</code> logic is used. When <code>slot.footer</code> or <code>primaryButton(deprecated) | secondaryButton(deprecated)</code> is <code>Falsy</code>, the bottom value is not displayed.<br></li><li>Drawer teleport logic. By default, <code>v1.x</code> is used. When <code>toBody=false</code> is set, the drawer is directly rendered to a specific position. After enabling <code>v2</code>, it is judged according to <code>to</code></li></ol><p>When <code>v2=true</code>, the drawer top and bottom logic are controlled by <code>header</code> and <code>footer</code> respectively.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="example">
    <h-button @click="visible0 = true">Open Drawer no header</h-button>
    <h-button @click="visible1 = true">Open Drawer no footer</h-button>
    <h-button @click="visible3 = true">Open Drawer v1</h-button>
    <h-button @click="visible4 = true">Open Drawer v1 custom title</h-button>
    <h-button @click="visible2 = true">Open Drawer v2</h-button>
  </div>

  <h-drawer v-model:visible="visible0" position="right" @ok="visible0 = false">
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>

  <h-drawer
    v-model:visible="visible1"
    title="Title"
    :closable="false"
    :primary-button="false"
    :secondary-button="false"
    placement="right"
  >
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
    <template #footer></template>
  </h-drawer>

  <h-drawer v-model:visible="visible2" v2 placement="right" :header="false" :footer="false">
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>

  <h-drawer
    v-model="visible3"
    position="left"
    primary-text="Primary Text"
    secondary-text="Secondary Text"
    @primary-click="visible3 = false"
  >
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>

  <h-drawer
    v-model="visible4"
    position="right"
    primary-text="Primary Text"
    secondary-text="Secondary Text"
    @primary-click="visible3 = false"
  >
    <template #title>
      <div class="flex align-center" style="column-gap: 10px">
        <h-button icon="close" text size="small" @click="visible4 = false" />
        <div>This Version 1 Title</div>
      </div>
    </template>
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible0 = ref(false);
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
<\/script>

<style scoped>
.example {
  display: inline-grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

:deep(.h-button + .h-button:not(.h-button--block)) {
  margin-left: 0;
}
</style>
`,
    path: "demos/components/Drawer/compatible.vue"
  }, null, _parent));
  _push(`<h2 id="design-token" tabindex="-1">Design Token <a class="header-anchor" href="#design-token" aria-label="Permalink to &quot;Design Token&quot;">​</a></h2><div class="language-scss vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">:root</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  // font-size</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-font-size--title</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-text-lg</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">);</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  // font-weight</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-font-weight--title</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-weight-strong</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">);</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  // line-height</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-line-height--title</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">24</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">px</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  // background</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-bg--container</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-bg-default</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-bg--mask</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-bg-overlay-default</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">);</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  // @deprecated: NOTE: Removed in next version, effective in this version</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  // border-radius</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-border-radius--container</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">0</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-border-radius--left</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">0</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-drawer-border-radius--container</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-drawer-border-radius--container</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">0</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-border-radius--right</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-drawer-border-radius--container</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">0</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> 0</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-drawer-border-radius--container</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-border-radius--top</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">0</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> 0</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-drawer-border-radius--container</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-drawer-border-radius--container</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-border-radius--bottom</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-drawer-border-radius--container</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-drawer-border-radius--container</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">0</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> 0</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  // padding</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-top-padding--container</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-spacing-7</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-spacing-7</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-spacing-5</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-bottom-padding--container</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-spacing-5</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-spacing-7</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-spacing-7</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-padding--body</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-spacing-7</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">);</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  // margin</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-margin-right--icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-spacing-5</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">);</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  // divider line color</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  --h-drawer-divider-color</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">var</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">--h-divider-default</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">#E6E7EC</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h2 id="drawer-api" class="no-underline h2"><a href="#drawer-api" class="!no-underline">Drawer Api</a></h2><h3 id="drawer-props" class="no-underline h3"><a href="#drawer-props" class="!no-underline">Drawer Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>visible</code>" }, null, _parent));
  _push(`</td><td>Configuration for model value.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td>Configuration for visible.</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v2</td><td>Configuration for v2.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">position`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>placement</code>" }, null, _parent));
  _push(`</td><td>Configuration for position.</td><td><code>&#39;left&#39; | &#39;right&#39; | &#39;top&#39; | &#39;bottom&#39;</code></td><td class="text-center">No</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>Configuration for placement.</td><td><code>&#39;left&#39; | &#39;right&#39; | &#39;top&#39; | &#39;bottom&#39;</code></td><td class="text-center">No</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>Configuration for title.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | string | number</code></td><td class="text-center">No</td><td>&#39;medium&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask</td><td>Configuration for mask.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-close`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>maskClosable</code>" }, null, _parent));
  _push(`</td><td>Configuration for mask close.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-closable</td><td>Configuration for mask closable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">esc-close`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "，使用 <code>escClosable</code> 替代" }, null, _parent));
  _push(`</td><td>Configuration for esc close.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">esc-closable</td><td>Configuration for esc closable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">close-button`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>closable</code>" }, null, _parent));
  _push(`</td><td>Configuration for close button.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">closable</td><td>Configuration for closable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">footer</td><td>Configuration for footer.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header</td><td>Configuration for header.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">primary-button`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>okButton</code>" }, null, _parent));
  _push(`</td><td>Configuration for primary button.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">ok-button</td><td>Configuration for ok button.</td><td><code>boolean | ButtonProps</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">primary-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>okButtonText</code>" }, null, _parent));
  _push(`</td><td>Configuration for primary text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">ok-button-text</td><td>Configuration for ok button text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">secondary-button`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>cancelButton</code>" }, null, _parent));
  _push(`</td><td>Configuration for secondary button.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button</td><td>Configuration for cancel button.</td><td><code>boolean | ButtonProps</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">secondary-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>cancelButtonText</code>" }, null, _parent));
  _push(`</td><td>Configuration for secondary text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button-text</td><td>Configuration for cancel button text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-close</td><td>Configuration for before close.</td><td><code>(close?: () =&gt; void) =&gt; void | boolean | PromiseLike&lt;boolean | void&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>to</code>" }, null, _parent));
  _push(`</td><td>Configuration for to body.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to</td><td>Configuration for to.</td><td><code>string | TeleportProps[&#39;to&#39;] | HTMLElement</code></td><td class="text-center">No</td><td>&#39;body&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">lock-scroll</td><td>Configuration for lock scroll.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size-draggable</td><td>Configuration for size draggable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">push`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "不推荐使用" }, null, _parent));
  _push(`</td><td>Configuration for push.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading</td><td></td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">destroy-on-close</td><td>Configuration for destroy on close.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr></tbody></table><h3 id="drawer-emits" class="no-underline h3"><a href="#drawer-emits" class="!no-underline">Drawer Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:visible</td><td rowspan="1">Emitted when update:visible changes.</td><td rowspan="1">( value: <code>false</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>false</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">primary-click`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>onOk</code>" }, null, _parent));
  _push(`</td><td rowspan="1">Emitted when primary click changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">secondary-click`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>onCancel</code>" }, null, _parent));
  _push(`</td><td rowspan="1">Emitted when secondary click changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">ok</td><td rowspan="1">Emitted when ok changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel</td><td rowspan="1">Emitted when cancel changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">open</td><td rowspan="1">Emitted when open changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">opened</td><td rowspan="1">Emitted when opened changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">Emitted when close changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">closed</td><td rowspan="1">Emitted when closed changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-click</td><td rowspan="1">Emitted when mask click changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-click</td><td rowspan="1">Emitted when icon click changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Drawer.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Drawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Drawer as default
};
