import { Space, Tag } from '@aurora/horizon-react';

export default function Demo() {
  return (
    <Space>
      <Tag active disabled>
        Selected
      </Tag>
      <Tag closable disabled>
        Required
      </Tag>
      <Tag color="purple" disabled>
        Archived
      </Tag>
    </Space>
  );
}
