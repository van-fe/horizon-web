<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        单选
      </div>
      <h-cascader
          v-model="currentVal1"
          :options="options"
          show-checked-strategy="leaf"
          :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        多选
      </div>
      <h-cascader
          v-model="currentVal2"
          :options="options"
          show-checked-strategy="leaf"
          multiple
          clearable
          :to-body="false"
      ></h-cascader>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);
    const currentVal2 = ref<string[][]>([]);

    const options = ref([]);
    fetch(
      new URL('/cascader-options.json', import.meta.url).href,
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    return {
      currentVal1,
      currentVal2,
      options,
    };
  },
});
</script>
