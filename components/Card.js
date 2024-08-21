export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // Set Eventlisteners
  //Like Button
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    //Delete Button
    this._cardElement
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    //card image
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  // private methods for like and delete button handlers
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //public method to return card
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // populate the card with image and title with provided data
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // invoke event listeners
    this._setEventListeners();

    return this._cardElement;
  }
}
