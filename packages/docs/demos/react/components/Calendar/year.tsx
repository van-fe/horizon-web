import { Calendar } from '@aurora/horizon-react';

export default function Demo() {
  return (
    <Calendar
      defaultMode="year"
      defaultValue={new Date()}
      modeSwitchableList={['year']}
      pickable
      renderMonthHeader={month => month.toLocaleString(undefined, { month: 'short' })}
    />
  );
}
