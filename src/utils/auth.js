import { BASE_URL } from "../utils/constants";

// Helper function to handle responses
const handleResponse = (res) => {
  if (res.ok) return res.json();
  return res.json().then((data) => {
    const message = data?.message || `Error: ${res.status}`;
    return Promise.reject({ status: res.status, message });
  });
};

// Save token to localStorage
const saveToken = (token) => {
  localStorage.setItem("jwt", token);
};

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem("jwt");
};

// Remove token from localStorage
export function signout() {
  localStorage.removeItem("jwt");
}

// Sign up a new user
export function signup(name, avatar, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleResponse);
}

// Sign in an existing user
export function signin(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    // credentials: 'include' // Uncomment if using cookies/sessions
  })
    .then(handleResponse)
    .then((data) => {
      if (data.token) {
        saveToken(data.token);
        return data;
      } else {
        return Promise.reject("No token received from server");
      }
    });
}

// Check token validity and get user info
export function checkToken() {
  const token = getToken();
  if (!token) {
    return Promise.reject("No token found");
  }

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}
