<template>
  <div class="block">
    <h-button v-tooltip.small="'Small'">Small</h-button>
    <h-button v-tooltip.light="'Light'">Light</h-button>
    <h-button v-tooltip.small.light="'Small + Light'">Small + Light</h-button>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.block {
  display: flex;
}

.block .h-button {
  margin-left: 20px;
}
</style>
