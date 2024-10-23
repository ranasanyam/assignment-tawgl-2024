const express = require('express');
const { getClasses, getClassDetails, cancelBooking, getAllBookings} = require('../controllers/classController');
const router = express.Router();

router.get('/classes', getClasses);
router.get('/classes/:id', getClassDetails);
router.post('/api/cancel', cancelBooking);
router.get('/api/my-bookings/:userId', getAllBookings);



module.exports = router;