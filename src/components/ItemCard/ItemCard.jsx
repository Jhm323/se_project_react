import "./ItemCard.css";

const ItemCard = ({
  item,
  onCardClick,
  onCardLike,
  currentUser,
  isLoggedIn,
}) => {
  console.log("🔍 Full currentUser object:", currentUser);

  // Check if item was liked by current user
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // Add this debug line:
  console.log(
    "🔍 Item:",
    item.name,
    "isLiked:",
    isLiked,
    "likes array:",
    item.likes,
    "currentUser._id:",
    currentUser?._id
  );

  // Only show like button for logged-in users
  const shouldShowLikeButton = isLoggedIn;

  // Like button classes, dynamic
  const itemLikeButtonClassName = `item-card__like-button ${
    isLiked ? "item-card__like-button_active" : ""
  }`;

  // Add this debug line too:
  console.log("🔍 Button className:", itemLikeButtonClassName);

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <h2 className="card__name">{item.name}</h2>
      <img className="card__image" src={item.imageUrl} alt={item.name} />

      {/* Like button only visible if logged in */}
      {shouldShowLikeButton && (
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
