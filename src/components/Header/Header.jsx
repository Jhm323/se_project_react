import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  setLoginOpen,
  setRegisterOpen,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Avatar placeholder with first letter of user name
  const renderAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={`${currentUser.name}'s avatar`}
          className="header__avatar"
        />
      );
    } else if (currentUser?.name) {
      return (
        <div className="header__avatar-placeholder">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
      );
    }
    return null;
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="header ogo" src={logo} />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn && currentUser ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            +Add clothes
          </button>

          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {renderAvatar}
              {/* <img src={avatar} alt="User Avatar" className="header__avatar" /> */}
            </div>
          </Link>
        </>
      ) : (
        <nav className="header__auth-buttons">
          <button
            onClick={() => setLoginOpen(true)}
            className="header__login-btn"
          >
            Log In
          </button>
          <button
            onClick={() => setRegisterOpen(true)}
            className="header__register-btn"
          >
            Register
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
