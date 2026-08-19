import { Space, Time } from '@aurora/horizon-react';

export default function TimeModesDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <Space direction="vertical">
      <div>
        {isEnglish ? 'Elapsed: ' : '已用时：'}
        <Time forward />
      </div>
      <div>
        {isEnglish ? 'Difference: ' : '时间差：'}
        <Time calculative time={1_000_000_000_000} endTime={1_000_003_661_000} />
      </div>
    </Space>
  );
}
