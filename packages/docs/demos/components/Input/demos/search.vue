<template>
  <n-input v-model="val" clearable placeholder="Please input search keywords" @keyup.enter="handleSearch">
    <template #prefix>
      <n-icon name="search" style="color: var(--n-text-disabled)" />
    </template>
  </n-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NIcon } from '@nio-fe/icon';
export default defineComponent({
  components: { NIcon },
  setup() {
    const handleSearch = e => {
      console.log('[handleSearch]', e.target.value);
    };
    const val = ref('');
    return {
      val,
      handleSearch,
    };
  },
});
</script>
