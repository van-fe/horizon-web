import { useState } from 'react';
import { Space, Tag } from '@aurora/horizon-react';

const filters = ['Design', 'Engineering', 'Quality'];

export default function Demo() {
  const [active, setActive] = useState(new Set(['Design']));
  return (
    <Space wrap>
      {filters.map(filter => (
        <Tag
          active={active.has(filter)}
          key={filter}
          onActiveChange={next =>
            setActive(current => {
              const copy = new Set(current);
              if (next) copy.add(filter);
              else copy.delete(filter);
              return copy;
            })
          }
          round
        >
          {filter}
        </Tag>
      ))}
    </Space>
  );
}
