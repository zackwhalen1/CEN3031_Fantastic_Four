import { useState } from 'react'; 
import SearchEvents from './SearchEvents';

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


//SEARCH STUFF
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');

  // These are some made up events that I'm using to base how the sorting will work
  const testEvents = [
    { date: '09/05/2025', month: 'September', startTime: '9:00', title: 'Math Class', color: 'red' },
    { date: '08/20/2025', month: 'August', startTime: '8:30', title: 'CEN Final Exam', color: 'blue' },
    { date: '07/12/2025', month: 'August', startTime: '0:00', title: 'Brothers Birthday', color: 'green' },
    { date: '09/05/2025', month: 'September', startTime: '9:00', title: 'Senior Project Class', color: 'red' },
    { date: '09/02/2025', month: 'August', startTime: '8:30', title: 'COP Final Exam', color: 'blue' },
    { date: '08/06/2025', month: 'August', startTime: '0:00', title: 'Moms Birthday', color: 'green' }
  ];

  // Filtering events by what you would like to search by
  const filteredEvents = testEvents.filter(event => {
    const query = searchQuery.toLowerCase();
    if (searchType === 'title') {
      return event.title.toLowerCase().includes(query);
    } else if (searchType === 'date') {
      return event.date.includes(query);
    } else if (searchType === 'color') {
      return event.color.toLowerCase().includes(query);
    } else if (searchType === 'month') {
      return event.month.toLowerCase().includes(query);
    } else if (searchType === 'startTime') {
      return event.startTime.includes(query);
    }
    return false;
  });
  //////

  return (
    <div style={{
        border: '2px solid #444',
        padding: '10px',
        marginTop: '10px',
        borderRadius: '8px'
      }}>
      {/*The above div style is for the box surrounding the whole calendar*/}

      <div style={{
        border: '2px solid #444',
        padding: '10px',
        marginTop: '10px',
        borderRadius: '8px'
      }}>
      {/* This is the Search Feature */}
      <h2>Search</h2>
      <SearchEvents 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      </div>
      
      {/*This is the filtered events. It starts with the total list of testEvents and then as you search it filters them out.*/}
      <div style={{
        border: '2px solid #444',
        padding: '10px',
        marginTop: '10px',
        borderRadius: '8px'
      }}>
        <h4>Search Results</h4>
        {filteredEvents.map((event, index) => (
          <div key={index}>
            {event.date}: {event.month}: {event.startTime}: {event.title} ({event.color})
          </div>
        ))}
      </div>

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
