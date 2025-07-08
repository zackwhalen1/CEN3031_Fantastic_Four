import React from 'react';

function SearchEvents({ searchQuery, setSearchQuery, searchType, setSearchType }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <select 
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        style={{ marginBottom: '10px', width: '100%' }}
      >
        <option value="title">Title</option>
        <option value="date">Date</option>
        <option value="color">Color</option>
        <option value="month">Month</option>
        <option value="startTime">Start Time</option>
      </select>

      <input 
        type="text"
        placeholder={`Search by ${searchType}...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default SearchEvents;
