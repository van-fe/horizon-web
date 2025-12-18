<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">
        单选
      </div>
      <n-cascader
          v-model="currentVal1"
          :options="options"
          show-checked-strategy="leaf"
          :to-body="false"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">
        多选
      </div>
      <n-cascader
          v-model="currentVal2"
          :options="options"
          show-checked-strategy="leaf"
          multiple
          clearable
          :to-body="false"
      ></n-cascader>
    </n-col>
  </n-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);
    const currentVal2 = ref<string[][]>([]);

    const options = ref([]);
    fetch(
      'https://static.nio.com/fx-static/horizon-web/clhoirqpc0000088sgljrau3o/cascader-options.json',
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
