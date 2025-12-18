<script setup lang="ts">
import { ref } from 'vue';

  const value = ref();
</script>

<template>
  <n-row :gutter="10">
    <n-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">
        自定义空样式
      </div>
      <n-modal-select v-model="value" filter-option :to-body="false">
        <n-option label="上海" :value="1" />
        <n-option :value="2" label="北京" />
        <n-option :value="3" label="合肥" name="hefei" />
        <template #empty>
          <div class="empty-city">没有找到对应的城市信息</div>
        </template>
      </n-modal-select>
    </n-col>
    <n-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">
        使用 n-empty 组件
      </div>
      <n-modal-select v-model="value" filter-option :to-body="false">
        <n-option label="上海" :value="1" />
        <n-option :value="2" label="北京" />
        <n-option :value="3" label="合肥" name="hefei" />
        <template #empty>
          <n-empty description="没有找到对应的城市信息"></n-empty>
        </template>
      </n-modal-select>
    </n-col>
  </n-row>
</template>

<style scoped>
.empty-city {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
