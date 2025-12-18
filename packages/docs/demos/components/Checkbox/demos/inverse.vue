<template>
    <n-row>
      <n-col :span="24">
        <n-button @click="inverse">toggle</n-button>
      </n-col>
      <n-col :span="24">
        <n-checkbox
          v-for="(item, index) in checkboxOptions"
          :ref="el => (myRefs[index] = el)"
          :key="item.key"
          v-model="item.checked"
          :label="item.label"
          class="checkbox"
          @change="selectCheckbox"
        />
      </n-col>
    </n-row>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  const checkboxOptions = ref([
    {
      key: 1,
      label: 'checkbox1',
      checked: true,
    },
    {
      key: 2,
      label: 'checkbox2',
      checked: false,
    },
    {
      key: 3,
      label: 'checkbox3',
      checked: false,
    },
    {
      key: 4,
      label: 'checkbox4',
      checked: true,
    },
    {
      key: 5,
      label: 'checkbox5',
      checked: true,
    },
    {
      key: 6,
      label: 'checkbox6',
      checked: false,
    },
  ]);

  const myRefs = ref([]);

  const selectCheckbox = (val: boolean) => {
    console.log('selectCheckbox ==> ', val);
  };

  const inverse = () => {
    myRefs.value.forEach((item: any) => {
      item.toggle();
    });
  };
  </script>
  
  <style scoped>
  .checkbox + .checkbox {
    margin-left: 15px;
  }
  </style>