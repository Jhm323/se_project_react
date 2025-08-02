import { useEffect, useState } from "react";
import { getUserProfile } from "../../utils/api";
import defaultAvatar from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar() {
  const [userData, setUserData] = useState({ name: "", avatar: "" });

  // const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    getUserProfile(token)
      .then((user) => {
        setUserData({
          name: user.name || "User",
          avatar: user.avatar || "",
        });
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
      });
  }, []);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={userData.avatar || defaultAvatar}
        alt="User's Avatar"
      />
      <p className="sidebar__username">{userData.name}</p>
    </div>
  );
}

export default SideBar;
