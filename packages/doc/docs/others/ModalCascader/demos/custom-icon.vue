<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        自定义级联面板展开图标
      </div>
      <h-modal-cascader
          v-model="currentVal1"
          :options="options"
          expand-trigger="click"
          expand-icon="spread_right"
          :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        自定义单选选中项图标
      </div>
      <h-modal-cascader v-model="currentVal2" :options="options" selected-icon="tag" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);
    const currentVal2 = ref<string[]>([]);

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
