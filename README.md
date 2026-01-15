# WTWR Frontend — Sprint 14: Front-End Authentication

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple?logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![JWT Auth](https://img.shields.io/badge/Auth-JWT-green)
![ESLint](https://img.shields.io/badge/code_style-eslint-blueviolet?logo=eslint)
![GitHub repo size](https://img.shields.io/github/repo-size/Jhm323/se_project_react)
![Last Commit](https://img.shields.io/github/last-commit/Jhm323/se_project_react)
![License](https://img.shields.io/badge/license-MIT-green)
![GitHub issues](https://img.shields.io/github/issues/Jhm323/se_project_react)
![GitHub stars](https://img.shields.io/github/stars/Jhm323/se_project_react?style=social)
![GitHub forks](https://img.shields.io/github/forks/Jhm323/se_project_react?style=social)

This project represents a key milestone in building a **full-stack React application** by connecting a secure frontend to a custom backend API. Built with **React (Vite)** and **React Router v6**, this sprint focuses on implementing **authentication, authorization, and user-aware UI behavior**.

The frontend integrates with the backend developed in  
👉 **Sprint 13 (Express + MongoDB)**: https://github.com/Jhm323/se_project_express

---

## 🌐 Project Links

- **Frontend Repository:** https://github.com/Jhm323/se_project_react
- **Backend Repository:** https://github.com/Jhm323/se_project_express
- **Live Demo:** [Coming Soon]

---

## 🎯 Project Objective

The goal of this project was to implement **secure front-end authentication and authorization** patterns commonly used in production React applications.

### Key Objectives:

- Connecting a React frontend to a JWT-secured backend
- Persisting authentication state across sessions
- Protecting routes and UI elements based on user authorization
- Allowing authenticated users to interact with and manage their data
- Ensuring a responsive, accessible UI across devices and browsers

---

## 🧠 What Was Built & How It Works

### Authentication & Authorization

- **User registration and login** using backend API
- **JWT tokens stored in `localStorage`**
- Token validation on app load to restore user sessions
- Authorization-aware routing with React Router v6
- Protected routes redirect unauthorized users appropriately

### User Interaction & State Management

- **Profile editing** (name and avatar)
- **Like / unlike clothing items**
- Ownership-based UI logic (only owners can delete items)
- Global user state managed via **React Context**
- Conditional rendering based on authentication state

### UI & UX

- Responsive modals for login, signup, and profile editing
- Dynamic UI updates without page reloads
- Clean separation of concerns between components, context, and API utilities

---

## 🛠 Tech Stack

- **React** (functional components)
- **Vite**
- **React Router v6**
- **JavaScript (ES6+)**
- **HTML & CSS**
- **JWT-based authentication**
- **Context API**

---

## 📂 Project Structure

- `/components` – Reusable UI components (e.g., `Header`, `ItemCard`, `Modals`)
- `/contexts` – `CurrentUserContext` to manage and provide current user state
- `/utils/api.js` – API interface for clothing items
- `/utils/auth.js` – Authentication API endpoints (`/signup`, `/signin`, `/users/me`)
- `/App.jsx` – Main application logic, route protection, and global state
- `/routes` – Frontend routing using React Router v6

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or above recommended)
- MongoDB (running locally or with a cloud URI)
- Your backend from Sprint 13 (Express server)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jhm323/se_project_react
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

---

## ✅ Features

- User Registration and Login
- Persistent JWT Authentication
- Authorization-aware UI rendering
- Profile Editing (name and avatar)
- Add and remove Likes on clothing items
- Conditional rendering based on current user context
- Protected /profile route
- Responsive React modals for user actions

---

## 🧪 Testing

While running locally:

- Ensure backend (`se_project_express`) is live on `http://localhost:3001`
- Ensure frontend makes fetch requests to that backend
- Log in with valid credentials to access the profile and like/delete features
- Clear localStorage and refresh to simulate sign-out

---

## 📜 License

MIT License

---

## 👤 Author

James Holden Moore
[LinkedIn](https://www.linkedin.com/in/james-holden-moore)
[james.holden.moore@gmail.com](mailto:james.holden.moore@gmail.com)
