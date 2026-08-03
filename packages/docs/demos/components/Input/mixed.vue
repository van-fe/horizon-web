<template>
  <h-input v-model="val1">
    <template #prepend>https://</template>
    <template #append>.com</template>
  </h-input>
  <br />
  <br />
  <h-input v-model="val2" style="--h-input-background-prepend-append: transparent">
    <template #prepend>
      <h-select v-model="select1" placeholder="Please Select" size="medium" style="width: 200px">
        <h-option key="1" label="选项1" value="1"></h-option>
        <h-option key="2" label="选项2" value="2"></h-option>
      </h-select>
    </template>
  </h-input>
  <br />
  <br />
  <h-input v-model="val3" style="--h-input-background-prepend-append: transparent">
    <template #append>
      <h-select v-model="select2" placeholder="Please Select" size="medium">
        <h-option key="1" label="选项1" value="1"></h-option>
      </h-select>
    </template>
  </h-input>
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
