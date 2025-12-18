<script lang="ts" setup>
import { reactive, ref } from 'vue';

const list = reactive(
  Array(20)
    .fill('')
    .map((item, index) => {
      return {
        title: 'This is Title' + item,
        subtitle: 'subtitle',
        describe: `${index}: Aenean semper, dolor ac ultrices consequat, enim risus finibus lectus, sit amet egestas enim erat sed nunc. Duis consectetur commodo sapien, a tempus purus aliquam ut. Morbi id libero vel urna finibus auctor. Donec non lectus quis eros egestas hendrerit ac a nibh. Pellentesque sed tristique massa.`,
      };
    }),
);

const titleBold = ref(true);
const isZebra = ref(false);
const isSplit = ref(true);
</script>

<template>
  <n-form label-position="left">
    <n-form-item label="title bold">
      <n-radio-group v-model="titleBold">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-list :max-height="300" :zebra="isZebra" :split="isSplit" size="small">
    <n-list-item
      v-for="(item, index) in list"
      :key="index"
      :title-bold="titleBold"
      :title="item.title"
      :subtitle="item.subtitle"
      :describe="item.describe"
    />
  </n-list>
</template>

<style scoped>
.n-button + .n-button {
  margin-left: 10px;
}
</style>
