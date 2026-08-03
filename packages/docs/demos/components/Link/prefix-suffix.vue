<template>
  <p>
    <h-link>
      <template #suffix>...</template>
      And So on
    </h-link>
  </p>
  <p>
    <h-link icon="el-icon-edit" :underline="false">
      {{ new Date().toLocaleString() }}
      <template #prefix><a-icon name="time" suffix="2xs" /></template>
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
