<template>
  <n-input
    ref="input"
    v-model="val"
    clearable

    @input="handleInput"
    @change="handleChange"
    @clear="handleClear"
    @keyup.enter="handleKeyUpEnter"
  />
  <div>{{ hint }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val = ref('');
    const hint = ref('');
    const handleInput = (value: string) => {
      console.log('[handleInput]', value);
    };
    const handleChange = (value: string) => {
      console.log('[handleChange]', value);
    };
    const handleClear = () => {
      console.log('[handleClear]');
      hint.value = 'Cleared';
    };
    const handleKeyUpEnter = (event: Event) => {
      console.log('[pressEnter]', event);
      hint.value = 'Pressed Enter';
    };
    return {
      val,
      hint,
      handleInput,
      handleChange,
      handleClear,
      handleKeyUpEnter,
    };
  },
});
</script>
