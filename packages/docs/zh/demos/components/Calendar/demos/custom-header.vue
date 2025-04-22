<template>
  <n-calendar>
    <template #header>
      <n-input v-model="searchWord" placeholder="搜索" size="large" suffix-icon="search" />
    </template>
  </n-calendar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const searchWord = ref('');

    return {
      searchWord,
    };
  },
});
</script>
