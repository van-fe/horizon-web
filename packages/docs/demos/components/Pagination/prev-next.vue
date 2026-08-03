<template>
  <h-pagination :total="50" >
    <template #prev>
      <IconTriangleLeftFilled />
    </template>
    <template #next>
      <IconTriangleRightFilled />
    </template>
  </h-pagination>
</template>
<script setup lang="ts">
import {IconTriangleLeftFilled, IconTriangleRightFilled} from '@aurora/icon';
</script>
