import { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../utils/api";

export const CurrentUserContext = createContext();

export function UserProvider({ children }) {
  const { currentUser, setCurrentUser } = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useState(false);
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to check token and get user
  const checkToken = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setLoading(false);
      return;
    }

    getUserProfile(token)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setCurrentUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("jwt"); // Remove invalid token
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

  // Function to handle login
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
  };

  const value = {
    currentUser,
    isLoggedIn,
    loading,
    handleLogin,
    handleLogout,
    setCurrentUser, // For profile updates
  };

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}
