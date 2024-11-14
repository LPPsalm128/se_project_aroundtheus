import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleProfileEditSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputSelector = ".modal__input";
    this._inputList = [
      ...this._popupForm.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._handleProfileEditSubmit = handleProfileEditSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._submitButton.textContent = "Save...";
      this._handleProfileEditSubmit(inputValues);
      this._popupForm.reset();
    });
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
}

export default PopupWithForm;
