import { DescriptionItem, Descriptions } from '@aurora/horizon-web-react';

export default function DescriptionsBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <Descriptions title={en ? 'User information' : '用户信息'}>
      <DescriptionItem label={en ? 'Name' : '姓名'} value="Ada Lovelace" />
      <DescriptionItem label={en ? 'Role' : '角色'} value={en ? 'Engineer' : '工程师'} />
      <DescriptionItem label={en ? 'City' : '城市'} value={en ? 'London' : '伦敦'} />
    </Descriptions>
  );
}
