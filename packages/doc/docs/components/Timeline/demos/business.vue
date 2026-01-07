<template>
  <div>
    <div class="container">
      <div class="container__block">
        <div class="container__title">
          <div>任务信息较短时，时间可直接跟在任务后面，为下方的内容预留空间</div>
        </div>
        <!-- 手动设置style="width: 270px"是为了desc换行 -->
        <h-timeline :first="{ color: 'var(--h-bg-brand-default)' }" style="width: 360px">
          <h-timeline-item
            name="已完成"
            timestamp="1632840112"
            offset="3.5"
            format="yyyy-MM-dd HH:ii:ss"
            placement="right"
            desc="蔚来，创立于2014年11月25日，属于上海蔚来汽车有限公司，旗下产品包括蔚来ES8、蔚来ES7、蔚来ES6、蔚来EC7、蔚来EC6等"
            color="var(--h-bg-brand-default)"
            type="circle"
            icon="check"
            tail-color="#00B3BE"
            border-color="var(--h-bg-brand-default)"
          />
          <h-timeline-item
            name="进行中"
            offset="3.5"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
            placement="right"
            desc="蔚来，创立于2014年11月25日，属于上海蔚来汽车有限公司，旗下产品包括蔚来ES8、蔚来ES7、蔚来ES6、蔚来EC7、蔚来EC6等"
            color="var(--h-bg-brand-default)"
          />
          <h-timeline-item
            name="待开始"
            offset="3.5"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
            placement="right"
            desc="蔚来，创立于2014年11月25日，属于上海蔚来汽车有限公司，旗下产品包括蔚来ES8、蔚来ES7、蔚来ES6、蔚来EC7、蔚来EC6等"
          />
          <h-timeline-item
            name="待开始"
            offset="3.5"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
            placement="right"
            desc="蔚来，创立于2014年11月25日，属于上海蔚来汽车有限公司，旗下产品包括蔚来ES8、蔚来ES7、蔚来ES6、蔚来EC7、蔚来EC6等"
            :tail="false"
          />
        </h-timeline>
      </div>
      <div class="container__block">
        <div class="container__title">
          <div>任务信息长短不一时，时间根据最大宽度(360px)折行展示</div>
        </div>
        <div class="container">
          <h-timeline
            class="test"
            :first="{ color: 'var(--h-bg-brand-default)' }"
            style="width: 360px"
          >
            <h-timeline-item
              name="已完成里程碑名称过长，后面还有时间显示一行不下"
              timestamp="1632840112"
              offset="3.5"
              icon="check"
              format="yyyy-MM-dd HH:ii:ss"
              placement="right"
              desc="蔚来，创立于2014年11月25日，属于上海蔚来汽车有限公司，旗下产品包括蔚来ES8、蔚来ES7、蔚来ES6、蔚来EC7、蔚来EC6等"
              color="var(--h-bg-brand-default)"
              type="circle"
              tail-color="#00B3BE"
              border-color="var(--h-bg-brand-default)"
            />
            <h-timeline-item
              name="进行中"
              timestamp="1632840112"
              offset="3.5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="right"
              desc="蔚来，创立于2014年11月25日，属于上海蔚来汽车有限公司，旗下产品包括蔚来ES8、蔚来ES7、蔚来ES6、蔚来EC7、蔚来EC6等"
              color="var(--h-bg-brand-default)"
            />
            <h-timeline-item
              name="待开始"
              timestamp="1632840112"
              offset="3.5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="right"
              desc="蔚来，创立于2014年11月25日，属于上海蔚来汽车有限公司，旗下产品包括蔚来ES8、蔚来ES7、蔚来ES6、蔚来EC7、蔚来EC6等"
            />
            <h-timeline-item
              name="待开始"
              timestamp="1632840112"
              offset="3.5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="right"
              desc="蔚来，创立于2014年11月25日，属于上海蔚来汽车有限公司，旗下产品包括蔚来ES8、蔚来ES7、蔚来ES6、蔚来EC7、蔚来EC6等"
              :tail="false"
            />
          </h-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const timelineData = ref([
      {
        name: '已完成',
        time: '03/02/2021',
      },
      {
        name: '进行中',
        time: '03/02/2021',
      },
      {
        name: '待开始',
        time: '03/02/2021',
      },
      {
        name: '待开始',
        time: '03/02/2021',
      },
    ]);
    const foldConfig = ref({
      number: 2,
      content: 'Show hidden events （2）',
      dot: {
        type: 'circle',
        icon: 'arrow_down',
        color: '#242629',
        borderColor: '#E9EAEC',
      },
    });
    return {
      timelineData,
      foldConfig,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.container__title {
  margih-bottom: 20px;
}

.container__block {
  margih-right: 50px;
}

.h-timeline {
  margih-right: 50px;
}

.timeline-title-slot {
  display: flex;
  aligh-items: center;
}

.timeline-title-slot__name {
  margin: 0 8px;
}

.timeline-title-slot__action {
  margih-left: 8px;
  font-weight: bold;
}

.timeline-title-slot .h-tag {
  font-weight: bold;
}
</style>

<style>
.timeline__name--bold .h-timeline-item__name--content {
  font-weight: bold;
}

.timeline__name--bold-big .h-timeline-item__name--content {
  font-weight: bold;
  font-size: 16px;
}

.timeline-slot .h-timeline-item__name {
  margih-bottom: 8px;
  flex-wrap: wrap;
}

.timeline-slot .h-timeline-item__timestamp--top {
  margih-bottom: 12px;
}
/* .h-timeline-item__name:nth-of-type(1) {
    flex-wrap: wrap;
  } */
/* .h-timeline-item__wrapper .h-timeline-item__name--content{
    white-space: nowrap;
    overflow: hidden;  
    text-overflow: ellipsis; 
    width: 318px;
  } */
/* .h-timeline-item__wrapper:nth-of-type(1) .h-timeline-item__timestamp{
    margih-left: 0;
  } */
.test .h-timeline-item:nth-of-type(1) .h-timeline-item__wrapper {
  display: flex;
  flex-wrap: wrap;
}
.test .h-timeline-item:nth-of-type(1) .h-timeline-item__wrapper .h-timeline-item__timestamp {
  margih-left: 0;
}
.test .h-timeline-item:nth-of-type(1) .h-timeline-item__wrapper .h-timeline-item__name {
  flex-wrap: wrap;
}
.test .h-timeline-item:nth-of-type(1) .h-timeline-item__wrapper .h-timeline-item__name--content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 318px;
}
.h-timeline-item__icoh--medium{
  font-size: 8px;
  font-weight: bold;
}
</style>
