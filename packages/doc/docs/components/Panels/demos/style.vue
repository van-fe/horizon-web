<template>
  <n-space block direction="vertical" size="small">
    <n-tabs v-model="currentRef">
      <n-tab name="panel1" label="Option1" />
      <n-tab name="panel2" label="Option2" />
      <n-tab name="panel3" label="Option3" />
    </n-tabs>
    <n-panels v-model="currentRef" animated>
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
