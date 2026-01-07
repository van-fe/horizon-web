<template>
  <p>
    <h-link>
      <template #suffix>...</template>
      And So on
    </h-link>
  </p>
  <p>
    <h-link :underline="false">
      {{ new Date().toLocaleString() }}
      <template #prefix><a-icon name="time" suffix="2xs" /></template>
      <template #suffix><a-icon name="edit" suffix="2xs" /></template>
    </h-link>
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
