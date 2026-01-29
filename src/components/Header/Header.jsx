import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import wtwr from "../../assets/WTWR.svg";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  setLoginOpen,
  setRegisterOpen,
}) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
    <header
      className={`header ${location.pathname === "/" ? "header--home" : ""} ${location.pathname === "/profile" ? "header--profile" : ""}`}
    >
      <Link to="/">
        <div className="header__logo-container">
          <img className="header__logo" alt="header logo" src={wtwr} />
        </div>
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__group-right">
        <ToggleSwitch />
        {!isLoggedIn ? (
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
        ) : location.pathname !== "/profile" ? (
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
                {renderAvatar()}
              </div>
            </Link>
          </>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
