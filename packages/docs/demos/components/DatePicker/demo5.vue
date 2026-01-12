<template>
  <h-date-picker
    v-model="pickerTime"
    popper-class="demo-date-picker"
    format="YYYY年MM月DD日"
    value-format="YYYY-MM-DD"
  >
    <template #default="{ grid }">
      <div class="n-date-picker-panel-table__inner-grid" :class="[isShow(grid) ? 'holiday' : '']">
        <span>{{ grid.text }}</span>
        <span v-if="isShow(grid)" class="desc">休</span>
      </div>
    </template>
  </h-date-picker>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let pickerTime = ref('2022-05-10');

    function isShow({ date }) {
      return (
        new Date(date).getTime() >= new Date('2022/04/30').getTime() &&
        new Date(date).getTime() <= new Date('2022/05/04').getTime()
      );
    }

    return {
      pickerTime,
      isShow,
    };
  },
});
</script>
<style scoped>
.h-date-picker-panel-table__inner-grid {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 48px !important;
  height: 48px !important;
}

.h-date-picker-panel-table__inner-grid.holiday {
  border: 1px solid #ccc;
}

.h-date-picker-panel-table__inner-grid .desc {
  position: absolute;
  top: 2px;
  left: 2px;
  font-size: 12px;
  color: #00bebe;
}
</style>

<style>
.demo-date-picker {
  width: 500px;
}
</style>
