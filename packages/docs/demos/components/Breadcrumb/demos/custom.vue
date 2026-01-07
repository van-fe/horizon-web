<template>
  <div class="text-subtitle-2 mb-2">自定义分隔符</div>
  <h-breadcrumb
    class="mb-2"
    :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]"
    separator="*"
  />
  <h-breadcrumb :texts="[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]">
    <template #separator><a-icon name="gift" size="12" /></template>
  </h-breadcrumb>
  <!--  -->
  <div class="text-subtitle-2 mt-4 mb-2">自定义面包屑内容</div>
  <h-breadcrumb>
    <h-breadcrumb-item>Home</h-breadcrumb-item>
    <h-breadcrumb-item>
      Sub Page1
      <a-icon name="repair_filled" size="12" />
    </h-breadcrumb-item>
    <h-breadcrumb-item>Sub Page2</h-breadcrumb-item>
  </h-breadcrumb>
  <!--  -->
  <div class="text-subtitle-2 mt-4 mb-2">自定义面包屑内容，并自定义分隔符</div>
  <h-breadcrumb>
    <h-breadcrumb-item separator="*">Home</h-breadcrumb-item>
    <h-breadcrumb-item separator="?">Sub Page1</h-breadcrumb-item>
    <h-breadcrumb-item separator="!">Sub Page2</h-breadcrumb-item>
  </h-breadcrumb>
  <h-breadcrumb>
    <h-breadcrumb-item>
      Home
      <template #separator>*</template>
    </h-breadcrumb-item>
    <h-breadcrumb-item>
      Sub Page1
      <template #separator>?</template>
    </h-breadcrumb-item>
    <h-breadcrumb-item>
      Sub Page2
      <template #separator>!</template>
    </h-breadcrumb-item>
  </h-breadcrumb>
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
