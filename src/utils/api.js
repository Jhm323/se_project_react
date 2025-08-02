const BASE_URL = "http://localhost:3001";

const handleResponse = (res) => {
  if (!res.ok) {
    if (res.status === 429) {
      throw new Error("Too many requests - please slow down");
    }
    return res.text().then((text) => {
      throw new Error(text || `Error: ${res.status}`);
    });
  }
  return res.json();
};

const updateUserProfile = (name, avatar) => {
  return fetch("/users/me", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleResponse);
};

function getUserProfile(token) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

// Public endpoint — no token needed

function getItems() {
  return fetch(`${BASE_URL}/items`).then(handleResponse);
}

// Protected — token required

function addItem(name, imageUrl, weather, token) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleResponse);
}

// Protected — token required

function deleteItem(id, token) {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

const addCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};

const removeCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};

export {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
  getUserProfile,
};
