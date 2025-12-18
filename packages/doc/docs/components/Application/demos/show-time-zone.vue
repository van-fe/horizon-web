<template>
  <n-switch v-model="showTimeZone" status class="mb-2" status-on-text="show time zone" status-off-text="hide time zone" />

  <n-application :show-time-zone="showTimeZone">
    <n-form>
      <n-form-item label="DatePicker">
        <n-row>
          <n-col :span="12">
            <n-date-picker v-model="value1" />
          </n-col>
          <n-col :span="12">
            <n-date-picker v-model="value2" type="date-minutes" />
          </n-col>
        </n-row>
      </n-form-item>
      <n-form-item label="Timeline">
        <n-row>
          <n-col :span="24">
            <n-timeline v2>
              <n-timeline-item
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
                border-color="var(--n-bg-brand-default)"
              />
            </n-timeline>
          </n-col>
        </n-row>
      </n-form-item>
    </n-form>
  </n-application>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showTimeZone = ref(true);
const value1 = ref(new Date());
const value2 = ref(new Date());

const timelineData = ref([
  {
    name: '已完成',
    time: '1632840112',
    color: 'var(--n-bg-brand-default)',
    type: 'circle',
    tailColor: '#00B3BE',
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
</script>
