import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../helpers/cookieHelper';

const MyBookings = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState('');
    let userId = getCookie('userId');



    useEffect(() => {
        fetchBookings();
    }, [userId]);

    const fetchBookings = () => {
        axios.get(`/api/my-bookings/${userId}`).then(res => setBookings(res.data)).catch(err => console.log('Error fetching bookings.'));
    }

    const handleCancel = (classId) => {
        axios.post('/api/cancel', { classId }).then(res => {
            setMessage(res.data.message);
            fetchBookings();
        }).catch(err => setMessage(err.response.data.message));
    }
    
    

    return (
        <div>
            <div className='bg-[#0E91A0] p-4 text-center text-white mb-4'>
            <h1 className='text-2xl font-bold mb-4'>My Bookings</h1>
            </div>
            <div>
                <button onClick={() => navigate(-1)} className='bg-transparent px-4 py-2 rounded-md ml-6 bg-gray-300'>Back</button>
            </div>
            {bookings?.length === 0 ? (
                <p className="text-center text-lg text-gray-600">No bookings found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
                    {bookings?.map((booking, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                        <img className="w-full h-60" src={booking.bgImage} alt={booking.type} />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{booking.name} Class</div>
                                <p>Start Time: {new Date(booking.startTime).toLocaleString()}</p>
                                <p className="text-gray-700 text-base font-semibold">Capacity: {booking.capacity}</p>
                                <p className="text-gray-700 text-base font-semibold">Available Slots: {booking.capacity - booking.bookings.length}</p>
                            </div>
                            
                            <button
                                className="mt-4 bg-red-500 hover:bg-red-300 text-white rounded-lg px-4 py-2 transition duration-200"
                                onClick={() => handleCancel(booking.id)}
                            >
                                Cancel Booking
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {message && <p className='mt-4'>{message}</p>}
        </div>
    )
}
export default MyBookings;