import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [page, setPage] = useState(1);
    const [totalClasses, setTotalClasses] = useState();
    const [limit] = useState(3);
    const [type, setType] = useState('');
  

    useEffect(() => {
      fetchClasses();
    }, [page, type]);

    const fetchClasses = () => {
      axios.get(`/api/classes?page=${page}&limit=${limit}&type=${type.toLowerCase()}`).then(res => {
       
        setClasses(res.data.classes);
        setTotalClasses(res.data.totalClasses);
      })
      .catch(err => console.log(err));
    }

    const handleTypeChange = (e) => {
      setType(e.target.value);
      setPage(1);
    }


    return (
        <div>
        <div className='bg-[#0E91A0] p-4 flex justify-between items-center'>
        <h2 className="text-2xl font-bold mb-4 text-white">Available Classes</h2>
        <div>
        <button className='bg-white text-[#0E91A0] mr-4 p-2 rounded-lg font-bold' onClick={() => navigate('/my-bookings')} >My Bookings</button>
        <select value={type} onChange={handleTypeChange} className="mb-4 p-2">
            <option value="">All</option>
            <option value="Yoga">Yoga</option>
            <option value="Gym">Gym</option>
            <option value="Dance">Dance</option>
        </select>
        </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center'>
        {classes?.map(cls => (

            <ClassCard key={cls.id} classData={cls} />
        ))}
        </div>
        <div className="pagination mt-4 text-center">
            <button className='bg-blue-500 hover:bg-blue-400 w-24 py-2 rounded-lg mr-4 text-white font-bold' onClick={() => setPage(page => Math.max(page - 1, 1))} disabled={page === 1}>
                Previous
            </button>
            <button className='bg-blue-500 hover:bg-blue-400 w-24 py-2 rounded-lg mr-4 text-white font-bold' onClick={() => setPage(page => Math.min(page + 1, Math.ceil(totalClasses / limit)))} disabled={page >= Math.ceil(totalClasses / limit)}>
                Next
            </button>
        </div>
    </div>
    )
}
const ClassCard = ({ classData, handleBooking }) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 text-center">
        <img className="w-full h-60" src={classData.bgImage} alt={classData.type} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{classData.name} Class</div>
          <p className="text-gray-700 text-base font-semibold">Capacity: {classData.capacity}</p>
          <p className="text-gray-700 text-base font-semibold">Available Slots: {classData.capacity - classData.bookings.length}</p>
        </div>
        <div className="px-6 pt-4 pb-2 mb-4">
          <Link
            to={`/book/${classData.id}`}
            className="bg-[#0E91A0] hover:opacity-90 text-white font-bold py-2 px-4 rounded"
          >
            Book Now
          </Link>
        </div>
      </div>
    );
  };
export default Home;