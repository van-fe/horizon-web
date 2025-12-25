<template>
  <p>
    <n-link>
      <template #suffix>...</template>
      And So on
    </n-link>
  </p>
  <p>
    <n-link :underline="false">
      {{ new Date().toLocaleString() }}
      <template #prefix><a-icon name="time" suffix="2xs" /></template>
      <template #suffix><a-icon name="edit" suffix="2xs" /></template>
    </n-link>
  </p>
</template>

<script>
import { defineComponent } from 'vue';
import { AIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    AIcon,
  },
});
</script>
