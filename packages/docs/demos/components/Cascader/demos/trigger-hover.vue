<template>
  <div>
    <n-row :gutter="10">
      <n-col :span="6">
        <n-cascader
            v-model="currentVal1"
            :options="options"
            trigger="hover"
            expand-trigger="hover"
            :to-body="false"
        />
      </n-col>
    </n-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);

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
      options,
    };
  },
});
</script>
