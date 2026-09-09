import { useState } from 'react';
import { Space, Tag } from '@aurora/horizon-react';

export default function Demo() {
  const [items, setItems] = useState(['Frontend', 'Accessibility', 'Testing']);
  return (
    <Space wrap>
      {items.map(item => (
        <Tag
          closable
          key={item}
          onClose={() => setItems(current => current.filter(value => value !== item))}
        >
          {item}
        </Tag>
      ))}
      <button
        disabled={items.length === 3}
        onClick={() => setItems(['Frontend', 'Accessibility', 'Testing'])}
        type="button"
      >
        Reset
      </button>
    </Space>
  );
}
