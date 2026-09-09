import { Space, Tag } from '@aurora/horizon-react';

export default function Demo() {
  return (
    <Space wrap>
      <Tag clickable color="purple">
        Purple
      </Tag>
      <Tag clickable color="lime" plain>
        Lime
      </Tag>
      <Tag background="#fff1f0" color="#cf1322">
        Custom
      </Tag>
      <Tag color="blue" disabled>
        Disabled
      </Tag>
    </Space>
  );
}
