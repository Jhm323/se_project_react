import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, currentUser }) {
  const isLoggedIn = !!currentUser;

  // Safely check if the current user has liked this item
  const isLiked =
    Array.isArray(item.likes) && currentUser
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  // Dynamic class name for the like button
  const itemLikeButtonClassName = `item-card__like-button ${
    isLiked ? "item-card__like-button_active" : ""
  }`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />

      {/* Like button only visible if logged in */}
      {isLoggedIn && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          type="button"
          aria-label={isLiked ? "Unlike item" : "Like item"}
        />
      )}
    </li>
  );
}

export default ItemCard;
