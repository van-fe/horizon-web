<template>
  <h-grid :gap="10">
    <h-grid-item :span="6">
      <div class="demo-title">单选：选项长度超长</div>
      <h-select v-model="value1" :to-body="false">
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </h-select>
    </h-grid-item>

    <h-grid-item :span="6">
      <div class="demo-title">单选：过滤+选项长度超长</div>
      <h-select v-model="value2" filterable :to-body="false">
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </h-select>
    </h-grid-item>

    <h-grid-item :span="6">
      <div class="demo-title">多选：选项长度超长</div>
      <h-select
        v-model="values1"
        multiple
        :to-body="false"
        :collapse-tags="true"
        :collapse-tags-fill-up="true"
      >
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option label="上海" :value="3" />
        <h-option :value="4" label="北京" />
        <h-option :value="5" label="合肥" name="hefei" />
        <h-option
          :value="6"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </h-select>
    </h-grid-item>

    <h-grid-item :span="6">
      <div class="demo-title">多选：过滤+选项长度超长</div>
      <h-select
        v-model="values2"
        :multiple="true"
        :filterable="true"
        :collapse-tags="true"
        collapse-tags-fill-up
        :to-body="false"
      >
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </h-select>
    </h-grid-item>

    <h-grid-item :span="6">
      <div class="demo-title">选项行数设定为2</div>
      <h-select
        v-model="values3"
        :multiple="true"
        :filterable="true"
        :collapse-tags="true"
        :to-body="false"
      >
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option
          :value="3"
          :max-lines="2"
          label="这是一个超长的选项，非常非常长，如果没有显示省略号，则是因为还不够长，还需要增加一些文字才可以够长"
        />
      </h-select>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const value2 = ref();
const values1 = ref([]);
const values2 = ref([]);
const values3 = ref([]);
</script>
