import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [enrolledChildren, setEnrolledChildren] = useState([]);
  const [todayDate, setTodayDate] = useState('');
  const [attendanceTime, setAttendanceTime] = useState({});
  const [attendanceStatus, setAttendanceStatus] = useState({});

  const randomEmojis = ['👦', '👧', '🧒', '👶', '🧑', '👦', '👧'];
  const navigate = useNavigate(); // Use useNavigate to handle navigation

  useEffect(() => {
    const date = new Date();
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    setTodayDate(date.toLocaleDateString('en-US', options));

    const fetchChildren = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'children'));
        const childrenData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEnrolledChildren(childrenData);
      } catch (error) {
        console.error('Error fetching children data: ', error);
      }
    };

    fetchChildren();
  }, []);

  const handleMarkPresent = (childId) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAttendanceTime((prev) => ({ ...prev, [childId]: time }));
    setAttendanceStatus((prev) => ({ ...prev, [childId]: 'present' }));
  };

  const handleMarkAbsent = (childId) => {
    setAttendanceTime((prev) => ({ ...prev, [childId]: null }));
    setAttendanceStatus((prev) => ({ ...prev, [childId]: 'absent' }));
  };

  const handleCardClick = (childId) => {
    const childAttendanceTime = attendanceTime[childId];
    if (attendanceStatus[childId] === 'present' && childAttendanceTime) {
      // If child is present and has an 'in' time, navigate to the daily update form
      navigate(`/add-daily-update/${childId}`);
    } else {
      alert("This child is not marked as present.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4 space-y-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <img src="/image.png" alt="Giraffe Icon" className="w-10 h-10" />
        <div className="text-gray-500 flex items-center space-x-2">
          <span className="font-semibold text-base">Today</span>
          <div className="flex items-center space-x-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4h12v2H4V4zM4 8h12v8H4V8zM8 10h2v2H8v-2z" />
            </svg>
            <span className="text-gray-600 text-sm">{todayDate}</span>
          </div>
        </div>
      </div>

      {/* Today Attendance */}
      <div className="bg-gray-800 text-white py-[8vw] px-[4vw] rounded-lg shadow-md space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">Today Attendance</h3>
        </div>
        <p className="text-xl font-bold">10/12 Done</p>
        <div className="bg-gray-600 h-2 rounded-full overflow-hidden">
          <div className="bg-lime-500 h-full rounded-full" style={{ width: '83%' }}></div>
        </div>
      </div>

      {/* Category Links */}
      <div className="grid grid-cols-4 gap-2">
        <Link to="/add-child" className="p-2 bg-blue-500 text-white font-medium text-xs text-center rounded-lg shadow-md hover:bg-blue-600">
          Child Record
        </Link>
        <Link to="/daily-updates" className="p-2 bg-orange-500 text-white font-medium text-xs text-center rounded-lg shadow-md hover:bg-orange-600">
          Daily Updates
        </Link>
        <Link to="/view-reports" className="p-2 bg-yellow-500 text-white font-medium text-xs text-center rounded-lg shadow-md hover:bg-yellow-600">
          View Reports
        </Link>
        <Link to="/payments" className="p-2 bg-purple-500 text-white font-medium text-xs text-center rounded-lg shadow-md hover:bg-purple-600">
          Payments
        </Link>
      </div>

      {/* Children Record */}
      <div className="space-y-4">
        <h2 className="text-md font-semibold">Children Record:</h2>
        {enrolledChildren.map((child, index) => (
          <div
            key={child.id}
            className="flex items-center p-3 bg-white rounded-lg shadow-md space-x-3 overflow-hidden cursor-pointer"
            onClick={() => handleCardClick(child.id)} // Attach onClick to navigate
          >
            <span role="img" aria-label="Child Emoji" className="text-3xl">
              {randomEmojis[index % randomEmojis.length]}
            </span>
            <div className="flex flex-col flex-grow">
              <span className="text-gray-800 font-medium text-sm">{child.name}</span>
              {attendanceTime[child.id] && (
                <p className="text-xs text-gray-500">Present at {attendanceTime[child.id]}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                className="py-1 px-2 bg-lime-500 text-white rounded-md text-xs"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  handleMarkPresent(child.id);
                }}
                disabled={attendanceStatus[child.id] === 'present'}
              >
                Present
              </button>
              <button
                className="py-1 px-2 bg-gray-700 text-white rounded-md text-xs"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  handleMarkAbsent(child.id);
                }}
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
