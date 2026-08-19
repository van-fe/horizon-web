import { useState } from 'react';
import { InputNumber } from '@aurora/horizon-react';
import type { InputNumberValue } from '@aurora/core';

export default function InputNumberControlsDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [value, setValue] = useState<InputNumberValue>(2);

  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
      <InputNumber
        append={locale === 'zh' ? '件' : 'items'}
        clearable
        controlsPosition="between"
        longPress
        onValueChange={setValue}
        prefix={locale === 'zh' ? '数量' : 'Qty'}
        value={value}
      />
      <InputNumber
        defaultValue={100}
        prepend={locale === 'zh' ? '预算' : 'Budget'}
        suffix="CNY"
        variant="emphasize"
      />
    </div>
  );
}
