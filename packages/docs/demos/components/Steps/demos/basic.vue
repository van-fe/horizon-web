<template>
  <div>
    <div class="mb-4">
      <n-form label-position="left" label-vertical-align="middle">
        <n-form-item label="切换状态">
          <n-select v-model="status" style="width: fit-content">
            <n-option v-for="item of statusList" :key="item" :value="item" :label="item" />
          </n-select>
        </n-form-item>
      </n-form>
    </div>

    <n-steps :model-value="1" :status="status">
      <n-step>
        <template #title>Succeeded</template>
        <template #subtitle>
          <span>This is a description.</span>
        </template>
      </n-step>
      <n-step title="Processing" subtitle="This is a description." description="03/23/2021" />
      <n-step title="Future step" subtitle="This is a description." />
    </n-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const statusList = ['wait', 'process', 'finish', 'warning', 'error'];
    const status = ref('wait');

    return {
      status,
      statusList,
    };
  },
});
</script>
