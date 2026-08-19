import { useState } from 'react';
import { Calendar, type CalendarMode } from '@aurora/horizon-react';

export default function Demo() {
  const [mode, setMode] = useState<CalendarMode>('month');
  const [value, setValue] = useState(new Date());
  return (
    <Calendar
      value={value}
      onValueChange={setValue}
      mode={mode}
      onModeChange={setMode}
      modeSwitchable
      modeSwitchableList={['year', 'month', 'week', 'day']}
    />
  );
}
