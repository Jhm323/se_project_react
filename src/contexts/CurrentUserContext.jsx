import { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../utils/api";

export const currentUserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // null until fetched
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setLoading(false);
      return;
    }

    getUserProfile(token)
      .then((data) => {
        setUser({
          name: data.name || "User",
          avatar: data.avatar || "",
          _id: data._id,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <currentUserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </currentUserContext.Provider>
  );
}
