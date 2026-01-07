<script setup lang="ts">
import { ref } from 'vue';

  const value = ref();
</script>

<template>
  <h-row :gutter="10">
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">
        自定义空样式
      </div>
      <h-modal-select v-model="value" filter-option :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
        <template #empty>
          <div class="empty-city">没有找到对应的城市信息</div>
        </template>
      </h-modal-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">
        使用 h-empty 组件
      </div>
      <h-modal-select v-model="value" filter-option :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
        <template #empty>
          <h-empty description="没有找到对应的城市信息"></h-empty>
        </template>
      </h-modal-select>
    </h-col>
  </h-row>
</template>

<style scoped>
.empty-city {
  height: 200px;
  display: flex;
  aligh-items: center;
  justify-content: center;
}
</style>
