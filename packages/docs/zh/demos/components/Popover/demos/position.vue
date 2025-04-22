<template>
  <div class="block-popover">
    <!--top-x-->
    <div class="item"></div>
    <div class="item">
      <n-popover trigger="hover" placement="top-start" :flip="false" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">上左</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            top-start
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <div class="item">
      <n-popover trigger="hover" placement="top" :flip="false" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">上</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            top
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <div class="item">
      <n-popover trigger="hover" placement="top-end" :flip="false" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">上右</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            top-end
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <div class="item"></div>
    <!--x-start-->
    <div class="item">
      <n-popover trigger="hover" placement="left-start" :flip="false" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">左上</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            left-start
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <n-popover trigger="hover" placement="right-start" :flip="false" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">右上</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            right-start
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <!--left / right-->
    <div class="item">
      <n-popover trigger="hover" placement="left" :flip="false" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">左</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            left
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <n-popover trigger="hover" placement="right" :flip="false" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">右</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            right
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <!--x-end-->
    <div class="item">
      <n-popover trigger="hover" placement="left-end" :flip="false" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">左下</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            left-end
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <n-popover trigger="hover" placement="right-end" :flip="false" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">右下</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            right end
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <!--bottom-x-->
    <div class="item"></div>
    <div class="item">
      <n-popover
        trigger="hover"
        placement="bottom-start"
        :flip="false"
        popper-class="position_popper"
      >
        <template #reference>
          <n-button :plain="true" class="btn">下左</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            bottom-start
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <div class="item">
      <n-popover trigger="hover" placement="bottom" :flip="false" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">下</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            bottom
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <div class="item">
      <n-popover trigger="hover" placement="bottom-end" :flip="false" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">下右</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            bottom-end
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <div class="item"></div>
    <!-- auto -->
    <div class="item"></div>
    <div class="item">
      <n-popover trigger="hover" placement="auto-start" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">自适应 起始</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            auto-start
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <div class="item">
        <n-popover trigger="hover" placement="auto" popper-class="position_popper">
          <template #reference>
            <n-button :plain="true" class="btn">自适应</n-button>
          </template>
          <template #popper>
            <n-pop-content>
              auto
            </n-pop-content>
          </template>
        </n-popover>
    </div>
    <div class="item">
      <n-popover trigger="hover" placement="auto-end" popper-class="position_popper">
        <template #reference>
          <n-button :plain="true" class="btn">自适应 尾部</n-button>
        </template>
        <template #popper>
          <n-pop-content>
            auto-end
          </n-pop-content>
        </template>
      </n-popover>
    </div>
    <div class="item"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
.block-popover {
  width: 430px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 20px;
}

.block-popover .item {
  width: 80px;
}

.block-popover .item button {
  width: 100%;
}
</style>
