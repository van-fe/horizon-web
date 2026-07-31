<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
</script>

<template>
  <h-grid :gap="10">
    <h-grid-item :span="{ xs: 12, md: 8, lg: 6, xl: 6, xxl: 6 }">
      <div class="demo-title">自定义空样式</div>
      <h-select v-model="value" filterable :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
        <template #empty>
          <div class="empty-city">没有找到对应的城市信息</div>
        </template>
      </h-select>
    </h-grid-item>
    <h-grid-item :span="{ xs: 12, md: 8, lg: 6, xl: 6, xxl: 6 }">
      <div class="demo-title">使用 h-empty 组件</div>
      <h-select v-model="value" filterable :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
        <template #empty>
          <h-empty description="没有找到对应的城市信息"></h-empty>
        </template>
      </h-select>
    </h-grid-item>
  </h-grid>
</template>

<style scoped>
.empty-city {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
