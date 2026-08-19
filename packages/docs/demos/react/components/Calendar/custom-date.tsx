import { Calendar } from '@aurora/horizon-react';

export default function Demo() {
  return (
    <Calendar
      defaultValue={new Date()}
      renderDateCellTitle={context => <strong>{context.date.getDate()}</strong>}
      renderDateCellAppend={context =>
        context.date.getDay() === 1 ? <small>Weekly planning</small> : null
      }
    />
  );
}
