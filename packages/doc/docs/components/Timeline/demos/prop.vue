<template>
  <div>
    <div class="container">
      <div class="container__block">
        <div class="container__title">
          添加描述信息
          <div>可根据节点内容，自定义节点文本内容；</div>
        </div>
        <!-- 手动设置style="width: 270px"是为了desc换行 -->
        <h-timeline style="width: 270px">
          <h-timeline-item
            name="已完成"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
            type="circle"
            color="var(--h-bg-brand-default)"
            icon="check"
            tail-color="#00B3BE"
            offset="3.5"
            border-color="var(--h-bg-brand-default)"
            desc="NIO installed its 700th battery swap station in China, hitting its annual target ahead of schedule."
          />
          <h-timeline-item
            color="var(--h-bg-brand-default)"
            offset="3.5"
            name="进行中"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
          />
          <h-timeline-item name="待开始" timestamp="1632840112" format="yyyy-MM-dd HH:ii:ss" />
          <h-timeline-item
            name="待开始"
            timestamp="1632840112"
            offset="3.5"
            format="yyyy-MM-dd HH:ii:ss"
            :tail="false"
          />
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
          <h-timeline :first="{ color: 'var(--h-bg-brand-default)' }">
            <h-timeline-item
              name="已完成"
              timestamp="1632840112"
              offset="5"
              icon="check"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              type="circle"
              tail-color="#00B3BE"
              border-color="var(--h-bg-brand-default)"
            />
            <h-timeline-item
              color="var(--h-bg-brand-default)"
              name="进行中"
              timestamp="1632840112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
            />
            <h-timeline-item
              name="待开始"
              timestamp="1632840112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="right"
            />
            <h-timeline-item
              name="待开始"
              timestamp="1632840112"
              offset="5"
              format="yyyy-MM-dd"
              placement="right"
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
          <h-timeline sort="order">
            <h-timeline-item
              name="Current milestone"
              timestamp="1632840112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              color="var(--h-bg-brand-default)"
            />
            <h-timeline-item
              name="The first milestone"
              timestamp="1632850112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
            />
            <h-timeline-item
              name="The second milestone"
              timestamp="1632860112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
            />
            <h-timeline-item
              name="The third milestone"
              timestamp="1632870112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              :tail="false"
            />
          </h-timeline>
          <h-timeline sort="reverse">
            <h-timeline-item
              name="Current milestone"
              timestamp="1632840112"
              color="var(--h-bg-brand-default)"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
            />
            <h-timeline-item
              name="The first milestone"
              timestamp="1632830112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
            />
            <h-timeline-item
              name="The second milestone"
              timestamp="1632820112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
            />
            <h-timeline-item
              name="The third milestone"
              timestamp="1632810112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              :tail="false"
            />
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
              timestamp="1632840112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              color="var(--h-bg-brand-default)"
            />
            <h-timeline-item
              name="An unknown error has occurred"
              timestamp="1632840112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              color="var(--h-bg-error-default)"
            />
            <h-timeline-item
              name="The second milestone"
              timestamp="1632840112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              color="var(--h-bg-warning-default)"
            />
            <h-timeline-item
              name="The second milestone"
              timestamp="1632840112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              color="var(--h-bg-success-default)"
            />
            <h-timeline-item
              name="The first milestone"
              timestamp="1632840112"
              offset="5"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              :tail="false"
            />
          </h-timeline>
          <h-timeline>
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="1632840112"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              color="var(--h-bg-brand-default)"
              icon="email"
              offset="8"
            />
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="1632840112"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              color="var(--h-bg-error-default)"
              icon="close"
              offset="8"
            />
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="1632840112"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              color="var(--h-bg-warning-default)"
              icon="light_on"
              offset="8"
            />
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="1632840112"
              format="yyyy-MM-dd HH:ii:ss"
              placement="top"
              color="var(--h-bg-success-default)"
              icon="check"
              offset="8"
            />
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="1632840112"
              format="yyyy-MM-dd HH:ii:ss"
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
          <h-timeline-item
            type="circle"
            border-color="var(--h-bg-brand-default)"
            tail-color="#00B3BE"
            offset="5"
            icon="check"
            placement="top"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
            color="var(--h-bg-brand-default)"
            v2
          >
            <template #name>
              <div class="timeline-title-slot">
                <h-avatar size="mini" />
                <div class="timeline-title-slot__name">Wanqi peng</div>
                <h-tag plain color="#242629" major size="small">Fellow</h-tag>
              </div>
            </template>
            <template #desc>
              <div>
                NIO installed its 700th battery swap station in China,
                <br />
                hitting its annual target ahead of schedule.
              </div>
              <div style="display: flex">
                <h-image
                  :src="`https://picsum.photos/id/${Math.floor(Math.random() * 60) + 10}/1366/768`"
                  class="mr-1 mt-2"
                  :width="40"
                  :height="40"
                />
                <h-image
                  :src="`https://picsum.photos/id/${Math.floor(Math.random() * 60) + 10}/1366/768`"
                  class="mr-1 mt-2"
                  :width="40"
                  :height="40"
                />
                <h-image
                  :src="`https://picsum.photos/id/${Math.floor(Math.random() * 60) + 10}/1366/768`"
                  class="mr-1 mt-2"
                  :width="40"
                  :height="40"
                />
              </div>
            </template>
          </h-timeline-item>
          <h-timeline-item
            placement="top"
            offset="5"
            color="var(--h-bg-brand-default)"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
          >
            <template #name>
              <div class="timeline-title-slot">
                <h-avatar size="mini" />
                <div class="timeline-title-slot__name">Wanqi peng</div>
                <h-tag plain color="#242629" major size="small">Fellow</h-tag>
              </div>
            </template>
            <template #desc>
              <div>
                NIO installed its 700th battery swap station in China,
                <br />
                hitting its annual target ahead of schedule.
              </div>
            </template>
          </h-timeline-item>
          <h-timeline-item
            placement="right"
            timestamp="1632840112"
            offset="5"
            format="YYYY-MM-dd HH:mm:ss"
            :tail="false"
          >
            <template #name>
              <div class="timeline-title-slot">
                <h-avatar size="mini" />
                <div class="timeline-title-slot__name">Wanqi peng</div>
                <h-tag plain color="#242629" major size="small">Fellow</h-tag>
                <div class="timeline-title-slot__action">Add follow-up note</div>
              </div>
            </template>
            <template #desc>
              <div>
                NIO installed its 700th battery swap station in China,
                <br />
                hitting its annual target ahead of schedule.
              </div>
            </template>
          </h-timeline-item>
        </h-timeline>
      </div>
      <div class="container__block">
        <div class="container__title">
          折叠节点
          <div>如节点过多，或需要子任务、流程需要隐藏，可以使用折叠样式。</div>
        </div>
        <h-timeline>
          <h-timeline-item
            name="Current milestone"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
            color="var(--h-bg-brand-default)"
            border-color="var(--h-bg-brand-default)"
            type="circle"
            icon="check"
            offset="3.5"
            desc="you can fold the dot"
            tail-color="#00B3BE"
          />
          <h-timeline-item
            name="Current milestone"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
            placement="top"
            offset="3.5"
            icon="check"
            :fold-config="foldConfig"
            color="var(--h-bg-brand-default)"
            border-color="var(--h-bg-brand-default)"
            type="circle"
            tail-color="#00B3BE"
          />
          <h-timeline-item
            name="Current milestone"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
            placement="top"
            offset="3.5"
            icon="check"
            color="var(--h-bg-brand-default)"
            border-color="var(--h-bg-brand-default)"
            type="circle"
            tail-color="#00B3BE"
          />
          <h-timeline-item
            name="Current milestone"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
            placement="top"
            color="var(--h-bg-brand-default)"
            offset="3.5"
          />
          <h-timeline-item
            name="Current milestone"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
            placement="top"
            offset="3.5"
          />
          <h-timeline-item
            name="Current milestone"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
            placement="top"
            offset="3.5"
          />
          <h-timeline-item
            name="Current milestone"
            timestamp="1632840112"
            format="yyyy-MM-dd HH:ii:ss"
            placement="top"
            offset="3.5"
            :tail="false"
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
.h-timeline-item__icoh--medium {
  font-size: 8px;
}
.timeline__name--bold-big .h-timeline-item__name--content {
  font-weight: bold;
  font-size: 16px;
}

.timeline-slot .h-timeline-item__name {
  margih-bottom: 8px;
}

.timeline-slot .h-timeline-item__timestamp--top {
  margih-bottom: 12px;
}
.h-timeline-item__dot-wrapper .h-timeline-item__icoh--medium {
  font-size: 8px;
  font-weight: bold;
}
</style>
