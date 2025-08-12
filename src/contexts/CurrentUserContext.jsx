import { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../utils/api";

export const CurrentUserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setLoading(false);
      return;
    }

    getUserProfile(token)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
