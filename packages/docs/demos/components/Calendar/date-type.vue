<template>
  <div class="wrapper">
    <h-calendar
      v-model="value"
      v-model:mode="mode"
      :class="['week', 'day'].includes(mode) ? 'limit' : ''"
      date-type="only-current"
      :mode-switchable="true"
      :mode-switchable-list="['year', 'month', 'week', 'day']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref();
    const mode = ref('month');

    return {
      value,
      mode,
    };
  },
});
</script>

<style scoped>
.wrapper .limit {
  height: 800px;
}
</style>
