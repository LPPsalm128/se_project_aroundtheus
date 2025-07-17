import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, api) {
    super(popupSelector);
    this._confirmButton = this._popupElement.querySelector(
      ".modal__button-delete"
    );
    console.log("Confirm Button:", this._confirmButton);
    this._api = api;
  }

  setConfirmCallback(callback) {
    this._handleConfirm = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      if (this._handleConfirm) {
        this._handleConfirm();
      }
    });
  }
}

export default PopupWithConfirmation;
