import { useState } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateUserProfile } from "../../utils/api";

import "./Profile.css";

function Profile({
  onCardClick,
  onCardLike,
  clothingItems,
  userName,
  handleAddClick,
  handleLogOut,
  handleUpdateUser,
}) {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function closeAllModals() {
    setEditProfileOpen(false);
  }

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar userName={userName} />
        <button className="profile__button" onClick={handleEditProfileClick}>
          Change Profile Data
        </button>
        <button className="profile__logout-button" onClick={handleLogOut}>
          Log Out
        </button>
      </section>

      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          onCardLike={onCardLike}
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
