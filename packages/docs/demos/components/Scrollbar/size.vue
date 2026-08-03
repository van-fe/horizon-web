<template>
  <h-grid :gap="12">
    <h-grid-item :span="18">
      <div class="demo-title">容器中使用 <code>medium</code></div>
      <h-scrollbar height="400px">
        <div v-for="item of 20" :key="item" class="item">
          {{ item }}
        </div>
      </h-scrollbar>
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">弹窗中使用 <code>small</code></div>
      <h-popover placement="bottom" :to-body="false">
        <template #popper>
          <h-pop-content>
            <h-scrollbar size="small" height="400px">
              <div v-for="item of 20" :key="item" class="item" style="width: 300px;">
                {{ item }}
              </div>
            </h-scrollbar>
          </h-pop-content>
        </template>
        <template #reference>
          <h-button>Hover Me</h-button>
        </template>
      </h-popover>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
</script>

<style scoped>
.item {
  height: 40px;
  background: var(--h-bg-info-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
</style>
