import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Cascader.md","filePath":"en/demos/components/Cascader.md"}');
const _sfc_main = { name: "en/demos/components/Cascader.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Cascader</h1><p class="description">Consistent with other selector components, there are <code>normal</code> <code>emphasize</code> <code>no-border</code> styles</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Consistent with other selector components, there are <code>normal</code> <code>emphasize</code> <code>no-border</code> styles</p>`);
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
  _push(`<h2 id="single-selection" tabindex="-1">Single Selection <a class="header-anchor" href="#single-selection" aria-label="Permalink to &quot;Single Selection&quot;">​</a></h2><p>In single selection mode, you can configure <code>show-radio</code> to whether to display <code>radio</code> in the node</p><p>When displaying <code>radio</code>, only clicking the <code>radio</code> of non-leaf nodes can select the current node</p><p>Combined with <code>check-strictly</code>, there will be different display logic</p>`);
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
  _push(`<h2 id="multiple-selection" tabindex="-1">Multiple Selection <a class="header-anchor" href="#multiple-selection" aria-label="Permalink to &quot;Multiple Selection&quot;">​</a></h2><p>Like <code>select</code>, the tags for multiple selection use <code>h-tag</code> and <code>h-tag-group</code> components combined</p><p>By default, selected items are not collapsed. You can configure <code>collapse-tags = true</code> to collapse selected items</p><p>In addition, you can configure <code>collapse-tags-tooltip = true</code> to display other selected items when hovering over <code>+N</code>, and you can quickly deselect selected items</p><p>In addition, if your <code>select</code> space is very small, it may be squeezed to only <code>+N</code>. You can configure <code>max-collapse-tags</code> to force how many selected items to display, and the rest will be collapsed</p>`);
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
  _push(`<h2 id="select-all" tabindex="-1">Select All <a class="header-anchor" href="#select-all" aria-label="Permalink to &quot;Select All&quot;">​</a></h2><p>Supports configuring <code>use-check-all-summary</code> to mark as <code>All</code> when all options are selected (with internationalization processing)</p><p>If you want to customize the text of <code>All</code>, you can configure <code>check-all-summary-text</code></p>`);
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
  _push(`<h2 id="parent-child-node-selection-strict-mode" tabindex="-1">Parent-Child Node Selection Strict Mode <a class="header-anchor" href="#parent-child-node-selection-strict-mode" aria-label="Permalink to &quot;Parent-Child Node Selection Strict Mode&quot;">​</a></h2><p>You can control whether parent-child nodes are strictly controlled by setting <code>check-strictly</code></p><p>If set to <code>true</code>, you can select any node that is not in <code>disabled</code> state</p><p>If set to <code>false</code>, you cannot expand <code>disabled</code> nodes, and you cannot select their subordinate nodes</p>`);
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
  _push(`<h2 id="parent-child-node-expand-control" tabindex="-1">Parent-Child Node Expand Control <a class="header-anchor" href="#parent-child-node-expand-control" aria-label="Permalink to &quot;Parent-Child Node Expand Control&quot;">​</a></h2><p>After configuring <code>check-strictly = true</code>, the expand logic will also be controlled by <code>expand-strictly</code></p><p>If set to <code>true</code>, clicking the radio or checkbox will not expand child nodes</p><p>If set to <code>false</code>, clicking the radio or checkbox will expand child nodes</p><p>Note that for single selection, you need to enable <code>show-radio</code> to be effective, otherwise child nodes will be expanded regardless</p>`);
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
  _push(`<h2 id="option-statistics" tabindex="-1">Option Statistics <a class="header-anchor" href="#option-statistics" aria-label="Permalink to &quot;Option Statistics&quot;">​</a></h2><p>Pass in <code>use-statistic = true</code> to count multiple selections</p><p>You can set <code>statistic-text</code> to specify the statistical text</p>`);
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
  _push(`<h2 id="node-display-strategy" tabindex="-1">Node Display Strategy <a class="header-anchor" href="#node-display-strategy" aria-label="Permalink to &quot;Node Display Strategy&quot;">​</a></h2><p>You can choose to display the full path or display leaf nodes, default is to display the full path</p>`);
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
  _push(`<h2 id="panel-expand-method" tabindex="-1">Panel Expand Method <a class="header-anchor" href="#panel-expand-method" aria-label="Permalink to &quot;Panel Expand Method&quot;">​</a></h2><p>Set <code>trigger = &#39;hover&#39;</code> to open the panel on hover</p>`);
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
  _push(`<h2 id="node-expand-method" tabindex="-1">Node Expand Method <a class="header-anchor" href="#node-expand-method" aria-label="Permalink to &quot;Node Expand Method&quot;">​</a></h2><p>You can set <code>expand-trigger</code> to modify the expand method</p><p>Default is <code>click</code>, you can change it to <code>hover</code> to expand child nodes on hover</p>`);
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
  _push(`<h2 id="confirm-selection" tabindex="-1">Confirm Selection <a class="header-anchor" href="#confirm-selection" aria-label="Permalink to &quot;Confirm Selection&quot;">​</a></h2><p>Configure <code>need-confirm = true</code> to enable secondary confirmation after selection</p>`);
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
  _push(`<h2 id="custom-confirm-selection-content" tabindex="-1">Custom Confirm Selection Content <a class="header-anchor" href="#custom-confirm-selection-content" aria-label="Permalink to &quot;Custom Confirm Selection Content&quot;">​</a></h2><p>You can control the text of confirm and cancel buttons through <code>confirm-btn-text</code> <code>cancel-btn-text</code></p><p>The <code>confirmRender</code> slot also exposes two methods <code>cancelHandle</code> <code>confirmHandle</code> for use when customizing the footer</p><p>In addition, you can also use the <code>exposeConfirm</code> exposed by the <code>cascader</code> instance to perform confirm and cancel operations</p>`);
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
  _push(`<h2 id="panel-grouping" tabindex="-1">panel Grouping <a class="header-anchor" href="#panel-grouping" aria-label="Permalink to &quot;panel Grouping&quot;">​</a></h2><p>Due to the special nature of the <code>cascader</code> tree structure, if you want to achieve grouping effect, you can only set a node with only <code>groupLabel</code> when passing in <code>options</code> to simulate grouping</p>`);
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
  _push(`<h2 id="dynamic-loading" tabindex="-1">Dynamic Loading <a class="header-anchor" href="#dynamic-loading" aria-label="Permalink to &quot;Dynamic Loading&quot;">​</a></h2><p>Note that when using dynamic loading, you need to use <code>v-model:options</code> to pass in <code>options</code></p><p>Because bidirectional synchronization of <code>options</code> data is needed here, and you need to specify dynamically loaded <code>option</code> as a non-leaf node (i.e., set <code>isLeaf</code> to <code>false</code>)</p><p><strong>Special note: <code>value</code> at the same level must not be repeated, otherwise the component will have exceptions when mounting child items</strong></p>`);
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
  _push(`<h2 id="filter" tabindex="-1">Filter <a class="header-anchor" href="#filter" aria-label="Permalink to &quot;Filter&quot;">​</a></h2><p>Set <code>filterable</code> to enable filtering</p><p>Note that different states of <code>check-strictly</code> will affect the displayed <code>option</code> list</p>`);
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
  _push(`<h2 id="filter-select-all" tabindex="-1">Filter Select All <a class="header-anchor" href="#filter-select-all" aria-label="Permalink to &quot;Filter Select All&quot;">​</a></h2><p>Supports passing in <code>use-filter-check-all = true</code> to enable select all when filtering</p>`);
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
  _push(`<h2 id="filter-configuration" tabindex="-1">Filter Configuration <a class="header-anchor" href="#filter-configuration" aria-label="Permalink to &quot;Filter Configuration&quot;">​</a></h2><p>Configure <code>filter-method</code> to customize the filter method</p><p><code>filter-max-result</code> can control the maximum number of displayed results</p><p><code>filter-result-sort</code> can control the sorting function of filtered results</p>`);
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
  _push(`<h2 id="custom-display-after-filtering" tabindex="-1">Custom Display After Filtering <a class="header-anchor" href="#custom-display-after-filtering" aria-label="Permalink to &quot;Custom Display After Filtering&quot;">​</a></h2><p>Through the <code>searchPanelRender</code> slot, you can customize the filtered content</p>`);
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
  _push(`<h2 id="filter-and-confirm" tabindex="-1">Filter and Confirm <a class="header-anchor" href="#filter-and-confirm" aria-label="Permalink to &quot;Filter and Confirm&quot;">​</a></h2><p>Combination of <code>filterable</code> and <code>need-confirm</code> display</p>`);
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
  _push(`<h2 id="keyword-retention" tabindex="-1">Keyword Retention <a class="header-anchor" href="#keyword-retention" aria-label="Permalink to &quot;Keyword Retention&quot;">​</a></h2><p>Use the <code>reserve-keyword</code> configuration to control whether to retain keywords after selecting options</p>`);
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
  _push(`<h2 id="empty-list" tabindex="-1">Empty List <a class="header-anchor" href="#empty-list" aria-label="Permalink to &quot;Empty List&quot;">​</a></h2><p>Generally, <code>cascader</code> will judge whether it is a leaf node based on whether <code>children</code> is empty. If you explicitly set the <code>isLeaf</code> attribute of a node with empty <code>children</code> to <code>false</code>, an empty state will be displayed at this time</p>`);
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
  _push(`<h2 id="empty-dataset" tabindex="-1">Empty Dataset <a class="header-anchor" href="#empty-dataset" aria-label="Permalink to &quot;Empty Dataset&quot;">​</a></h2><p>If <code>options</code> is an empty array, an empty state will be displayed directly</p><p>This setting also takes effect when the result set is empty in filtering situations</p>`);
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
  _push(`<h2 id="field-mapping" tabindex="-1">Field Mapping <a class="header-anchor" href="#field-mapping" aria-label="Permalink to &quot;Field Mapping&quot;">​</a></h2><p>Configure <code>field-map</code> to control mapped fields, so you can directly use custom <code>options</code> structure without changing it to <code>cascader</code> specified default fields</p><p>For <code>ts</code> type error issues, you can solve it by declaring the <code>HCascaderOption</code> type globally (using the fields in the following <code>demo</code> as an example):</p><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { HCascaderOption } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;@aurora/horizon-web&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
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
  _push(`<h2 id="custom-trigger-input-box-display-content" tabindex="-1">Custom Trigger Input Box Display Content <a class="header-anchor" href="#custom-trigger-input-box-display-content" aria-label="Permalink to &quot;Custom Trigger Input Box Display Content&quot;">​</a></h2><p>Through the <code>selectRender</code> slot, you can customize the renderer selector</p>`);
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
  _push(`<h2 id="custom-selected-tag" tabindex="-1">Custom Selected tag <a class="header-anchor" href="#custom-selected-tag" aria-label="Permalink to &quot;Custom Selected tag&quot;">​</a></h2><p>Commonly used in multiple selections, use the <code>tagRender</code> slot to customize the selected <code>tag</code></p>`);
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
  _push(`<h2 id="custom-icon" tabindex="-1">Custom Icon <a class="header-anchor" href="#custom-icon" aria-label="Permalink to &quot;Custom Icon&quot;">​</a></h2><p>Use <code>expand-icon</code> and <code>selected-icon</code> to customize the expand icon and single selection selected icon</p>`);
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
  _push(`<h2 id="custom-option-render" tabindex="-1">Custom Option render <a class="header-anchor" href="#custom-option-render" aria-label="Permalink to &quot;Custom Option render&quot;">​</a></h2><p>Use <code>itemRender</code> to customize the rendering of each option</p><p>For correct display of selected content and search results, when the type of <code>label</code> is specified as a function, you need to specify the value of <code>stringLabel</code> for <code>option</code></p>`);
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
  _push(`<h2 id="custom-selector" tabindex="-1">Custom Selector <a class="header-anchor" href="#custom-selector" aria-label="Permalink to &quot;Custom Selector&quot;">​</a></h2><p>With the <code>default</code> slot, you can customize the selector</p>`);
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
  _push(`<h2 id="model-value-unmatched" tabindex="-1">model-value Unmatched <a class="header-anchor" href="#model-value-unmatched" aria-label="Permalink to &quot;model-value Unmatched&quot;">​</a></h2><p>When <code>model-value</code> cannot be found in options, its <code>value</code> will be displayed directly</p>`);
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
  _push(`<h2 id="virtual-scroll" tabindex="-1">Virtual Scroll <a class="header-anchor" href="#virtual-scroll" aria-label="Permalink to &quot;Virtual Scroll&quot;">​</a></h2><p>Set <code>use-virtual-scroll = true</code> to enable virtual scrolling</p><p>This shows 50k pieces of data (because parent-child level relationships need to be processed, the more levels, the greater the performance impact. This will be optimized in subsequent iterations to improve computing capabilities)</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row :gutter="10">\n    <h-col :span="6">\n      <div class="demo-title">单选</div>\n      <h-cascader\n        v-model="currentVal1"\n        :clearable="true"\n        :filterable="true"\n        :options="baseData"\n        :use-virtual-scroll="true"\n      />\n    </h-col>\n    <h-col :span="6">\n      <div class="demo-title">多选</div>\n      <h-cascader\n        v-model="currentVal2"\n        :clearable="true"\n        :filterable="true"\n        :options="baseData"\n        :multiple="true"\n        :collapse-tags="true"\n        :use-virtual-scroll="true"\n      />\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\nimport { ref } from \'vue\';\nimport type { BaseTreeData } from \'@aurora/horizon-web/es/utils/useTree\';\n\nconst currentVal1 = ref<string[]>();\nconst currentVal2 = ref<string[][]>();\nconst baseData: BaseTreeData[] = new Array(100).fill(0).map((_, i) => ({\n  label: `${i + 1}`,\n  value: i + 1,\n  children: new Array(100).fill(0).map((_, j) => ({\n    label: `${i + 1}-${j + 1}`,\n    value: j + 1,\n    children: new Array(5).fill(0).map((_, k) => ({\n      label: `${i + 1}-${j + 1}-${k + 1}`,\n      value: k + 1,\n    })),\n  })),\n}));\n<\/script>\n',
    path: "demos/components/Cascader/virtual-scroll.vue"
  }, null, _parent));
  _push(`<h2 id="unselectable" tabindex="-1">Unselectable <a class="header-anchor" href="#unselectable" aria-label="Permalink to &quot;Unselectable&quot;">​</a></h2><p>When passing in <code>options</code>, you can set <code>selectable = false</code> to disallow selection of this item (but expansion is not limited)</p><p><strong>The following is a comparison table with disabled (the same applies to tree and tree selector):</strong></p><table class="md-table text-center"><thead><tr><th rowspan="2"></th><th rowspan="2">Setting Object</th><th rowspan="2" width="120">Mouse Selection Object</th><th>disabled = true</th><th>selectable = false</th></tr></thead><tbody><tr><th rowspan="9" width="120">Parent-Child Node Association</th><th rowspan="3" width="80">Root Node</th><th width="80">Current Root Node</th><td>Cannot select, interact</td><td>Cannot select, interact</td></tr><tr><th width="80">Child Node</th><td>Cannot select, interact</td><td>Can freely select and interact, and can associate the state of its descendant nodes</td></tr><tr><th width="80">Leaf Node</th><td>Cannot select, interact</td><td colspan="2">Can select and interact</td></tr><tr><th rowspan="3" width="80">Child Node</th><th width="80">Root Node</th><td>Can select, interact <br> But cannot change the state of descendant nodes with <code>disabled</code> set</td><td>Can select, interact <br> But cannot change the state of descendant nodes with <code>unselectable</code> set</td></tr><tr><th width="80">Current Child Node</th><td>Cannot select, interact</td><td>Cannot select, interact</td></tr><tr><th width="80">Leaf Node</th><td>Cannot select, interact</td><td>Can select and interact</td></tr><tr><th rowspan="3" width="80">Leaf Node</th><th width="80">Root Node</th><td>Can select, interact <br> But cannot change the state of descendant nodes with <code>disabled</code> set</td><td>Can select, interact <br> But cannot change the state of descendant nodes with <code>unselectable</code> set</td></tr><tr><th width="80">Child Node</th><td>Can select, interact <br> But cannot change the state of descendant nodes with <code>disabled</code> set</td><td>Can select, interact <br> But cannot change the state of descendant nodes with <code>unselectable</code> set</td></tr><tr><th width="80">Current Leaf Node</th><td>Cannot select, interact</td><td>Cannot select, interact</td></tr><tr><th rowspan="3" width="120">Parent-Child Node Not Associated</th><th>Root Node</th><td rowspan="3" colspan="3">Cannot select, interact itself, other nodes are not interfered</td></tr><tr><th>Child Node</th></tr><tr><th>Leaf Node</th></tr></tbody></table><p>If single selection is enabled, it is best to use it with <code>show-radio = true</code>, otherwise the display form cannot see the difference</p>`);
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
  _push(`<h2 id="cascader-api" class="no-underline h2"><a href="#cascader-api" class="!no-underline">Cascader Api</a></h2><h3 id="cascader-props" class="no-underline h3"><a href="#cascader-props" class="!no-underline">Cascader Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>ModelValueType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>Configuration for trigger.</td><td><code>&#39;hover&#39; | &#39;click&#39; | &#39;never&#39;</code></td><td class="text-center">No</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>Configuration for clearable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "collapseTags" }, null, _parent));
  _push(`</td><td>Configuration for collapse.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags</td><td>Configuration for collapse tags.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags-tooltip</td><td>Configuration for collapse tags tooltip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-collapse-tags</td><td>Configuration for max collapse tags.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-tags-fill-up</td><td>Configuration for collapse tags fill up.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapsed-tags-props</td><td>Configuration for collapsed tags props.</td><td><code>Partial&lt;TagProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-checked-strategy</td><td>Configuration for show checked strategy.</td><td><code>&#39;fullPath&#39; | &#39;leaf&#39;</code></td><td class="text-center">No</td><td>&#39;fullPath&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">path-separator</td><td>Configuration for path separator.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;/&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-strictly</td><td>Configuration for check strictly.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-strictly</td><td>Configuration for expand strictly.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>Configuration for placeholder.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;large&#39; | &#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cascader-style</td><td>Configuration for cascader style.</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;noborder&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-style</td><td>Configuration for input style.</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;no-border&#39;</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-class-name</td><td>Configuration for popper class name.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-status</td><td>Configuration for input status.</td><td><code>PickerInputStatusType</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-options</td><td>Configuration for popover options.</td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">initial-value</td><td>Configuration for initial value.</td><td><code>Array&lt;string | number&gt; | null | undefined | symbol</code></td><td class="text-center">No</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-show-delay</td><td>Configuration for hover show delay.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-hide-delay</td><td>Configuration for hover hide delay.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-statistic</td><td>Configuration for use statistic.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">statistic-text</td><td>Configuration for statistic text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>Configuration for to body.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-height</td><td>Configuration for max height.</td><td><code>string | number</code></td><td class="text-center">No</td><td>256</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td>Configuration for options.</td><td><code>HCascaderOption[]</code></td><td class="text-center">Yes</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple</td><td>Configuration for multiple.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple-limit</td><td>Configuration for multiple limit.</td><td><code>number</code></td><td class="text-center">No</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-trigger</td><td>Configuration for expand trigger.</td><td><code>&#39;hover&#39; | &#39;click&#39;</code></td><td class="text-center">No</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-icon</td><td>Configuration for expand icon.</td><td><code>iconPropType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-icon</td><td>Configuration for dropdown icon.</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dynamic-load</td><td>Configuration for dynamic load.</td><td><code>(node: HCascaderDynamicLoadNode) =&gt; Promise&lt;HCascaderOption[]&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-icon</td><td>Configuration for selected icon.</td><td><code>iconPropType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-content`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "emptyText" }, null, _parent));
  _push(`</td><td>Configuration for empty content.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-text</td><td>Configuration for empty text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter</td><td>Configuration for filter.</td><td><code>boolean | HCascaderSearchParams</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filterable</td><td>Configuration for filterable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-method</td><td>Configuration for filter method.</td><td><code>HCascaderFilterFunction</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-able</td><td>Configuration for input able.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">search-panel-width</td><td>Configuration for search panel width.</td><td><code>string | number</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "needConfirm" }, null, _parent));
  _push(`</td><td>Configuration for confirm.</td><td><code>| boolean<br>      | {<br>          enterName: string;<br>          cancelName: string;<br>        }</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">need-confirm</td><td>Configuration for need confirm.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmButtonText" }, null, _parent));
  _push(`</td><td>Configuration for confirm btn text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-button-text</td><td>Configuration for confirm button text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-btn-text`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "cancelButtonText" }, null, _parent));
  _push(`</td><td>Configuration for cancel btn text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button-text</td><td>Configuration for cancel button text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">field-map</td><td>Configuration for field map.</td><td><code>Partial&lt;Record&lt;keyof HCascaderOption, keyof HCascaderOption | string&gt;&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-max-result</td><td>Configuration for filter max result.</td><td><code>number</code></td><td class="text-center">No</td><td>50</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-result-sort</td><td>Configuration for filter result sort.</td><td><code>HCascaderFilterSortFunction</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-filter-option</td><td>Configuration for panel filter option.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-filter-input-value</td><td>Configuration for panel filter input value.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-build-in-panel-filter</td><td>Configuration for use build in panel filter.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-input-placeholder</td><td>Configuration for panel input placeholder.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-radio</td><td>Configuration for show radio.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-panel-item-width</td><td>Configuration for max panel item width.</td><td><code>number | boolean</code></td><td class="text-center">No</td><td>254</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-tooltip</td><td>Configuration for show tooltip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>Configuration for placement.</td><td><code>| &#39;auto&#39;<br>      | &#39;auto-start&#39;<br>      | &#39;auto-end&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;<br>      | &#39;left&#39;</code></td><td class="text-center">No</td><td>&#39;bottom-start&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">flip</td><td>Configuration for flip.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-emit-frequency</td><td>Configuration for input emit frequency.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-max-lines</td><td>Configuration for option max lines.</td><td><code>number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">search-icon</td><td>Configuration for search icon.</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>() =&gt; IconCheck</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-input-width</td><td>Configuration for fit input width.</td><td><code>boolean | &#39;fit-content&#39;</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reserve-keyword</td><td>Configuration for reserve keyword.</td><td><code>boolean | &#39;reserve-deselect&#39;</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-show-after</td><td>Configuration for tooltip show after.</td><td><code>number</code></td><td class="text-center">No</td><td>100</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-hide-after</td><td>Configuration for tooltip hide after.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-content-input-min-width</td><td>Configuration for fit content input min width.</td><td><code>string | number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-filter-check-all</td><td>Configuration for use filter check all.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-check-all-summary</td><td>Configuration for use check all summary.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-all-summary-text</td><td>Configuration for check all summary text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-virtual-scroll</td><td>Configuration for use virtual scroll.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panels-loading</td><td>Configuration for panels loading.</td><td><code>boolean | LoadingOptions</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-popover-content-only</td><td>Configuration for show popover content only.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-tags-in-panel</td><td>Configuration for show tags in panel.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="cascader-emits" class="no-underline h3"><a href="#cascader-emits" class="!no-underline">Cascader Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-visible-change</td><td rowspan="1">Emitted when dropdown visible change changes.</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>The visible value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-visible-change`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "dropdownVisibleChange\n下拉面板显隐切换时通知" }, null, _parent));
  _push(`</td><td rowspan="1">Emitted when panel visible change changes.</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>The visible value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">Emitted when focus changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">Emitted when blur changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">input</td><td rowspan="1">Emitted when input changes.</td><td rowspan="1">( inputValue: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputValue</td><td><code>string</code></td><td>The input value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:options</td><td rowspan="1">Emitted when update:options changes.</td><td rowspan="1">( options: <code>HCascaderOption[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td><code>HCascaderOption[]</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">search</td><td rowspan="1">Emitted when search changes.</td><td rowspan="1">( searchValue: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">searchValue</td><td><code>string</code></td><td>The search value value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="2">Emitted when change changes.</td><td rowspan="2">( selectOrDeselect: <code>boolean</code>, option: <code>HCascaderExtendOption</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selectOrDeselect</td><td><code>boolean</code></td><td>The select or deselect value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option</td><td><code>HCascaderExtendOption</code></td><td>The option value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">Emitted when clear changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">select</td><td rowspan="2">Emitted when select changes.</td><td rowspan="2">( valuePath: <code>Array&lt;string | number&gt;</code>, option: <code>HCascaderExtendOption</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">valuePath</td><td><code>Array&lt;string | number&gt;</code></td><td>The value path value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option</td><td><code>HCascaderExtendOption</code></td><td>The option value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">deselect</td><td rowspan="2">Emitted when deselect changes.</td><td rowspan="2">( valuePath: <code>Array&lt;string | number&gt;</code>, option: <code>HCascaderExtendOption</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">valuePath</td><td><code>Array&lt;string | number&gt;</code></td><td>The value path value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option</td><td><code>HCascaderExtendOption</code></td><td>The option value.</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">modify</td><td rowspan="3">Emitted when modify changes.</td><td rowspan="3">( modelValue: <code>ModelValueType</code>, selectOrDeselect: <code>boolean</code>, option: <code>HCascaderExtendOption</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">modelValue</td><td><code>ModelValueType</code></td><td>The model value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selectOrDeselect</td><td><code>boolean</code></td><td>The select or deselect value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option</td><td><code>HCascaderExtendOption</code></td><td>The option value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-enter`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirm" }, null, _parent));
  _push(`</td><td rowspan="1">Emitted when confirm enter changes.</td><td rowspan="1">( modelValue: <code>ModelValueType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">modelValue</td><td><code>ModelValueType</code></td><td>The model value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm</td><td rowspan="1">Emitted when confirm changes.</td><td rowspan="1">( modelValue: <code>ModelValueType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">modelValue</td><td><code>ModelValueType</code></td><td>The model value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-cancel`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "cancel" }, null, _parent));
  _push(`</td><td rowspan="1">Emitted when confirm cancel changes.</td><td rowspan="1">( modelValue: <code>ModelValueType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">modelValue</td><td><code>ModelValueType</code></td><td>The model value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel</td><td rowspan="1">Emitted when cancel changes.</td><td rowspan="1">( modelValue: <code>ModelValueType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">modelValue</td><td><code>ModelValueType</code></td><td>The model value value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-reach-bottom</td><td rowspan="2">Emitted when panel reach bottom changes.</td><td rowspan="2">( evt: <code>Event | undefined</code>, parent: <code>HCascaderOption | null | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event | undefined</code></td><td>The evt value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">parent</td><td><code>HCascaderOption | null | undefined</code></td><td>The parent value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">Emitted when click changes.</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>The evt value.</td></tr></tbody></table><h3 id="cascader-exposes" class="no-underline h3"><a href="#cascader-exposes" class="!no-underline">Cascader Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">enterHandle`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmHandle" }, null, _parent));
  _push(`</td><td rowspan="1">Controls enter handle.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirmHandle</td><td rowspan="1">Controls confirm handle.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelHandle</td><td rowspan="1">Controls cancel handle.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">exposeConfirm`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "confirmHandle / cancelHandle" }, null, _parent));
  _push(`</td><td rowspan="3">Controls expose confirm.</td><td rowspan="3"><code>{<br>    enterHandle: () =&gt; void;<br>    confirmHandle: () =&gt; void;<br>    cancelHandle: () =&gt; void;<br>  }</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">enterHandle</td><td><code>() =&gt; void</code></td><td>确认操作</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirmHandle</td><td><code>() =&gt; void</code></td><td>确认操作</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelHandle</td><td><code>() =&gt; void</code></td><td>确认操作</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focusOption</td><td rowspan="1">Controls focus option.</td><td rowspan="1">( valuePath: <code>ModelValueSingleType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">valuePath</td><td><code>ModelValueSingleType</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">changePanelVisible</td><td rowspan="1">Controls change panel visible.</td><td rowspan="1">( status: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td><code>boolean</code></td><td>The status value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setInputAble</td><td rowspan="1">Controls set input able.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputChange</td><td rowspan="1">Controls input change.</td><td rowspan="1">( value: <code>string | null</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | null</code></td><td>The value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">Controls clear.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">renderedModelValueTags</td><td rowspan="1">Controls rendered model value tags.</td><td rowspan="1"><code>Ref&lt;Array&lt;VNode | JSX.Element&gt;&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">Controls focus.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">Controls blur.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Cascader.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Cascader = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Cascader as default
};
