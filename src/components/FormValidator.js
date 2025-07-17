export default class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._popupForm = document.querySelector(".modal__form");
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  //----Input Error Functions--------

  _showInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  reset() {
    this._popupForm.reset();
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _hasInvalidInput() {
    return Array.from(this._form.querySelectorAll(this._inputSelector)).some(
      (inputElement) => !inputElement.validity.valid
    );
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  _setEventListeners() {
    const inputElements = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement);
        } else {
          this._hideInputError(inputElement);
        }
        this._toggleButtonState();
      });
    });
  }

  //----Validation---

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.disableSubmitButton();
      this.reset();
    });

    this._setEventListeners();
    this.disableSubmitButton();
  }

  resetValidation() {
    this._toggleButtonState();

    const inputElements = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
