import { useEffect, useState } from "react";
import getUserProfile from "../../utils/api";
import defaultAvatar from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar({ userName }) {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    getUserProfile(token)
      .then((user) => {
        if (user.avatar) {
          setAvatarUrl(user.avatar);
        }
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  }, []);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={avatarUrl || defaultAvatar}
        alt="User's Avatar"
      />
      <p className="sidebar__username">{userName}</p>
    </div>
  );
}

export default SideBar;
