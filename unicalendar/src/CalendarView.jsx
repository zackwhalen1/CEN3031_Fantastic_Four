import { useState } from 'react'; 

function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear(); //Gets the year.
  const month = currentDate.getMonth(); //Gets the month. (0 = January, 1 = February, etc)

  const firstDayOfMonth = new Date(year, month, 1).getDay(); //Gets the first day the month starts on. (0 = Sunday, 1 = Monday, etc)

  const daysInMonth = new Date(year, month + 1, 0).getDate(); //Gets the number of days in the month.

  const calendarCells = []; //Holds the cells for the calendar grid.

  // Puts in empty slots for days prior to the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(null);
  }

  // Assigns the number to the day
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // Switching to the previous month
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Switching to the next month
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div style={{ width: '900px', margin: '0 auto' }}>
      {/*This is how you have to write comments in the return for jsx. This part works similar to HTML*/}

      <h2>
        {/*This displays the current date*/} 
        {currentDate.toLocaleString('default', { month: 'long' })} {year}
      </h2> 

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/*This is for the buttons*/} 
        <button onClick={prevMonth}>Previous Month</button>
        <button onClick={nextMonth}>Next Month</button>
      </div>

      {/*This is the calendar grid*/}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginTop: '10px' }}>
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
          <div 
            key={day} 
            style={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            {day}
          </div>
        ))}

        {/*This is for the calendar cells. If the day doesn't have a number we put in an empty string*/}
        {calendarCells.map((day, index) => (
          <div 
            key={index} 
            style={{
              height: '100px',
              border: '2px solid #ccc',
              textAlign: 'left',
              padding: '2px 4px'
            }}>
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarView;
