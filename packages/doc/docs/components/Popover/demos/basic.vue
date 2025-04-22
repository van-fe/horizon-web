<script setup lang="ts"></script>

<template>
  <n-popover placement="auto">
    <template #reference>
      <n-button type="normal">Hover me</n-button>
    </template>
    <template #popper>
      <n-pop-content>
        <div>Hello World</div>
      </n-pop-content>
    </template>
  </n-popover>
</template>