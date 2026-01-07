<template>
  <div>
    <h-button @click="add">增加条目</h-button>
    <h-button :disabled="items.length <= 3" @click="del">减少条目</h-button>
    <h-scrollbar max-height="400px" class="mt-4">
      <div class="wrap">
        <div v-for="item of items" :key="item" class="item">
          {{ item }}
        </div>
      </div>
    </h-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([1, 2, 3]);

function add() {
  items.value.push(items.value.length + 1);
}

function del() {
  items.value.pop();
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.item {
  height: 40px;
  background: var(--n-bg-info-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
}

.h-button + .h-button {
  margin-left: 10px;
}
</style>
