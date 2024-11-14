class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector("#modal-close-button");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    window.addEventListener("keydown", this._closePopupEsc);
    this._popupElement.addEventListener("click", this._closePopupOverlay);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    window.removeEventListener("keydown", this._closePopupEsc);
    this._popupElement.removeEventListener("click", this._closePopupOverlay);
  }

  _closePopupEsc = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _closePopupOverlay = (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}

export default Popup;
