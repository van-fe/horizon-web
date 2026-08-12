import { AutoComplete } from '@aurora/horizon-web-react';

const options = [
  { label: 'Design system', value: 'design', description: 'Tokens and components' },
  { label: 'Accessibility', value: 'a11y', description: 'Keyboard and screen readers' },
];

export default function AutoCompleteCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <AutoComplete
      options={options}
      panelFooter={en ? 'Use ↑ and ↓ to navigate' : '使用 ↑ 和 ↓ 选择'}
      panelHeader={en ? 'Topics' : '主题'}
      prefix="⌕"
      renderOption={(option, state) => (
        <span style={{ fontWeight: state.active ? 600 : 400 }}>
          {option.label} · {option.description}
        </span>
      )}
    />
  );
}
