import { List, ListItem } from '@aurora/horizon-web-react';

export default function ListRegionsDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <List footer={en ? '3 updates' : '3 条更新'} size="small" zebra>
      <ListItem
        actions={<button type="button">{en ? 'Open' : '打开'}</button>}
        descriptionContent={<span>{en ? 'Custom description content' : '自定义描述内容'}</span>}
        leading={<span aria-hidden="true">●</span>}
        titleContent={<strong>{en ? 'Custom regions' : '自定义区域'}</strong>}
      >
        {en ? 'Additional body content' : '附加主体内容'}
      </ListItem>
      <ListItem
        title={en ? 'Second item' : '第二项'}
        describe={en ? 'Static children are supported.' : '支持静态子节点。'}
      />
    </List>
  );
}
