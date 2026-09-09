import { Space, Tag, type TagVariant } from '@aurora/horizon-react';

const variants: readonly TagVariant[] = ['', 'success', 'info', 'warning', 'error'];

export default function Demo() {
  return (
    <Space wrap>
      {variants.map(variant => (
        <Tag key={variant || 'default'} variant={variant}>
          {variant || 'default'}
        </Tag>
      ))}
    </Space>
  );
}
