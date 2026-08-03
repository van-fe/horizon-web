<template>
  <h-button @click="visible = true">点我</h-button>
  <h-dialog v-model:visible="visible" title="标题" @ok="onPrimary" @cancel="onSecondary">
    <div>
      <h-tabs v-model="currentTab">
        <h-tab key="tab1" label="Tab1" />
        <h-tab key="tab2" label="Tab2" />
      </h-tabs>
      <h-panels v-model="currentTab">
        <h-panel name="tab1">
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
            <h-form-item label="Gender" prop="gender" required>
              <h-select v-model="formData.gender">
                <h-option label="Male" :value="1" />
                <h-option label="Female" :value="2" />
              </h-select>
            </h-form-item>
            <h-form-item label="Notes" prop="notes">
              <h-input v-model="formData.notes" type="textarea" :rows="20" />
            </h-form-item>
          </h-form>
        </h-panel>
        <h-panel name="tab2">Tab2 Content</h-panel>
      </h-panels>
    </div>
  </h-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@aurora/horizon-web';
import type { HFormInstance } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const formRef = ref<HFormInstance | null>(null);
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
      console.info('Primary button clicked!');
      if (formRef.value) {
        formRef.value
          .validate()
          .then(() => {
            $message.success('Submit');
            visible.value = false;
          })
          .catch(errors => {
            console.info('errors:', errors);
          });
      }
    };
    const onSecondary = () => {
      console.info('Secondary button clicked!');
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
    };
  },
});
</script>
