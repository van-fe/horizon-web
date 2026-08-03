# AudioPlayer 音频播放器

提供播放、暂停、波形定位、键盘快进/快退、音量、静音和倍速控制，并支持三种波形来源。

## 稳定模拟波形

`waveform-source="mock"` 不读取音频内容，而是根据 `mock-seed`（未传时使用 `src`）生成稳定波形。相同种子和 `bar-count` 的结果始终一致，适合列表、服务端渲染和未提供波形数据的场景。

:::demo components/AudioPlayer/basic.vue :::

## 外部传入波形

通过 `waveform` 传入任意非负数值数组。组件会取绝对值、归一化，并重采样到 `bar-count` 指定的柱数；外部数据的优先级高于 `waveform-source`。

:::demo components/AudioPlayer/provided.vue :::

## 自动预读真实波形

`waveform-source="auto"` 会使用 Fetch 与 Web Audio API 在后台解码音频并提取峰值。远程音频需要服务端允许 CORS；解码失败时会自动降级为稳定模拟波形，音频正常播放不受影响。下面的 Demo 在浏览器中生成一段 WAV 音频以演示真实解码。

:::demo components/AudioPlayer/auto.vue :::

## 无障碍与控制

波形支持鼠标点击定位，也支持方向键每次移动 5 秒、`Shift + 方向键` 每次移动 10 秒，以及 `Home` / `End` 跳转首尾。`play`、`pause`、`seek` 和原生 `audio` 实例均可通过组件 ref 调用。所有控制器文案会跟随 Horizon Web 当前语言。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 音频资源地址 | `string` | — |
| type | 音频 MIME 类型 | `string` | `''` |
| waveform | 预计算波形，优先级最高 | `number[]` | — |
| waveform-source | 波形生成方式 | `'auto' \| 'mock' \| 'none'` | `'auto'` |
| mock-seed | 模拟波形种子，默认使用 src | `string` | `''` |
| bar-count | 波形柱数，范围 8~300 | `number` | `72` |
| autoplay | 自动播放 | `boolean` | `false` |
| loop | 循环播放 | `boolean` | `false` |
| disabled | 禁用交互 | `boolean` | `false` |
| preload | 原生音频预加载策略 | `'none' \| 'metadata' \| 'auto'` | `'metadata'` |
| volume | 初始音量，范围 0~1 | `number` | `1` |
| playback-rates | 倍速选项 | `number[]` | `[0.5, 1, 1.5, 2]` |
| aria-label | 自定义无障碍名称 | `string` | 当前语言的“音频播放器” |

### Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| ready | `(audio: HTMLAudioElement)` | 元数据加载完成 |
| play / pause / ended / error | `(event: Event)` | 对应原生媒体事件 |
| timeupdate | `(currentTime, duration)` | 播放时间变化 |
| seek | `(currentTime)` | 用户定位播放位置 |
| volume-change | `(volume, muted)` | 音量或静音状态变化 |
| rate-change | `(rate)` | 播放倍速变化 |
| waveform-ready | `(waveform, source)` | 波形就绪；source 为 `provided`、`decoded` 或 `mock` |

### Exposes

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| audio | `HTMLAudioElement` | 原生音频元素 |
| play | `() => Promise<void>` | 开始播放 |
| pause | `() => void` | 暂停播放 |
| seek | `(time: number) => void` | 跳转至指定秒数 |
