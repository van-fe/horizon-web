<template>
  <h-input
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
      console.info('[handleInput]', value);
    };
    const handleChange = (value: string) => {
      console.info('[handleChange]', value);
    };
    const handleClear = () => {
      console.info('[handleClear]');
      hint.value = 'Cleared';
    };
    const handleKeyUpEnter = (event: Event) => {
      console.info('[pressEnter]', event);
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
