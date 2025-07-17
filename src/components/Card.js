class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteCard
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._likes = cardData.likes || [];
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick; // external handler
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  isLiked(currentUserId) {
    return (
      Array.isArray(this._likes) &&
      this._likes.some((user) => user._id === currentUserId)
    );
  }

  getId() {
    return this._id;
  }

  updateLikes(isLiked, currentUserId) {
    this._likes = isLiked ? [{ _id: currentUserId }] : [];
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (isLiked) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  }

  remove() {
    if (this._cardElement) {
      this._cardElement.remove();
    }
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(this); // calls external handler
      });

    this._cardElement
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  getView(currentUserId) {
    this._cardElement = this._getTemplate();

    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // Set initial like button state
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this.isLiked(currentUserId)) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
