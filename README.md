# Social Media Post App (Backend Machine Test for HDFC Bank)

This **Social Media Post App** is a backend-only application developed as part of a machine test for HDFC Bank. This app allows users to create and manage their social media posts through a secure API. The app includes user authentication, encrypted passwords, and a history of previous posts on each new post created.

The project is documented with Swagger, allowing easy testing of all APIs.

## Features

- **User Management:** 
  - User creation and retrieval by user ID.
  - Password encryption using bcrypt for secure storage.
  - JWT-based authentication to secure access to API endpoints.

- **Post Management:** 
  - Create, retrieve, update, and delete posts.
  - Each post includes a `previous_messages` field, showing a history of all prior posts by the user.
  
- **Authentication:** 
  - User must log in to access authenticated APIs.
  - JWT authentication ensures secure access to create, retrieve, update, and delete posts.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Security:** JWT for user authentication and bcrypt for password encryption
- **API Documentation:** Swagger

## Project Link

The project is hosted on Render. Due to inactivity, the site can take 60 seconds or more to load. You can access the Swagger documentation and test the APIs at the following link:

- [Social Media Post App Swagger Documentation](https://social-media-post-app-hdfc.onrender.com/api-docs/)

## How to Run Locally

1. Clone this repository:

```bash
git clone https://github.com/atulkkale/social-media-post-app-hdfc.git
cd social-media-post-app-hdfc
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables in a .env file, including NODE_ENV, PORT=3000, DATABASE_DRIVER, DB_URI, and JWT_SECRET_KEY.

4. Run the app:

```bash
npm start
```

5. Open http://localhost:3000/api-docs in your browser to view the Swagger Documentation.

## Future Improvements

- Front-End Integration: Develop a user interface to enhance usability and allow users to interact with the app visually.
- Enhanced Security: Implement multi-factor authentication (MFA) to further secure user accounts.
- Search and Filter: Add functionality to search and filter posts based on keywords, date, and other criteria.
- Notifications: Include email notifications to inform users about important actions, such as post updates or account changes.
- Enhanced Pagination: Refine the pagination system for better performance with large datasets.
- Role-Based Access Control: Implement different access levels for regular users and admins to manage content.

## Screenshots

<img width="1680" alt="Screenshot 2024-11-13 at 3 12 19 PM" src="https://github.com/user-attachments/assets/1556e312-8d0a-49fa-892d-39c3ac9e466a">

<img width="1680" alt="Screenshot 2024-11-13 at 3 12 11 PM" src="https://github.com/user-attachments/assets/e8b62c74-c03a-4b48-9d0a-714e1aebb12b">
