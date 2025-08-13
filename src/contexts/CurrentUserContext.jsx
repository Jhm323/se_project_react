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
        console.log("User profile fetched successfully:", data); // Add this
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setUser(null); // Make sure to set user to null on error
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Add this console log to track user changes
  console.log("CurrentUserContext user value:", user);

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
}
