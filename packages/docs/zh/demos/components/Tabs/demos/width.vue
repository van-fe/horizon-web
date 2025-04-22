<template>
  <n-tabs v-model="currentRef" type="page">
    <n-tab
      label="This is a very long page title and you can see ellipsis text"
      name="tab1"
      :max-width="280"
    />
    <n-tab label="Tab2" name="tab2" :min-width="100" />
    <n-tab label="Tab3" name="tab3" :min-width="100" />
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
