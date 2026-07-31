import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Select.md","filePath":"en/demos/components/Select.md"}');
const _sfc_main = { name: "en/demos/components/Select.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Select</h1><p class="description">You can configure <code>show-selected-icon</code> to enable displaying the selected indicator</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="inputStyle">
      <h-radio-group v-model="inputStyle">
        <h-radio label="normal" />
        <h-radio label="emphasize" />
        <h-radio label="no-border" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="filterable">
      <h-radio-group v-model="filterable">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>

  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">基础单选</div>
      <h-select
        v-model="value1"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        :fit-input-width="false"
        :to-body="false"
        :filterable="filterable"
        :clearable="true"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      >
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">基础多选</div>
      <h-select
        v-model="value2"
        :multiple="true"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        :filterable="filterable"
        :clearable="true"
        :fit-input-width="false"
        :to-body="false"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      >
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
  </h-row>

</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { useOptionProps } from '@aurora/horizon-web';

const size = ref('medium');
const inputStyle = ref('normal');
const disabled = ref(false);
const filterable = ref(false);

const value1 = ref();
const value2 = ref();

const selectOptions = [
  { value: 1, label: '上海' },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
  { value: 4, label: '深圳' },
  { value: 5, label: '杭州' },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];

function onChange(inp: string, opts: ExtractPropTypes<typeof useOptionProps>[]) {
  console.info(inp, opts);
}

function onFocus() {
  console.info('focus');
}

function onBlur() {
  console.info('blur');
}
<\/script>
`,
    path: "demos/components/Select/basic.vue"
  }, null, _parent));
  _push(`<h2 id="single-selection" tabindex="-1">Single Selection <a class="header-anchor" href="#single-selection" aria-label="Permalink to &quot;Single Selection&quot;">​</a></h2><p>You can configure <code>show-selected-icon</code> to enable displaying the selected indicator</p><p>You can also configure <code>selected-icon</code> to customize the icon of the selected indicator</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">默认单选</div>
      <h-select v-model="value1" :to-body="false">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">有选中标识</div>
      <h-select v-model="value2" :show-selected-icon="true" :to-body="false">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">自定义选中标识</div>
      <h-select v-model="value3" :show-selected-icon="true" :selected-icon="IconPin" :to-body="false">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
  </h-row>

</template>

<script setup lang="ts">
import { IconPin } from '@aurora/icon';
import { ref } from 'vue';

const value1 = ref();
const value2 = ref();
const value3 = ref();

const selectOptions = [
  { value: 1, label: '上海' },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
  { value: 4, label: '深圳' },
  { value: 5, label: '杭州' },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Select/single.vue"
  }, null, _parent));
  _push(`<h2 id="custom-dropdown-icon" tabindex="-1">Custom <code>dropdown icon</code> <a class="header-anchor" href="#custom-dropdown-icon" aria-label="Permalink to &quot;Custom \`dropdown icon\`&quot;">​</a></h2><p>You can control the <code>dropdown icon</code> by configuring <code>dropdown-icon</code></p><p>If you pass in <code>false</code>, it can be set to empty</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">自定义 select icon</div>
      <h-select v-model="value1" :dropdown-icon="IconTriangleDownFilled" :to-body="false">
        <h-option label="中国" :value="1" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">select icon 为空</div>
      <h-select v-model="value2" :custom-select-icon="false" :to-body="false">
        <h-option label="中国" :value="1" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
    </h-col>
  </h-row>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import {IconTriangleDownFilled} from '@aurora/icon';

const value1 = ref();
const value2 = ref();
<\/script>
`,
    path: "demos/components/Select/icon-style.vue"
  }, null, _parent));
  _push(`<h2 id="multiple-selection" tabindex="-1">Multiple Selection <a class="header-anchor" href="#multiple-selection" aria-label="Permalink to &quot;Multiple Selection&quot;">​</a></h2><p>By default, selected items are not collapsed. You can configure <code>collapse-tags = true</code> to collapse selected items</p><p>In addition, you can configure <code>collapse-tags-tooltip = true</code> to display other selected items when hovering over <code>+N</code>, and you can quickly deselect selected items</p><p>In addition, if your <code>select</code> space is very small, it may be squeezed to only <code>+N</code>. You can configure <code>max-collapse-tags</code> to force how many selected items to display, and the rest will be collapsed</p><p>If your option content is too long, causing it to be unable to fit between selected items and <code>+N</code>, you can configure <code>collapse-tags-fill-up = true</code> to make selected items fill the space as much as possible</p><p>Starting from <code>2.4.0</code>, <code>collapse-tags-fill-up</code> is enabled by default</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">普通多选</div>
      <h-select v-model="values1" :multiple="true" :to-body="false">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">折叠多选</div>
      <h-select v-model="values2" :multiple="true" :collapse-tags="true" :to-body="false">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">+N 显示其余已选项</div>
      <h-select v-model="values3" :multiple="true" :to-body="false" :collapse-tags="true" :collapse-tags-tooltip="true">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">强制显示3个已选项，其余折叠</div>
      <h-select v-model="values4" :multiple="true" :to-body="false" :collapse-tags="true" :collapse-tags-tooltip="true" :max-collapse-tags="3">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
  </h-row>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const values1 = ref<number[]>([1, 2, 9, 3, 4]);
const values2 = ref<number[]>([1, 2, 9, 3, 4]);
const values3 = ref<number[]>([1, 2, 9, 3, 4]);
const values4 = ref<number[]>([1, 2, 9, 3, 4]);

const selectOptions = [
  { value: 1, label: '上海' },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
  { value: 4, label: '深圳' },
  { value: 5, label: '杭州' },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];
<\/script>
`,
    path: "demos/components/Select/multiple.vue"
  }, null, _parent));
  _push(`<h2 id="select-all" tabindex="-1">Select All <a class="header-anchor" href="#select-all" aria-label="Permalink to &quot;Select All&quot;">​</a></h2><p>Supports passing in <code>use-check-all = true</code> to enable select all</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">普通全选</div>
      <h-select v-model="value1" :multiple="true" :use-check-all="true" :to-body="false" allow-create>
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">全选后标记为“全部”</div>
      <h-select v-model="value2" :multiple="true" :use-check-all="true" :use-check-all-summary="true" :to-body="false">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">全选后自定义标记为“全部选择”</div>
      <h-select v-model="value3" :multiple="true" :use-check-all="true" :use-check-all-summary="true" check-all-summary-text="全部选择" :to-body="false">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
  </h-row>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref([]);
const value2 = ref([]);
const value3 = ref([]);

const selectOptions = [
  { value: 1, label: '上海' },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
  { value: 4, label: '深圳' },
  { value: 5, label: '杭州' },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Select/check-all.vue"
  }, null, _parent));
  _push(`<h2 id="option-statistics" tabindex="-1">Option Statistics <a class="header-anchor" href="#option-statistics" aria-label="Permalink to &quot;Option Statistics&quot;">​</a></h2><p>Pass in <code>use-statistic = true</code> to count multiple selections</p><p>You can set <code>statistic-text</code> to specify the statistical text</p><p><code>use-statistic</code> takes priority over <code>use-check-all</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="selectStyle">
      <h-radio-group v-model="selectStyle">
        <h-radio label="normal" />
        <h-radio label="emphasize" />
        <h-radio label="no-border" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">默认国际化配置</div>
      <h-select v-model="value" :multiple="true" :use-statistic="true" :to-body="false" :select-style="selectStyle" :clearable="true" :size="size">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">自定义为”城市标签“</div>
      <h-select v-model="value2" :multiple="true" :use-statistic="true" statistic-text="城市标签" :to-body="false" :select-style="selectStyle" :clearable="true" :size="size">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
  </h-row>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref('medium');
const selectStyle = ref('normal');

const value = ref<string[]>([]);
const value2 = ref<string[]>([]);

const selectOptions = [
  { value: 1, label: '上海' },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
  { value: 4, label: '深圳' },
  { value: 5, label: '杭州' },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Select/statistic.vue"
  }, null, _parent));
  _push(`<h2 id="dynamic-set-collapse" tabindex="-1">Dynamic Set Collapse <a class="header-anchor" href="#dynamic-set-collapse" aria-label="Permalink to &quot;Dynamic Set Collapse&quot;">​</a></h2><p>You can control the collapse state by toggling <code>collapse-tags</code>. When <code>focus</code>, all are expanded, when <code>false</code>, collapsed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <h-select
        v-model="values1"
        placeholder="请选择"
        :collapse="collapse"
        :multiple="true"
        :to-body="false"
        @focus="focusHandle"
        @blur="blurHandle"
      >
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const values1 = ref([]);
const collapse = ref(false);

const selectOptions = [
  { value: 1, label: '上海' },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
  { value: 4, label: '深圳' },
  { value: 5, label: '杭州' },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];

const focusHandle = () => {
  console.info('focus');
  collapse.value = false;
};

const blurHandle = () => {
  console.info('blur');
  collapse.value = true;
};
<\/script>
`,
    path: "demos/components/Select/dynamic-collapse.vue"
  }, null, _parent));
  _push(`<h2 id="grouping" tabindex="-1">Grouping <a class="header-anchor" href="#grouping" aria-label="Permalink to &quot;Grouping&quot;">​</a></h2><p>You can use <code>h-option-group</code> to group, with named groups and unnamed groups</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选: 不具名分组</div>
      <h-select v-model="value1" clearable :to-body="false" filterable>
        <template v-for="(group, index) of selectOptionGroupsMixins">
          <h-option-group
            v-if="group.children"
            :key="index"
            :disabled="group.disabled"
          >
            <h-option
              v-for="item in group.children"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </h-option-group>
          <h-option
            v-else
            :key="\`option_\${index}\`"
            :label="group.label"
            :value="group.value"
            :disabled="group.disabled"
          />
        </template>
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">单选: 不具名分组</div>
      <h-select v-model="value2" clearable :to-body="false" filterable>
        <h-option-group
          v-for="(group, index) in selectOptionGroupsNoLabel"
          :key="index"
          :label="group.label"
          :disabled="group.disabled"
        >
          <h-option
            v-for="item in group.children"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </h-option-group>
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">单选: 具名分组</div>
      <h-select v-model="value3" clearable :to-body="false" filterable>
        <h-option-group
          v-for="(group, index) in selectOptionGroupsHasLabel"
          :key="index"
          :label="group.label"
          :disabled="group.disabled"
        >
          <h-option
            v-for="item in group.children"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </h-option-group>
      </h-select>
    </h-col>
  </h-row>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">多选: 不具名分组</div>
      <h-select v-model="values1" clearable multiple :to-body="false" filterable>
        <template v-for="(group, index) of selectOptionGroupsMixins">
          <h-option-group
            v-if="group.children"
            :key="index"
            :disabled="group.disabled"
          >
            <h-option
              v-for="item in group.children"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </h-option-group>
          <h-option
            v-else
            :key="\`option_\${index}\`"
            :label="group.label"
            :value="group.value"
            :disabled="group.disabled"
          />
        </template>
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选: 不具名分组</div>
      <h-select v-model="values2" clearable multiple :to-body="false" filterable>
        <h-option-group
          v-for="(group, index) in selectOptionGroupsNoLabel"
          :key="index"
          :label="group.label"
          :disabled="group.disabled"
        >
          <h-option
            v-for="item in group.children"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </h-option-group>
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选: 具名分组</div>
      <h-select v-model="values3" clearable multiple :to-body="false" filterable>
        <h-option-group
          v-for="(group, index) in selectOptionGroupsHasLabel"
          :key="index"
          :label="group.label"
          :disabled="group.disabled"
        >
          <h-option
            v-for="item in group.children"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </h-option-group>
      </h-select>
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { ExtractPropTypes, ref } from 'vue';
import { useOptionGroupProps, useOptionProps } from '@aurora/horizon-web';

const value1 = ref();
const value2 = ref();
const value3 = ref();
const values1 = ref([]);
const values2 = ref([]);
const values3 = ref([]);

const selectOptionGroupsHasLabel: Array<Partial<ExtractPropTypes<typeof useOptionGroupProps>> & {children: Partial<ExtractPropTypes<typeof useOptionProps>>[]}> = [
  {
    label: '第一批',
    children: [
      { value: 1, label: '上海' },
      { value: 2, label: '北京' },
      { value: 3, label: '合肥' },
      { value: 4, label: '深圳' },
      { value: 5, label: '杭州' },
    ]},
  {
    label: '第二批',
    children: [
      { value: 6, label: '天津' },
      { value: 7, label: '西安' },
      { value: 8, label: '南京' },
      { value: 9, label: '哈尔滨' },
      { value: 10, label: '香港' },
    ]},
];

const selectOptionGroupsNoLabel: Array<Partial<ExtractPropTypes<typeof useOptionGroupProps>> & {children: Partial<ExtractPropTypes<typeof useOptionProps>>[]}> = [
  {
    children: [
      { value: 1, label: '上海' },
      { value: 2, label: '北京' },
      { value: 3, label: '合肥' },
      { value: 4, label: '深圳' },
      { value: 5, label: '杭州' },
    ]},
  {
    children: [
      { value: 6, label: '天津' },
      { value: 7, label: '西安' },
      { value: 8, label: '南京' },
      { value: 9, label: '哈尔滨' },
      { value: 10, label: '香港' },
    ]},
];

const selectOptionGroupsMixins: Array<(Partial<ExtractPropTypes<typeof useOptionGroupProps> | ExtractPropTypes<typeof useOptionProps>>) & {children?: Partial<ExtractPropTypes<typeof useOptionProps>>[]}> = [
  {
    label: '第一批',
    children: [
      { value: 1, label: '上海' },
      { value: 2, label: '北京' },
      { value: 3, label: '合肥' },
      { value: 4, label: '深圳' },
      { value: 5, label: '杭州' },
    ],
  },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];
<\/script>
`,
    path: "demos/components/Select/group.vue"
  }, null, _parent));
  _push(`<h2 id="disabled" tabindex="-1">Disabled <a class="header-anchor" href="#disabled" aria-label="Permalink to &quot;Disabled&quot;">​</a></h2><p>Set <code>disabled = true</code> to disable <code>h-select</code></p><p>Set <code>disabled = true</code> for <code>h-option</code> to disable the current option</p><p>Set <code>disabled = true</code> for <code>h-option-group</code> to disable all options under the current group</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-row>
      <h-col :span="6">
        <div class="demo-title">
          单选: 整体禁用
        </div>
        <h-select
            v-model="value1"
            :clearable="true"
            placeholder="请选择"
            :disabled="true"
            :to-body="false"
            @change="changeHandle"
        >
          <h-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.value === 2"
          />
        </h-select>
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          单选: 选项禁用
        </div>
        <h-select
            v-model="value2"
            :clearable="true"
            placeholder="请选择"
            :to-body="false"
            @change="changeHandle"
        >
          <h-option
              v-for="item in selectOptionsHasDisabled"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
          />
        </h-select>
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          单选: 选项组禁用
        </div>
        <h-select
            v-model="value3"
            :clearable="true"
            placeholder="请选择"
            :to-body="false"
            @change="changeHandle"
        >
          <h-option-group
            v-for="(group, index) in selectOptionGroupsHasDisabled"
            :key="index"
            :label="group.label"
            :disabled="group.disabled"
          >
            <h-option
              v-for="item in group.children"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </h-option-group>
        </h-select>
      </h-col>
    </h-row>
    <h-row>
      <h-col :span="6">
        <div class="demo-title">
          多选: 整体禁用
        </div>
        <h-select
            v-model="values1"
            :multiple="true"
            :clearable="true"
            placeholder="请选择"
            :disabled="true"
            :collapse="true"
            :to-body="false"
            @change="changeHandle"
        >
          <h-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </h-select>
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          多选: 选项禁用
        </div>
        <h-select
            v-model="values2"
            :multiple="true"
            :clearable="true"
            placeholder="请选择"
            :collapse="true"
            :to-body="false"
            @change="changeHandle"
        >
          <h-option
              v-for="item in selectOptionsHasDisabled"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
          />
        </h-select>
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          多选: 选项组禁用
        </div>
        <h-select
            v-model="values3"
            :multiple="true"
            :clearable="true"
            placeholder="请选择"
            :collapse="true"
            :to-body="false"
            @change="changeHandle"
        >
          <h-option-group
              v-for="(group, index) in selectOptionGroupsHasDisabled"
              :key="index"
              :label="group.label"
              :disabled="group.disabled"
          >
            <h-option
              v-for="item in group.children"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </h-option-group>
        </h-select>
      </h-col>
    </h-row>
  </div>
</template>

<script lang="ts" setup>
import { ExtractPropTypes, ref } from 'vue';
import { useOptionProps, useOptionGroupProps } from '@aurora/horizon-web';

const value1 = ref(1);
const value2 = ref(1);
const value3 = ref(1);
const values1 = ref([1]);
const values2 = ref([1]);
const values3 = ref([1]);

const selectOptions: ExtractPropTypes<useOptionProps>[] = [
  { value: 1, label: '上海' },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
  { value: 4, label: '深圳' },
  { value: 5, label: '杭州' },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];

const selectOptionsHasDisabled: ExtractPropTypes<useOptionProps>[] = [
  { value: 1, label: '上海', disabled: true },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
  { value: 4, label: '深圳' },
  { value: 5, label: '杭州' },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];

const selectOptionGroupsHasDisabled: Array<ExtractPropTypes<useOptionGroupProps> & {children: ExtractPropTypes<useOptionProps>[]}> = [
  {
    disabled: true,
    children: [
      { value: 1, label: '上海', disabled: true },
      { value: 2, label: '北京' },
      { value: 3, label: '合肥' },
      { value: 4, label: '深圳' },
      { value: 5, label: '杭州' },
    ]},
  {
    disabled: false,
    children: [
      { value: 6, label: '天津' },
      { value: 7, label: '西安' },
      { value: 8, label: '南京' },
      { value: 9, label: '哈尔滨' },
      { value: 10, label: '香港' },
    ]},
];

const changeHandle = () => {
  console.info(value1.value);
};
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Select/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="selected-options-not-displayed" tabindex="-1">Selected Options Not Displayed <a class="header-anchor" href="#selected-options-not-displayed" aria-label="Permalink to &quot;Selected Options Not Displayed&quot;">​</a></h2><p>Set <code>selected-visible = false</code> to not display selected options in the panel</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选: 隐藏选中项</div>
      <h-select v-model="value3" :selected-visible="false" clearable :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选: 隐藏选中项</div>
      <h-select v-model="values4" :selected-visible="false" clearable multiple :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
      </h-select>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value3 = ref();
    const values4 = ref([]);

    const changeHandle = (value: any, option: any) => {
      console.group('change');
      console.info(value);
      console.info(option);
      console.groupEnd();
    };

    return {
      valueFormat(originValue: any) {
        return {
          value: originValue.value,
          label: originValue.label,
        };
      },
      filterOption(input: string, props: any) {
        const label = props.label;
        return label.includes(input.toUpperCase());
      },
      blur() {
        console.info('blur');
      },
      focus() {
        console.info('focus');
      },
      clear() {
        console.info('clear');
      },
      deselect(value: any) {
        console.info('deselect', value);
      },
      dropdownVisibleChange(visible: boolean) {
        console.info('dropdownVisibleChange', visible);
      },

      changeHandle,
      value3,
      values4,
    };
  },
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Select/hide-selected.vue"
  }, null, _parent));
  _push(`<h2 id="auxiliary-description-text" tabindex="-1">Auxiliary Description Text <a class="header-anchor" href="#auxiliary-description-text" aria-label="Permalink to &quot;Auxiliary Description Text&quot;">​</a></h2><p>Set content for <code>h-option.description</code> to assist in explaining <code>label</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">描述文字在右侧</div>
      <h-select
        v-model="value1"
        :clearable="true"
        placeholder="请选择"
        :to-body="false"
      >
        <h-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :description="item.description"
        />
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">描述文字在下方</div>
      <h-select
        v-model="value2"
        :clearable="true"
        placeholder="请选择"
        :to-body="false"
        description-position="bottom"
      >
        <h-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :description="item.description"
        />
      </h-select>
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { ExtractPropTypes, ref } from 'vue';
import { useOptionProps } from '@aurora/horizon-web';

const value1 = ref();
const value2 = ref();

const selectOptions: Partial<ExtractPropTypes<typeof useOptionProps>>[] = [
  { value: 1, label: '上海', description: 'Shanghai' },
  { value: 2, label: '北京', description: 'Beijing' },
  { value: 3, label: '合肥', description: 'Hefei' },
  { value: 4, label: '深圳', description: 'Shenzhen' },
  { value: 5, label: '杭州', description: 'Hangzhou' },
  { value: 6, label: '天津', description: 'Tianjin' },
  { value: 7, label: '西安', description: \`Xi'an\` },
  { value: 8, label: '南京', description: 'Nanjing' },
  { value: 9, label: '哈尔滨', description: 'Harbin' },
  { value: 10, label: '香港', description: 'HongKong' },
];
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Select/description.vue"
  }, null, _parent));
  _push(`<h2 id="filter" tabindex="-1">Filter <a class="header-anchor" href="#filter" aria-label="Permalink to &quot;Filter&quot;">​</a></h2><p>Set <code>filterable = true</code> to enable filtering</p><p>If you need to customize the filter method, pass <code>filter-method</code></p><p>If you need an <code>input</code> on the dropdown panel, you can configure <code>use-build-in-panel-filter</code> to enable the built-in <code>input</code> on the panel</p><p>The original implementation using slots can still be used</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        默认过滤规则
        <h-tooltip>
          <template #content>
            默认的规则为 \`label.toLowerCase().includes(value)\`，label 是传入的 option 上的 label/description 属性值，value 是输入的内容，默认规则是忽略大小写进行字符串匹配的
          </template>
          <a-icon name="help" />
        </h-tooltip>
      </div>
      <h-select v-model="values1" :filterable="true" :multiple="true" :to-body="false" :fit-content-input-min-width="1">
        <h-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        自定义过滤器
        <h-tooltip>
          <template #content>
            这个示例展示的是自定义过滤方法，过滤方法中是大小写敏感的字符串匹配
          </template>
          <a-icon name="help" />
        </h-tooltip>
      </div>
      <h-select v-model="value2" :filter-option="filterOption" :clearable="true" placeholder="请选择" :to-body="false" @input="onInput">
        <h-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        单选-下拉列表带筛选功能
      </div>
      <h-select
        v-model="value4"
        panel-filter-option
        use-build-in-panel-filter
        :to-body="false"
      >
        <h-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
        <template #empty>
          <div class="empty-city">没有找到对应的城市信息</div>
        </template>
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        多选-下拉列表带筛选功能
      </div>
      <h-select
        v-model="values2"
        panel-filter-option
        multiple
        :panel-filter-input-value="panelFilterInputValue2"
        :to-body="false"
        @dropdownVisibleChange="dropdownVisibleChange"
      >
        <h-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
        <template #panelHeaderRender>
          <div class="panel-filter-box">
            <h-input
              v-model="panelFilterInputValue2"
              placeholder="Please input search keywords"
            >
              <template #prefix>
                <IconSearch size="16" color="#BBBDC7" />
              </template>
            </h-input>
          </div>
        </template>
        <template #optionEmptyRender>
          <div class="empty-city">没有找到对应的城市信息</div>
        </template>
      </h-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { useOptionProps } from '@aurora/horizon-web';
import { AIcon, IconSearch } from '@aurora/icon';

const values1 = ref([1, 2]);
const value2 = ref();
const value4 = ref();
const values2 = ref([]);

const panelFilterInputValue2 = ref('');

const selectOptions: ExtractPropTypes<ExtractPropTypes<typeof useOptionProps>>[] = [
  { value: 1, label: '上海', description: 'Shanghai' },
  { value: 2, label: '北京', description: 'Beijing' },
  { value: 3, label: '合肥', description: 'Hefei' },
  { value: 4, label: '深圳', description: 'Shenzhen' },
  { value: 5, label: '杭州', description: 'Hangzhou' },
  { value: 6, label: '天津', description: 'Tianjin' },
  { value: 7, label: '西安', description: \`Xi'an\` },
  { value: 8, label: '南京', description: 'Nanjing' },
  { value: 9, label: '哈尔滨', description: 'Harbin' },
  { value: 10, label: '香港', description: 'HongKong' },
];

const filterOption = (input: string, props: ExtractPropTypes<typeof useOptionProps>) => {
  return props.label?.toString().includes(input) || props.description?.toString().includes(input) || false;
};

const dropdownVisibleChange = (visible: boolean) => {
  if (!visible) {
    panelFilterInputValue2.value = '';
  }
};

function onInput(val: string) {
  console.info('input: ', val);
}
<\/script>

<style scoped>
.empty-city {
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: slategrey;
}

.panel-filter-box {
  padding: 12px;
}

.panel-filter-box :deep(.h-icon_search) {
  font-size: 12px !important;
}
</style>
`,
    path: "demos/components/Select/filter.vue"
  }, null, _parent));
  _push(`<h2 id="filter-reserve-keyword" tabindex="-1">Filter Reserve Keyword <a class="header-anchor" href="#filter-reserve-keyword" aria-label="Permalink to &quot;Filter Reserve Keyword&quot;">​</a></h2><p>In the case of filter + multiple selection, setting <code>reserve-keyword</code> can set three modes of reserving keywords</p><p><code>true</code>: Reserve keyword</p><p><code>false</code>: Do not reserve keyword</p><p><code>&#39;reserve-deselect&#39;</code>: Only reserve keyword when deselecting</p><p><code>&#39;reserve-special&#39;</code>: Do not reserve keyword, but still reserve the filtered content. Only after the user manually clears the input text or loses focus on the input box will the filtered content change</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        保留关键字（默认）
      </div>
      <h-select v-model="values1" :filterable="true" :multiple="true" :to-body="false">
        <h-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        不保留关键字
      </div>
      <h-select v-model="values2" :filterable="true" :multiple="true" :reserve-keyword="false" :to-body="false">
        <h-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        仅在反选时保留，正选不保留
        <h-tooltip>
          <template #content>
            考虑了过滤时反选的操作便捷性
          </template>
          <a-icon name="help" />
        </h-tooltip>
      </div>
      <h-select v-model="values3" :filterable="true" :multiple="true" reserve-keyword="reserve-deselect" :to-body="false">
        <h-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        不保留关键字，但过滤内容特殊处理
        <h-tooltip content="用户手动清空输入文字或失焦输入框后，才会改变过滤内容">
          <a-icon name="help" />
        </h-tooltip>
      </div>
      <h-select v-model="values4" :filterable="true" :multiple="true" reserve-keyword="reserve-special" :to-body="false">
        <h-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
      </h-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { useOptionProps } from '@aurora/horizon-web';
import { AIcon } from '@aurora/icon';

const values1 = ref([]);
const values2 = ref([]);
const values3 = ref([]);
const values4 = ref([]);

const selectOptions: ExtractPropTypes<ExtractPropTypes<typeof useOptionProps>>[] = [
  { value: 1, label: '上海', description: 'Shanghai' },
  { value: 2, label: '北京', description: 'Beijing' },
  { value: 3, label: '合肥', description: 'Hefei' },
  { value: 4, label: '深圳', description: 'Shenzhen' },
  { value: 5, label: '杭州', description: 'Hangzhou' },
  { value: 6, label: '天津', description: 'Tianjin' },
  { value: 7, label: '西安', description: \`Xi'an\` },
  { value: 8, label: '南京', description: 'Nanjing' },
  { value: 9, label: '哈尔滨', description: 'Harbin' },
  { value: 10, label: '香港', description: 'HongKong' },
];
<\/script>
`,
    path: "demos/components/Select/reserve-keyword.vue"
  }, null, _parent));
  _push(`<h2 id="confirm-panel" tabindex="-1">Confirm Panel <a class="header-anchor" href="#confirm-panel" aria-label="Permalink to &quot;Confirm Panel&quot;">​</a></h2><p>To enable the confirm panel, you need to enable <code>need-confirm = true</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选：默认</div>
      <h-select
        v-model="value1"
        filter-option
        need-dropdown-confirm
        show-selected-icon
        :to-body="false"
        @change="changeHandle"
      >
        <h-option label="齐齐哈尔" :value="''" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">单选：自定义按钮文字</div>
      <h-select
        v-model="value2"
        filter-option
        need-dropdown-confirm
        dropdown-confirm-btn-text="确定"
        dropdown-cancel-btn-text="取消"
        :to-body="false"
      >
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">单选：使用插槽自定义确认框</div>
      <h-select
        ref="confirmRef"
        v-model="value3"
        filter-option
        need-dropdown-confirm
        :to-body="false"
      >
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
        <template #dropConfirmRender>
          <div style="display: flex; justify-content: flex-end; margin: 5px">
            <h-button size="small" class="mr-2" @click="confirmHandle">确定</h-button>
            <h-button size="small" type="normal" @click="cancelHandle">取消</h-button>
          </div>
        </template>
      </h-select>
    </h-col>
  </h-row>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">多选：默认</div>
      <h-select v-model="values1" filter-option need-dropdown-confirm multiple :to-body="false">
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选：自定义按钮文字</div>
      <h-select
        v-model="values2"
        multiple
        filter-option
        need-dropdown-confirm
        dropdown-confirm-btn-text="确定"
        dropdown-cancel-btn-text="取消"
        :to-body="false"
      >
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选：使用插槽自定义确认框</div>
      <h-select
        ref="confirmRef2"
        v-model="values3"
        multiple
        filter-option
        need-dropdown-confirm
        :to-body="false"
      >
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
        <template #dropConfirmRender>
          <div style="display: flex; justify-content: flex-end; margin: 5px">
            <h-button size="small" class="mr-2" @click="confirmHandle2">确定</h-button>
            <h-button size="small" type="normal" @click="cancelHandle2">取消</h-button>
          </div>
        </template>
      </h-select>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref();
    const value2 = ref();
    const value3 = ref();
    const values1 = ref([]);
    const values2 = ref([]);
    const values3 = ref([]);
    const confirmRef = ref<any>(null);
    const confirmRef2 = ref<any>(null);

    const changeHandle = () => {
      console.info(value3.value);
    };

    return {
      value1,
      value2,
      value3,
      values1,
      values2,
      values3,
      confirmRef,
      confirmRef2,
      changeHandle,
      confirmHandle() {
        console.info('confirm');
        confirmRef.value.confirmHandle();
      },
      confirmHandle2() {
        console.info('confirm');
        confirmRef2.value.confirmHandle();
      },
      cancelHandle() {
        console.info('cancel');
        confirmRef.value.cancelHandle();
      },
      cancelHandle2() {
        console.info('cancel');
        confirmRef2.value.cancelHandle();
      },
    };
  },
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Select/confirm.vue"
  }, null, _parent));
  _push(`<h2 id="value-conversion" tabindex="-1">Value Conversion <a class="header-anchor" href="#value-conversion" aria-label="Permalink to &quot;Value Conversion&quot;">​</a></h2><p>Use <code>value-format</code>, pass in a function, then you can convert <code>modelValue</code></p><p>Please note that it is still not recommended to use <code>value-format</code>. Since 2.3.0, <code>h-option.value</code> already supports <code>object</code> type</p><p>This method will be removed in <code>3.x</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-select v-model="value1" :value-format="valueFormat" :to-body="false">
        <h-option :value="1" label="中国" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
      <div class="mb-2">你选中的值是 {{ value1 }}</div>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-select v-model="value2" :value-format="valueFormat" multiple :to-body="false">
        <h-option :value="1" label="中国" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
      <div class="mb-2">你选中的值是 {{ value2 }}</div>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import type { OptionProps } from '@aurora/horizon-web/es/components/Select/src/composables/useProps';

const value1 = shallowRef({ "value": 1, "label": "中国" });
const value2 = shallowRef([{ "value": 1, "label": "中国" }]);

function valueFormat(originValue: OptionProps) {
  console.info(JSON.stringify(originValue));
  return {
    value: originValue.value,
    label: originValue.label,
  };
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Select/format-value.vue"
  }, null, _parent));
  _push(`<h2 id="custom-option" tabindex="-1">Custom Option <a class="header-anchor" href="#custom-option" aria-label="Permalink to &quot;Custom Option&quot;">​</a></h2><p>Through the <code>option.default</code> slot, you can customize the display form</p><p>You can also set the slot <code>select.optionRender</code> to uniformly set the display form of <code>option</code></p><p>In addition, you can pass in <code>select.external-panel-style</code> to customize the <code>style</code> of the panel</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">自定义 option</div>
      <h-select v-model="value1" :to-body="false">
        <h-option label="中国" :value="1">
          <template #default="slotProps">
            <div class="select-custom-item china" :class="slotProps.active ? 'active' : ''">
              {{ slotProps.label }}
            </div>
          </template>
        </h-option>
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
        <template #optionRender="slotProps">
          <div class="select-custom-item" :class="slotProps.active ? 'active' : ''">
            {{ slotProps.label }}
          </div>
        </template>
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">自定义 Option 面板样式</div>
      <h-select
        v-model="value2"
        :external-panel-style="{ width: '100px', border: '1px solid #f00' }"
        :to-body="false"
      >
        <h-option label="中国" :value="1" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref();
    const value2 = ref();
    const value3 = ref();
    const value4 = ref();
    const value5 = ref();
    const values1 = ref([]);
    const values2 = ref([]);
    const confirmRef = ref<any>(null);

    const changeHandle = () => {
      console.info(value3.value);
    };

    return {
      value1,
      value2,
      value3,
      value4,
      value5,
      values1,
      values2,
      confirmRef,
      changeHandle,
      confirmHandle() {
        console.info('confirm');
        confirmRef.value.confirmHandle();
      },
      cancleHandle() {
        console.info('cancle');
        confirmRef.value.cancelHandle();
      },
    };
  },
});
<\/script>

<style scoped>
.select-custom-item {
  height: 34px;
  line-height: 16px;
  width: 100%;
  background: #ff0;
  padding: 10px 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  white-space: nowrap;
  margin: 5px 0;

  &.china {
    background: #f00;
    color: #fff;
  }

  &.active {
    background-color: #0ff;
    font-weight: bolder;
  }
}
</style>
`,
    path: "demos/components/Select/option.vue"
  }, null, _parent));
  _push(`<h2 id="option-overflow" tabindex="-1">Option Overflow <a class="header-anchor" href="#option-overflow" aria-label="Permalink to &quot;Option Overflow&quot;">​</a></h2><p>If the option is too long, it will automatically overflow</p><p><code>select.max-tag-width</code> has been removed, constrained by <code>tag</code> specification</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选：选项长度超长</div>
      <h-select v-model="value1" :to-body="false">
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">单选：过滤+选项长度超长</div>
      <h-select v-model="value2" filter-option :to-body="false">
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选：选项长度超长</div>
      <h-select v-model="values1" multiple :to-body="false" :collapse="true" :collapse-tags-fill-up="true">
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option label="上海" :value="3" />
        <h-option :value="4" label="北京" />
        <h-option :value="5" label="合肥" name="hefei" />
        <h-option
          :value="6"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选：过滤+选项长度超长</div>
      <h-select v-model="values2" :multiple="true" :filter-option="true" :collapse="true" collapse-tags-fill-up :to-body="false">
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">选项行数设定为2</div>
      <h-select v-model="values3" :multiple="true" :filter-option="true" :collapse="true" :to-body="false">
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          :max-lines="2"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </h-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const value2 = ref();
const values1 = ref([]);
const values2 = ref([]);
const values3 = ref([]);
<\/script>
`,
    path: "demos/components/Select/overflow.vue"
  }, null, _parent));
  _push(`<h2 id="remote-search" tabindex="-1">Remote Search <a class="header-anchor" href="#remote-search" aria-label="Permalink to &quot;Remote Search&quot;">​</a></h2><p>Set <code>show-search</code> to enable remote search</p><p>Listen to the <code>search</code> event to control when search results are displayed</p><p>Or you can control it by passing an async method to <code>search-method</code></p><p>If you want to display the panel even when there are no results, set <code>hide-panel-when-show-search-and-empty-list = false</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-select
        v-model="value1"
        show-search
        clearable
        :to-body="false"
        :loading="isLoading"
        loading-text="加载中"
        @search="searchHandle"
        @focus="onFocus"
        @blur="onBlur"
      >
        <h-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.text"
        />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">单选-无选项也显示面板</div>
      <h-select
        v-model="value2"
        show-search
        clearable
        :to-body="false"
        :loading="isLoading"
        loading-text="加载中"
        :hide-panel-when-show-search-and-empty-list="false"
        @search="searchHandle"
        @focus="onFocus"
        @blur="onBlur"
      >
        <h-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.text"
        />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-select
        v-model="values1"
        :to-body="false"
        multiple
        show-search
        clearable
        collapse-tags-fill-up
        collapse-tags-tooltip
        collapse-tags
        :loading="isLoading"
        @search="searchHandle"
        @focus="onFocus"
        @blur="onBlur"
      >
        <h-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.text"
        />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选-无选项也显示面板</div>
      <h-select
        v-model="values2"
        :to-body="false"
        multiple
        show-search
        clearable
        collapse-tags-fill-up
        collapse-tags-tooltip
        collapse-tags
        :hide-panel-when-show-search-and-empty-list="false"
        :loading="isLoading"
        @search="searchHandle"
        @focus="onFocus"
        @blur="onBlur"
      >
        <h-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.text"
        />
      </h-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import jsonp from 'fetch-jsonp';
import qs from 'qs';

let timeout: any = null;
let currentValue: string = '';

const isLoading = ref(false);

function fetch(value: string, callback: Function) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = qs.stringify({
      code: 'utf-8',
      q: value,
    });

    isLoading.value = true;

    jsonp(\`https://suggest.taobao.com/sug?\${str}\`)
      .then(response => response.json())
      .then(d => {
        if (currentValue === value) {
          const { result } = d;
          const data: any[] = [];
          result.forEach((r: any) => {
            data.push({
              value: r[0],
              text: r[0],
            });
          });
          callback(data);
        }
      }).finally(() => {
      isLoading.value = false;
    });
  }

  timeout = setTimeout(fake, 300);
}

const value1 = ref('Demo Phone');
const value2 = ref();
const values1 = ref(['demo phone', 'demo phone 手机']);
const values2 = ref([]);

const options = ref<{value: string; text: string}[]>([]);

const searchHandle = (value: string) => {
  console.info('search: ', value);
  if (value) {
    fetch(value, (data: any) => (options.value = data));
  } else {
    options.value = [];
  }
};

function onFocus() {
  console.info('focus');
}

function onBlur() {
  console.info('blur');
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Select/remote-search.vue"
  }, null, _parent));
  _push(`<h2 id="allow-create" tabindex="-1">Allow Create <a class="header-anchor" href="#allow-create" aria-label="Permalink to &quot;Allow Create&quot;">​</a></h2><p>Set <code>allow-create</code> to allow creating <code>option</code></p><p>And use the <code>before-create</code> callback to determine whether to allow creating <code>option</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选-允许创建 <h-tooltip content="拦截创建【南京】"><IconHelp /></h-tooltip></div>
      <h-select v-model="value1" allow-create :before-create="beforeCreate" :to-body="false" @input="onInput">
        <h-option value="1" label="上海" />
        <h-option value="2" label="北京" />
        <h-option value="3" label="合肥" name="hefei" />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选-允许创建</div>
      <h-select v-model="values1" allow-create multiple :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选-带创建选项长度超长</div>
      <h-select v-model="values2" allow-create multiple :to-body="false">
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option label="上海" :value="3" />
        <h-option :value="4" label="北京" />
        <h-option :value="5" label="合肥" name="hefei" />
        <h-option
          :value="6"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </h-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconHelp } from '@aurora/icon';

const value1 = ref();
const values1 = ref([]);
const values2 = ref([]);

const beforeCreate = (value: string, optionMap: Map<any, any>) => {
  console.info(value);
  console.info(optionMap);

  if (optionMap.get(value) || value === '南京') return false;
};

function onInput(val) {
  console.info('input:', val);
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Select/creatable.vue"
  }, null, _parent));
  _push(`<h2 id="reach-bottom-load" tabindex="-1">Reach Bottom Load <a class="header-anchor" href="#reach-bottom-load" aria-label="Permalink to &quot;Reach Bottom Load&quot;">​</a></h2><p>You can listen to the <code>optionListReachBottom</code> event to get whether it has scrolled to the bottom, then trigger update loading</p><p>Toggling the <code>loading</code> state can change the loading state of the popup panel</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import throttle from 'lodash/throttle';

interface ListType {
  value: string;
  label: string;
}

const value = ref(null);
const list = ref<ListType[]>([]);
const loading = ref(false);

function generateRandomOptions() {
  loading.value = true;

  setTimeout(() => {
    for (let i = 0; i < 20; i ++) {
      list.value.push({
        label: faker.person.fullName(),
        value: faker.phone.number(),
      });
    }

    loading.value = false;
  }, 1000);
}

const onOptionListReachBottom = throttle(() => {
  console.info('reach bottom');
  generateRandomOptions();
}, 500);

generateRandomOptions();
<\/script>

<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <h-select v-model="value" :clearable="true" :to-body="false" :loading="loading" @optionListReachBottom="onOptionListReachBottom">
        <h-option v-for="item of list" :key="item.value" :label="item.label" :value="item.value" />
      </h-select>
    </h-col>
  </h-row>
</template>

<style scoped>
</style>
`,
    path: "demos/components/Select/reach-bottom.vue"
  }, null, _parent));
  _push(`<h2 id="custom-selection-tag" tabindex="-1">Custom Selection Tag <a class="header-anchor" href="#custom-selection-tag" aria-label="Permalink to &quot;Custom Selection Tag&quot;">​</a></h2><p>Through the <code>select.tagRender</code> slot, you can customize the rendering performance of selected options in the input box</p><p>Using the <code>option.label</code> slot, you can customize the display form of text in <code>h-option</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const optionList = [
  {label: '正常', color: 'brand' },
  {label: '警示', type: 'warning' },
  {label: '错误', type: 'error' },
  {label: '进行中', type: 'info' },
  {label: '已完成', type: 'success' },
];

const value = ref<string>();
const values = ref<string[]>([]);
const values2 = ref<string[]>([]);
const size = ref('medium');
const filterable = ref(true);
const pure = ref(false);

function getOptionByValue(value: string | undefined) {
  return optionList.find(curr => curr.label === value)!;
}

function onDeselect(collection: string[], value: string) {
  const index = collection.indexOf(value);

  if (index >= 0) {
    collection.splice(index, 1);
  }
}
<\/script>

<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="是否可过滤">
      <h-switch v-model="filterable" status />
    </h-form-item>
    <h-form-item label="是否是纯粹标签">
      <h-switch v-model="pure" status />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-select v-model="value" :to-body="false" :filterable="filterable" clearable :size="size">
        <h-option v-for="item of optionList" :key="item.label" :label="item.label" :value="item.label">
          <template #label>
            <h-tag :type="item.type" :clickable="false" :color="item.color" :auto-color="!!item.color">
              {{ item.label }}
            </h-tag>
          </template>
        </h-option>
        <template #tagRender="props">
          <h-tag
            :key="props.value"
            :type="getOptionByValue(value)?.type"
            :clickable="false"
            :color="getOptionByValue(value)?.color"
            :auto-color="!!getOptionByValue(value)?.color"
            :size="size"
            :is-pure="pure"
          >
            {{ value }}
          </h-tag>
        </template>
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-select
        v-model="values"
        :multiple="true"
        :collapse="true"
        :collapse-tags-tooltip="true"
        :to-body="false"
        :filterable="filterable"
        clearable
        :size="size"
      >
        <h-option
          v-for="item of optionList"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        >
          <template #label>
            <h-tag :type="item.type" :clickable="false" :color="item.color" :auto-color="!!item.color">
              {{ item.label }}
            </h-tag>
          </template>
        </h-option>
        <template #tagRender="props">
          <h-tag
            :key="props.value"
            :type="getOptionByValue(props.value).type"
            :clickable="false"
            :closable="true"
            :size="size"
            :color="getOptionByValue(props.value).color"
            :auto-color="!!getOptionByValue(props.value).color"
            :is-pure="pure"
            @close="onDeselect(values, props.value)"
          >
            {{ getOptionByValue(props.value).label }}
          </h-tag>
        </template>
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">完全自定</div>
      <h-select v-model="values2" :multiple="true" :to-body="false" :filterable="filterable" :size="size">
        <h-option v-for="item of optionList" :key="item.label" :label="item.label" :value="item.label">
          <template #label>
            <h-tag :type="item.type" :clickable="false" :color="item.color" :auto-color="!!item.color">
              {{ item.label }}
            </h-tag>
          </template>
        </h-option>
        <template #selectRender>
          <h-tag-group collapse collapse-use-tooltip tooltip-render-type="full">
            <template #prefix><div style="align-self: center;">你的选择是：</div></template>
            <h-tag
              v-for="item of values2"
              :key="item"
              :closable="true"
              :size="size"
              @close="onDeselect(values2, item)"
            >{{item}}</h-tag>
          </h-tag-group>
        </template>
      </h-select>
    </h-col>
  </h-row>
</template>

<style scoped>
.custom-tag {
  display: flex;
  height: var(--h-select-height--option);
  align-items: center;
  padding-left: 12px;
}

</style>
`,
    path: "demos/components/Select/custom-tag-render.vue"
  }, null, _parent));
  _push(`<h2 id="selected-options-to-top" tabindex="-1">Selected Options to Top <a class="header-anchor" href="#selected-options-to-top" aria-label="Permalink to &quot;Selected Options to Top&quot;">​</a></h2><p>You can set <code>selectedOptionOrderToTop = true</code> to enable selected options to be arranged to the top</p><p>The arrangement will only be performed after closing the panel, and the sorting will not change when actively selecting</p><p>If it is a grouping situation, it will be ranked first in the group, and will not move the entire group forward</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref();
    const value2 = ref();
    const values1 = ref([]);
    const values2 = ref([]);

    return {
      value1,
      value2,
      values1,
      values2,
    };
  },
});
<\/script>

<template>
  <h-row :gutter="20">
    <h-col :span="6">
      <div class="demo-title">普通单选</div>
      <h-select v-model="value1" clearable :selected-option-order-to-top="true" :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
        <h-option label="杭州" :value="4" />
        <h-option :value="5" label="成都" />
        <h-option :value="6" label="重庆" name="hefei" />
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">普通多选</div>
      <h-select v-model="values1" :multiple="true" clearable :to-body="false" :selected-option-order-to-top="true">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
        <h-option label="杭州" :value="4" />
        <h-option :value="5" label="成都" />
        <h-option :value="6" label="重庆" name="hefei" />
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">单选 - 不具名分组</div>
      <h-select v-model="value2" clearable :selected-option-order-to-top="true" :to-body="false">
        <h-option-group>
          <h-option label="上海" :value="1" />
          <h-option :value="2" label="北京" />
          <h-option :value="3" label="合肥" name="hefei" />
        </h-option-group>
        <h-option label="杭州" :value="4" />
        <h-option :value="5" label="成都" />
        <h-option :value="6" label="重庆" name="hefei" />
      </h-select>
    </h-col>
    <h-col :span="6">
        <div class="demo-title">多选 - 具名分组</div>
        <h-select v-model="values2" clearable multiple :selected-option-order-to-top="true" :to-body="false">
          <h-option-group label="一线">
            <h-option label="上海" :value="1" />
            <h-option :value="2" label="北京" />
            <h-option :value="3" label="广州" name="hefei" />
          </h-option-group>
          <h-option-group label="二线">
            <h-option label="杭州" :value="4" />
            <h-option :value="5" label="成都" />
            <h-option :value="6" label="重庆" name="hefei" />
          </h-option-group>
        </h-select>
    </h-col>
  </h-row>
</template>
`,
    path: "demos/components/Select/selected-option-order-to-top.vue"
  }, null, _parent));
  _push(`<h2 id="width-adaptation" tabindex="-1">Width Adaptation <a class="header-anchor" href="#width-adaptation" aria-label="Permalink to &quot;Width Adaptation&quot;">​</a></h2><p>By default, the width of the dropdown panel will be consistent with the <code>select</code> width.</p><p>In special cases, the <code>select</code> width may be very small, and the dropdown panel width needs to be unrestricted. You can set <code>fit-input-width = false</code></p><p>But note that at this time, the dropdown panel width no longer has a maximum width limit, so it will be stretched by overly long child elements</p><p>In addition, the trigger itself has a minimum width of <code>144px</code>. If you need to change it, you need to modify the style</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="4">
      <div class="demo-title">
        单选
      </div>
      <h-select
        v-model="value1"
        clearable
        placeholder="请选择"
        :fit-input-width="false"
        :to-body="false"
        @change="changeHandle"
      >
        <h-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </h-select>
    </h-col>
    <h-col :span="4">
      <div class="demo-title">
        多选
      </div>
      <h-select
        v-model="values1"
        multiple
        clearable
        placeholder="请选择"
        :fit-input-width="false"
        :collapse="true"
        :to-body="false"
        collapse-tags-fill-up
        @change="changeHandle"
      >
        <h-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :max-lines="2"
        />
      </h-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(null);
const values1 = ref([]);

const selectOptions = [
  { value: 1, label: '一个名字特别长的文字，需要超过 select 本身宽度' },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
];

const changeHandle = () => {
  console.info(value1.value);
};
<\/script>
`,
    path: "demos/components/Select/fit-width.vue"
  }, null, _parent));
  _push(`<h2 id="initial-value" tabindex="-1">Initial Value <a class="header-anchor" href="#initial-value" aria-label="Permalink to &quot;Initial Value&quot;">​</a></h2><p>By default, after clearing the value, <code>update:modelValue</code> will default to <code>undefined</code></p><p>But you can also control the default value after clearing through <code>initialValue</code></p><p>For example, you can specify data such as <code>null</code> <code>[]</code></p><p><strong>Note that empty strings are also considered non-empty values</strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">默认值为 null</div>
      <div class="demo-description">
        modelValue: {{ Object.prototype.toString.call(value1) }} {{ value1 }}
      </div>
      <h-select v-model="value1" :initial-value="null" :clearable="true" :to-body="false">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">默认值为 []</div>
      <div class="demo-description">
        modelValue: {{ Object.prototype.toString.call(value2) }} {{ value2 }}
      </div>
      <h-select v-model="value2" :multiple="true" :initial-value="[]" :to-body="false" :clearable="true">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
  </h-row>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const value2 = ref(undefined);

const selectOptions = [
  { value: '', label: '上海' },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
  { value: 4, label: '深圳' },
  { value: 5, label: '杭州' },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Select/initial-value.vue"
  }, null, _parent));
  _push(`<h2 id="event-display" tabindex="-1">Event Display <a class="header-anchor" href="#event-display" aria-label="Permalink to &quot;Event Display&quot;">​</a></h2><p>This example shows all event emissions, you can check the printed events in the console</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">事件监听</div>
      <h-select
        v-model="values2"
        multiple
        allow-create
        :to-body="false"
        @blur="blur"
        @focus="focus"
        @change="changeHandle"
        @clear="clear"
        @deselect="deselect"
        @dropdownVisibleChange="dropdownVisibleChange"
      >
        <h-option label="中国" :value="1" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">事件监听 -- 确认选项</div>
      <h-select
        v-model="values3"
        multiple
        allow-create
        need-dropdown-confirm
        :to-body="false"
        @blur="blur"
        @focus="focus"
        @change="changeHandle"
        @clear="clear"
        @deselect="deselect"
        @dropdownVisibleChange="dropdownVisibleChange"
      >
        <h-option label="中国" :value="1" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const values2 = ref([]);
    const values3 = ref([]);

    const changeHandle = (value: any, option: any) => {
      console.group('change');
      console.info(value);
      console.info(option);
      console.groupEnd();
    };

    return {
      valueFormat(originValue: any) {
        return {
          value: originValue.value,
          label: originValue.label,
        };
      },
      filterOption(input: string, props: any) {
        const label = props.label;
        return label.includes(input.toUpperCase());
      },
      blur() {
        console.info('blur');
      },
      focus() {
        console.info('focus');
      },
      clear() {
        console.info('clear');
      },
      deselect(value: any) {
        console.info('deselect', value);
      },
      dropdownVisibleChange(visible: boolean) {
        console.info('dropdownVisibleChange', visible);
      },

      changeHandle,
      values2,
      values3,
    };
  },
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Select/events.vue"
  }, null, _parent));
  _push(`<h2 id="custom-empty-style" tabindex="-1">Custom Empty Style <a class="header-anchor" href="#custom-empty-style" aria-label="Permalink to &quot;Custom Empty Style&quot;">​</a></h2><p>You can use <code>empty-text</code> to control the text displayed when the list is empty</p><p>You can also control the content displayed when empty through the slot <code>slots.empty</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

  const value = ref();
<\/script>

<template>
  <h-row :gutter="10">
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">
        自定义空样式
      </div>
      <h-select v-model="value" filter-option :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
        <template #empty>
          <div class="empty-city">没有找到对应的城市信息</div>
        </template>
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">
        使用 h-empty 组件
      </div>
      <h-select v-model="value" filter-option :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
        <template #empty>
          <h-empty description="没有找到对应的城市信息"></h-empty>
        </template>
      </h-select>
    </h-col>
  </h-row>
</template>

<style scoped>
.empty-city {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
`,
    path: "demos/components/Select/empty.vue"
  }, null, _parent));
  _push(`<h2 id="virtual-scroll" tabindex="-1">Virtual Scroll <a class="header-anchor" href="#virtual-scroll" aria-label="Permalink to &quot;Virtual Scroll&quot;">​</a></h2><p>Enabling virtual scroll requires configuring the <code>options</code> field</p><p>Once this value is set, the content of the <code>default</code> slot will be ignored, and you cannot customize the display of <code>option</code> (that is, all slots related to <code>option</code> cannot be used)</p><p>This example creates 5000 elements</p><p><strong>Due to the special nature of the virtual scroll component, there may be blank invisible items in filtering and searching situations. You need to manually scroll up and down to restore</strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

const options = new Array(50).fill(0).map((_, index) => {
  const value = faker.person.fullName();
  return {
    label: value,
    value,
    description: index % 2 === 0 ? undefined : faker.location.county(),
    disabled: index % 5 === 0,
  };
});
const value1 = ref();
const value2 = ref([options[12].value, options[15].value]);
const descriptionPosition = ref('right');

function onReachBottom() {
  console.info('reach bottom');
}
<\/script>

<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="description-position">
      <h-radio-group v-model="descriptionPosition">
        <h-radio label="right"></h-radio>
        <h-radio label="bottom"></h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-select v-model="value1" :to-body="false" filterable :options="options" :description-position="descriptionPosition" @option-list-reach-bottom="onReachBottom" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-select v-model="value2" :to-body="false" filterable multiple :options="options" :description-position="descriptionPosition" :collapse-tags="true" :collapse-tags-tooltip="true" @option-list-reach-bottom="onReachBottom" />
    </h-col>
  </h-row>
</template>

<style scoped>

</style>
`,
    path: "demos/components/Select/virtual-scroller.vue"
  }, null, _parent));
  _push(`<h2 id="select-api" class="no-underline h2"><a href="#select-api" class="!no-underline">Select Api</a></h2><h3 id="select-props" class="no-underline h3"><a href="#select-props" class="!no-underline">Select Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>ModelValueType</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>Configuration for clearable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>Configuration for trigger.</td><td><code>&#39;hover&#39; | &#39;click&#39; | &#39;never&#39;</code></td><td class="text-center">No</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>Configuration for placement.</td><td><code>| &#39;auto&#39;<br>      | &#39;auto-start&#39;<br>      | &#39;auto-end&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;<br>      | &#39;left&#39;</code></td><td class="text-center">No</td><td>&#39;bottom-start&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>Configuration for to body.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">select-style`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "inputStyle" }, null, _parent));
  _push(`</td><td>Configuration for select style.</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;no-border&#39; | &#39;noborder&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-style</td><td>Configuration for input style.</td><td><code>PickerInputStyleType</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value-format</td><td>Configuration for value format.</td><td><code>(<br>        propsAndAttrs: Partial&lt;OptionProps&gt; &amp; Record&lt;string, unknown&gt;,<br>      ) =&gt; ModelValueFormattedType &amp; Record&lt;string, unknown&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>Configuration for placeholder.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">need-dropdown-confirm`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "needConfirm" }, null, _parent));
  _push(`</td><td>Configuration for need dropdown confirm.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">need-confirm</td><td>Configuration for need confirm.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-confirm-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmBtnText" }, null, _parent));
  _push(`</td><td>Configuration for dropdown confirm btn text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmButtonText" }, null, _parent));
  _push(`</td><td>Configuration for confirm btn text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-button-text</td><td>Configuration for confirm button text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-cancel-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmBtnText" }, null, _parent));
  _push(`</td><td>Configuration for dropdown cancel btn text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "cancelButtonText" }, null, _parent));
  _push(`</td><td>Configuration for cancel btn text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button-text</td><td>Configuration for cancel button text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-empty-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "emptyText" }, null, _parent));
  _push(`</td><td>Configuration for option empty text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-text</td><td>Configuration for empty text.</td><td><code>string | VNode</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">destroy-on-hide</td><td>Configuration for destroy on hide.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-options</td><td>Configuration for popover options.</td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-input-width</td><td>Configuration for fit input width.</td><td><code>boolean | &#39;fit-content&#39;</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-show-delay</td><td>Configuration for hover show delay.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-hide-delay</td><td>Configuration for hover hide delay.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple</td><td>Configuration for multiple.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple-limit</td><td>Configuration for multiple limit.</td><td><code>number</code></td><td class="text-center">No</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filterable</td><td>Configuration for filterable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-method</td><td>Configuration for filter method.</td><td><code>HSelectFilterFunction</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description-filterable</td><td>Configuration for description filterable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-option`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "filterable / filterMethod" }, null, _parent));
  _push(`</td><td>Configuration for filter option.</td><td><code>boolean | HSelectFilterFunction</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-filter-option</td><td>Configuration for panel filter option.</td><td><code>boolean | HSelectFilterFunction</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-filter-input-value</td><td>Configuration for panel filter input value.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-build-in-panel-filter</td><td>Configuration for use build in panel filter.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-input-placeholder</td><td>Configuration for panel input placeholder.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">allow-create</td><td>Configuration for allow create.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-create</td><td>Configuration for before create.</td><td><code>(<br>        createValue: string,<br>        optionMap: Map&lt;OptionProps[&#39;value&#39;], OptionProps&gt;,<br>      ) =&gt; Awaitable&lt;boolean | void&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "collapse-tags" }, null, _parent));
  _push(`</td><td>Configuration for collapse.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags</td><td>Configuration for collapse tags.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags-tooltip</td><td>Configuration for collapse tags tooltip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-collapse-tags</td><td>Configuration for max collapse tags.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags-fill-up</td><td>Configuration for collapse tags fill up.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapsed-tags-props</td><td>Configuration for collapsed tags props.</td><td><code>Partial&lt;TagProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-selected-icon</td><td>Configuration for show selected icon.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-icon</td><td>Configuration for selected icon.</td><td><code>iconPropType</code></td><td class="text-center">No</td><td>() =&gt; IconCheck</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-check-all</td><td>Configuration for use check all.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-check-all-summary</td><td>Configuration for use check all summary.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-all-summary-text</td><td>Configuration for check all summary text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-check-all-count</td><td>Configuration for use check all count.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-all-count-consider-filter</td><td>Configuration for check all count consider filter.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-visible</td><td>Configuration for selected visible.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">custom-select-icon`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "dropdownIcon" }, null, _parent));
  _push(`</td><td>Configuration for custom select icon.</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-icon</td><td>Configuration for dropdown icon.</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-select-style</td><td>Configuration for external select style.</td><td><code>StyleValue</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-select-class</td><td>Configuration for external select class.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-option-style`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "externalPanelStyle" }, null, _parent));
  _push(`</td><td>Configuration for external option style.</td><td><code>StyleValue</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-option-class`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "externalPanelClass" }, null, _parent));
  _push(`</td><td>Configuration for external option class.</td><td><code>string</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-panel-style</td><td>Configuration for external panel style.</td><td><code>CSSProperties</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-panel-class</td><td>Configuration for external panel class.</td><td><code>string</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-search</td><td>Configuration for show search.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-panel-when-show-search-and-empty-list</td><td>Configuration for hide panel when show search and empty list.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-list-loading`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "loading" }, null, _parent));
  _push(`</td><td>Configuration for option list loading.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading</td><td>Configuration for loading.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-loading-text</td><td>Configuration for option loading text.</td><td><code>string | VNode</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-max-lines</td><td>Configuration for option max lines.</td><td><code>number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-option-order-to-top</td><td>Configuration for selected option order to top.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-value-un-match</td><td>Configuration for show value un match.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-status</td><td>Configuration for input status.</td><td><code>PickerInputStatusType</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-class-name`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "externalPanelClass" }, null, _parent));
  _push(`</td><td>Configuration for popper class name.</td><td><code>string</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">initial-value</td><td>Configuration for initial value.</td><td><code>object | string | number | Array&lt;any&gt; | boolean | null | symbol</code></td><td class="text-center">No</td><td>HSelectInitialValueUndefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-statistic</td><td>Configuration for use statistic.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">statistic-text</td><td>Configuration for statistic text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">statistic-show-tooltip</td><td>Configuration for statistic show tooltip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-list-max-height</td><td>Configuration for option list max height.</td><td><code>string | number</code></td><td class="text-center">No</td><td>296</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">compatibility</td><td>Configuration for compatibility.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description-position</td><td>Configuration for description position.</td><td><code>&#39;right&#39; | &#39;bottom&#39;</code></td><td class="text-center">No</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td>Configuration for options.</td><td><code>Array&lt;PartialRequired&lt;Omit&lt;OptionProps, &#39;maxLines&#39; | &#39;descriptionPosition&#39;&gt;, &#39;value&#39;&gt;&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-virtual-scroll</td><td>Configuration for use virtual scroll.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-emit-frequency</td><td>Configuration for input emit frequency.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">search-icon</td><td>Configuration for search icon.</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>() =&gt; IconSearch</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reserve-keyword</td><td>Configuration for reserve keyword.</td><td><code>boolean | &#39;reserve-deselect&#39; | &#39;reserve-special&#39;</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-show-after</td><td>Configuration for tooltip show after.</td><td><code>number</code></td><td class="text-center">No</td><td>100</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-hide-after</td><td>Configuration for tooltip hide after.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-content-input-min-width</td><td>Configuration for fit content input min width.</td><td><code>string | number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-panel-by-children</td><td>Configuration for expand panel by children.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-popover-content-only</td><td>Configuration for show popover content only.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-tags-in-panel</td><td>Configuration for show tags in panel.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="select-emits" class="no-underline h3"><a href="#select-emits" class="!no-underline">Select Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-visible-change</td><td rowspan="1">Emitted when dropdown visible change changes.</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>The visible value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">Emitted when focus changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">Emitted when blur changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">input</td><td rowspan="1">Emitted when input changes.</td><td rowspan="1">( inputValue: <code>string | null | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputValue</td><td><code>string | null | undefined</code></td><td>The input value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">search</td><td rowspan="1">Emitted when search changes.</td><td rowspan="1">( searchValue: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">searchValue</td><td><code>string</code></td><td>The search value value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-list-reach-bottom</td><td rowspan="2">Emitted when option list reach bottom changes.</td><td rowspan="2">( evt: <code>Event</code>, keyword: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event</code></td><td>The evt value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">keyword</td><td><code>string</code></td><td>The keyword value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="2">Emitted when change changes.</td><td rowspan="2">( inputValue: <code>string | null | undefined | ModelValueType</code>, optionOrModelValue: <code>ModelValueType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputValue</td><td><code>string | null | undefined | ModelValueType</code></td><td>The input value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">optionOrModelValue</td><td><code>ModelValueType</code></td><td>The option or model value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">Emitted when clear changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">deselect</td><td rowspan="1">Emitted when deselect changes.</td><td rowspan="1">( value: <code>OptionProps[&#39;value&#39;]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>OptionProps[&#39;value&#39;]</code></td><td>The value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">Emitted when click changes.</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>The evt value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm</td><td rowspan="1">Emitted when confirm changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel</td><td rowspan="1">Emitted when cancel changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3 id="select-exposes" class="no-underline h3"><a href="#select-exposes" class="!no-underline">Select Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirmHandle</td><td rowspan="1">Controls confirm handle.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelHandle</td><td rowspan="1">Controls cancel handle.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setInputAble</td><td rowspan="1">Controls set input able.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">changePanelVisible</td><td rowspan="1">Controls change panel visible.</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focusOption</td><td rowspan="1">Controls focus option.</td><td rowspan="1">( optionValue: <code>OptionProps[&#39;value&#39;]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">optionValue</td><td><code>OptionProps[&#39;value&#39;]</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">Controls clear.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">renderedModelValueTags</td><td rowspan="1">Controls rendered model value tags.</td><td rowspan="1"><code>Array&lt;VNode | JSX.Element&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">Controls focus.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">Controls blur.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2 id="option-api" class="no-underline h2"><a href="#option-api" class="!no-underline">Option Api</a></h2><h3 id="option-props" class="no-underline h3"><a href="#option-props" class="!no-underline">Option Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td>Configuration for value.</td><td><code>string | number | boolean | object | symbol</code></td><td class="text-center">Yes</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>Configuration for label.</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description</td><td>Configuration for description.</td><td><code>string | VNode</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-lines</td><td>Configuration for max lines.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description-position</td><td>Configuration for description position.</td><td><code>&#39;right&#39; | &#39;bottom&#39;</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3 id="option-emits" class="no-underline h3"><a href="#option-emits" class="!no-underline">Option Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="3">Emitted when click changes.</td><td rowspan="3">( value: <code>OptionProps[&#39;value&#39;]</code>, ext: <code>any</code>, evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>OptionProps[&#39;value&#39;]</code></td><td>The value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">ext</td><td><code>any</code></td><td>The ext value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>The evt value.</td></tr></tbody></table><h2 id="optiongroup-api" class="no-underline h2"><a href="#optiongroup-api" class="!no-underline">OptionGroup Api</a></h2><h3 id="optiongroup-props" class="no-underline h3"><a href="#optiongroup-props" class="!no-underline">OptionGroup Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>Configuration for label.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Select.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Select = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Select as default
};
