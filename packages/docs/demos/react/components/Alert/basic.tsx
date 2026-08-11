import { Alert, Space } from '@aurora/horizon-web-react';

export default function AlertDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <Space direction="vertical" size="medium">
      <Alert
        description={en ? 'Your changes were saved.' : '更改已保存。'}
        showIcon
        title={en ? 'Success' : '成功'}
        type="success"
      />
      <Alert
        description={en ? 'Review the highlighted fields.' : '请检查高亮字段。'}
        showIcon
        title={en ? 'Validation warning' : '校验警告'}
        type="warning"
      />
      <Alert primaryButtonText={en ? 'Retry' : '重试'} defaultButtonText={en ? 'Dismiss' : '忽略'}>
        {en ? 'The request could not be completed.' : '请求未能完成。'}
      </Alert>
    </Space>
  );
}
