<template>
  <n-row>
    <n-col :span="18">
      <div class="demo-title">容器中使用 <code>medium</code></div>
      <n-scrollbar height="400px">
        <div v-for="item of 20" :key="item" class="item">
          {{ item }}
        </div>
      </n-scrollbar>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">弹窗中使用 <code>small</code></div>
      <n-popover placement="bottom" :to-body="false">
        <template #popper>
          <n-pop-content>
            <n-scrollbar size="small" height="400px">
              <div v-for="item of 20" :key="item" class="item" style="width: 300px;">
                {{ item }}
              </div>
            </n-scrollbar>
          </n-pop-content>
        </template>
        <template #reference>
          <n-button>Hover Me</n-button>
        </template>
      </n-popover>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
.item {
  height: 40px;
  background: var(--n-bg-info-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
</style>
