# Sprint 14: Front-End Authentication (WTWR)

This project represents a key milestone in the software engineering journey: connecting the front-end and back-end to create a full-stack application. Built with React (Vite) and React Router v6, this sprint implements user authentication, profile editing, and interaction features such as item likes. It uses the backend developed in [Sprint 13](https://github.com/Jhm323/se_project_express) to manage API requests and user data.

## Features

- User Registration and Login
- Persistent JWT Authentication
- Authorization-aware UI rendering
- Profile Editing (name and avatar)
- Add and remove Likes on clothing items
- Conditional rendering based on current user context
- Protected /profile route
- Responsive React modals for user actions

## Getting Started

### Prerequisites

- Node.js (v16 or above recommended)
- MongoDB (running locally or with a cloud URI)
- Your backend from Sprint 13 (Express server)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/se_project_react
   cd se_project_react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app (frontend):

   ```bash
   npm run dev
   ```

4. Make sure your backend (se_project_express) is also running on a different port, for example:

   ```bash
   npm run start
   # On port 3001 or similar
   ```

## Project Structure

- `/components` – Reusable UI components (e.g., `Header`, `ItemCard`, `Modals`)
- `/contexts` – `CurrentUserContext` to manage and provide current user state
- `/utils/api.js` – API interface for clothing items
- `/utils/auth.js` – Authentication API endpoints (`/signup`, `/signin`, `/users/me`)
- `/App.jsx` – Main application logic, route protection, and global state
- `/routes` – Frontend routing using React Router v6

## Authentication Logic

- Uses JWT stored in `localStorage`
- Protected routes (`/profile`) redirect unauthorized users to the main page
- Auth headers are passed to API requests via:

  ```js
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  }
  ```

## Profile and Interaction Logic

- Users can edit their name and avatar
- Only the owner of a clothing item can delete it
- Only authorized users can like/unlike items
- UI adjusts dynamically with React state and context

## Checklist Highlights

- [x] Signup/Login modals implemented
- [x] JWT-based authentication
- [x] Token validation on page load
- [x] Authorization-aware UI
- [x] Likes and deletions limited to logged-in users
- [x] Edit profile modal pre-fills user data
- [x] Logout functionality clears token and resets state

## Testing

While running locally:

- Ensure backend (`se_project_express`) is live on `http://localhost:3001`
- Ensure frontend makes fetch requests to that backend
- Log in with valid credentials to access the profile and like/delete features
- Clear localStorage and refresh to simulate sign-out

## Related Repositories

- Backend Repo (Sprint 13): [se_project_express](https://github.com/YOUR_USERNAME/se_project_express)

## License

MIT License

## Author

James Holden Moore
[LinkedIn](https://www.linkedin.com/in/james-holden-moore)
[james.holden.moore@gmail.com](mailto:james.holden.moore@gmail.com)
