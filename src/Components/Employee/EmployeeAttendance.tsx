import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AuthState } from '../../Actions/authTypes';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const EmployeeAttendance = () => {
  const [attendanceRecord, setAttendanceRecord] = useState<boolean | null>(null);


  const user = useSelector((state: { auth: AuthState }) => state.auth.username);

  useEffect(() => {
    // Load attendance data from local storage on component mount
    const storedAttendance = JSON.parse(localStorage.getItem('attendance') || '{}');
    setAttendanceRecord(storedAttendance[user]?.[new Date().toLocaleDateString()] || null);
  }, [user]);

//   const handleDateClick = (arg: any) => {
//     const currentDate = new Date(arg.date).toLocaleDateString();
//     const updatedAttendance = {
//       ...JSON.parse(localStorage.getItem('attendance') || '{}'),
//       [user]: {
//         ...(JSON.parse(localStorage.getItem('attendance') || '{}')[user] || {}),
//         [currentDate]: true,
//       },
//     };

//     localStorage.setItem('attendance', JSON.stringify(updatedAttendance));
//     setAttendanceRecord(true);
//   };

const handleMarkAttendance = () => {
    const currentDate = new Date().toLocaleDateString();
    const storedAttendance = JSON.parse(localStorage.getItem('attendance') || '{}');
  
    if (storedAttendance[user]?.[currentDate]) {
      // Attendance already marked, show an alert
      toast.error('Attendance already marked for today!');
    } else {
      // Mark attendance
      const updatedAttendance = {
        ...storedAttendance,
        [user]: {
          ...(storedAttendance[user] || {}),
          [currentDate]: true,
        },
      };
  
      localStorage.setItem('attendance', JSON.stringify(updatedAttendance));
      setAttendanceRecord(true);

   

  
      // Attendance marked successfully, show an alert
      toast.success('Attendance marked successfully!');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{user}'s Attendance</h2>
      {/* <button
        onClick={handleMarkAttendance}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Mark Attendance
      </button> */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        customButtons={{
            markAttendance: {
              text: 'Mark Attendance',
              click: handleMarkAttendance,
            },
          }}
          headerToolbar={{
            start: 'markAttendance',
            center: 'title',
            end: 'today prev,next',
          }}
        events={[
          {
            title: 'Marked Attendance',
            start: Object.keys(attendanceRecord || {}).map((date) => new Date(date)),
          },
        ]}
      />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );

};

export default EmployeeAttendance;
