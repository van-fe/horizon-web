<template>
  <n-tabs v-model:active-key="currentRef" type="card">
    <n-tab label="Tab1" name="tab1">
      <span class="px-2 font-bold">Custom Tab</span>
      <a-icon v-tooltip="'something helpful message'" name="help" class="ml-1" />
    </n-tab>
    <n-tab label="Section 2" name="tab2" />
    <n-tab label="Section 3" name="tab3" />
  </n-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AIcon } from '@aurora/icon';
export default defineComponent({
  components: {
    AIcon,
  },
  setup() {
    return {
      currentRef: ref('tab1'),
    };
  },
});
</script>
