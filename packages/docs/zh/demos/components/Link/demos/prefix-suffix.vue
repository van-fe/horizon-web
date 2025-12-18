<template>
  <p>
    <n-link>
      <template #suffix>...</template>
      And So on
    </n-link>
  </p>
  <p>
    <n-link icon="el-icon-edit" :underline="false">
      {{ new Date().toLocaleString() }}
      <template #prefix><n-icon name="time" suffix="2xs" /></template>
    </n-link>
  </p>
</template>

<script>
import { defineComponent } from 'vue';
import { NIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    NIcon,
  },
});
</script>
