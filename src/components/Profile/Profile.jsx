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
  userName,
  handleAddClick,
  handleLogOut,
  handleUpdateUser,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function closeAllModals() {
    setEditProfileOpen(false);
  }

  // /**
  //  * Filters clothing items that belong to the current user.
  //  *
  //  * @param {Array} clothingItems - List of all clothing items.
  //  * @param {string} userId - The ID of the current user.
  //  * @returns {Array} - Filtered clothing items belonging to the user.
  //  */
  // function filterUserClothing(clothingItems, userId) {
  //   if (!Array.isArray(clothingItems) || !userId) {
  //     console.warn("Invalid input to filterUserClothing");
  //     return [];
  //   }

  //   return clothingItems.filter((item) => item.owner === userId);
  // }

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
