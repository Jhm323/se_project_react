# WTWR — Full-Stack App (Frontend)

A React application that connects to a custom backend to handle authentication, user data, and clothing item management.

This project focuses on building a real client–server flow — managing auth state, protecting routes, and keeping the UI in sync with backend data.

---

## Live

https://wtwr-frontend-5mwu.onrender.com/

---

## What it does

- Allows users to sign up, log in, and stay logged in across sessions  
- Protects routes and UI based on authentication state  
- Lets users add, like, and delete clothing items  
- Updates the UI in real time based on user actions  

---

## Stack

- React (Vite)
- React Router
- Context API
- JavaScript (ES6+)
- JWT authentication

Backend:  
https://github.com/Jhm323/se_project_express

---

## How it works

- JWT is stored in `localStorage` and validated on app load  
- Protected routes redirect users if they’re not authenticated  
- Global user state is managed through React Context  
- API calls are centralized to keep components focused on UI  

One challenge here was keeping auth state consistent across refreshes — I handled that by validating the token on load and rehydrating the user state before rendering protected routes.

---

## Key features

- Login / signup flow with persistent sessions  
- Authorization-aware routing  
- Profile editing (name + avatar)  
- Like / unlike functionality  
- Ownership-based UI (only owners can delete items)  

---

## Running locally

```bash
git clone https://github.com/jhm323/se_project_react
cd se_project_react
npm install
npm run dev
