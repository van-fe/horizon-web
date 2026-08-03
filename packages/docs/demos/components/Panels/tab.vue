<template>
  <h-space block direction="vertical" size="small">
    <h-tabs v-model="currentRef">
      <h-tab key="panel1" label="Option1" />
      <h-tab key="panel2" label="Option2" />
      <h-tab key="panel3" label="Option3" />
    </h-tabs>
    <h-panels v-model="currentRef" animated>
      <h-panel name="panel1">Panel1 Content</h-panel>
      <h-panel name="panel2">Panel2 Content</h-panel>
      <h-panel name="panel3">Panel3 Content</h-panel>
    </h-panels>
  </h-space>
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
