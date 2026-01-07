<template>
  <h-switch v-model="showTimeZone" status class="mb-2" status-oh-text="show time zone" status-off-text="hide time zone" />

  <h-application :show-time-zone="showTimeZone">
    <h-form>
      <h-form-item label="DatePicker">
        <h-row>
          <h-col :span="12">
            <h-date-picker v-model="value1" />
          </h-col>
          <h-col :span="12">
            <h-date-picker v-model="value2" type="date-minutes" />
          </h-col>
        </h-row>
      </h-form-item>
      <h-form-item label="Timeline">
        <h-row>
          <h-col :span="24">
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
          </h-col>
        </h-row>
      </h-form-item>
    </h-form>
  </h-application>
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
</script>
