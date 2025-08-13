import { useContext } from "react";
import defaultAvatar from "../../assets/avatar.svg";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar || defaultAvatar}
        alt="User's Avatar"
      />
      <p className="sidebar__username">{currentUser.name || "User"}</p>
    </div>
  );
}

export default SideBar;
