<template>
  <h-tabs v-model="currentRef" type="card">
    <h-tab label="Tab1" key="tab1" />
    <h-tab label="Tab2" key="tab2" />
    <h-tab label="Tab3" key="tab3" />
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
