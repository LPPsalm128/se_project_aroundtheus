class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    modalWithConfirm,
    api
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData.id;
    this._isLiked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._modalWithConfirm = modalWithConfirm;
    this._handleDeleteCard = handleDeleteCard;
    this._api = api;
    this._handleLikeIcon = this._handleLikeIcon.bind(this);
    //console.log(cardData);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // Set Eventlisteners
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._modalWithConfirm.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  //Like Button
  _handleLikeIcon() {
    if (this._isLiked) {
      this._api
        .dislikeCard(this._id)
        .then(() => {
          this._isLiked = false;
          this._likeButton.classList.remove("card__like-button_active");
        })
        .catch((err) => {
          console.error("Error disliking card:", err);
        });
    } else {
      this._api
        .likeCard(this._id)
        .then(() => {
          this._isLiked = true;
          this._likeButton.classList.add("card__like-button_active");
        })
        .catch((err) => {
          console.error("Error disliking card:", err);
        });
    }
  }

  //Delete Button

  _handleDeleteButton() {
    const cardId = this._cardElement.dataset.id;
    this._modalWithConfirm.open();
    this._modalWithConfirm.setConfirmCallback(() => {
      this._handleDeleteCard(cardId, this._cardElement).catch((err) => {
        console.error("Error deleting card:", err);
      });
    });
  }

  //public method to return card
  getView() {
    this._cardElement = this._getTemplate();

    this._modalWithConfirm = this._cardElement.querySelector(".card__delete");

    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // Invoke EventListeners
    this._setEventListeners();

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    return this._cardElement;
  }
}

export default Card;
