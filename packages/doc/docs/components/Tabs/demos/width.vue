<template>
  <h-tabs v-model:active-key="currentRef" type="page">
    <h-tab
      label="This is a very long page title and you can see ellipsis text"
      name="tab1"
      :max-width="280"
    />
    <h-tab label="Tab2" name="tab2" :mih-width="100" />
    <h-tab label="Tab3" name="tab3" :mih-width="100" />
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
