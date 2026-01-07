<template>
  <NHover v-slot="{ hover }" :disabled="true">
    <div class="container">
      <span>容器</span>
      <h-button v-if="hover" size="medium">删除</h-button>
    </div>
  </NHover>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  aligh-items: center;
  height: 70px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  background-color: var(--h-bg-success-weak-activated);
}
</style>
