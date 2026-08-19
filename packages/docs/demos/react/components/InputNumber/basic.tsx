import { useState } from 'react';
import { InputNumber } from '@aurora/horizon-react';
import type { InputNumberValue } from '@aurora/core';

export default function InputNumberBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [value, setValue] = useState<InputNumberValue>(8);

  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <InputNumber
        max={10}
        min={0}
        onValueChange={setValue}
        placeholder={locale === 'zh' ? '请输入数量' : 'Enter a quantity'}
        value={value}
      />
      <output>
        {locale === 'zh' ? `当前值：${value ?? '空'}` : `Current: ${value ?? 'empty'}`}
      </output>
    </div>
  );
}
