<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { HFormInstance } from '@aurora/horizon-web';

const formRef = ref<HFormInstance>();
const values = reactive<{ cadence?: string }>({ cadence: undefined });
const status = ref('请选择发布节奏');

async function submit() {
  try {
    await formRef.value?.validate();
    status.value = `已选择：${values.cadence}`;
  } catch {
    status.value = '请先完成必填项';
  }
}
</script>

<template>
  <section class="docs-demo">
    <h-form ref="formRef" :model="values" label-position="top">
      <h-form-item label="发布节奏" prop="cadence" required>
        <h-segmented v-model:active-key="values.cadence" form block>
          <h-segmented-item value="Weekly" label="Weekly" />
          <h-segmented-item value="Biweekly" label="Biweekly" />
          <h-segmented-item value="Monthly" label="Monthly" />
        </h-segmented>
      </h-form-item>
      <h-button @click="submit">保存</h-button>
    </h-form>
    <p class="docs-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>
