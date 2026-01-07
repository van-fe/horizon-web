<template>
  <div>
    <div class="mb-4">
      <h-form label-position="left" label-vertical-align="middle">
        <h-form-item label="切换状态">
          <h-select v-model="status" style="width: fit-content">
            <h-option v-for="item of statusList" :key="item" :value="item" :label="item" />
          </h-select>
        </h-form-item>
      </h-form>
    </div>

    <h-steps :model-value="1" :status="status">
      <h-step>
        <template #title>Succeeded</template>
        <template #subtitle>
          <span>This is a description.</span>
        </template>
      </h-step>
      <h-step title="Processing" subtitle="This is a description." description="03/23/2021" />
      <h-step title="Future step" subtitle="This is a description." />
    </h-steps>
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
