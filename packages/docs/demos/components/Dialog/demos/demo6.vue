<template>
  <div class="mb-2">
    <n-radio-group v-model="displayType">
      <n-radio label="show">show</n-radio>
      <n-radio label="if">if</n-radio>
    </n-radio-group>
  </div>
  <n-button @click="visible = true">点我</n-button>
  <n-dialog
    v-model="visible"
    title="标题"
    :display-type="displayType"
    @primaryClick="onPrimary"
    @secondaryClick="onSecondary"
  >
    <div>
      <n-tabs v-model="currentTab">
        <n-tab name="tab1" label="Tab1" />
        <n-tab name="tab2" label="Tab2" />
      </n-tabs>
      <n-panels v-model="currentTab">
        <n-panel name="tab1">
          <n-form ref="formRef" :model="formData">
            <n-form-item
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
              <n-input v-model="formData.username" />
            </n-form-item>
            <n-form-item label="Email" prop="email" :rules="emailRules">
              <n-input v-model="formData.email" />
            </n-form-item>
            <n-form-item label="Gender" prop="gender" required>
              <n-select v-model="formData.gender">
                <n-option label="Male" :value="1" />
                <n-option label="Female" :value="2" />
              </n-select>
            </n-form-item>
            <n-form-item label="Notes" prop="notes">
              <n-input v-model="formData.notes" type="textarea" :rows="20" />
            </n-form-item>
          </n-form>
        </n-panel>
        <n-panel name="tab2">Tab2 Content</n-panel>
      </n-panels>
    </div>
  </n-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@nio-fe/lego';
import type { NFormInstance } from '@nio-fe/lego';

export default defineComponent({
  setup() {
    const displayType = ref('show');
    const formRef = ref<NFormInstance | null>(null);
    const formData = ref({
      username: '',
      email: '',
      gender: null,
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
    const visible = ref(false);
    const onPrimary = () => {
      console.log('Primary button clicked!');
      if (formRef.value) {
        formRef.value
          .validate()
          .then(() => {
            $message.success('Submit');
            visible.value = false;
          })
          .catch(errors => {
            console.log('errors:', errors);
          });
      }
    };
    const onSecondary = () => {
      console.log('Secondary button clicked!');
    };
    const currentTab = ref('tab1');
    return {
      formRef,
      formData,
      emailRules,
      visible,
      onPrimary,
      onSecondary,
      currentTab,
      displayType,
    };
  },
});
</script>
