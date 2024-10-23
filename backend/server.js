const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const classRoutes = require('./routes/classRoutes');
const classes = require('./data');
const app = express();

// middleware
app.use(cors({
    origin: "http://localhost:5000"
}));
app.use(express.json());
app.use(cookieParser());


// app.use('/api', classRoutes);
app.get('/api/classes', (req, res) => {
    const { page = 1, limit = 3, type } = req.query;

    let filteredClasses = classes;
    if(type) {
        filteredClasses = filteredClasses.filter(cls => cls.type.toLowerCase() === type.toLowerCase());
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = filteredClasses.slice(startIndex, endIndex);

    return res.status(200).json({
        page: parseInt(page),
        limit: parseInt(limit),
        totalClasses: filteredClasses.length,
        classes: results
    });
})

//book a class
app.post('/api/book', (req, res) => {
    const { classId } = req.body;
    const userId = req.cookies.userId;

    if(!userId) {
        return res.status(400).json({ message: 'User not identified.' });
    }
    const selectedClass = classes.find(cls => cls.id === classId);

    if(!selectedClass) {
        return res.status(404).json({ message: "Class not found" });
    }
    const isAlreadyBooked = selectedClass.bookings.some(booking => booking.id === userId);
    if(isAlreadyBooked) {
        return res.status(400).json({ message: 'You have already booked this class' });
    }
    if (selectedClass.bookings.length < selectedClass.capacity) {
        selectedClass.bookings.push({ id: userId });
        return res.status(200).json({ message: 'Class booked successfully!' });
    } else {
        selectedClass.waitlist.push({ id: userId });
        return res.status(200).json({ message: 'Class is full. You have been added to the waitlist.' });
    }
    // if(selectedClass.bookings.length >= selectedClass.capacity) {
    //     const isOnWaitlist = selectedClass.waitlist.some(waitlistUser => waitlistUser.id === userId);
    //     if(isOnWaitlist) {
    //         return res.status(400).json({ message: 'You are already on the waitlist' });
    //     }
    //     selectedClass.waitlist.push(userId);
    //     return res.status(200).json({ message: 'Class is full. Added to the waitlist.' });
    // }
    // selectedClass.bookings.push(userId);
    // return res.status(200).json({ message: 'Class booked successfully' });
});

// cancel a booking
app.post('/api/cancel', (req, res) => {
    const { classId } = req.body;
    const userId = req.cookies.userId;

    if(!userId) {
        return res.status(400).json({ message: 'User not identified.'});
    }
    const selectedClass = classes.find(cls => cls.id === classId);

    if(!selectedClass) {
        return res.status(404).json({ message: 'Class not found' });
    }

    const startTime = new Date(selectedClass.startTime).getTime();
    const now = Date.now();

    if(now > startTime) {
        return res.status(400).json({ message: 'Cannot cancel, the class has already started or passed.'});
    }
    const timeDifference = startTime - now;

    if(timeDifference <= 1800000) {
        return res.status(400).json({ message: 'Cannot cancel class within 30 minutes of start time' });
    }

    const bookingIndex = selectedClass.bookings.findIndex(booking => booking.id === userId);
    if(bookingIndex === -1) {
        return res.status(400).json({ message: 'No booking found for this user.' });
    }
    selectedClass.bookings.splice(bookingIndex, 1);
    if(selectedClass.waitlist.length > 0) {
        const nextUser = selectedClass.waitlist.shift();
        selectedClass.bookings.push(nextUser);
    }
    return res.status(200).json({ message: 'Booking cancelled successfully. Waitlist updated.' });
})

// fetch all bookings for a user
app.get('/api/my-bookings/:userId', (req, res) => {
    const userId = req.params.userId;

    if(!userId) {
        return res.status(400).json({ message: 'User not identified.'});
    }
    console.log('classes', classes);
    const userBookings = classes.filter(cls => cls.bookings.some(booking => booking.id === userId));

    console.log(('user bookings', userBookings));
    if(userBookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found.' });
    }
    return res.status(200).json(userBookings);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})