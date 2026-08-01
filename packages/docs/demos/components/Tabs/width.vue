<template>
  <h-tabs v-model="currentRef" type="page">
    <h-tab label="This is a very long page title and you can see ellipsis text" key="tab1" />
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
