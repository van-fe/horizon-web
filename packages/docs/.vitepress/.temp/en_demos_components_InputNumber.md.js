import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/InputNumber.md","filePath":"en/demos/components/InputNumber.md"}');
const _sfc_main = { name: "en/demos/components/InputNumber.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>InputNumber</h1><p class="description">Provides three sizes: <code>large</code>, <code>medium</code>, <code>small</code>, default is <code>medium</code>.</p><h2 id="different-sizes" tabindex="-1">Different Sizes <a class="header-anchor" href="#different-sizes" aria-label="Permalink to &quot;Different Sizes&quot;">​</a></h2><p>Provides three sizes: <code>large</code>, <code>medium</code>, <code>small</code>, default is <code>medium</code>.</p>`);
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
  _push(`<h2 id="different-styles" tabindex="-1">Different Styles <a class="header-anchor" href="#different-styles" aria-label="Permalink to &quot;Different Styles&quot;">​</a></h2><p>Provides three styles: <code>normal</code> <code>emphasize</code> <code>no-border</code>, default is <code>normal</code>.</p>`);
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
  _push(`<h2 id="input-box-with-step-and-max-min-values" tabindex="-1">Input Box with Step and Max/Min Values <a class="header-anchor" href="#input-box-with-step-and-max-min-values" aria-label="Permalink to &quot;Input Box with Step and Max/Min Values&quot;">​</a></h2><p>You can limit input items by setting <code>step</code> and <code>min</code>, <code>max</code>.</p>`);
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
  _push(`<h2 id="controller-position-hide-controller" tabindex="-1">Controller Position, Hide Controller <a class="header-anchor" href="#controller-position-hide-controller" aria-label="Permalink to &quot;Controller Position, Hide Controller&quot;">​</a></h2><p>In some business scenarios, the controller position needs to be changed to both sides</p><p>When you don&#39;t need to use the controller and only need the filter function, you can set <code>controls = false</code></p>`);
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
  _push(`<h2 id="disabled-state" tabindex="-1">Disabled State <a class="header-anchor" href="#disabled-state" aria-label="Permalink to &quot;Disabled State&quot;">​</a></h2>`);
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
  _push(`<h2 id="long-press" tabindex="-1">Long Press <a class="header-anchor" href="#long-press" aria-label="Permalink to &quot;Long Press&quot;">​</a></h2><p>In some scenarios, long pressing the controller is allowed to increase/decrease the value</p>`);
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
  _push(`<h2 id="clear" tabindex="-1">Clear <a class="header-anchor" href="#clear" aria-label="Permalink to &quot;Clear&quot;">​</a></h2><p>inputNumber allows clearing</p>`);
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
  _push(`<h2 id="placeholder-text" tabindex="-1">Placeholder Text <a class="header-anchor" href="#placeholder-text" aria-label="Permalink to &quot;Placeholder Text&quot;">​</a></h2>`);
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
  _push(`<h2 id="readonly" tabindex="-1">Readonly <a class="header-anchor" href="#readonly" aria-label="Permalink to &quot;Readonly&quot;">​</a></h2><p>After setting <code>readonly</code>, <code>controls</code> will not be displayed</p>`);
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
  _push(`<h2 id="prefix-suffix" tabindex="-1">Prefix/Suffix <a class="header-anchor" href="#prefix-suffix" aria-label="Permalink to &quot;Prefix/Suffix&quot;">​</a></h2><p>You can configure prefix and suffix</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div>\n    <h-row :gutter="12">\n      <h-col :span="8">\n        <div class="demo-title">前缀-默认状态</div>\n        <h-input-number :min="0" prefix-icon="points" />\n      </h-col>\n      <h-col :span="8">\n        <div class="demo-title">前缀-控制器位于两侧</div>\n        <h-input-number controls-position="between" :min="0" prefix-icon="points" />\n      </h-col>\n      <h-col :span="8">\n        <div class="demo-title">前缀-控制器隐藏</div>\n        <h-input-number :controls="false" :min="0" prefix-icon="points" />\n      </h-col>\n    </h-row>\n    <h-row :gutter="12">\n      <h-col :span="8">\n        <div class="demo-title">后缀-默认状态</div>\n        <h-input-number :min="0" suffix-icon="points" :clearable="true" />\n      </h-col>\n      <h-col :span="8">\n        <div class="demo-title">后缀-控制器位于两侧</div>\n        <h-input-number controls-position="between" :min="0" :clearable="true">\n          <template #suffix>RMB</template>\n        </h-input-number>\n      </h-col>\n      <h-col :span="8">\n        <div class="demo-title">后缀-控制器隐藏</div>\n        <h-input-number :controls="false" :min="0" suffix-icon="points" :clearable="true">\n          <template #suffix>RMB</template>\n        </h-input-number>\n      </h-col>\n    </h-row>\n    <h-row :gutter="12">\n      <h-col :span="8">\n        <div class="demo-title">前后缀-默认状态</div>\n        <h-input-number :min="0" suffix-icon="points">\n          <template #prefix>\n            <a-icon v-tooltip="`请注意，这里是积分`" name="remind" size="12" />\n          </template>\n        </h-input-number>\n      </h-col>\n      <h-col :span="8">\n        <div class="demo-title">前后缀-控制器位于两侧</div>\n        <h-input-number controls-position="between" :min="0" suffix-icon="points">\n          <template #prefix>\n            <a-icon v-tooltip="`请注意，这里是积分`" name="remind" size="12" />\n          </template>\n        </h-input-number>\n      </h-col>\n      <h-col :span="8">\n        <div class="demo-title">前后缀-控制器隐藏</div>\n        <h-input-number :controls="false" :min="0" suffix-icon="points">\n          <template #prefix>\n            <a-icon v-tooltip="`请注意，这里是积分`" name="remind" size="12" />\n          </template>\n        </h-input-number>\n      </h-col>\n    </h-row>\n  </div>\n</template>\n\n<script lang="ts">\nimport { defineComponent } from \'vue\';\nimport { AIcon } from \'@aurora/icon\';\n\nexport default defineComponent({\n  components: {\n    AIcon,\n  },\n});\n<\/script>\n',
    path: "demos/components/InputNumber/prefix-suffix.vue"
  }, null, _parent));
  _push(`<h2 id="combined-input-box" tabindex="-1">Combined Input Box <a class="header-anchor" href="#combined-input-box" aria-label="Permalink to &quot;Combined Input Box&quot;">​</a></h2><p>You can set prepend and append slots through <code>slots.prepend</code> <code>slots.append</code></p>`);
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
  _push(`<h2 id="number-conversion" tabindex="-1">Number Conversion <a class="header-anchor" href="#number-conversion" aria-label="Permalink to &quot;Number Conversion&quot;">​</a></h2><p>Convert numbers to the format you need through <code>formatter</code>, and then convert the formatted string to processable numbers through <code>parser</code></p>`);
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
  _push(`<h2 id="zero-padding" tabindex="-1">Zero Padding <a class="header-anchor" href="#zero-padding" aria-label="Permalink to &quot;Zero Padding&quot;">​</a></h2><p>Starting from <code>2.4.6</code>, if zero padding is needed, you need to set <code>string-mode = true</code></p>`);
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
  _push(`<h2 id="precision-update" tabindex="-1">Precision Update <a class="header-anchor" href="#precision-update" aria-label="Permalink to &quot;Precision Update&quot;">​</a></h2><p>Starting from <code>2.4.7</code>, you can listen to precision updates</p>`);
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
  _push(`<h2 id="inputnumber-api" class="no-underline h2"><a href="#inputnumber-api" class="!no-underline">InputNumber Api</a></h2><h3 id="inputnumber-props" class="no-underline h3"><a href="#inputnumber-props" class="!no-underline">InputNumber Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>number | string | null | undefined</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-style</td><td>Configuration for input style.</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;no-border&#39;</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min</td><td>Configuration for min.</td><td><code>number | string</code></td><td class="text-center">No</td><td>-Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max</td><td>Configuration for max.</td><td><code>number | string</code></td><td class="text-center">No</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">step</td><td>Configuration for step.</td><td><code>number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">step-strictly</td><td>Configuration for step strictly.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">precision</td><td>Configuration for precision.</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">controls</td><td>Configuration for controls.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">controls-position</td><td>Configuration for controls position.</td><td><code>&#39;between&#39; | &#39;right&#39;</code></td><td class="text-center">No</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>Configuration for name.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>Configuration for placeholder.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>Configuration for clearable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">readonly</td><td>Configuration for readonly.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">enable-lang-press</td><td>Configuration for enable lang press.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">lang-press-frequency</td><td>Configuration for lang press frequency.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prefix-icon</td><td>Configuration for prefix icon.</td><td><code>string | Component</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">suffix-icon</td><td>Configuration for suffix icon.</td><td><code>string | Component</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td>Configuration for status.</td><td><code>&#39;error&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">string-mode</td><td>Configuration for string mode.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">wheel-to-change</td><td>Configuration for wheel to change.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">formatter</td><td>Configuration for formatter.</td><td><code>(<br>        val: number | string,<br>        info: {<br>          userTyping: boolean;<br>          input?: string;<br>        },<br>      ) =&gt; string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">parser</td><td>Configuration for parser.</td><td><code>(val: string) =&gt; number | string</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3 id="inputnumber-emits" class="no-underline h3"><a href="#inputnumber-emits" class="!no-underline">InputNumber Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">input</td><td rowspan="1">Emitted when input changes.</td><td rowspan="1">( value: <code>number | string | null</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>number | string | null</code></td><td>The value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">Emitted when change changes.</td><td rowspan="1">( value: <code>number | string | null | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>number | string | null | undefined</code></td><td>The value value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">Emitted when focus changes.</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>The evt value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">Emitted when blur changes.</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>The evt value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">Emitted when clear changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">keydown</td><td rowspan="1">Emitted when keydown changes.</td><td rowspan="1">( evt: <code>KeyboardEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>KeyboardEvent</code></td><td>The evt value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">keypress</td><td rowspan="1">Emitted when keypress changes.</td><td rowspan="1">( evt: <code>KeyboardEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>KeyboardEvent</code></td><td>The evt value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">keyup</td><td rowspan="1">Emitted when keyup changes.</td><td rowspan="1">( evt: <code>KeyboardEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>KeyboardEvent</code></td><td>The evt value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">wheel</td><td rowspan="1">Emitted when wheel changes.</td><td rowspan="1">( evt: <code>WheelEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>WheelEvent</code></td><td>The evt value.</td></tr></tbody></table><h3 id="inputnumber-exposes" class="no-underline h3"><a href="#inputnumber-exposes" class="!no-underline">InputNumber Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputNumber</td><td rowspan="1">Controls input number.</td><td rowspan="1"><code>HTMLInputElement</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">increase</td><td rowspan="1">Controls increase.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">decrease</td><td rowspan="1">Controls decrease.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">Controls clear.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/InputNumber.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const InputNumber = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  InputNumber as default
};
