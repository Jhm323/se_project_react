import "./ItemCard.css";

const ItemCard = ({
  item,
  onCardClick,
  onCardLike,
  currentUser,
  isLoggedIn,
}) => {
  const itemLikes = item.likes || [];

  // Check if item was liked by current user
  const isLiked = currentUser && itemLikes.some((id) => id === currentUser._id);

  // Only show like button for logged-in users
  const shouldShowLIkeButton = isLoggedIn;

  // Like button classes, dynamic
  const itemLikeButtonClassName = `item-card__like-button ${
    isLiked ? "item-card__like-button_active" : ""
  }`;

  const handleLike = () => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  console.log("item:", item);
  console.log("item.likes:", item.likes);

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <h2 className="card__name">{item.name}</h2>
      <img className="card__image" src={item.imageUrl} alt={item.name} />

      {/* Like button only visible if logged in */}
      {shouldShowLIkeButton && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          type="button"
        />
      )}
    </li>
  );
};

export default ItemCard;
