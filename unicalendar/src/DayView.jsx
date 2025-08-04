import React from 'react';

const DayView = ({ selectedDate, events, testEvents, onClose, onEditEvent, onDeleteEvent, onDateChange, onCreateEvent }) => {
  // Get events for the selected date
  const allEvents = [...testEvents, ...events];
  const dayEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  // Navigation functions
  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    onDateChange(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    onDateChange(nextDay);
  };

  // Handle double click on time slot
  const handleTimeSlotDoubleClick = (hour24) => {
    const timeString = `${hour24.toString().padStart(2, '0')}:00`;
    onCreateEvent(selectedDate, timeString);
  };

  // Generate hours from 12 AM to 11 PM
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const hour12 = i === 0 ? 12 : i > 12 ? i - 12 : i;
    const ampm = i < 12 ? 'AM' : 'PM';
    hours.push({
      hour24: i,
      display: `${hour12}:00 ${ampm}`
    });
  }

  // Function to convert time string to hour position
  const getHourFromTime = (timeString) => {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours + (minutes / 60);
  };

  // Function to get event duration in hours
  const getEventDuration = (startTime, endTime) => {
    if (!endTime) return 1; // Default 1 hour if no end time
    const start = getHourFromTime(startTime);
    const end = getHourFromTime(endTime);
    return Math.max(end - start, 0.5); // Minimum 30 minutes
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        border: '2px solid #444',
        borderRadius: '8px',
        width: '90%',
        height: '90%',
        padding: '20px',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '2px solid #444',
          paddingBottom: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              onClick={goToPreviousDay}
              style={{
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ← Previous Day
            </button>
            
            <h2 style={{ margin: 0 }}>
              Day View - {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            
            <button 
              onClick={goToNextDay}
              style={{
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Next Day →
            </button>
          </div>
          
          <button 
            onClick={onClose}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>

        {/* Day view container */}
        <div style={{ display: 'flex', height: 'calc(100% - 80px)' }}>
          
          {/* Time column */}
          <div style={{
            width: '100px',
            borderRight: '2px solid #ccc',
            paddingRight: '10px'
          }}>
            {hours.map((hour, index) => (
              <div 
                key={index} 
                onDoubleClick={() => handleTimeSlotDoubleClick(hour.hour24)}
                style={{
                  height: '60px',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                title="Double-click to create event at this time"
              >
                {hour.display}
              </div>
            ))}
          </div>

          {/* Events column */}
          <div style={{
            flex: 1,
            position: 'relative',
            marginLeft: '10px'
          }}>
            {/* Hour grid lines */}
            {hours.map((hour, index) => (
              <div 
                key={index} 
                onDoubleClick={() => handleTimeSlotDoubleClick(hour.hour24)}
                style={{
                  position: 'absolute',
                  top: `${index * 60}px`,
                  left: 0,
                  right: 0,
                  height: '60px',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f8f8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                title="Double-click to create event at this time"
              />
            ))}

            {/* Events */}
            {dayEvents.map((event, index) => {
              const startHour = getHourFromTime(event.startTime);
              const duration = getEventDuration(event.startTime, event.endTime);
              const top = startHour * 60;
              const height = duration * 60;

              return (
                <div key={index} style={{
                  position: 'absolute',
                  top: `${top}px`,
                  left: '10px',
                  right: '10px',
                  height: `${height}px`,
                  backgroundColor: event.color,
                  border: '2px solid #333',
                  borderRadius: '5px',
                  padding: '5px',
                  color: 'white',
                  fontSize: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textShadow: '1px 1px 1px rgba(0,0,0,0.7)',
                  zIndex: 1
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{event.title}</div>
                    <div>{event.startTime} - {event.endTime || 'No end time'}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button 
                      onClick={() => onEditEvent(event)}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        border: '1px solid white',
                        borderRadius: '3px',
                        padding: '2px 5px',
                        fontSize: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDeleteEvent(event)}
                      style={{
                        backgroundColor: 'rgba(255,0,0,0.3)',
                        color: 'white',
                        border: '1px solid white',
                        borderRadius: '3px',
                        padding: '2px 5px',
                        fontSize: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}

            {/* No events message */}
            {dayEvents.length === 0 && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: '#666',
                fontSize: '18px'
              }}>
                No events scheduled for this day
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
