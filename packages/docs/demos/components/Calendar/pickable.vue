<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="Pickable">
      <h-radio-group v-model="pickable">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="DateType">
      <h-radio-group v-model="dateType">
        <h-radio label="full">Full</h-radio>
        <h-radio label="only-current">Only Current</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-calendar
    :pickable="pickable"
    :date-type="dateType"
    :disable-date="disableDate"
    :mode-switchable="true"
    @date-click="onDateClick"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Dayjs } from 'dayjs';

export default defineComponent({
  setup() {
    const pickable = ref(true);
    const dateType = ref('full');

    function onDateClick(date: string, type: 'month' | 'year' | 'week') {
      console.info(date, type);
    }

    function disableDate(date: Dayjs) {
      return [0, 6].includes(date.day());
    }

    return {
      pickable,
      dateType,
      onDateClick,
      disableDate,
    };
  },
});
</script>
