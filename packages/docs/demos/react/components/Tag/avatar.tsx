import { Space, Tag } from '@aurora/horizon-react';

const avatar = (initials: string, color: string) => (
  <span
    aria-hidden
    style={{
      alignItems: 'center',
      background: color,
      borderRadius: '50%',
      color: '#fff',
      display: 'inline-flex',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    }}
  >
    {initials}
  </span>
);

export default function Demo() {
  return (
    <Space>
      <Tag avatarContent={avatar('AL', '#7c3aed')}>Alex</Tag>
      <Tag avatarContent={avatar('MO', '#0284c7')}>Morgan</Tag>
    </Space>
  );
}
