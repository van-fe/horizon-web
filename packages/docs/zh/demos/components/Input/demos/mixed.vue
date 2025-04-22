<template>
  <n-input v-model="val1">
    <template #prepend>https://</template>
    <template #append>.com</template>
  </n-input>
  <br />
  <br />
  <n-input v-model="val2" style="--n-input-bg--prepend-append: transparent">
    <template #prepend>
      <n-select v-model="select1" placeholder="Please Select" size="medium" style="width: 200px">
        <n-option key="1" label="选项1" value="1"></n-option>
        <n-option key="2" label="选项2" value="2"></n-option>
      </n-select>
    </template>
  </n-input>
  <br />
  <br />
  <n-input v-model="val3" style="--n-input-bg--prepend-append: transparent">
    <template #append>
      <n-select v-model="select2" placeholder="Please Select" size="medium">
        <n-option key="1" label="选项1" value="1"></n-option>
      </n-select>
    </template>
  </n-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val1 = ref('');
    const val2 = ref('');
    const val3 = ref('');
    const select1 = ref();
    const select2 = ref();
    return {
      val1,
      val2,
      val3,
      select1,
      select2,
    };
  },
});
</script>
