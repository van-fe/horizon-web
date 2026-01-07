<template>
  <div class="container">
    <div class="container__block">
      <h-timeline v2>
        <h-timeline-item
          v-for="(item, index) in timelineData"
          :key="index"
          placement="top"
          :name="item.name"
          :tail="item.tail"
          :timestamp="item.time"
          :color="item.color"
          :type="item.type"
          size="small"
          offset="-1"
          :tail-color="item.tailColor"
          border-color="var(--h-bg-brand-default)"
        />
      </h-timeline>
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
        color: 'var(--h-bg-brand-default)',
        type: 'circle',
        tailColor: '#00B3BE',
      },
      {
        name: '进行中',
        time: '1632840112',
        color: 'var(--h-bg-brand-default)',
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
  margih-bottom: 20px;
}

.container__block {
  margih-right: 50px;
}
</style>
<style>
.h-timeline-item__icoh--medium {
  font-size: 8px;
}
</style>
