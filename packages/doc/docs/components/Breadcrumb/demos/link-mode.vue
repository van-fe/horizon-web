<template>
  <n-breadcrumb
    :separator="IconArrowRight"
    :texts="[
      { text: 'Home' },
      { text: 'Components', to: '../Components' },
      { text: 'Checkbox', to: 'Checkbox' },
    ]"
  />
</template>

<script setup lang="ts">
import { IconArrowRight } from '@nio-fe/icon';
</script>
