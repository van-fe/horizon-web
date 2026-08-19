import { useState } from 'react';
import { Select } from '@aurora/horizon-react';

const cities = [
  { value: 'shanghai', label: '上海', description: '中国' },
  { value: 'singapore', label: '新加坡', description: '新加坡' },
  { value: 'tokyo', label: '东京', description: '日本' },
  { value: 'disabled', label: '不可选择', disabled: true },
];

export default function SelectBasicDemo() {
  const [value, setValue] = useState<string>();

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Select
        clearable
        onChange={nextValue => setValue(nextValue as string | undefined)}
        options={cities}
        placeholder="请选择城市"
        value={value}
      />
      <Select filterable options={cities} placeholder="输入城市名称筛选" />
      <span>当前选择：{value ?? '无'}</span>
    </div>
  );
}
