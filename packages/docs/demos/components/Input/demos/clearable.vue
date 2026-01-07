<template>
  <h-form>
    <h-form-item label="Label">
      <h-input v-model="val" clearable />
    </h-form-item>
  </h-form>
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
