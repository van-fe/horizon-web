<template>
  <div class="container">
    <div class="container__block">
      <n-timeline>
        <n-timeline-item
          v-for="(item, index) in timelineData"
          :key="index"
          placement="top"
          :name="item.name"
          :tail="item.tail"
          :tail-color="item.tailColor"
          :timestamp="item.time"
          :color="item.color"
          :type="item.type"
          :icon="item.icon"
          offset="5"
          format="yyyy-MM-dd HH:ii:ss"
          border-color="var(--n-bg-brand-default)"
        />
      </n-timeline>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const timelineData = ref([
      {
        name: '已完成',
        time: '1632840112',
        color: 'var(--n-bg-brand-default)',
        type: 'circle',
        tailColor: '#00B3BE',
        icon:'check',
      },
      {
        name: '进行中',
        time: '1632840112',
        color: 'var(--n-bg-brand-default)',
        type: 'disc',
      },
      {
        name: '待开始',
        time: '1632840112',
        color: '',
        type: 'disc',
      },
      {
        name: '待开始',
        time: '1632840112',
        color: '',
        tail: false,
        type: 'disc',
      },
    ]);
    return {
      timelineData,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
}

.container__title {
  margin-bottom: 20px;
}

.container__block {
  margin-right: 50px;
}
</style>
<style>
.n-timeline-item__icon--medium{
  font-size: 8px;
  font-weight: bold;
}
</style>
