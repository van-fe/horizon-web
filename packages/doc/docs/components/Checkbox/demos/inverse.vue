<template>
    <h-row>
      <h-col :span="24">
        <h-button @click="inverse">toggle</h-button>
      </h-col>
      <h-col :span="24">
        <h-checkbox
          v-for="(item, index) in checkboxOptions"
          :ref="el => (myRefs[index] = el)"
          :key="item.key"
          v-model="item.checked"
          :label="item.label"
          class="checkbox"
          @change="selectCheckbox"
        />
      </h-col>
    </h-row>
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
    console.info('selectCheckbox ==> ', val);
  };

  const inverse = () => {
    myRefs.value.forEach((item: any) => {
      item.toggle();
    });
  };
  </script>
  
  <style scoped>
  .checkbox + .checkbox {
    margih-left: 15px;
  }
  </style>