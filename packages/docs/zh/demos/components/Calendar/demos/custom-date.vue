<script setup lang="ts">
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');

const actionList = [
  {
    time: '09:00',
    text: '每日三省吾身之一',
  },
  {
    time: '09:10',
    text: '今天算了',
  },
  {
    time: '09:20',
    text: '还是省一下吧',
  },
  {
    time: '09:30',
    text: '每日三省吾身之一',
  },
  {
    time: '10:30',
    text: '每日三省吾身之二',
  },
  {
    time: '11:30',
    text: '每日三省吾身之三',
  },
];
</script>

<template>
  <n-calendar>
    <template #dateCellAppend="dateFormat">
      <div v-if="today === dateFormat" class="wrap">
        <div v-for="item of actionList.slice(0, 3)" :key="item.time" class="row">
          <div class="dot" />
          {{ item.time }} {{item.text}}
        </div>
        <template v-if="actionList.length > 3">
          <n-popover placement="bottom-start" :arrow="false" :distance="0">
            <template #reference>
              <div class="row desc">
                还有{{ actionList.length - 3 }}个日程
              </div>
            </template>
            <template #popper>
              <n-pop-content class="pop-content">
                <div class="title">{{ dayjs().format('MM.DD dddd') }}</div>
                <div class="content">
                  <div v-for="item of actionList.slice(3)" :key="item.time" class="row">
                    <div class="dot" />
                    {{ item.time }} {{item.text}}
                  </div>
                </div>
              </n-pop-content>
            </template>
          </n-popover>
        </template>
      </div>
    </template>
  </n-calendar>
</template>

<style>
.wrap {
  margin: 0 -8px;
}

.row {
  height: 26px;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.row.desc {
  color: var(--n-text-disabled);
  cursor: pointer;
}

.pop-content {
  padding: 20px;
  width: 300px;
}

.title {
  height: 28px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid var(--n-divider-default);
  padding-bottom: 17px;
  margin-bottom: 15px;
}

.dot {
  width: 8px;
  height: 8px;
  background: var(--n-bg-brand-default);
  margin-right: 4px;
}
</style>
