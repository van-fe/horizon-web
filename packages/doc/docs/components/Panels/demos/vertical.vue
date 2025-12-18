<template>
  <n-space block direction="vertical" size="small">
    <n-radio-group v-model="currentRef">
      <n-radio label="panel1">Option1</n-radio>
      <n-radio label="panel2">Option2</n-radio>
      <n-radio label="panel3">Option3</n-radio>
    </n-radio-group>
    <n-panels v-model="currentRef" vertical animated>
      <n-panel name="panel1">Panel1 Content</n-panel>
      <n-panel name="panel2">Panel2 Content</n-panel>
      <n-panel name="panel3">Panel3 Content</n-panel>
    </n-panels>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentRef: ref('panel1'),
    };
  },
});
</script>
