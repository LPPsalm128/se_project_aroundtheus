// Import files
import "./index.css";
import { initialCards, config, variables } from "../utils/constants.js";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

const formValidators = {};

const enableValidation = (config) => {
  const profileEditPopupForm = editProfileModal.getForm();
  formValidators.profileEdit = new FormValidator(config, profileEditPopupForm);
  formValidators.profileEdit.enableValidation();

  const addCardValidator = new FormValidator(
    config,
    variables.addCardFormElement
  );
  addCardValidator.enableValidation();
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

variables.profileEditButton.addEventListener("click", () => {
  console.log("Edit button clicked");
  formValidators.profileEdit.resetValidation();
  const user = userInfo.getUserInfo();
  console.log("User data:", user);
  variables.profileHeaderInput.value = user.name;
  variables.profileParagraphInput.value = user.info;
  editProfileModal.open();
});

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
section.renderItems();

function handleProfileFormSubmit(inputValues) {
  const name = inputValues.name;
  const info = inputValues.info;

  userInfo.setUserInfo({ name, info });

  editProfileModal.close();
}

function handleProfileFormCreate(inputValues) {
  const cardElement = createCard(inputValues);
  section.addItem(cardElement);
  addCardModal.close();
}

function handleImageClick(cardData) {
  previewImagePopup.open(cardData);
}

export function createCard(item) {
  const card = new Card(item, variables.cardSelector, handleImageClick);
  return card.getView();
}

variables.addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

editProfileModal.setEventListeners();
addCardModal.setEventListeners();
previewImagePopup.setEventListeners();

enableValidation(config);
