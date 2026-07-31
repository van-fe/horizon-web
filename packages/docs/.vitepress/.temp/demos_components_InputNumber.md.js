import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/InputNumber.md","filePath":"zh/demos/components/InputNumber.md"}');
const _sfc_main = { name: "demos/components/InputNumber.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>InputNumber</h1><p class="description">提供一个数字输入框，可以设置最小值、最大值和步长等，返回一个数字</p><h2 id="不同尺寸" tabindex="-1">不同尺寸 <a class="header-anchor" href="#不同尺寸" aria-label="Permalink to &quot;不同尺寸&quot;">​</a></h2><p>提供 <code>large</code>、<code>medium</code>、<code>small</code>三个尺寸，默认为 <code>medium</code>。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0);

function onInput(value: number) {
  console.info('input', value);
}

function onChange(value: number) {
  console.info('change', value);
}
<\/script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">large</div>
      <h-input-number v-model="value" size="large" @input="onInput" @change="onChange" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">medium (default)</div>
      <h-input-number v-model="value" @input="onInput" @change="onChange" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">small</div>
      <h-input-number v-model="value" size="small" @input="onInput" @change="onChange" />
    </h-col>
  </h-row>
</template>
`,
    path: "demos/components/InputNumber/size.vue"
  }, null, _parent));
  _push(`<h2 id="不同样式" tabindex="-1">不同样式 <a class="header-anchor" href="#不同样式" aria-label="Permalink to &quot;不同样式&quot;">​</a></h2><p>提供了 <code>normal</code> <code>emphasize</code> <code>no-border</code> 三种样式，默认为 <code>normal</code>。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const value = ref(20);
const style = ref('normal');
const disabled = ref(false);
const clearable = ref(false);
<\/script>

<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="style">
      <h-radio-group v-model="style">
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
    <h-form-item label="clearable">
      <h-radio-group v-model="clearable">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">large</div>
      <h-input-number v-model="value" :input-style="style" :disabled="disabled" :clearable="clearable" size="large" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">medium (default)</div>
      <h-input-number v-model="value" :input-style="style" :disabled="disabled" :clearable="clearable" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">small</div>
      <h-input-number v-model="value" :input-style="style" :disabled="disabled" :clearable="clearable" size="small" />
    </h-col>
  </h-row>
</template>
`,
    path: "demos/components/InputNumber/style.vue"
  }, null, _parent));
  _push(`<h2 id="带有步长和最大最小值的输入框" tabindex="-1">带有步长和最大最小值的输入框 <a class="header-anchor" href="#带有步长和最大最小值的输入框" aria-label="Permalink to &quot;带有步长和最大最小值的输入框&quot;">​</a></h2><p>通过设置<code>step</code>和<code>min</code>, <code>max</code>可限制输入项。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const value2 = ref(0);
const value3 = ref();

function onChange(val: number) {
  console.info('change: ', val);
}

function onUpdate(val: number) {
  console.info('update: ', val);
}
<\/script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">步长默认</div>
      <h-input-number v-model="value1" :min="5" :max="10" @change="onChange" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">步长为0.5</div>
      <h-input-number v-model="value2" :min="5" :max="10" :step="0.5" :precision="1" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">数值必须是步长的倍数，步长为3</div>
      <h-input-number v-model="value3" :min="0" :max="10" :step="3" :step-strictly="true" @update:modelValue="onUpdate" @change="onChange" />
    </h-col>
  </h-row>
</template>
`,
    path: "demos/components/InputNumber/range.vue"
  }, null, _parent));
  _push(`<h2 id="控制器位置、隐藏控制器" tabindex="-1">控制器位置、隐藏控制器 <a class="header-anchor" href="#控制器位置、隐藏控制器" aria-label="Permalink to &quot;控制器位置、隐藏控制器&quot;">​</a></h2><p>某些业务场景下，控制器位置需要变为两侧</p><p>在不需要使用控制器、仅需要过滤功能时可以设置 <code>controls = false</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(1);

    return {
      value,
    };
  },
});
<\/script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">默认（居右）</div>
      <h-input-number v-model="value" :min="0" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">两侧</div>
      <h-input-number v-model="value" controls-position="between" :min="0" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">隐藏</div>
      <h-input-number v-model="value" :controls="false" :min="0" />
    </h-col>
  </h-row>
</template>
`,
    path: "demos/components/InputNumber/controls-position.vue"
  }, null, _parent));
  _push(`<h2 id="禁用状态" tabindex="-1">禁用状态 <a class="header-anchor" href="#禁用状态" aria-label="Permalink to &quot;禁用状态&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref(12);
const value3 = ref(12);
<\/script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">默认（居右）</div>
      <h-input-number v-model="value" disabled />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">两侧</div>
      <h-input-number v-model="value2" controls-position="between" disabled />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">隐藏</div>
      <h-input-number v-model="value3" :controls="false" disabled />
    </h-col>
  </h-row>
</template>
`,
    path: "demos/components/InputNumber/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="长按" tabindex="-1">长按 <a class="header-anchor" href="#长按" aria-label="Permalink to &quot;长按&quot;">​</a></h2><p>在某些场景下，允许长按控制器以增加/减少值</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">默认</div>
      <h-input-number v-model="value" enable-lang-press />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">两侧（设置了步长）</div>
      <h-input-number v-model="value" enable-lang-press controls-position="between" :step="5" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0);
<\/script>
`,
    path: "demos/components/InputNumber/lang-press.vue"
  }, null, _parent));
  _push(`<h2 id="清空" tabindex="-1">清空 <a class="header-anchor" href="#清空" aria-label="Permalink to &quot;清空&quot;">​</a></h2><p>inputNumber 允许清空</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
<\/script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">large</div>
      <h-input-number v-model="value" size="large" clearable />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">medium (default)</div>
      <h-input-number v-model="value" clearable />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">small</div>
      <h-input-number v-model="value" size="small" clearable />
    </h-col>
  </h-row>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">默认</div>
      <h-input-number v-model="value" clearable />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">控制器位于两侧</div>
      <h-input-number v-model="value" controls-position="between" clearable />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">控制器隐藏</div>
      <h-input-number v-model="value" :controls="false" clearable />
    </h-col>
  </h-row>
</template>
`,
    path: "demos/components/InputNumber/clearable.vue"
  }, null, _parent));
  _push(`<h2 id="占位文字" tabindex="-1">占位文字 <a class="header-anchor" href="#占位文字" aria-label="Permalink to &quot;占位文字&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
<\/script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">默认状态</div>
      <h-input-number v-model="value" placeholder="占位文字" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">控制器位于两侧</div>
      <h-input-number v-model="value" controls-position="between" placeholder="占位文字" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">控制器隐藏</div>
      <h-input-number v-model="value" :controls="false" placeholder="占位文字" />
    </h-col>
  </h-row>
</template>
`,
    path: "demos/components/InputNumber/placeholder.vue"
  }, null, _parent));
  _push(`<h2 id="只读" tabindex="-1">只读 <a class="header-anchor" href="#只读" aria-label="Permalink to &quot;只读&quot;">​</a></h2><p>设置了 <code>readonly</code> 后，也不显示 <code>controls</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const value = ref(32);
<\/script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <h-input-number v-model="value" readonly />
    </h-col>
  </h-row>
</template>
`,
    path: "demos/components/InputNumber/readonly.vue"
  }, null, _parent));
  _push(`<h2 id="前后缀" tabindex="-1">前后缀 <a class="header-anchor" href="#前后缀" aria-label="Permalink to &quot;前后缀&quot;">​</a></h2><p>可以配置前后缀</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div>\n    <h-row :gutter="12">\n      <h-col :span="8">\n        <div class="demo-title">前缀-默认状态</div>\n        <h-input-number :min="0" prefix-icon="points" />\n      </h-col>\n      <h-col :span="8">\n        <div class="demo-title">前缀-控制器位于两侧</div>\n        <h-input-number controls-position="between" :min="0" prefix-icon="points" />\n      </h-col>\n      <h-col :span="8">\n        <div class="demo-title">前缀-控制器隐藏</div>\n        <h-input-number :controls="false" :min="0" prefix-icon="points" />\n      </h-col>\n    </h-row>\n    <h-row :gutter="12">\n      <h-col :span="8">\n        <div class="demo-title">后缀-默认状态</div>\n        <h-input-number :min="0" suffix-icon="points" :clearable="true" />\n      </h-col>\n      <h-col :span="8">\n        <div class="demo-title">后缀-控制器位于两侧</div>\n        <h-input-number controls-position="between" :min="0" :clearable="true">\n          <template #suffix>RMB</template>\n        </h-input-number>\n      </h-col>\n      <h-col :span="8">\n        <div class="demo-title">后缀-控制器隐藏</div>\n        <h-input-number :controls="false" :min="0" suffix-icon="points" :clearable="true">\n          <template #suffix>RMB</template>\n        </h-input-number>\n      </h-col>\n    </h-row>\n    <h-row :gutter="12">\n      <h-col :span="8">\n        <div class="demo-title">前后缀-默认状态</div>\n        <h-input-number :min="0" suffix-icon="points">\n          <template #prefix>\n            <a-icon v-tooltip="`请注意，这里是积分`" name="remind" size="12" />\n          </template>\n        </h-input-number>\n      </h-col>\n      <h-col :span="8">\n        <div class="demo-title">前后缀-控制器位于两侧</div>\n        <h-input-number controls-position="between" :min="0" suffix-icon="points">\n          <template #prefix>\n            <a-icon v-tooltip="`请注意，这里是积分`" name="remind" size="12" />\n          </template>\n        </h-input-number>\n      </h-col>\n      <h-col :span="8">\n        <div class="demo-title">前后缀-控制器隐藏</div>\n        <h-input-number :controls="false" :min="0" suffix-icon="points">\n          <template #prefix>\n            <a-icon v-tooltip="`请注意，这里是积分`" name="remind" size="12" />\n          </template>\n        </h-input-number>\n      </h-col>\n    </h-row>\n  </div>\n</template>\n\n<script lang="ts">\nimport { defineComponent } from \'vue\';\nimport { AIcon } from \'@aurora/icon\';\n\nexport default defineComponent({\n  components: {\n    AIcon,\n  },\n});\n<\/script>\n',
    path: "demos/components/InputNumber/prefix-suffix.vue"
  }, null, _parent));
  _push(`<h2 id="组合式输入框" tabindex="-1">组合式输入框 <a class="header-anchor" href="#组合式输入框" aria-label="Permalink to &quot;组合式输入框&quot;">​</a></h2><p>可以通过 <code>slots.prepend</code> <code>slots.append</code> 设置前后组合插槽</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-row :gutter="12">
      <h-col :span="12">
        <h-input-number :min="0">
          <template #prepend>
            Age:
          </template>
        </h-input-number>
      </h-col>
      <h-col :span="12">
        <h-input-number controls-position="between" :min="0">
          <template #append>
            Points
          </template>
        </h-input-number>
      </h-col>
    </h-row>
    <h-row :gutter="12">
      <h-col :span="24">
        <h-input-number :min="0" :clearable="true" placeholder="The Age...">
          <template #prepend>
            <h-select v-model="ageType" placeholder="Solar or Lunar" clearable>
              <h-option label="Solar Age" value="1"></h-option>
              <h-option label="Lunar Age" value="2"></h-option>
            </h-select>
          </template>
        </h-input-number>
      </h-col>
    </h-row>
    <h-row :gutter="12">
      <h-col :span="24">
        <h-input-number :min="0" :clearable="true" placeholder="The Weight...">
          <template #append>
            <h-select v-model="weightUnit" placeholder="Kg or g" clearable>
              <h-option label="Kg" value="1"></h-option>
              <h-option label="g" value="2"></h-option>
            </h-select>
          </template>
        </h-input-number>
      </h-col>
    </h-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const ageType = ref(null);
const weightUnit = ref(null);
<\/script>
`,
    path: "demos/components/InputNumber/prepend-append.vue"
  }, null, _parent));
  _push(`<h2 id="数字转化" tabindex="-1">数字转化 <a class="header-anchor" href="#数字转化" aria-label="Permalink to &quot;数字转化&quot;">​</a></h2><p>通过 <code>formatter</code> 将数字转化为你需要的格式，然后通过 <code>parser</code> 将格式化后的字符串转化为可以处理的数字</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(1000);
const value2 = ref(100);

<\/script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">千分位</div>
      <h-input-number
        v-model="value1"
        :formatter="(val: string) => \`$ \${val.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')}\`"
        :parser="(val: string) => val.replace(/\\$\\s?|(,*)/g, '')"
      />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">带百分号</div>
      <h-input-number
        v-model="value2"
        :min="0"
        :max="100"
        :formatter="(value: string) => \`\${value}%\`"
        :parser="(value: string) => value.replace(/%/g, '')"  />
    </h-col>
  </h-row>
</template>
`,
    path: "demos/components/InputNumber/formatter.vue"
  }, null, _parent));
  _push(`<h2 id="补零" tabindex="-1">补零 <a class="header-anchor" href="#补零" aria-label="Permalink to &quot;补零&quot;">​</a></h2><p><code>2.4.6</code> 开始，如果需要补零，则需要设置 <code>string-mode = true</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(null);
const value2 = ref(null);
<\/script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">默认模式</div>
      <h-input-number v-model="value1" :precision="4" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">字符串模式</div>
      <h-input-number v-model="value2" :precision="4" :string-mode="true" />
    </h-col>
  </h-row>
</template>
`,
    path: "demos/components/InputNumber/reserve-decimal-separator.vue"
  }, null, _parent));
  _push(`<h2 id="精度更新" tabindex="-1">精度更新 <a class="header-anchor" href="#精度更新" aria-label="Permalink to &quot;精度更新&quot;">​</a></h2><p><code>2.4.7</code> 开始，可以监听精度的更新</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(100000);
const value2 = ref(100000);
const precision = ref(2);
<\/script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">精度</div>
      <h-input-number v-model="precision" :min="0" :max="4" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">默认模式</div>
      <h-input-number v-model="value1" :step="0.01" :max="9999.99" :precision="precision" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">字符串模式</div>
      <h-input-number v-model="value2" :step="0.01" :max="9999.99" :precision="precision" :string-mode="true" />
    </h-col>
  </h-row>
</template>
`,
    path: "demos/components/InputNumber/precision-update.vue"
  }, null, _parent));
  _push(`<h2 id="inputnumber-api" class="no-underline h2"><a href="#inputnumber-api" class="!no-underline">InputNumber Api</a></h2><h3 id="inputnumber-props" class="no-underline h3"><a href="#inputnumber-props" class="!no-underline">InputNumber Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>选中项绑定值</td><td><code>number | string | null | undefined</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-style</td><td>输入框样式</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;no-border&#39;</code></td><td class="text-center">否</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min</td><td>最小值</td><td><code>number | string</code></td><td class="text-center">否</td><td>-Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max</td><td>最大值</td><td><code>number | string</code></td><td class="text-center">否</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">step</td><td>步长</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">step-strictly</td><td>是否仅允许输入步长的倍数</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">precision</td><td>数值精度的位数</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">controls</td><td>是否使用控制按钮</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">controls-position</td><td>控制按钮的位置</td><td><code>&#39;between&#39; | &#39;right&#39;</code></td><td class="text-center">否</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>原生 <code>name</code> 属性</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>输入框 <code>placeholder</code></td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>是否允许清空</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">readonly</td><td>是否只读，原生属性<br>如果设置为 <code>true</code> 则也不会显示 <code>controls</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">enable-lang-press</td><td>是否允许长按</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">lang-press-frequency</td><td>长按触发频率，单位ms</td><td><code>number</code></td><td class="text-center">否</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prefix-icon</td><td>前缀 Icon name 或 iconSvg 对象</td><td><code>string | Component</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">suffix-icon</td><td>后缀 Icon name 或 iconSvg 对象</td><td><code>string | Component</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td>输入框状态</td><td><code>&#39;error&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">string-mode</td><td>是否是字符串模式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">wheel-to-change</td><td>是否允许鼠标滚动改变数值</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">formatter</td><td>指定输入框展示值的格式</td><td><code>(<br>        val: number | string,<br>        info: {<br>          userTyping: boolean;<br>          input?: string;<br>        },<br>      ) =&gt; string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">parser</td><td>从 <code>formatter</code> 里转换回数字的方法，必须和 <code>formatter</code> 搭配使用</td><td><code>(val: string) =&gt; number | string</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3 id="inputnumber-emits" class="no-underline h3"><a href="#inputnumber-emits" class="!no-underline">InputNumber Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">input</td><td rowspan="1">在 Input 值改变时触发</td><td rowspan="1">( value: <code>number | string | null</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>number | string | null</code></td><td>input值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">在 Input 失去焦点且值发生变化时触发</td><td rowspan="1">( value: <code>number | string | null | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>number | string | null | undefined</code></td><td>input值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">在 Input 获得焦点时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>聚焦事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">在 Input 失去焦点时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">在点击由 clearable 属性生成的清空按钮时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">keydown</td><td rowspan="1">键盘按键按下事件</td><td rowspan="1">( evt: <code>KeyboardEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>KeyboardEvent</code></td><td>键盘事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">keypress</td><td rowspan="1">键盘按键事件</td><td rowspan="1">( evt: <code>KeyboardEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>KeyboardEvent</code></td><td>键盘事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">keyup</td><td rowspan="1">键盘按键按下后抬起事件</td><td rowspan="1">( evt: <code>KeyboardEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>KeyboardEvent</code></td><td>键盘事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">wheel</td><td rowspan="1">鼠标滚轮事件</td><td rowspan="1">( evt: <code>WheelEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>WheelEvent</code></td><td>滚轮事件</td></tr></tbody></table><h3 id="inputnumber-exposes" class="no-underline h3"><a href="#inputnumber-exposes" class="!no-underline">InputNumber Exposes</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputNumber</td><td rowspan="1">获取到内部的 <code>input</code> 原生元素</td><td rowspan="1"><code>HTMLInputElement</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">increase</td><td rowspan="1">增加值</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">decrease</td><td rowspan="1">减少值</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">清空</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/InputNumber.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const InputNumber = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  InputNumber as default
};
