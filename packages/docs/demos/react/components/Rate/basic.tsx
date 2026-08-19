import { useState } from 'react';
import { Rate, Space } from '@aurora/horizon-react';

export default function RateDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [value, setValue] = useState(3.5);
  return (
    <Space direction="vertical" size="large">
      <div>
        <Rate
          aria-label={en ? 'Service rating' : '服务评分'}
          half
          onChange={setValue}
          showTooltip
          tooltip={
            en
              ? ['Poor', 'Fair', 'Good', 'Very good', 'Excellent']
              : ['较差', '一般', '良好', '很好', '优秀']
          }
          value={value}
        />
        <p>{en ? `Current rating: ${value}` : `当前评分：${value}`}</p>
      </div>
      <Rate
        aria-label={en ? 'Read-only rating' : '只读评分'}
        readOnly
        renderIcon={({ status }) => <span aria-hidden="true">{status === 'void' ? '◇' : '◆'}</span>}
        value={4}
      />
    </Space>
  );
}
