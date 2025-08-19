const BASE_URL = "http://localhost:3001";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json().then((data) => {
      // Check if the response has a 'data' property (like for like operations)
      // If so, return the nested data, otherwise return the data directly
      return data.data !== undefined ? data.data : data;
    });
  }
  return Promise.reject(`Error: ${res.status}`);
};

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

export function getItems() {
  return fetch(`${BASE_URL}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

// export function getItems() {
//   return fetch(`${BASE_URL}/items`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => {
//       console.log("Raw response status:", res.status);
//       return res.json();
//     })
//     .then((rawData) => {
//       console.log("Raw server data for getItems:", rawData);
//       return rawData;
//     });
// }

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
