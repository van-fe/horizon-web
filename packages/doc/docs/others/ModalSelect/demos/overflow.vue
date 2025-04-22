<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">单选：选项长度超长</div>
      <n-modal-select v-model="value1" :to-body="false" clearable>
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option
          :value="3"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </n-modal-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">单选：过滤+选项长度超长</div>
      <n-modal-select v-model="value2" filter-option :to-body="false">
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option
          :value="3"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </n-modal-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">多选：选项长度超长</div>
      <n-modal-select v-model="values1" multiple :to-body="false" :collapse="true" :collapse-tags-fill-up="true">
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option label="上海" :value="3" />
        <n-option :value="4" label="北京" />
        <n-option :value="5" label="合肥" name="hefei" />
        <n-option
          :value="6"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </n-modal-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">多选：过滤+选项长度超长</div>
      <n-modal-select v-model="values2" :multiple="true" :filter-option="true" :collapse="true" collapse-tags-fill-up :to-body="false">
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option
          :value="3"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </n-modal-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">选项行数设定为2</div>
      <n-modal-select v-model="values3" :multiple="true" :filter-option="true" :collapse="true" :to-body="false">
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option
          :value="3"
          :max-lines="2"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </n-modal-select>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const value2 = ref();
const values1 = ref([]);
const values2 = ref([]);
const values3 = ref([]);
</script>
