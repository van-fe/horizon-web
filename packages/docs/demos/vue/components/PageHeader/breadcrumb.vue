<template>
  <h-page-header :icon="null" title="August release plan">
    <template #breadcrumb>
      <h-breadcrumb :separator="IconArrowRight" display-type="ellipsis">
        <h-breadcrumb-item>Workspaces</h-breadcrumb-item>
        <h-breadcrumb-item>Horizon Web</h-breadcrumb-item>
        <h-breadcrumb-item>Releases</h-breadcrumb-item>
        <h-breadcrumb-item>August</h-breadcrumb-item>
      </h-breadcrumb>
    </template>
  </h-page-header>
</template>

<script setup lang="ts">
import { IconArrowRight } from '@aurora/icon';
</script>
