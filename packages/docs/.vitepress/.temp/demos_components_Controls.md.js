import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Controls.md","filePath":"zh/demos/components/Controls.md"}');
const _sfc_main = { name: "demos/components/Controls.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Controls</h1><p class="description">可以根据宽度自动控制显示的按钮数量</p><h2 id="基础使用" tabindex="-1">基础使用 <a class="header-anchor" href="#基础使用" aria-label="Permalink to &quot;基础使用&quot;">​</a></h2><p>和 <code>h-hover</code>、<code>h-mask</code> 联合使用，可以做到蒙层 <code>hover</code> 后显示控制器</p>`);
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
  _push(`<h2 id="主题" tabindex="-1">主题 <a class="header-anchor" href="#主题" aria-label="Permalink to &quot;主题&quot;">​</a></h2><p>通过 <code>theme</code> 控制选择主题，可以是 <code>&#39;light&#39;(默认)</code> <code>&#39;dark&#39;</code></p>`);
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
  _push(`<h2 id="是否使用-tooltip" tabindex="-1">是否使用 <code>tooltip</code> <a class="header-anchor" href="#是否使用-tooltip" aria-label="Permalink to &quot;是否使用 \`tooltip\`&quot;">​</a></h2><p>通过 <code>use-tooltip</code> 控制是否显示 <code>tooltip</code></p>`);
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
  _push(`<h2 id="禁用" tabindex="-1">禁用 <a class="header-anchor" href="#禁用" aria-label="Permalink to &quot;禁用&quot;">​</a></h2><p>控制 <code>disabled</code> 是否禁止点击</p>`);
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
  _push(`<h2 id="自动适应" tabindex="-1">自动适应 <a class="header-anchor" href="#自动适应" aria-label="Permalink to &quot;自动适应&quot;">​</a></h2><p>根据父元素的宽度，自动适配显示多少个控制器，剩余的会被省略为 <code>dropdown</code> 显示</p>`);
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
  _push(`<h2 id="权限检验" tabindex="-1">权限检验 <a class="header-anchor" href="#权限检验" aria-label="Permalink to &quot;权限检验&quot;">​</a></h2><p>传入 <code>access-list</code> 来控制哪些按钮可以显示</p>`);
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
  _push(`<h2 id="controls-api" class="no-underline h2"><a href="#controls-api" class="!no-underline">Controls Api</a></h2><h3 id="controls-props" class="no-underline h3"><a href="#controls-props" class="!no-underline">Controls Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">access-list</td><td>总的权限数组，在 <code>h-control</code> 内传入的 <code>label</code> 可以过滤是否显示</td><td><code>string[]</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-tooltip</td><td>是否启用 <code>tooltip</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">theme</td><td>主题</td><td><code>&#39;light&#39; | &#39;dark&#39;</code></td><td class="text-center">否</td><td>&#39;light&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-color</td><td>子元素中 <code>icon</code> 的颜色</td><td><code>string[]</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁止</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3 id="controls-emits" class="no-underline h3"><a href="#controls-emits" class="!no-underline">Controls Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">command</td><td rowspan="2">点击 <code>h-control</code> 后触发</td><td rowspan="2">( label: <code>string</code>, evt: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td><code>string</code></td><td><code>h-control</code> 的 <code>props.label</code></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event</code></td><td>鼠标事件或键盘事件</td></tr></tbody></table><h2 id="control-api" class="no-underline h2"><a href="#control-api" class="!no-underline">Control Api</a></h2><h3 id="control-props" class="no-underline h3"><a href="#control-props" class="!no-underline">Control Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>唯一标识，如果宽度过窄会省略到下拉菜单中，点击后触发会告知是哪个 <code>control</code> 被点击</td><td><code>string</code></td><td class="text-center">是</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td>是否显示</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>按钮 <code>icon</code> 对象<br>需要注意不是传入 <code>icon.name</code>，而是 <code>icon</code> 对象</td><td><code>Component</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-color</td><td><code>icon</code> 的颜色</td><td><code>string[]</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">text</td><td>控制器文字</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁止</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Controls.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Controls = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Controls as default
};
