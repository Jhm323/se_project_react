import { useState, useContext } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateUserProfile } from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./Profile.css";

function Profile({
  onCardClick,
  onCardLike,
  clothingItems,
  handleAddClick,
  handleLogOut,
  handleUpdateUser,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  console.log("Profile - currentUser:", currentUser);

  // Handle loading or no user case
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  // Now it's safe to access currentUser._id
  const userId = currentUser._id;

  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function closeAllModals() {
    setEditProfileOpen(false);
  }

  function filterUserClothing(clothingItems, userId) {
    if (!Array.isArray(clothingItems) || !userId) {
      console.warn("Invalid input to filterUserClothing");
      return [];
    }

    return clothingItems.filter((item) => item.owner === userId);
  }

  const userItems = filterUserClothing(clothingItems, currentUser._id);

  console.log("Profile - onCardLike function:", onCardLike);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar userName={currentUser.name} />
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
          filterUserClothing={filterUserClothing}
          handleAddClick={handleAddClick}
          isLoggedIn={isLoggedIn}
          clothingItems={userItems}
          currentUser={currentUser}
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
