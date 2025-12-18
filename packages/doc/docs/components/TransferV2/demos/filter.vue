<template>
  <n-transfer-v-2
    v-model="dataModel"
    :filterable="true"
    :filter-method="filterMethod"
    :data="data"
    show-control
    style="width: 592px"
  ></n-transfer-v-2>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import type { TransferDataProps } from '@nio-fe/lego';

export default defineComponent({
  setup() {
    const data = ref([
      {
        key: 'a',
        label: '选项名称 1',
      },
      {
        key: 'b',
        label: '选项名称 2',
      },
      {
        key: 'c',
        label: '选项名称 3',
      },
      {
        key: 'd',
        label: '选项名称 4',
      },
      {
        key: 'e',
        label: '选项名称 5',
      },
    ]) as Ref<TransferDataProps[]>;
    const dataModel = ref(['a', 'b']);

    const filterMethod = (query: string, option: any) => {
      return option.key.indexOf(query) > -1;
    };

    return {
      data,
      dataModel,
      filterMethod,
    };
  },
});
</script>
