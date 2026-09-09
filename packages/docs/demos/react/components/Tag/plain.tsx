import { Space, Tag } from '@aurora/horizon-react';

export default function Demo() {
  return (
    <Space wrap>
      <Tag plain>Environment</Tag>
      <Tag plain variant="success">
        Verified
      </Tag>
      <Tag plain variant="warning">
        Review
      </Tag>
      <Tag plain variant="error">
        Blocked
      </Tag>
    </Space>
  );
}
