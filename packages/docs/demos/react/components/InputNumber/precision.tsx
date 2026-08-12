import { useState } from 'react';
import { InputNumber } from '@aurora/horizon-web-react';
import type { InputNumberValue } from '@aurora/core';

export default function InputNumberPrecisionDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [value, setValue] = useState<InputNumberValue>('12345678901234567890.10');

  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
      <InputNumber
        formatter={current => `$ ${current}`}
        onValueChange={setValue}
        parser={current => current.replace('$', '').trim()}
        precision={2}
        step={0.1}
        stringMode
        value={value}
      />
      <code>{locale === 'zh' ? `字符串值：${value}` : `String value: ${value}`}</code>
    </div>
  );
}
