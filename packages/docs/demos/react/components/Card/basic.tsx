import { Card, Space } from '@aurora/horizon-web-react';

export default function CardDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <Space size="medium" wrap>
      <Card
        footer={isEnglish ? 'Updated today' : '今天更新'}
        style={{ minWidth: 240 }}
        title={isEnglish ? 'Project status' : '项目状态'}
        topDivider
      >
        {isEnglish ? 'All services are operating normally.' : '所有服务均正常运行。'}
      </Card>
      <Card
        border={false}
        header={<strong>{isEnglish ? 'Custom header' : '自定义头部'}</strong>}
        radius="large"
        style={{ minWidth: 240 }}
      >
        {isEnglish ? 'A borderless card with a large radius.' : '无边框的大圆角卡片。'}
      </Card>
    </Space>
  );
}
