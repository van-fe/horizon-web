import { useState } from 'react';
import { Picker, Radio, RadioGroup, Space } from '@aurora/horizon-web-react';

const teams = ['Design Systems', 'Frontend Platform', 'Quality Engineering'];

export default function PickerBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [team, setTeam] = useState(teams[0]);

  return (
    <section className="docs-demo" style={{ display: 'grid', gap: 12, maxWidth: 390 }}>
      <label>{en ? 'Owning team' : '负责团队'}</label>
      <Picker<string>
        clearable
        onValueChange={setTeam}
        placeholder={en ? 'Choose a team' : '选择团队'}
        value={team}
      >
        <div style={{ display: 'grid', gap: 12, minWidth: 240, padding: 16 }}>
          <strong>{en ? 'Available teams' : '可选团队'}</strong>
          <RadioGroup onChange={value => setTeam(String(value))} value={team}>
            <Space direction="vertical">
              {teams.map(option => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Space>
          </RadioGroup>
        </div>
      </Picker>
      <output>{en ? `Selected: ${team || 'None'}` : `已选择：${team || '无'}`}</output>
    </section>
  );
}
