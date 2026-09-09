import { Space, Tag } from '@aurora/horizon-react';

export default function Demo() {
  return (
    <Space align="center">
      <Tag size="small">Small</Tag>
      <Tag>Medium</Tag>
      <Tag bold size="large">
        Large bold
      </Tag>
    </Space>
  );
}
