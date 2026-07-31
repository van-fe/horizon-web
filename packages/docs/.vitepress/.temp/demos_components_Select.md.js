import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Select.md","filePath":"zh/demos/components/Select.md"}');
const _sfc_main = { name: "demos/components/Select.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Select</h1><p class="description">当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2>`);
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
  _push(`<h2 id="单选" tabindex="-1">单选 <a class="header-anchor" href="#单选" aria-label="Permalink to &quot;单选&quot;">​</a></h2><p>可以配置 <code>show-selected-icon</code> 开启显示选中标识</p><p>也可以配置 <code>selected-icon</code> 用来自定义选中标识的图标</p>`);
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
  _push(`<h2 id="自定义-dropdown-icon" tabindex="-1">自定义 <code>dropdown icon</code> <a class="header-anchor" href="#自定义-dropdown-icon" aria-label="Permalink to &quot;自定义 \`dropdown icon\`&quot;">​</a></h2><p>可以通过配置 <code>dropdown-icon</code> 来控制 <code>dropdown icon</code></p><p>如果传入 <code>false</code> 则可以置空</p>`);
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
  _push(`<h2 id="多选" tabindex="-1">多选 <a class="header-anchor" href="#多选" aria-label="Permalink to &quot;多选&quot;">​</a></h2><p>默认情况下，不会折叠选中项。可以配置 <code>collapse-tags = true</code> 折叠已选项</p><p>另外可以配置 <code>collapse-tags-tooltip = true</code>，可以在悬浮在 <code>+N</code> 上时显示其他已选项，并可以快捷反选已选项</p><p>另外，如果你的 <code>select</code> 空间很小，可能会此被挤压到只有 <code>+N</code> ，则可以配置 <code>max-collapse-tags</code>，强制展示多少个已选项，其余已选项则会折叠起来</p><p>如果你的选项内容过长，导致在已选项和 <code>+N</code> 之间无法容纳，则可以配置 <code>collapse-tags-fill-up = true</code>，即可让已选项尽量填满空间</p><p>自 <code>2.4.0</code> 开始，<code>collapse-tags-fill-up</code> 默认开启</p>`);
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
  _push(`<h2 id="全选" tabindex="-1">全选 <a class="header-anchor" href="#全选" aria-label="Permalink to &quot;全选&quot;">​</a></h2><p>支持传入 <code>use-check-all = true</code>，开启全选</p>`);
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
  _push(`<h2 id="选项统计" tabindex="-1">选项统计 <a class="header-anchor" href="#选项统计" aria-label="Permalink to &quot;选项统计&quot;">​</a></h2><p>传入 <code>use-statistic = true</code>，即可对多选项进行统计</p><p>可以设置 <code>statistic-text</code> 来指定统计文字</p><p><code>use-statistic</code> 会优先于 <code>use-check-all</code></p>`);
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
  _push(`<h2 id="动态设置折叠" tabindex="-1">动态设置折叠 <a class="header-anchor" href="#动态设置折叠" aria-label="Permalink to &quot;动态设置折叠&quot;">​</a></h2><p>可以通过切换 <code>collapse-tags</code> 来控制折叠状态，在 <code>focus</code> 时全部展开，<code>false</code> 时折叠</p>`);
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
  _push(`<h2 id="分组" tabindex="-1">分组 <a class="header-anchor" href="#分组" aria-label="Permalink to &quot;分组&quot;">​</a></h2><p>可以使用 <code>h-option-group</code> 来分组，具有具名分组和不具名分组</p>`);
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
  _push(`<h2 id="禁用" tabindex="-1">禁用 <a class="header-anchor" href="#禁用" aria-label="Permalink to &quot;禁用&quot;">​</a></h2><p>设置 <code>disabled = true</code> 即可禁用 <code>h-select</code></p><p>给 <code>h-option</code> 设置 <code>disabled = true</code>，即可禁用当前选项</p><p>给 <code>h-option-group</code> 设置 <code>disabled = true</code>，即可禁用当前组下的所有选项</p>`);
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
  _push(`<h2 id="已选择选项不展示" tabindex="-1">已选择选项不展示 <a class="header-anchor" href="#已选择选项不展示" aria-label="Permalink to &quot;已选择选项不展示&quot;">​</a></h2><p>设置 <code>selected-visible = false</code>，可以将已选项不展示在面板中</p>`);
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
  _push(`<h2 id="辅助说明文字" tabindex="-1">辅助说明文字 <a class="header-anchor" href="#辅助说明文字" aria-label="Permalink to &quot;辅助说明文字&quot;">​</a></h2><p>给 <code>h-option.description</code> 设置内容，用来辅助说明 <code>label</code></p>`);
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
  _push(`<h2 id="过滤" tabindex="-1">过滤 <a class="header-anchor" href="#过滤" aria-label="Permalink to &quot;过滤&quot;">​</a></h2><p>设置 <code>filterable = true</code> 开启过滤</p><p>如果需要自定义过滤方法，则传输 <code>filter-method</code> 即可</p><p>如果需要下拉面板上有 <code>input</code> ，则可以配置 <code>use-build-in-panel-filter</code>，启用内置的面板上的 <code>input</code></p><p>原本使用插槽自行实现的仍可使用</p>`);
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
  _push(`<h2 id="过滤保留关键字" tabindex="-1">过滤保留关键字 <a class="header-anchor" href="#过滤保留关键字" aria-label="Permalink to &quot;过滤保留关键字&quot;">​</a></h2><p>在过滤+多选的情况下，设置 <code>reserve-keyword</code> 可以设置三种保留关键字的模式</p><p><code>true</code>: 保留关键字</p><p><code>false</code>: 不保留关键字</p><p><code>&#39;reserve-deselect&#39;</code>: 仅在反选时保留关键字</p><p><code>&#39;reserve-special&#39;</code>: 不保留关键字，但对过滤的内容仍然保留，只有用户手动清空输入文字或失焦输入框后，才会改变过滤内容</p>`);
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
  _push(`<h2 id="确认面板" tabindex="-1">确认面板 <a class="header-anchor" href="#确认面板" aria-label="Permalink to &quot;确认面板&quot;">​</a></h2><p>启用确认面板，则需开启 <code>need-confirm = true</code> 即可</p>`);
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
  _push(`<h2 id="值的转化" tabindex="-1">值的转化 <a class="header-anchor" href="#值的转化" aria-label="Permalink to &quot;值的转化&quot;">​</a></h2><p>使用 <code>value-format</code>，传入一个函数，则可以对 <code>modelValue</code> 转化</p><p>请注意，仍然不建议使用 <code>value-format</code>，自 2.3.0 开始，<code>h-option.value</code> 已支持 <code>object</code> 类型</p><p>此方法会在 <code>3.x</code> 剔除</p>`);
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
  _push(`<h2 id="自定义-option" tabindex="-1">自定义 Option <a class="header-anchor" href="#自定义-option" aria-label="Permalink to &quot;自定义 Option&quot;">​</a></h2><p>通过 <code>option.default</code> 插槽，可以自定义展示形式</p><p>也可以对插槽 <code>select.optionRender</code> 设置，用来统一设置 <code>option</code> 的展示形式</p><p>另外，可以传入 <code>select.external-panel-style</code>，用来自定义面板的 <code>style</code></p>`);
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
  _push(`<h2 id="选项超长" tabindex="-1">选项超长 <a class="header-anchor" href="#选项超长" aria-label="Permalink to &quot;选项超长&quot;">​</a></h2><p>如果选项超长，会自动溢出</p><p><code>select.max-tag-width</code> 被移除，由 <code>tag</code> 的规范约束</p>`);
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
  _push(`<h2 id="远程搜索" tabindex="-1">远程搜索 <a class="header-anchor" href="#远程搜索" aria-label="Permalink to &quot;远程搜索&quot;">​</a></h2><p>设置 <code>show-search</code> 开启远程搜索</p><p>监听 <code>search</code> 事件用来控制搜索结果展示的时机</p><p>或者通过给 <code>search-method</code> 传入异步方法，可以控制</p><p>如果希望在没有任何结果时也显示面板，则设置 <code>hide-panel-when-show-search-and-empty-list = false</code> 即可</p>`);
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
  _push(`<h2 id="允许创建" tabindex="-1">允许创建 <a class="header-anchor" href="#允许创建" aria-label="Permalink to &quot;允许创建&quot;">​</a></h2><p>设置 <code>allow-create</code> 允许创建 <code>option</code></p><p>并借助 <code>before-create</code> 回调，来判断是否允许创建 <code>option</code></p>`);
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
  _push(`<h2 id="触底加载" tabindex="-1">触底加载 <a class="header-anchor" href="#触底加载" aria-label="Permalink to &quot;触底加载&quot;">​</a></h2><p>可以通过监听 <code>optionListReachBottom</code> 事件来获取是否滚动到了底部，然后触发更新加载</p><p>切换 <code>loading</code> 的状态可以改变弹出面板的加载状态</p>`);
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
  _push(`<h2 id="自定义选择标签" tabindex="-1">自定义选择标签 <a class="header-anchor" href="#自定义选择标签" aria-label="Permalink to &quot;自定义选择标签&quot;">​</a></h2><p>通过 <code>select.tagRender</code> 插槽可以自定义选择后的选项在输入框中的渲染表现</p><p>使用 <code>option.label</code> 插槽，可以自定义 <code>h-option</code> 中文本的展示形式</p>`);
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
  _push(`<h2 id="已选择的选项置顶" tabindex="-1">已选择的选项置顶 <a class="header-anchor" href="#已选择的选项置顶" aria-label="Permalink to &quot;已选择的选项置顶&quot;">​</a></h2><p>可以通过设置 <code>selectedOptionOrderToTop = true</code>，开启已选择的选项向顶部排列</p><p>只有在关闭面板后，才会进行排列，正处于选择的时候不会改变排序</p><p>如果是分组的情况，则会在组内靠前排，不会将整个组往前排</p>`);
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
  _push(`<h2 id="宽度适配" tabindex="-1">宽度适配 <a class="header-anchor" href="#宽度适配" aria-label="Permalink to &quot;宽度适配&quot;">​</a></h2><p>默认情况下，下拉面板的宽度会与 <code>select</code> 宽度保持一致。</p><p>在特殊情况下，<code>select</code> 宽度可能非常小，需要下拉面板的宽度不受限制，则可以设置 <code>fit-input-width = false</code> 即可</p><p>但需要注意的是，此时下拉面板的宽度不再有最大宽度限制，因此会被超长的子元素把面板宽度撑开</p><p>另外触发器本身有最小宽度 <code>144px</code>，如果需要变更则需要修改样式</p>`);
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
  _push(`<h2 id="初始化值" tabindex="-1">初始化值 <a class="header-anchor" href="#初始化值" aria-label="Permalink to &quot;初始化值&quot;">​</a></h2><p>默认情况下，在清空值后，<code>update:modelValue</code> 会默认给予 <code>undefined</code></p><p>但你也可以通过 <code>initialValue</code> 来控制清空值后的默认值</p><p>比如可以指定 <code>null</code> <code>[]</code> 等数据</p><p><strong>需要注意的是，空字符串也会被认为是非空值</strong></p>`);
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
  _push(`<h2 id="事件展示" tabindex="-1">事件展示 <a class="header-anchor" href="#事件展示" aria-label="Permalink to &quot;事件展示&quot;">​</a></h2><p>此示例展示了所有的事件抛出，可以在控制台查看打印的事件</p>`);
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
  _push(`<h2 id="自定义空样式" tabindex="-1">自定义空样式 <a class="header-anchor" href="#自定义空样式" aria-label="Permalink to &quot;自定义空样式&quot;">​</a></h2><p>可以使用 <code>empty-text</code> 控制在列表为空时展示的文字</p><p>也可以通过插槽 <code>slots.empty</code> 来控制空时展示的内容</p>`);
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
  _push(`<h2 id="虚拟滚动" tabindex="-1">虚拟滚动 <a class="header-anchor" href="#虚拟滚动" aria-label="Permalink to &quot;虚拟滚动&quot;">​</a></h2><p>启用虚拟滚动需要配置 <code>options</code> 字段</p><p>一旦设置了此值，即将忽略 <code>default</code> 插槽的内容，并且无法自定义 <code>option</code> 的展示（即所有有关 <code>option</code> 的插槽都无法使用）</p><p>此示例创建了 5000 个元素</p><p><strong>因虚拟滚动组件的特殊性，可能会在过滤、搜索的情况下某项留白不可见，需要手动上下滚动一下即可恢复</strong></p>`);
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
  _push(`<h2 id="select-api" class="no-underline h2"><a href="#select-api" class="!no-underline">Select Api</a></h2><h3 id="select-props" class="no-underline h3"><a href="#select-props" class="!no-underline">Select Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>value 值</td><td><code>ModelValueType</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>是否可清空输入框</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>触发方式</td><td><code>&#39;hover&#39; | &#39;click&#39; | &#39;never&#39;</code></td><td class="text-center">否</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>放置位置</td><td><code>| &#39;auto&#39;<br>      | &#39;auto-start&#39;<br>      | &#39;auto-end&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;<br>      | &#39;left&#39;</code></td><td class="text-center">否</td><td>&#39;bottom-start&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>是否发送到 body 节点</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">select-style`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "inputStyle" }, null, _parent));
  _push(`</td><td>选择器输入框样式<br><code>normal</code>: 基础样式<br><code>emphasize</code>: 面性样式<br><code>no-border</code>: 无边框样式<br><code>noborder</code>: 请改用 <code>no-border</code></td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;no-border&#39; | &#39;noborder&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-style</td><td>选择器输入框样式<br><code>normal</code>: 基础样式<br><code>emphasize</code>: 面性样式<br><code>no-border</code>: 无边框样式</td><td><code>PickerInputStyleType</code></td><td class="text-center">否</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value-format</td><td>选中 <code>modelValue</code> 的格式化处理方法</td><td><code>(<br>        propsAndAttrs: Partial&lt;OptionProps&gt; &amp; Record&lt;string, unknown&gt;,<br>      ) =&gt; ModelValueFormattedType &amp; Record&lt;string, unknown&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>占位符，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">need-dropdown-confirm`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "needConfirm" }, null, _parent));
  _push(`</td><td>是否需要确认</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">need-confirm</td><td>是否需要确认</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-confirm-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmBtnText" }, null, _parent));
  _push(`</td><td>确认按钮文本，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmButtonText" }, null, _parent));
  _push(`</td><td>确认按钮文本，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-button-text</td><td>确认按钮文本，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-cancel-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmBtnText" }, null, _parent));
  _push(`</td><td>取消按钮文本，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "cancelButtonText" }, null, _parent));
  _push(`</td><td>取消按钮文本，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button-text</td><td>取消按钮文本，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-empty-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "emptyText" }, null, _parent));
  _push(`</td><td>空时显示文字，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-text</td><td>空时显示文字，默认使用国际化配置</td><td><code>string | VNode</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">destroy-on-hide</td><td>在隐藏后是否销毁面板</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-options</td><td>给 popover 的额外参数</td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-input-width</td><td>下拉框宽度是否与输入框相同</td><td><code>boolean | &#39;fit-content&#39;</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-show-delay</td><td>鼠标悬浮后多久显示 <code>popper</code><br>仅在 <code>trigger = hover</code> 时有效</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-hide-delay</td><td>鼠标移出后后多久隐藏 <code>popper</code><br>仅在 <code>trigger = hover</code> 时有效</td><td><code>number</code></td><td class="text-center">否</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple</td><td>是否多选</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple-limit</td><td>多选限制个数</td><td><code>number</code></td><td class="text-center">否</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filterable</td><td>是否可以筛选</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-method</td><td>筛选过滤方法</td><td><code>HSelectFilterFunction</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description-filterable</td><td>默认过滤方法中，是否同时对 <code>option.description</code> 也过滤判断<br>如果 <code>option.description</code> 是 vNode，此设置无效</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-option`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "filterable / filterMethod" }, null, _parent));
  _push(`</td><td>筛选过滤设置<br>false: 不启用过滤<br>true: 使用默认过滤方法: option.label.toLowerCase() === input.toLowerCase()<br>函数: input 是输入内容，option 标识每一项的参数（构成为 props &amp; attrs)</td><td><code>boolean | HSelectFilterFunction</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-filter-option</td><td>在下拉面板中启用过滤，实现需要自己定义<br>**请不要与 <code>filterOption</code> <code>filterable</code> 同时使用，否则会出现问题**<br>true: 使用默认过滤方法: option.label.toLowerCase() === input.toLowerCase()<br>函数: input 是输入内容，option 标识每一项的参数（构成为 props &amp; attrs)</td><td><code>boolean | HSelectFilterFunction</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-filter-input-value</td><td>下拉面板中用来过滤的输入的文字</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-build-in-panel-filter</td><td>是否启用内置的面板过滤组件</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-input-placeholder</td><td>面板输入框的占位文字<br>默认使用国际化的 &quot;请搜索&quot;</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">allow-create</td><td>是否允许创建新条目<br>只有在 <code>filterable = true</code> 时才有效</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-create</td><td>在 <code>allowCreate</code> 开启后，是否允许创建新条目</td><td><code>(<br>        createValue: string,<br>        optionMap: Map&lt;OptionProps[&#39;value&#39;], OptionProps&gt;,<br>      ) =&gt; Awaitable&lt;boolean | void&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "collapse-tags" }, null, _parent));
  _push(`</td><td>多选模式下，是否折叠选中项</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags</td><td>多选模式下，是否折叠选中项</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags-tooltip</td><td>多选模式下，是否悬浮在 +N 上显示选择的内容</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-collapse-tags</td><td>多选模式下，自己控制显示的标签个数，超出这个个数将会被折叠</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags-fill-up</td><td>尽量让标签填满容器</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapsed-tags-props</td><td>折叠的标签的 props，可以自定义 <code>+N</code> 的 <code>tag</code> 的样式</td><td><code>Partial&lt;TagProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-selected-icon</td><td>是否显示选中标识</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-icon</td><td>选中标识的图标</td><td><code>iconPropType</code></td><td class="text-center">否</td><td>() =&gt; IconCheck</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-check-all</td><td>是否启用全选功能</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-check-all-summary</td><td>全选后是否只展示 “所有” 的标签</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-all-summary-text</td><td>可以自定义在全选后展示的标签文字<br>默认使用国际化</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-check-all-count</td><td>是否在全选时，统计选择的数量</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-all-count-consider-filter</td><td>全选统计考虑过滤后的数量</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-visible</td><td>是否显示已选择的选项<br>设置为 <code>false</code> 时，会自动隐藏已选择的选项</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">custom-select-icon`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "dropdownIcon" }, null, _parent));
  _push(`</td><td>自定义下拉按钮<br>可以传入 <code>a-icon</code> 的 <code>name</code>，也可以直接是 <code>svg</code><br>如果传入 <code>false</code>，即不展示图标</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-icon</td><td>自定义下拉按钮<br>可以传入 <code>a-icon</code> 的 <code>name</code>，也可以直接是 <code>svg</code><br>如果传入 <code>false</code>，即不展示图标</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-select-style</td><td>自定义 Select 样式</td><td><code>StyleValue</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-select-class</td><td>自定义 Select class</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-option-style`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "externalPanelStyle" }, null, _parent));
  _push(`</td><td>自定义 Option 面板样式</td><td><code>StyleValue</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-option-class`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "externalPanelClass" }, null, _parent));
  _push(`</td><td>自定义 Option 面板 class</td><td><code>string</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-panel-style</td><td>自定义面板样式</td><td><code>CSSProperties</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-panel-class</td><td>自定义面板 class</td><td><code>string</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-search</td><td>是否启用远程搜索</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-panel-when-show-search-and-empty-list</td><td>是否在远程搜索+无选项时，默认隐藏面板</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-list-loading`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "loading" }, null, _parent));
  _push(`</td><td>是否处于加载中</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading</td><td>是否处于加载中</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-loading-text</td><td>加载时自定义文案，默认为空</td><td><code>string | VNode</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-max-lines</td><td>选项的文本超出最大展示行数</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-option-order-to-top</td><td>是否将已选择的选项置顶<br>只有在重新打开面板时才会排序</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-value-un-match</td><td>如果没有匹配到 <code>label</code> 是否直接展示 <code>value</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-status</td><td>输入框的状态</td><td><code>PickerInputStatusType</code></td><td class="text-center">否</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-class-name`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "externalPanelClass" }, null, _parent));
  _push(`</td><td>弹出层 <code>class</code></td><td><code>string</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">initial-value</td><td>默认值，可以在 <code>modelValue</code> 为空时，自动赋值一个指定值<br>如果希望设置为 <code>undefined</code>，则需要传递一个 <code>Symbol.for(&#39;undefined&#39;)</code>，否则仍会使用默认值</td><td><code>object | string | number | Array&lt;any&gt; | boolean | null | symbol</code></td><td class="text-center">否</td><td>HSelectInitialValueUndefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-statistic</td><td>是否使用多选统计</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">statistic-text</td><td>多选统计的前置文字<br>默认使用国际化（选项）</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">statistic-show-tooltip</td><td>多选统计是否在悬浮时显示已选项</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-list-max-height</td><td>选项列表最大高度</td><td><code>string | number</code></td><td class="text-center">否</td><td>296</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">compatibility</td><td>是否向下兼容 <code>2.1.0</code> 之前版本的 <code>break-change</code><br>目前涉及到的有：<br>- 多选情况下，取消选择某 <code>option</code> 也会触发 <code>change</code> 事件<br>- <code>change</code> 事件的第二个参数会与当前 <code>modelValue</code> 一致，不再只是返回当前变更的 <code>option.value</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description-position</td><td><code>h-option</code> 中 <code>description</code> 的位置</td><td><code>&#39;right&#39; | &#39;bottom&#39;</code></td><td class="text-center">否</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td>选项集合<br>虚拟滚动时，会忽略 <code>slots.default</code> 插槽的内容，并且对于自定义 <code>option</code> 的所有插槽都将不予使用，只会按照 <code>label</code> <code>description</code> 渲染<br>虚拟滚动是 <code>beta</code> 版，有时会遇到某些元素无法载入而留空的问题<br><code>description-position</code> 无法特殊指定，只能直接在 <code>h-select</code> 上设置</td><td><code>Array&lt;PartialRequired&lt;Omit&lt;OptionProps, &#39;maxLines&#39; | &#39;descriptionPosition&#39;&gt;, &#39;value&#39;&gt;&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-virtual-scroll</td><td>只有在传入 <code>options</code> 后，才会默认启用虚拟滚动<br>如果不希望使用虚拟滚动，则传入 <code>false</code> 即可</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-emit-frequency</td><td>输入触发事件的频率<br>请谨慎设置，防止触发过快或过慢导致非预期的问题</td><td><code>number</code></td><td class="text-center">否</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">search-icon</td><td>搜索 <code>icon</code><br>如果不需要搜索 <code>icon</code>，则设置为 <code>false</code></td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">否</td><td>() =&gt; IconSearch</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reserve-keyword</td><td>在允许过滤、远程搜索，且是多选时，在勾选选项后是否保留输入的文字<br><code>true</code>: 正选反选都保留<br><code>false</code>: 正选反选都不保留<br><code>&#39;reserve-deselect&#39;</code>: 仅在反选时保留<br><code>&#39;reserve-special&#39;</code>: 不保留关键字，但对过滤的内容仍然保留，只有用户手动清空输入文字或失焦输入框后，才会改变过滤内容</td><td><code>boolean | &#39;reserve-deselect&#39; | &#39;reserve-special&#39;</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-show-after</td><td>所有有 <code>tooltip</code> 的地方，在悬浮后延迟多少毫秒显示 <code>tooltip</code></td><td><code>number</code></td><td class="text-center">否</td><td>100</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-hide-after</td><td>所有有 <code>tooltip</code> 的地方，在显示后延迟多少毫秒移除 <code>tooltip</code></td><td><code>number</code></td><td class="text-center">否</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-content-input-min-width</td><td>设置自适应文字长度的 <code>input</code> 的最小宽度</td><td><code>string | number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-panel-by-children</td><td>是否在开启虚拟滚动时，允许 <code>option</code> 撑开面板</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-popover-content-only</td><td>是否仅展示弹窗内容</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-tags-in-panel</td><td>是否在面板中展示已选标签</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3 id="select-emits" class="no-underline h3"><a href="#select-emits" class="!no-underline">Select Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-visible-change</td><td rowspan="1">下拉面板显隐切换时通知</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>是否显示</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">聚焦时通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">input</td><td rowspan="1">输入文字时触发</td><td rowspan="1">( inputValue: <code>string | null | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputValue</td><td><code>string | null | undefined</code></td><td>输入的文字</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">search</td><td rowspan="1">搜索输入框改变时通知</td><td rowspan="1">( searchValue: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">searchValue</td><td><code>string</code></td><td>搜索的文字</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-list-reach-bottom</td><td rowspan="2">在 <code>option</code> 列表滚动到底部时触发，可以做动态载入 <code>option</code> 的回调</td><td rowspan="2">( evt: <code>Event</code>, keyword: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event</code></td><td>滚动事件或者键盘事件，如果为 undefined，则是虚拟滚动抛出的事件</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">keyword</td><td><code>string</code></td><td>搜索字符串</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="2">选中 option 或者 input 输入框内容发生变化时触发</td><td rowspan="2">( inputValue: <code>string | null | undefined | ModelValueType</code>, optionOrModelValue: <code>ModelValueType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputValue</td><td><code>string | null | undefined | ModelValueType</code></td><td>输入框内容发生变化的值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">optionOrModelValue</td><td><code>ModelValueType</code></td><td>是被选中的 <code>option</code> 的 <code>value</code>，或 <code>modelValue</code> 值，<code>change</code> 触发时机较 <code>update:modelValue</code> 晚，所以可以在 <code>change</code> 方法中获取的是更新之后的 <code>modelValue</code></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">清空时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">deselect</td><td rowspan="1">多选模式下，选中取消项时触发</td><td rowspan="1">( value: <code>OptionProps[&#39;value&#39;]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>OptionProps[&#39;value&#39;]</code></td><td>取消 <code>option</code> 的 <code>value</code></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击时触发</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标点击事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm</td><td rowspan="1">确认时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel</td><td rowspan="1">取消时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3 id="select-exposes" class="no-underline h3"><a href="#select-exposes" class="!no-underline">Select Exposes</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirmHandle</td><td rowspan="1">手动处理确认操作，只有在 <code>need-confirm = true</code> 时有效</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelHandle</td><td rowspan="1">手动处理取消操作，只有在 <code>need-confirm = true</code> 时有效</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setInputAble</td><td rowspan="1">设置 select 为输入状态</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">changePanelVisible</td><td rowspan="1">控制面板是否展示</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focusOption</td><td rowspan="1">聚焦在某个选项上</td><td rowspan="1">( optionValue: <code>OptionProps[&#39;value&#39;]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">optionValue</td><td><code>OptionProps[&#39;value&#39;]</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">清空</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">renderedModelValueTags</td><td rowspan="1">已选标签列表</td><td rowspan="1"><code>Array&lt;VNode | JSX.Element&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">聚焦</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2 id="option-api" class="no-underline h2"><a href="#option-api" class="!no-underline">Option Api</a></h2><h3 id="option-props" class="no-underline h3"><a href="#option-props" class="!no-underline">Option Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td>选项的值</td><td><code>string | number | boolean | object | symbol</code></td><td class="text-center">是</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>选项的展示内容</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description</td><td>辅助说明文字或 VNode 节点</td><td><code>string | VNode</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-lines</td><td>文本超出最大展示行数</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description-position</td><td><code>h-option</code> 中 <code>description</code> 的位置</td><td><code>&#39;right&#39; | &#39;bottom&#39;</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3 id="option-emits" class="no-underline h3"><a href="#option-emits" class="!no-underline">Option Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="3">option 被点击时触发</td><td rowspan="3">( value: <code>OptionProps[&#39;value&#39;]</code>, ext: <code>any</code>, evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>OptionProps[&#39;value&#39;]</code></td><td>option 传入的value</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">ext</td><td><code>any</code></td><td>被被点击 option 上的 { ...attrs, ...props }</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标点击事件</td></tr></tbody></table><h2 id="optiongroup-api" class="no-underline h2"><a href="#optiongroup-api" class="!no-underline">OptionGroup Api</a></h2><h3 id="optiongroup-props" class="no-underline h3"><a href="#optiongroup-props" class="!no-underline">OptionGroup Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>分组名称<br>如果不设置此项，则采用分割线进行分组</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>禁用分组中所有选项</td><td><code>boolean</code></td><td class="text-center">否</td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Select.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Select = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Select as default
};
