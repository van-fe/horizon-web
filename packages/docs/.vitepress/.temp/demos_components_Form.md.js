import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Form.md","filePath":"zh/demos/components/Form.md"}');
const _sfc_main = { name: "demos/components/Form.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Form</h1><p class="description">由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据</p><h2 id="基础表单" tabindex="-1">基础表单 <a class="header-anchor" href="#基础表单" aria-label="Permalink to &quot;基础表单&quot;">​</a></h2><p>在 <code>n-form-item</code> 的 <code>label</code> 属性上设置表单项的标签，默认情况下，标签展示在上方。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="User name">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <h-form-item>
      <h-button @click="submit">Submit</h-button>
    </h-form-item>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });
    const submit = () => {
      console.info('formData:', formData.value);
      $message.success('Submit');
    };
    return {
      formData,
      submit,
    };
  },
});
<\/script>
`,
    path: "demos/components/Form/basic.vue"
  }, null, _parent));
  _push(`<h2 id="大小" tabindex="-1">大小 <a class="header-anchor" href="#大小" aria-label="Permalink to &quot;大小&quot;">​</a></h2><p>可以通过 <code>n-form</code> 控制组件大小</p><p><code>size</code> 可以覆盖通过 <code>n-application</code> 设置的 <code>size</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col>
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
      </h-radio-group>
    </h-col>
  </h-row>
  <h-form :size="size">
    <h-form-item label="User name">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <h-form-item>
      <h-button @click="submit">Submit</h-button>
    </h-form-item>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });

    const size = ref('medium');

    const submit = () => {
      console.info('formData:', formData.value);
      $message.success('Submit');
    };
    return {
      formData,
      submit,
      size,
    };
  },
});
<\/script>
`,
    path: "demos/components/Form/size.vue"
  }, null, _parent));
  _push(`<h2 id="提示帮助" tabindex="-1">提示帮助 <a class="header-anchor" href="#提示帮助" aria-label="Permalink to &quot;提示帮助&quot;">​</a></h2><p>一般在表单尾部可以设置一个 <code>popover</code> 提示，只需要给 <code>form-item</code> 配置一个 <code>helper</code> 即可</p><p>提示帮助默认放在表单的最右侧(<code>&#39;right&#39;</code>)，你也可以给 <code>helper-placement</code> 传入 <code>&#39;after-label&#39;</code> <code>&#39;before-label&#39;</code> 控制位置</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="helper主题">
      <h-radio-group v-model="helperTheme">
        <h-radio label="light" />
        <h-radio label="dark" />
      </h-radio-group>
    </h-form-item>
  </h-form>

  <h-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    :helper-theme="helperTheme"
    @submit="submit"
  >
    <h-form-item label="input style" prop="inputStyle">
      <h-radio-group v-model="formData.inputStyle" size="medium">
        <h-radio v-for="item in ['normal', 'emphasize', 'no-border']" :key="item" :label="item" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="Username" prop="username" :validate-trigger="['change']">
      <h-input
        v-model="formData.username"
        :input-style="formData.inputStyle"
        placeholder="Please enter your username"
        :clearable="true"
      />
    </h-form-item>
    <h-form-item
      label="Age"
      prop="age"
      helper-placement="after-label"
      :validate-trigger="['change']"
    >
      <template #helper>Age is between 0 to 120</template>
      <h-input-number
        v-model="formData.age"
        placeholder="Please enter your age"
        :input-style="formData.inputStyle"
        :min="0"
        :max="120"
        :clearable="true"
        @input="onInput"
        @change="onChange"
      />
    </h-form-item>
    <h-form-item label="Province" prop="province">
      <h-select v-model="formData.province" :input-style="formData.inputStyle" placeholder="Please select">
        <h-option label="Beijing" value="beijing" />
        <h-option label="Shanghai" value="shanghai" />
        <h-option label="Hefei" value="hefei" />
      </h-select>
    </h-form-item>
    <h-form-item label="Date" prop="date" :helper="dateHelper">
      <h-date-picker
        v-model="formData.date"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        start-placeholder="Start date"
        end-placeholder="End date"
        :input-style="formData.inputStyle"
      />
    </h-form-item>
    <h-form-item label="Switch" prop="switch">
      <h-switch v-model="formData.switch" />
    </h-form-item>
    <h-form-item label="Remark" tip="Hint or Error Message" prop="remark">
      <h-input
        v-model="formData.remark"
        placeholder="Type something"
        :input-style="formData.inputStyle"
        :show-limit="true"
        :maxlength="100"
        type="textarea"
      />
    </h-form-item>
    <h-form-item>
      <h-button native-type="submit">Submit</h-button>
    </h-form-item>
  </h-form>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { $message, HFormRule, HFormItemHelper, HFormInstance } from '@aurora/horizon-web';

const helperTheme = ref('light');

const formRef = ref<(HTMLElement & HFormInstance) | null>(null);
const formData = ref({
  inputStyle: 'normal',
  username: '',
  age: null,
  province: null,
  date: [],
  switch: true,
  remark: '',
});

const submit = () => {
  console.info('formData:', formData.value);
  formRef.value
    ?.validate()
    .then(() => {
      $message.success('Submit');
    })
    .catch(err => {
      $message.error(err[0]);
    });
};

const rules: Partial<Record<keyof (typeof formData)['value'], HFormRule | HFormRule[]>> = {
  username: {
    required: true,
    message: 'Please enter your username',
  },
  age: [
    {
      required: true,
      message: 'Please enter your age',
    },
    {
      min: 0,
      max: 120,
      type: 'number',
      message: 'Age is between 0 - 120',
    },
  ],
  province: {
    required: true,
    message: 'Please pick your location',
  },
  date: {
    required: true,
    message: 'Please pick your wish time which you will be free',
  },
};

const dateHelper: HFormItemHelper = {
  title: 'Tips',
  content: () => h('div', 'Please pick your wish time which you will be free'),
};

function onInput() {
  console.info('input:', formData.value.age);
}

function onChange() {
  console.info('change:', formData.value.age);
}

<\/script>
`,
    path: "demos/components/Form/tips-helper.vue"
  }, null, _parent));
  _push(`<h2 id="标签配置" tabindex="-1">标签配置 <a class="header-anchor" href="#标签配置" aria-label="Permalink to &quot;标签配置&quot;">​</a></h2><p>你可以通过 <code>label-position</code> 控制标签的位置，当标签位于左侧时，还可以通过 <code>label-justify-align</code> 控制标签的水平对齐方式，<code>label-vertical-align</code> 控制标签的垂直对齐方式。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex align-center mb-6">
    <div class="mr-4">标签位置</div>
    <h-radio-group v-model="labelPosition" size="small">
      <h-radio-button label="top" />
      <h-radio-button label="left" />
    </h-radio-group>
    <div class="ml-6 mr-4">水平对齐</div>
    <h-radio-group v-model="labelJustifyAlign" size="small">
      <h-radio-button label="left" />
      <h-radio-button label="right" />
    </h-radio-group>
    <div class="ml-6 mr-4">垂直对齐</div>
    <h-radio-group v-model="labelVerticalAlign" size="small">
      <h-radio-button label="top" />
      <h-radio-button label="middle" />
    </h-radio-group>
  </div>
  <h-form
    :label-position="labelPosition"
    :label-justify-align="labelJustifyAlign"
    :label-vertical-align="labelVerticalAlign"
  >
    <h-form-item label="User name">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <h-form-item>
      <template #label></template>
      <h-button @click="submit">Submit</h-button>
    </h-form-item>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });
    const labelPosition = ref('top');
    const labelJustifyAlign = ref('left');
    const labelVerticalAlign = ref('top');
    const submit = () => {
      console.info('formData:', formData.value);
      $message.success('Submit');
    };
    return {
      formData,
      labelPosition,
      labelJustifyAlign,
      labelVerticalAlign,
      submit,
    };
  },
});
<\/script>
`,
    path: "demos/components/Form/label-position.vue"
  }, null, _parent));
  _push(`<h2 id="行内表单" tabindex="-1">行内表单 <a class="header-anchor" href="#行内表单" aria-label="Permalink to &quot;行内表单&quot;">​</a></h2><p>如果表单项数量较少，且都是 <code>n-input</code> 这样高度较小的简单组件，可以通过设置 <code>inline</code> 为 <code>true</code> 启用行内表单。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form inline>
    <h-form-item label="User name">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item>
      <template #label>&nbsp;</template>
      <h-button size="medium" @click="submit">Submit</h-button>
    </h-form-item>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });
    const submit = () => {
      console.info('formData:', formData.value);
      $message.success('Submit');
    };
    return {
      formData,
      submit,
    };
  },
});
<\/script>
`,
    path: "demos/components/Form/inline.vue"
  }, null, _parent));
  _push(`<h2 id="添加验证规则" tabindex="-1">添加验证规则 <a class="header-anchor" href="#添加验证规则" aria-label="Permalink to &quot;添加验证规则&quot;">​</a></h2><p>你可以给表单添加验证规则，以判断表单项的绑定值是否符合预期。<br> 首先给 <code>n-form</code> 组件设置 <code>model</code> 属性，这是整个表单域中所有绑定字段的集合。<br> 然后给需要校验的的 <code>n-form-item</code> 添加 <code>prop</code> 属性，它应该是 <code>model</code> 中的字段名，并给 <code>rules</code> 属性传入验证规则。详细用法参见 <a href="https://github.com/yiminghe/async-validator#rules" target="_blank" rel="noreferrer">async-validator#rules</a>。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form ref="formRef" :model="formData">
    <h-form-item
      label="User name"
      prop="username"
      :rules="[
        {
          required: true,
          message: 'User name is required!',
        },
        {
          min: 3,
          max: 100,
          message: 'User name should be 3 to 100.',
        },
      ]"
    >
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :rules="emailRules">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <div>
      <h-button @click="submit">Submit</h-button>
    </div>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HFormInstance } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const formRef = ref<HFormInstance | null>(null);
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });
    const emailRules = ref([
      {
        required: true,
        message: 'Email is required!',
      },
      {
        type: 'email',
        message: 'Email format invalid!',
      },
      {
        validator(rule, value: string) {
          if (!value.endsWith('@gmail.com')) {
            return new Error('Only support gmail!');
          }
          return true;
        },
      },
    ]);

    const submit = () => {
      if (formRef.value) {
        formRef.value
          ?.validate()
          .then(() => {
            $message.success('Submit');
          })
          .catch(errors => {
            console.info('errors:', errors);
          });
      }
    };

    return {
      formData,
      emailRules,
      formRef,
      submit,
    };
  },
});
<\/script>
`,
    path: "demos/components/Form/validate.vue"
  }, null, _parent));
  _push(`<h2 id="验证后清空验证结果" tabindex="-1">验证后清空验证结果 <a class="header-anchor" href="#验证后清空验证结果" aria-label="Permalink to &quot;验证后清空验证结果&quot;">​</a></h2><p>验证某个表单后，如果想清空验证结果，可以对 <code>n-form</code> 使用 <code>clearValidate</code> 去清空验证结果，也可以针对 <code>n-form-item</code> 使用<code>clearValidate</code> 去清空验证结果</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col>
      <div class="mr-4">必填星号位置</div>
      <h-radio-group v-model="requireMarkPosition" size="small">
        <h-radio-button label="left" />
        <h-radio-button label="right" />
      </h-radio-group>
    </h-col>
  </h-row>
  <h-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    :require-mark-position="requireMarkPosition"
    scroll-to-error
    @submit="submit()"
  >
    <h-form-item label="User name" prop="username">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Province" prop="province">
      <h-select v-model="formData.province" placeholder="Please select">
        <h-option label="Beijing" value="beijing" />
        <h-option label="Shanghai" value="shanghai" />
        <h-option label="Hefei" value="hefei" />
      </h-select>
    </h-form-item>
    <h-form-item label="Notes" prop="notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <div>
      <h-button native-type="submit">Submit</h-button>
      <h-button :plain="true" @click="clearValidate">Clear Validate</h-button>
      <h-button :plain="true" @click="resetFields">Reset Fields</h-button>
    </div>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HFormInstance, HFormRule } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const formRef = ref<HFormInstance | null>(null);
    const formData = ref({
      username: '',
      email: '',
      notes: '',
      province: null,
    });

    const requireMarkPosition = ref('right');

    const rules = ref<Partial<Record<keyof typeof formData.value, HFormRule | HFormRule[]>>>({
      username: [
        {
          required: true,
          message: 'User name is required!',
        },
        {
          min: 3,
          max: 100,
          message: 'User name should be 3 to 100.',
        },
      ],
      email: [
        {
          required: true,
          message: 'Email is required!',
        },
        {
          type: 'email',
          message: 'Email format invalid!',
        },
        {
          validator(rule, value: string | null) {
            if (!value?.endsWith('@gmail.com')) {
              return new Error('Only support gmail!');
            }
            return true;
          },
        },
      ],
    });

    const submit = () => {
      if (formRef.value) {
        formRef.value
          .validate()
          .then(() => {
            $message.success('Submit');
          })
          .catch(errors => {
            console.info('errors:', errors);
          });
      }
    };

    const clearValidate = () => {
      formRef.value?.clearValidate();
    };

    const resetFields = () => {
      formRef.value?.resetFields();
    };

    return {
      formData,
      formRef,
      submit,
      rules,
      clearValidate,
      resetFields,
      requireMarkPosition,
    };
  },
});
<\/script>

<style>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
`,
    path: "demos/components/Form/clear-validate.vue"
  }, null, _parent));
  _push(`<h2 id="配合验证状态控制提交按钮" tabindex="-1">配合验证状态控制提交按钮 <a class="header-anchor" href="#配合验证状态控制提交按钮" aria-label="Permalink to &quot;配合验证状态控制提交按钮&quot;">​</a></h2><p>可以通过监听 <code>validate</code> 来控制提交按钮是否可以点击</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form ref="formRef" :model="formData" validate-trigger="change" @validate="onValidateChange">
    <h-form-item
      label="User name"
      prop="username"
      :rules="[
        {
          required: true,
          message: 'User name is required!',
        },
        {
          min: 3,
          max: 100,
          message: 'User name should be 3 to 100.',
        },
      ]"
    >
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :rules="emailRules">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <div>
      <h-button :disabled="!canSubmit" @click="submit">Submit</h-button>
    </div>
  </h-form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import type { HFormInstance } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const formRef = ref<HFormInstance | null>(null);
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });

    const validateInfo = ref<Record<string, boolean>>({
      username: false,
      email: false,
      notes: true,
    });

    const canSubmit = computed(() => !Object.values(validateInfo.value).some(curr => !curr));

    const emailRules = ref([
      {
        required: true,
        message: 'Email is required!',
      },
      {
        type: 'email',
        message: 'Email format invalid!',
      },
      {
        validator(rule: any, value: string) {
          if (!value.endsWith('@gmail.com')) {
            return new Error('Only support gmail!');
          }
          return true;
        },
      },
    ]);

    const submit = () => {
      if (formRef.value) {
        formRef.value
          .validate()
          .then(() => {
            $message.success('Submit');
          })
          .catch(errors => {
            console.info('errors:', errors);
          });
      }
    };

    const onValidateChange = (
      prop: keyof (typeof formData)['value'],
      isValidated: boolean,
      message?: string,
    ) => {
      console.info(\`[\${prop}] field is \${isValidated}\${isValidated ? '' : \`: \${message}\`}\`);
      validateInfo.value[prop] = isValidated;
    };

    return {
      formData,
      emailRules,
      formRef,
      submit,
      canSubmit,
      onValidateChange,
      validateInfo,
    };
  },
});
<\/script>
`,
    path: "demos/components/Form/validate-with-submit.vue"
  }, null, _parent));
  _push(`<h2 id="动态增减表单项" tabindex="-1">动态增减表单项 <a class="header-anchor" href="#动态增减表单项" aria-label="Permalink to &quot;动态增减表单项&quot;">​</a></h2><p>对于动态表单，重点是 <code>prop</code> 和 <code>rule</code> 的定义</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form ref="formRef" :model="formData" :rules="rules" validate-trigger="blur" style="padding: 20px;" @submit="submit">
    <h-form-item label="操作域" prop="domain">
      <h-input v-model="formData.domain" placeholder="Please input domain">
        <template #append>.com</template>
      </h-input>
    </h-form-item>
    <h-form-item
      v-for="(_, index) of formData.users"
      :label="\`用户 \${index + 1}\`"
      :prop="\`users[\${index}].value\`"
      :rules="{
          required: true,
          message: '用户必填',
        }"
      validate-trigger="change"
    >
      <h-row :gutter="0">
        <h-col :span="18">
          <h-input v-model="formData.users[index].value" />
        </h-col>
        <h-col :span="6" class="text-right">
          <h-space>
            <h-button v-show="index === formData.users.length - 1" icon="add" @click="addUser">增加</h-button>
            <h-button icon="rubbish" type="danger" @click="del(index)">删除</h-button>
          </h-space>
        </h-col>
      </h-row>
    </h-form-item>
    <div>
      <h-space>
        <h-button icon="check" native-type="submit">提交</h-button>
      </h-space>
    </div>
  </h-form>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import type { HFormInstance, HFormRule } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';
import { Arrayable } from '@aurora/utils';

const formRef = ref<HFormInstance | null>(null);
const formData = ref({
  domain: '',
  users: [{
    value: '',
  }],
});

const rules: Ref<Partial<Record<keyof typeof formData.value, Arrayable<HFormRule>>>> = ref({
  domain: {
    required: true,
    message: 'Domain is required!',
  },
});

const submit = () => {
  if (formRef.value) {
    formRef.value?.validate()
      .then(() => {
        $message.success('Submit');
      })
      .catch(errors => {
        console.info('errors:', errors);
      });
  }
};

function addUser() {
  formData.value.users.push({
    value: '',
  });
}

function del(index: number) {
  formData.value.users.splice(index, 1);
}
<\/script>

<style>
.custom-input {
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 4px;
}

.custom-input.is-error {
  border-color: red;
}
</style>
`,
    path: "demos/components/Form/dynamic-change-item-amount.vue"
  }, null, _parent));
  _push(`<h2 id="触发验证的方式" tabindex="-1">触发验证的方式 <a class="header-anchor" href="#触发验证的方式" aria-label="Permalink to &quot;触发验证的方式&quot;">​</a></h2><p>可以通过配置 <code>validateTrigger</code> 来做到在表单元素触发某种事件时才进行验证：</p><ul><li><code>change</code>: 在触发 <code>update:modelValue</code> 时验证（默认）</li><li><code>blur</code>: 在表单组件失焦时验证</li></ul><p>目前支持的组件有：</p><ul><li>Cascader</li><li>Checkbox</li><li>ColorPicker</li><li>DatePicker</li><li>Input</li><li>InputNumber</li><li>Radio</li><li>Rate</li><li>Select</li><li>Slider</li><li>Switch</li><li>Tabs</li><li>TimePicker</li><li>Transfer</li><li>TreeSelect</li><li>Upload（不包括 UploadArea）</li></ul>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form ref="formRef" :model="formData" validate-trigger="blur">
    <h-form-item
      label="User name"
      prop="username"
      :rules="[
        {
          required: true,
          message: 'User name is required!',
        },
        {
          min: 3,
          max: 100,
          message: 'User name should be 3 to 100.',
        },
      ]"
      validate-trigger="change"
    >
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :rules="emailRules">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <div>
      <h-button @click="submit">Submit</h-button>
    </div>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HFormInstance } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const formRef = ref<HFormInstance | null>(null);
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });
    const emailRules = ref([
      {
        required: true,
        message: 'Email is required!',
      },
      {
        type: 'email',
        message: 'Email format invalid!',
      },
      {
        validator(rule, value: string) {
          if (!value.endsWith('@gmail.com')) {
            return new Error('Only support gmail!');
          }
          return true;
        },
      },
    ]);

    const submit = () => {
      if (formRef.value) {
        formRef.value
          .validate()
          .then(() => {
            $message.success('Submit');
          })
          .catch(errors => {
            console.info('errors:', errors);
          });
      }
    };

    return {
      formData,
      emailRules,
      formRef,
      submit,
    };
  },
});
<\/script>
`,
    path: "demos/components/Form/validate-trigger.vue"
  }, null, _parent));
  _push(`<h2 id="只做显示组件" tabindex="-1">只做显示组件 <a class="header-anchor" href="#只做显示组件" aria-label="Permalink to &quot;只做显示组件&quot;">​</a></h2><p>在结合一些表单组件使用时（例如 <code>formily</code>），有自己的验证规则，此时就不需要 <code>n-form</code> 做验证，所以可以配置 <code>only-render</code> 来设定是否只作为渲染组件</p><p>当设置 <code>form.only-render</code> 为 <code>true</code> 且 <code>form-item.error</code> 有变化时，会立刻根据 <code>form-item.error</code> 是否为空而标注表单元素为错误状态</p><p>需要注意的是，此时 <code>emit.validateChange</code> 不会触发</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form ref="formRef" validate-trigger="blur" :only-render="true">
    <h-form-item label="Username" prop="username" :required="true" :error="errorInfo['username']">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :required="true" :error="errorInfo['email']">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes" :required="true" :error="errorInfo['notes']">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <div>
      <h-button @click="submit">Submit</h-button>
    </div>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });

    const errorInfo = ref<Partial<Record<keyof (typeof formData)['value'], string>>>({});

    const submit = () => {
      errorInfo.value = {};

      if (!formData.value.username) {
        errorInfo.value.username = 'Please enter Username';
      }

      if (!formData.value.email) {
        errorInfo.value.email = 'Please enter Email';
      } else if (!/^[\\w.-_]+@gmail.com/.test(formData.value.email)) {
        errorInfo.value.email = 'Only support Gmail!';
      }

      if (!formData.value.notes) {
        errorInfo.value.notes = 'Please enter Notes';
      }

      if (Object.keys(errorInfo.value).length === 0) {
        $message.success('Submit!');
      } else {
        $message.error('Please check error message');
      }
    };

    return {
      formData,
      errorInfo,
      submit,
    };
  },
});
<\/script>
`,
    path: "demos/components/Form/only-render.vue"
  }, null, _parent));
  _push(`<h2 id="使用自定义表单组件" tabindex="-1">使用自定义表单组件 <a class="header-anchor" href="#使用自定义表单组件" aria-label="Permalink to &quot;使用自定义表单组件&quot;">​</a></h2><p>如果使用了 <code>horizon-web</code> 外的表单组件，但也需要用到 <code>n-form</code> <code>n-form-item</code> 的验证功能，直接使用提供的 <code>provide</code> 值来做即可</p><p>只需要 <code>inject(&#39;HFormItemTriggerInjectedKey&#39;)</code>，在表单有 <code>change</code> 或 <code>blur</code> 事件时调用即可</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form ref="formRef" :model="formData" validate-trigger="blur">
    <h-form-item
      label="User name"
      prop="username"
      :rules="[
        {
          required: true,
          message: 'User name is required!',
        },
        {
          min: 3,
          max: 100,
          message: 'User name should be 3 to 100.',
        },
      ]"
      validate-trigger="change"
    >
      <custom-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :rules="emailRules">
      <custom-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <div>
      <h-button @click="submit">Submit</h-button>
    </div>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref, h, watch, inject } from 'vue';
import type { HFormInstance } from '@aurora/horizon-web';
import { $message, HFormItemTriggerInjectedKey, HFormItemErrorInjectedKey } from '@aurora/horizon-web';
import { isString, isUndefined } from '@aurora/utils';

const CustomInput = defineComponent({
  name: 'CustomInput',
  props: {
    modelValue: {
      type: String,
    },
  },
  emits: {
    'update:modelValue': (val: string | undefined) => isString(val) || isUndefined(val),
    blur: () => true,
  },
  setup(props, { emit }) {
    const value = ref(props.modelValue);

    // form-item validate trigger
    const formItemTrigger = inject(HFormItemTriggerInjectedKey);
    const formItemError = inject(HFormItemErrorInjectedKey);

    watch(value, val => {
      emit('update:modelValue', val);
      formItemTrigger?.('change');
    });

    return () =>
      h('input', {
        class: { 'custom-input': true, 'is-error': !!formItemError?.value },
        value: value.value,
        onInput(evt: InputEvent) {
          value.value = (evt.target as HTMLInputElement).value;
        },
        onBlur() {
          emit('blur');
          formItemTrigger?.('blur');
        },
      });
  },
});

export default defineComponent({
  components: {
    CustomInput,
  },
  setup() {
    const formRef = ref<HFormInstance | null>(null);
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });
    const emailRules = ref([
      {
        required: true,
        message: 'Email is required!',
      },
      {
        type: 'email',
        message: 'Email format invalid!',
      },
      {
        validator(_: any, value: string) {
          if (!value.endsWith('@gmail.com')) {
            return new Error('Only support gmail!');
          }
          return true;
        },
      },
    ]);

    const submit = () => {
      if (formRef.value) {
        formRef.value?.validate()
          .then(() => {
            $message.success('Submit');
          })
          .catch(errors => {
            console.info('errors:', errors);
          });
      }
    };

    return {
      formData,
      emailRules,
      formRef,
      submit,
    };
  },
});
<\/script>

<style>
.custom-input {
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 4px;
}

.custom-input.is-error {
  border-color: red;
}
</style>
`,
    path: "demos/components/Form/custom-form.vue"
  }, null, _parent));
  _push(`<h2 id="内置的-required-验证" tabindex="-1">内置的 required 验证 <a class="header-anchor" href="#内置的-required-验证" aria-label="Permalink to &quot;内置的 required 验证&quot;">​</a></h2><p>默认使用国际化配置展示必填信息</p><p><strong>因为国际化字符串会传给 <code>async-validator</code> 方法中，所以无法做到动态变更</strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const formDomRef = ref();

const formData = ref({
  username: '',
  email: '',
  notes: '',
});

const onSubmit = () => {
  formDomRef.value.validate().then(() => {
    $message.success('Success');
  }).catch((err: any) => {
    console.info(err);
  });
};
<\/script>

<template>
  <h-form ref="formDomRef" :model="formData" :scroll-to-error="true" @submit="onSubmit">
    <h-form-item label="Username" prop="username" :required="true">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :required="true">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <h-form-item>
      <h-button native-type="submit">Submit</h-button>
    </h-form-item>
  </h-form>
</template>

<style scoped>

</style>
`,
    path: "demos/components/Form/build-in-required.vue"
  }, null, _parent));
  _push(`<h2 id="全局-disabled" tabindex="-1">全局 disabled <a class="header-anchor" href="#全局-disabled" aria-label="Permalink to &quot;全局 disabled&quot;">​</a></h2><p>配置 disabled 即可禁用 form 中的表单元素</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left">
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-form ref="formRef" :model="formData" :disabled="disabled" label-vertical-align="middle" @submit.prevent="onSubmit">
    <h-form-item label="Input" prop="input" required>
      <h-input v-model="formData.input" clearable />
    </h-form-item>
    <h-form-item label="Number" prop="number" required>
      <h-input-number v-model="formData.number" :min="0" :max="120" clearable @input="onInput" @change="onChange" />
    </h-form-item>
    <h-form-item label="Select" prop="select" required>
      <h-select v-model="formData.select" clearable :multiple="true">
        <h-option label="Beijing" value="beijing" />
        <h-option label="Shanghai" value="shanghai" />
        <h-option label="Hefei" value="hefei" />
      </h-select>
    </h-form-item>
    <h-form-item label="Cascader" prop="cascader" required>
      <h-cascader
        v-model="formData.cascader"
        :clearable="true"
        :to-body="false"
        :multiple="true"
        :options="cascaderData"
      />
    </h-form-item>
    <h-form-item label="TreeSelect" prop="treeSelect" required>
      <h-tree-select
        v-model="formData.treeSelect"
        :clearable="true"
        :to-body="false"
        :multiple="true"
        :tree-data="cascaderData"
      />
    </h-form-item>
    <h-form-item label="Date" prop="date" required>
      <h-date-picker
        v-model="formData.date"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </h-form-item>
    <h-form-item label="Switch" prop="switch" required>
      <h-switch v-model="formData.switch" />
    </h-form-item>
    <h-form-item label="Checkbox" prop="checkbox" required>
      <h-checkbox v-model="formData.checkbox" />
    </h-form-item>
    <h-form-item label="Radio" prop="radio" required>
      <h-radio v-model="formData.radio" />
    </h-form-item>
    <h-form-item label="Textarea" prop="textarea" required>
      <h-input
        v-model="formData.textarea"
        :show-limit="true"
        :maxlength="100"
        type="textarea"
      />
    </h-form-item>
    <h-form-item label="Upload" prop="upload" required>
      <h-upload v-model="formData.upload"></h-upload>
    </h-form-item>
    <h-form-item label="Upload Drop" prop="upload" required>
      <h-upload v-model="formData.upload" type="drop" :limit="5" :multiple="true"></h-upload>
    </h-form-item>
    <h-form-item label="Upload Gallery" prop="upload" required>
      <h-upload v-model="formData.upload" type="gallery"></h-upload>
    </h-form-item>

    <h-button native-type="submit">Submit</h-button>
  </h-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { HFormInstance } from '@aurora/horizon-web';

const disabled = ref(true);
const cascaderData = ref([]);
const formRef = ref<HFormInstance | null>(null);
const formData = ref({
  input: '',
  number: null,
  select: null,
  date: [],
  switch: true,
  checkbox: false,
  radio: false,
  cascader: [],
  treeSelect: [],
  textarea: '',
  upload: undefined,
});

onMounted(async () => {
  cascaderData.value = await fetch(new URL('/cascader-tree-data.json', import.meta.url).href).then(r => r.json());
});

function onInput() {
  console.info('input:', formData.value.number);
}
function onChange() {
  console.info('change:', formData.value.number);
}

function onSubmit() {
  formRef.value?.validate();
}
<\/script>
`,
    path: "demos/components/Form/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="紧凑布局" tabindex="-1">紧凑布局 <a class="header-anchor" href="#紧凑布局" aria-label="Permalink to &quot;紧凑布局&quot;">​</a></h2><p>使用 <code>compact</code> 控制是否开启紧凑布局</p><p><strong>注：此时，错误提示将会被隐藏</strong></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="紧凑布局">
      <h-switch v-model="compact" :status="true" />
    </h-form-item>
  </h-form>
  <h-form ref="formRef" :model="formData" :compact="compact" label-position="left" label-vertical-align="middle" label-justify-align="right" label-width="120px" @submit.prevent="submit">
    <h-form-item label="User name" prop="username" :required="true">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :required="true">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes" :required="true">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <h-form-item>
      <h-button native-type="submit">Submit</h-button>
    </h-form-item>
  </h-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message, HFormInstance } from '@aurora/horizon-web';

const formRef = ref<HFormInstance>(null);
const compact = ref(true);
const formData = ref({
  username: '',
  email: '',
  notes: '',
});

const submit = () => {
  formRef.value?.validate().then((res) => {
    console.info('formData:', formData.value, res);
    $message.success('Submit');
  });
};
<\/script>
`,
    path: "demos/components/Form/compact.vue"
  }, null, _parent));
  _push(`<h2 id="label-尾部插槽" tabindex="-1">label 尾部插槽 <a class="header-anchor" href="#label-尾部插槽" aria-label="Permalink to &quot;label 尾部插槽&quot;">​</a></h2><p>在 <code>label-position = &#39;top&#39;</code> 时，可以使用 <code>label-append</code> 插槽用来放置自定义内容</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="top" @submit="submit">
    <h-form-item label="User name">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Tags">
      <template #labelAppend>
        <h-button link icon="add" size="small" @click="addTag">增加</h-button>
      </template>
      <h-tag-group>
        <h-tag v-for="item of tags" :key="item">Tag {{ item }}</h-tag>
      </h-tag-group>
    </h-form-item>
    <h-form-item>
      <h-button native-type="submit">Submit</h-button>
    </h-form-item>
  </h-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const formData = ref({
  username: '',
  email: '',
  notes: '',
});

const tags = ref<string[]>([]);

function addTag() {
  tags.value.push((tags.value.length + 1).toString());
}

const submit = () => {
  console.info('formData:', formData.value);
  $message.success('Submit');
};
<\/script>
`,
    path: "demos/components/Form/label-append.vue"
  }, null, _parent));
  _push(`<h2>Form Api</h2><h3>Form Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">model</td><td>表单字段的集合，如果不需要表单验证可以不设置</td><td><code>object</code></td><td class="text-center">否</td><td>() =&gt; ({})</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">inline</td><td>使用行内表单</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸<br>会直接覆盖通过 <code>n-application</code> 设置的 <code>size</code></td><td><code>&#39;medium&#39; | &#39;large&#39; | &#39;small&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-position</td><td>标签的位置</td><td><code>&#39;top&#39; | &#39;left&#39;</code></td><td class="text-center">否</td><td>&#39;top&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-justify-align</td><td>标签的水平对齐方式，仅当 <code>label-position</code> 为 <code>left</code> 时有效</td><td><code>&#39;left&#39; | &#39;right&#39;</code></td><td class="text-center">否</td><td>&#39;left&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-vertical-align</td><td>标签的垂直对齐方式，仅当 <code>label-position</code> 为 <code>left</code> 时有效</td><td><code>&#39;top&#39; | &#39;middle&#39;</code></td><td class="text-center">否</td><td>&#39;top&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-width</td><td>标签宽度，<code>auto</code> 表示自动设置为合适的宽度</td><td><code>&#39;auto&#39; | string | number</code></td><td class="text-center">否</td><td>&#39;auto&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-require-mark</td><td>当表单项的验证规则中包含了必填项（<code>required</code> 为 <code>true</code>）时，是否在标签后展示星号</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rules</td><td>验证规则</td><td><code>Record&lt;string, RuleItem[] | RuleItem&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">require-mark-position</td><td>必填字段星号的位置</td><td><code>&#39;left&#39; | &#39;right&#39;</code></td><td class="text-center">否</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-to-error</td><td>当验证出错时，自动滚动到第一个错误项</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prevent-submit-default</td><td>是否禁止 submit 事件的默认行为</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">validate-on-rule-change</td><td>校验规则变更后立刻执行一次验证</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">validate-trigger</td><td>触发校验的时机<br><code>change</code>: 只要触发了表单元素的 <code>update:modalValue</code> 事件就会验证<br><code>blur</code>: 只有在表单元素失焦时才会验证<br><code>false</code>: 只希望在手动验证时触发</td><td><code>&#39;change&#39; | &#39;blur&#39; | Array&lt;&#39;change&#39; | &#39;blur&#39;&gt; | false</code></td><td class="text-center">否</td><td>&#39;change&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">validate-on-change`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "validateTrigger" }, null, _parent));
  _push(`</td><td>是否在 <code>model</code> 变更后立刻验证</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">only-render</td><td>当前表单是否只做渲染<br>如果 <code>n-form-item</code> 有设置 <code>error</code>，则会立刻将组件标为错误状态</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">helper-placement</td><td>提示帮助放置位置<br>right: 在 <code>form-item</code> 整体的右侧<br>after-label: 在 <code>label</code> 的后面缀上<br>before-label: 在 <code>label</code> 的前面缀上</td><td><code>&#39;right&#39; | &#39;after-label&#39; | &#39;before-label&#39;</code></td><td class="text-center">否</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">helper-theme</td><td>提示帮助的主题</td><td><code>&#39;light&#39; | &#39;dark&#39;</code></td><td class="text-center">否</td><td>&#39;light&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用表单组件，此设置将会覆盖表单组件的 <code>disabled</code> 属性</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">compact`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "spacing" }, null, _parent));
  _push(`</td><td>是否启用紧凑布局<br>紧凑布局不会显示校验信息</td><td><code>boolean</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">spacing</td><td>间距方式<br>&#39;default&#39;: 最小间距为 <code>20px</code>，<code>tip</code> <code>error</code> 互斥显示<br>&#39;static&#39;: 静态间距为 <code>20px</code>，<code>tip</code> <code>error</code> 互斥显示<br>&#39;compact&#39;: 紧凑间距，间距为 <code>16px</code>，此时错误与提示将会被隐藏<br>&#39;dynamic&#39;: 动态间距，最小间距为 <code>16px</code>，<code>tip</code> <code>error</code> 可以同时显示</td><td><code>&#39;default&#39; | &#39;static&#39; | &#39;compact&#39; | &#39;dynamic&#39;</code></td><td class="text-center">否</td><td>&#39;default&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">required-use-label</td><td>是否使用 <code>label</code> 作为默认必填的显示名称</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3>Form Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">submit</td><td rowspan="1">提交时的回调</td><td rowspan="1">( e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td></td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">validate</td><td rowspan="3">当验证时触发</td><td rowspan="3">( prop: <code>string</code>, isValidated: <code>boolean</code>, message: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prop</td><td><code>string</code></td><td>验证的表单的 <code>prop</code></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">isValidated</td><td><code>boolean</code></td><td>是否验证通过</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">message</td><td><code>string</code></td><td>验证结果，如果通过则为空</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">validate-change`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "validate" }, null, _parent));
  _push(`</td><td rowspan="1">当验证时触发</td><td rowspan="1">( isValidated: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">isValidated</td><td><code>boolean</code></td><td></td></tr></tbody></table><h3>Form Exposes</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">validate</td><td rowspan="1">验证表单，验证通过返回 <code>Resolve&lt;void&gt;</code>，验证失败返回 <code>Reject&lt;ValidateError[]&gt;</code></td><td rowspan="1">( ) =&gt; <code>Promise&lt;void&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;void&gt;</code></td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">validateField</td><td rowspan="2">验证表单指定字段，验证通过返回 Resolve&lt;string[]&gt;，验证失败返回 Reject&lt;ValidateError[]&gt;</td><td rowspan="2">( fields: <code>string[]</code> ) =&gt; <code>Promise&lt;string[]&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fields</td><td><code>string[]</code></td><td>需要验证的字段</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;string[]&gt;</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">resetFields</td><td rowspan="1">重置该表单项，将其值重置为初始值，并移除校验结果</td><td rowspan="1">( props: <code>string[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">props</td><td><code>string[]</code></td><td>需要重置的字段，不传即全部重置</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollToField</td><td rowspan="1">滚动到指定的字段</td><td rowspan="1">( prop: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prop</td><td><code>string</code></td><td>需要滚动到的字段</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearValidate</td><td rowspan="1">清理某个字段的表单验证信息</td><td rowspan="1">( props: <code>string[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">props</td><td><code>string[]</code></td><td>需要清空验证信息的字段，不传即全部情况</td></tr></tbody></table><h2>FormItem Api</h2><h3>FormItem Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>标签</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prop</td><td>表单项的绑定字段，应该是 <code>n-form</code> 上 <code>model</code> 属性的字段名，如果不需要表单验证可以不设置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rules</td><td>验证规则，会覆盖 <code>n-form</code> 的规则，如果不需要表单验证可以不设置</td><td><code>RuleItem | RuleItem[]</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tip</td><td>帮助文本，显示优先级低于错误信息</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">helper</td><td>提示帮助<br>使用了 <code>popover</code>，比 <code>tip</code> 有更丰富的帮助提示功能</td><td><code>HFormItemHelper | string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">helper-placement</td><td>提示帮助放置位置<br>right: 在 <code>form-item</code> 整体的右侧<br>after-label: 在 <code>label</code> 的后面缀上<br>before-label: 在 <code>label</code> 的前面缀上</td><td><code>&#39;right&#39; | &#39;after-label&#39; | &#39;before-label&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">helper-theme</td><td>提示帮助的主题</td><td><code>&#39;light&#39; | &#39;dark&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-justify-align</td><td>标签的水平对齐方式，仅当 <code>label-position</code> 为 <code>left</code> 时有效<br>会继承 <code>n-form</code> 的 <code>label-width</code></td><td><code>&#39;left&#39; | &#39;right&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-vertical-align</td><td>标签的垂直对齐方式，仅当 <code>label-position</code> 为 <code>left</code> 时有效<br>会继承 <code>n-form</code> 的 <code>label-width</code></td><td><code>&#39;top&#39; | &#39;middle&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-width</td><td>标签宽度，<code>auto</code> 表示自动设置为合适的宽度<br>会继承 <code>n-form</code> 的 <code>label-width</code></td><td><code>&#39;auto&#39; | string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">required</td><td>是否必填<br>会被验证规则覆盖</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">required-use-label</td><td>是否使用 <code>label</code> 作为默认必填的显示名称</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-require-mark</td><td>当前项的验证规则中包含了必填项（<code>required</code> 为 <code>true</code>）时，是否在标签后展示星号</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">error</td><td>当校验错误时显示的信息<br>如果设置了 <code>rules</code>，则会被覆盖<br>可以快速用于设置 <code>required</code> 的校验错误提示语</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">validate-trigger</td><td>校验触发的时机<br><code>change</code>: 只要触发了表单元素的 <code>update:modalValue</code> 事件就会验证<br><code>blur</code>: 只有在表单元素失焦时才会验证<br><code>false</code>: 只希望在手动验证时才触发<br>会覆盖 <code>form.validateTrigger</code> 的配置</td><td><code>&#39;change&#39; | &#39;blur&#39; | false | Array&lt;&#39;change&#39; | &#39;blur&#39;&gt;</code></td><td class="text-center">否</td><td>undefined</td></tr></tbody></table><h3>FormItem Exposes</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">validate</td><td rowspan="1">验证表单，验证通过返回 <code>Resolve&lt;void&gt;</code>，验证失败返回 <code>Reject&lt;ValidateError[]&gt;</code></td><td rowspan="1">( ) =&gt; <code>Promise&lt;void&gt;</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>Promise&lt;void&gt;</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">resetFields</td><td rowspan="1">重置该表单项，将其值重置为初始值，并移除校验结果</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearValidate</td><td rowspan="1">清理当前表单项的验证信息</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Form.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Form = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Form as default
};
