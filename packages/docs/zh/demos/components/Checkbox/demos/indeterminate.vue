<template>
  <n-row>
    <n-col :span="24">
      <n-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="onCheckAllChanged">Check All</n-checkbox>
    </n-col>

    <n-col :span="24">
      <n-checkbox-group v-model="checked" @change="selectCheckbox">
        <n-checkbox label="1" class="checkbox">
          option 1
        </n-checkbox>
        <n-checkbox label="2" class="checkbox">
          option 2
        </n-checkbox>
      </n-checkbox-group>
    </n-col>
  </n-row>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
const checkAll = ref(false);

const checked = ref<string[]>(['1']);

const indeterminate = computed(() => checked.value.length > 0 && checked.value.length < 2);

const selectCheckbox = (val: string[]) => {
  console.log('selectCheckbox ==> ', val);
  checkAll.value = val.length === 2;
};

function onCheckAllChanged(val: boolean) {
  if (val) {
    checked.value = ['1', '2'];
  } else {
    checked.value = [];
  }
}
</script>

<style scoped>
.checkbox + .checkbox {
  margin-left: 15px;
}
</style>
