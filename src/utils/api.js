const BASE_URL = "http://localhost:3001";

function handleResponse(res) {
  if (!res.ok) {
    return res.json().then((err) => {
      throw new Error(err.message || "Something went wrong");
    });
  }
  return res.json();
}

function getAuthHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export function getUserProfile(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(token),
    },
  }).then(handleResponse);
}

export function getItems(token) {
  return fetch(`${BASE_URL}/items`, {
    method: "GET",
    headers: {
      // ...getAuthHeaders(token),
    },
  }).then(handleResponse);
}

export function addCardLike(id, token) {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(token),
    },
  }).then(handleResponse);
}

export function removeCardLike(id, token) {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(token),
    },
  }).then(handleResponse);
}

export function deleteItem(id, token) {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(token),
    },
  }).then(handleResponse);
}

export function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(token),
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleResponse);
}

export function updateUserProfile({ name, avatar }, token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(token),
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleResponse);
}
