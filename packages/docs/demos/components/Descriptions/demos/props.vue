<template>
  <div class="container">
    <div style="display: flex; align-items: center">
      <n-checkbox-button v-model="checked" @change="setTitle">Set Title</n-checkbox-button>
      <n-checkbox-button v-model="border">Border</n-checkbox-button>
      <div>Type：</div>
      <n-radio-group v-model="type">
        <n-radio-button v-for="(label, index) in typeOptions" :key="index" :label="label" />
      </n-radio-group>
      <div>Size：</div>
      <n-radio-group v-model="size">
        <n-radio-button v-for="(label, index) in sizeOptions" :key="index" :label="label" />
      </n-radio-group>
      <div>LabelPosition：</div>
      <n-radio-group v-model="LabelPosition">
        <n-radio-button v-for="(label, index) in ['left', 'top']" :key="index" :label="label" />
      </n-radio-group>
      <div>Column：</div>
      <n-radio-group v-model="column">
        <n-radio-button v-for="(label, index) in [1, 2]" :key="index" :label="label" />
      </n-radio-group>
    </div>
    <n-descriptions
      :title="title"
      :border="border"
      :type="type"
      :size="size"
      :label-position="LabelPosition"
      :column="column"
    >
      <n-description-item
        v-for="(item, index) in data"
        :key="index"
        :label="item.label"
        :value="item.value"
        :span-col="index === data.length - 1 ? column : 1"
      />
    </n-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const data = ref([
      { label: 'Name', value: 'bingkun Zhou' },
      { label: 'Telephone', value: '0924-250492' },
      { label: 'Residence', value: 'Norway' },
      { label: 'City', value: 'Oslo' },
      { label: 'Address', value: 'Leg.Kiropraktor Iréne Johnson' },
    ]);
    const border = ref(false);
    const type = ref('vertical');
    const size = ref('medium');
    const typeOptions = ref(['horizontal', 'vertical']);
    const sizeOptions = ref(['small', 'medium', 'large']);
    const title = ref('');
    const LabelPosition = ref('left');
    const checked = ref(false);
    const column = ref(1);
    const setTitle = (val: boolean) => {
      title.value = val ? 'User Info' : '';
    };
    return {
      data,
      border,
      type,
      size,
      typeOptions,
      sizeOptions,
      title,
      setTitle,
      checked,
      LabelPosition,
      column,
    };
  },
});
</script>

<style scoped>
.n-descriptions {
  padding: 32px 24px 16px;
}

.container .n-checkbox-button,
.container .n-radio-group {
  margin-right: 20px;
}
</style>
