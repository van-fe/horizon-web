import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Controls.md","filePath":"en/demos/components/Controls.md"}');
const _sfc_main = { name: "en/demos/components/Controls.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Controls</h1><p class="description">Used together with <code>h-hover</code> and <code>h-mask</code>, you can display controllers after hovering over the mask</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Used together with <code>h-hover</code> and <code>h-mask</code>, you can display controllers after hovering over the mask</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { IconEdit, IconRubbish } from '@aurora/icon';
import { $message } from '@aurora/horizon-web';

function onCommand(type: 'edit' | 'del') {
  switch (type) {
    case 'edit':
      $message.info('编辑');
      break;
    case 'del':
      $message.error('删除');
      break;
  }
}
<\/script>

<template>
  <h-hover v-slot="{ hover }">
    <div class="square">
      Mouse move here
      <h-mask :absolute="true" :value="hover" :content-full-size="true">
        <h-controls theme="light" @command="onCommand">
          <h-control label="edit" :icon="IconEdit" text="编辑" />
          <h-control label="del" :icon="IconRubbish" text="删除" />
        </h-controls>
      </h-mask>
    </div>
  </h-hover>
</template>

<style scoped>
.square {
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h-text-secondary);
}
</style>
`,
    path: "demos/components/Controls/basic.vue"
  }, null, _parent));
  _push(`<h2 id="theme" tabindex="-1">Theme <a class="header-anchor" href="#theme" aria-label="Permalink to &quot;Theme&quot;">​</a></h2><p>Control theme selection through <code>theme</code>, which can be <code>&#39;light&#39;(default)</code> <code>&#39;dark&#39;</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { IconPhone, IconMessage, IconStar, IconStarFilled } from '@aurora/icon';
import { $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const isStared = ref(false);

function onCommand(type: 'star' | 'call' | 'msn') {
  switch (type) {
    case 'star':
      isStared.value = !isStared.value;
      break;
    case 'call':
      $message.info('沟通');
      break;
    case 'msn':
      $message.info('发送信息');
      break;
  }
}
<\/script>

<template>
  <div class="container">
    <div class="content">
      <h-avatar size="small" />
      <div class="name">
        William Li
      </div>
    </div>
    <div class="controls">
      <h-controls theme="dark" @command="onCommand">
        <h-control :icon="isStared ? IconStarFilled : IconStar" text="关注" label="star" :icon-color="isStared ? ['gold'] : undefined" />
        <h-control :icon="IconPhone" label="call">
          <template #text>沟通</template>
        </h-control>
        <h-control :icon="IconMessage" text="发送信息" label="msn" />
      </h-controls>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 300px;
  height: 50px;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h-text-secondary);
}

.container .content {
    flex: 1;
    padding: 8px;
    display: flex;
    align-items: center;
}

.container .content .name {
    margin-left: 8px;
}

.container .controls {
    flex: 0 0 80px;
}
</style>
`,
    path: "demos/components/Controls/theme.vue"
  }, null, _parent));
  _push(`<h2 id="whether-to-use-tooltip" tabindex="-1">Whether to Use <code>tooltip</code> <a class="header-anchor" href="#whether-to-use-tooltip" aria-label="Permalink to &quot;Whether to Use \`tooltip\`&quot;">​</a></h2><p>Control whether to display <code>tooltip</code> through <code>use-tooltip</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { IconEdit, IconRubbish } from '@aurora/icon';
import { $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const useTooltip = ref(false);

function onCommand(type: 'edit' | 'del') {
  switch (type) {
    case 'edit':
      $message.info('编辑');
      break;
    case 'del':
      $message.error('删除');
      break;
  }
}
<\/script>

<template>
  <div>
    <h-form label-position="left" label-vertical-align="middle" label-width="120px">
      <h-form-item label="use tooltip">
        <h-switch v-model="useTooltip" />
      </h-form-item>
    </h-form>
    <h-hover v-slot="{ hover }">
      <div class="square">
        Mouse move here
        <h-mask :absolute="true" :value="hover" :content-full-size="true">
          <h-controls theme="light" :use-tooltip="useTooltip" @command="onCommand">
            <h-control :icon="IconEdit" text="编辑" label="edit" />
            <h-control :icon="IconRubbish" text="删除" label="del" />
          </h-controls>
        </h-mask>
      </div>
    </h-hover>
  </div>
</template>

<style scoped>
.square {
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h-text-secondary);
}
</style>
`,
    path: "demos/components/Controls/tooltip.vue"
  }, null, _parent));
  _push(`<h2 id="disabled" tabindex="-1">Disabled <a class="header-anchor" href="#disabled" aria-label="Permalink to &quot;Disabled&quot;">​</a></h2><p>Control <code>disabled</code> to prohibit clicking</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { IconEdit, IconRubbish } from '@aurora/icon';
import { $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const disabled = ref(true);

function onCommand(type: 'edit' | 'del') {
  switch (type) {
    case 'edit':
      $message.info('编辑');
      break;
    case 'del':
      $message.error('删除');
      break;
  }
}
<\/script>

<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="120px">
    <h-form-item label="disabled">
      <h-switch v-model="disabled" />
    </h-form-item>
  </h-form>

  <h-hover v-slot="{ hover }">
    <div class="square">
      Mouse move here
      <h-mask :absolute="true" :value="hover" :content-full-size="true">
        <h-controls theme="light" :disabled="disabled" @command="onCommand">
          <h-control label="edit" :icon="IconEdit" text="编辑" />
          <h-control label="del" :icon="IconRubbish" text="删除" />
        </h-controls>
      </h-mask>
    </div>
  </h-hover>
</template>

<style scoped>
.square {
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h-text-secondary);
}
</style>
`,
    path: "demos/components/Controls/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="auto-adapt" tabindex="-1">Auto Adapt <a class="header-anchor" href="#auto-adapt" aria-label="Permalink to &quot;Auto Adapt&quot;">​</a></h2><p>Automatically adapt to display how many controllers based on the parent element&#39;s width, and the rest will be omitted as <code>dropdown</code> display</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { IconEdit, IconEye, IconRubbish } from '@aurora/icon';
import { $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const size = ref(150);

function onCommand(type: 'edit' | 'del' | 'view') {
  switch (type) {
    case 'view':
      $message.success('查看');
      break;
    case 'edit':
      $message.info('编辑');
      break;
    case 'del':
      $message.error('删除');
      break;
  }
}
<\/script>

<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="120px">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio :label="60">60px</h-radio>
        <h-radio :label="100">100px</h-radio>
        <h-radio :label="150">150px</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-hover v-slot="{ hover }">
    <div class="square" :style="{width: size + 'px', height: size + 'px'}">
      Mouse move here
      <h-mask :absolute="true" :value="hover" :content-full-size="true">
        <h-controls theme="light" @command="onCommand">
          <h-control :icon="IconEye" text="查看" label="view" />
          <h-control :icon="IconEdit" text="编辑" label="edit" />
          <h-control :icon="IconRubbish" text="删除" label="del" />
        </h-controls>
      </h-mask>
    </div>
  </h-hover>
</template>

<style scoped>
.square {
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h-text-secondary);
  text-align: center;
}
</style>
`,
    path: "demos/components/Controls/resize.vue"
  }, null, _parent));
  _push(`<h2 id="permission-check" tabindex="-1">Permission Check <a class="header-anchor" href="#permission-check" aria-label="Permalink to &quot;Permission Check&quot;">​</a></h2><p>Pass in <code>access-list</code> to control which buttons can be displayed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { IconEdit, IconRubbish } from '@aurora/icon';
import { $message } from '@aurora/horizon-web';
import { computed, ref } from 'vue';

const editAccess = ref(true);
const deleteAccess = ref(false);

const accessList = computed(() => {
  const temp: string[] = [];

  editAccess.value && (temp.push('edit'));
  deleteAccess.value && (temp.push('del'));

  return temp;
});

function onCommand(type: 'edit' | 'del') {
  switch (type) {
    case 'edit':
      $message.info('编辑');
      break;
    case 'del':
      $message.error('删除');
      break;
  }
}
<\/script>

<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="120px">
    <h-form-item label="edit access">
      <h-switch v-model="editAccess" />
    </h-form-item>
    <h-form-item label="delete access">
      <h-switch v-model="deleteAccess" />
    </h-form-item>
  </h-form>

  <h-hover v-slot="{ hover }">
    <div class="square">
      Mouse move here
      <h-mask :absolute="true" :value="hover" :content-full-size="true">
        <h-controls theme="light" :access-list="accessList" @command="onCommand">
          <h-control :icon="IconEdit" text="编辑" label="edit" />
          <h-control :icon="IconRubbish" text="删除" label="del" />
        </h-controls>
      </h-mask>
    </div>
  </h-hover>
</template>

<style scoped>
.square {
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--h-text-secondary);
}
</style>
`,
    path: "demos/components/Controls/access.vue"
  }, null, _parent));
  _push(`<h2 id="controls-api" class="no-underline h2"><a href="#controls-api" class="!no-underline">Controls Api</a></h2><h3 id="controls-props" class="no-underline h3"><a href="#controls-props" class="!no-underline">Controls Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">access-list</td><td>Configuration for access list.</td><td><code>string[]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-tooltip</td><td>Configuration for use tooltip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">theme</td><td>Configuration for theme.</td><td><code>&#39;light&#39; | &#39;dark&#39;</code></td><td class="text-center">No</td><td>&#39;light&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-color</td><td>Configuration for icon color.</td><td><code>string[]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="controls-emits" class="no-underline h3"><a href="#controls-emits" class="!no-underline">Controls Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">command</td><td rowspan="2">Emitted when command changes.</td><td rowspan="2">( label: <code>string</code>, evt: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td><code>string</code></td><td>The label value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event</code></td><td>The evt value.</td></tr></tbody></table><h2 id="control-api" class="no-underline h2"><a href="#control-api" class="!no-underline">Control Api</a></h2><h3 id="control-props" class="no-underline h3"><a href="#control-props" class="!no-underline">Control Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>Configuration for label.</td><td><code>string</code></td><td class="text-center">Yes</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td>Configuration for visible.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>Configuration for icon.</td><td><code>Component</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-color</td><td>Configuration for icon color.</td><td><code>string[]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">text</td><td>Configuration for text.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Controls.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Controls = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Controls as default
};
