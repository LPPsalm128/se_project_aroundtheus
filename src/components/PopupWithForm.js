import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputSelector = ".modal__input";
    this._inputList = [
      ...this._popupForm.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._handleSubmit = handleSubmit;
  }

  getForm() {
    return this._popupForm;
  }

  close() {
    super.close();
    this.renderLoading(false);
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._submitButton.textContent = "Save";
      this.renderLoading(true);
      this._handleSubmit(this._getInputValues())
        .then(() => {
          this._popupForm.reset();
          this.close();
        })
        .catch((err) => {
          console.error(`Form submission error: ${err}`);
        })
        .finally(() => {
          this.renderLoading(false); // revert to original text
        });
    });
  }
}

export default PopupWithForm;
