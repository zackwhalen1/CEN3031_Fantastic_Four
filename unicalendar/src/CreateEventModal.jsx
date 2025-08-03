import React, { useState, useEffect } from "react";

const CreateEventModal = ({ onClose, onSave, defaultDate, editingEvent, position }) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [color, setColor] = useState("");

    // if editing, prefill all fields from event
    useEffect(() => {
        if (editingEvent) {
            setTitle(editingEvent.title || "");
            setDate(editingEvent.date || "");
            setStartTime(editingEvent.startTime || "");
            setEndTime(editingEvent.endTime || "");
        }   else if (defaultDate) {
            // For creating a new event, prefill the date only
            setDate(defaultDate.toISOString().split("T")[0]);
        }
    },      [editingEvent, defaultDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, date, startTime, endTime, color });
    };

    return (
        <div 
            className="modal-overlay"
            onClick={onClose} // clicking background closes modal //
        >
            <div 
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'fixed',
                    top: position?.y ?? '50%',
                    left: position?.x ?? '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    border: '2px solid #444',
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    minWidth: '300px',
                    maxWidth: '400px'
                }} // clicking inside does not close modal //
            >
                <h3>{editingEvent ? "Edit Event" : "Create New Event"}</h3>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                    {/* Color Picker */}
                    <div style={{ marginTop: "10px" }}>
                        <label>Pick a Color:</label>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{ marginLeft: "10px" }}
                        />
                    </div>
                    {/* Custon Color Name Input */}
                    <div style={{ marginTop: "10px" }}>
                        <label>Or enter a color name or hex:</label>
                        <input
                            type="text"
                            placeholder="e.g., red or #ff6600"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{ width: "100%", marginTop: "5px" }}
                            required
                        />
                    </div>
                    <div style={{ marginTop: "15px" }}>
                        <button type="submit">{editingEvent ? "Update" : "Save"}</button>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ marginLeft: "10px" }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEventModal
