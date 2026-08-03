<template>
  <h-space wrap>
    <h-button :icon="IconEdit">Edit profile</h-button>
    <h-button type="danger" plain :icon="IconRubbish" aria-label="Delete draft" />
    <h-button type="normal" loading :icon="IconEye">Preparing preview</h-button>
  </h-space>
</template>

<script setup lang="ts">
import { IconEdit, IconEye, IconRubbish } from '@aurora/icon';
</script>
