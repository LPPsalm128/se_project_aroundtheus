class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector("#modal-close-button");
    console.log(document.querySelector(popupSelector));
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
    if (evt.key === "Escape" || evt.key === "Esc") {
      this.close();
    }
  };

  _closePopupOverlay = (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal_opened") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmButton.textContent = "Loading...";
      // Optionally disable the button
      this._confirmButton.disabled = true;
    } else {
      this._confirmButton.textContent = "Confirm";
      this._confirmButton.disabled = false;
    }
  }
}

export default Popup;
