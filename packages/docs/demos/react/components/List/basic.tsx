import { List, ListItem } from '@aurora/horizon-web-react';

const requests = [
  { id: 1, title: 'Accessibility review', owner: 'Mira', detail: 'Keyboard flow is ready.' },
  { id: 2, title: 'Empty states', owner: 'Noah', detail: 'Recovery actions are ready.' },
  { id: 3, title: 'Mobile navigation', owner: 'Avery', detail: 'The compact layout is ready.' },
];

export default function ListBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <List
      border
      data={requests}
      header={<strong>{en ? 'Review queue' : '评审队列'}</strong>}
      renderItem={request => (
        <ListItem
          key={request.id}
          title={en ? request.title : `任务 ${request.id}`}
          subtitle={request.owner}
          describe={en ? request.detail : '内容已经准备完毕。'}
        />
      )}
    />
  );
}
