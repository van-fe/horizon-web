<template>
  <div class="block">
    <n-button v-tooltip.small="'Small'">Small</n-button>
    <n-button v-tooltip.light="'Light'">Light</n-button>
    <n-button v-tooltip.small.light="'Small + Light'">Small + Light</n-button>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.block {
  display: flex;
}

.block .n-button {
  margin-left: 20px;
}
</style>
