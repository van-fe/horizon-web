<template>
  <n-row>
    <n-col :span="24">
      <n-radio
        v-model="radio"
        :value="1"
        class="radio"
        @change="selectRadio"
      >
        Option 1
      </n-radio>
      <n-radio
        v-model="radio"
        :value="2"
        class="radio"
        @change="selectRadio"
      >
        Option 2
      </n-radio>
    </n-col>
  </n-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref(1);

const selectRadio = (val: boolean) => {
  console.info('selectRadio ==> ', val);
};
</script>

<style scoped>
.radio + .radio {
  margin-left: 15px;
}
</style>
