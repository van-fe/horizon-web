import { useState } from 'react';
import { Input, Space } from '@aurora/horizon-react';

export default function InputDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [name, setName] = useState('Horizon');
  const [description, setDescription] = useState('');

  return (
    <Space direction="vertical" size="large" style={{ width: 420 }}>
      <Input
        aria-label={en ? 'Project name' : '项目名称'}
        clearable
        maxLength={20}
        onValueChange={setName}
        placeholder={en ? 'Project name' : '请输入项目名称'}
        prefix="⌕"
        showLimit
        value={name}
      />
      <Input
        aria-label={en ? 'Password' : '密码'}
        placeholder={en ? 'Password' : '请输入密码'}
        showPassword
        type="password"
      />
      <Input
        aria-label={en ? 'Description' : '描述'}
        autoSize={{ minRows: 2, maxRows: 5 }}
        maxLength={120}
        onValueChange={setDescription}
        placeholder={en ? 'Description' : '请输入描述'}
        showLimit
        type="textarea"
        value={description}
      />
    </Space>
  );
}
