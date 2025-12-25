<template>
  <div class="text-subtitle-2 mb-2">自定义分隔符</div>
  <n-breadcrumb
    class="mb-2"
    :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]"
    separator="*"
  />
  <n-breadcrumb :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]">
    <template #separator><a-icon name="gift" size="12" /></template>
  </n-breadcrumb>
  <!--  -->
  <div class="text-subtitle-2 mt-4 mb-2">自定义面包屑内容</div>
  <n-breadcrumb>
    <n-breadcrumb-item>Home</n-breadcrumb-item>
    <n-breadcrumb-item>
      Sub Page1
      <a-icon name="repair_filled" size="12" />
    </n-breadcrumb-item>
    <n-breadcrumb-item>Sub Page2</n-breadcrumb-item>
  </n-breadcrumb>
  <!--  -->
  <div class="text-subtitle-2 mt-4 mb-2">自定义面包屑内容，并自定义分隔符</div>
  <n-breadcrumb>
    <n-breadcrumb-item separator="*">Home</n-breadcrumb-item>
    <n-breadcrumb-item separator="?">Sub Page1</n-breadcrumb-item>
    <n-breadcrumb-item separator="!">Sub Page2</n-breadcrumb-item>
  </n-breadcrumb>
  <n-breadcrumb>
    <n-breadcrumb-item>
      Home
      <template #separator>*</template>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      Sub Page1
      <template #separator>?</template>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      Sub Page2
      <template #separator>!</template>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    AIcon,
  },
});
</script>
