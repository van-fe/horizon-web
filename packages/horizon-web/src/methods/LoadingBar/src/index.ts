import HLoadingBarComponent from './components/LoadingBar';
import type { LoadingBarOptions } from './composables/useProps';
import { defineMethod } from '@aurora/utils';

let loadingBarInstance: {
  update: Function;
  unmount: Function;
} | null;
const duration = 800;
let height = 4;
let timer: NodeJS.Timeout | null;

function getLoadingBarInstance() {
  loadingBarInstance =
    loadingBarInstance ||
    HLoadingBarComponent.newInstance({
      height,
    });

  return loadingBarInstance;
}

function update(options: Partial<LoadingBarOptions>) {
  const instance = getLoadingBarInstance();
  instance?.update(options);
}

function hide() {
  setTimeout(() => {
    update({
      show: false,
    });
    setTimeout(() => {
      update({
        percent: 0,
      });
    }, 200);
  }, duration);
}

function clearTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

const LoadingMethods = {
  /**
   * 开始从 `0` 显示进度条，并自动加载进度
   * @en Start the progress bar from 0 and automatically advance progress
   */
  start() {
    if (timer) return;

    let percent = 0;

    update({
      percent,
      status: 'primary',
      show: true,
      height,
    });

    timer = setInterval(() => {
      percent += Math.floor(Math.random() * 3 + 1);
      if (percent > 95) {
        clearTimer();
      }
      update({
        percent,
        status: 'primary',
        show: true,
        height,
      });
    }, 200);
  },
  /**
   * 精确加载到指定的进度
   * @en Advance the progress bar to the specified percentage
   * @param percent 进度，满值 `100`
   * @paramEn percent Description: 进度, 满值 100
   */
  update(percent = 0) {
    clearTimer();
    update({
      percent,
      status: 'primary',
      show: true,
      height,
    });
  },
  /**
   * 结束进度条，自动补全剩余进度
   * @en Finish the progress bar and automatically complete the remaining progress
   */
  finish() {
    clearTimer();
    update({
      percent: 100,
      status: 'primary',
      show: true,
      height,
    });
    hide();
  },
  /**
   * 以错误的类型结束进度条，自动补全剩余进度
   * @en Description
   */
  error() {
    clearTimer();
    update({
      percent: 100,
      status: 'error',
      show: true,
      height,
    });
    hide();
  },
  /**
   * 配置 `LoadingBar`
   * @en Configure LoadingBar
   * @param options height: `LoadingBar` 的高度
   * @paramEn options Height: LoadingBar 的height
   */
  config(options: { height: number }) {
    if (options.height) {
      height = options.height;
    }
  },
  /**
   * 销毁LoadingBar实例
   * @en Destroy LoadingBarinstance
   */
  destroy() {
    clearTimer();
    const instance = getLoadingBarInstance();
    loadingBarInstance = null;
    instance?.unmount();
  },
};

export default defineMethod({
  name: 'loadingBar',
  desc: '在页面最顶端创建了一个用于显示页面加载、异步请求文件上传的加载进度条，缓解用户等待时的焦虑感，因为可复用性的关系，全局只会存在一个 `loadingBar` 的实例',
  methods: LoadingMethods,
});
