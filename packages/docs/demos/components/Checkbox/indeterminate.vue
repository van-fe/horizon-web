<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="onCheckAllChanged">Check All</h-checkbox>
    </h-grid-item>

    <h-grid-item :span="24">
      <h-checkbox-group v-model="checked" @change="selectCheckbox">
        <h-checkbox label="1" class="checkbox">
          option 1
        </h-checkbox>
        <h-checkbox label="2" class="checkbox">
          option 2
        </h-checkbox>
      </h-checkbox-group>
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
const checkAll = ref(false);

const checked = ref<string[]>(['1']);

const indeterminate = computed(() => checked.value.length > 0 && checked.value.length < 2);

const selectCheckbox = (val: string[]) => {
  console.info('selectCheckbox ==> ', val);
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
