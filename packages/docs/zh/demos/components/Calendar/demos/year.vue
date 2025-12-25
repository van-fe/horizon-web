<template>
  <div class="wrapper">
    <n-calendar
      v-model="value"
      mode="year"
      date-type="only-current"
      :pickable="true"
      @date-click="onDateClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref();
    function onDateClick(date: string, type: string) {
      console.info(date, type);
    }

    return {
      value,
      onDateClick,
    };
  },
});
</script>

<style scoped>
.wrapper {
  height: 1000px;
}
</style>
