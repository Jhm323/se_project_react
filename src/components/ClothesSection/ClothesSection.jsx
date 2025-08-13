import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  onCardClick,
  onCardLike,
  handleAddClick,
  clothingItems,
  isLoggedIn,
  currentUser,
  filterUserClothing,
}) {
  // Filter items to only show those owned by the current user

  const userItems = filterUserClothing(clothingItems, currentUser._id);

  return (
    <div className="clothes-section">
      <div className="clothes-section__content">
        <p className="clothes-section__title">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__button"
        >
          + Add New Item
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              currentUser={currentUser._id}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
