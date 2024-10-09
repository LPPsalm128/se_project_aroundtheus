import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(".modal__image");
    this._popupText = this._popupElement.querySelector(".modal__image-caption");
  }
  open({ cardName, cardLink }) {
    this._popupImage.setAttribute("src", cardImage);
    this._popupImage.setAttribute("alt", cardTitle);
    this._popupText.textContent = cardTitle;
    super.open();
  }
}

export default PopupWithImage;
