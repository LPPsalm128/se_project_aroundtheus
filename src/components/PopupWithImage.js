import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.modalImage = document.querySelector("#modal-image");
    this.modalImageCaption = document.querySelector("#modal-caption");
  }
  open(cardData) {
    this.modalImage.alt = cardData.name;
    this.modalImage.src = cardData.link;
    this.modalImageCaption.textContent = cardData.name;
    super.open();
  }
}

export default PopupWithImage;
