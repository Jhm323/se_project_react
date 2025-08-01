import { useState } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateUserProfile } from "../../utils/api";

import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  userName,
  handleAddClick,
  handleLogOut,
}) {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function closeAllModals() {
    setEditProfileOpen(false);
  }

  function handleUpdateUser({ name, avatar }) {
    updateUserProfile(name, avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllModals();
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  }

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar userName={userName} />
        <button className="profile__button" onClick={handleEditProfileClick}>
          Change Profile Data
        </button>
        <button className="profile__button" onClick={handleLogout}>
          Log Out
        </button>
      </section>

      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={closeAllModals}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}

export default Profile;
