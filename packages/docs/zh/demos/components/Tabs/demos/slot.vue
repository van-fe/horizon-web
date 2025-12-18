<template>
  <n-tabs v-model="currentRef" type="card">
    <n-tab label="Tab1" name="tab1">
      <span class="px-2 font-bold">Custom Tab</span>
      <n-icon v-tooltip="'something helpful message'" name="help" class="ml-1" />
    </n-tab>
    <n-tab label="Section 2" name="tab2" />
    <n-tab label="Section 3" name="tab3" />
  </n-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NIcon } from '@aurora/icon';
export default defineComponent({
  components: {
    NIcon,
  },
  setup() {
    return {
      currentRef: ref('tab1'),
    };
  },
});
</script>
