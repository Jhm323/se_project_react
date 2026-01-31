import { useState } from "react";
import "./ItemCard.css";

const ItemCard = ({
  item,
  onCardClick,
  onCardLike,
  currentUser,
  isLoggedIn,
}) => {
  // treat a 24-char hex string as a backend ObjectId
  const isBackendId = (val) =>
    typeof val === "string" && /^[a-fA-F0-9]{24}$/.test(val);

  const initiallyLiked =
    Array.isArray(item.likes) &&
    item.likes.some((id) => id === currentUser?._id);

  // local state for default/local items only
  const [localLiked, setLocalLiked] = useState(initiallyLiked);

  // which value to show: backend items use server state, defaults use local state
  const displayedLiked = isBackendId(item._id) ? initiallyLiked : localLiked;

  const itemLikeButtonClassName = `item-card__like-button ${displayedLiked ? "item-card__like-button_active" : ""}`;

  const shouldShowLikeButton = isLoggedIn;

  const handleLike = (e) => {
    e.stopPropagation();
    if (isBackendId(item._id)) {
      // real backend item — call up to App via onCardLike (unchanged)
      onCardLike({ id: item._id, isLiked: initiallyLiked });
    } else {
      // default/local item — toggle locally (no API call)
      setLocalLiked((v) => !v);
    }
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
