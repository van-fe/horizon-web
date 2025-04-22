<template>
  <n-tabs v-model:active-key="currentRef" type="card">
    <n-tab label="Tab1" name="tab1" />
    <n-tab label="Tab2" name="tab2" />
    <n-tab label="Tab3" name="tab3" />
  </n-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentRef: ref('tab1'),
    };
  },
});
</script>
