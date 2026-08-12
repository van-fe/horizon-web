import { DescriptionItem, Descriptions } from '@aurora/horizon-web-react';

export default function DescriptionsCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <Descriptions titleContent={<strong>{en ? 'Custom content' : '自定义内容'}</strong>}>
      <DescriptionItem labelContent={<em>{en ? 'Owner' : '负责人'}</em>}>
        <a href="mailto:ada@example.com">ada@example.com</a>
      </DescriptionItem>
      <DescriptionItem label={en ? 'Notes' : '备注'}>
        {en ? 'Values accept arbitrary React content.' : '值区域可以放置任意 React 内容。'}
      </DescriptionItem>
    </Descriptions>
  );
}
