import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar({ userName }) {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default Avatar" />
      <p className="sidebar__username">{userName}</p>
    </div>
  );
}

export default SideBar;
