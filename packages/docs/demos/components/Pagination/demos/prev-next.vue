<template>
  <n-pagination :total="50" >
    <template #prev>
      <IconTriangleLeftFilled />
    </template>
    <template #next>
      <IconTriangleRightFilled />
    </template>
  </n-pagination>
</template>
<script setup lang="ts">
import {IconTriangleLeftFilled, IconTriangleRightFilled} from '@nio-fe/icon';
</script>
