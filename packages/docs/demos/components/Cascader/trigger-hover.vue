<template>
  <div>
    <h-grid :gap="10">
      <h-grid-item :span="6">
        <h-cascader
            v-model="currentVal1"
            :options="options"
            trigger="hover"
            expand-trigger="hover"
            :to-body="false"
        />
      </h-grid-item>
    </h-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);

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
      options,
    };
  },
});
</script>
