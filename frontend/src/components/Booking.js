import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getCookie } from '../helpers/cookieHelper';
const Booking = () => {
    const navigate = useNavigate();
    const { classId } = useParams();
    const [classDetails, setClassDetails] = useState(null);
    const [message, setMessage] = useState('');
    let userId = getCookie('userId');


    const user = { id: userId, name: 'John Doe'};


    useEffect(() => {
      
        axios.get(`/api/classes`).then(res => {
          const foundClass = res.data.classes.find(cls => cls.id === parseInt(classId));
          setClassDetails(foundClass);
        }).catch(err => setMessage('Error loading class details.'));
        
        
      
    }, [classId]);

    const handleBooking = () => {
        axios.post('/api/book', { classId: parseInt(classId), user }).then(res => {setMessage(res.data.message);
          setTimeout(() => {
            navigate('/my-bookings');
          }, 2000);
        }).catch(err => {
          setMessage(err.response.data.message)});
    }





    return (
        <div className="container mx-auto mt-8 p-4 flex flex-col md:flex-row">
        <div><button onClick={() => navigate(-1)}>Go back</button></div>
          <div className="max-w-lg mx-auto rounded overflow-hidden shadow-lg bg-white text-center">
            {classDetails ? (
              <>
              
                <img className="w-full" src={classDetails.bgImage} alt={classDetails.type} />
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-2">{classDetails.name} Class</h1>
                  <p className="text-gray-700 mb-4">
                    Capacity: {classDetails.capacity}
                  </p>
                  <p>Start time: {new Date(classDetails.startTime).toLocaleString()}</p>
                  <p className="text-gray-700 mb-4">
                    Available Slots: {classDetails.capacity - classDetails.bookings.length}
                  </p>
                  {message && (
                    <div className="text-green-500 font-semibold mb-4">
                      {message}
                    </div>
                  )}
                  {classDetails?.id === 1 && (
                    <div className="mt-8 text-center">
                        <h2 className="text-xl font-semibold mb-4">Why Join This Class?</h2>
                        <p className="text-gray-700 mb-2">- Improve your health and well-being.</p>
                        <p className="text-gray-700 mb-2">- Learn from the best instructors.</p>
                        <p className="text-gray-700 mb-2">- Flexible class timings to suit your schedule.</p>
                    </div>
                  )}
                  <button
                    onClick={handleBooking}
                    className="bg-[#0E91A0] text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Book Now
                  </button>
                  {classDetails?.waitlist.length > 0 && (
                    <button className='bg-green-700 w-full mt-4 font-bold text-white rounded py-2 px-4'>Waitlist</button>
                  )}
                </div>
              </>
            ) : (
                <p>{'Loading class details...'}</p>
            )}
          </div>
        </div>
      );
    
}
export default Booking;