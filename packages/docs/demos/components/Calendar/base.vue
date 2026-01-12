<template>
  <div class="wrapper">
    <h-calendar v-model="value" :auto-fit="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref();

    return {
      value,
    };
  },
});
</script>

<style scoped>
.wrapper {
  height: 1000px;
}
</style>
