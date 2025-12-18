<template>
  <div class="demo-wrapper">
    <div class="box"><span>正常显示</span>
      <NDatePicker v-model="time1" type="daterange"></NDatePicker>
    </div>
    <div class="box"><span>preventOverflow</span>
      <NDatePicker v-model="time2" type="daterange" prevent-overflow></NDatePicker>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let time1 = ref();
    let time2 = ref();

    return {
      time1,
      time2,
    };
  },
});
</script>
<style lang="scss" scoped>
.demo-wrapper {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .box {
    display: flex;
    flex-direction: column;
    margin: 10px;
  }
}
</style>
