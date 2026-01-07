<template>
  <h-breadcrumb
    class="mb-2"
    :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]"
    separator="*"
  />
  <h-breadcrumb :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]">
    <template #separator><a-icon name="gift" size="12" /></template>
  </h-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    AIcon,
  },
});
</script>
