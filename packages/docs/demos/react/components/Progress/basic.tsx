import { Progress, Space } from '@aurora/horizon-react';

export default function ProgressDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Progress percentage={42} />
      <Progress percentage={68} status="success" />
      <Progress color={['#5b8ff9', '#61d9a8']} percentage={76}>
        {isEnglish ? 'Uploading' : '上传中'}
      </Progress>
      <Space size="large">
        <Progress percentage={54} type="circle" />
        <Progress percentage={81} type="dashboard" />
      </Space>
    </Space>
  );
}
