import { List, ListItem } from '@aurora/horizon-react';

export default function ListBoundedDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const items = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    name: `${en ? 'Item' : '项目'} ${index + 1}`,
  }));
  return (
    <List
      data={items}
      maxHeight={220}
      renderItem={item => (
        <ListItem key={item.id} title={item.name} describe={'Long-content-'.repeat(14)} />
      )}
      split
    />
  );
}
