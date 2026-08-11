import { Result, Space } from '@aurora/horizon-web-react';

export default function ResultDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <Space size="large" wrap>
      <Result
        primaryButtonText={en ? 'Confirm' : '确认'}
        secondaryButtonText={en ? 'Back' : '返回'}
        style={{ minWidth: 280 }}
        title={en ? 'Published' : '发布成功'}
        subtitle={en ? 'The release is now available.' : '版本现已可用。'}
      />
      <Result
        primaryButton={false}
        secondaryButton={false}
        style={{ minWidth: 280 }}
        title={en ? 'Page not found' : '页面不存在'}
        subtitle={en ? 'Check the address and try again.' : '请检查地址后重试。'}
        type={404}
      />
    </Space>
  );
}
