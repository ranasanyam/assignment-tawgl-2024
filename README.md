Project Overview
This project is a Class Booking Application that allows users to book classes (e.g., yoga, gym, dance), view their bookings, and cancel bookings if needed. It also supports a waiting list mechanism for full classes and ensures that the first user in the waitlist is moved to the booking if a spot opens up. The app is built with a responsive UI using React.js and Tailwind CSS for the frontend, and Node.js with Express for the backend. It also includes API integration for booking, canceling, and managing classes.

Features
Users can book different types of classes (Yoga, Gym, Dance).
Each class has a capacity limit, and users can only book if there’s space.
Waitlist functionality for full classes.
Users can cancel a booking up to 30 minutes before the class start time.
When a cancellation occurs, the next user in the waitlist is moved to the booking.
Users can view all their bookings with a detailed list.
User identification via cookies for session tracking.
Test-driven development and client-side caching for improved performance.
Pagination for handling large data sets in the class list.
Clean and professional-level code structure.
Directory Structure
php
Copy code
.
├── backend/
│   ├── models/
│   │   └── Class.js         # Data structure for class management
│   ├── routes/
│   │   └── classRoutes.js   # API routes for handling class bookings
│   ├── server.js            # Main backend server file
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Booking.js # UI for displaying classes
│   │   │   ├── Home.js# UI for displaying user bookings
│   │   │   ├── MyBookings.js  # UI for managing the waitlist
│   │   └── App.js           # Main App component
│   ├── package.json         # Frontend dependencies
├── package.json             # Backend dependencies
└── README.md                # This file
Setup Instructions
1. Install Dependencies
Make sure you have Node.js and npm installed.

Clone the repository:

bash
Copy code
git clone <repo-url>
Navigate to the backend/ and frontend/ folders and install the dependencies:

bash
Copy code
# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
2. Running the Backend Server
Navigate to the backend/ folder and start the server:

bash
Copy code
npm start
The backend will be running on http://localhost:5000.

3. Running the Frontend Development Server
Navigate to the frontend/ folder and start the React development server:

bash
Copy code
npm start
The frontend will be running on http://localhost:3000.

4. API Endpoints
Method	Endpoint	Description
GET	/api/classes	Get all available classes
POST	/api/book	Book a class by classId and userId
POST	/api/cancel	Cancel a booking and update the waitlist
GET	/api/my-bookings	Get all classes booked by the user
5. Backend Routes
Booking a Class: The backend checks if the class is fully booked before adding the user to either the bookings or the waitlist array.
Canceling a Class: Users can cancel their booking up to 30 minutes before the class starts, and a user from the waitlist is moved to the bookings if available.
6. User Identification
User identification is handled via cookies in the frontend. When the user first accesses the application, a unique user ID is assigned and stored in the browser’s cookies. This ID is used for subsequent bookings and cancellations.
7. Technologies Used
Frontend
React.js: Core framework for the UI.
React Router DOM: For routing between pages.
Axios: To handle API requests.
Tailwind CSS: For responsive and customizable styling.
Backend
Node.js: Runtime environment.
Express.js: Web framework for creating APIs.
Cors: Middleware to handle cross-origin requests.
Other
Session and Cookie Management: For user identification.
Test Driven Development (TDD): With manual test coverage for all routes.
8. Running Tests
The backend includes test-driven development practices. To run tests:

bash
Copy code
# Backend tests
npm test
9. User Flow
Home Page: Users can view a list of all available classes.
Book Class: Users can book a class if space is available, otherwise, they are added to a waitlist.
My Bookings: Users can view all their current bookings and cancel if needed.
Cancel Booking: Users can cancel a booking 30 minutes before the class start time, and the first user in the waitlist gets the slot.
10. Cookie Usage
The backend uses cookies for user identification to differentiate bookings between users. The cookie stores a user ID, which is passed with each request to the backend.
