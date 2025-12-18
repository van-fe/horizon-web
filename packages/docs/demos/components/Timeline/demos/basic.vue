<template>
  <div class="container">
    <div class="container__block">
      <div class="container__title">small大小</div>
      <n-timeline>
        <n-timeline-item
          v-for="(item, index) in timelineData"
          :key="index"
          :name="item.name"
          :tail="item.tail"
          :timestamp="item.time"
          size="small"
        />
      </n-timeline>
    </div>
    <div class="container__block">
      <div class="container__title">默认大小(medium)</div>
      <n-timeline>
        <n-timeline-item
          v-for="(item, index) in timelineData"
          :key="index"
          :name="item.name"
          :tail="item.tail"
          :timestamp="item.time"
        />
      </n-timeline>
    </div>
    <div class="container__block">
      <div class="container__title">large大小</div>
      <n-timeline>
        <n-timeline-item
          v-for="(item, index) in timelineData"
          :key="index"
          :name="item.name"
          :tail="item.tail"
          :timestamp="item.time"
          size="large"
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
        name: 'milestone 2022-03-01',
        time: '03/01/2022',
      },
      {
        name: 'milestone 2022-03-02',
        time: '03/02/2022',
      },
      {
        name: 'milestone 2022-02-02',
        time: '02/02/2022',
      },
      {
        name: 'milestone 2022-02-01',
        time: '02/01/2022',
        tail: false,
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
