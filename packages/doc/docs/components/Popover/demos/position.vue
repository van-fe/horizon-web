<template>
  <div class="block-popover">
    <!--top-x-->
    <div class="item"></div>
    <div class="item">
      <h-popover trigger="hover" placement="top-start" :flip="false" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">上左</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            top-start
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <div class="item">
      <h-popover trigger="hover" placement="top" :flip="false" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">上</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            top
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <div class="item">
      <h-popover trigger="hover" placement="top-end" :flip="false" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">上右</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            top-end
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <div class="item"></div>
    <!--x-start-->
    <div class="item">
      <h-popover trigger="hover" placement="left-start" :flip="false" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">左上</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            left-start
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-popover trigger="hover" placement="right-start" :flip="false" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">右上</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            right-start
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <!--left / right-->
    <div class="item">
      <h-popover trigger="hover" placement="left" :flip="false" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">左</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            left
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-popover trigger="hover" placement="right" :flip="false" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">右</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            right
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <!--x-end-->
    <div class="item">
      <h-popover trigger="hover" placement="left-end" :flip="false" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">左下</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            left-end
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-popover trigger="hover" placement="right-end" :flip="false" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">右下</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            right end
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <!--bottom-x-->
    <div class="item"></div>
    <div class="item">
      <h-popover
        trigger="hover"
        placement="bottom-start"
        :flip="false"
        popper-class="position_popper"
      >
        <template #reference>
          <h-button type="normal" class="btn">下左</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            bottom-start
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <div class="item">
      <h-popover trigger="hover" placement="bottom" :flip="false" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">下</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            bottom
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <div class="item">
      <h-popover trigger="hover" placement="bottom-end" :flip="false" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">下右</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            bottom-end
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <div class="item"></div>
    <!-- auto -->
    <div class="item"></div>
    <div class="item">
      <h-popover trigger="hover" placement="auto-start" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">自适应 起始</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            auto-start
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <div class="item">
        <h-popover trigger="hover" placement="auto" popper-class="position_popper">
          <template #reference>
            <h-button type="normal" class="btn">自适应</h-button>
          </template>
          <template #popper>
            <h-pop-content>
              auto
            </h-pop-content>
          </template>
        </h-popover>
    </div>
    <div class="item">
      <h-popover trigger="hover" placement="auto-end" popper-class="position_popper">
        <template #reference>
          <h-button type="normal" class="btn">自适应 尾部</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            auto-end
          </h-pop-content>
        </template>
      </h-popover>
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
