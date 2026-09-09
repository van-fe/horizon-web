import { Space, Tag } from '@aurora/horizon-react';

export default function Demo() {
  return (
    <Space>
      <Tag icon={<span aria-hidden>✓</span>} variant="success">
        Deployed
      </Tag>
      <Tag icon={<span aria-hidden>⚡</span>} variant="warning">
        Attention
      </Tag>
    </Space>
  );
}
