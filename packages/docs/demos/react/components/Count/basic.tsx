import { Count, Space } from '@aurora/horizon-react';

export default function CountDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <Space direction="vertical" size="medium">
      <Count autoPlay={false} endValue={123456.78} decimal={2} prefix={en ? 'Total: ' : '总计：'} />
      <Count
        autoPlay={false}
        endValue={9876543}
        separator="_"
        suffix={en ? ' requests' : ' 次请求'}
      />
    </Space>
  );
}
