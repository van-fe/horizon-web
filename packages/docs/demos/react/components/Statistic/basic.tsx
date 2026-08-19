import { Space, Statistic } from '@aurora/horizon-react';

export default function StatisticDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <Space size="large" wrap>
      <Statistic
        locale="en-US"
        precision={2}
        prefix="$"
        title={en ? 'Revenue' : '收入'}
        trend="up"
        trendType="success"
        trendValue="12%"
        value={128430.5}
      />
      <Statistic
        suffix="ms"
        title={en ? 'Latency' : '延迟'}
        trend="down"
        trendType="success"
        trendValue="8%"
        value={86}
      />
    </Space>
  );
}
