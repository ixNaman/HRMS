import React, { useState } from 'react';

type Props = {};

const AttendanceTracking = (props: Props) => {
  // Retrieve attendance data from localStorage and parse it as JSON
  const storedAttendance = JSON.parse(localStorage.getItem('attendance') || '{}');

  // State to manage the selected person for the dropdown
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  // Handle dropdown change
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPerson(event.target.value);
  };

  // Render attendance data in dropdown cards
  const renderAttendanceDropdown = () => {
    return (
      <div className="text-center mx-4 my-8 bg-gradient-to-r from-cyan-200 to-grey-200 p-6 rounded-md">
        <h1 className="text-2xl  text-black mb-8">Attendance Tracking</h1>
        <label htmlFor="selectPerson" className="text-lg text-black mr-4">
          Select Person:
        </label>
        <select
          id="selectPerson"
          onChange={handleDropdownChange}
          value={selectedPerson || ''}
          className="text-lg px-4 py-2 rounded-md bg-white text-gray-800"
        >
          <option value="" disabled>
            Select a person
          </option>
          {Object.keys(storedAttendance).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {selectedPerson && (
          <div className="border-2 border-gray-300 rounded-md p-6 mt-8 shadow-md bg-white">
            <h2 className="text-xl font-bold mb-4">{selectedPerson}</h2>
            <ul className="list-none p-0">
              {Object.entries(storedAttendance[selectedPerson]).map(([date, isPresent]) => (
                <li key={date} className="text-base mb-2">
                  <strong>Date:</strong> {date}, <strong>Attendance:</strong>{' '}
                  {isPresent ? 'Present' : 'Absent'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Render the component with attendance dropdown
  return renderAttendanceDropdown();
};

export default AttendanceTracking;
