<template>
  <n-form>
    <n-form-item label="Label">
      <n-input v-model="val" clearable />
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val = ref('');
    return {
      val,
    };
  },
});
</script>
