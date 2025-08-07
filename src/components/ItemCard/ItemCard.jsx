import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, currentUser }) {
  const isLoggedIn = !!currentUser;

  // Safely check if the current user has liked this item
  const isLiked =
    Array.isArray(item.likes) && currentUser
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  // Like button classes, dynamic
  const itemLikeButtonClassName = `item-card__like-button ${
    isLiked ? "item-card__like-button_active" : ""
  }`;

  const handleLike = (e) => {
    e.stopPropagation();
    console.log("Liking item ID:", item._id);
    onCardLike(item);
  };

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <h2 className="card__name">{item.name}</h2>
      <img className="card__image" src={item.imageUrl} alt={item.name} />

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
