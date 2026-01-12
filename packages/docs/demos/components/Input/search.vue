<template>
  <h-input v-model="val" clearable placeholder="Please input search keywords" @keyup.enter="handleSearch">
    <template #prefix>
      <a-icon name="search" style="color: var(--n-text-disabled)" />
    </template>
  </h-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AIcon } from '@aurora/icon';
export default defineComponent({
  components: { AIcon },
  setup() {
    const handleSearch = e => {
      console.info('[handleSearch]', e.target.value);
    };
    const val = ref('');
    return {
      val,
      handleSearch,
    };
  },
});
</script>
