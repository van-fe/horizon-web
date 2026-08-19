import { useState } from 'react';
import { Calendar, type CalendarDateType } from '@aurora/horizon-react';

export default function Demo() {
  const [dateType, setDateType] = useState<CalendarDateType>('only-current');
  return (
    <section>
      <label>
        Month cells{' '}
        <select
          value={dateType}
          onChange={event => setDateType(event.target.value as CalendarDateType)}
        >
          <option value="full">Full grid</option>
          <option value="only-current">Current period</option>
        </select>
      </label>
      <Calendar dateType={dateType} defaultValue={new Date()} />
    </section>
  );
}
