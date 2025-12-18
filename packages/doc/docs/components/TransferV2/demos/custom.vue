<template>
  <n-transfer-v-2
    v-model="dataModel"
    :props="{ key: 'id', label: 'address' }"
    :data="data"
    type="table"
    style="width: auto"
  >
    <template #leftHeader>
      <div>leftHeader</div>
    </template>
    <template #leftBody="{ leftData }">
      {{ leftData }}
    </template>
    <template #leftEmpty>left no data</template>
    <template #leftFooter>leftFooter</template>
    <template #control>
      <n-button type="normal" :plain="true" icon="arrow_left" @click="transferToLeft" />
      <n-button
        type="normal"
        style="margin-left: 0"
        :plain="true"
        icon="arrow_right"
        @click="transferToRight"
      />
    </template>
    <template #rightHeader>
      <div>rightHeader</div>
    </template>
    <template #rightBody="{ rightData }">
      {{ rightData }}
    </template>
    <template #rightEmpty>right no data</template>
    <template #rightFooter>rightFooter</template>
  </n-transfer-v-2>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import type { TransferDataProps } from '@aurora/horizon-web';

const data = ref([]) as Ref<TransferDataProps[]>;
for (let i = 1; i <= 5; i++) {
  data.value.push({
    key: i,
    label: i == 3 ? `选项${i}被禁用了` : `选项名称 ${i}`,
    disabled: i == 3,
  });
}
const dataModel = ref([]);
const transferToLeft = () => {
  // 对leftData、rightData的一些操作
};
const transferToRight = () => {
  // 对leftData、rightData的一些操作
};

</script>

<style scoped></style>
