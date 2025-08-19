import { useState, useContext } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./Profile.css";

function Profile({
  onCardClick,
  onCardLike,
  clothingItems,
  handleAddClick,
  onLogOut,
  onUpdateUser,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

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
      console.log("Invalid clothingItems:", clothingItems);
      return [];
    }

    return clothingItems.filter((item) => item.owner === userId);
  }

  const userItems = filterUserClothing(clothingItems, currentUser._id);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar userName={currentUser.name} />
        <button className="profile__button" onClick={handleEditProfileClick}>
          Change Profile Data
        </button>
        <button className="profile__logout-button" onClick={onLogOut}>
          Log Out
        </button>
      </section>

      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          handleAddClick={handleAddClick}
          isLoggedIn={isLoggedIn}
          clothingItems={userItems} // Already filtered
          currentUser={currentUser}
        />
      </section>

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={closeAllModals}
        onUpdateUser={onUpdateUser}
      />
    </div>
  );
}

export default Profile;
