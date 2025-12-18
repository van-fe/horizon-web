<template>
  <n-breadcrumb
    class="mb-2"
    :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]"
    separator="*"
  />
  <n-breadcrumb :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]">
    <template #separator><n-icon name="gift" size="12" /></template>
  </n-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    NIcon,
  },
});
</script>
