import { Space, Tag } from '@aurora/horizon-react';

export default function Demo() {
  return (
    <Space align="center">
      <Tag round>Rounded</Tag>
      <Tag equally>A</Tag>
      <Tag equally round>
        B
      </Tag>
    </Space>
  );
}
