<template>
  <n-form>
    <n-row>
      <n-form-item label="style">
      <n-radio-group v-model="inputStyle">
        <n-radio
          v-for="(label, index) in ['normal', 'no-border']"
          :key="index"
          :label="label"
          size="small"
        />
      </n-radio-group>
    </n-form-item>
    </n-row>
    <n-row>
      <n-col :span="8">
        <n-form-item label="Medium">
          <n-input v-model="val2" size="medium" :input-style = 'inputStyle'/>
        </n-form-item>
      </n-col>
      <n-col :span="8">
        <n-form-item label="Small">
          <n-input v-model="val3" size="small" :input-style = 'inputStyle'/>
        </n-form-item>
      </n-col>
    </n-row>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val1 = ref('');
    const val2 = ref('');
    const val3 = ref('');
    const inputStyle = ref('normal');
    return {
      val1,
      val2,
      val3,
      inputStyle,
    };
  },
});
</script>
