import { useState } from 'react'; 
import SearchEvents from './SearchEvents';
import CreateEventModal from './CreateEventModal';
import DayView from './DayView';

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

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [modalPosition, setModalPosition] = useState(null);
  const [showDayView, setShowDayView] = useState(false);
  const [dayViewDate, setDayViewDate] = useState(null);
  const [prefilledStartTime, setPrefilledStartTime] = useState('');

  // These are some made up events that I'm using to base how the sorting will work
  const testEvents = [
    { date: '09/05/2025', month: 'September', startTime: '9:00', title: 'Math Class', color: 'red' },
    { date: '08/20/2025', month: 'August', startTime: '8:30', title: 'CEN Final Exam', color: 'blue' },
    { date: '07/12/2025', month: 'August', startTime: '0:00', title: 'Brothers Birthday', color: 'green' },
    { date: '09/05/2025', month: 'September', startTime: '9:00', title: 'Senior Project Class', color: 'red' },
    { date: '09/02/2025', month: 'August', startTime: '8:30', title: 'COP Final Exam', color: 'blue' },
    { date: '08/06/2025', month: 'August', startTime: '0:00', title: 'Moms Birthday', color: 'green' },
    { date: '08/20/2025', month: 'August', startTime: '16:00', title: 'CEN Final Exam', color: 'yellow' },
    { date: '07/08/2025', month: 'July', startTime: '18:00', title: 'Doctor Appointment', color: 'red' },
    { date: '07/25/2025', month: 'July', startTime: '10:00', title: 'Family Dinner', color: 'red' },
    { date: '09/19/2025', month: 'September', startTime: '11:00', title: 'Work Meeting', color: 'blue' },
    { date: '09/10/2025', month: 'September', startTime: '8:30', title: 'Group Project Meeting', color: 'green' },
    { date: '07/18/2025', month: 'July', startTime: '14:30', title: 'Math Class', color: 'purple' },
    { date: '09/07/2025', month: 'September', startTime: '14:30', title: 'CEN Final Exam', color: 'yellow' },
    { date: '09/11/2025', month: 'September', startTime: '8:30', title: 'Python Workshop', color: 'yellow' },
    { date: '08/11/2025', month: 'August', startTime: '11:00', title: 'Soccer Game', color: 'green' },
    { date: '07/16/2025', month: 'July', startTime: '20:00', title: 'Networking Event', color: 'green' },
    { date: '09/28/2025', month: 'September', startTime: '18:00', title: 'Holiday', color: 'green' },
    { date: '09/21/2025', month: 'September', startTime: '10:00', title: 'Doctor Appointment', color: 'yellow' },
    { date: '07/31/2025', month: 'July', startTime: '13:00', title: 'Networking Event', color: 'yellow' },
    { date: '08/09/2025', month: 'August', startTime: '14:30', title: 'Doctor Appointment', color: 'orange' },
    { date: '08/30/2025', month: 'August', startTime: '11:00', title: 'Final Presentation', color: 'green' },
    { date: '08/07/2025', month: 'August', startTime: '9:00', title: 'CEN Final Exam', color: 'red' },
    { date: '08/14/2025', month: 'August', startTime: '20:00', title: 'Gym Session', color: 'orange' },
    { date: '09/06/2025', month: 'September', startTime: '9:00', title: 'Final Presentation', color: 'orange' },
    { date: '08/16/2025', month: 'August', startTime: '16:00', title: 'Dentist Appointment', color: 'purple' },
    { date: '09/26/2025', month: 'September', startTime: '16:00', title: 'Holiday', color: 'yellow' },
    { date: '09/08/2025', month: 'September', startTime: '13:00', title: 'Python Workshop', color: 'blue' },
    { date: '07/15/2025', month: 'July', startTime: '8:30', title: 'Doctor Appointment', color: 'orange' },
    { date: '07/06/2025', month: 'July', startTime: '16:00', title: 'COP Final Exam', color: 'blue' },
    { date: '08/12/2025', month: 'August', startTime: '13:00', title: 'Soccer Game', color: 'blue' },
    { date: '09/15/2025', month: 'September', startTime: '9:00', title: 'Python Workshop', color: 'orange' },
    { date: '09/24/2025', month: 'September', startTime: '9:00', title: 'Doctor Appointment', color: 'orange' },
    { date: '07/27/2025', month: 'July', startTime: '10:00', title: 'Holiday', color: 'blue' },
    { date: '08/10/2025', month: 'August', startTime: '11:00', title: 'Soccer Game', color: 'orange' },
    { date: '08/26/2025', month: 'August', startTime: '14:30', title: 'Networking Event', color: 'red' },
    { date: '09/18/2025', month: 'September', startTime: '14:30', title: 'CEN Final Exam', color: 'green' },
    { date: '08/08/2025', month: 'August', startTime: '14:30', title: 'Family Dinner', color: 'orange' },
    { date: '09/17/2025', month: 'September', startTime: '14:30', title: 'Senior Project Class', color: 'blue' },
    { date: '07/24/2025', month: 'July', startTime: '11:00', title: 'Doctor Appointment', color: 'green' },
    { date: '07/26/2025', month: 'July', startTime: '8:00', title: 'Python Workshop', color: 'red' },
    { date: '08/22/2025', month: 'August', startTime: '9:00', title: 'Gym Session', color: 'yellow' },
    { date: '08/05/2025', month: 'August', startTime: '8:30', title: 'Networking Event', color: 'yellow' },
    { date: '08/21/2025', month: 'August', startTime: '18:00', title: 'Doctor Appointment', color: 'green' },
    { date: '07/14/2025', month: 'July', startTime: '16:00', title: 'Group Project Meeting', color: 'purple' },
    { date: '07/22/2025', month: 'July', startTime: '10:00', title: 'Math Class', color: 'green' },
    { date: '08/01/2025', month: 'August', startTime: '8:30', title: 'Gym Session', color: 'blue' },
    { date: '08/04/2025', month: 'August', startTime: '13:00', title: 'Doctor Appointment', color: 'green' },
    { date: '08/03/2025', month: 'August', startTime: '16:00', title: 'Career Fair', color: 'red' },
    { date: '09/23/2025', month: 'September', startTime: '20:00', title: 'Senior Project Class', color: 'purple' },
    { date: '08/23/2025', month: 'August', startTime: '20:00', title: 'Python Workshop', color: 'green' },
    { date: '07/17/2025', month: 'July', startTime: '11:00', title: 'Final Presentation', color: 'green' },
    { date: '09/13/2025', month: 'September', startTime: '16:00', title: 'Final Presentation', color: 'orange' },
    { date: '07/19/2025', month: 'July', startTime: '13:00', title: 'Dentist Appointment', color: 'green' },
    { date: '07/28/2025', month: 'July', startTime: '14:30', title: 'Work Meeting', color: 'green' },
    { date: '09/03/2025', month: 'September', startTime: '10:00', title: 'JavaScript Study', color: 'purple' },
    { date: '07/09/2025', month: 'July', startTime: '20:00', title: 'Career Fair', color: 'blue' },
    { date: '09/20/2025', month: 'September', startTime: '9:00', title: 'Doctor Appointment', color: 'green' },
    { date: '08/13/2025', month: 'August', startTime: '13:00', title: 'Math Class', color: 'red' },
    { date: '09/14/2025', month: 'September', startTime: '14:30', title: 'Group Project Meeting', color: 'purple' },
    { date: '07/07/2025', month: 'July', startTime: '18:00', title: 'Group Project Meeting', color: 'green' },
    { date: '08/24/2025', month: 'August', startTime: '9:00', title: 'Senior Project Class', color: 'blue' },
    { date: '08/18/2025', month: 'August', startTime: '20:00', title: 'Holiday', color: 'orange' },
    { date: '07/13/2025', month: 'July', startTime: '18:00', title: 'Networking Event', color: 'red' },
    { date: '09/04/2025', month: 'September', startTime: '11:00', title: 'Dentist Appointment', color: 'purple' },
    { date: '07/23/2025', month: 'July', startTime: '13:00', title: 'Group Project Meeting', color: 'yellow' },
    { date: '08/02/2025', month: 'August', startTime: '9:00', title: 'JavaScript Study', color: 'blue' },
    { date: '09/09/2025', month: 'September', startTime: '8:00', title: 'Doctor Appointment', color: 'green' },
    { date: '08/25/2025', month: 'August', startTime: '8:30', title: 'Career Fair', color: 'orange' },
    { date: '09/22/2025', month: 'September', startTime: '8:00', title: 'Gym Session', color: 'green' },
    { date: '07/10/2025', month: 'July', startTime: '10:00', title: 'Gym Session', color: 'blue' },
    { date: '07/21/2025', month: 'July', startTime: '8:30', title: 'COP Final Exam', color: 'purple' },
    { date: '07/30/2025', month: 'July', startTime: '8:30', title: 'Career Fair', color: 'green' },
    { date: '08/28/2025', month: 'August', startTime: '10:00', title: 'Doctor Appointment', color: 'red' },
    { date: '09/12/2025', month: 'September', startTime: '10:00', title: 'Group Project Meeting', color: 'blue' },
    { date: '09/01/2025', month: 'September', startTime: '14:30', title: 'Math Class', color: 'green' },
    { date: '07/20/2025', month: 'July', startTime: '8:30', title: 'JavaScript Study', color: 'red' },
    { date: '08/17/2025', month: 'August', startTime: '10:00', title: 'Senior Project Class', color: 'yellow' },
    { date: '07/11/2025', month: 'July', startTime: '9:00', title: 'Dentist Appointment', color: 'blue' },
    { date: '08/27/2025', month: 'August', startTime: '9:00', title: 'Doctor Appointment', color: 'purple' },
    { date: '07/29/2025', month: 'July', startTime: '11:00', title: 'Holiday', color: 'orange' }
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

  // when a user double clicks a day
  const handleDayDoubleClick = (day, event) => {
    if (!day) return;
    const clickedDate = new Date(year, month, day);
    setDayViewDate(clickedDate);
    setShowDayView(true);
  };

  // Add event or update if editing
  const handleSaveEvent = (event) => {
    if (editingEvent) {
      setEvents(prev =>
        prev.map(ev => (ev === editingEvent ? { ...event, complete: editingEvent.complete } : ev))
      );
    } else {
      setEvents([...events, { ...event, complete: false }]);
    }
    setShowModal(false);
    setEditingEvent(null);
  };

  // Mark complete/incomplete
  const toggleComplete = (event) => {
    setEvents(prev =>
      prev.map(ev => (ev === event ? { ...ev, complete: !ev.complete } : ev))
    );
  };

  // Delete event
  const deleteEvent = (event) => {
    setEvents(prev => prev.filter(ev => ev !== event));
  };

  // Edit event
  const startEditEvent = (event) => {
    setEditingEvent(event);
    setModalPosition(null);
    setShowModal(true);
  };

  // Day view handlers
  const handleCloseDayView = () => {
    setShowDayView(false);
    setDayViewDate(null);
  };

  const handleDayViewEdit = (event) => {
    setShowDayView(false);
    setEditingEvent(event);
    setModalPosition(null);
    setShowModal(true);
  };

  const handleDayViewDelete = (event) => {
    deleteEvent(event);
  };

  const handleDayViewDateChange = (newDate) => {
    setDayViewDate(newDate);
  };

  const handleDayViewCreateEvent = (date, startTime) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setModalPosition(null);
    setPrefilledStartTime(startTime);
    setShowModal(true);
  };

  //////

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Unicalendar</h1>
      
<<<<<<< Updated upstream
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
=======
      {/* Main container with two columns */}
      <div style={{ display: 'flex', gap: '20px' }}>
        
        {/* Left sidebar with Search and Calendar Events */}
        <div style={{
          flex: '0 0 350px', // Fixed width for left sidebar
          border: '2px solid #444',
          padding: '15px',
          borderRadius: '8px',
          height: 'fit-content'
        }}>
          
          {/* Search Feature */}
          <div style={{
            border: '2px solid #444',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px'
          }}>
            <h2>Search</h2>
            <SearchEvents 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchType={searchType}
              setSearchType={setSearchType}
            />
>>>>>>> Stashed changes
          </div>
          
          {/* Calendar Events */}
          <div style={{
            border: '2px solid #444',
            padding: '10px',
            borderRadius: '8px'
          }}>
            <h4>Calendar Events</h4>
            {filteredEvents.map((event, index) => (
              <div key={index}>
                {event.date}: {event.month}: {event.startTime}: <span style={{ color: event.color }}>{event.title}</span>
              </div>
            ))}
          </div>
          
        </div>
        
        {/* Right side with calendar */}
        <div style={{
          flex: '1', // Takes up remaining space
          border: '2px solid #444',
          padding: '10px',
          borderRadius: '8px'
        }}>

      <h2>
        {/*This displays the current date*/} 
        {currentDate.toLocaleString('default', { month: 'long' })} {year}
      </h2> 

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/*This is for the buttons*/} 
        <button onClick={prevMonth}>Previous Month</button>
        <button onClick={() => {
          setSelectedDate(null);
          setModalPosition(null);
          setShowModal(true);
        }}>
          + Create Event
        </button>
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
            onDoubleClick={(e) => handleDayDoubleClick(day, e)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleDayDoubleClick(day, e);
            }}
            style={{
              height: '100px',
              border: '2px solid #ccc',
              textAlign: 'left',
              padding: '2px 4px',
              cursor: day ? 'pointer' : 'default',
              backgroundColor: '#f9f9f9'
            }}>
            <div style={{ fontWeight: 'bold' }}>{day || ''}</div>
            {/* Display events for this day */}
            {[...testEvents, ...events].filter(ev => {
              const evDate = new Date(ev.date);
              return (
                evDate.getFullYear() === year &&
                evDate.getMonth() === month &&
                evDate.getDate() === day
              );
            }).map((ev, i) => (
              <div key={i} style={{
                fontSize: '0.75em', 
                color: ev.color,
                textDecoration: ev.complete ? 'line-through' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-betwee'
              }}>
                <span
                  onClick={() => toggleComplete(ev)}
                  style={{ cursor: 'pointer', flexGrow: 1}}
                  title="Click to mark complete"
                >
                  • {ev.title}
                </span>
                <span style={{ marginLeft: '4px' }}>
                  <button onClick={() => startEditEvent(ev)} title="Edit">✎</button>
                  <button onClick={() => deleteEvent(ev)} title="Delete">␡</button>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

        {/* Modal for creating event */}
        {showModal && (
          <CreateEventModal
            defaultDate={selectedDate}
            editingEvent={editingEvent}
            position={modalPosition}
            prefilledStartTime={prefilledStartTime}
            onClose={() => {
              setShowModal(false);
              setEditingEvent(null);
              setPrefilledStartTime('');
            }}
            onSave={handleSaveEvent}
          />
        )}

        {/* Day View */}
        {showDayView && dayViewDate && (
          <DayView
            selectedDate={dayViewDate}
            events={events}
            testEvents={testEvents}
            onClose={handleCloseDayView}
            onEditEvent={handleDayViewEdit}
            onDeleteEvent={handleDayViewDelete}
            onDateChange={handleDayViewDateChange}
            onCreateEvent={handleDayViewCreateEvent}
          />
        )}
        </div>
        
      </div>
    </div>
  );
}

export default CalendarView;
