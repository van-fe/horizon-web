<template>
  <div>
    <div class="container">
      <div class="container__block">
        <div class="container__title">
          添加描述信息
          <div>可根据节点内容，自定义节点文本内容；</div>
        </div>
        <!-- 手动设置style="width: 270px"是为了desc换行 -->
        <h-timeline :first="{ color: 'var(--h-bg-brand-default)' }" style="width: 270px">
          <h-timeline-item
            name="Current milestone"
            timestamp="03/02/2021"
            desc="Demo installed its 700th battery swap station in China, hitting its annual target ahead of schedule."
          />
          <h-timeline-item name="The third milestone" timestamp="03/02/2021" />
          <h-timeline-item name="The second milestone" timestamp="03/02/2021" />
          <h-timeline-item name="The first milestone" timestamp="03/02/2021" :tail="false" />
        </h-timeline>
      </div>
      <div class="container__block">
        <div class="container__title">
          ⾃定义时间戳
          <div>
            时间有三种排列方式：置顶、置右、置下
            <br />
            可以将时间格式化
          </div>
        </div>
        <div class="container">
          <h-timeline>
            <h-timeline-item
              name="The third milestone"
              timestamp="03/02/2021 14:32"
              placement="top"
            />
            <h-timeline-item name="The second milestone" timestamp="03/02/2021 14:32" />
            <h-timeline-item
              name="The first milestone"
              timestamp="03/02/2021 14:32"
              placement="right"
            />
            <h-timeline-item
              name="The first milestone"
              timestamp="03/02/2021 14:32"
              placement="right"
              format="mm/dd/yyyy h:i"
              :tail="false"
            />
          </h-timeline>
        </div>
      </div>
      <div class="container__block">
        <div class="container__title">
          自定义时间顺序
          <div>可以按照时间顺序/逆序展示</div>
        </div>
        <div class="container">
          <h-timeline sort="order" :first="{ color: 'var(--h-bg-brand-default)' }">
            <h-timeline-item
              name="Current milestone"
              timestamp="03/05/2021"
              placement="top"
              :tail="false"
            />
            <h-timeline-item name="The first milestone" timestamp="03/02/2021" placement="top" />
            <h-timeline-item name="The second milestone" timestamp="03/03/2021" placement="top" />
            <h-timeline-item name="The third milestone" timestamp="03/04/2021" placement="top" />
          </h-timeline>
          <h-timeline sort="reverse" :first="{ color: 'var(--h-bg-brand-default)' }">
            <h-timeline-item name="Current milestone" timestamp="03/05/2021" placement="top" />
            <h-timeline-item
              name="The first milestone"
              timestamp="03/02/2021"
              placement="top"
              :tail="false"
            />
            <h-timeline-item name="The second milestone" timestamp="03/03/2021" placement="top" />
            <h-timeline-item name="The third milestone" timestamp="03/04/2021" placement="top" />
          </h-timeline>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="container__block">
        <div class="container__title">
          自定义节点样式
          <div>可根据实际业务情况，自定义节点内容，如错误、预警、成功签收等状态；</div>
        </div>
        <div class="container">
          <h-timeline>
            <h-timeline-item
              name="Current milestone"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-brand-default)"
            />
            <h-timeline-item
              name="An unknown error has occurred"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-error-default)"
            />
            <h-timeline-item
              name="The second milestone"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-warning-default)"
            />
            <h-timeline-item
              name="The second milestone"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-success-default)"
            />
            <h-timeline-item
              name="The first milestone"
              timestamp="03/02/2021"
              placement="top"
              :tail="false"
            />
          </h-timeline>
          <h-timeline>
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-brand-default)"
              icon="email"
              offset="8"
            />
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-error-default)"
              icon="close"
              offset="8"
            />
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-warning-default)"
              icon="light_on"
              offset="8"
            />
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-success-default)"
              icon="check"
              offset="8"
            />
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="03/02/2021"
              placement="top"
              color="#242629"
              icon="check"
              type="circle"
              offset="8"
              :tail="false"
            />
          </h-timeline>
        </div>
      </div>
      <div class="container__block">
        <div class="container__title">
          自定义节点内容
          <div>可根据实际业务情况，自定义节点内容，如内文、图片、回复等；</div>
        </div>
        <h-timeline class="timeline-slot">
          <h-timeline-item placement="top" timestamp="03/02/2021" color="var(--h-bg-brand-default)">
            <template #name>
              <div class="timeline-title-slot">
                <h-avatar size="mini" />
                <div class="timeline-title-slot__name">Wanqi peng</div>
                <h-tag type="hollow" color="#242629" major size="small">Fellow</h-tag>
              </div>
            </template>
            <template #desc>
              <div>
                Demo installed its 700th battery swap station in China,
                <br />
                hitting its annual target ahead of schedule.
              </div>
              <div style="display: flex">
                <h-image
                  src="/demo-assets/scene-aurora.svg"
                  class="mr-1 mt-2"
                  :width="40"
                  :height="40"
                />
                <h-image
                  src="/demo-assets/scene-coast.svg"
                  class="mr-1 mt-2"
                  :width="40"
                  :height="40"
                />
                <h-image
                  src="/demo-assets/scene-city.svg"
                  class="mr-1 mt-2"
                  :width="40"
                  :height="40"
                />
              </div>
            </template>
          </h-timeline-item>
          <h-timeline-item placement="top" timestamp="03/02/2021">
            <template #name>
              <div class="timeline-title-slot">
                <h-avatar size="mini" />
                <div class="timeline-title-slot__name">Wanqi peng</div>
                <h-tag type="hollow" color="#242629" major size="small">Fellow</h-tag>
              </div>
            </template>
            <template #desc>
              <div>
                Demo installed its 700th battery swap station in China,
                <br />
                hitting its annual target ahead of schedule.
              </div>
            </template>
          </h-timeline-item>
          <h-timeline-item
            placement="right"
            timestamp="03/02/2021"
            color="var(--h-bg-brand-default)"
            :tail="false"
          >
            <template #name>
              <div class="timeline-title-slot">
                <h-avatar size="mini" />
                <div class="timeline-title-slot__name">Wanqi peng</div>
                <h-tag type="hollow" color="#242629" major size="small">Fellow</h-tag>
                <div class="timeline-title-slot__action">Add follow-up note</div>
              </div>
            </template>
            <template #desc>
              <div>
                Demo installed its 700th battery swap station in China,
                <br />
                hitting its annual target ahead of schedule.
              </div>
            </template>
          </h-timeline-item>
        </h-timeline>
      </div>
      <div class="container__block">
        <div class="container__title">
          表达步骤感的混合时间轴
          <div>
            实线显示已发生的时间节点，虚线显示未发生的时间节点。一般已经发生的步骤再上，步骤过多，可折叠。
          </div>
        </div>
        <h-timeline>
          <h-timeline-item
            name="Current milestone"
            size="large"
            timestamp="03/02/2021"
            color="var(--h-bg-brand-default)"
            border-color="var(--h-bg-brand-default)"
            icon="check"
            type="circle"
            desc="you can fold the dot"
            :fold-config="foldConfig"
          />
          <h-timeline-item
            name="Current milestone"
            size="large"
            timestamp="03/02/2021"
            placement="top"
            color="var(--h-bg-brand-default)"
            border-color="var(--h-bg-brand-default)"
            icon="check"
            type="circle"
          />
          <h-timeline-item
            name="Current milestone"
            size="large"
            timestamp="03/02/2021"
            placement="top"
            color="var(--h-bg-brand-default)"
            border-color="var(--h-bg-brand-default)"
            icon="check"
            type="circle"
          />
          <h-timeline-item
            name="Current milestone"
            size="large"
            timestamp="03/02/2021"
            placement="top"
            color="var(--h-bg-brand-default)"
            dashed
            offset="0"
          />
          <h-timeline-item
            name="Current milestone"
            timestamp="03/02/2021"
            placement="top"
            dashed
            offset="0"
          />
          <h-timeline-item
            name="Current milestone"
            timestamp="03/02/2021"
            placement="top"
            dashed
            offset="0"
          />
          <h-timeline-item
            name="Current milestone"
            timestamp="03/02/2021"
            placement="top"
            dashed
            offset="0"
          />
        </h-timeline>
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
        name: 'Current milestone',
        time: '03/02/2021',
      },
      {
        name: 'The third milestone',
        time: '03/02/2021',
      },
      {
        name: 'The second milestone',
        time: '03/02/2021',
      },
      {
        name: 'The first milestone',
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
  margin-bottom: 20px;
}

.container__block {
  margin-right: 50px;
}

.h-timeline {
  margin-right: 50px;
}

.timeline-title-slot {
  display: flex;
  align-items: center;
}

.timeline-title-slot__name {
  margin: 0 8px;
}

.timeline-title-slot__action {
  margin-left: 8px;
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
  margin-bottom: 8px;
}

.timeline-slot .h-timeline-item__timestamp--top {
  margin-bottom: 12px;
}
</style>
