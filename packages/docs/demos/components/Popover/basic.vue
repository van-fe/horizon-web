<script setup lang="ts"></script>

<template>
  <h-popover placement="auto">
    <template #reference>
      <h-button>Hover me</h-button>
    </template>
    <template #popper>
      <h-pop-content>
        <div>Hello World</div>
      </h-pop-content>
    </template>
  </h-popover>
</template>