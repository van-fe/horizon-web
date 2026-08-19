import { useState } from 'react';
import { AutoComplete } from '@aurora/horizon-react';

const options = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' },
  { label: 'Gamma', value: 'gamma' },
];

export default function AutoCompleteControlledDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [value, setValue] = useState('beta');
  const [open, setOpen] = useState(false);

  return (
    <AutoComplete
      onOpenChange={setOpen}
      onValueChange={setValue}
      open={open}
      options={options}
      placeholder={en ? 'Controlled input' : '受控输入'}
      selectedOptionOrderToTop
      value={value}
    />
  );
}
