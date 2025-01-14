Bus Booking System
Welcome to the Bus Booking System! This project allows users to search for buses, book tickets, view bookings, cancel bookings, and manage their profile settings seamlessly. Built using the MERN stack (MongoDB, Express.js, React, Node.js), this application provides a user-friendly interface and powerful backend functionality.

🚀 Features
1. User Authentication: Secure login and registration using JWT.
2. Registration Page: Allow new users to create an account with their name, email, and password.
3. Search Buses: Find buses based on source, destination, date, and time.
4. Book Tickets: Add passenger details, select seats, and confirm bookings.
5. View Bookings: See all your confirmed bookings on a personalized dashboard.
6. Cancel Bookings: Cancel existing bookings with confirmation.
7. Profile Settings: Update your user profile details, such as name, email, and password.
8. Payment Gateway: Mock payment gateway to securely process ticket payments.
9. Add Bus Routes: Currently, dummy bus routes can be added via Postman (no admin panel available yet).
10. Responsive Design: Fully responsive UI for all devices


🛠️ Technologies Used
Frontend:
React.js: For building a dynamic and responsive user interface.
Axios: For making API requests.
React Router: For navigation.
TailwindCSS: For styling.

Backend:
Node.js: For server-side logic.
Express.js: For creating RESTful APIs.
MongoDB: For database management.
Mongoose: For modeling MongoDB data.
JWT: For secure user authentication.


📁 Folder Structure
root
├── backend
│   ├── models
│   ├── routes
│   ├── middlewares
│   ├── config
│   └── server.js
├── bus-booking-app
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   └── App.js
└── README.md


🛠️ Setup Instructions
Prerequisites
Node.js installed.
MongoDB installed and running.
npm or yarn installed.

Backend Setup
1. Navigate to the backend folder:
    cd backend
2. Install dependencies:
    npm install
3. Create a .env file in the backend folder with the following variables:
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

4. Start the server:
    node server.js
    The backend will run at http://localhost:5000.

Frontend Setup
1. Navigate to the frontend folder:
    cd bus-booking-app
2. Install dependencies:
    npm install
3. Start the development server:
    npm start
    The frontend will run at http://localhost:3000.

✨ Available Scripts
Backend
    node server.js : Start the backend server.
    npm run dev: Start the backend server with live reload using nodemon.

Frontend
    npm start: Start the React development server.
    npm test: Run tests.
    npm run build: Build the app for production.

📖 API Endpoints
Auth
    POST /api/auth/register: Register a new user.
    POST /api/auth/login: Login and receive a JWT.
Booking
    GET /api/booking: Get all bookings for the logged-in user.
    POST /api/booking/book: Create a new booking.
    DELETE /api/booking/:id: Cancel a booking.
Buses
    GET /api/buses: Get available buses based on search criteria.
    GET /api/buses/:id: Get details of a specific bus.
    POST /api/buses/add: Add new bus routes (via Postman).

🚎 Adding Bus Routes (Dummy Data)
Since there is no admin panel available for managing bus routes, you can add dummy bus routes using Postman or similar tools. Follow these steps:

1. Endpoint:
    POST http://localhost:5000/api/buses/add

2. Request Body: Use the following format to add multiple bus routes:
    json
    [
    {
        "busName": "Luxury Bus A",
        "source": "City A",
        "destination": "City B",
        "date": "2025-01-20",
        "time": "10:00 AM",
        "price": 1500
    },
    {
        "busName": "Luxury Bus B",
        "source": "City B",
        "destination": "City C",
        "date": "2025-01-21",
        "time": "2:00 PM",
        "price": 2000
    }
    ]

3. Headers:
    json
    {
    "Content-Type": "application/json"
    }
Click "Send" to add the dummy routes to your database.


🖥️ Key Pages
1. Home Page
    Search and explore available buses.

2. Booking Page
    Enter passenger details and confirm your booking.

3. Dashboard
    Manage all your bookings in one place.

4. Profile Settings
    View and edit your user details, such as name and email.
    Update your password securely.
5. Payment Gateway Page
    Mock Payment Gateway: A simple page where users can view the ticket amount and simulate a payment.
    Features:
        Enter payment details like card number, expiration date, and CVV.
        Confirm payment and redirect back to the dashboard after successful payment.
        This feature is currently for demonstration purposes and does not process real payments.
6. Login/Register
    Login Page: Securely log in using your email and password.
    Register Page: Create a new account by providing your name, email, and password.
    Both pages feature user-friendly error handling and validation for a seamless experience.



🛡️ Security Features
Passwords are hashed using bcrypt.js.
Authentication handled using JWT with secure headers.
Protected routes to prevent unauthorized access.

📸 Screenshots
Home Page
Search and explore available buses.

Booking Page
Enter passenger details and confirm your booking.

Dashboard
Manage all your bookings in one place.

Profile Settings
Update your user details or password effortlessly.

Payment Gateway Page
Simulate payments with a mock payment gateway.

🤝 Contributions
Contributions are welcome! If you would like to contribute to this project:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes (git commit -m 'Add feature').
4. Push to the branch (git push origin feature-branch).
5. Open a Pull Request.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

📞 Contact
For any inquiries or feedback, feel free to reach out:

Email: hashankogul99uoj@gmail.com
LinkedIn: https://www.linkedin.com/in/hashan-kogul-yogendran-698668290

Thank you for checking out this project! Happy coding! 🎉