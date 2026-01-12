<template>
  <h-space block direction="vertical" size="small">
    <h-radio-group v-model="currentRef">
      <h-radio label="panel1">Option1</h-radio>
      <h-radio label="panel2">Option2</h-radio>
      <h-radio label="panel3">Option3</h-radio>
    </h-radio-group>
    <h-panels v-model="currentRef" vertical animated>
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
