import { useState } from 'react';
import { AutoComplete } from '@aurora/horizon-react';

const options = [
  { label: 'Shanghai', value: 'shanghai', description: 'China' },
  { label: 'Singapore', value: 'singapore', description: 'Singapore' },
  { label: 'Tokyo', value: 'tokyo', description: 'Japan' },
];

export default function AutoCompleteBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [value, setValue] = useState('');
  const filtered = options.filter(option =>
    option.label.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 390 }}>
      <AutoComplete
        clearable
        onValueChange={setValue}
        options={filtered}
        placeholder={en ? 'Type a city' : '输入城市名称'}
        value={value}
      />
      <span>{en ? `Current value: ${value || 'Empty'}` : `当前值：${value || '空'}`}</span>
    </div>
  );
}
