import { useState } from 'react';
import { Slider, Space } from '@aurora/horizon-web-react';

export default function SliderDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [value, setValue] = useState(35);
  const [range, setRange] = useState<readonly [number, number]>([20, 70]);

  return (
    <Space direction="vertical" size="large" style={{ width: 420 }}>
      <div>
        <Slider
          aria-label={en ? 'Volume' : '音量'}
          formatTooltip={current => `${current}%`}
          onChange={next => setValue(next as number)}
          showInput
          step={5}
          value={value}
        />
        <p>{en ? `Volume: ${value}%` : `音量：${value}%`}</p>
      </div>
      <Slider
        aria-label={en ? 'Price range' : '价格范围'}
        max={100}
        min={0}
        onChange={next => setRange(next as readonly [number, number])}
        range
        showSeparators
        step={10}
        value={range}
      />
    </Space>
  );
}
