<template>
  <h-tabs v-model:active-key="currentRef" type="card">
    <h-tab label="Tab1" name="tab1" />
    <h-tab label="Tab2" name="tab2" />
    <h-tab label="Tab3" name="tab3" />
  </h-tabs>
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
