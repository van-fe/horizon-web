<template>
  <h-row>
    <h-col :span="8">
      <div class="demo-title">medium(default)</div>
      <h-radio-button
        v-model="radio"
        :value="1"
        class="radio"
        size="medium"
        :border="true"
        @change="selectRadio"
      >
        Option 1
      </h-radio-button>
      <h-radio-button
        v-model="radio"
        :value="2"
        class="radio"
        size="medium"
        :border="true"
        @change="selectRadio"
      >
        Option 2
      </h-radio-button>
    </h-col>
    <h-col :span="8">
      <div class="demo-title">large</div>
      <h-radio-button
        v-model="radio"
        :value="1"
        class="radio"
        size="large"
        :border="true"
        @change="selectRadio"
      >
        Option 1
      </h-radio-button>
      <h-radio-button
        v-model="radio"
        :value="2"
        class="radio"
        size="large"
        :border="true"
        @change="selectRadio"
      >
        Option 2
      </h-radio-button>
    </h-col>
  </h-row>
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
  margin-left: 12px;
}
</style>
