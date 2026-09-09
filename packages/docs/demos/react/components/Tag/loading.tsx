import { useState } from 'react';
import { Space, Tag } from '@aurora/horizon-react';

export default function Demo() {
  const [loading, setLoading] = useState(true);
  return (
    <Space align="center">
      <Tag loading={loading} variant="info">
        Synchronizing
      </Tag>
      <button onClick={() => setLoading(value => !value)} type="button">
        Toggle loading
      </button>
    </Space>
  );
}
