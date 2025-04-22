<template>
  <div class="demo-wrapper">
    <div class="box"><span>正常显示</span>
      <n-time-picker v-model="time1" type="time" is-range></n-time-picker>
    </div>
    <div class="box"><span>preventOverflow</span>
      <n-time-picker v-model="time2" type="time" is-range prevent-overflow></n-time-picker>
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
