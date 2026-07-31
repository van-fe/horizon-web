import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Cascader.md","filePath":"zh/demos/components/Cascader.md"}');
const _sfc_main = { name: "demos/components/Cascader.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Cascader</h1><p class="description">当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><p>与其他选择器组件一致，都会有 <code>normal</code> <code>emphasize</code> <code>no-border</code> 样式</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-width="fit-content">
    <h-form-item label="size">
      <h-radio-group v-model="sizeValue">
        <h-radio value="large" label="large" />
        <h-radio value="medium" label="medium" />
        <h-radio value="small" label="small" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="input style">
      <h-radio-group v-model="inputStyle">
        <h-radio value="normal" label="normal" />
        <h-radio value="emphasize" label="emphasize" />
        <h-radio value="no-border" label="no-border" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="check-strictly">
      <h-radio-group v-model="checkStrictly">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-cascader
        ref="cascaderDomRef1"
        v-model="currentVal1"
        :clearable="true"
        :size="sizeValue"
        :to-body="false"
        :input-style="inputStyle"
        :check-strictly="checkStrictly"
        :options="baseData"
        :disabled="disabled"
        @update:modelValue="updateHandle"
        @input="inputHandle"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-cascader
        ref="cascaderDomRef2"
        v-model="currentVal2"
        :clearable="true"
        :size="sizeValue"
        :input-style="inputStyle"
        :check-strictly="checkStrictly"
        :options="baseData"
        :multiple="true"
        :to-body="false"
        :disabled="disabled"
        @update:modelValue="updateHandle"
        @input="inputHandle"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, onMounted, ref } from 'vue';
import { CascaderExposes, HCascader, useCascaderProps } from '@aurora/horizon-web';
import type { HCascaderExtendOption, HCascaderModelValueType } from '@aurora/horizon-web';
import { HorizonWebComponentInstance } from '@aurora/utils';

const cascaderDomRef1 = ref<HorizonWebComponentInstance<typeof HCascader, CascaderExposes>>();
const cascaderDomRef2 = ref<HorizonWebComponentInstance<typeof HCascader, CascaderExposes>>();

const currentVal1 = ref<string[]>(["guide", "navigation", "side nav"]);
const currentVal2 = ref<string[][]>([]);
const baseData = ref([]);

const sizeValue = ref<Required<ExtractPropTypes<typeof useCascaderProps>['size']>>('medium');
const inputStyle = ref<Required<ExtractPropTypes<typeof useCascaderProps>['inputStyle']>>('normal');
const disabled = ref(false);
const checkStrictly = ref(false);

const changeHandle = (value: HCascaderModelValueType, option: HCascaderExtendOption) => {
  console.info('change: ', value, option);
};

const inputHandle = (value: string) => {
  console.info('input: ', value);
};

const updateHandle = (value: HCascaderModelValueType) => {
  console.info('update: ', value);
};

function onFocus() {
  console.info('focus');
}

function onBlur() {
  console.info('blur');
}

onMounted(async()=>{
  baseData.value = await fetch(new URL('/cascader-options.json', import.meta.url).href).then(r => r.json());
  currentVal2.value.push(["guide", "navigation", "side nav"]);

  console.info(cascaderDomRef1.value, cascaderDomRef2.value);
});
<\/script>
`,
    path: "demos/components/Cascader/basic.vue"
  }, null, _parent));
  _push(`<h2 id="单选" tabindex="-1">单选 <a class="header-anchor" href="#单选" aria-label="Permalink to &quot;单选&quot;">​</a></h2><p>单选模式下，可以配置 <code>show-radio</code> 是否在节点中显示 <code>radio</code></p><p>在显示 <code>radio</code> 的时候，只允许点击非叶子节点的 <code>radio</code> 才可以选中当前节点</p><p>与 <code>check-strictly</code> 配合，会有不同的显示逻辑</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form :inline="true" label-position="top">
    <h-form-item label="可选任意节点">
      <h-switch v-model="checkStrictly" status />
    </h-form-item>
  </h-form>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">无Radio（默认）</div>
      <h-cascader
        v-model="currentVal1"
        :show-radio="false"
        :check-strictly="checkStrictly"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        @change="handleChange"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">有Radio</div>
      <h-cascader
        v-model="currentVal2"
        :show-radio="true"
        :check-strictly="checkStrictly"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        @change="handleChange"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { HCascaderExtendOption } from '@aurora/horizon-web';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[]>([]);
const baseData = ref([]);
const checkStrictly = ref(true);

function handleChange(selectOrDeselect?: boolean | undefined, option?: HCascaderExtendOption | undefined) {
  console.info(selectOrDeselect, option);
}

onMounted(async()=>{
  baseData.value = await fetch(new URL('/cascader-tree-data.json', import.meta.url).href).then(r => r.json());
});
<\/script>
`,
    path: "demos/components/Cascader/single.vue"
  }, null, _parent));
  _push(`<h2 id="多选" tabindex="-1">多选 <a class="header-anchor" href="#多选" aria-label="Permalink to &quot;多选&quot;">​</a></h2><p>与 <code>select</code> 一样，多选的标签使用了 <code>h-tag</code> 和 <code>h-tag-group</code> 组件结合</p><p>默认情况下，不会折叠选中项。可以配置 <code>collapse-tags = true</code> 折叠已选项</p><p>另外可以配置 <code>collapse-tags-tooltip = true</code>，可以在悬浮在 <code>+N</code> 上时显示其他已选项，并可以快捷反选已选项</p><p>另外，如果你的 <code>select</code> 空间很小，可能会此被挤压到只有 <code>+N</code> ，则可以配置 <code>max-collapse-tags</code>，强制展示多少个已选项，其余已选项则会折叠起来</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">普通多选</div>
      <h-cascader v-model="currentVal1" :options="options" :multiple="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">折叠多选</div>
      <h-cascader v-model="currentVal2" :options="options" :multiple="true" :collapse-tags="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">+N 显示其余已选项</div>
      <h-cascader v-model="currentVal3" :options="options" :multiple="true" :collapse-tags="true" :collapse-tags-tooltip="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">强制显示3个已选项，其余折叠</div>
      <h-cascader v-model="currentVal4" :options="options" :multiple="true" :collapse-tags="true" :collapse-tags-tooltip="true" :max-collapse-tags="3" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentVal1 = ref<string[][]>([[ "guide", "navigation", "side nav"], [ "guide", "navigation", "top nav"], [ "guide", "disciplines", "consistency"], [ "guide", "disciplines", "feedback"]]);
const currentVal2 = ref<string[][]>([[ "guide", "navigation", "side nav"], [ "guide", "navigation", "top nav"], [ "guide", "disciplines", "consistency"], [ "guide", "disciplines", "feedback"]]);
const currentVal3 = ref<string[][]>([[ "guide", "navigation", "side nav"], [ "guide", "navigation", "top nav"], [ "guide", "disciplines", "consistency"], [ "guide", "disciplines", "feedback"]]);
const currentVal4 = ref<string[][]>([[ "guide", "navigation", "side nav"], [ "guide", "navigation", "top nav"], [ "guide", "disciplines", "consistency"], [ "guide", "disciplines", "feedback"]]);

const options = ref([]);

fetch(
  new URL('/cascader-options.json', import.meta.url).href,
).then(res => {
  res.json().then(value => {
    options.value = value;
  });
});
<\/script>
`,
    path: "demos/components/Cascader/multiple.vue"
  }, null, _parent));
  _push(`<h2 id="全选" tabindex="-1">全选 <a class="header-anchor" href="#全选" aria-label="Permalink to &quot;全选&quot;">​</a></h2><p>支持配置 <code>use-check-all-summary</code>，可以在所有选项都选中时标记为 <code>全部</code> (会有国际化处理)</p><p>如果希望自定义 <code>全部</code> 的文字，可以配置 <code>check-all-summary-text</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">全选后标记为“全部”</div>
      <h-cascader v-model="values1" :multiple="true" :use-check-all-summary="true" :to-body="false" :collapse-tags="true" :options="baseData" />
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">全选后自定义标记为“全部选择”</div>
      <h-cascader v-model="values2" :multiple="true" :use-check-all-summary="true" check-all-summary-text="全部选择" :to-body="false" :collapse-tags="true" :options="baseData" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const values1 = ref([]);
const values2 = ref([]);
const baseData = ref([]);

onMounted(async()=>{
  baseData.value = await fetch(new URL('/cascader-options.json', import.meta.url).href).then(r => r.json());
});
<\/script>

`,
    path: "demos/components/Cascader/check-all-summary.vue"
  }, null, _parent));
  _push(`<h2 id="父子节点点选严格模式" tabindex="-1">父子节点点选严格模式 <a class="header-anchor" href="#父子节点点选严格模式" aria-label="Permalink to &quot;父子节点点选严格模式&quot;">​</a></h2><p>可以通过设置 <code>check-strictly</code> 来控制是否父子节点是否严格控制</p><p>如果设置为 <code>true</code>，则可以点选任意非 <code>disabled</code> 状态的节点</p><p>如果设置为 <code>false</code>，则不可展开 <code>disabled</code> 的节点，并且也无法选择其下属节点</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form :inline="true" label-position="top">
    <h-form-item label="可选任意节点">
      <h-switch v-model="checkStrictly" status />
    </h-form-item>
  </h-form>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-cascader
        v-model="currentVal1"
        :check-strictly="checkStrictly"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        @input="changeHandle"
        @change="changeHandle"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-cascader
        v-model="currentVal2"
        :check-strictly="checkStrictly"
        :clearable="true"
        :options="baseData"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);
const baseData = ref([]);
const checkStrictly = ref(true);

const changeHandle = (value: any) => {
  console.info(value);
};
onMounted(async()=>{
  baseData.value = await fetch(new URL('/cascader-tree-data.json', import.meta.url).href).then(r => r.json());
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Cascader/check-strictly.vue"
  }, null, _parent));
  _push(`<h2 id="父子节点展开控制" tabindex="-1">父子节点展开控制 <a class="header-anchor" href="#父子节点展开控制" aria-label="Permalink to &quot;父子节点展开控制&quot;">​</a></h2><p>在配置了 <code>check-strictly = true</code> 后，展开的逻辑也会根据 <code>expand-strictly</code> 控制</p><p>如果设置为 <code>true</code>，则在点击 单选、多选 框时，不会展开子节点</p><p>如果设置为 <code>false</code>，点击 单选、多选 框时，会展开子节点</p><p>需要注意的是，对于单选，则需要开启 <code>show-radio</code> 才有效，否则无论如何都会展开子节点</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form :inline="true" label-position="top">
    <h-form-item label="勾选父级是否不展开子集">
      <h-switch v-model="expandStrictly" status />
    </h-form-item>
  </h-form>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-cascader
        v-model="currentVal1"
        :check-strictly="true"
        :expand-strictly="expandStrictly"
        :clearable="true"
        :to-body="false"
        :show-radio="true"
        :options="baseData"
        @input="changeHandle"
        @change="changeHandle"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-cascader
        v-model="currentVal2"
        :check-strictly="true"
        :expand-strictly="expandStrictly"
        :clearable="true"
        :options="baseData"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);
const baseData = ref([]);
const expandStrictly = ref(true);

const changeHandle = (value: any) => {
  console.info(value);
};
onMounted(async()=>{
  baseData.value = await fetch(new URL('/cascader-tree-data.json', import.meta.url).href).then(r => r.json());
});
<\/script>
`,
    path: "demos/components/Cascader/expand-strictly.vue"
  }, null, _parent));
  _push(`<h2 id="选项统计" tabindex="-1">选项统计 <a class="header-anchor" href="#选项统计" aria-label="Permalink to &quot;选项统计&quot;">​</a></h2><p>传入 <code>use-statistic = true</code>，即可对多选项进行统计</p><p>可以设置 <code>statistic-text</code> 来指定统计文字</p>`);
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
  </h-form>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">默认国际化配置</div>
      <h-cascader
        v-model="currentVal1"
        :clearable="true"
        :to-body="false"
        :input-style="inputStyle"
        :options="baseData"
        :use-statistic="true"
        :multiple="true"
        :size="size"
      />
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">自定义为”组件“</div>
      <h-cascader
        v-model="currentVal2"
        :clearable="true"
        :to-body="false"
        :input-style="inputStyle"
        :options="baseData"
        :use-statistic="true"
        statistic-text="组件"
        :multiple="true"
        :size="size"
      />
    </h-col>
  </h-row>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const size = ref('medium');
const inputStyle = ref('normal');
const baseData = ref([]);

const currentVal1 = ref<string[][]>([]);
const currentVal2 = ref<string[][]>([]);

onMounted(async()=>{
  baseData.value = await fetch(new URL('/cascader-tree-data.json', import.meta.url).href).then(r => r.json());
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Cascader/statistic.vue"
  }, null, _parent));
  _push(`<h2 id="节点展示策略" tabindex="-1">节点展示策略 <a class="header-anchor" href="#节点展示策略" aria-label="Permalink to &quot;节点展示策略&quot;">​</a></h2><p>可以选择展示完整路径还是展示叶子节点，默认展示完整路径</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        单选
      </div>
      <h-cascader
          v-model="currentVal1"
          :options="options"
          show-checked-strategy="leaf"
          :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        多选
      </div>
      <h-cascader
          v-model="currentVal2"
          :options="options"
          show-checked-strategy="leaf"
          multiple
          clearable
          :to-body="false"
      ></h-cascader>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);
    const currentVal2 = ref<string[][]>([]);

    const options = ref([]);
    fetch(
      new URL('/cascader-options.json', import.meta.url).href,
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    return {
      currentVal1,
      currentVal2,
      options,
    };
  },
});
<\/script>
`,
    path: "demos/components/Cascader/display-way.vue"
  }, null, _parent));
  _push(`<h2 id="面板展开方式" tabindex="-1">面板展开方式 <a class="header-anchor" href="#面板展开方式" aria-label="Permalink to &quot;面板展开方式&quot;">​</a></h2><p>设置 <code>trigger = &#39;hover&#39;</code> 即可在悬浮时打开面板</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-row :gutter="10">
      <h-col :span="6">
        <h-cascader
            v-model="currentVal1"
            :options="options"
            trigger="hover"
            expand-trigger="hover"
            :to-body="false"
        />
      </h-col>
    </h-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);

    const options = ref([]);
    fetch(
      new URL('/cascader-options.json', import.meta.url).href,
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    return {
      currentVal1,
      options,
    };
  },
});
<\/script>
`,
    path: "demos/components/Cascader/trigger-hover.vue"
  }, null, _parent));
  _push(`<h2 id="节点展开方式" tabindex="-1">节点展开方式 <a class="header-anchor" href="#节点展开方式" aria-label="Permalink to &quot;节点展开方式&quot;">​</a></h2><p>可以设置 <code>expand-trigger</code> 来修改展开方式</p><p>默认为 <code>click</code>，可以修改为 <code>hover</code> 悬浮节点展开子节点</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        点击
      </div>
      <h-cascader v-model="currentVal1" :options="options" expand-trigger="click" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        悬浮
      </div>
      <h-cascader v-model="currentVal2" :options="options" expand-trigger="hover" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);
    const currentVal2 = ref<string[]>([]);

    const options = ref([]);
    fetch(
      new URL('/cascader-options.json', import.meta.url).href,
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    return {
      currentVal1,
      currentVal2,
      options,
    };
  },
});
<\/script>
`,
    path: "demos/components/Cascader/panel-trigger.vue"
  }, null, _parent));
  _push(`<h2 id="确认选择" tabindex="-1">确认选择 <a class="header-anchor" href="#确认选择" aria-label="Permalink to &quot;确认选择&quot;">​</a></h2><p>配置 <code>need-confirm = true</code> ，开启勾选后二次确认能力</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-row :gutter="10">
      <h-col :span="6">
        <div class="demo-title">
          单选
        </div>
        <h-cascader
            v-model="currentVal1"
            placeholder="which component?"
            :clearable="true"
            :to-body="false"
            :options="options"
            :confirm="true"
            @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange"
        />
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          多选
        </div>
        <h-cascader
            v-model="currentVal2"
            :clearable="true"
            :options="options"
            :multiple="true"
            :confirm="true"
            :to-body="false"
            @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange"
        />
      </h-col>
    </h-row>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import type { HCascaderExtendOption, HCascaderModelValueType } from '@aurora/horizon-web';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);

const options = ref([]);
fetch(
  new URL('/cascader-options.json', import.meta.url).href,
).then(res => {
  res.json().then(value => {
    options.value = value;
  });
});

const onConfirm = (value: any) => {
  console.info('confirm: ', value);
};

const onCancel = (value: any) => {
  console.info('cancel: ', value);
};

const onChange = (value: HCascaderModelValueType, option: HCascaderExtendOption) => {
  console.info('change: ', value, option);
};
<\/script>
`,
    path: "demos/components/Cascader/confirm.vue"
  }, null, _parent));
  _push(`<h2 id="确认选择自定义内容" tabindex="-1">确认选择自定义内容 <a class="header-anchor" href="#确认选择自定义内容" aria-label="Permalink to &quot;确认选择自定义内容&quot;">​</a></h2><p>通过 <code>confirm-btn-text</code> <code>cancel-btn-text</code> 可以控制确认、取消按钮文字</p><p><code>confirmRender</code> 插槽也对外暴露了 <code>cancelHandle</code> <code>confirmHandle</code> 两个方法，用于自定义尾部时使用</p><p>另外也可以通过 <code>cascader</code> 实例对外暴露的 <code>exposeConfirm</code> 来执行确认和取消操作</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-row :gutter="10">
      <h-col :span="6">
        <div class="demo-title">
          自定义按钮文案
        </div>
        <h-cascader
          v-model="currentVal1"
          :options="options"
          :need-confirm="true"
          confirm-btn-text="确定"
          cancel-btn-text="取消"
          :to-body="false"
        />
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          自定义 confirm render
          <h-tooltip content="使用自定义 render 时请确保 confirm 参数不是 false 或者 undefined">
            <a-icon name="help" />
          </h-tooltip>
        </div>
        <h-cascader v-model="currentVal2" :options="options" :need-confirm="true" multiple :to-body="false">
          <template #confirmRender="slotProps">
            <div class="confirm-buttons">
              <span @click="slotProps.cancelHandle">取消</span>
              <span @click="slotProps.confirmHandle">确认</span>
            </div>
          </template>
        </h-cascader>
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          通过 template ref 去获取组件暴露出来的事件
        </div>
        <h-cascader ref="cascaderRef" v-model="currentVal3" :options="options" :need-confirm="true" multiple :to-body="false">
          <template #confirmRender>
            <div class="confirm-buttons">
              <span @click="confirmCancelHandle">取消</span>
              <span @click="confirmEnterHandle">确认</span>
            </div>
          </template>
        </h-cascader>
      </h-col>
    </h-row>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';

const cascaderRef = ref<any>(null);
const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);
const currentVal3 = ref<string[][]>([]);

const options = ref([]);
fetch(
  new URL('/cascader-options.json', import.meta.url).href,
).then(res => {
  res.json().then(value => {
    options.value = value;
  });
});

const confirmCancelHandle = () => {
  cascaderRef.value?.exposeConfirm.cancelHandle();
};

const confirmEnterHandle = () => {
  cascaderRef.value?.exposeConfirm.confirmHandle();
};
<\/script>

<style scoped>
.confirm-buttons {
    display: flex;
    height: 50px;
    line-height: 30px;
    justify-content: center;
    padding: 10px;
    border-top: 1px solid var(--h-divider-default);
}

.confirm-buttons > span {
    margin: 0 10px;
    cursor: pointer;
    font-weight: var(--h-weight-strong);
}

.confirm-buttons > span:first-of-type {
    color: var(--h-text-secondary)
}

.confirm-buttons > span:last-of-type {
    color: var(--h-text-brand-default)
}
</style>
`,
    path: "demos/components/Cascader/custom-confirm.vue"
  }, null, _parent));
  _push(`<h2 id="panel-分组" tabindex="-1">panel 分组 <a class="header-anchor" href="#panel-分组" aria-label="Permalink to &quot;panel 分组&quot;">​</a></h2><p>因 <code>cascader</code> 树结构的特殊性，如果要达到分组效果，只能在传入 <code>options</code> 时，设置一个只有 <code>groupLabel</code> 的节点来模拟分组</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <h-cascader v-model="currentVal1" :options="optionsWithGroup" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';

const currentVal1 = ref<(string | number)[]>([]);

const optionsWithGroup = [
  {
    groupLabel: 'components',
  },
  {
    value: 'navigation',
    label: 'Navigation',
    children: [
      {
        value: 'side navigation',
        label: 'Side Navigation',
      },
      {
        value: 'top navigation',
        label: 'Top Navigation',
      },
    ],
  },
  {
    groupLabel: () =>
      h(
        'div',
        {
          style: 'font-weight: 700;',
        },
        ['directives'],
      ),
  },
  {
    value: 'tooltip',
    label: 'Tooltip',
    children: [
      {
        value: 'visible tooltip',
        label: 'Visible Tooltip',
      },
      {
        value: 'hidden tooltip',
        label: 'Hidden Tooltip',
      },
    ],
  },
];
<\/script>
`,
    path: "demos/components/Cascader/panel-grouped.vue"
  }, null, _parent));
  _push(`<h2 id="动态加载" tabindex="-1">动态加载 <a class="header-anchor" href="#动态加载" aria-label="Permalink to &quot;动态加载&quot;">​</a></h2><p>需要注意的是，在使用动态加载的时候，需要使用 <code>v-model:options</code> 的方式传入 <code>options</code></p><p>因为这里需要双向同步 <code>options</code> 数据，另外需要给动态加载的 <code>option</code>指定为非叶子结点（即设置 <code>isLeaf</code> 为 <code>false</code>）</p><p><strong>特别注意：同层级下的 <code>value</code> 不得重复，否则组件在挂载子项时会出现异常</strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-row :gutter="10">
      <h-col :span="6">
        <div class="demo-title">单选</div>
        <h-cascader
            v-model="currentVal1"
            v-model:options="refDynOptions1"
            :dynamic-load="dynamicLoad"
            :to-body="false"
        />
      </h-col>
      <h-col :span="6">
        <div class="demo-title">多选</div>
        <h-cascader
            v-model="currentVal2"
            v-model:options="refDynOptions2"
            multiple
            :dynamic-load="dynamicLoad"
            :to-body="false"
        />
      </h-col>
    </h-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { HCascaderDynamicLoadNode } from '@aurora/horizon-web';

const dynOptions = [
  {
    value: 'disciplines',
    label: 'disciplines',
  },
  {
    value: 'navigation',
    label: 'Navigation',
    isLeaf: false,
  },
];

export default defineComponent({
  setup() {
    const refDynOptions1 = ref([...dynOptions]);
    const refDynOptions2 = ref(JSON.parse(JSON.stringify(dynOptions)));
    const currentVal1 = ref<string[]>([]);
    const currentVal2 = ref<string[][]>([]);

    const options = ref([]);
    fetch(
      new URL('/cascader-options.json', import.meta.url).href,
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    const dynamicLoad = (node: HCascaderDynamicLoadNode) => {
      console.info(node);
      return new Promise(resolve => {
        setTimeout(() => {
          const codePoint = 97 + node.level;

          resolve(new Array(5).fill(0).map((_, index) => (
            {
              label: \`\${node.options.at(0)?.label} - \${String.fromCodePoint(codePoint)}(\${index})\`,
              value: \`\${codePoint}(\${index})\`,
              isLeaf: codePoint > 100,
              children: [],
            }
          )));
        }, 2000);
      });
    };

    return {
      refDynOptions1,
      refDynOptions2,
      currentVal1,
      currentVal2,
      options,
      dynamicLoad,
    };
  },
});
<\/script>
`,
    path: "demos/components/Cascader/dynamic-load.vue"
  }, null, _parent));
  _push(`<h2 id="过滤" tabindex="-1">过滤 <a class="header-anchor" href="#过滤" aria-label="Permalink to &quot;过滤&quot;">​</a></h2><p>设置 <code>filterable</code> 即可开启过滤功能</p><p>需要注意的是，<code>check-strictly</code> 状态的不同会影响展示的 <code>option</code> 列表</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form :inline="true" label-position="top">
    <h-form-item label="可选任意节点">
      <h-switch v-model="checkStrictly" status />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-cascader
        v-model="currentVal1"
        :filterable="true"
        :check-strictly="checkStrictly"
        :options="options"
        :to-body="false"
        :clearable="true"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-cascader
        v-model="currentVal2"
        :filterable="true"
        :options="options"
        :check-strictly="checkStrictly"
        multiple
        clearable
        :to-body="false"
        :clearable="true"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        单选-下拉列表带筛选功能
        <h-tooltip content="内置 input">
          <a-icon name="question" />
        </h-tooltip>
      </div>
      <h-cascader
        v-model="currentVal3"
        :check-strictly="checkStrictly"
        :panel-filter-option="true"
        :use-build-in-panel-filter="true"
        :options="options"
        :to-body="false"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      >
        <template #optionEmptyRender>
          <div class="empty-city">没有找到对应的城市信息</div>
        </template>
      </h-cascader>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选-下拉列表带筛选功能</div>
      <h-cascader
        v-model="currentVal4"
        :multiple="true"
        :check-strictly="checkStrictly"
        :panel-filter-option="true"
        :panel-filter-input-value="panelFilterInputValue2"
        :options="options"
        :to-body="false"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      >
        <template #panelHeaderRender>
          <div class="panel-filter-box">
            <h-input v-model="panelFilterInputValue2" prefix-icon="search" placeholder="请搜索" />
          </div>
        </template>
        <template #optionEmptyRender>
          <div class="empty-city">没有找到对应的城市信息</div>
        </template>
      </h-cascader>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import type { HCascaderExtendOption } from '@aurora/horizon-web';
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([['component', 'basic', 'color']]);
const currentVal3 = ref<string[]>([]);
const currentVal4 = ref<string[][]>([]);
const checkStrictly = ref(true);
const panelFilterInputValue2 = ref('');
const changeHandle = (value: boolean, option: HCascaderExtendOption) => {
  console.info(value, option);
};

const options = ref([]);

function onFocus() {
  console.info('focus');
}

function onBlur() {
  console.info('blur');
}

onMounted(async()=>{
  options.value = await fetch(new URL('/cascader-tree-data.json', import.meta.url).href).then(r => r.json());
});
<\/script>

<style scoped>
.panel-filter-box {
  padding: 12px;
  border-bottom: 1px solid var(--h-divider-default);
}
</style>
`,
    path: "demos/components/Cascader/filterable.vue"
  }, null, _parent));
  _push(`<h2 id="过滤全选" tabindex="-1">过滤全选 <a class="header-anchor" href="#过滤全选" aria-label="Permalink to &quot;过滤全选&quot;">​</a></h2><p>支持传入 <code>use-filter-check-all = true</code>，在过滤时开启全选</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">普通过滤全选</div>
      <h-cascader v-model="values" :multiple="true" :filterable="true" :use-filter-check-all="true" :to-body="false" :collapse-tags="true" :options="baseData" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const values= ref([]);
const baseData = ref([]);

onMounted(async()=>{
  baseData.value = await fetch(new URL('/unselectable-options.json', import.meta.url).href).then(r => r.json());
});
<\/script>

`,
    path: "demos/components/Cascader/filter-check-all.vue"
  }, null, _parent));
  _push(`<h2 id="过滤配置" tabindex="-1">过滤配置 <a class="header-anchor" href="#过滤配置" aria-label="Permalink to &quot;过滤配置&quot;">​</a></h2><p>配置 <code>filter-method</code> 可以自定义过滤方法</p><p><code>filter-max-result</code> 可以控制展示结果的最大数量</p><p><code>filter-result-sort</code> 可以控制过滤后结果的排列函数</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-cascader
        v-model="currentVal1"
        :options="options"
        :filterable="true"
        :filter-method="filterFn"
        :filter-max-result="3"
        :filter-result-sort="sortFn"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-cascader
        v-model="currentVal2"
        :options="options"
        :filterable="true"
        :filter-method="filterFn"
        :filter-max-result="3"
        :filter-result-sort="sortFn"
        multiple
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import type { HCascaderExtendOption } from '@aurora/horizon-web';
import { ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);

const options = ref([]);
fetch(
  new URL('/cascader-options.json', import.meta.url).href,
).then(res => {
  res.json().then(value => {
    options.value = value;
  });
});

function sortFn(a: HCascaderExtendOption, b: HCascaderExtendOption) {
  return b.paths.at(-1).label.length - a.paths.at(-1).label.length;
}

function filterFn(
  inputValue: string,
  paths: { value: string | number; label: string; option: HCascaderExtendOption }[],
) {
  return paths.every(path => path.label.includes(inputValue));
}
<\/script>
`,
    path: "demos/components/Cascader/filterable-config.vue"
  }, null, _parent));
  _push(`<h2 id="过滤后自定义展示" tabindex="-1">过滤后自定义展示 <a class="header-anchor" href="#过滤后自定义展示" aria-label="Permalink to &quot;过滤后自定义展示&quot;">​</a></h2><p>通过 <code>searchPanelRender</code> 插槽，可以自定义过滤的内容</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-cascader v-model="currentVal1" :options="options" filter :to-body="false">
        <template #searchPanelRender="slotProps">
          🐂
          {{ slotProps.paths.map(path => path.label).join('～') }}
        </template>
      </h-cascader>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-cascader v-model="currentVal2" :options="options" filter multiple :to-body="false">
        <template #searchPanelRender="slotProps">
          🐂
          {{ slotProps.paths.map(path => path.label).join('～') }}
        </template>
      </h-cascader>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);
    const currentVal2 = ref<string[][]>([]);

    const options = ref([]);
    fetch(
      new URL('/cascader-options.json', import.meta.url).href,
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    return {
      currentVal1,
      currentVal2,
      options,
    };
  },
});
<\/script>
`,
    path: "demos/components/Cascader/filter-render-slot.vue"
  }, null, _parent));
  _push(`<h2 id="过滤并确认" tabindex="-1">过滤并确认 <a class="header-anchor" href="#过滤并确认" aria-label="Permalink to &quot;过滤并确认&quot;">​</a></h2><p><code>filterable</code> 与 <code>need-confirm</code> 结合展示</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">
        单选
      </div>
      <h-cascader v-model="currentVal1" :filterable="true" :options="options" need-confirm :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        多选
      </div>
      <h-cascader v-model="currentVal2" :filterable="true" :options="options" multiple need-confirm :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);

const options = ref([]);
fetch(
  new URL('/cascader-options.json', import.meta.url).href,
).then(res => {
  res.json().then(value => {
    options.value = value;
  });
});
<\/script>
`,
    path: "demos/components/Cascader/common-search-confirm.vue"
  }, null, _parent));
  _push(`<h2 id="关键字保留" tabindex="-1">关键字保留 <a class="header-anchor" href="#关键字保留" aria-label="Permalink to &quot;关键字保留&quot;">​</a></h2><p>使用 <code>reserve-keyword</code> 配置，可以控制在勾选选项后是否保留关键字</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">保留关键字（默认）</div>
      <h-cascader
        v-model="currentVal1"
        :filterable="true"
        :options="options"
        :multiple="true"
        :reserve-keyword="true"
        :collapse-tags="true"
        :collapse-tags-fill-up="true"
        :to-body="false"
        @change="changeHandle"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">不保留关键字</div>
      <h-cascader
        v-model="currentVal2"
        :filterable="true"
        :options="options"
        :multiple="true"
        :reserve-keyword="false"
        :collapse-tags="true"
        :collapse-tags-fill-up="true"
        :to-body="false"
        @change="changeHandle"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">在反选时保留，正选不保留</div>
      <h-cascader
        v-model="currentVal3"
        :filterable="true"
        :options="options"
        :multiple="true"
        reserve-keyword="reserve-deselect"
        :collapse-tags="true"
        :collapse-tags-fill-up="true"
        :to-body="false"
        @change="changeHandle"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import type { HCascaderExtendOption } from '@aurora/horizon-web';
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[][]>([]);
const currentVal2 = ref<string[][]>([]);
const currentVal3 = ref<string[][]>([]);

const changeHandle = (value: boolean, option: HCascaderExtendOption) => {
  console.info(value, option);
};

const options = ref([]);
onMounted(async()=>{
  options.value = await fetch(new URL('/cascader-tree-data.json', import.meta.url).href).then(r => r.json());
});
<\/script>

<style scoped>
.panel-filter-box {
  padding: 12px;
  border-bottom: 1px solid var(--h-divider-default);
}
</style>
`,
    path: "demos/components/Cascader/filter-reserve-keyword.vue"
  }, null, _parent));
  _push(`<h2 id="空列表" tabindex="-1">空列表 <a class="header-anchor" href="#空列表" aria-label="Permalink to &quot;空列表&quot;">​</a></h2><p>一般来说 <code>cascader</code> 会根据 <code>children</code> 是否为空来判断是否是叶子节点，如果你显式地给一个 <code>children</code> 为空的节点指定了 <code>isLeaf</code> 属性为 <code>false</code>，这个时候就会展示空状态</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        默认
      </div>
      <h-cascader v-model="currentVal1" :options="optionsWithEmpty" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        自定义空列表文案内容
      </div>
      <h-cascader
          v-model="currentVal1"
          :options="optionsWithEmpty"
          empty-content="没有对应的内容"
          :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        自定义空列表展示
      </div>
      <h-cascader v-model="currentVal1" :options="optionsWithEmpty" :to-body="false">
        <template #emptyRender>
          <h-empty description="没有对应的内容" />
        </template>
      </h-cascader>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentVal1 = ref<string[]>([]);

const optionsWithEmpty = [
  {
    value: 'disciplines',
    label: 'disciplines',
    isLeaf: false,
  },
  {
    value: 'navigation',
    label: 'Navigation',
    children: [
      {
        value: 'side nav',
        label: 'Side Navigation',
      },
      {
        value: 'top nav',
        label: 'Top Navigation',
      },
    ],
  },
];
<\/script>
`,
    path: "demos/components/Cascader/empty-list.vue"
  }, null, _parent));
  _push(`<h2 id="空数据集" tabindex="-1">空数据集 <a class="header-anchor" href="#空数据集" aria-label="Permalink to &quot;空数据集&quot;">​</a></h2><p>如果 <code>options</code> 是空数组，则会直接展示空状态</p><p>此处的设置对过滤情况下结果集为空时同样起效</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        默认
      </div>
      <h-cascader v-model="currentVal1" :options="[]" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        自定义文案内容
      </div>
      <h-cascader
          v-model="currentVal1"
          :options="[]"
          empty-content="没有对应的内容"
          :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        emptyRender 插槽自定义
      </div>
      <h-cascader v-model="currentVal1" :options="[]" :to-body="false">
        <template #emptyRender>
          <h-empty description="没有对应的内容" />
        </template>
      </h-cascader>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentVal1 = ref<string[]>([]);
<\/script>
`,
    path: "demos/components/Cascader/empty.vue"
  }, null, _parent));
  _push(`<h2 id="字段映射" tabindex="-1">字段映射 <a class="header-anchor" href="#字段映射" aria-label="Permalink to &quot;字段映射&quot;">​</a></h2><p>配置 <code>field-map</code> 来控制映射的字段，从而可以直接使用自定的 <code>options</code> 结构而不必改成 <code>cascader</code> 指定默认字段</p><p>对于 <code>ts</code> 类型报错的问题，可以在全局 <code>declare HCascaderOption</code> 类型解决（以下方 <code>demo</code> 中使用字段为例）：</p><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { HCascaderOption } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;@aurora/horizon-web&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">declare</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> module</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;@aurora/horizon-web&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">  interface</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> HCascaderOption</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    id</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">?:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> HCascaderOption</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">[</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;value&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">];</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    tag</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">?:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> HCascaderOption</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">[</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;label&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">];</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    tagString</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">?:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> HCascaderOption</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">[</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;stringLabel&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">];</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-cascader
        v-model="currentVal1"
        :field-map="{
          value: 'id',
          label: 'tag',
          stringLabel: 'tagString',
        }"
        :options="options1"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue';
import type { HCascaderOption } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);
    return {
      currentVal1,
      options1: [
        {
          id: 'a',
          tag: '1',
          children: [
            {
              id: 'a-a',
              tag: (option: HCascaderOption) =>
                h(
                  'div',
                  {
                    style: 'border: 1px solid #f00;',
                  },
                  [h('span', {}, ['我的值是：', option.id])],
                ),
              tagString: 'a-a',
              children: [
                {
                  id: 'a-a-a',
                  tag: '1-1-1',
                },
                {
                  id: 'a-a-b',
                  tag: '1-1-2',
                },
              ],
            },
            {
              id: 'a-b',
              tag: '1-2',
              children: [
                {
                  id: 'a-b-a',
                  tag: '1-2-1',
                },
                {
                  id: 'a-b-b',
                  tag: '1-2-2',
                },
              ],
            },
            {
              id: 'a-c',
              tag: '1-3',
              children: [
                {
                  id: 'a-c-a',
                  tag: '1-3-1',
                },
              ],
            },
          ],
        },
        {
          id: 'b',
          tag: '2',
          children: [
            {
              id: 'b-a',
              tag: '2-1',
            },
            {
              id: 'b-b',
              tag: '2-2',
              children: [
                {
                  id: 'b-b-a',
                  tag: '2-2-1',
                },
              ],
            },
          ],
        },
      ],
    };
  },
});
<\/script>
`,
    path: "demos/components/Cascader/field-map.vue"
  }, null, _parent));
  _push(`<h2 id="自定义触发器输入框内展示内容" tabindex="-1">自定义触发器输入框内展示内容 <a class="header-anchor" href="#自定义触发器输入框内展示内容" aria-label="Permalink to &quot;自定义触发器输入框内展示内容&quot;">​</a></h2><p>通过 <code>selectRender</code> 插槽，可以自定义选择器的渲染</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <h-cascader v-model="currentVal1" :options="options" expand-trigger="click" :to-body="false">
        <template #selectRender>你的选择是：{{ currentVal1.join('+') }}</template>
      </h-cascader>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);

    const options = ref([]);
    fetch(
      new URL('/cascader-options.json', import.meta.url).href,
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    return {
      currentVal1,
      options,
    };
  },
});
<\/script>
`,
    path: "demos/components/Cascader/custom-trigger-inner.vue"
  }, null, _parent));
  _push(`<h2 id="自定义选中-tag" tabindex="-1">自定义选中 tag <a class="header-anchor" href="#自定义选中-tag" aria-label="Permalink to &quot;自定义选中 tag&quot;">​</a></h2><p>常用在多选中，使用 <code>tagRender</code> 插槽自定义被选中的 <code>tag</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <h-cascader v-model="currentVal1" :options="options" multiple :to-body="false">
        <template #tagRender="slotProps">
          <h-tag :key="slotProps.value" is-pure><span class="multiple-tag">{{ \`\${slotProps.label}\` ?? '' }}</span></h-tag>
        </template>
      </h-cascader>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);

    const options = ref([]);
    fetch(
      new URL('/cascader-options.json', import.meta.url).href,
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    return {
      currentVal1,
      options,
    };
  },
});
<\/script>
`,
    path: "demos/components/Cascader/custom-selected-item.vue"
  }, null, _parent));
  _push(`<h2 id="自定义图标" tabindex="-1">自定义图标 <a class="header-anchor" href="#自定义图标" aria-label="Permalink to &quot;自定义图标&quot;">​</a></h2><p>使用 <code>expand-icon</code> 和 <code>selected-icon</code>，可以自定义 展开图标 和 单选选中图标</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        自定义级联面板展开图标
      </div>
      <h-cascader
          v-model="currentVal1"
          :options="options"
          expand-trigger="click"
          expand-icon="spread_right"
          :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        自定义单选选中项图标
      </div>
      <h-cascader v-model="currentVal2" :options="options" selected-icon="tag" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);
    const currentVal2 = ref<string[]>([]);

    const options = ref([]);
    fetch(
      new URL('/cascader-options.json', import.meta.url).href,
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    return {
      currentVal1,
      currentVal2,
      options,
    };
  },
});
<\/script>
`,
    path: "demos/components/Cascader/custom-icon.vue"
  }, null, _parent));
  _push(`<h2 id="自定义选项-render" tabindex="-1">自定义选项 render <a class="header-anchor" href="#自定义选项-render" aria-label="Permalink to &quot;自定义选项 render&quot;">​</a></h2><p>使用 <code>itemRender</code> 自定义每个选项的渲染</p><p>为了选中内容和搜索结果的正确展示，当指定 <code>label</code> 的类型为函数时，需要给 <code>option</code> 指定 <code>stringLabel</code> 的值</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <h-cascader v-model="currentVal1" :options="optionsWithRender" :to-body="false">
        <template #itemRender="slotProps">
          <div style="width: 200px">
            👼🏻
            {{ slotProps.label }}
          </div>
        </template>
      </h-cascader>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);

    const optionsWithRender = [
      {
        value: 'disciplines',
        label: (option: any) =>
          h(
            'div',
            {
              style: 'color: #00BEBE;width: 300px;',
            },
            ['你可以看到我的 value =', option.value],
          ),
        stringLabel: 'Disciplines',
        children: [
          {
            stringLabel: 'Consistency',
            value: 'consistency',
            label: (option: any) =>
              h('div', {}, [
                h(
                  'span',
                  {
                    style: 'width: 300px;',
                  },
                  ['➕', option.value],
                ),
              ]),
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ];

    return {
      currentVal1,
      optionsWithRender,
    };
  },
});
<\/script>
`,
    path: "demos/components/Cascader/custom-option-render.vue"
  }, null, _parent));
  _push(`<h2 id="自定义选择器" tabindex="-1">自定义选择器 <a class="header-anchor" href="#自定义选择器" aria-label="Permalink to &quot;自定义选择器&quot;">​</a></h2><p>借助 <code>default</code> 插槽，可以自定义选择器</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <h-cascader
          ref="cascaderFilterRef"
          v-model="currentVal1"
          :options="options"
          expand-trigger="click"
          :filter="true"
          :to-body="false"
      >
        <template #default="{ visible: panelVisible }">
          <div @click="() => (panelVisible.value = true)">
            完全自定义的内容，可以点击我：
            <p v-if="currentVal1.length > 0">{{ currentVal1 }}</p>
            <h-input v-model="selectRenderInputValue" />
          </div>
        </template>
      </h-cascader>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const cascaderFilterRef = ref<any>(null);
    const currentVal1 = ref<string[]>([]);
    const selectRenderInputValue = ref('');

    const options = ref([]);
    fetch(
      new URL('/cascader-options.json', import.meta.url).href,
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    watch(selectRenderInputValue, newValue => {
      if (cascaderFilterRef.value) {
        cascaderFilterRef.value.inputChange?.(newValue);
      }
    });

    return {
      currentVal1,
      options,
      selectRenderInputValue,
      cascaderFilterRef,
    };
  },
});
<\/script>
`,
    path: "demos/components/Cascader/custom-trigger.vue"
  }, null, _parent));
  _push(`<h2 id="model-value-未匹配" tabindex="-1">model-value 未匹配 <a class="header-anchor" href="#model-value-未匹配" aria-label="Permalink to &quot;model-value 未匹配&quot;">​</a></h2><p>当 <code>model-value</code> 无法在 options 中找到时，会直接展示其 <code>value</code> 值</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-cascader
        v-model="currentVal1"
        :clearable="true"
        :to-body="false"
        :options="baseData"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-cascader
        v-model="currentVal2"
        :clearable="true"
        :options="baseData"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">单选-仅展示叶子节点</div>
      <h-cascader
        v-model="currentVal3"
        :clearable="true"
        :options="baseData"
        show-checked-strategy="leaf"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选-仅展示叶子节点</div>
      <h-cascader
        v-model="currentVal4"
        :clearable="true"
        :options="baseData"
        show-checked-strategy="leaf"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[]>(["guide", "navigation", "side"]);
const currentVal2 = ref<string[][]>([["guide", "navigation", "side"]]);
const currentVal3 = ref<string[]>(["guide", "navigation", "side"]);
const currentVal4 = ref<string[][]>([["guide", "navigation", "side"]]);

const baseData = ref([]);

onMounted(async()=>{
  baseData.value = await fetch(new URL('/cascader-tree-data.json', import.meta.url).href).then(r => r.json());
});
<\/script>
`,
    path: "demos/components/Cascader/unmatched-value.vue"
  }, null, _parent));
  _push(`<h2 id="虚拟滚动" tabindex="-1">虚拟滚动 <a class="header-anchor" href="#虚拟滚动" aria-label="Permalink to &quot;虚拟滚动&quot;">​</a></h2><p>设置 <code>use-virtual-scroll = true</code> ，则会启用虚拟滚动</p><p>此处展示了 5w 条数据（因为需要处理父子层级关系，层级越多性能影响越大，这个会在后续迭代中优化计算能力）</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row :gutter="10">\n    <h-col :span="6">\n      <div class="demo-title">单选</div>\n      <h-cascader\n        v-model="currentVal1"\n        :clearable="true"\n        :filterable="true"\n        :options="baseData"\n        :use-virtual-scroll="true"\n      />\n    </h-col>\n    <h-col :span="6">\n      <div class="demo-title">多选</div>\n      <h-cascader\n        v-model="currentVal2"\n        :clearable="true"\n        :filterable="true"\n        :options="baseData"\n        :multiple="true"\n        :collapse-tags="true"\n        :use-virtual-scroll="true"\n      />\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\nimport { ref } from \'vue\';\nimport type { BaseTreeData } from \'@aurora/horizon-web/es/utils/useTree\';\n\nconst currentVal1 = ref<string[]>();\nconst currentVal2 = ref<string[][]>();\nconst baseData: BaseTreeData[] = new Array(100).fill(0).map((_, i) => ({\n  label: `${i + 1}`,\n  value: i + 1,\n  children: new Array(100).fill(0).map((_, j) => ({\n    label: `${i + 1}-${j + 1}`,\n    value: j + 1,\n    children: new Array(5).fill(0).map((_, k) => ({\n      label: `${i + 1}-${j + 1}-${k + 1}`,\n      value: k + 1,\n    })),\n  })),\n}));\n<\/script>\n',
    path: "demos/components/Cascader/virtual-scroll.vue"
  }, null, _parent));
  _push(`<h2 id="不可选择" tabindex="-1">不可选择 <a class="header-anchor" href="#不可选择" aria-label="Permalink to &quot;不可选择&quot;">​</a></h2><p>传入 <code>options</code> 时，可以设定 <code>selectable = false</code>，即可不允许选择该项（但展开不受限）</p><p><strong>下面是与 disabled 的对比表格（树和树选择器同理）：</strong></p><table class="md-table text-center"><thead><tr><th rowspan="2"></th><th rowspan="2">设置对象</th><th rowspan="2" width="120">鼠标选择对象</th><th>disabled = true</th><th>selectable = false</th></tr></thead><tbody><tr><th rowspan="9" width="120">父子节点关联</th><th rowspan="3" width="80">根节点</th><th width="80">当前根节点</th><td>不可勾选、交互</td><td>不可勾选、交互</td></tr><tr><th width="80">子节点</th><td>不可勾选、交互</td><td>可以自由勾选并交互，并且可以关联勾选其后代节点状态</td></tr><tr><th width="80">叶子节点</th><td>不可勾选、交互</td><td colspan="2">可以勾选并交互</td></tr><tr><th rowspan="3" width="80">子节点</th><th width="80">根节点</th><td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>disabled</code> 的节点状态</td><td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>unselectable</code> 的节点状态</td></tr><tr><th width="80">当前子节点</th><td>不可勾选、交互</td><td>不可勾选、交互</td></tr><tr><th width="80">叶子节点</th><td>不可勾选、交互</td><td>可以勾选并交互</td></tr><tr><th rowspan="3" width="80">叶子节点</th><th width="80">根节点</th><td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>disabled</code> 的节点状态</td><td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>unselectable</code> 的节点状态</td></tr><tr><th width="80">子节点</th><td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>disabled</code> 的节点状态</td><td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>unselectable</code> 的节点状态</td></tr><tr><th width="80">当前叶子节点</th><td>不可勾选、交互</td><td>不可勾选、交互</td></tr><tr><th rowspan="3" width="120">父子节点不关联</th><th>根节点</th><td rowspan="3" colspan="3">自身不可以勾选、交互，其他节点不干扰</td></tr><tr><th>子节点</th></tr><tr><th>叶子结点</th></tr></tbody></table><p>如果启用了单选，则最好搭配 <code>show-radio = true</code>，否则在展示形式上无法看出区别</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-cascader
        v-model="currentVal1"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        :show-radio="true"
        @update:modelValue="updateHandle"
        @change="changeHandle"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-cascader
        v-model="currentVal2"
        :clearable="true"
        :options="baseData"
        :multiple="true"
        :filterable="true"
        :use-filter-check-all="true"
        :to-body="false"
        :collapse="true"
        @update:modelValue="updateHandle"
        @change="changeHandle"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { HCascaderExtendOption, HCascaderModelValueType } from '@aurora/horizon-web';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);
const baseData = ref([]);

const changeHandle = (value: HCascaderModelValueType, option: HCascaderExtendOption) => {
  console.info('change: ', value, option);
};

const updateHandle = (value: HCascaderModelValueType) => {
  console.info('update: ', value);
};

onMounted(async()=>{
  baseData.value = await fetch(new URL('/unselectable-options.json', import.meta.url).href).then(r => r.json());
});
<\/script>
`,
    path: "demos/components/Cascader/selectable.vue"
  }, null, _parent));
  _push(`<h2 id="cascader-api" class="no-underline h2"><a href="#cascader-api" class="!no-underline">Cascader Api</a></h2><h3 id="cascader-props" class="no-underline h3"><a href="#cascader-props" class="!no-underline">Cascader Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定的值</td><td><code>ModelValueType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>触发方式</td><td><code>&#39;hover&#39; | &#39;click&#39; | &#39;never&#39;</code></td><td class="text-center">否</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>是否支持清除</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "collapseTags" }, null, _parent));
  _push(`</td><td>是否折叠</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags</td><td>是否折叠</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags-tooltip</td><td>多选模式下，是否悬浮在 +N 上显示选择的内容</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-collapse-tags</td><td>多选模式下，自己控制显示的标签个数，超出这个个数将会被折叠</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags-fill-up</td><td>尽量让标签填满容器</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapsed-tags-props</td><td>折叠的标签的 props，可以自定义 <code>+N</code> 的 <code>tag</code> 的样式</td><td><code>Partial&lt;TagProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-checked-strategy</td><td>选中项的展示方式<br><code>&#39;fullPath&#39;</code>: 会展示完整的层级<br><code>&#39;leaf&#39;</code>: 只展示叶子节点</td><td><code>&#39;fullPath&#39; | &#39;leaf&#39;</code></td><td class="text-center">否</td><td>&#39;fullPath&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">path-separator</td><td>路径分隔符，用于在 input 中展示</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;/&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-strictly</td><td>是否严格的遵守父子节点**不互相关联**<br><code>true</code>: 不相互关联，即可以点选任意节点<br><code>false</code>: 相互关联，只能点选到叶子节点</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-strictly</td><td>在开启了 <code>checkStrictly</code> 后，选择非叶子节点后，是否严格的遵守父子节点**不互相关联**进行展开<br><code>true</code>: 不进行传递展开<br><code>false</code>: 会展开当前非叶子节点的子级</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>占位内容</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>触发器尺寸</td><td><code>&#39;large&#39; | &#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cascader-style</td><td>触发器样式</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;noborder&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-style</td><td>触发器样式</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;no-border&#39;</code></td><td class="text-center">否</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-class-name</td><td>作用在 popper 上的自定义 class name</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-status</td><td>输入框的状态</td><td><code>PickerInputStatusType</code></td><td class="text-center">否</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-options</td><td>给 popover 的额外参数</td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">initial-value</td><td>默认值，可以在 <code>modelValue</code> 为空时，自动赋值一个指定值</td><td><code>Array&lt;string | number&gt; | null | undefined | symbol</code></td><td class="text-center">否</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-show-delay</td><td>鼠标悬浮后多久显示 <code>popper</code><br>仅在 <code>trigger = hover</code> 时有效</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-hide-delay</td><td>鼠标移出后后多久隐藏 <code>popper</code><br>仅在 <code>trigger = hover</code> 时有效</td><td><code>number</code></td><td class="text-center">否</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-statistic</td><td>是否使用多选统计</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">statistic-text</td><td>多选统计的前置文字<br>默认使用国际化（选项）</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>是否将 popper 渲染到 body 上</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-height</td><td>触发器最大高度</td><td><code>string | number</code></td><td class="text-center">否</td><td>256</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td>可选数据源，具体字段见 HCascaderOption 参数说明</td><td><code>HCascaderOption[]</code></td><td class="text-center">是</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple</td><td>是否多选</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple-limit</td><td>多选限制数量</td><td><code>number</code></td><td class="text-center">否</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-trigger</td><td>次级菜单展开方式</td><td><code>&#39;hover&#39; | &#39;click&#39;</code></td><td class="text-center">否</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-icon</td><td>次级菜单展开图标，一般传入 icon name</td><td><code>iconPropType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-icon</td><td>自定义下拉按钮<br>可以传入 <code>a-icon</code> 的 <code>name</code>，也可以直接是 <code>svg</code><br>如果传入 <code>false</code>，即不展示图标</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dynamic-load</td><td>动态加载 options</td><td><code>(node: HCascaderDynamicLoadNode) =&gt; Promise&lt;HCascaderOption[]&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-icon</td><td>自定义单选场景下选中项图标，只对叶子节点起作用<br>默认：&lt;AIcon name=&quot;check&quot; /&gt;</td><td><code>iconPropType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-content`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "emptyText" }, null, _parent));
  _push(`</td><td>空状态展示文案</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-text</td><td>空状态展示文案，默认使用国际化</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter</td><td>是否使用过滤功能<br>SearchParams 具体类型见下表</td><td><code>boolean | HCascaderSearchParams</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filterable</td><td>是否可以筛选</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-method</td><td>筛选过滤方法</td><td><code>HCascaderFilterFunction</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-able</td><td>设置触发器为可输入状态，当 filter 不为 false 时，该属性会失效，输入之后会触发 input 事件，通常可以用于自定义 option 筛选的场景</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">search-panel-width</td><td>search panel 宽度</td><td><code>string | number</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "needConfirm" }, null, _parent));
  _push(`</td><td>确认选中</td><td><code>| boolean<br>      | {<br>          enterName: string;<br>          cancelName: string;<br>        }</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">need-confirm</td><td>是否需要确认选中</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmButtonText" }, null, _parent));
  _push(`</td><td>确认按钮文字，默认使用国际化</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-button-text</td><td>确认按钮文字，默认使用国际化</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "cancelButtonText" }, null, _parent));
  _push(`</td><td>取消按钮文字，默认使用国际化</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button-text</td><td>取消按钮文字，默认使用国际化</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">field-map</td><td>options 字段映射，给定一个字段映射规则以达到在 option 中覆盖默认指定字段名称的目的</td><td><code>Partial&lt;Record&lt;keyof HCascaderOption, keyof HCascaderOption | string&gt;&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-max-result</td><td>过滤后最大展示结果数量</td><td><code>number</code></td><td class="text-center">否</td><td>50</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-result-sort</td><td>过滤后结果的排序函数</td><td><code>HCascaderFilterSortFunction</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-filter-option</td><td>是否在选项列表中使用过滤功能</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-filter-input-value</td><td>选项列表过滤的输入框内容</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-build-in-panel-filter</td><td>是否启用内置的面板过滤组件</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-input-placeholder</td><td>面板输入框的占位文字<br>默认使用国际化的 &quot;请搜索&quot;</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-radio</td><td>单选状态是否显示radio</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-panel-item-width</td><td>最大单个选项文字宽度,false则不限制<br>todo</td><td><code>number | boolean</code></td><td class="text-center">否</td><td>254</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-tooltip</td><td>当设置了<code>maxPanelItemWidth</code>时，是否显示tooltip,<code>false</code> 则会自动换行<br>todo</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>弹出位置</td><td><code>| &#39;auto&#39;<br>      | &#39;auto-start&#39;<br>      | &#39;auto-end&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;<br>      | &#39;left&#39;</code></td><td class="text-center">否</td><td>&#39;bottom-start&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">flip</td><td>当原本的显示位置空间不够时，是否允许 popper 显示到对面的位置 boolean</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-emit-frequency</td><td>输入触发事件的频率<br>请谨慎设置，防止触发过快或过慢导致非预期的问题</td><td><code>number</code></td><td class="text-center">否</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-max-lines</td><td>选项的文本超出最大展示行数</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">search-icon</td><td>搜索 <code>icon</code><br>如果不需要搜索 <code>icon</code>，则设置为 <code>false</code></td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">否</td><td>() =&gt; IconCheck</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-input-width</td><td>在过滤情况下，下拉框宽度是否与输入框相同<br>若为</td><td><code>boolean | &#39;fit-content&#39;</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reserve-keyword</td><td>在允许过滤且是多选时，在勾选选项后是否保留输入的文字<br><code>true</code>: 正选反选都保留<br><code>false</code>: 正选反选都不保留<br><code>&#39;reserve-deselect&#39;</code>: 仅在反选时保留</td><td><code>boolean | &#39;reserve-deselect&#39;</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-show-after</td><td>所有有 <code>tooltip</code> 的地方，在悬浮后延迟多少毫秒显示 <code>tooltip</code></td><td><code>number</code></td><td class="text-center">否</td><td>100</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-hide-after</td><td>所有有 <code>tooltip</code> 的地方，在显示后延迟多少毫秒移除 <code>tooltip</code></td><td><code>number</code></td><td class="text-center">否</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-content-input-min-width</td><td>设置自适应文字长度的 <code>input</code> 的最小宽度</td><td><code>string | number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-filter-check-all</td><td>是否在过滤时启用全选功能</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-check-all-summary</td><td>全选后是否只展示 “所有” 的标签</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-all-summary-text</td><td>可以自定义在全选后展示的标签文字<br>默认使用国际化</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-virtual-scroll</td><td>是否使用虚拟滚动</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panels-loading</td><td>面板是否处于加载中，也可以传入 <code>v-loading</code> 可接受的参数值</td><td><code>boolean | LoadingOptions</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-popover-content-only</td><td>是否仅展示弹窗内容</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-tags-in-panel</td><td>是否在面板中展示选中项的标签</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3 id="cascader-emits" class="no-underline h3"><a href="#cascader-emits" class="!no-underline">Cascader Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-visible-change</td><td rowspan="1">下拉面板显隐切换时通知</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>是否显示</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-visible-change`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "dropdownVisibleChange\n下拉面板显隐切换时通知" }, null, _parent));
  _push(`</td><td rowspan="1"></td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>是否显示</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">聚焦时通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">input</td><td rowspan="1">输入文字时触发</td><td rowspan="1">( inputValue: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputValue</td><td><code>string</code></td><td>输入的文字</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:options</td><td rowspan="1">更新 <code>options</code>，一般是异步获取时会更改 <code>options</code></td><td rowspan="1">( options: <code>HCascaderOption[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td><code>HCascaderOption[]</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">search</td><td rowspan="1">搜索输入框改变时通知</td><td rowspan="1">( searchValue: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">searchValue</td><td><code>string</code></td><td>搜索的文字</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="2">选中或取消选中时触发</td><td rowspan="2">( selectOrDeselect: <code>boolean</code>, option: <code>HCascaderExtendOption</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selectOrDeselect</td><td><code>boolean</code></td><td><code>true</code> 表示选中 <code>false</code> 表示取消选中，如果是 <code>undefined</code> 则代表是由用户传入更改的</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option</td><td><code>HCascaderExtendOption</code></td><td>被选中的 option 内容，如果 option === undefined，则代表选择的数据并非是 options 中已有的</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">清空时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">select</td><td rowspan="2">选中某项时触发</td><td rowspan="2">( valuePath: <code>Array&lt;string | number&gt;</code>, option: <code>HCascaderExtendOption</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">valuePath</td><td><code>Array&lt;string | number&gt;</code></td><td>从父节点的 <code>cascader.options.*.value</code> 到当前选项的路径</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option</td><td><code>HCascaderExtendOption</code></td><td><code>cascader.options</code> 任一子元素</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">deselect</td><td rowspan="2">多选模式下，选中取消项时触发</td><td rowspan="2">( valuePath: <code>Array&lt;string | number&gt;</code>, option: <code>HCascaderExtendOption</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">valuePath</td><td><code>Array&lt;string | number&gt;</code></td><td>从父节点的 <code>cascader.options.*.value</code> 到当前选项的路径</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option</td><td><code>HCascaderExtendOption</code></td><td><code>cascader.options</code> 任一子元素</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">modify</td><td rowspan="3">当选中的 <code>option</code> 发生变更时触发</td><td rowspan="3">( modelValue: <code>ModelValueType</code>, selectOrDeselect: <code>boolean</code>, option: <code>HCascaderExtendOption</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">modelValue</td><td><code>ModelValueType</code></td><td>modelValue 值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selectOrDeselect</td><td><code>boolean</code></td><td>是选中还是取消选中，如果是 <code>undefined</code> 则代表是由用户传入更改的</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option</td><td><code>HCascaderExtendOption</code></td><td><code>cascader.options</code> 任一子元素，如果是多选+父子关联且选择了父节点，那这里只会抛出最后一个子节点的数据</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-enter`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirm" }, null, _parent));
  _push(`</td><td rowspan="1">点击确定时触发</td><td rowspan="1">( modelValue: <code>ModelValueType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">modelValue</td><td><code>ModelValueType</code></td><td>modelValue 值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm</td><td rowspan="1">点击确定时触发</td><td rowspan="1">( modelValue: <code>ModelValueType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">modelValue</td><td><code>ModelValueType</code></td><td>modelValue 值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-cancel`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "cancel" }, null, _parent));
  _push(`</td><td rowspan="1">点击取消时触发</td><td rowspan="1">( modelValue: <code>ModelValueType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">modelValue</td><td><code>ModelValueType</code></td><td>modelValue 值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel</td><td rowspan="1">点击取消时触发</td><td rowspan="1">( modelValue: <code>ModelValueType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">modelValue</td><td><code>ModelValueType</code></td><td>modelValue 值</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-reach-bottom</td><td rowspan="2">在子面板触底时抛出此事件，可以做分页加载</td><td rowspan="2">( evt: <code>Event | undefined</code>, parent: <code>HCascaderOption | null | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event | undefined</code></td><td>滚动事件或者键盘事件，如果为 undefined，则是虚拟滚动抛出的事件</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">parent</td><td><code>HCascaderOption | null | undefined</code></td><td>当前触底滚动面板的所属父级，如果为 nil 则为根节点</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击时触发</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>点击事件</td></tr></tbody></table><h3 id="cascader-exposes" class="no-underline h3"><a href="#cascader-exposes" class="!no-underline">Cascader Exposes</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">enterHandle`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmHandle" }, null, _parent));
  _push(`</td><td rowspan="1">确认方法</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirmHandle</td><td rowspan="1">确认方法</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelHandle</td><td rowspan="1">取消方法</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">exposeConfirm`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmHandle / cancelHandle" }, null, _parent));
  _push(`</td><td rowspan="3">确认操作</td><td rowspan="3"><code>{<br>    enterHandle: () =&gt; void;<br>    confirmHandle: () =&gt; void;<br>    cancelHandle: () =&gt; void;<br>  }</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">enterHandle</td><td><code>() =&gt; void</code></td><td>确认操作</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirmHandle</td><td><code>() =&gt; void</code></td><td>确认操作</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelHandle</td><td><code>() =&gt; void</code></td><td>确认操作</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focusOption</td><td rowspan="1">聚焦某个选项</td><td rowspan="1">( valuePath: <code>ModelValueSingleType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">valuePath</td><td><code>ModelValueSingleType</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">changePanelVisible</td><td rowspan="1">改变面板的显隐</td><td rowspan="1">( status: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td><code>boolean</code></td><td>是否显示</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setInputAble</td><td rowspan="1">设置是否可输入</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputChange</td><td rowspan="1">使用 自定义 <code>select</code> 时(如：<code>selectRender\\default slot</code>)，可以使用该方法触发输入事件，可以配合 <code>filter</code> 参数使用，达到过滤效果</td><td rowspan="1">( value: <code>string | null</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | null</code></td><td>input 值，如果为 <code>null</code> 即清空</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">清除选中项</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">renderedModelValueTags</td><td rowspan="1">渲染的选中项标签</td><td rowspan="1"><code>Ref&lt;Array&lt;VNode | JSX.Element&gt;&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">聚焦</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Cascader.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Cascader = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Cascader as default
};
