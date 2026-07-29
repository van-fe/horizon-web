import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Dropdown.md","filePath":"en/demos/components/Dropdown.md"}');
const _sfc_main = { name: "en/demos/components/Dropdown.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Dropdown</h1><p class="description">Provides <code>#dropdown</code> slot to place <code>n-dropdown-menu</code>, or you can directly place <code>n-dropdown-menu</code> in <code>#default</code> without using named slots</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Provides <code>#dropdown</code> slot to place <code>n-dropdown-menu</code>, or you can directly place <code>n-dropdown-menu</code> in <code>#default</code> without using named slots</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col :span="24">\n      <h-dropdown>\n        <h-button>使用 #dropdown 插槽</h-button>\n        <template #dropdown>\n          <h-dropdown-menu>\n            <h-dropdown-item>北京</h-dropdown-item>\n            <h-dropdown-item divided>上海</h-dropdown-item>\n            <h-dropdown-item>深圳</h-dropdown-item>\n            <h-dropdown-item>杭州</h-dropdown-item>\n            <h-dropdown-item>重庆</h-dropdown-item>\n          </h-dropdown-menu>\n        </template>\n      </h-dropdown>\n      <h-dropdown>\n        <h-button>不使用 #dropdown 插槽</h-button>\n        <h-dropdown-menu>\n          <h-dropdown-item>北京</h-dropdown-item>\n          <h-dropdown-item>上海</h-dropdown-item>\n          <h-dropdown-item>深圳</h-dropdown-item>\n          <h-dropdown-item>杭州</h-dropdown-item>\n          <h-dropdown-item>重庆</h-dropdown-item>\n        </h-dropdown-menu>\n      </h-dropdown>\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.h-dropdown {\n  display: inline-flex;\n}\n\n.h-dropdown + .h-dropdown {\n  margin-left: 12px;\n}\n</style>\n',
    path: "demos/components/Dropdown/basic.vue"
  }, null, _parent));
  _push(`<h2 id="trigger-object" tabindex="-1">Trigger Object <a class="header-anchor" href="#trigger-object" aria-label="Permalink to &quot;Trigger Object&quot;">​</a></h2><p>You can use the <code>#suffix</code> slot of <code>n-button</code> and use <code>n-button-group</code> to split the trigger button</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-dropdown>
        <h-button>使用 #suffix 插槽放置箭头
          <template #suffix>
            <div class="n-button__icon">
              <IconArrowDown />
            </div>
          </template>
        </h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item>北京</h-dropdown-item>
            <h-dropdown-item>上海</h-dropdown-item>
            <h-dropdown-item>深圳</h-dropdown-item>
            <h-dropdown-item>杭州</h-dropdown-item>
            <h-dropdown-item>重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
      <h-button-group>
        <h-button>使用 button-group 分割触发按钮</h-button>
        <h-dropdown>
          <h-button :icon="IconArrowDown" />
            <h-dropdown-menu>
              <h-dropdown-item>北京</h-dropdown-item>
              <h-dropdown-item>上海</h-dropdown-item>
              <h-dropdown-item>深圳</h-dropdown-item>
              <h-dropdown-item>杭州</h-dropdown-item>
              <h-dropdown-item>重庆</h-dropdown-item>
            </h-dropdown-menu>
          </h-dropdown>
      </h-button-group>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { IconArrowDown } from '@aurora/icon';
<\/script>

<style scoped>
.h-dropdown {
  display: inline-flex;
}

.h-dropdown + .h-button-group {
  margin-left: 12px;
}
</style>
`,
    path: "demos/components/Dropdown/trigger-target.vue"
  }, null, _parent));
  _push(`<h2 id="icon" tabindex="-1">Icon <a class="header-anchor" href="#icon" aria-label="Permalink to &quot;Icon&quot;">​</a></h2><p>Set <code>props.icon</code> for <code>n-menu-item</code> to add an <code>icon</code> prefix</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-dropdown>
        <h-button>Hover</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item icon="car">北京</h-dropdown-item>
            <h-dropdown-item :icon="IconSearch">上海</h-dropdown-item>
            <h-dropdown-item icon="applets">深圳</h-dropdown-item>
            <h-dropdown-item icon="gift">杭州</h-dropdown-item>
            <h-dropdown-item>
              <template #icon>
                <IconCollection size="16" />
              </template>
              重庆
            </h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { IconSearch, IconCollection } from '@aurora/icon';
<\/script>

<style scoped>
.h-dropdown {
  display: inline-flex;
}

.h-dropdown + .h-dropdown {
  margin-left: 12px;
}
</style>
`,
    path: "demos/components/Dropdown/icon.vue"
  }, null, _parent));
  _push(`<h2 id="trigger-method" tabindex="-1">Trigger Method <a class="header-anchor" href="#trigger-method" aria-label="Permalink to &quot;Trigger Method&quot;">​</a></h2><p>Allows using <code>click</code> <code>hover</code> <code>contextMenu</code> to trigger</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-dropdown>
        <h-button>Hover(default)</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item>北京</h-dropdown-item>
            <h-dropdown-item>上海</h-dropdown-item>
            <h-dropdown-item>深圳</h-dropdown-item>
            <h-dropdown-item>杭州</h-dropdown-item>
            <h-dropdown-item>重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
      <h-dropdown trigger="click">
        <h-button>Click</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item>北京</h-dropdown-item>
            <h-dropdown-item>上海</h-dropdown-item>
            <h-dropdown-item>深圳</h-dropdown-item>
            <h-dropdown-item>杭州</h-dropdown-item>
            <h-dropdown-item>重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
      <h-dropdown trigger="context-menu" @command="onCommand">
        <div class="context-menu-area">
          context-menu
        </div>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item command="1">北京</h-dropdown-item>
            <h-dropdown-item command="2">上海</h-dropdown-item>
            <h-dropdown-item command="3">深圳</h-dropdown-item>
            <h-dropdown-item command="4">杭州</h-dropdown-item>
            <h-dropdown-item command="5">重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { $message } from '@aurora/horizon-web';

function onCommand(val: string) {
  $message.info(val);
}
<\/script>

<style scoped>
.h-dropdown {
  display: inline-flex;
  vertical-align: top;
}

.h-dropdown + .h-dropdown {
  margin-left: 12px;
}

.context-menu-area {
  width: 300px;
  height: 200px;
  background: var(--h-bg-info-weak-default);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
`,
    path: "demos/components/Dropdown/trigger.vue"
  }, null, _parent));
  _push(`<h2 id="directive-event" tabindex="-1">Directive Event <a class="header-anchor" href="#directive-event" aria-label="Permalink to &quot;Directive Event&quot;">​</a></h2><p>You can get the click event of <code>n-dropdown-item</code> through the <code>emit.command</code> event, or trigger the command through the <code>click</code> event mounted on <code>n-dropdown-item</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-dropdown @command="onCommand">
        <h-button>Hover</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item command="北京">北京</h-dropdown-item>
            <h-dropdown-item @click="onCommand('上海')">上海</h-dropdown-item>
            <h-dropdown-item command="深圳">深圳</h-dropdown-item>
            <h-dropdown-item command="杭州" :disabled="true">杭州</h-dropdown-item>
            <h-dropdown-item @click="onCommand('重庆')">重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { $message } from '@aurora/horizon-web';

function onCommand(value: string) {
  $message.info(\`点击了 \${value}\`);
}
<\/script>
`,
    path: "demos/components/Dropdown/command.vue"
  }, null, _parent));
  _push(`<h2 id="manually-toggle-menu" tabindex="-1">Manually Toggle Menu <a class="header-anchor" href="#manually-toggle-menu" aria-label="Permalink to &quot;Manually Toggle Menu&quot;">​</a></h2><p>Exposes <code>handleOpen</code> <code>handleClose</code> to manually control menu toggle</p><p>Of course, you can set <code>trigger=&quot;manual&quot;</code> and pass in <code>visible</code> to control whether it is displayed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-button style="width: 80px" @click="handle">{{ visible ? 'Hide' : 'Show' }}</h-button>
      <h-dropdown ref="dropdown" trigger="manual" align="center" :exclusive="false">
        <h-button :text="true">Dropdown Menu</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item>北京</h-dropdown-item>
            <h-dropdown-item>上海</h-dropdown-item>
            <h-dropdown-item>深圳</h-dropdown-item>
            <h-dropdown-item>杭州</h-dropdown-item>
            <h-dropdown-item>重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
      <h-dropdown trigger="manual" align="center" :visible="visible" :exclusive="false">
        <h-button :text="true">Dropdown Menu (visible prop control)</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item>北京</h-dropdown-item>
            <h-dropdown-item>上海</h-dropdown-item>
            <h-dropdown-item>深圳</h-dropdown-item>
            <h-dropdown-item>杭州</h-dropdown-item>
            <h-dropdown-item>重庆</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { HDropdown } from '@aurora/horizon-web';
import { ref } from 'vue';

const dropdown = ref<typeof HDropdown | null>(null);
const visible = ref(false);

function handle() {
  visible.value ? dropdown.value?.handleClose() : dropdown.value?.handleOpen();
  visible.value = !visible.value;
}
<\/script>

<style scoped>
.h-dropdown {
  display: inline-flex;
}

.h-button + .h-dropdown {
  margin-left: 12px;
}
</style>
`,
    path: "demos/components/Dropdown/manual.vue"
  }, null, _parent));
  _push(`<h2 id="grouped-menu" tabindex="-1">Grouped Menu <a class="header-anchor" href="#grouped-menu" aria-label="Permalink to &quot;Grouped Menu&quot;">​</a></h2><p>You can use <code>n-dropdown-gruop</code> to group</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col :span="24">\n      <h-dropdown>\n        <h-button>no title</h-button>\n        <template #dropdown>\n          <h-dropdown-menu>\n            <h-dropdown-group>\n              <h-dropdown-item>北京</h-dropdown-item>\n              <h-dropdown-item>上海</h-dropdown-item>\n              <h-dropdown-item>重庆</h-dropdown-item>\n            </h-dropdown-group>\n            <h-dropdown-item>深圳</h-dropdown-item>\n            <h-dropdown-item>杭州</h-dropdown-item>\n          </h-dropdown-menu>\n        </template>\n      </h-dropdown>\n      <h-dropdown>\n        <h-button>with title</h-button>\n        <h-dropdown-menu>\n          <h-dropdown-group>\n            <template #title>直辖市</template>\n            <h-dropdown-item>北京</h-dropdown-item>\n            <h-dropdown-item>上海</h-dropdown-item>\n            <h-dropdown-item>重庆</h-dropdown-item>\n          </h-dropdown-group>\n          <h-dropdown-group>\n            <template #title>其他城市</template>\n            <h-dropdown-item>深圳</h-dropdown-item>\n            <h-dropdown-item>杭州</h-dropdown-item>\n          </h-dropdown-group>\n        </h-dropdown-menu>\n      </h-dropdown>\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.h-dropdown {\n  display: inline-flex;\n}\n\n.h-dropdown + .h-dropdown {\n  margin-left: 12px;\n}\n</style>\n',
    path: "demos/components/Dropdown/group.vue"
  }, null, _parent));
  _push(`<h2 id="multi-level-menu" tabindex="-1">Multi-level Menu <a class="header-anchor" href="#multi-level-menu" aria-label="Permalink to &quot;Multi-level Menu&quot;">​</a></h2><p>Use <code>n-dropdown-submenu</code> to enable multi-level menu</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24" @click="onClick">
      <h-dropdown @command="onCommand">
        <h-button>Grade (hover)</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-submenu v-for="item of list" :key="item.label" :title="item.label">
              <h-dropdown-submenu v-for="subItem of item.children" :key="subItem.label" :title="subItem.label">
                <h-dropdown-item v-for="child of subItem.children" :key="child.label" :command="subItem.label + child.label">
                  {{ child.label }}
                </h-dropdown-item>
              </h-dropdown-submenu>
            </h-dropdown-submenu>
          </h-dropdown-menu>
        </template>
      </h-dropdown>

      <h-dropdown trigger="click" @command="onCommand">
        <h-button>Grade (click)</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-submenu v-for="item of list" :key="item.label" :title="item.label" trigger="click">
              <h-dropdown-submenu v-for="subItem of item.children" :key="subItem.label" :title="subItem.label" trigger="click">
                <h-dropdown-item v-for="child of subItem.children" :key="child.label" :command="subItem.label + child.label">
                  {{ child.label }}
                </h-dropdown-item>
              </h-dropdown-submenu>
            </h-dropdown-submenu>
          </h-dropdown-menu>
        </template>
      </h-dropdown>

      <h-dropdown trigger="click" @command="onCommand">
        <h-button>Grade (click)</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-submenu v-for="item of list" :key="item.label" :title="item.label" trigger="click">
              <h-dropdown-submenu v-for="subItem of item.children" :key="subItem.label" :title="subItem.label" trigger="click">
                <h-dropdown-item v-for="child of subItem.children" :key="child.label" :command="subItem.label + child.label">
                  {{ child.label }}
                </h-dropdown-item>
              </h-dropdown-submenu>
            </h-dropdown-submenu>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { $message } from '@aurora/horizon-web';

const list = [{
  label: '小学',
  children: [
    {
      label: '一年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
    {
      label: '二年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
    {
      label: '三年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
    {
      label: '四年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
    {
      label: '五年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
    {
      label: '六年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
  ],
}, {
  label: '初中',
  children: [
    {
      label: '七年级',
      children: [
        {
          label: '1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
        {
          label: '5班',
        },
        {
          label: '6班',
        },
        {
          label: '7班',
        },
        {
          label: '8班',
        },
        {
          label: '9班',
        },
        {
          label: '10班',
        },
      ],
    },
    {
      label: '八年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
        {
          label: '5班',
        },
        {
          label: '6班',
        },
        {
          label: '7班',
        },
        {
          label: '8班',
        },
        {
          label: '9班',
        },
        {
          label: '10班',
        },
      ],
    },
    {
      label: '九年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
        {
          label: '5班',
        },
        {
          label: '6班',
        },
        {
          label: '7班',
        },
        {
          label: '8班',
        },
        {
          label: '9班',
        },
        {
          label: '10班',
        },
      ],
    },
  ],
}, {
  label: '高中',
  children: [
    {
      label: '高一',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
        {
          label: '5班',
        },
        {
          label: '6班',
        },
        {
          label: '7班',
        },
        {
          label: '8班',
        },
        {
          label: '9班',
        },
        {
          label: '10班',
        },
      ],
    },
    {
      label: '高二',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
    {
      label: '高三',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
  ],
}];

function onCommand(val: string) {
  $message.info(val);
}

function onClick() {
  $message.warning('click 事件外部冒泡');
}
<\/script>

<style scoped>
.h-dropdown {
  display: inline-flex;
}

.h-dropdown + .h-dropdown {
  margin-left: 12px;
}
</style>
`,
    path: "demos/components/Dropdown/submenu.vue"
  }, null, _parent));
  _push(`<h2 id="theme" tabindex="-1">Theme <a class="header-anchor" href="#theme" aria-label="Permalink to &quot;Theme&quot;">​</a></h2><p>Provides three themes: <code>default</code> <code>gray</code> <code>midnight</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-form label-position="left" label-vertical-align="middle" :inline="true">
        <h-form-item label="theme:">
          <h-radio-group v-model="theme">
            <h-radio label="default">default</h-radio>
            <h-radio label="gray">gray</h-radio>
            <h-radio label="midnight">midnight</h-radio>
          </h-radio-group>
        </h-form-item>
      </h-form>
      <h-dropdown :theme="theme" @command="onCommand">
        <h-button>Grade</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-submenu v-for="item of list" :key="item.label" :title="item.label" :disabled="item.disabled ?? false">
              <h-dropdown-submenu v-for="subItem of item.children" :key="subItem.label" :title="subItem.label" :disabled="subItem.disabled ?? false">
                <h-dropdown-item v-for="child of subItem.children" :key="child.label" :command="subItem.label + child.label" :disabled="child.disabled ?? false">
                  {{ child.label }}
                </h-dropdown-item>
              </h-dropdown-submenu>
            </h-dropdown-submenu>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const theme = ref('default');

interface ListType {
  label: string;
  children?: ListType[];
  disabled?: boolean;
}

const list: ListType[] = [{
  label: '小学',
  children: [
    {
      label: '一年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
          disabled: true,
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
    {
      label: '二年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
    {
      label: '三年级',
      disabled: true,
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
    {
      label: '四年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
    {
      label: '五年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
    {
      label: '六年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
  ],
}, {
  label: '初中',
  children: [
    {
      label: '七年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
        {
          label: '5班',
        },
        {
          label: '6班',
        },
        {
          label: '7班',
        },
        {
          label: '8班',
        },
        {
          label: '9班',
        },
        {
          label: '10班',
        },
      ],
    },
    {
      label: '八年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
        {
          label: '5班',
        },
        {
          label: '6班',
        },
        {
          label: '7班',
        },
        {
          label: '8班',
        },
        {
          label: '9班',
        },
        {
          label: '10班',
        },
      ],
    },
    {
      label: '九年级',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
        {
          label: '5班',
        },
        {
          label: '6班',
        },
        {
          label: '7班',
        },
        {
          label: '8班',
        },
        {
          label: '9班',
        },
        {
          label: '10班',
        },
      ],
    },
  ],
}, {
  label: '高中',
  children: [
    {
      label: '高一',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
        {
          label: '5班',
        },
        {
          label: '6班',
        },
        {
          label: '7班',
        },
        {
          label: '8班',
        },
        {
          label: '9班',
        },
        {
          label: '10班',
        },
      ],
    },
    {
      label: '高二',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
    {
      label: '高三',
      children: [
        {
          label: '1班',
        },
        {
          label: '2班',
        },
        {
          label: '3班',
        },
        {
          label: '4班',
        },
      ],
    },
  ],
}];

function onCommand(val: string) {
  $message.info(val);
}
<\/script>

<style scoped>
.h-dropdown {
  display: inline-flex;
}

.h-dropdown + .h-dropdown {
  margin-left: 12px;
}
</style>
`,
    path: "demos/components/Dropdown/themes.vue"
  }, null, _parent));
  _push(`<h2>Dropdown Api</h2><h3>Dropdown Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">theme</td><td>主题</td><td><code>&#39;default&#39; | &#39;gray&#39; | &#39;midnight&#39;</code></td><td class="text-center">No</td><td>&#39;default&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>触发方式</td><td><code>&#39;hover&#39; | &#39;click&#39; | &#39;contextMenu&#39; | &#39;context-menu&#39; | &#39;manual&#39;</code></td><td class="text-center">No</td><td>&#39;hover&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td>控制是否显示，仅在 <code>manual</code> 时有效</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用 dropdown menu</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">align</td><td>dropdown menu 与 button 的对齐方式</td><td><code>&#39;left&#39; | &#39;right&#39; | &#39;center&#39;</code></td><td class="text-center">No</td><td>&#39;left&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>触发器位置，设置后会覆盖 <code>align</code> 配置</td><td><code>| &#39;auto&#39;<br>      | &#39;auto-start&#39;<br>      | &#39;auto-end&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;<br>      | &#39;left&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">menu</td><td>dropdown 菜单内容</td><td><code>VNode</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>弹出层的层级</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-class</td><td>弹出层自定义类名</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-width</td><td>弹出层自定义宽度</td><td><code>number | string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">submenu-left</td><td>有 <code>submenu</code> 时的子菜单弹出方向是否朝左边</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>是否将元素发送到 <code>Body</code> 上</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-after</td><td>延迟显示的事件，单位ms<br>仅在 <code>trigger = &#39;hover&#39;</code> 时有效</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-after</td><td>延迟显示的事件，单位ms<br>仅在 <code>trigger = &#39;hover&#39;</code> 时有效</td><td><code>number</code></td><td class="text-center">No</td><td>100</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">distance</td><td>触发器与弹出层距离<br>不适用于 <code>trigger = &#39;context-menu&#39;</code> 的情况</td><td><code>number</code></td><td class="text-center">No</td><td>4</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">exclusive</td><td>是否与其他 <code>dropdown</code> 显示互斥</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">teleport-to</td><td>挂载的位置，默认是 <code>body</code></td><td><code>TeleportProps[&#39;to&#39;]</code></td><td class="text-center">No</td><td>&#39;body&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-event-type</td><td>继承 <code>popover</code> 的 <code>hideEventType</code> Name</td><td><code>&#39;click&#39; | &#39;mousedown&#39; | &#39;mouseup&#39;</code></td><td class="text-center">No</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-options</td><td><code>popover</code> 的额外参数</td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3>Dropdown Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible-change</td><td rowspan="1">当 <code>dropdown</code> 显隐时触发</td><td rowspan="1">( isVisible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">isVisible</td><td><code>boolean</code></td><td>是否显示</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">command</td><td rowspan="1">指令</td><td rowspan="1">( value: <code>unknown</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>unknown</code></td><td>由 <code>dropdown-item</code> 的 <code>props.command</code> 传递</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:visible</td><td rowspan="1"><code>visible</code> 变化时的通知</td><td rowspan="1">( status: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td><code>boolean</code></td><td>是否显示</td></tr></tbody></table><h3>Dropdown Exposes</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">handleOpen</td><td rowspan="1">打开下拉菜单</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">handleClose</td><td rowspan="1">关闭下拉菜单</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2>DropdownMenu Api</h2><h2>DropdownGroup Api</h2><h3>DropdownGroup Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>分组标题</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title-tooltip-options</td><td>标题的 tooltip 配置</td><td><code>Partial&lt;TooltipProps&gt;</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h2>DropdownItem Api</h2><h3>DropdownItem Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用 menu item</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>icon</td><td><code>iconPropType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active</td><td>是否激活</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">forbid-evt-stop</td><td>是否不禁用事件冒泡</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">command</td><td>派发到 <code>n-dropdown-menu</code> 的 <code>command</code> 事件的参数</td><td><code>string | number | object</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">divided</td><td>是否显示分隔符</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-options</td><td>内容文字的 tooltip 配置</td><td><code>Partial&lt;TooltipProps&gt;</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3>DropdownItem Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">当点击子元素时触发</td><td rowspan="1">( evt: <code>MouseEvent | KeyboardEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent | KeyboardEvent</code></td><td>鼠标事件或键盘事件</td></tr></tbody></table><h2>DropdownSubmenu Api</h2><h3>DropdownSubmenu Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用当前子菜单</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>当前子菜单展示的内容</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>icon</td><td><code>iconPropType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active</td><td>是否处于激活态</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>触发方式</td><td><code>&#39;hover&#39; | &#39;click&#39;</code></td><td class="text-center">No</td><td>&#39;hover&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected</td><td>是否已选择</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-options</td><td><code>popover</code> 的额外参数</td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3>DropdownSubmenu Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">当点击时触发</td><td rowspan="1">( evt: <code>MouseEvent | KeyboardEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent | KeyboardEvent</code></td><td>鼠标事件或键盘事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Dropdown.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dropdown = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Dropdown as default
};
