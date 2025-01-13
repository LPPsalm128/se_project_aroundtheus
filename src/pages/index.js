// Import files
import "./index.css";
import { initialCards, config, variables } from "../utils/constants.js";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { data } from "autoprefixer";

const avatarForm = document.forms["avatar-form"];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "91f06c72-7b91-4e66-823e-042f284bc54f",
    "Content-Type": "application/json",
  },
});

const formValidators = {};

const enableValidation = (config) => {
  const profileEditPopupForm = editProfileModal.getForm();
  formValidators.profileEdit = new FormValidator(config, profileEditPopupForm);
  formValidators.profileEdit.enableValidation();

  formValidators.addCard = new FormValidator(
    config,
    variables.addCardFormElement
  );
  formValidators.addCard.enableValidation();
  formValidators.avatarValidate = new FormValidator(
    config,
    variables.avatarEditButton
  );
  formValidators.avatarValidate.enableValidation();
};

const userInfo = new UserInfo(
  ".profile__header",
  ".profile__paragraph",
  ".profile__avatar"
);

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);

variables.profileEditButton = document.getElementById("profile-edit-button");
variables.profileHeaderInput = document.getElementById("header-input");
variables.profileParagraphInput = document.getElementById("paragraph-input");

const addCardModal = new PopupWithForm(
  "#add-card-modal",
  handleProfileFormCreate
);

const previewImagePopup = new PopupWithImage("#picture-modal");

const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);

api
  .getUserInfo({ name, info, avatar })
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      info: data.info,
      avatar: data.avatar,
    });
    editProfileModal.close();
  })
  .catch((err) => {
    console.error("Error setting user info:", err);
  });

const modalWithConfirm = new PopupWithConfirmation("#delete-card-modal", api);
document.addEventListener("DOMContentLoaded", () => {
  modalWithConfirm.setEventListeners();
});

const cardDelete = document.querySelectorAll("#modal-close-button");

function handleProfileFormSubmit(inputValues) {
  const name = inputValues.name;
  const info = inputValues.info;
  const avatar = inputValues.avatar;

  return api
    .setUserInfo({ name, info, avatar })
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        info: data.info,
        avatar: data.avatar,
      });
      editProfileModal.close();
    })
    .catch((err) => {
      console.error("Error setting user info:", err);
    });
}

const avatarPopup = new PopupWithForm(
  "#avatar-picture-modal",
  handleAvatarFormSubmit
);
avatarPopup.setEventListeners();

function handleAvatarFormSubmit(inputValues) {
  return api.setUserInfo(inputValues.avatar).then((updatedData) => {
    userInfo.setUserInfo(updatedData);
  });
}

function handleProfileFormCreate(inputValues) {
  const cardElement = createCard(inputValues);
  section.addItem(cardElement);
  addCardModal.close();
  formValidators.addCard.resetValidation();
  formValidators.addCard.disableSubmitButton();
}

function handleImageClick(cardData) {
  previewImagePopup.open(cardData);
}

export function createCard(item) {
  const card = new Card(
    item,
    variables.cardSelector,
    handleImageClick,
    handleDeleteCard
  );
  return card.getView();
}

function handleDeleteCard(cardElement, cardID) {
  modalWithConfirm.setConfirmCallback(() => {
    return api
      .deleteCard(cardID)
      .then(() => {
        cardElement.remove();
        modalWithConfirm.close();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  });
  modalWithConfirm.open();
}

variables.profileEditButton.addEventListener("click", () => {
  console.log("Edit button clicked");
  formValidators.profileEdit.resetValidation();
  const user = userInfo.getUserInfo();
  console.log("User data:", user);
  variables.profileHeaderInput.value = user.name;
  variables.profileParagraphInput.value = user.info;
  editProfileModal.open();
});

variables.addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

document.querySelectorAll(".card__delete").forEach((button) => {
  button.addEventListener("click", (event) => {
    const cardElement = event.target.closest(".card");
    const cardID = cardElement.dataset.id;
    handleDeleteCard(cardElement, cardID);
    console.log("Button clicked");
  });
});

document.getElementById("modal-close-button").addEventListener("click", () => {
  modalWithConfirm.close();
});

editProfileModal.setEventListeners();
addCardModal.setEventListeners();
previewImagePopup.setEventListeners();
variables.avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
  formValidators.avatarValidate.resetValidation();
});

enableValidation(config);
