import { _ } from "core-js";

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
    this._id = cardData._id; // Store card ID
    this._likes = cardData.likes || []; // Store likes array
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // Returns true if the card is liked by the current user
  isLiked(currentUserId) {
    return (
      Array.isArray(this._likes) &&
      this._likes.some((user) => user._id === currentUserId)
    );
  }

  // Returns the card's ID
  getId() {
    return this._id;
  }

  // Updates the likes array and UI
  updateLikes(newLikes) {
    this._likes = newLikes;
    const likeCount = this._cardElement.querySelector(".card__like-count");
    if (likeCount) {
      likeCount.textContent = this._likes.length;
    }
    // Optionally update the like button's active state here
  }

  // Set Eventlisteners
  //Like Button
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(this); // Pass the card instance
      });

    //Delete Button
    this._cardElement
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard(this); // Pass the card instance
      });

    //Card Image
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  // private methods for like and delete button handlers
  _handleLikeClick() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  //public method to return card
  getView() {
    this._cardElement = this._getTemplate();

    // Populate the card with image and title with provided data
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // Invoke EventListeners
    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
