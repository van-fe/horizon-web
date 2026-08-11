import { useState } from 'react';
import { Radio, RadioButton, RadioGroup, Space } from '@aurora/horizon-web-react';
import type { ChoiceValue } from '@aurora/horizon-web-react';

export default function RadioDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [delivery, setDelivery] = useState<ChoiceValue>('standard');
  const [density, setDensity] = useState<ChoiceValue>('comfortable');

  return (
    <Space direction="vertical" size="large">
      <RadioGroup name="delivery" onChange={setDelivery} value={delivery}>
        <Radio optionValue="standard">{en ? 'Standard delivery' : '标准配送'}</Radio>
        <Radio optionValue="express">{en ? 'Express delivery' : '加急配送'}</Radio>
        <Radio disabled optionValue="scheduled">
          {en ? 'Scheduled delivery' : '预约配送'}
        </Radio>
      </RadioGroup>
      <p>{en ? `Delivery: ${delivery}` : `配送方式：${delivery}`}</p>
      <RadioGroup onChange={setDensity} value={density}>
        <RadioButton optionValue="comfortable">{en ? 'Comfortable' : '舒适'}</RadioButton>
        <RadioButton optionValue="compact">{en ? 'Compact' : '紧凑'}</RadioButton>
      </RadioGroup>
    </Space>
  );
}
