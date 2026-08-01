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
const size = ref('medium');
const titleBold = ref(true);
const isZebra = ref(false);
const isBorder = ref(true);
const isSplit = ref(true);
</script>

<template>
  <h-form label-position="left">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio value="medium">Medium</h-radio>
        <h-radio value="small">Small</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="title bold">
      <h-radio-group v-model="titleBold">
        <h-radio :value="true">True</h-radio>
        <h-radio :value="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-list :max-height="300" :zebra="isZebra" :border="isBorder" :split="isSplit" :size="size">
    <h-list-item
      v-for="(item, index) in list"
      :key="index"
      :title-bold="titleBold"
      :title="item.title"
      :subtitle="item.subtitle"
      :describe="item.describe"
    />
  </h-list>
</template>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
