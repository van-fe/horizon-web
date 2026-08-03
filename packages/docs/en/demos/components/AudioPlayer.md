# AudioPlayer

An audio player with play/pause, waveform seeking, keyboard navigation, volume, mute, and playback-rate controls. It supports three waveform sources.

## Deterministic mock waveform

`waveform-source="mock"` does not read the audio data. It generates a stable waveform from `mock-seed`, or from `src` when no seed is supplied. The same seed and `bar-count` always produce the same result, which is useful for lists, SSR, and first paint.

:::demo components/AudioPlayer/basic.vue :::

## Provided waveform

Pass any numeric array through `waveform`. Values are converted to absolute values, normalized, and resampled to `bar-count`. Provided data takes precedence over `waveform-source`. The demo reports the resolved source and bar count above the player.

:::demo components/AudioPlayer/provided.vue :::

## Decode the real waveform

`waveform-source="auto"` uses Fetch and the Web Audio API to decode audio and extract peaks in the background. Remote audio must allow CORS. If decoding fails, the component falls back to a deterministic mock waveform without interrupting playback. This demo generates a WAV clip in the browser and lets you repeat the decode while observing the resolved source.

:::demo components/AudioPlayer/auto.vue :::

## Accessibility and controls

Click the waveform to seek. Arrow keys move 5 seconds, `Shift + Arrow` moves 10 seconds, and `Home` / `End` jump to either edge. The `play`, `pause`, `seek`, and native `audio` handles are exposed through the component ref. Control labels follow the active Horizon Web locale.

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| src | Audio resource URL | `string` | — |
| type | Audio MIME type | `string` | `''` |
| waveform | Precomputed waveform; takes precedence | `number[]` | — |
| waveform-source | Waveform strategy | `'auto' \| 'mock' \| 'none'` | `'auto'` |
| mock-seed | Mock seed; falls back to src | `string` | `''` |
| bar-count | Number of bars, from 8 to 300 | `number` | `72` |
| autoplay | Start automatically | `boolean` | `false` |
| loop | Loop playback | `boolean` | `false` |
| disabled | Disable interaction | `boolean` | `false` |
| preload | Native audio preload strategy | `'none' \| 'metadata' \| 'auto'` | `'metadata'` |
| volume | Initial volume, from 0 to 1 | `number` | `1` |
| playback-rates | Available playback rates | `number[]` | `[0.5, 1, 1.5, 2]` |
| aria-label | Custom accessible name | `string` | Localized “Audio player” |

### Events

| Event | Parameters | Description |
| --- | --- | --- |
| ready | `(audio: HTMLAudioElement)` | Metadata is available |
| play / pause / ended / error | `(event: Event)` | Corresponding native media event |
| timeupdate | `(currentTime, duration)` | Playback time changed |
| seek | `(currentTime)` | The user sought to a new time |
| volume-change | `(volume, muted)` | Volume or mute state changed |
| rate-change | `(rate)` | Playback rate changed |
| waveform-ready | `(waveform, source)` | Waveform is ready; source is `provided`, `decoded`, or `mock` |

### Exposes

| Name | Type | Description |
| --- | --- | --- |
| audio | `HTMLAudioElement` | Native audio element |
| play | `() => Promise<void>` | Start playback |
| pause | `() => void` | Pause playback |
| seek | `(time: number) => void` | Seek to a time in seconds |
