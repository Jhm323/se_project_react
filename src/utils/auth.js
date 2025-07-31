// signup for user registration
export function signup(name, avatar, email, password) {
  return fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}

// signin for user authorization
export function signin(email, password) {
  return fetch("http://localhost:3001/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Login failed: ${res.status}`)
  );
}
